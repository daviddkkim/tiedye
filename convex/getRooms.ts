import { query } from "./_generated/server";

export default query(async ({ db, auth }) => {
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

  const rooms =  await db
  .query("rooms")
  .withIndex("by_owner", (q) => q.eq("owner", user._id))
  .collect();

  return Promise.all(
    rooms.map(async room => {
      const user = await db.get(room.owner);
      return {
        creator: user!.name,
        ...room,
      };
    })
  ); 
});
