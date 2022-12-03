import { Id } from "./_generated/dataModel";
import { query } from "./_generated/server";

export default query(async ({ db, auth }, spaceId) => {
  if (!spaceId) return null;

  const identity = await auth.getUserIdentity();
  if (!identity) {
    throw new Error("Unauthenticated call to sendMessage");
  }

  const id = new Id<"spaces">("spaces", spaceId);

  const space = await db.get(id);

  if (!space) return null;

  return space;
});
