"use client";
import { useState, useEffect } from "react";
import { format } from "date-fns";
import { enUS } from "date-fns/locale";
import styles from "../TopMenu/TopMenu.module.scss";

export default function Clock() {
    const [date, setDate] = useState<Date | null>(null);

    useEffect(() => {
        const updateDate = () => setDate(new Date());
        const initial = setTimeout(updateDate, 0);
        const interval = setInterval(updateDate, 1000);
        return () => { clearTimeout(initial); clearInterval(interval); };
    }, []);

    if (!date) return null;

    return (
        <div className="d-flex flex-column">
             <div className={styles.dayBlock}>
                <span>{format(date, "EEEE", { locale: enUS })}</span>
            </div>
            <div className={styles.dateBlock}>
                <span className="fw-bold">🕒 {format(date, "dd.MM.yyyy", { locale: enUS })}</span>
                <span className="ms-3 fw-bold">{format(date, "HH:mm")}</span>
            </div>
        </div>
    );
}