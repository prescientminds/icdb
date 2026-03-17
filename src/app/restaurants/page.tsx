import Link from "next/link";
import { restaurants, stops, chefs } from "@/lib/data";

export default function RestaurantsPage() {
  const sorted = [...restaurants].sort((a, b) => {
    const aStars = (a.ratings as Record<string, number>)?.michelin_stars || 0;
    const bStars = (b.ratings as Record<string, number>)?.michelin_stars || 0;
    if (bStars !== aStars) return bStars - aStars;
    return a.name.localeCompare(b.name);
  });

  return (
    <div>
      <h1 className="text-3xl font-bold tracking-tight text-stone-900 mb-6">
        Restaurants
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {sorted.map((r) => {
          const stars = (r.ratings as Record<string, number>)?.michelin_stars;
          const staff = stops.filter(
            (s) => s.restaurant_id === r.id && s.is_current
          );
          const allStaff = stops.filter((s) => s.restaurant_id === r.id);

          return (
            <Link
              key={r.id}
              href={`/restaurants/${r.id}`}
              className="block rounded-lg border border-stone-200 bg-white p-5 no-underline hover:border-stone-300 transition-colors"
            >
              <div className="flex items-start justify-between">
                <div>
                  <div className="font-semibold text-stone-900">{r.name}</div>
                  <div className="text-sm text-stone-500 mt-0.5">
                    {r.neighborhood ? `${r.neighborhood}, ` : ""}
                    {r.city}
                    {r.status === "closed" && (
                      <span className="ml-1 text-red-500">(Closed)</span>
                    )}
                  </div>
                </div>
                <div className="text-right">
                  {stars && (
                    <div className="text-yellow-500">{"★".repeat(stars)}</div>
                  )}
                  <div className="text-xs text-stone-400 mt-1">
                    {allStaff.length} stops
                  </div>
                </div>
              </div>
              <div className="flex flex-wrap gap-1.5 mt-2">
                {r.cuisine_tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-stone-50 px-2 py-0.5 text-xs text-stone-500"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              {staff.length > 0 && (
                <div className="text-sm text-amber-700 mt-2">
                  {staff
                    .map((s) => {
                      const c = chefs.find((c) => c.id === s.chef_id);
                      return c?.name.display;
                    })
                    .filter(Boolean)
                    .join(", ")}
                </div>
              )}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
