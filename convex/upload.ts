import { v } from "convex/values";
import { mutation } from "./_generated/server";

export const generateUploadUrl = mutation({
  handler: async (ctx) => {
    return await ctx.storage.generateUploadUrl();
  },
});

// TODO: Update to support all file types and integrate with rest of the storage
export const sendGlb = mutation({
  args: { storageId: v.id("_storage"), author: v.string() },
  handler: async (ctx, args) => {
    // await ctx.db.insert("messages", {
    //   body: args.storageId,
    //   author: args.author,
    //   format: ".glb,model/gltf-binary",
    // });
  },
});

export const sendImage = mutation({
  args: { storageId: v.id("_storage"), author: v.string() },
  handler: async (ctx, args) => {
    // await ctx.db.insert("messages", {
    //   body: args.storageId,
    //   author: args.author,
    //   format: "image",
    // });
  },
});
