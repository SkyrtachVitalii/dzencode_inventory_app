import { IProduct } from "./IProduct";

export interface ISingleProductProps {
    product: IProduct;
    orderTitle: string;
    onDelete: (id: number) => void;
}