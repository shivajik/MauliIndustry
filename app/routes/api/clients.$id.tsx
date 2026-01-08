import type { LoaderFunctionArgs, ActionFunctionArgs } from "react-router";
import { dbService } from "~/lib/services/database";
import { clientUpdateSchema, createSuccessResponse, createErrorResponse } from "~/lib/api/validation";
import { ValidationError, ApiError } from "~/lib/api/errors";
import { requireAuth, getSessionIdFromRequest } from "~/lib/api/auth";

// GET /api/clients/:id - Get a single client
export async function loader({ params }: LoaderFunctionArgs) {
  try {
    if (!params.id) {
      return Response.json(createErrorResponse("Client ID is required"), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }
    const client = await dbService.getClient(params.id);
    return Response.json(createSuccessResponse(client), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    if (error instanceof ApiError) {
      return Response.json(createErrorResponse(error.message), {
        status: error.statusCode,
        headers: { "Content-Type": "application/json" },
      });
    }
    console.error("Error in client loader:", error);
    return Response.json(
      createErrorResponse("Failed to fetch client", error instanceof Error ? error.message : "Unknown error"),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}

// PUT /api/clients/:id - Update a client
// DELETE /api/clients/:id - Delete a client
export async function action({ request, params }: ActionFunctionArgs) {
  try {
    const sessionId = getSessionIdFromRequest(request);
    requireAuth(sessionId);

    const method = request.method;

    if (method === "PUT") {
      if (!params.id) {
        return Response.json(createErrorResponse("Client ID is required"), {
          status: 400,
          headers: { "Content-Type": "application/json" },
        });
      }
      const body = await request.json();
      const validated = clientUpdateSchema.parse({ ...body, id: params.id });

      const client = await dbService.updateClient(params.id, {
        name: validated.name,
        logo_url: validated.logo_url ?? undefined,
      });

      return Response.json(createSuccessResponse(client, "Client updated successfully"), {
        headers: { "Content-Type": "application/json" },
      });
    }

    if (method === "DELETE") {
      if (!params.id) {
        return Response.json(createErrorResponse("Client ID is required"), {
          status: 400,
          headers: { "Content-Type": "application/json" },
        });
      }
      await dbService.deleteClient(params.id);
      return Response.json(createSuccessResponse(null, "Client deleted successfully"), {
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
    console.error("Error in client action:", error);
    return Response.json(
      createErrorResponse("Failed to process request", error instanceof Error ? error.message : "Unknown error"),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}

