import Link from "next/link";
import {
  chefs,
  stops,
  restaurants,
  getTopMentors,
  getTopTrainingKitchens,
  getMichelinStarred,
  getProteges,
  getProtegeCount,
} from "@/lib/data";

function getFeaturedConnection() {
  // Pick a compelling mentor-protégé story: a protégé who trained under a well-known mentor
  // and now runs their own restaurant. Prioritize stories with Michelin stars or high protégé counts.
  const topMentors = getTopMentors(10);
  for (const { chef: mentor } of topMentors) {
    const proteges = getProteges(mentor.id);
    for (const { protege, stop } of proteges) {
      const protegeCurrentStop = stops.find(
        (s) => s.chef_id === protege.id && s.is_current
      );
      if (!protegeCurrentStop) continue;
      const protegeRestaurant = restaurants.find(
        (r) => r.id === protegeCurrentStop.restaurant_id
      );
      if (!protegeRestaurant) continue;
      const mentorRestaurant = restaurants.find(
        (r) => r.id === stop.restaurant_id
      );
      if (!mentorRestaurant) continue;
      const stars = protegeRestaurant.ratings
        ? (protegeRestaurant.ratings as Record<string, number>).michelin_stars
        : 0;
      if (stars && stars >= 1) {
        const years =
          stop.start_year && stop.end_year
            ? `${stop.end_year - stop.start_year} years`
            : null;
        return {
          mentor,
          protege,
          mentorRestaurant,
          protegeRestaurant,
          years,
          stars,
          position: stop.position,
          startYear: stop.start_year,
          protegeOpenYear: protegeRestaurant.open_year,
        };
      }
    }
  }
  return null;
}

export default function Home() {
  const topMentors = getTopMentors(6);
  const topKitchens = getTopTrainingKitchens(6);
  const michelinStarred = getMichelinStarred().slice(0, 8);
  const featured = getFeaturedConnection();

  const totalMentorConnections = stops.filter((s) => s.mentor_id).length;

  return (
    <div>
      {/* Hero */}
      <div className="mb-12 pt-4">
        <h1 className="text-4xl font-bold tracking-tight text-stone-900 mb-2">
          The pedigree of LA dining, mapped.
        </h1>
        <p className="text-lg text-stone-500 max-w-2xl">
          {chefs.length} chefs. {restaurants.length} restaurants.{" "}
          {totalMentorConnections} verified mentor-protégé connections. Trace the
          invisible lines between the kitchens that shaped Los Angeles.
        </p>
      </div>

      {/* Featured Connection */}
      {featured && (
        <div className="mb-12 rounded-xl border border-stone-200 bg-surface p-6 md:p-8">
          <div className="text-[11px] font-semibold uppercase tracking-wider text-stone-400 mb-4">
            Featured Connection
          </div>
          <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-6">
            <div className="flex-1">
              <p className="text-stone-700 leading-relaxed">
                <Link
                  href={`/chefs/${featured.protege.id}`}
                  className="font-semibold text-stone-900"
                >
                  {featured.protege.name.display}
                </Link>{" "}
                trained under{" "}
                <Link
                  href={`/chefs/${featured.mentor.id}`}
                  className="font-semibold text-stone-900"
                >
                  {featured.mentor.name.display}
                </Link>{" "}
                at{" "}
                <Link
                  href={`/restaurants/${featured.mentorRestaurant.id}`}
                  className="text-amber-700"
                >
                  {featured.mentorRestaurant.name}
                </Link>
                {featured.years && <span> for {featured.years}</span>}
                {featured.position && (
                  <span className="text-stone-500">
                    {" "}
                    as {featured.position}
                  </span>
                )}
                .{" "}
                {featured.protegeOpenYear && (
                  <>
                    In {featured.protegeOpenYear},{" "}
                    {featured.protege.name.first} opened{" "}
                  </>
                )}
                {!featured.protegeOpenYear && (
                  <>{featured.protege.name.first} now runs </>
                )}
                <Link
                  href={`/restaurants/${featured.protegeRestaurant.id}`}
                  className="text-amber-700"
                >
                  {featured.protegeRestaurant.name}
                </Link>
                {featured.stars > 0 && (
                  <span className="text-yellow-500 ml-1">
                    {"★".repeat(featured.stars)}
                  </span>
                )}
                .
              </p>
            </div>
          </div>
        </div>
      )}

      {/* The Network — Top Mentors */}
      <div className="mb-12">
        <div className="flex items-baseline justify-between mb-5">
          <div>
            <h2 className="text-xl font-semibold text-stone-900">
              The Network
            </h2>
            <p className="text-sm text-stone-500 mt-1">
              Chefs who shaped the most kitchens
            </p>
          </div>
          <Link
            href="/lineage"
            className="text-sm text-stone-500 hover:text-stone-700"
          >
            Full lineage tree →
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {topMentors.map(({ chef, protegeCount, currentRestaurant }) => {
            const proteges = getProteges(chef.id);
            const protegeNames = proteges
              .slice(0, 4)
              .map(({ protege }) => protege.name.display);
            return (
              <Link
                key={chef.id}
                href={`/chefs/${chef.id}`}
                className="block rounded-lg border border-stone-200 bg-surface p-5 no-underline hover:border-amber-200 hover:shadow-sm transition-all"
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="font-semibold text-stone-900">
                    {chef.name.display}
                  </div>
                  <div className="rounded-full bg-amber-50 border border-amber-200 px-2.5 py-0.5 text-xs font-semibold text-amber-800 shrink-0">
                    {protegeCount}
                  </div>
                </div>
                {currentRestaurant && (
                  <div className="text-sm text-stone-500 mb-3">
                    {currentRestaurant.name}
                    {currentRestaurant.ratings &&
                      (currentRestaurant.ratings as Record<string, number>)
                        .michelin_stars && (
                        <span className="text-yellow-500 ml-1">
                          {"★".repeat(
                            (
                              currentRestaurant.ratings as Record<
                                string,
                                number
                              >
                            ).michelin_stars
                          )}
                        </span>
                      )}
                  </div>
                )}
                <div className="text-xs text-stone-400 leading-relaxed">
                  {protegeNames.join(", ")}
                  {proteges.length > 4 && (
                    <span>
                      {" "}
                      +{proteges.length - 4} more
                    </span>
                  )}
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Training Kitchens */}
      <div className="mb-12">
        <div className="flex items-baseline justify-between mb-5">
          <div>
            <h2 className="text-xl font-semibold text-stone-900">
              Training Kitchens
            </h2>
            <p className="text-sm text-stone-500 mt-1">
              Restaurants that produced the most chefs
            </p>
          </div>
          <Link
            href="/restaurants"
            className="text-sm text-stone-500 hover:text-stone-700"
          >
            All restaurants →
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {topKitchens.map(
            ({ restaurant, alumniCount, alumniWithOwnRestaurants }) => {
              const stars = restaurant.ratings
                ? (restaurant.ratings as Record<string, number>).michelin_stars
                : 0;
              return (
                <Link
                  key={restaurant.id}
                  href={`/restaurants/${restaurant.id}`}
                  className="block rounded-lg border border-stone-200 bg-surface p-5 no-underline hover:border-amber-200 hover:shadow-sm transition-all"
                >
                  <div className="flex items-start justify-between mb-1">
                    <div className="font-semibold text-stone-900">
                      {restaurant.name}
                    </div>
                    {stars > 0 && (
                      <span className="text-yellow-500 text-sm shrink-0">
                        {"★".repeat(stars)}
                      </span>
                    )}
                  </div>
                  <div className="text-sm text-stone-500 mb-3">
                    {restaurant.neighborhood
                      ? `${restaurant.neighborhood}, `
                      : ""}
                    {restaurant.city}
                    {restaurant.status === "closed" && (
                      <span className="ml-1 text-red-400">(Closed)</span>
                    )}
                  </div>
                  <div className="text-xs text-stone-400">
                    {alumniCount} alumni · {alumniWithOwnRestaurants} running
                    own kitchens
                  </div>
                </Link>
              );
            }
          )}
        </div>
      </div>

      {/* Michelin-Starred */}
      <div className="mb-12">
        <div className="flex items-baseline justify-between mb-5">
          <div>
            <h2 className="text-xl font-semibold text-stone-900">
              Michelin-Starred
            </h2>
            <p className="text-sm text-stone-500 mt-1">
              Where the lineage leads
            </p>
          </div>
          <Link
            href="/restaurants"
            className="text-sm text-stone-500 hover:text-stone-700"
          >
            All restaurants →
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {michelinStarred.map((r) => {
            const stars = (r.ratings as Record<string, number>).michelin_stars;
            const currentStaff = stops.filter(
              (s) => s.restaurant_id === r.id && s.is_current
            );
            const chefNames = currentStaff
              .map((s) => {
                const c = chefs.find((c) => c.id === s.chef_id);
                return c?.name.display;
              })
              .filter(Boolean);
            return (
              <Link
                key={r.id}
                href={`/restaurants/${r.id}`}
                className="block rounded-lg border border-stone-200 bg-surface p-4 no-underline hover:border-amber-200 hover:shadow-sm transition-all"
              >
                <div className="text-yellow-500 text-sm mb-1">
                  {"★".repeat(stars)}
                </div>
                <div className="font-semibold text-stone-900 text-sm">
                  {r.name}
                </div>
                <div className="text-xs text-stone-500 mt-0.5">
                  {r.neighborhood || r.city}
                </div>
                {chefNames.length > 0 && (
                  <div className="text-xs text-amber-700 mt-2">
                    {chefNames.join(", ")}
                  </div>
                )}
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
