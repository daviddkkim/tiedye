import { defineSchema, defineTable, s } from "convex/schema";

export default defineSchema({
  clicks: defineTable({
    clicks: s.number(),
  }),
  users: defineTable({
    name: s.string(),
    tokenIdentifier: s.string(),
  }).index("by_token", ["tokenIdentifier"]),
});