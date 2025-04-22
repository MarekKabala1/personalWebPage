import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  posts: defineTable({
    title: v.string(),
    slug: v.string(),
    content: v.string(),
    excerpt: v.string(),
    pubDate: v.string(),
    imgUrl: v.optional(v.string()),
    updatedAt: v.number(),
    author: v.optional(v.string()),
  }).index("by_slug", ["slug"]),

  visitorCount: defineTable({
    id: v.string(),
    count: v.number(),
    lastUpdated: v.number(),
  }),

  comments: defineTable({
    postId: v.id("posts"),
    author: v.string(),
    content: v.string(),
    createdAt: v.number(),
    updatedAt: v.number(),
    isApproved: v.boolean(),
  }).index("by_post", ["postId"]),

  guestbook: defineTable({
    name: v.string(),
    message: v.string(),
    createdAt: v.number(),
    isApproved: v.boolean(),
    website: v.optional(v.string()),
    email: v.optional(v.string()),
  }).index("by_date", ["createdAt"]),
});