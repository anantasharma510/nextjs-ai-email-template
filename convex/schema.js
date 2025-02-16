// Importing required modules from Convex
import { Description } from "@radix-ui/react-dialog";
import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

// Defining the schema with proper syntax
export default defineSchema({
  users: defineTable({
    name: v.string(),
    email: v.string(),
    picture: v.string(),
    credits: v.number(),
  })
  ,

  emailTemplates: defineTable({
    tid: v.string(),
    design: v.any(),
    description: v.string(),
    email: v.string(),
  }),
});
