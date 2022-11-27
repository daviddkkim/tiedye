import { mutation } from "./_generated/server";

export default mutation(async ({ db, auth }, room) => {
  const identity = await auth.getUserIdentity();
  if (!identity) {
    throw new Error("Unauthenticated call to sendMessage");
  }
  const user = await db
    .query("users")
    .withIndex("by_token", (q) =>
      q.eq("tokenIdentifier", identity.tokenIdentifier)
    )
    .unique();
  const time = Date.now();
  const newRoom = {
    ...room,
    owner: user._id,
    lastUpdatedAt: time,
    object: {
      widgets: [
        {
          id: "1",
          type: "todo",
          title: 'For Christmas',
          body: [
            {
              id: "123",
              content: "To do 1",
              completed: false
            },
            {
              id: "1234",
              content: "To do 2",
              completed: true
            },
          ]
        },
        {
          id: "2",
          type: "todo",
          title: 'For Christmas',
          body: [
            {
              id: "1235",
              content: "To do 1",
              completed: false
            },
            {
              id: "12346",
              content: "To do 2",
              completed: true
            },
          ]
        }
      ]
    }
  };

  return await db.insert("rooms", newRoom);
});
