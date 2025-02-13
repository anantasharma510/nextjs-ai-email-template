// Importing required modules from convex
import { defineSchema, defineTable } from 'convex/server';
import { v } from 'convex/values';

// Defining the schema with proper syntax
export default defineSchema({
  users: defineTable({
    name: v.string(),
    email: v.string(),
    picture: v.string(),
    credits: v.number()
  })
});
