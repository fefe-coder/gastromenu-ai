// frontend/src/pages/ManageDishes.tsx
import type { FC } from "react";

const ManageDishes: FC = () => {
  return (
    <div>
      <h1 style={{ fontSize: 20, fontWeight: 600, marginBottom: 8 }}>
        Manage Dishes
      </h1>
      <p style={{ fontSize: 14, color: "#9ca3af" }}>
        Here you&apos;ll be able to import menus with AI and edit dishes.
      </p>
    </div>
  );
};

export default ManageDishes;
