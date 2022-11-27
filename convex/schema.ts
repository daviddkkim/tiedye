import { defineSchema, defineTable, s } from "convex/schema";

export default defineSchema({
  clicks: defineTable({
    clicks: s.number(),
  }),
  users: defineTable({
    name: s.string(),
    tokenIdentifier: s.string(),
  }).index("by_token", ["tokenIdentifier"]),
  rooms: defineTable({
    name: s.string(),
    owner: s.id("users"),
    objects: s.string(),
    description: s.string(),
    lastUpdatedAt: s.number(),
  }).index("by_owner", ["owner"]),
});
