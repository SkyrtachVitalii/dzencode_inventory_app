// src/data/orders.ts
import { IOrder } from "@/types/IOrder";
import { productsData } from "./products";

const descriptions = [
    'Urgent delivery for IT department',
    'Planned equipment upgrade',
    'Monthly supply restock',
    'New office setup equipment'
];

const generateOrders = (): IOrder[] => {
    const orders: IOrder[] = [];

    for (let i = 1; i <= 30; i++) {
        const date = new Date(2023, 0, 1); // Початкова дата
        date.setDate(date.getDate() + i * 5); // Кожен ордер +5 днів від попереднього

        // Форматуємо дату в рядок (або ISO, залежно від твого типу, тут залишив як у твоєму прикладі)
        const dateString = date.toISOString().replace('T', ' ').substring(0, 19);

        orders.push({
            id: i,
            title: `Order #${1000 + i} - ${descriptions[i % descriptions.length]}`,
            date: dateString,
            description: descriptions[i % descriptions.length],
            // Фільтруємо продукти, які належать цьому ордеру
            products: productsData.filter(product => product.order === i)
        });
    }

    return orders;
};

export const ordersData: IOrder[] = generateOrders();