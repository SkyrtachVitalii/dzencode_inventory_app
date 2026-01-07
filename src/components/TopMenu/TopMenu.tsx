// TopMenu.tsx

"use client";

import styles from "./TopMenu.module.scss";
import Clock from "../Clock/Clock";
import { useSocket } from "@/lib/hooks";
import { useAppSelector } from "@/lib/hooks";
import LanguageSwitcher from "../LanguageSwitcher/LanguageSwitcher";

export default function TopMenu() {
  useSocket();

  const activeSessions = useAppSelector((state) => state.sessions.sessionCount);
  return (
    <header
      className={`d-flex justify-content-end align-items-center px-4 py-3 shadow-sm bg-white w-100 ${styles.header}`}
    >
      <div className="d-flex align-items-center gap-2 me-4">
        <div
          className="rounded-circle db-success"
          style={{ width: "10px", height: "10px" }}
        ></div>
        <span className="fw-bold text-secondary">
          Active sessions: {activeSessions}
        </span>
      </div>

      <Clock />

      <div className="me-3">
        <LanguageSwitcher />
      </div>
    </header>
  );
}
