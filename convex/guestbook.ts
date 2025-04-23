import { v } from "convex/values";
import { mutation, query } from "./_generated/server";


const timestamp = Date.now();
export const addGuestbookEntry = mutation({
  args: {
    name: v.string(),
    message: v.string(),
    createdAt: v.optional(v.number()),
    email: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    await ctx.db.insert('guestbook', {
      name: args.name,
      email: args.email,
      createdAt: timestamp,
      message: args.message
    })
  }
})

export const getGuestbookEntry = query({
  args: {},
  handler: async (ctx, args) => {
    return await ctx.db
      .query('guestbook')
      .order('desc')
      .collect();
  }
})