import Link from "next/link";
import { chefs, stops, restaurants, groups } from "@/lib/data";

export default function Home() {
  const currentStops = stops.filter((s) => s.is_current);
  const starredRestaurants = restaurants.filter(
    (r) => r.ratings && "michelin_stars" in r.ratings && (r.ratings as Record<string, unknown>).michelin_stars
  );

  return (
    <div>
      <div className="mb-12">
        <h1 className="text-4xl font-bold tracking-tight text-stone-900 mb-2">
          Internet Chef Database
        </h1>
        <p className="text-lg text-stone-500 max-w-2xl">
          The pedigree and lineage of chefs, mapped. Verified career stops,
          mentor-protégé networks, and restaurant group intelligence.
        </p>
      </div>

      <div className="grid grid-cols-4 gap-6 mb-12">
        <div className="rounded-lg border border-stone-200 bg-white p-5">
          <div className="text-3xl font-bold text-stone-900">{chefs.length}</div>
          <div className="text-sm text-stone-500 mt-1">Chef profiles</div>
        </div>
        <div className="rounded-lg border border-stone-200 bg-white p-5">
          <div className="text-3xl font-bold text-stone-900">{restaurants.length}</div>
          <div className="text-sm text-stone-500 mt-1">Restaurants</div>
        </div>
        <div className="rounded-lg border border-stone-200 bg-white p-5">
          <div className="text-3xl font-bold text-stone-900">{stops.length}</div>
          <div className="text-sm text-stone-500 mt-1">Career stops</div>
        </div>
        <div className="rounded-lg border border-stone-200 bg-white p-5">
          <div className="text-3xl font-bold text-stone-900">{groups.length}</div>
          <div className="text-sm text-stone-500 mt-1">Restaurant groups</div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-12">
        <div>
          <h2 className="text-xl font-semibold text-stone-900 mb-4">Chefs</h2>
          <div className="space-y-3">
            {chefs.map((chef) => {
              const chefStops = stops.filter(
                (s) => s.chef_id === chef.id && s.is_current
              );
              return (
                <Link
                  key={chef.id}
                  href={`/chefs/${chef.id}`}
                  className="block rounded-lg border border-stone-200 bg-white p-4 no-underline hover:border-stone-300 transition-colors"
                >
                  <div className="font-semibold text-stone-900">
                    {chef.name.display}
                  </div>
                  <div className="text-sm text-stone-500 mt-1">
                    {chef.cuisine_tags.slice(0, 3).join(" · ")}
                  </div>
                  {chefStops.length > 0 && (
                    <div className="text-sm text-amber-700 mt-1">
                      {chefStops
                        .map((s) => {
                          const r = restaurants.find(
                            (r) => r.id === s.restaurant_id
                          );
                          return r?.name;
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

        <div>
          <h2 className="text-xl font-semibold text-stone-900 mb-4">
            Michelin-Starred Restaurants
          </h2>
          <div className="space-y-3">
            {starredRestaurants
              .sort(
                (a, b) =>
                  ((b.ratings as Record<string, number>).michelin_stars || 0) -
                  ((a.ratings as Record<string, number>).michelin_stars || 0)
              )
              .map((r) => {
                const stars = (r.ratings as Record<string, number>)
                  .michelin_stars;
                const staff = stops.filter(
                  (s) => s.restaurant_id === r.id && s.is_current
                );
                return (
                  <Link
                    key={r.id}
                    href={`/restaurants/${r.id}`}
                    className="block rounded-lg border border-stone-200 bg-white p-4 no-underline hover:border-stone-300 transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <div className="font-semibold text-stone-900">
                        {r.name}
                      </div>
                      <div className="text-yellow-500 text-sm">
                        {"★".repeat(stars)}
                      </div>
                    </div>
                    <div className="text-sm text-stone-500 mt-1">
                      {r.neighborhood ? `${r.neighborhood}, ` : ""}
                      {r.city}
                      {r.status === "closed" && (
                        <span className="ml-2 text-red-500">(Closed)</span>
                      )}
                    </div>
                    {staff.length > 0 && (
                      <div className="text-sm text-amber-700 mt-1">
                        {staff
                          .map((s) => {
                            const c = chefs.find((c) => c.id === s.chef_id);
                            return c
                              ? `${c.name.display} — ${s.position}`
                              : null;
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
      </div>
    </div>
  );
}
