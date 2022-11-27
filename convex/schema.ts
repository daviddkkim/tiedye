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
    object: s.object({
      widgets: s.array(s.object({
        id: s.string(),
        type: s.string(),
        title: s.string(),
        body: s.array(
          s.object({
            id: s.string(),
            content: s.string(),
            completed: s.boolean()
          })
        )
      }))
    }),
    description: s.string(),
    lastUpdatedAt: s.number(),
  }).index("by_owner", ["owner"]),
});
