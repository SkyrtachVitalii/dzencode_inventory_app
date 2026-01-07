// SingleProduct.tsx

import styles from "./SingleProduct.module.scss";
import { ISingleProductProps } from "@/types/ISingleProductProps";
import { useFormatter, useTranslations } from "next-intl";
import Image from "next/image";

export default function SingleProduct({
  product,
  orderTitle,
  onDelete,
}: ISingleProductProps) {
  const priceUSD = product.prices?.find((p) => p.symbol === "USD");
  const priceUAH = product.prices?.find((p) => p.symbol === "UAH");
  const orderDate =
    product.order && typeof product.order === "object"
      ? product.order.date
      : null;
  const fixedCol = (width: string) => ({ width, flexShrink: 0 });

  const t = useTranslations("SingleProduct");
  const format = useFormatter();

  return (
    <div
      className={`d-flex align-items-center bg-white border rounded py-3 px-3 mb-3 w-100 ${styles.productRow}`}
    >
      <div className="me-3">
        <div
          className={`rounded-circle ${
            product.isNew ? "bg-success" : "bg-dark"
          }`}
          style={{ width: "10px", height: "10px" }}
        />
      </div>

      <div
        className="d-flex align-items-center justify-content-center me-3"
        style={{ width: "50px", height: "50px" }}
      >
        <Image
          src={product.photo || "/free-icon-monitor.png"}
          width={50}
          height={50}
          alt={product.title}
          className="mw-100 mh-100 object-fit-contain"
        />
      </div>

      <div className=" pe-3" style={fixedCol("300px")}>
        <h3
          className="h6 mb-1 text-decoration-underline cursor-pointer text-dark text-truncate"
          title={product.title}
        >
          {product.title}
        </h3>
        <span className="text-muted small d-block">{product.serialNumber}</span>
      </div>

      <div
        className="px-2 text-success fw-medium text-center"
        style={{ width: "140px" }}
      >
        {product.isNew ? t("free") : t("inService")}
      </div>

      <div className="d-flex flex-column px-2" style={{ width: "220px" }}>
        <div className="d-flex justify-content-between small text-dark">
          <span className="text-muted">{t("from")}</span>
          <span>
            {format.dateTime(new Date(product.guaranteeStart), {
              month: "2-digit",
            })}{" "}
            /{" "}
            {format.dateTime(new Date(product.guaranteeStart), {
              year: "numeric",
            })}
          </span>
        </div>
        <div className="d-flex justify-content-between small text-dark">
          <span className="text-muted">{t("to")}</span>
          <span className="text-nowrap">
            {format.dateTime(new Date(product.guaranteeEnd), {
              day: "2-digit",
            })}{" "}
            /{" "}
            {format.dateTime(new Date(product.guaranteeEnd), {
              month: "short",
            })}{" "}
            /{" "}
            {format.dateTime(new Date(product.guaranteeEnd), {
              year: "numeric",
            })}
          </span>
        </div>
      </div>

      <div
        className="px-2 small text-muted text-center"
        style={{ width: "100px" }}
      >
        {product.isNew ? t("new") : t("used")}
      </div>

      <div className="px-2 small text-dark" style={{ width: "100px" }}>
        {priceUSD && <div className="text-nowrap">{priceUSD.value} $</div>}
        {priceUAH && (
          <div className="text-muted small text-nowrap">
            {priceUAH.value} UAH
          </div>
        )}
      </div>

      <div
        className={`px-2 text-truncate  text-muted small d-none d-xl-block ${styles.multiLineTruncate}`}
        style={{ width: "300px" }}
      >
        {t("longNameOfGroup")}
      </div>

      <div
        className={`px-2 text-muted cursor-pointer  ${styles.multiLineTruncate}`}
        style={{ width: "300px" }}
        title={orderTitle}
      >
        {orderTitle}
      </div>

      <div
        className="px-2 text-end small text-muted d-flex flex-column align-items-center"
        style={{ width: "160px" }}
      >
        {orderDate ? (
          <>
            <span className="d-block text-nowrap">
              {format.dateTime(new Date(orderDate), { month: "2-digit" })} /{" "}
              {format.dateTime(new Date(orderDate), { year: "numeric" })}
            </span>
            <span className="d-block text-nowrap">
              {format.dateTime(new Date(orderDate), { day: "2-digit" })} /{" "}
              {format.dateTime(new Date(orderDate), { month: "short" })} /{" "}
              {format.dateTime(new Date(orderDate), { year: "numeric" })}
            </span>
          </>
        ) : (
          <span>-</span>
        )}
      </div>

      <button
        className={`btn btn-link text-secondary p-0 ms-2 border-0 text-decoration-none ${styles.deleteBtn}`}
        onClick={() => onDelete(product.id)}
      >
        <span className="fs-5">🗑️</span>
      </button>
    </div>
  );
}
