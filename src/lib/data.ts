import chefsData from "../chefs.json";
import restaurantsData from "../restaurants.json";
import stopsData from "../stops.json";
import groupsData from "../groups.json";
import stakesData from "../stakes.json";

export type Chef = (typeof chefsData)[number];
export type Restaurant = (typeof restaurantsData)[number];
export type Stop = (typeof stopsData)[number];
export type Group = (typeof groupsData)[number];
export type Stake = (typeof stakesData)[number];

export const chefs = chefsData;
export const restaurants = restaurantsData;
export const stops = stopsData;
export const groups = groupsData;
export const stakes = stakesData;

export function getChef(id: string): Chef | undefined {
  return chefs.find((c) => c.id === id);
}

export function getRestaurant(id: string): Restaurant | undefined {
  return restaurants.find((r) => r.id === id);
}

export function getGroup(id: string): Group | undefined {
  return groups.find((g) => g.id === id);
}

export function getStopsForChef(chefId: string): Stop[] {
  return stops.filter((s) => s.chef_id === chefId);
}

export function getStopsForRestaurant(restaurantId: string): Stop[] {
  return stops.filter((s) => s.restaurant_id === restaurantId);
}

export function getMentors(chefId: string): { mentor: Chef; stop: Stop }[] {
  const chefStops = getStopsForChef(chefId);
  const mentors: { mentor: Chef; stop: Stop }[] = [];
  for (const stop of chefStops) {
    if (stop.mentor_id) {
      const mentor = getChef(stop.mentor_id);
      if (mentor) mentors.push({ mentor, stop });
    }
  }
  return mentors;
}

export function getProteges(chefId: string): { protege: Chef; stop: Stop }[] {
  const protegeStops = stops.filter((s) => s.mentor_id === chefId);
  const proteges: { protege: Chef; stop: Stop }[] = [];
  for (const stop of protegeStops) {
    const protege = getChef(stop.chef_id);
    if (protege) proteges.push({ protege, stop });
  }
  return proteges;
}

export function getLineageTree(chefId: string): { id: string; name: string; proteges: ReturnType<typeof getLineageTree> }[] {
  const directProteges = getProteges(chefId);
  return directProteges.map(({ protege }) => ({
    id: protege.id,
    name: protege.name.display,
    proteges: getLineageTree(protege.id),
  }));
}

export function getProtegeCount(chefId: string): number {
  return stops.filter((s) => s.mentor_id === chefId).length;
}

export function getTopMentors(n: number): { chef: Chef; protegeCount: number; currentRestaurant: Restaurant | undefined }[] {
  const mentorCounts = new Map<string, number>();
  for (const stop of stops) {
    if (stop.mentor_id) {
      mentorCounts.set(stop.mentor_id, (mentorCounts.get(stop.mentor_id) || 0) + 1);
    }
  }
  return Array.from(mentorCounts.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, n)
    .map(([chefId, count]) => {
      const chef = getChef(chefId)!;
      const currentStop = stops.find((s) => s.chef_id === chefId && s.is_current);
      const currentRestaurant = currentStop ? getRestaurant(currentStop.restaurant_id) : undefined;
      return { chef, protegeCount: count, currentRestaurant };
    })
    .filter((m) => m.chef);
}

export function getTrainingKitchenStats(restaurantId: string): { alumniCount: number; alumniWithOwnRestaurants: number } {
  const alumniStops = stops.filter((s) => s.restaurant_id === restaurantId && !s.is_current);
  const alumniChefIds = new Set(alumniStops.map((s) => s.chef_id));
  let alumniWithOwn = 0;
  for (const chefId of alumniChefIds) {
    const hasCurrentStop = stops.some((s) => s.chef_id === chefId && s.is_current);
    if (hasCurrentStop) alumniWithOwn++;
  }
  return { alumniCount: alumniChefIds.size, alumniWithOwnRestaurants: alumniWithOwn };
}

export function getTopTrainingKitchens(n: number): { restaurant: Restaurant; alumniCount: number; alumniWithOwnRestaurants: number }[] {
  const kitchenStats = restaurants.map((r) => {
    const stats = getTrainingKitchenStats(r.id);
    return { restaurant: r, ...stats };
  });
  return kitchenStats
    .filter((k) => k.alumniCount >= 3)
    .sort((a, b) => b.alumniCount - a.alumniCount)
    .slice(0, n);
}

export function getMichelinStarred(): Restaurant[] {
  return restaurants
    .filter((r) => r.ratings && (r.ratings as Record<string, number>).michelin_stars)
    .sort((a, b) =>
      ((b.ratings as Record<string, number>).michelin_stars || 0) -
      ((a.ratings as Record<string, number>).michelin_stars || 0)
    );
}

export function getChefSignal(chefId: string): string {
  const chef = getChef(chefId);
  if (!chef) return "";
  const protegeCount = getProtegeCount(chefId);
  const currentStop = stops.find((s) => s.chef_id === chefId && s.is_current);
  const currentRestaurant = currentStop ? getRestaurant(currentStop.restaurant_id) : undefined;
  const stars = currentRestaurant?.ratings
    ? (currentRestaurant.ratings as Record<string, number>).michelin_stars
    : 0;

  const parts: string[] = [];
  if (currentRestaurant) parts.push(currentRestaurant.name);
  if (stars) parts.push("★".repeat(stars));
  if (protegeCount > 0) parts.push(`${protegeCount} protégé${protegeCount > 1 ? "s" : ""}`);
  return parts.join(" · ");
}

export function getRestaurantSignal(restaurantId: string): string {
  const r = getRestaurant(restaurantId);
  if (!r) return "";
  const stats = getTrainingKitchenStats(restaurantId);
  const stars = r.ratings ? (r.ratings as Record<string, number>).michelin_stars : 0;
  const currentStaff = stops.filter((s) => s.restaurant_id === restaurantId && s.is_current);

  const parts: string[] = [];
  if (r.neighborhood) parts.push(r.neighborhood);
  if (stars) parts.push("★".repeat(stars));
  if (stats.alumniCount >= 3) {
    parts.push(`${stats.alumniCount} alumni → ${stats.alumniWithOwnRestaurants} running own kitchens`);
  } else if (currentStaff.length > 0) {
    const chefNames = currentStaff
      .map((s) => getChef(s.chef_id)?.name.display)
      .filter(Boolean);
    if (chefNames.length > 0) parts.push(chefNames.join(", "));
  }
  return parts.join(" · ");
}

// Stakes — investment/ownership layer

export function getStakesForTarget(targetId: string): Stake[] {
  return stakes.filter((s) => s.target_id === targetId);
}

export function getStakesForInvestor(investorId: string): Stake[] {
  return stakes.filter((s) => s.investor_id === investorId);
}

export function getStakesForRestaurant(restaurantId: string): Stake[] {
  const restaurant = getRestaurant(restaurantId);
  const directStakes = stakes.filter(
    (s) => s.target_type === "restaurant" && s.target_id === restaurantId
  );
  const groupStakes = restaurant?.group_id
    ? stakes.filter(
        (s) => s.target_type === "group" && s.target_id === restaurant.group_id
      )
    : [];
  return [...directStakes, ...groupStakes];
}

export function getStakesForChef(chefId: string): Stake[] {
  return stakes.filter(
    (s) => s.investor_type === "chef" && s.investor_id === chefId
  );
}
