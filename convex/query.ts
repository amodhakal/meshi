import { query } from "./_generated/server";
import { v } from "convex/values";

export type OwnedMeshiType = {
  _creationTime: number;
  _id: string;
  description: string;
  creatorId: string;
  title: string;
  thumbnailUrl: string;
};

export const getMeshiByCreatorId = query({
  args: { creatorId: v.optional(v.string()) },
  handler: async (ctx, args) => {
    const ownedMeshi = await ctx.db
      .query("uploaded")
      .filter((q) => q.eq(q.field("creatorId"), args.creatorId))
      .order("desc")
      .collect();

    return Promise.all(
      ownedMeshi.map(
        async (item) =>
          ({
            ...item,
            thumbnailUrl: await ctx.storage.getUrl(item.thumbnailId),
          }) as OwnedMeshiType
      )
    );
  },
});

// export const list = query({
//   args: {},
//   handler: async (ctx) => {
//     const messages = await ctx.db.query("messages").collect();
//     return Promise.all(
//       messages.map(async (message) => ({
//         ...message,
//         // If the message is an "image" its `body` is an `Id<"_storage">`
//         ...(message.format === "image"
//           ? { url: await ctx.storage.getUrl(message.body) }
//           : {}),
//       })),
//     );
//   },
// });
