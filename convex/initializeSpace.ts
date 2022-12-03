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

  console.log('here')
  const newSpace = space! ? {
    name: identity.name + "'s space",
    members: [user._id]
  } : space;
  const spaceId = await db.insert("spaces", newSpace);

  console.log(spaceId)
  const userObject = {
    ...user,
    spaces: [spaceId]
  }
  await db.patch(user._id, userObject)
});
