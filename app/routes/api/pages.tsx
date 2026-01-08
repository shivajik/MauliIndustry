import type { LoaderFunctionArgs, ActionFunctionArgs } from "react-router";
import { dbService } from "~/lib/services/database";
import { pageSchema, createSuccessResponse, createErrorResponse } from "~/lib/api/validation";
import { ValidationError, ApiError } from "~/lib/api/errors";
import { requireAuth, getSessionIdFromRequest } from "~/lib/api/auth";

// GET /api/pages - List all pages
export async function loader({ request }: LoaderFunctionArgs) {
  try {
    const pages = await dbService.getPages();
    return Response.json(createSuccessResponse(pages), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error in pages loader:", error);
    return Response.json(
      createErrorResponse("Failed to fetch pages", error instanceof Error ? error.message : "Unknown error"),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}

// POST /api/pages - Create a new page
export async function action({ request }: ActionFunctionArgs) {
  try {
    const sessionId = getSessionIdFromRequest(request);
    requireAuth(sessionId);

    const body = await request.json();
    const validated = pageSchema.parse(body);

    const page = await dbService.createPage({
      id: validated.id,
      title: validated.title,
      slug: validated.slug,
      content: validated.content || "",
      status: validated.status,
      author: validated.author || "",
      featured_image: validated.featured_image ?? undefined,
      excerpt: validated.excerpt ?? undefined,
    });

    return Response.json(createSuccessResponse(page, "Page created successfully"), {
      status: 201,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    if (error instanceof ValidationError) {
      return Response.json(createErrorResponse(error.message), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }
    if (error instanceof ApiError) {
      return Response.json(createErrorResponse(error.message), {
        status: error.statusCode,
        headers: { "Content-Type": "application/json" },
      });
    }
    console.error("Error in pages action:", error);
    return Response.json(
      createErrorResponse("Failed to create page", error instanceof Error ? error.message : "Unknown error"),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}

