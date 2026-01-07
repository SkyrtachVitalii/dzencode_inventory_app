import styles from "./ProductsFilter.module.scss";
import { IProductsFilterProps } from "@/types/IProductsFilterProps";
import { useAppSelector } from "@/lib/hooks";
import { selectFilterOptions } from "@/lib/features/products/productsSlice";
import { useTranslations } from "next-intl";

export default function ProductsFilter({
  type,
  specification,
  onTypeChange,
  onSpecChange,
}: IProductsFilterProps) {
  const { types, specifications } = useAppSelector(selectFilterOptions);
  const t = useTranslations("ProductsFilter");
  return (
    <div className={styles.filterContainer}>
      <div className={styles.filterItem}>
        <label>{t("type")}</label>
        <select value={type} onChange={(e) => onTypeChange(e.target.value)}>
          <option value={`${t("all")}`}>{t("all")}</option>
          {types.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>
      </div>

      <div className={styles.filterItem}>
        <label>{t("specification")}</label>
        <select
          value={specification}
          onChange={(e) => onSpecChange(e.target.value)}
        >
          <option value={`${t("all")}`}>{t("all")}</option>
          {specifications.map((spec) => (
            <option key={spec} value={spec}>
              {spec}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
