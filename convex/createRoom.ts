import { mutation } from "./_generated/server";

export default mutation(async ({ db, auth }) => {
    const identity = await auth.getUserIdentity();
    if (!identity) {
      throw new Error("Unauthenticated call to sendMessage");
    }
    const user = await db
      .query("users")
      .withIndex("by_token", q =>
        q.eq("tokenIdentifier", identity.tokenIdentifier)
      )
      .unique();
    
      const room = {
        name : 'someRoom',
        objects: '{}',
        owner: user._id,
      }

  return await db.insert("rooms", room)
});
