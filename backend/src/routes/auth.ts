import { Router, Request, Response } from "express";
import prisma from "../lib/prisma";
import { hashPassword, verifyPassword, signAccessToken, signRefreshToken, verifyRefreshToken, TokenPayload } from "../lib/auth";
import { setCookies, clearCookies } from "../lib/cookies";
import { requireAuth } from "../middleware/auth";
import { sanitize, sanitizeStrip } from "../lib/sanitize";

const router = Router();

// POST /api/auth/register
router.post("/auth/register", async (req: Request, res: Response) => {
  try {
    const { email, password, name, phone } = req.body;

    // Validation
    if (!email?.trim() || !password || !name?.trim()) {
      return res.status(400).json({
        error: "VALIDATION_ERROR",
        message: "Email, mật khẩu và họ tên là bắt buộc",
      });
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return res.status(400).json({ error: "VALIDATION_ERROR", message: "Email không hợp lệ" });
    }

    if (password.length < 6) {
      return res.status(400).json({ error: "VALIDATION_ERROR", message: "Mật khẩu tối thiểu 6 ký tự" });
    }

    // Check duplicate (use sanitized email)
    const safeEmailCheck = sanitizeStrip(email).toLowerCase();
    const existing = await prisma.user.findUnique({ where: { email: safeEmailCheck } });
    if (existing) {
      return res.status(409).json({ error: "CONFLICT", message: "Email đã được sử dụng" });
    }

    // Sanitize inputs
    const safeName = sanitize(name);
    const safeEmail = sanitizeStrip(email).toLowerCase();
    const safePhone = phone ? sanitizeStrip(phone) : null;

    // Create user
    const passwordHash = await hashPassword(password);
    const user = await prisma.user.create({
      data: {
        email: safeEmail,
        passwordHash,
        name: safeName,
        phone: safePhone,
        role: "CUSTOMER",
      },
    });

    // Issue tokens
    const payload: TokenPayload = { userId: user.id, email: user.email, role: user.role };
    const accessToken = signAccessToken(payload);
    const refreshToken = signRefreshToken(payload);
    setCookies(res, accessToken, refreshToken);

    res.status(201).json({
      user: { id: user.id, email: user.email, name: user.name, role: user.role },
    });
  } catch (err) {
    console.error("Register error:", err);
    res.status(500).json({ error: "SERVER_ERROR", message: "Lỗi đăng ký" });
  }
});

// POST /api/auth/login
router.post("/auth/login", async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "VALIDATION_ERROR", message: "Email và mật khẩu là bắt buộc" });
    }

    const user = await prisma.user.findUnique({ where: { email: email.toLowerCase().trim() } });
    if (!user) {
      return res.status(401).json({ error: "UNAUTHORIZED", message: "Email hoặc mật khẩu không đúng" });
    }

    const valid = await verifyPassword(password, user.passwordHash);
    if (!valid) {
      return res.status(401).json({ error: "UNAUTHORIZED", message: "Email hoặc mật khẩu không đúng" });
    }

    // Issue tokens
    const payload: TokenPayload = { userId: user.id, email: user.email, role: user.role };
    const accessToken = signAccessToken(payload);
    const refreshToken = signRefreshToken(payload);
    setCookies(res, accessToken, refreshToken);

    res.json({
      user: { id: user.id, email: user.email, name: user.name, role: user.role },
    });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ error: "SERVER_ERROR", message: "Lỗi đăng nhập" });
  }
});

// POST /api/auth/logout
router.post("/auth/logout", (_req: Request, res: Response) => {
  clearCookies(res);
  res.json({ message: "Đã đăng xuất" });
});

// POST /api/auth/refresh
router.post("/auth/refresh", async (req: Request, res: Response) => {
  try {
    const token = req.cookies?.refresh_token;
    if (!token) {
      return res.status(401).json({ error: "UNAUTHORIZED", message: "Không có refresh token" });
    }

    let payload: TokenPayload;
    try {
      payload = verifyRefreshToken(token);
    } catch {
      clearCookies(res);
      return res.status(401).json({ error: "UNAUTHORIZED", message: "Refresh token hết hạn" });
    }

    // Verify user still exists
    const user = await prisma.user.findUnique({ where: { id: payload.userId } });
    if (!user) {
      clearCookies(res);
      return res.status(401).json({ error: "UNAUTHORIZED", message: "Tài khoản không tồn tại" });
    }

    // Issue fresh tokens
    const newPayload: TokenPayload = { userId: user.id, email: user.email, role: user.role };
    const accessToken = signAccessToken(newPayload);
    const refreshToken = signRefreshToken(newPayload);
    setCookies(res, accessToken, refreshToken);

    res.json({
      user: { id: user.id, email: user.email, name: user.name, role: user.role },
    });
  } catch (err) {
    console.error("Refresh error:", err);
    res.status(500).json({ error: "SERVER_ERROR", message: "Lỗi refresh token" });
  }
});

// GET /api/auth/me — requires auth
router.get("/auth/me", requireAuth, async (req: Request, res: Response) => {
  try {
    const user = await prisma.user.findUnique({ where: { id: req.user!.userId } });
    if (!user) {
      return res.status(404).json({ error: "NOT_FOUND", message: "Tài khoản không tồn tại" });
    }

    res.json({
      user: { id: user.id, email: user.email, name: user.name, phone: user.phone, role: user.role },
    });
  } catch (err) {
    console.error("Me error:", err);
    res.status(500).json({ error: "SERVER_ERROR", message: "Lỗi lấy thông tin tài khoản" });
  }
});

export default router;
