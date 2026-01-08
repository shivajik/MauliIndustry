import type { LoaderFunctionArgs, ActionFunctionArgs } from "react-router";
import { dbService } from "~/lib/services/database";
import { pageUpdateSchema, createSuccessResponse, createErrorResponse } from "~/lib/api/validation";
import { ValidationError, ApiError } from "~/lib/api/errors";
import { requireAuth, getSessionIdFromRequest } from "~/lib/api/auth";

// GET /api/pages/:id - Get a single page
export async function loader({ params }: LoaderFunctionArgs) {
  try {
    if (!params.id) {
      return Response.json(createErrorResponse("Page ID is required"), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }
    const page = await dbService.getPage(params.id);
    return Response.json(createSuccessResponse(page), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    if (error instanceof ApiError) {
      return Response.json(createErrorResponse(error.message), {
        status: error.statusCode,
        headers: { "Content-Type": "application/json" },
      });
    }
    console.error("Error in page loader:", error);
    return Response.json(
      createErrorResponse("Failed to fetch page", error instanceof Error ? error.message : "Unknown error"),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}

// PUT /api/pages/:id - Update a page
// DELETE /api/pages/:id - Delete a page
export async function action({ request, params }: ActionFunctionArgs) {
  try {
    const sessionId = getSessionIdFromRequest(request);
    requireAuth(sessionId);

    const method = request.method;

    if (method === "PUT") {
      if (!params.id) {
        return Response.json(createErrorResponse("Page ID is required"), {
          status: 400,
          headers: { "Content-Type": "application/json" },
        });
      }
      const body = await request.json();
      const validated = pageUpdateSchema.parse({ ...body, id: params.id });

      const page = await dbService.updatePage(params.id, {
        title: validated.title,
        slug: validated.slug,
        content: validated.content ?? undefined,
        status: validated.status,
        author: validated.author ?? undefined,
        featured_image: validated.featured_image ?? undefined,
        excerpt: validated.excerpt ?? undefined,
      });

      return Response.json(createSuccessResponse(page, "Page updated successfully"), {
        headers: { "Content-Type": "application/json" },
      });
    }

    if (method === "DELETE") {
      if (!params.id) {
        return Response.json(createErrorResponse("Page ID is required"), {
          status: 400,
          headers: { "Content-Type": "application/json" },
        });
      }
      await dbService.deletePage(params.id);
      return Response.json(createSuccessResponse(null, "Page deleted successfully"), {
        headers: { "Content-Type": "application/json" },
      });
    }

    return Response.json(createErrorResponse("Method not allowed"), {
      status: 405,
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
    console.error("Error in page action:", error);
    return Response.json(
      createErrorResponse("Failed to process request", error instanceof Error ? error.message : "Unknown error"),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}

