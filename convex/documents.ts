import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { Doc, Id } from "../convex/_generated/dataModel";

export const archive = mutation({
  args: { id: v.id("documents") },
  handler: async (ctx, args) => {
    const Identity = await ctx.auth.getUserIdentity();

    if (!Identity) {
      throw new Error(" You are Not logged in");
    }

    const userId = Identity.subject;

    const existingDocument = await ctx.db.get(args.id);

    if (!existingDocument) {
      throw new Error("Document not found");
    }

    if (existingDocument.userId !== userId) {
      throw new Error("You are not authorized to delete this document");
    }

    const recursiveArchive = async (documentId: Id<"documents">) => {
      const children = await ctx.db
        .query("documents")
        .withIndex("by_user_parent", (q) =>
          q.eq("userId", userId).eq("parentDocument", documentId)
        )
        .collect();

      for (const child of children) {
        await ctx.db.patch(child._id, {
          isArchived: true
        });

        await recursiveArchive(child._id);
      }
    };

    const document = await ctx.db.patch(args.id, {
      isArchived: true
    });

    recursiveArchive(args.id);

    return document;
  }
});

export const getSideBar = query({
  args: {
    parentDocument: v.optional(v.id("documents"))
  },
  handler: async (ctx, args) => {
    const Identity = await ctx.auth.getUserIdentity();
    if (!Identity) {
      throw new Error(" You are Not logged in");
    }

    const userId = Identity.subject;

    const documents = await ctx.db
      .query("documents")
      .withIndex("by_user_parent", (q) =>
        q.eq("userId", userId).eq("parentDocument", args.parentDocument)
      )
      .filter((q) => q.eq(q.field("isArchived"), false))
      .order("desc")
      .collect();

    return documents;
  }
});

export const create = mutation({
  args: {
    title: v.string(),
    parentDocument: v.optional(v.id("documents"))
  },
  handler: async (ctx, args) => {
    const Identity = await ctx.auth.getUserIdentity();

    if (!Identity) {
      throw new Error(" You are Not logged in");
    }

    const userId = Identity.subject;

    const document = await ctx.db.insert("documents", {
      title: args.title,
      parentDocument: args.parentDocument,
      userId,
      isArchived: false,
      isPublished: false
    });

    return document;
  }
});

export const getTrash = query({
  handler: async (ctx) => {
    const Identity = await ctx.auth.getUserIdentity();

    if (!Identity) {
      throw new Error(" You are Not logged in");
    }

    const userId = Identity.subject;

    const documents = await ctx.db
      .query("documents")
      .withIndex("by_user", (q) => q.eq("userId", userId))
      .filter((q) => q.eq(q.field("isArchived"), true))
      .order("desc")
      .collect();

    return documents;
  }
});

export const restore = mutation({
  args: { id: v.id("documents") },
  handler: async (ctx, args) => {
    const Identity = await ctx.auth.getUserIdentity();

    if (!Identity) {
      throw new Error(" You are Not logged in");
    }

    const userId = Identity.subject;

    const existingDocument = await ctx.db.get(args.id);

    if (!existingDocument) {
      throw new Error(" Document not found in trash");
    }

    if (existingDocument.userId !== userId) {
      throw new Error("You are not authorized to view this page");
    }

    const recursiveRestore = async (documentId: Id<"documents">) => {
      const children = await ctx.db
        .query("documents")
        .withIndex("by_user_parent", (q) =>
          q.eq("userId", userId).eq("parentDocument", documentId)
        )
        .collect();

      for (const child of children) {
        await ctx.db.patch(child._id, {
          isArchived: false
        });

        await recursiveRestore(child._id);
      }
    };

    const options: Partial<Doc<"documents">> = {
      isArchived: false
    };

    if (existingDocument.parentDocument) {
      const parent = await ctx.db.get(existingDocument.parentDocument);
      if (parent?.isArchived) {
        options.parentDocument = undefined;
      }
    }

    const documents = await ctx.db.patch(args.id, options);
    recursiveRestore(args.id);
    return documents;
  }
});

export const remove = mutation({
  args: { id: v.id("documents") },
  handler: async (ctx, args) => {
    const Identity = await ctx.auth.getUserIdentity();

    if (!Identity) {
      throw new Error(" You are Not logged in");
    }

    const userId = Identity.subject;

    const existingDocument = await ctx.db.get(args.id);

    if (!existingDocument) {
      throw new Error(" Document not found in trash");
    }

    if (existingDocument.userId !== userId) {
      throw new Error("You are not authorized to view this page");
    }

    const document = await ctx.db.delete(args.id);

    return document;
  }
});

export const getSearch = query({
  handler: async (ctx) => {
    const Identity = await ctx.auth.getUserIdentity();

    if (!Identity) {
      throw new Error(" You are Not logged in");
    }

    const userId = Identity.subject;

    const documents = await ctx.db
      .query("documents")
      .withIndex("by_user", (q) => q.eq("userId", userId))
      .filter((q) => q.eq(q.field("isArchived"), false))
      .order("desc")
      .collect();

    return documents;
  }
});

export const getById = query({
  args: { documentId: v.id("documents") },
  handler: async (ctx, args) => {
    const Identity = await ctx.auth.getUserIdentity();

    const document = await ctx.db.get(args.documentId);

    if (!document) {
      throw new Error("Document not found");
    }
    if (document.isPublished && !document.isArchived) {
      return document;
    } else if (document.isPublished && document.isArchived) {
      throw new Error("Documents is in trash! Please restore it to publish");
    }

    if (!Identity) {
      throw new Error("Not Authorized");
    }

    const userId = Identity.subject;

    if (document.userId !== userId) {
      throw new Error("You are not authorized to view this page");
    }

    return document;
  }
});

export const update = mutation({
  args: {
    id: v.id("documents"),
    title: v.optional(v.string()),
    content: v.optional(v.string()),
    coverImage: v.optional(v.string()),
    icon: v.optional(v.string()),
    isPublished: v.optional(v.boolean())
  },
  handler: async (ctx, args) => {
    const Identity = await ctx.auth.getUserIdentity();

    if (!Identity) {
      throw new Error(" You are Not logged in");
    }

    const userId = Identity.subject;

    const { id, ...rest } = args;

    const existingDocument = await ctx.db.get(args.id);

    if (!existingDocument) {
      throw new Error("Not found");
    }

    if (existingDocument.userId !== userId) {
      throw new Error("You are not authorized to view this page");
    }

    const document = await ctx.db.patch(args.id, {
      ...rest
    });

    return document;
  }
});

export const removeIcon = mutation({
  args: {
    id: v.id("documents")
  },
  handler: async (ctx, args) => {
    const Identity = await ctx.auth.getUserIdentity();

    if (!Identity) {
      throw new Error("Not Authorized");
    }

    const userId = Identity.subject;

    const existingDocument = await ctx.db.get(args.id);
    if (!existingDocument) {
      throw new Error("Not Found.");
    }
    if (existingDocument.userId !== userId) {
      throw new Error("Not Authorized .");
    }

    const document = await ctx.db.patch(args.id, {
      icon: undefined
    });

    return document;
  }
});

export const removeCover = mutation({
  args: {
    id: v.id("documents")
  },
  handler: async (ctx, args) => {
    const Identity = await ctx.auth.getUserIdentity();

    if (!Identity) {
      throw new Error("Not Authorized");
    }

    const userId = Identity.subject;

    const existingDocument = await ctx.db.get(args.id);
    if (!existingDocument) {
      throw new Error("Not Found.");
    }
    if (existingDocument.userId !== userId) {
      throw new Error("Not Authorized .");
    }

    const document = await ctx.db.patch(args.id, {
      coverImage: undefined
    });

    return document;
  }
});
