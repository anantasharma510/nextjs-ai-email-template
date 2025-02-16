import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const SaveTemplate = mutation({
    args: {
      tid: v.string(),
      design: v.any(),
      email: v.string(),
      description: v.string(), // Ensure description is passed correctly
    },
    handler: async (ctx, args) => {
      try {
        const result = await ctx.db.insert('emailTemplates', {
          tid: args.tid,
          design: args.design,
          email: args.email,
          description: args.description, // Fix: use args.description to pass the description
        });
  
        console.log("Template saved successfully:", result);
      } catch (e) {
        console.error("Error saving template:", e);
      }
    }
  });
  
  
  export const GetTemplateDesign = query({
    args: {
      email: v.string(),
      tid: v.string(),
    },
    handler: async (ctx, { email, tid }) => {
      try {
        const result = await ctx.db
          .query('emailTemplates')
          .filter(q => q.eq(q.field('tid'), tid) && q.eq(q.field('email'), email)) // Simplified filter logic
          .collect();
  
        return result; // Returning the result directly
      } catch (e) {
        console.error("Error fetching template design:", e);
        // Return an error response object instead of just a message
        return { error: "Failed to fetch template design.", details: e.message };
      }
    },
  });
  
  export const UpdateTemplateDesign=query({
    args: {
      email: v.string(),
      tid: v.string(),
      design: v.any(),
    },
    handler: async (ctx, { email, tid, design }) => {
      try {
        const result = await ctx.db
          .update('emailTemplates')
          .filter(q => q.eq(q.field('tid'), tid) && q.eq(q.field('email'), email)) // Simplified filter logic
          .set({ design })
          .collect();
  
        return result; // Returning the result directly
      } catch (e) {
        console.error("Error updating template design:", e);
        // Return an error response object instead of just a message
        return { error: "Failed to update template design.", details: e.message };
      }
    },
  });