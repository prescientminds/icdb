import Link from "next/link";
import { chefs, stops, restaurants } from "@/lib/data";

export default function ChefsPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold tracking-tight text-stone-900 mb-6">
        Chefs
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {chefs.map((chef) => {
          const currentStops = stops.filter(
            (s) => s.chef_id === chef.id && s.is_current
          );
          const totalStops = stops.filter((s) => s.chef_id === chef.id);
          const mentorStops = totalStops.filter((s) => s.mentor_id);

          return (
            <Link
              key={chef.id}
              href={`/chefs/${chef.id}`}
              className="block rounded-lg border border-stone-200 bg-white p-5 no-underline hover:border-stone-300 transition-colors"
            >
              <div className="flex items-start justify-between">
                <div>
                  <div className="font-semibold text-stone-900">
                    {chef.name.display}
                  </div>
                  <div className="text-sm text-stone-500 mt-1">
                    {chef.cuisine_tags.slice(0, 3).join(" · ")}
                  </div>
                </div>
                <div className="text-right text-xs text-stone-400">
                  <div>{totalStops.length} stops</div>
                  {mentorStops.length > 0 && (
                    <div>{mentorStops.length} mentors</div>
                  )}
                </div>
              </div>
              {currentStops.length > 0 && (
                <div className="text-sm text-amber-700 mt-2">
                  {currentStops
                    .map((s) => {
                      const r = restaurants.find(
                        (r) => r.id === s.restaurant_id
                      );
                      return r ? `${r.name} — ${s.position}` : null;
                    })
                    .filter(Boolean)
                    .join(" · ")}
                </div>
              )}
              {chef.bio && (
                <div className="text-xs text-stone-400 mt-2 line-clamp-2">
                  {chef.bio}
                </div>
              )}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
