import { v } from "convex/values";
import { mutation, query } from "./_generated/server";


const timestamp = Date.now();
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
      createdAt: timestamp,
      message: args.message,
      ip: args.ip
    })
  }
})

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

export const get = query({
  args: {},
  handler: async (ctx, args) => {
    return await ctx.db
      .query('guestbook')
      .order('desc')
      .collect();
  }
})