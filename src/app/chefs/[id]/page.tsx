import Link from "next/link";
import { notFound } from "next/navigation";
import {
  chefs,
  restaurants,
  getChef,
  getStopsForChef,
  getMentors,
  getProteges,
} from "@/lib/data";

export function generateStaticParams() {
  return chefs.map((chef) => ({ id: chef.id }));
}

export default async function ChefPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const chef = getChef(id);
  if (!chef) notFound();

  const chefStops = getStopsForChef(id);
  const mentors = getMentors(id);
  const proteges = getProteges(id);

  const currentStops = chefStops.filter((s) => s.is_current);
  const pastStops = chefStops.filter((s) => !s.is_current);

  return (
    <div className="max-w-3xl">
      <Link href="/chefs" className="text-sm text-stone-500 hover:text-stone-700">
        ← All Chefs
      </Link>

      <div className="mt-4 mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-stone-900">
          {chef.name.display}
        </h1>
        <div className="flex flex-wrap gap-2 mt-3">
          {chef.cuisine_tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-amber-50 border border-amber-200 px-3 py-0.5 text-xs font-medium text-amber-800"
            >
              {tag}
            </span>
          ))}
        </div>
        {chef.bio && (
          <p className="text-stone-600 mt-4 leading-relaxed">{chef.bio}</p>
        )}
      </div>

      {/* Origin */}
      <div className="mb-8 rounded-lg border border-stone-200 bg-white p-5">
        <h2 className="text-sm font-semibold text-stone-400 uppercase tracking-wide mb-3">
          Origin
        </h2>
        <div className="grid grid-cols-2 gap-4 text-sm">
          {chef.birth_city && (
            <div>
              <span className="text-stone-500">Born: </span>
              <span className="text-stone-900">{chef.birth_city}</span>
            </div>
          )}
          {chef.birth_country && (
            <div>
              <span className="text-stone-500">Country: </span>
              <span className="text-stone-900">{chef.birth_country}</span>
            </div>
          )}
          {chef.birth_year && (
            <div>
              <span className="text-stone-500">Year: </span>
              <span className="text-stone-900">{chef.birth_year}</span>
            </div>
          )}
        </div>
        {chef.education.length > 0 && (
          <div className="mt-4 pt-4 border-t border-stone-100">
            <div className="text-sm font-medium text-stone-500 mb-2">Education</div>
            {chef.education.map((edu, i) => (
              <div key={i} className="text-sm text-stone-700">
                {edu.institution}
                {edu.city && `, ${edu.city}`}
                {edu.year && ` (${edu.year})`}
                {edu.credential && ` — ${edu.credential}`}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Current Stops */}
      {currentStops.length > 0 && (
        <div className="mb-8">
          <h2 className="text-sm font-semibold text-stone-400 uppercase tracking-wide mb-3">
            Current
          </h2>
          <div className="space-y-3">
            {currentStops.map((stop) => {
              const r = restaurants.find((r) => r.id === stop.restaurant_id);
              return (
                <div
                  key={stop.id}
                  className="rounded-lg border border-stone-200 bg-white p-4"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      {r ? (
                        <Link
                          href={`/restaurants/${r.id}`}
                          className="font-semibold text-stone-900"
                        >
                          {r.name}
                        </Link>
                      ) : (
                        <span className="font-semibold text-stone-900">
                          {stop.restaurant_id}
                        </span>
                      )}
                      <span className="ml-2 text-sm text-stone-500">
                        {stop.position}
                      </span>
                    </div>
                    <div className="text-sm text-stone-400">
                      {stop.start_year}–present
                    </div>
                  </div>
                  {r && (
                    <div className="text-sm text-stone-500 mt-1">
                      {r.neighborhood ? `${r.neighborhood}, ` : ""}
                      {r.city}
                    </div>
                  )}
                  <div className="mt-2">
                    <span
                      className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${
                        stop.verification === "verified"
                          ? "bg-green-50 text-green-700 border border-green-200"
                          : "bg-stone-50 text-stone-500 border border-stone-200"
                      }`}
                    >
                      {stop.verification}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Career Timeline */}
      {pastStops.length > 0 && (
        <div className="mb-8">
          <h2 className="text-sm font-semibold text-stone-400 uppercase tracking-wide mb-3">
            Career Timeline
          </h2>
          <div className="space-y-1">
            {pastStops
              .sort((a, b) => (b.start_year || 0) - (a.start_year || 0))
              .map((stop) => {
                const r = restaurants.find((r) => r.id === stop.restaurant_id);
                const mentor = stop.mentor_id
                  ? chefs.find((c) => c.id === stop.mentor_id)
                  : null;
                return (
                  <div
                    key={stop.id}
                    className="flex items-start gap-4 rounded-lg border border-stone-100 bg-white px-4 py-3"
                  >
                    <div className="text-sm text-stone-400 w-24 shrink-0 tabular-nums">
                      {stop.start_year || "—"}
                      {stop.end_year ? `–${stop.end_year}` : ""}
                    </div>
                    <div className="flex-1">
                      <div>
                        {r ? (
                          <Link
                            href={`/restaurants/${r.id}`}
                            className="font-medium text-stone-900"
                          >
                            {r.name}
                          </Link>
                        ) : (
                          <span className="font-medium text-stone-900">
                            {stop.restaurant_id}
                          </span>
                        )}
                        {stop.position && (
                          <span className="text-sm text-stone-500 ml-2">
                            {stop.position}
                          </span>
                        )}
                      </div>
                      {mentor && (
                        <div className="text-sm text-stone-500 mt-0.5">
                          under{" "}
                          <Link
                            href={`/chefs/${mentor.id}`}
                            className="text-amber-700"
                          >
                            {mentor.name.display}
                          </Link>
                        </div>
                      )}
                      {"notes" in stop && stop.notes && (
                        <div className="text-xs text-stone-400 mt-0.5">
                          {stop.notes as string}
                        </div>
                      )}
                    </div>
                    <span
                      className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs ${
                        stop.verification === "verified"
                          ? "bg-green-50 text-green-700"
                          : "bg-stone-50 text-stone-400"
                      }`}
                    >
                      {stop.verification}
                    </span>
                  </div>
                );
              })}
          </div>
        </div>
      )}

      {/* Network */}
      {(mentors.length > 0 || proteges.length > 0) && (
        <div className="mb-8">
          <h2 className="text-sm font-semibold text-stone-400 uppercase tracking-wide mb-3">
            Network
          </h2>
          <div className="rounded-lg border border-stone-200 bg-white p-5">
            {mentors.length > 0 && (
              <div className="mb-4">
                <div className="text-sm font-medium text-stone-500 mb-2">
                  Trained under
                </div>
                <div className="space-y-2">
                  {mentors.map(({ mentor, stop }) => {
                    const r = restaurants.find(
                      (r) => r.id === stop.restaurant_id
                    );
                    return (
                      <div key={`${mentor.id}-${stop.id}`} className="text-sm">
                        <Link
                          href={`/chefs/${mentor.id}`}
                          className="font-medium text-amber-700"
                        >
                          {mentor.name.display}
                        </Link>
                        {r && (
                          <span className="text-stone-500">
                            {" "}
                            at {r.name}
                          </span>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
            {proteges.length > 0 && (
              <div>
                <div className="text-sm font-medium text-stone-500 mb-2">
                  Protégés
                </div>
                <div className="space-y-2">
                  {proteges.map(({ protege, stop }) => {
                    const r = restaurants.find(
                      (r) => r.id === stop.restaurant_id
                    );
                    return (
                      <div
                        key={`${protege.id}-${stop.id}`}
                        className="text-sm"
                      >
                        <Link
                          href={`/chefs/${protege.id}`}
                          className="font-medium text-amber-700"
                        >
                          {protege.name.display}
                        </Link>
                        {r && (
                          <span className="text-stone-500">
                            {" "}
                            at {r.name}
                          </span>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
