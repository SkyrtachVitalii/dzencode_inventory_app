export interface IProductsFilterProps {
    type: string;
    specification: string;
    onTypeChange: (value: string) => void;
    onSpecChange: (value: string) => void;
}