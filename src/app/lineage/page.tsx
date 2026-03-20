import Link from "next/link";
import { chefs, stops, restaurants } from "@/lib/data";
import { getProteges } from "@/lib/data";

// Find root mentors — chefs who appear as mentor_id but whose mentor_id in our DB we don't have full profiles for
function findRootMentors(): string[] {
  const mentorIds = new Set<string>();
  for (const stop of stops) {
    if (stop.mentor_id) {
      mentorIds.add(stop.mentor_id);
    }
  }
  // Root mentors: appear as mentor_id AND have proteges, but either aren't in our chef DB
  // or have no mentor of their own in our stops
  const roots: string[] = [];
  for (const mentorId of mentorIds) {
    const mentorStops = stops.filter((s) => s.chef_id === mentorId);
    const hasMentor = mentorStops.some((s) => s.mentor_id);
    if (!hasMentor) {
      roots.push(mentorId);
    }
  }
  return roots;
}

function TreeNode({
  chefId,
  depth = 0,
}: {
  chefId: string;
  depth?: number;
}) {
  const chef = chefs.find((c) => c.id === chefId);
  const proteges = getProteges(chefId);
  const currentStops = stops.filter(
    (s) => s.chef_id === chefId && s.is_current
  );

  const currentRestaurant = currentStops.length > 0
    ? restaurants.find((r) => r.id === currentStops[0].restaurant_id)
    : null;

  return (
    <div className={depth > 0 ? "ml-8 border-l-2 border-stone-200 pl-4" : ""}>
      <div className="py-2">
        <div className="flex items-center gap-2">
          {chef ? (
            <Link
              href={`/chefs/${chef.id}`}
              className="font-semibold text-stone-900 no-underline hover:text-amber-700"
            >
              {chef.name.display}
            </Link>
          ) : (
            <span className="font-semibold text-stone-500 italic">
              {chefId.replace("chef_", "").replace(/_/g, " ")}
            </span>
          )}
          {currentRestaurant && (
            <span className="text-sm text-stone-400">
              →{" "}
              <Link href={`/restaurants/${currentRestaurant.id}`} className="text-amber-700">
                {currentRestaurant.name}
              </Link>
            </span>
          )}
        </div>
        {chef && (
          <div className="text-xs text-stone-400 mt-0.5">
            {chef.cuisine_tags.slice(0, 3).join(" · ")}
          </div>
        )}
      </div>
      {proteges.length > 0 && (
        <div>
          {proteges.map(({ protege }) => (
            <TreeNode key={protege.id} chefId={protege.id} depth={depth + 1} />
          ))}
        </div>
      )}
    </div>
  );
}

export default function LineagePage() {
  const roots = findRootMentors();

  return (
    <div>
      <h1 className="text-3xl font-bold tracking-tight text-stone-900 mb-2">
        Chef Lineage
      </h1>
      <p className="text-stone-500 mb-8 max-w-xl">
        Who trained whom. Trace the network from legendary kitchens through
        generations of protégés. Each line represents a verified mentor-protégé
        relationship at a specific restaurant.
      </p>

      <div className="space-y-8">
        {roots.map((rootId) => {
          const chef = chefs.find((c) => c.id === rootId);
          const proteges = getProteges(rootId);
          if (proteges.length === 0) return null;

          return (
            <div
              key={rootId}
              className="rounded-lg border border-stone-200 bg-surface p-6"
            >
              <TreeNode chefId={rootId} />
            </div>
          );
        })}
      </div>
    </div>
  );
}
