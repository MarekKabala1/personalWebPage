import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { enforceRateLimit } from "./rateLimit";

const MAX_PER_MINUTE = 10;
const MS = 60000;

export const add = mutation({
  args: {
    name: v.string(),
    message: v.string(),
    createdAt: v.optional(v.number()),
    email: v.optional(v.string()),
    ip: v.string(),
  },
  handler: async (ctx, args) => {
    await ctx.db.insert('guestbook', {
      name: args.name,
      email: args.email,
      createdAt: args.createdAt ?? Date.now(),
      message: args.message,
      ip: args.ip
    })
  }
})
export const get = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db
      .query('guestbook')
      .order('desc')
      .collect();
  }
})

export const getRecentGuestbookEntries = query({
  args: { ip: v.string() },
  handler: async (ctx, { ip }) => {
    const oneMinuteAgo = Date.now() - 60000;

    const recentEntries = await ctx.db
      .query("guestbook")
      .filter(q =>
        q.and(
          q.eq(q.field("ip"), ip),
          q.gte(q.field("_creationTime"), oneMinuteAgo)
        )
      )
      .collect();

    return { count: recentEntries.length };
  }
});

export const hasAlreadySigned = query({
  args: { ip: v.string() },
  handler: async (ctx, { ip }) => {
    const existing = await ctx.db
      .query("guestbook")
      .withIndex("by_ip", (q) => q.eq("ip", ip))
      .first();
    return existing !== null;
  },
});
