// Core types shared across all modules
export type RestaurantType = "fast_food" | "casual_dining" | "fine_dining" | "cafe" | "bakery" | "bar" | "food_truck" | "buffet" | "catering" | "ghost_kitchen" | "cloud_kitchen" | "pop_up" | "franchise" | "chain";
export type CuisineType = "american" | "italian" | "mexican" | "asian" | "mediterranean" | "french" | "indian" | "chinese" | "japanese" | "thai" | "vietnamese" | "korean" | "middle_eastern" | "fusion" | "vegan" | "organic" | "bbq" | "seafood" | "steakhouse" | "pizza" | "sushi" | "other";
export type PriceRange = "$" | "$$" | "$$$" | "$$$$" | "$$$$$";
export type CustomerSegment = "new_customers" | "regular_customers" | "vip_customers" | "at_risk_customers" | "champions" | "loyalists" | "potential_loyalists" | "cannot_lose_them";
export type DemographicSegment = "young_professionals" | "families" | "students" | "seniors" | "tourists" | "locals" | "millennials" | "gen_z" | "high_income" | "middle_income" | "budget_conscious";
export type BusinessDayPart = "breakfast" | "brunch" | "lunch" | "afternoon" | "dinner" | "late_night";

export interface OperatingHours {
  monday: { open: string; close: string; isOpen: boolean; };
  tuesday: { open: string; close: string; isOpen: boolean; };
  wednesday: { open: string; close: string; isOpen: boolean; };
  thursday: { open: string; close: string; isOpen: boolean; };
  friday: { open: string; close: string; isOpen: boolean; };
  saturday: { open: string; close: string; isOpen: boolean; };
  sunday: { open: string; close: string; isOpen: boolean; };
}