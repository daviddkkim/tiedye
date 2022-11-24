import { Id } from "./_generated/dataModel";
import { mutation } from "./_generated/server";

// Send a message to the given chat channel.
export default mutation(async ({ db }, click) => {
  await db.patch(click._id, click);
});
