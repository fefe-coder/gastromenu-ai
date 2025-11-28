// src/types.ts

export type DishCategory =
  | "Starters"
  | "Mains"
  | "Pizza"
  | "Grill"
  | "Desserts"
  | "Drinks"
  | "Other";

export interface Dish {
  id: string;
  name: string;
  description: string;
  category: DishCategory;
  costPrice: number;   // buy price
  salePrice: number;   // selling price
  isAvailable: boolean;
  isFeatured: boolean;
  createdAt: string;
}

export interface MenuView {
  id: string;
  viewedAt: string;
}

export interface Reservation {
  id: string;
  name: string;
  email: string;
  dateTime: string;
  guests: number;
  notes: string;
  createdAt: string;
}

export interface Restaurant {
  id: string;
  name: string;
  slug: string;
  description: string;
  createdAt: string;
}
