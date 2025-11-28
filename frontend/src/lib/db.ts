// frontend/src/lib/db.ts
import { Dish, MenuView, Reservation, Restaurant } from "../types";

const STORAGE_KEY = "gastromenu_ai_db_v1";

export interface DB {
  restaurant: Restaurant | null;
  dishes: Dish[];
  menuViews: MenuView[];
  reservations: Reservation[];
}

function defaultDB(): DB {
  return {
    restaurant: {
      id: "r1",
      name: "Urban Fork Bistro",
      slug: "urban-fork",
      description: "Demo restaurant for GastroMenu AI",
      createdAt: new Date().toISOString()
    },
    dishes: [],
    menuViews: [],
    reservations: []
  };
}

function loadDB(): DB {
  if (typeof window === "undefined") return defaultDB();

  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaultDB();
    const parsed = JSON.parse(raw);
    return { ...defaultDB(), ...parsed };
  } catch {
    return defaultDB();
  }
}

function saveDB(db: DB) {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(db));
}

export function getDB(): DB {
  return loadDB();
}

export function setDB(partial: Partial<DB>): DB {
  const current = loadDB();
  const next: DB = { ...current, ...partial };
  saveDB(next);
  return next;
}

export function upsertDish(dish: Dish): DB {
  const db = loadDB();
  const index = db.dishes.findIndex((d) => d.id === dish.id);

  if (index === -1) db.dishes.push(dish);
  else db.dishes[index] = dish;

  saveDB(db);
  return db;
}

export function deleteDish(id: string): DB {
  const db = loadDB();
  db.dishes = db.dishes.filter((d) => d.id !== id);
  saveDB(db);
  return db;
}

export function addMenuView(): DB {
  const db = loadDB();
  db.menuViews.push({
    id: crypto.randomUUID(),
    viewedAt: new Date().toISOString()
  });

  saveDB(db);
  return db;
}

export function addReservation(
  res: Omit<Reservation, "id" | "createdAt">
): DB {
  const db = loadDB();

  db.reservations.push({
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
    ...res
  });

  saveDB(db);
  return db;
}
