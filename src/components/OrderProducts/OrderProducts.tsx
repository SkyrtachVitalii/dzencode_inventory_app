// OrderProducts.tsx

"use client";

import { useState } from "react";
import { useAppDispatch } from "@/lib/hooks";
import { deleteProductFromOrder } from "@/lib/features/orders/ordersSlice";
import { IProduct } from "@/types/IProduct";
import { IOrderProductsProps } from "@/types/IOrder";
import DeleteModal from "../DeleteModal/DeleteModal";
import styles from "./OrderProducts.module.scss";
import Image from "next/image";

export default function OrderProducts({ order, onClose }: IOrderProductsProps) {
  const dispatch = useAppDispatch();
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState<IProduct | null>(null);

  const handleDeleteClick = (product: IProduct) => {
    setProductToDelete(product);
    setDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    if (productToDelete) {
      await dispatch(
        deleteProductFromOrder({
          productId: productToDelete.id,
          orderId: order.id,
        })
      );
    }
    console.log(`Deleting product: ${productToDelete?.title}`);
    setProductToDelete(null);
    setDeleteModalOpen(false);
  };

  return (
    <>
      <div className={`card shadow-sm ${styles.productsContainer}`}>
        <h3 className="fs-4 mb-4 d-block text-truncate">{order.title}</h3>
        <button onClick={onClose} className={styles.closeBtn}>
          X
        </button>
        <div
          className="d-flex align-items-center gap-3 mb-4 text-success fw-bold"
          style={{ cursor: "pointer" }}
        >
          <div
            className="rounded-circle bg-success text-white d-flex align-items-center justify-content-center"
            style={{ width: 25, height: 25 }}
          >
            +
          </div>
          <span>Add product</span>
        </div>

        <div className="d-flex flex-column">
          {order.products.map((product: IProduct) => (
            <div
              key={product.id}
              className={`row align-items-center ${styles.productItem}`}
            >
              <div className="col-md-1 d-flex align-items-center justify-content-center">
                <span
                  className={`${styles.statusDot} ${
                    product.isNew ? styles.green : styles.black
                  }`}
                ></span>
              </div>

              <div className="col-md-1 d-block text-truncate">
                <Image
                  src={product.photo || "/free-icon-monitor.png"} 
                  width={500}
                  height={500}
                  alt={product.title}
                  className={styles.productImage}
                />
              </div>

              <div className="col-md-7">
                <div className="d-block text-truncate">{product.title}</div>
                <div className="text-muted small">{product.serialNumber}</div>
              </div>

              <div className="col-md-2 text-primary">
                {product.isNew ? "Free" : "Used"}
              </div>

              <div className="col-md-1 text-end">
                <button
                  className="btn btn-link text-danger p-0"
                  onClick={() => handleDeleteClick(product)}
                >
                  🗑️
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <DeleteModal
        isOpen={isDeleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onDelete={confirmDelete}
        title={productToDelete?.title || ""}
        serialNumber={productToDelete?.serialNumber}
        type="product"
      />
    </>
  );
}
