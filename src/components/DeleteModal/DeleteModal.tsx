// DeleteModal.tsx

import styles from "./DeleteModal.module.scss";
import { IDeleteModalProps } from "@/types/IDeleteModalProps";
import { useTranslations } from "use-intl";
import Image from "next/image";

export default function DeleteModal({
  isOpen,
  onClose,
  onDelete,
  title,
  serialNumber,
  type,
}: IDeleteModalProps) {
  const t = useTranslations("DeleteModal");
  if (!isOpen) return null;

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div
        className={styles.modal}
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <div className={styles.header}>
          <h4>{t("message")}</h4>
        </div>

        <div className={styles.body}>
          <div className={styles.itemInfo}>
            <span
              className={`${styles.statusDot} ${
                type === "product" ? styles.product : ""
              }`}
            ></span>
            {type === "order" && (
              <Image
                src="/free-icon-order.png"
                width={20}
                height={20}
                alt=""
              />
            )}
            <div className="">
              {title}
              <br />
              <span className="text-muted small">{serialNumber}</span>
            </div>
          </div>
        </div>

        <div className={styles.footer}>
          <button className={styles.cancelBtn} onClick={onClose}>
            {t("cancel")}
          </button>
          <button className={styles.deleteBtn} onClick={onDelete}>
            🗑️ {t("confirm")}
          </button>
        </div>
      </div>
    </div>
  );
}
