import { query } from "./_generated/server";

export default query(async ({ db, auth }) => {
  const identity = await auth.getUserIdentity();
  if (!identity) {
    throw new Error("Unauthenticated call to sendMessage");
  }

  try {
    const user = await db
      .query("users")
      .withIndex("by_token", (q) =>
        q.eq("tokenIdentifier", identity.tokenIdentifier)
      )
      .unique();

    

    return Promise.all(
      user.spaces.map(async (space) => {
        const spaceInfo = await db.get(space);
        return {
         ...spaceInfo
        };
      })
    );
    //This is to catch the exception that occurs when you log in for the first time
  } catch {
    return [];
  }
});
