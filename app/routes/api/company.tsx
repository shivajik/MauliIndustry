import type { LoaderFunctionArgs, ActionFunctionArgs } from "react-router";
import { dbService } from "~/lib/services/database";
import type { CompanyInfo } from "~/lib/db";
import { companyInfoSchema, createSuccessResponse, createErrorResponse } from "~/lib/api/validation";
import { ValidationError, ApiError } from "~/lib/api/errors";
import { requireAuth, getSessionIdFromRequest } from "~/lib/api/auth";

// GET /api/company - Get company info
export async function loader({ request }: LoaderFunctionArgs) {
  try {
    const company = await dbService.getCompanyInfo();
    return Response.json(createSuccessResponse(company), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error in company loader:", error);
    return Response.json(
      createErrorResponse("Failed to fetch company info", error instanceof Error ? error.message : "Unknown error"),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}

// PUT /api/company - Update company info
export async function action({ request }: ActionFunctionArgs) {
  try {
    const sessionId = getSessionIdFromRequest(request);
    requireAuth(sessionId);

    const body = await request.json();
    const validated = companyInfoSchema.parse(body);

    // Convert null to undefined for optional fields
    const updates: Partial<CompanyInfo> = {
      name: validated.name,
      tagline: validated.tagline ?? undefined,
      description: validated.description ?? undefined,
      address_line1: validated.address_line1 ?? undefined,
      address_line2: validated.address_line2 ?? undefined,
      address_country: validated.address_country ?? undefined,
      phone: validated.phone ?? undefined,
      email: validated.email ?? undefined,
      website: validated.website ?? undefined,
      profile_brief: validated.profile_brief ?? undefined,
      profile_mission: validated.profile_mission ?? undefined,
      profile_vision: validated.profile_vision ?? undefined,
      profile_history: validated.profile_history ?? undefined,
      certifications: validated.certifications ?? undefined,
    };

    const company = await dbService.updateCompanyInfo(updates);

    return Response.json(createSuccessResponse(company, "Company info updated successfully"), {
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
    console.error("Error in company action:", error);
    return Response.json(
      createErrorResponse("Failed to update company info", error instanceof Error ? error.message : "Unknown error"),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}

