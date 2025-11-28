// frontend/src/pages/Dashboard.tsx
import type { FC } from "react";

const Dashboard: FC = () => {
  return (
    <div>
      <h1 style={{ fontSize: 20, fontWeight: 600, marginBottom: 8 }}>
        Dashboard
      </h1>
      <p style={{ fontSize: 14, color: "#9ca3af" }}>
        Analytics and reservations overview will appear here.
      </p>
    </div>
  );
};

export default Dashboard;
