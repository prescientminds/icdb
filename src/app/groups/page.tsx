"use client";
import Link from "next/link";
import { groups, restaurants, stops, chefs, getStakesForTarget, getStakesForInvestor } from "@/lib/data";
import { useCity } from "@/components/CityContext";

export default function GroupsPage() {
  const { selectedCity } = useCity();

  const filtered = selectedCity
    ? groups.filter((g) => g.city === selectedCity)
    : groups;

  return (
    <div>
      <h1 className="text-3xl font-bold tracking-tight text-stone-900 mb-2">
        Restaurant Groups &amp; Investors
      </h1>
      <p className="text-stone-500 mb-8 max-w-xl">
        Who backs which restaurants. Development companies, hospitality groups,
        and the investors behind {selectedCity || ""} dining.
      </p>

      <div className="space-y-6">
        {filtered.map((group) => {
          const portfolio = restaurants.filter(
            (r) => r.group_id === group.id
          );
          return (
            <div
              key={group.id}
              className="rounded-lg border border-stone-200 bg-surface p-6"
            >
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="text-xl font-semibold text-stone-900">
                    {group.name}
                  </h2>
                  <div className="text-sm text-stone-500 mt-1">
                    {group.type} · {group.city}
                  </div>
                </div>
                <div className="text-sm text-stone-400">
                  {portfolio.length} restaurants
                </div>
              </div>

              <div className="text-sm text-stone-500 mt-1">
                Key people: {group.key_people?.join(", ")}
              </div>

              {group.description && (
                <p className="text-sm text-stone-600 mt-3">
                  {group.description}
                </p>
              )}

              {portfolio.length > 0 && (
                <div className="mt-4 pt-4 border-t border-stone-100">
                  <div className="text-sm font-medium text-stone-500 mb-2">
                    Portfolio
                  </div>
                  <div className="space-y-2">
                    {portfolio.map((r) => {
                      const staff = stops.filter(
                        (s) => s.restaurant_id === r.id && s.is_current
                      );
                      const stars = (r.ratings as Record<string, number>)
                        ?.michelin_stars;
                      return (
                        <div key={r.id} className="flex items-center justify-between">
                          <div>
                            <Link
                              href={`/restaurants/${r.id}`}
                              className="font-medium text-amber-700"
                            >
                              {r.name}
                            </Link>
                            <span className="text-sm text-stone-500 ml-2">
                              {r.neighborhood ? `${r.neighborhood}, ` : ""}
                              {r.city}
                            </span>
                            {staff.length > 0 && (
                              <span className="text-sm text-stone-400 ml-2">
                                (
                                {staff
                                  .map((s) => {
                                    const c = chefs.find(
                                      (c) => c.id === s.chef_id
                                    );
                                    return c?.name.display;
                                  })
                                  .filter(Boolean)
                                  .join(", ")}
                                )
                              </span>
                            )}
                          </div>
                          {stars && (
                            <span className="text-yellow-500 text-sm">
                              {"★".repeat(stars)}
                            </span>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {(() => {
                const incomingStakes = getStakesForTarget(group.id);
                if (incomingStakes.length === 0) return null;
                return (
                  <div className="mt-4 pt-4 border-t border-stone-100">
                    <div className="text-sm font-medium text-stone-500 mb-2">
                      Backed by
                    </div>
                    <div className="space-y-1">
                      {incomingStakes.map((stake) => (
                        <div key={stake.id} className="text-sm flex items-center justify-between">
                          <div>
                            <span className="font-medium text-stone-700">{stake.investor_name}</span>
                            <span className="text-stone-400 ml-2">{stake.role}</span>
                            {stake.year && (
                              <span className="text-stone-400 ml-1">({stake.year})</span>
                            )}
                          </div>
                          {stake.details && (
                            <span className="text-xs text-stone-400">{stake.details}</span>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })()}

              {(() => {
                const outgoingStakes = getStakesForInvestor(group.id);
                if (outgoingStakes.length === 0) return null;
                return (
                  <div className="mt-4 pt-4 border-t border-stone-100">
                    <div className="text-sm font-medium text-stone-500 mb-2">
                      Investments
                    </div>
                    <div className="space-y-1">
                      {outgoingStakes.map((stake) => (
                        <div key={stake.id} className="text-sm flex items-center justify-between">
                          <div>
                            <span className="font-medium text-amber-700">{stake.target_name}</span>
                            <span className="text-stone-400 ml-2">{stake.role}</span>
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
                    </div>
                  </div>
                );
              })()}
            </div>
          );
        })}
      </div>
    </div>
  );
}
