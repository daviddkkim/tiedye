import { query } from "./_generated/server";

export default query(async ({ db, auth }) => {
  const identity = await auth.getUserIdentity();
  if (!identity) {
    throw new Error("Called storeUser without authentication present");
  }
  console.log(identity)
  console.log(identity.tokenIdentifier)
  return await db.query("clicks").first();
});
