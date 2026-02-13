import { Request, Response, NextFunction } from "express";
import { verifyAccessToken, TokenPayload } from "../lib/auth";

// Extend Express Request to include user
declare global {
  namespace Express {
    interface Request {
      user?: TokenPayload;
    }
  }
}

// Requires valid access token — rejects 401 if missing/invalid
export function requireAuth(req: Request, res: Response, next: NextFunction) {
  const token = req.cookies?.access_token;
  if (!token) {
    return res.status(401).json({ error: "UNAUTHORIZED", message: "Vui lòng đăng nhập" });
  }

  try {
    req.user = verifyAccessToken(token);
    next();
  } catch {
    return res.status(401).json({ error: "UNAUTHORIZED", message: "Phiên đăng nhập hết hạn" });
  }
}

// Requires valid access token + ADMIN role
export function requireAdmin(req: Request, res: Response, next: NextFunction) {
  const token = req.cookies?.access_token;
  if (!token) {
    return res.status(401).json({ error: "UNAUTHORIZED", message: "Vui lòng đăng nhập" });
  }

  try {
    const payload = verifyAccessToken(token);
    if (payload.role !== "ADMIN") {
      return res.status(403).json({ error: "FORBIDDEN", message: "Không có quyền truy cập" });
    }
    req.user = payload;
    next();
  } catch {
    return res.status(401).json({ error: "UNAUTHORIZED", message: "Phiên đăng nhập hết hạn" });
  }
}

// Attaches user if token present, continues either way
export function optionalAuth(req: Request, res: Response, next: NextFunction) {
  const token = req.cookies?.access_token;
  if (token) {
    try {
      req.user = verifyAccessToken(token);
    } catch {
      // Token invalid/expired — continue without user
    }
  }
  next();
}
