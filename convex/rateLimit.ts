import type { MutationCtx } from "./_generated/server";

const MAX_PER_MINUTE = 10;
const MS_PER_MINUTE = 60_000;

export async function enforceRateLimit(ctx: MutationCtx, ip: string) {
  const oneMinuteAgo = Date.now() - MS_PER_MINUTE;

  const recentEntries = await ctx.db
    .query("guestbook")
    .withIndex("by_ip", (q) => q.eq("ip", ip))
    .filter((q) => q.gte(q.field("_creationTime"), oneMinuteAgo))
    .collect();

  if (recentEntries.length >= MAX_PER_MINUTE) {
    throw new Error("Too many submissions. Please wait a minute.");
  }
}