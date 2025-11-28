// src/lib/ai.ts
import { Dish } from "../types";

const API_BASE =
  import.meta.env.VITE_API_BASE_URL?.replace(/\/$/, "") ||
  "http://localhost:5001";

// ---------------------------------------------
// AI MENU PARSING
// ---------------------------------------------
export interface ParsedDishFromAI {
  name: string;
  description: string;
  category: string;
  costPrice: number;
  salePrice: number;
}

export async function parseMenuTextWithAI(
  text: string
): Promise<Omit<Dish, "id" | "createdAt">[]> {
  const res = await fetch(`${API_BASE}/api/parse-menu`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text }),
  });

  if (!res.ok) throw new Error("AI failed to parse menu");

  const data = await res.json();

  const normalizeCategory = (cat: string): Dish["category"] => {
    const c = cat.toLowerCase();
    if (c.includes("starter")) return "Starters";
    if (c.includes("main")) return "Mains";
    if (c.includes("pizza")) return "Pizza";
    if (c.includes("grill")) return "Grill";
    if (c.includes("dessert")) return "Desserts";
    if (c.includes("drink")) return "Drinks";
    return "Other";
  };

  return data.dishes.map((d: ParsedDishFromAI) => ({
    name: d.name,
    description: d.description,
    category: normalizeCategory(d.category),
    costPrice: d.costPrice || 0,
    salePrice: d.salePrice || 0,
    isAvailable: true,
    isFeatured: false,
  }));
}

// ---------------------------------------------
// AI CHAT WAITER
// ---------------------------------------------
export async function getAIReplyFromServer(
  messages: { role: "user" | "assistant" | "system"; content: string }[]
): Promise<string> {
  const res = await fetch(`${API_BASE}/api/chat`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ messages }),
  });

  if (!res.ok) throw new Error("AI chat failed");

  const data = await res.json();
  return data.reply;
}
