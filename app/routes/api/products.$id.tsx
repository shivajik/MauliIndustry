import type { LoaderFunctionArgs, ActionFunctionArgs } from "react-router";
import { dbService } from "~/lib/services/database";
import { productUpdateSchema, createSuccessResponse, createErrorResponse } from "~/lib/api/validation";
import { ValidationError, ApiError } from "~/lib/api/errors";
import { requireAuth, getSessionIdFromRequest } from "~/lib/api/auth";

// GET /api/products/:id - Get a single product
export async function loader({ params }: LoaderFunctionArgs) {
  try {
    if (!params.id) {
      return Response.json(createErrorResponse("Product ID is required"), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }
    const product = await dbService.getProduct(params.id);
    return Response.json(createSuccessResponse(product), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    if (error instanceof ApiError) {
      return Response.json(createErrorResponse(error.message), {
        status: error.statusCode,
        headers: { "Content-Type": "application/json" },
      });
    }
    console.error("Error in product loader:", error);
    return Response.json(
      createErrorResponse("Failed to fetch product", error instanceof Error ? error.message : "Unknown error"),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}

// PUT /api/products/:id - Update a product
// DELETE /api/products/:id - Delete a product
export async function action({ request, params }: ActionFunctionArgs) {
  try {
    const sessionId = getSessionIdFromRequest(request);
    requireAuth(sessionId);

    const method = request.method;

    if (method === "PUT") {
      if (!params.id) {
        return Response.json(createErrorResponse("Product ID is required"), {
          status: 400,
          headers: { "Content-Type": "application/json" },
        });
      }
      const body = await request.json();
      const validated = productUpdateSchema.parse({ ...body, id: params.id });

      const product = await dbService.updateProduct(params.id, {
        name: validated.name,
        description: validated.description ?? undefined,
        image_url: validated.image_url ?? undefined,
      });

      return Response.json(createSuccessResponse(product, "Product updated successfully"), {
        headers: { "Content-Type": "application/json" },
      });
    }

    if (method === "DELETE") {
      if (!params.id) {
        return Response.json(createErrorResponse("Product ID is required"), {
          status: 400,
          headers: { "Content-Type": "application/json" },
        });
      }
      await dbService.deleteProduct(params.id);
      return Response.json(createSuccessResponse(null, "Product deleted successfully"), {
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
    console.error("Error in product action:", error);
    return Response.json(
      createErrorResponse("Failed to process request", error instanceof Error ? error.message : "Unknown error"),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}

