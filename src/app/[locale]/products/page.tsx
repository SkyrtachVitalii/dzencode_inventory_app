// app/products/page.tsx
"use client";

import { useEffect, useState } from "react";
import styles from "./Products.module.scss";
import ProductsFilter from "@/components/ProductsFilter/ProductsFilter";
import SingleProduct from "@/components/SingleProduct/SingleProduct";
import DeleteModal from "@/components/DeleteModal/DeleteModal";
import { motion } from "framer-motion";
import { IProduct } from "@/types/IProduct";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import {
  fetchProducts,
  deleteProduct,
} from "@/lib/features/products/productsSlice";
import PageLoader from "@/components/PageLoader/PageLoader";
import { useTranslations } from 'next-intl';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.001,
      delayChildren: 0.001,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

export default function ProductsPage() {
  const [selectedType, setSelectedType] = useState("All");
  const [selectedSpec, setSelectedSpec] = useState("All");

  const [productToDelete, setProductToDelete] = useState<IProduct | null>(null);

  const dispatch = useAppDispatch();
  const { productsList: productsData, loading } = useAppSelector((state) => {
    return state.products;
  });

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const filteredProducts = productsData.filter((product) => {
    const matchType = selectedType === "All" || product.type === selectedType;
    const matchSpec =
      selectedSpec === "All" || product.specification === selectedSpec;
    return matchType && matchSpec;
  });

  const handleCloseModal = () => {
    setProductToDelete(null);
  };

  const handleOpenDeleteModal = (id: number) => {
    const productFound = productsData.find((p) => p.id === id);
    if (productFound) {
      setProductToDelete(productFound);
    }
  };

  const confirmDelete = async () => {
    if (!productToDelete) return;

    try {
      dispatch(deleteProduct(productToDelete.id)).unwrap();
    } catch (error) {
      console.error(error);
    }
    handleCloseModal();
  };

  const t = useTranslations('ProductsPage');

  if (loading) {
    return <div className="p-10 text-center">Loading products...</div>;
  }

  return (
    <PageLoader isLoading={loading}>
      <div className={styles.productsPage}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className={styles.header}
        >
          <h1>{t("title")} / {filteredProducts.length}</h1>

          <ProductsFilter
            type={selectedType}
            specification={selectedSpec}
            onTypeChange={setSelectedType}
            onSpecChange={setSelectedSpec}
          />
        </motion.div>

        <motion.div
          key={`${selectedType}-${selectedSpec}`}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className={styles.productsList}
        >
          {filteredProducts.map((product) => {
            const orderTitle =
              typeof product.order === "object" && product.order !== null
                ? product.order.title
                : "No Order";

            return (
              <motion.div key={product.id} variants={itemVariants}>
                <SingleProduct
                  product={product}
                  orderTitle={orderTitle}
                  onDelete={handleOpenDeleteModal}
                />
              </motion.div>
            );
          })}
        </motion.div>

        <DeleteModal
          isOpen={!!productToDelete}
          onClose={handleCloseModal}
          onDelete={confirmDelete}
          type="product"
          title={productToDelete?.title || ""}
          serialNumber={productToDelete?.serialNumber || ""}
        />
      </div>
    </PageLoader>
  );
}
