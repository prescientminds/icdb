import Link from "next/link";
import { notFound } from "next/navigation";
import {
  chefs,
  restaurants,
  stops,
  getRestaurant,
  getStopsForRestaurant,
  getGroup,
  getTrainingKitchenStats,
  getStakesForRestaurant,
} from "@/lib/data";

export function generateStaticParams() {
  return restaurants.map((r) => ({ id: r.id }));
}

export default async function RestaurantPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const restaurant = getRestaurant(id);
  if (!restaurant) notFound();

  const restStops = getStopsForRestaurant(id);
  const currentStaff = restStops.filter((s) => s.is_current);
  const alumni = restStops.filter((s) => !s.is_current);
  const group = restaurant.group_id ? getGroup(restaurant.group_id) : null;
  const kitchenStats = getTrainingKitchenStats(id);
  const restaurantStakes = getStakesForRestaurant(id);

  const ratings = restaurant.ratings as Record<string, unknown> | undefined;
  const stars = ratings?.michelin_stars as number | undefined;

  return (
    <div className="max-w-3xl">
      <Link href="/restaurants" className="text-sm text-stone-500 hover:text-stone-700">
        ← All Restaurants
      </Link>

      {/* Header */}
      <div className="mt-4 mb-6">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-bold tracking-tight text-stone-900">
            {restaurant.name}
          </h1>
          {stars && (
            <span className="text-yellow-500 text-xl">
              {"★".repeat(stars)}
            </span>
          )}
          {restaurant.status === "closed" && (
            <span className="rounded-full bg-red-50 border border-red-200 px-3 py-0.5 text-xs font-medium text-red-700">
              Closed
            </span>
          )}
        </div>
        {/* Signal line — what this restaurant means to the network */}
        <div className="flex flex-wrap items-center gap-x-2 gap-y-1 mt-2 text-sm text-stone-500">
          <span>
            {restaurant.neighborhood && `${restaurant.neighborhood}, `}
            {restaurant.city}
          </span>
          {kitchenStats.alumniCount >= 3 && (
            <span>
              <span className="text-stone-300 mx-1">·</span>
              {kitchenStats.alumniCount} alumni · {kitchenStats.alumniWithOwnRestaurants} running own kitchens
            </span>
          )}
          {group && (
            <span>
              <span className="text-stone-300 mx-1">·</span>
              <Link href="/groups" className="text-amber-700">{group.name}</Link>
            </span>
          )}
        </div>
        <div className="flex flex-wrap gap-2 mt-3">
          {restaurant.cuisine_tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-amber-50 border border-amber-200 px-3 py-0.5 text-xs font-medium text-amber-800"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Current Staff — who's here now */}
      {currentStaff.length > 0 && (
        <div className="mb-8">
          <h2 className="text-sm font-semibold text-stone-400 uppercase tracking-wide mb-3">
            Current Staff
          </h2>
          <div className="space-y-2">
            {currentStaff.map((stop) => {
              const chef = chefs.find((c) => c.id === stop.chef_id);
              return (
                <div
                  key={stop.id}
                  className="flex items-center justify-between rounded-lg border border-stone-100 bg-surface px-4 py-3"
                >
                  <div>
                    {chef ? (
                      <Link
                        href={`/chefs/${chef.id}`}
                        className="font-medium text-amber-700"
                      >
                        {chef.name.display}
                      </Link>
                    ) : (
                      <span className="font-medium text-stone-900">
                        {stop.chef_id}
                      </span>
                    )}
                    <span className="text-sm text-stone-500 ml-2">
                      {stop.position}
                    </span>
                  </div>
                  <div className="text-sm text-stone-400">
                    {stop.start_year}–present
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Alumni — Kitchen Diaspora — THE section, moved up */}
      {alumni.length > 0 && (
        <div className="mb-8">
          <h2 className="text-sm font-semibold text-stone-400 uppercase tracking-wide mb-3">
            Kitchen Diaspora
            {kitchenStats.alumniWithOwnRestaurants > 0 && (
              <span className="ml-2 font-normal normal-case tracking-normal text-stone-400">
                — {kitchenStats.alumniCount} alumni, {kitchenStats.alumniWithOwnRestaurants} now running own kitchens
              </span>
            )}
          </h2>
          <div className="space-y-1">
            {alumni
              .sort((a, b) => (b.start_year || 0) - (a.start_year || 0))
              .map((stop) => {
                const chef = chefs.find((c) => c.id === stop.chef_id);
                // Where did this alum end up?
                const alumCurrentStop = stops.find(
                  (s) => s.chef_id === stop.chef_id && s.is_current
                );
                const alumNow = alumCurrentStop
                  ? restaurants.find((r) => r.id === alumCurrentStop.restaurant_id)
                  : null;
                return (
                  <div
                    key={stop.id}
                    className="flex items-start gap-4 rounded-lg border border-stone-100 bg-surface px-4 py-3"
                  >
                    <div className="text-sm text-stone-400 w-24 shrink-0 tabular-nums">
                      {stop.start_year || "—"}
                      {stop.end_year ? `–${stop.end_year}` : ""}
                    </div>
                    <div className="flex-1">
                      {chef ? (
                        <Link
                          href={`/chefs/${chef.id}`}
                          className="font-medium text-amber-700"
                        >
                          {chef.name.display}
                        </Link>
                      ) : (
                        <span className="font-medium text-stone-900">
                          {stop.chef_id}
                        </span>
                      )}
                      <span className="text-sm text-stone-500 ml-2">
                        {stop.position}
                      </span>
                    </div>
                    {alumNow && (
                      <Link
                        href={`/restaurants/${alumNow.id}`}
                        className="text-xs text-stone-400 hover:text-amber-700 shrink-0"
                      >
                        → {alumNow.name}
                      </Link>
                    )}
                  </div>
                );
              })}
          </div>
        </div>
      )}

      {/* Awards/Recognition */}
      {ratings && Object.keys(ratings).length > 0 && (
        <div className="mb-8 rounded-lg border border-stone-200 bg-surface p-5">
          <h2 className="text-sm font-semibold text-stone-400 uppercase tracking-wide mb-3">
            Recognition
          </h2>
          <div className="space-y-1 text-sm">
            {stars ? (
              <div className="text-stone-700">
                {"★".repeat(stars)} Michelin Stars
                {ratings.michelin_year ? ` (${String(ratings.michelin_year)})` : null}
              </div>
            ) : null}
            {ratings.michelin_bib_gourmand ? (
              <div className="text-stone-700">Michelin Bib Gourmand</div>
            ) : null}
            {Array.isArray(ratings.jbf)
              ? (ratings.jbf as string[]).map((award, i) => (
                <div key={i} className="text-stone-700">
                  James Beard: {award}
                </div>
              ))
              : null}
            {Array.isArray(ratings.other)
              ? (ratings.other as string[]).map((award, i) => (
                <div key={i} className="text-stone-700">
                  {award}
                </div>
              ))
              : null}
          </div>
        </div>
      )}

      {/* Capital — who backs this restaurant */}
      {restaurantStakes.length > 0 && (
        <div className="mb-8 rounded-lg border border-stone-200 bg-surface p-5">
          <h2 className="text-sm font-semibold text-stone-400 uppercase tracking-wide mb-3">
            Capital
          </h2>
          <div className="space-y-2">
            {restaurantStakes.map((stake) => (
              <div key={stake.id} className="flex items-start justify-between text-sm">
                <div>
                  <span className="font-medium text-stone-900">
                    {stake.investor_name}
                  </span>
                  <span className="text-stone-500 ml-2">{stake.role}</span>
                  {stake.year && (
                    <span className="text-stone-400 ml-1">
                      ({stake.year}{stake.end_year ? `–${stake.end_year}` : ""})
                    </span>
                  )}
                  {!stake.is_current && (
                    <span className="text-red-400 ml-1 text-xs">(ended)</span>
                  )}
                </div>
              </div>
            ))}
            {restaurantStakes.some((s) => s.details) && (
              <div className="text-xs text-stone-400 mt-2 pt-2 border-t border-stone-100">
                {restaurantStakes
                  .filter((s) => s.details)
                  .map((s) => s.details)
                  .join(" · ")}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Details — moved to bottom */}
      <div className="mb-8 rounded-lg border border-stone-200 bg-surface p-5">
        <h2 className="text-sm font-semibold text-stone-400 uppercase tracking-wide mb-3">
          Details
        </h2>
        <div className="grid grid-cols-2 gap-4 text-sm">
          {restaurant.address && (
            <div className="col-span-2">
              <span className="text-stone-500">Address: </span>
              <span className="text-stone-900">{restaurant.address}</span>
            </div>
          )}
          {restaurant.open_year && (
            <div>
              <span className="text-stone-500">Opened: </span>
              <span className="text-stone-900">{restaurant.open_year}</span>
            </div>
          )}
          {restaurant.close_year && (
            <div>
              <span className="text-stone-500">Closed: </span>
              <span className="text-stone-900">{restaurant.close_year}</span>
            </div>
          )}
          {restaurant.seats && (
            <div>
              <span className="text-stone-500">Seats: </span>
              <span className="text-stone-900">{restaurant.seats}</span>
            </div>
          )}
          {restaurant.price_range && (
            <div>
              <span className="text-stone-500">Price: </span>
              <span className="text-stone-900">{restaurant.price_range}</span>
            </div>
          )}
          {restaurant.format && (
            <div>
              <span className="text-stone-500">Format: </span>
              <span className="text-stone-900">{restaurant.format}</span>
            </div>
          )}
          {group && (
            <div>
              <span className="text-stone-500">Group: </span>
              <Link href="/groups" className="text-amber-700">
                {group.name}
              </Link>
            </div>
          )}
        </div>
        {"notes" in restaurant && restaurant.notes && (
          <div className="mt-4 pt-4 border-t border-stone-100 text-sm text-stone-600">
            {restaurant.notes as string}
          </div>
        )}
      </div>
    </div>
  );
}
