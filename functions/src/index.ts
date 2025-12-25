import { onRequest } from "firebase-functions/v2/https";
import { contact } from "./api/contact";
import { earlyAccess } from "./api/early-access";
import { experts } from "./api/experts";
import { quizSubmit } from "./api/quiz-submit";
import { matchesRequest } from "./api/matches-request";

// API Routes - Single function that routes to handlers
export const api = onRequest(async (req, res) => {
  // Get the path after /api
  const url = new URL(req.url, `http://${req.headers.host}`);
  let path = url.pathname;
  
  // Remove /api prefix if present
  if (path.startsWith("/api")) {
    path = path.replace(/^\/api/, "");
  }
  
  // Normalize path
  if (!path.startsWith("/")) {
    path = "/" + path;
  }
  path = path.replace(/\/$/, "") || "/";

  // Route to appropriate handler
  if (path === "/contact") {
    return contact(req, res);
  } else if (path === "/forms/early-access") {
    return earlyAccess(req, res);
  } else if (path === "/forms/experts") {
    return experts(req, res);
  } else if (path === "/quiz/submit") {
    return quizSubmit(req, res);
  } else if (path === "/matches/request") {
    return matchesRequest(req, res);
  } else {
    res.status(404).json({ error: "Not found", path });
  }
});

