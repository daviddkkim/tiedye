import { Id } from "./_generated/dataModel";
import { query } from "./_generated/server";

export default query(async ({ db, auth }, spaceId) => {
  const identity = await auth.getUserIdentity();
  if (!identity) {
    throw new Error("Unauthenticated call to sendMessage");
  }

  try {
    const user = await db
      .query("users")
      .withIndex("by_token", (q) =>
        q.eq("tokenIdentifier", identity.tokenIdentifier)
      )
      .unique();

    const space = new Id("spaces", spaceId);
    const rooms = await db
      .query("rooms")
      .withIndex("by_space", (q) => q.eq("space", space))
      .collect();

    return Promise.all(
      rooms.map(async (room) => {
        const user = await db.get(room.owner);
        return {
          creator: user!.name,
          ...room,
        };
      })
    );
    //This is to catch the exception that occurs when you log in for the first time
  } catch {
    return [];
  }
});
