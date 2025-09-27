import { v } from "convex/values";
import { mutation } from "./_generated/server";

export const generateUploadUrl = mutation({
  handler: async (ctx) => {
    return await ctx.storage.generateUploadUrl();
  },
});

export const uploadFiles = mutation({
  args: {
    description: v.optional(v.string()),
    thumbnailId: v.optional(v.string()),
    glbId: v.string(),
    title: v.string(),
    creatorId: v.string(),
  },
  handler: async (ctx, args) => {
    const { thumbnailId, glbId, title, description, creatorId } = args;
    await ctx.db.insert("uploaded", {
      thumbnailId,
      glbId,
      title,
      description,
      creatorId,
    });
  },
});
