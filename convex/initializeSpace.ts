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
  

  const newSpace = space! ?{
    name: identity.name + "'s space",
    members: [user._id]
  } : space;

  return await db.insert("spaces", newSpace);
});
