import { v } from "convex/values";
import { internalMutation, mutation, query } from "./_generated/server";

const SITE_ID = "main-site";

export const incrementVisitorCount = mutation({
  args: v.object({}),
  handler: async (ctx) => {
    const existingRecord = await ctx.db
      .query("visitorCount")
      .filter((q) => q.eq(q.field("id"), SITE_ID))
      .first();

    const currentCount = existingRecord?.count ?? 0;
    const newCount = currentCount + 1;
    const timestamp = Date.now();

    if (existingRecord) {
      await ctx.db.patch(existingRecord._id, {
        count: newCount,
        lastUpdated: timestamp,
      });
    } else {
      await ctx.db.insert("visitorCount", {
        id: SITE_ID,
        count: newCount,
        lastUpdated: timestamp,
      });
    }

    return { count: newCount, lastUpdated: timestamp };
  },
});

export const getVisitorCount = query({
  args: v.object({}),
  handler: async (ctx) => {
    const record = await ctx.db
      .query("visitorCount")
      .filter((q) => q.eq(q.field("id"), SITE_ID))
      .first();

    return record ?? { id: SITE_ID, count: 0, lastUpdated: 0 };
  },
});
