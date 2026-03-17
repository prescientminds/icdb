import chefsData from "../chefs.json";
import restaurantsData from "../restaurants.json";
import stopsData from "../stops.json";
import groupsData from "../groups.json";

export type Chef = (typeof chefsData)[number];
export type Restaurant = (typeof restaurantsData)[number];
export type Stop = (typeof stopsData)[number];
export type Group = (typeof groupsData)[number];

export const chefs = chefsData;
export const restaurants = restaurantsData;
export const stops = stopsData;
export const groups = groupsData;

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
