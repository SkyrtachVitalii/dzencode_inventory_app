export interface IDeleteModalProps {
    isOpen: boolean;
    onClose: () => void;
    onDelete: () => void;
    title: string;
    serialNumber?: number | string;
    type: "order" | "product";
}