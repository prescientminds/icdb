import Link from "next/link";
import { chefs, stops, restaurants, getProtegeCount, getMentors } from "@/lib/data";

export default function ChefsPage() {
  // Sort: lineage chefs with most connections first, then notable, then alphabetical
  const sorted = [...chefs].sort((a, b) => {
    const aTier = (a as Record<string, unknown>).tier === "lineage" ? 0 : 1;
    const bTier = (b as Record<string, unknown>).tier === "lineage" ? 0 : 1;
    if (aTier !== bTier) return aTier - bTier;
    const aCount = getProtegeCount(a.id);
    const bCount = getProtegeCount(b.id);
    if (bCount !== aCount) return bCount - aCount;
    return a.name.display.localeCompare(b.name.display);
  });

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-3xl font-bold tracking-tight text-stone-900 mb-1">
          Chefs
        </h1>
        <p className="text-sm text-stone-500">
          {chefs.length} profiles · sorted by network influence
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {sorted.map((chef) => {
          const currentStops = stops.filter(
            (s) => s.chef_id === chef.id && s.is_current
          );
          const protegeCount = getProtegeCount(chef.id);
          const mentors = getMentors(chef.id);
          const tier = (chef as Record<string, unknown>).tier;

          // Build signal line
          const signalParts: string[] = [];
          if (protegeCount > 0) signalParts.push(`${protegeCount} protégé${protegeCount > 1 ? "s" : ""}`);
          if (mentors.length > 0) {
            signalParts.push(
              `trained under ${mentors.map(({ mentor }) => mentor.name.display).slice(0, 2).join(", ")}${mentors.length > 2 ? ` +${mentors.length - 2}` : ""}`
            );
          }

          return (
            <Link
              key={chef.id}
              href={`/chefs/${chef.id}`}
              className="block rounded-lg border border-stone-200 bg-white p-5 no-underline hover:border-amber-200 hover:shadow-sm transition-all"
            >
              <div className="flex items-start justify-between">
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <div className="font-semibold text-stone-900">
                      {chef.name.display}
                    </div>
                    {tier === "notable" && (
                      <span className="rounded-full bg-blue-50 border border-blue-200 px-2 py-0.5 text-[10px] font-medium text-blue-700 shrink-0">
                        Notable
                      </span>
                    )}
                  </div>
                  <div className="text-sm text-stone-500 mt-1">
                    {chef.cuisine_tags.slice(0, 3).join(" · ")}
                  </div>
                </div>
                {protegeCount > 0 && (
                  <div className="rounded-full bg-amber-50 border border-amber-200 px-2 py-0.5 text-xs font-semibold text-amber-800 shrink-0">
                    {protegeCount}
                  </div>
                )}
              </div>
              {currentStops.length > 0 && (
                <div className="text-sm text-amber-700 mt-2">
                  {currentStops
                    .map((s) => {
                      const r = restaurants.find(
                        (r) => r.id === s.restaurant_id
                      );
                      if (!r) return null;
                      const stars = r.ratings
                        ? (r.ratings as Record<string, number>).michelin_stars
                        : 0;
                      return `${r.name}${stars ? " " + "★".repeat(stars) : ""} — ${s.position}`;
                    })
                    .filter(Boolean)
                    .join(" · ")}
                </div>
              )}
              {signalParts.length > 0 && (
                <div className="text-xs text-stone-400 mt-1.5">
                  {signalParts.join(" · ")}
                </div>
              )}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
