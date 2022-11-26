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

  const newRoom = {
    ...room,
    owner: user._id,
  };
  console.log(newRoom);
  return await db.insert("rooms", newRoom);
});
