import Link from "next/link";
import { restaurants, stops, chefs, getTrainingKitchenStats } from "@/lib/data";

export default function RestaurantsPage() {
  const sorted = [...restaurants].sort((a, b) => {
    const aStars = (a.ratings as Record<string, number>)?.michelin_stars || 0;
    const bStars = (b.ratings as Record<string, number>)?.michelin_stars || 0;
    if (bStars !== aStars) return bStars - aStars;
    const aAlumni = getTrainingKitchenStats(a.id).alumniCount;
    const bAlumni = getTrainingKitchenStats(b.id).alumniCount;
    if (bAlumni !== aAlumni) return bAlumni - aAlumni;
    return a.name.localeCompare(b.name);
  });

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-3xl font-bold tracking-tight text-stone-900 mb-1">
          Restaurants
        </h1>
        <p className="text-sm text-stone-500">
          {restaurants.length} restaurants · sorted by Michelin stars, then training kitchen influence
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {sorted.map((r) => {
          const stars = (r.ratings as Record<string, number>)?.michelin_stars;
          const staff = stops.filter(
            (s) => s.restaurant_id === r.id && s.is_current
          );
          const kitchenStats = getTrainingKitchenStats(r.id);

          return (
            <Link
              key={r.id}
              href={`/restaurants/${r.id}`}
              className="block rounded-lg border border-stone-200 bg-white p-5 no-underline hover:border-amber-200 hover:shadow-sm transition-all"
            >
              <div className="flex items-start justify-between">
                <div>
                  <div className="font-semibold text-stone-900">{r.name}</div>
                  <div className="text-sm text-stone-500 mt-0.5">
                    {r.neighborhood ? `${r.neighborhood}, ` : ""}
                    {r.city}
                    {r.status === "closed" && (
                      <span className="ml-1 text-red-400">(Closed)</span>
                    )}
                  </div>
                </div>
                <div className="text-right shrink-0">
                  {stars && (
                    <div className="text-yellow-500">{"★".repeat(stars)}</div>
                  )}
                </div>
              </div>
              <div className="flex flex-wrap gap-1.5 mt-2">
                {r.cuisine_tags.slice(0, 4).map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-stone-50 px-2 py-0.5 text-xs text-stone-500"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              {/* Signal line */}
              <div className="mt-2 flex items-center gap-3 text-xs text-stone-400">
                {staff.length > 0 && (
                  <span className="text-amber-700">
                    {staff
                      .map((s) => {
                        const c = chefs.find((c) => c.id === s.chef_id);
                        return c?.name.display;
                      })
                      .filter(Boolean)
                      .join(", ")}
                  </span>
                )}
                {kitchenStats.alumniCount >= 3 && (
                  <span>
                    {kitchenStats.alumniCount} alumni → {kitchenStats.alumniWithOwnRestaurants} own kitchens
                  </span>
                )}
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
