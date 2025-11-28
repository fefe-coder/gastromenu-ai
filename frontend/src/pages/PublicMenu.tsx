// frontend/src/pages/PublicMenu.tsx
import type { FC } from "react";

const PublicMenu: FC = () => {
  return (
    <div>
      <h1 style={{ fontSize: 20, fontWeight: 600, marginBottom: 8 }}>
        Public Menu
      </h1>
      <p style={{ fontSize: 14, color: "#9ca3af" }}>
        This will become the customer-facing QR menu view.
      </p>
    </div>
  );
};

export default PublicMenu;
