import { UnauthorizedError } from "./errors";

// Simple session-based auth (replace with proper JWT/OAuth in production)
const ADMIN_EMAIL = process.env.ADMIN_EMAIL;
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;

export interface AuthSession {
  email: string;
  isAuthenticated: boolean;
  expiresAt: number;
}

// In-memory session store (use Redis or database in production)
const sessions = new Map<string, AuthSession>();

export function createSession(email: string): string {
  const sessionId = crypto.randomUUID();
  const expiresAt = Date.now() + 24 * 60 * 60 * 1000; // 24 hours

  sessions.set(sessionId, {
    email,
    isAuthenticated: true,
    expiresAt,
  });

  return sessionId;
}

export function getSession(sessionId: string | null | undefined): AuthSession | null {
  if (!sessionId) return null;

  const session = sessions.get(sessionId);
  if (!session) return null;

  if (Date.now() > session.expiresAt) {
    sessions.delete(sessionId);
    return null;
  }

  return session;
}

export function deleteSession(sessionId: string): void {
  sessions.delete(sessionId);
}

export function verifyCredentials(email: string, password: string): boolean {
  return email === ADMIN_EMAIL && password === ADMIN_PASSWORD;
}

export function requireAuth(sessionId: string | null | undefined): AuthSession {
  const session = getSession(sessionId);
  if (!session || !session.isAuthenticated) {
    throw new UnauthorizedError("Authentication required");
  }
  return session;
}

export function getSessionIdFromRequest(request: Request): string | null {
  const cookieHeader = request.headers.get("Cookie");
  if (!cookieHeader) return null;

  const cookies = cookieHeader.split(";").reduce((acc, cookie) => {
    const [key, value] = cookie.trim().split("=");
    acc[key] = value;
    return acc;
  }, {} as Record<string, string>);

  return cookies["session-id"] || null;
}


