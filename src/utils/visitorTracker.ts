import { api } from "../../convex/_generated/api";
import { ConvexClient } from "convex/browser";

export async function runVisitorTracker(convex: ConvexClient, elementId = "visitorCount") {
  const navEntry = window.performance.getEntriesByType("navigation")[0] as PerformanceNavigationTiming;
  const isFresh = !navEntry?.type?.includes("back_forward") && !navEntry?.type?.includes("reload");
  const tracked = sessionStorage.getItem("site_visit_counted");

  if (isFresh && !tracked) {
    sessionStorage.setItem("site_visit_counted", "true");
    await convex.mutation(api.visitors.incrementVisitorCount, {});
  }

  const data = await convex.query(api.visitors.getVisitorCount, {});
  const el = document.getElementById(elementId);
  if (el && data) {
    el.textContent = data.count.toString();
  }
}
