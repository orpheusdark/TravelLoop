import type { ActivitySummary } from "@/lib/types";

export function dedupeActivities(activities: ActivitySummary[]) {
  const seen = new Set<string>();

  return activities.filter((activity) => {
    const key = `${activity.title.trim().toLowerCase()}:${activity.category.trim().toLowerCase()}`;

    if (seen.has(key)) {
      return false;
    }

    seen.add(key);
    return true;
  });
}