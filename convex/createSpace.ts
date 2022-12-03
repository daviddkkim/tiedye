import { mutation } from "./_generated/server";
import { Document } from "../convex/_generated/dataModel";

export default mutation(async ({ db, auth }, space) => {
  if (!space) {
    throw new Error("Failed to create a space. Space object is missing");
  }

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

  const memberList = space.members;
  memberList.push(user._id);
  const newSpace = {
    name: space.name,
    owner: user._id,
    members: [...space.members, user._id],
  };
  const spaceId = await db.insert("spaces", newSpace);

  const userObject = {
    ...user,
    spaces: [...user.spaces, spaceId],
  };

  await db.patch(user._id, userObject);
});
