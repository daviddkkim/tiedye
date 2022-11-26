import { GenericId } from "convex/dist/types/values/values";
import { query } from "./_generated/server";

export default query(async ({ db, auth }, roomId) => {
  const identity = await auth.getUserIdentity();
  if (!identity) {
    throw new Error("Unauthenticated call to sendMessage");
  }

  console.log(roomId)

  const room =  await db.get(roomId as GenericId<"rooms">)


  if(!room) return null;
  
  const user = await db.get(room.owner);

  return {
    creator: user?.name,
    ...room
  }
});
