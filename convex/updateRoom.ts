import { mutation } from "./_generated/server";

export default mutation(async ({ db, auth }, room) => {
  const identity = await auth.getUserIdentity();
  if (!identity) {
    throw new Error("Unauthenticated call to sendMessage");
  }
  const time = Date.now();
  const newRoom = {
    ...room,
    lastUpdatedAt: time,
  };
  return await db.patch(room._id, newRoom);
});
