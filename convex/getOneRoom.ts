import { Id } from "./_generated/dataModel";
import { query } from "./_generated/server";

export default query(async ({ db, auth }, roomId) => {
  const identity = await auth.getUserIdentity();
  if (!identity) {
    throw new Error("Unauthenticated call to sendMessage");
  }

  if (!roomId) return null;

  const id = new Id<"rooms">("rooms",roomId);

  const room =  await db.get(id);


  if(!room) return null;
  
  const user = await db.get(room.owner);

  return {
    creator: user?.name,
    ...room
  }
});
