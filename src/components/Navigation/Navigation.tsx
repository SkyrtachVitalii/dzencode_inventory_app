// src/components/Navigation/Navigation.tsx
"use client";

import { Link, usePathname } from "@/navigation"; 
import styles from "./Navigation.module.scss";
import { useTranslations } from "next-intl";
import Image from "next/image";

export default function Navigation() {
    const pathname = usePathname();
    const t = useTranslations("Navigation");

    return (
        <nav className={styles.navigation}>
            <div className={styles.avatarContainer}>
                <div className={styles.avatar}>
                    <Link href="/">
                        <Image
                            src="https://ui-avatars.com/api/?bold=true"
                            width={40}
                            height={40}
                            alt="User"
                        />
                    </Link>
                </div>
            </div>
            <ul className={styles.menu}>
                <li>
                    <Link 
                        href="/orders" 
                        className={pathname === "/orders" ? styles.active : ""}
                    >
                        {t("orders")}
                    </Link>
                </li>
                <li>
                    <Link 
                        href="/products" 
                        className={pathname === "/products" ? styles.active : ""}
                    >
                        {t("products")}
                    </Link>
                </li>
            </ul>
        </nav>
    )
}