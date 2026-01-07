// app/orders/page.tsx

"use client";

import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { fetchOrders, deleteOrder } from "@/lib/features/orders/ordersSlice";
import styles from "./Orders.module.scss";
import { IOrder } from "@/types/IOrder";
import OrderProducts from "@/components/OrderProducts/OrderProducts";
import DeleteModal from "@/components/DeleteModal/DeleteModal";
import { motion, AnimatePresence, LayoutGroup, Variants } from "framer-motion";
import PageLoader from "@/components/PageLoader/PageLoader";
import { useFormatter, useTranslations } from "next-intl";

const pageTitleVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
};

const ordersBlockVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
};

const orderShortInfoVarians: Variants = {
  hidden: {
    opacity: 0,
    x: 500,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.5 },
  },
};

const orderDetalilsVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
  exit: {
    opacity: 0,
    y: 20,
    scale: 0.95,
    transition: { duration: 0.2, ease: "easeInOut" },
  },
};

const panelVariants: Variants = {
  hidden: {
    x: 100,
    opacity: 0,
  },
  visible: {
    x: 0,
    opacity: 1,
    transition: { type: "spring", stiffness: 300, damping: 30 },
  },
  exit: {
    x: 100,
    opacity: 0,
    transition: { duration: 0.3 },
  },
};

export default function Orders() {
  const [selectedOrderId, setSelectedOrderId] = useState<number | null>(null);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [orderToDelete, setOrderToDelete] = useState<IOrder | null>(null);
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);

  const dispatch = useAppDispatch();
  const { ordersList: ordersData, loading } = useAppSelector((state) => {
    return state.orders;
  });

  const selectedOrder =
    ordersData.find((order) => order.id === selectedOrderId) || null;

  useEffect(() => {
    dispatch(fetchOrders());
  }, [dispatch]);

  const handleOrderClick = (order: IOrder) => {
    if (selectedOrder?.id === order.id) return;
    setSelectedOrderId(order.id);
    setIsSidebarVisible(true);
  };

  const closeOrder = () => {
    setSelectedOrderId(null);
  };

  const handleExitComplete = () => {
    setIsSidebarVisible(false);
  };

  const handleDeleteClick = (e: React.MouseEvent, order: IOrder) => {
    e.stopPropagation();
    setOrderToDelete(order);
    setDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    if (!orderToDelete) return;

    try {
      dispatch(deleteOrder(orderToDelete.id)).unwrap();

      if (selectedOrder?.id === orderToDelete.id) {
        setSelectedOrderId(null);
        setIsSidebarVisible(false);
      }
    } catch (error) {
      console.error(error);
    } finally {
      if (selectedOrder?.id === orderToDelete?.id) {
        setSelectedOrderId(null);
      }
      setOrderToDelete(null);
      setDeleteModalOpen(false);
    }
  };

  const addNewOrder = () => {
    alert("Add new order");
  };

  const t = useTranslations("OrdersPage");
  const format = useFormatter();

  return (
    <section
      className="container-fluid h-100"
      style={{ height: "calc(100% - var(--header-height)" }}
    >
      <PageLoader isLoading={loading}>
        <motion.div
          variants={pageTitleVariants}
          initial="hidden"
          animate="visible"
          className="d-flex align-items-center gap-4 mb-5"
        >
          <motion.button
            whileHover={{
              scale: 1.1,
              transition: { duration: 0.05 },
            }}
            className={styles.plusBtn}
            onClick={addNewOrder}
          >
            +
          </motion.button>
          <h1 className="fw-bold fs-2 m-0">
            {t("title")} / {ordersData.length}
          </h1>
        </motion.div>

        <LayoutGroup>
          <div
            className="row position-relative m-0"
            style={{ height: "100%", overflow: "hidden" }}
          >
            <motion.div
              layout="size"
              transition={{
                type: "spring",
                stiffness: 1500,
                damping: 150,
                mass: 0.01,
                velocity: 2,
                duration: 0.3,
                bounce: 0,
              }}
              className={`d-flex flex-column gap-3 ${
                isSidebarVisible ? "col-md-4" : "col-12"
              }`}
              style={{
                height: "100%",
                overflowY: "auto",
                paddingRight: "16px",
                paddingBottom: "20px",
              }}
            >
              <AnimatePresence mode="popLayout">
                {ordersData.map((order) => {
                  const totalUSD = order.products.reduce((sum, product) => {
                    const priceObj = product.prices.find(
                      (p) => p.symbol === "USD"
                    );
                    return sum + (priceObj ? priceObj.value : 0);
                  }, 0);

                  const totalUAH = order.products.reduce((sum, product) => {
                    const priceObj = product.prices.find(
                      (p) => p.symbol === "UAH"
                    );
                    return sum + (priceObj ? priceObj.value : 0);
                  }, 0);

                  const isActive = selectedOrder?.id === order.id;

                  return (
                    <motion.div
                      key={order.id}
                      layout
                      variants={ordersBlockVariants}
                      initial="hidden"
                      animate="visible"
                      exit={{
                        opacity: 0,
                        scale: 0.5,
                        transition: { duration: 0.2 },
                      }}
                      transition={{
                        type: "spring",
                        stiffness: 500,
                        damping: 30,
                      }}
                      whileHover={{ y: -4, transition: { duration: 0.05 } }}
                      className={`card shadow-sm rounded-0 p-3 ${styles.orderItem}`}
                      style={{
                        backgroundColor: isActive ? "#e6e6e6" : "white",
                        paddingRight: isActive ? "40px" : undefined,
                        cursor: "pointer",
                        overflow: "hidden",
                        flexShrink: 0,
                      }}
                      onClick={() => handleOrderClick(order)}
                    >
                      <motion.div className="row align-items-center">
                        <div
                          className={`${
                            isSidebarVisible ? "col-12" : "col-md-5"
                          }`}
                        >
                          <span
                            className="text-decoration-underline fs-5 text-dark d-block text-truncate"
                            style={{ cursor: "pointer" }}
                            title={order.title}
                          >
                            {!selectedOrder ? order.title : ""}
                          </span>
                        </div>

                        {!isSidebarVisible && (
                          <div className="d-flex col-md-7">
                            <div className="row w-100">
                              <div className="col-md-3 d-flex align-items-center gap-1">
                                <div
                                  className="border rounded-circle p-1 d-flex justify-content-center align-items-center"
                                  style={{ width: "40px", height: "40px" }}
                                >
                                  📋
                                </div>
                                <div className="">
                                  <span className="fw-bold p-1">
                                    {order.products.length}
                                  </span>
                                  <span className="text-muted small p-1">
                                    {t("products")}
                                  </span>
                                </div>
                              </div>
                              <div className="col-md-4 d-flex flex-column align-items-center justify-content-center gap-2">
                                <span className="text-muted small">
                                      {format.dateTime(new Date(order.date), { month: "2-digit" })} /{" "}
                                      {format.dateTime(new Date(order.date), { year: "numeric" })}
                                </span>
                                <span className="fw-bold">
                                    {format.dateTime(new Date(order.date), { day: "2-digit" })} /{" "}
                                      {format.dateTime(new Date(order.date), { month: "short" })} /{" "}
                                      {format.dateTime(new Date(order.date), { year: "numeric" })}
                                </span>
                              </div>

                              <div className="col-md-4 d-flex align-items-center flex-column text-center">
                                <div
                                  className="d-flex justify-content-between small"
                                  style={{ width: "120px" }}
                                >
                                  <span>{totalUSD} $</span>
                                </div>
                                <div
                                  className="d-flex justify-content-between"
                                  style={{ width: "120px" }}
                                >
                                  <span>{totalUAH} UAH</span>
                                </div>
                              </div>

                              <div className="col-md-1 d-flex justify-content-end">
                                <button
                                  className={styles.trashBtn}
                                  onClick={(e) => handleDeleteClick(e, order)}
                                >
                                  🗑️
                                </button>
                              </div>
                            </div>
                          </div>
                        )}

                        {isSidebarVisible && (
                          <motion.div
                            variants={orderShortInfoVarians}
                            initial="hidden"
                            animate="visible"
                            className="col-12 d-flex justify-content-between align-items-center position-relative"
                          >
                            <div className="col-5 d-flex align-items-center gap-1">
                              <div
                                className="border rounded-circle p-1 d-flex justify-content-center align-items-center"
                                style={{ width: "40px", height: "40px" }}
                              >
                                📋
                              </div>
                              <div className="">
                                <span className="fw-bold p-1">
                                  {order.products.length}
                                </span>
                                <span className="text-muted small p-1">
                                  Products
                                </span>
                              </div>
                            </div>
                            <div className="col-7 d-flex flex-column align-items-center justify-content-center gap-2">
                              <span className="text-muted small">
                                {`
                                ${format.dateTime(new Date(order.date), {
                                  month: "numeric",
                                }) 
                                }
                                /
                                ${format.dateTime(new Date(order.date), {
                                  year: "numeric",
                                }) 
                                }
                                `
                                }
                              </span>
                              <span className="fw-bold">
                                {format.dateTime(new Date(order.date), {
                                  day: "2-digit",
                                  month: "short",
                                  year: "numeric",
                                })}
                              </span>
                            </div>
                          </motion.div>
                        )}
                      </motion.div>
                      {isActive && (
                        <div
                          style={{
                            position: "absolute",
                            right: 0,
                            top: 0,
                            bottom: 0,
                            width: "40px",
                            backgroundColor: "#CFD8DC",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            zIndex: 5,
                          }}
                        >
                          <span className={styles.arrow}>&#8658;</span>
                        </div>
                      )}
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </motion.div>

            <AnimatePresence mode="wait" onExitComplete={handleExitComplete}>
              {selectedOrder && (
                <motion.div
                  key="panel"
                  variants={panelVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="col-md-8"
                  style={{
                    zIndex: 10,
                    position: "relative",
                    height: "100%",
                  }}
                >
                  <motion.div
                    variants={orderDetalilsVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    key={selectedOrder.id}
                    className="h-100 w-100 p-3"
                    style={{
                      zIndex: 10,
                      overflowY: "auto",
                      overflowX: "hidden",
                    }}
                  >
                    <OrderProducts order={selectedOrder} onClose={closeOrder} />
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </LayoutGroup>

        <DeleteModal
          isOpen={isDeleteModalOpen}
          onClose={() => setDeleteModalOpen(false)}
          onDelete={confirmDelete}
          title={orderToDelete?.title || ""}
          type="order"
        />
      </PageLoader>
    </section>
  );
}
