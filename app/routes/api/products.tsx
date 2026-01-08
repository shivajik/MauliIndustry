import type { LoaderFunctionArgs, ActionFunctionArgs } from "react-router";
import { dbService } from "~/lib/services/database";
import { productSchema, productUpdateSchema, createSuccessResponse, createErrorResponse } from "~/lib/api/validation";
import { ValidationError, ApiError } from "~/lib/api/errors";
import { requireAuth, getSessionIdFromRequest } from "~/lib/api/auth";

// GET /api/products - List all products
export async function loader({ request }: LoaderFunctionArgs) {
  try {
    const products = await dbService.getProducts();
    return Response.json(createSuccessResponse(products), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error in products loader:", error);
    return Response.json(
      createErrorResponse("Failed to fetch products", error instanceof Error ? error.message : "Unknown error"),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}

// POST /api/products - Create a new product
export async function action({ request }: ActionFunctionArgs) {
  try {
    const sessionId = getSessionIdFromRequest(request);
    requireAuth(sessionId);

    const body = await request.json();
    const validated = productSchema.parse(body);

    const product = await dbService.createProduct({
      id: validated.id,
      name: validated.name,
      description: validated.description || "",
      image_url: validated.image_url || "",
    });

    return Response.json(createSuccessResponse(product, "Product created successfully"), {
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
    console.error("Error in products action:", error);
    return Response.json(
      createErrorResponse("Failed to create product", error instanceof Error ? error.message : "Unknown error"),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}

