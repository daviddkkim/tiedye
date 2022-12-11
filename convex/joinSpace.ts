import { mutation } from "./_generated/server";
import { Id } from "./_generated/dataModel";

export default mutation(async ({ db, auth }, spaceId) => {
    if (!spaceId) {
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
    try {
        const id = new Id<"spaces">("spaces", spaceId);

        if (user.spaces.filter((space) => space.id === id.id).length > 0) {
            throw new Error("You are already part of this space");
        }

        const space = await db.get(id).catch(() => {
            const e = new Error("failure to query for space. Check the Space ID");
            e.name = "QueryError";
            throw e;
        })

        if (!space) {
            const e = new Error("This space does not exist");
            e.name = "NonexistantError";
            throw e;
        }

        const memberList = space.members;
        memberList.push(user._id);
        const newSpace = {
            name: space.name,
            owner: user._id,
            members: [...space.members, user._id],
        };

        await db.patch(space._id, newSpace);

        const userObject = {
            ...user,
            spaces: [...user.spaces, space._id],
        };

        await db.patch(user._id, userObject);
    } catch (e) {
        const error = new Error("Could Not join. Check your space ID");
        error.name = "ParseError";
        throw error;
    }
});
