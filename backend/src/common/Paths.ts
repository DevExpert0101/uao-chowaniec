/**
 * Express router paths go here.
 */

export default {
  Base: "/api",
  Events: {
    Base: "/events",
    Get: "/",
    Add: "/",
    Update: "/:id",
    Delete: "/:id",
  },
} as const;
