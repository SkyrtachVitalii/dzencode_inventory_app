// IProduct.ts

export interface IProduct {
    id: number,
    serialNumber: string,
    isNew: boolean,
    photo: string | null;
    title: string,
    type: string,
    specification: string,
    guaranteeStart: string | Date;
    guaranteeEnd: string | Date;
    prices: {
        value: number,
        symbol: string,
        isDefault: number
    }[];
    order: {
        id: number,
        title: string,
        date: string | Date;
    } | number,
}