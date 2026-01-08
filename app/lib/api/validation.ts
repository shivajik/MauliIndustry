import { z } from "zod";

// Product validation schemas
export const productSchema = z.object({
  id: z.string().min(1, "ID is required"),
  name: z.string().min(1, "Name is required"),
  description: z.string().optional().nullable(),
  image_url: z.string().url("Must be a valid URL").optional().nullable(),
});

export const productUpdateSchema = productSchema.partial().extend({
  id: z.string().min(1, "ID is required"),
});

// Client validation schemas
export const clientSchema = z.object({
  id: z.string().min(1, "ID is required"),
  name: z.string().min(1, "Name is required"),
  logo_url: z.string().url("Must be a valid URL").optional().nullable(),
});

export const clientUpdateSchema = clientSchema.partial().extend({
  id: z.string().min(1, "ID is required"),
});

// Company info validation schema
export const companyInfoSchema = z.object({
  name: z.string().min(1, "Name is required"),
  tagline: z.string().optional().nullable(),
  description: z.string().optional().nullable(),
  address_line1: z.string().optional().nullable(),
  address_line2: z.string().optional().nullable(),
  address_country: z.string().optional().nullable(),
  phone: z.string().optional().nullable(),
  email: z.string().email("Must be a valid email").optional().nullable(),
  website: z.string().optional().nullable(),
  profile_brief: z.string().optional().nullable(),
  profile_mission: z.string().optional().nullable(),
  profile_vision: z.string().optional().nullable(),
  profile_history: z.string().optional().nullable(),
  certifications: z.array(z.string()).optional().nullable(),
});

// Page validation schemas
export const pageSchema = z.object({
  id: z.string().min(1, "ID is required"),
  title: z.string().min(1, "Title is required"),
  slug: z.string().min(1, "Slug is required").regex(/^[a-z0-9-]+$/, "Slug must be lowercase alphanumeric with hyphens"),
  content: z.string().optional().nullable(),
  status: z.enum(["draft", "published"]).default("draft"),
  author: z.string().optional().nullable(),
  featured_image: z.string().url("Must be a valid URL").optional().nullable(),
  excerpt: z.string().optional().nullable(),
});

export const pageUpdateSchema = pageSchema.partial().extend({
  id: z.string().min(1, "ID is required"),
});

// API Response types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export function createSuccessResponse<T>(data: T, message?: string): ApiResponse<T> {
  return {
    success: true,
    data,
    message,
  };
}

export function createErrorResponse(error: string, message?: string): ApiResponse<never> {
  return {
    success: false,
    error,
    message,
  };
}


