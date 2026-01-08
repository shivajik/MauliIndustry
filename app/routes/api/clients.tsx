import type { LoaderFunctionArgs, ActionFunctionArgs } from "react-router";
import { dbService } from "~/lib/services/database";
import { clientSchema, createSuccessResponse, createErrorResponse } from "~/lib/api/validation";
import { ValidationError, ApiError } from "~/lib/api/errors";
import { requireAuth, getSessionIdFromRequest } from "~/lib/api/auth";

// GET /api/clients - List all clients
export async function loader({ request }: LoaderFunctionArgs) {
  try {
    const clients = await dbService.getClients();
    return Response.json(createSuccessResponse(clients), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error in clients loader:", error);
    return Response.json(
      createErrorResponse("Failed to fetch clients", error instanceof Error ? error.message : "Unknown error"),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}

// POST /api/clients - Create a new client
export async function action({ request }: ActionFunctionArgs) {
  try {
    const sessionId = getSessionIdFromRequest(request);
    requireAuth(sessionId);

    const body = await request.json();
    const validated = clientSchema.parse(body);

    const client = await dbService.createClient({
      id: validated.id,
      name: validated.name,
      logo_url: validated.logo_url || "",
    });

    return Response.json(createSuccessResponse(client, "Client created successfully"), {
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
    console.error("Error in clients action:", error);
    return Response.json(
      createErrorResponse("Failed to create client", error instanceof Error ? error.message : "Unknown error"),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}

