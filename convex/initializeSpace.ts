import { mutation } from "./_generated/server";

export default mutation(async ({ db, auth }, space?) => {
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

  if (user.spaces.length > 0) return;

  const newSpace = !space
    ? {
        name: "First space",
        owner: user._id,
        members: [user._id],
      }
    : space;

  const spaceId = await db.insert("spaces", newSpace);

  const userObject = {
    ...user,
    spaces: [spaceId],
  };
  await db.patch(user._id, userObject);

  return spaceId;
});
