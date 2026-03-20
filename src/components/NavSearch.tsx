import { chefs, restaurants, stops, getChefSignal, getRestaurantSignal } from "@/lib/data";
import Search from "./Search";

export default function NavSearch() {
  const searchIndex = {
    chefs: chefs.map((c) => ({
      id: c.id,
      name: c.name.display,
      cuisines: c.cuisine_tags.join(" "),
      signal: getChefSignal(c.id),
    })),
    restaurants: restaurants.map((r) => ({
      id: r.id,
      name: r.name,
      neighborhood: r.neighborhood || "",
      cuisines: r.cuisine_tags.join(" "),
      signal: getRestaurantSignal(r.id),
    })),
  };

  return <Search index={searchIndex} />;
}
