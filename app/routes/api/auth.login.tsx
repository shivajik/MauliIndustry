import type { ActionFunctionArgs } from "react-router";
import { createSession, verifyCredentials } from "~/lib/api/auth";
import { createSuccessResponse, createErrorResponse } from "~/lib/api/validation";
import { ValidationError } from "~/lib/api/errors";
import { z } from "zod";

const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
});

// POST /api/auth/login - Authenticate user
export async function action({ request }: ActionFunctionArgs) {
  try {
    const body = await request.json();
    const { email, password } = loginSchema.parse(body);

    if (!verifyCredentials(email, password)) {
      return Response.json(createErrorResponse("Invalid credentials"), {
        status: 401,
        headers: { "Content-Type": "application/json" },
      });
    }

    const sessionId = createSession(email);

    return Response.json(
      createSuccessResponse({ sessionId, email }, "Login successful"),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          "Set-Cookie": `session-id=${sessionId}; HttpOnly; Path=/; Max-Age=${24 * 60 * 60}; SameSite=Lax`,
        },
      }
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      return Response.json(
        createErrorResponse("Validation failed", error.issues.map((e) => e.message).join(", ")),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }
    console.error("Error in login action:", error);
    return Response.json(
      createErrorResponse("Failed to login", error instanceof Error ? error.message : "Unknown error"),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}

