// IOrder.ts

import { IProduct } from "./IProduct";

export interface IOrder {
    id: number,
    title: string,
    date: string | Date,
    description: string,
    products: IProduct[];
}

export interface IOrderProductsProps {
    order: IOrder,
    onClose: () => void;
}