// src/data/products.ts
import { IProduct } from "@/types/IProduct";

const productTypes = ['Monitors', 'Laptops', 'Peripherals', 'Tablets', 'TVs'];
const specs = ['Full HD, 144Hz', '4K Ultra HD', '16GB RAM, 512GB SSD', 'Wireless, Bluetooth 5.0'];
const titles = [
    'Samsung Odyssey', 'Dell UltraSharp', 'MacBook Pro', 'Logitech MX Keys', 
    'iPad Air', 'Sony Bravia', 'LG UltraGear', 'Asus ROG Strix'
];

// Функція для генерації випадкового числа
const getRandomInt = (min: number, max: number) => 
    Math.floor(Math.random() * (max - min + 1)) + min;

// Генеруємо продукти для 30 ордерів
const generateProducts = (): IProduct[] => {
    const products: IProduct[] = [];
    let globalIdCounter = 1;

    // Проходимо по 30 ордерах
    for (let orderId = 1; orderId <= 30; orderId++) {
        // Для кожного ордера створюємо від 2 до 5 продуктів
        const productsCount = getRandomInt(2, 5);

        for (let i = 0; i < productsCount; i++) {
            const isNew = getRandomInt(0, 1) === 1;
            const typeIndex = getRandomInt(0, productTypes.length - 1);
            const titleIndex = getRandomInt(0, titles.length - 1);
            
            const priceUSD = getRandomInt(100, 2000);
            const priceUAH = priceUSD * 40; // Приблизний курс

            products.push({
                id: globalIdCounter++,
                serialNumber: `SN-${getRandomInt(1000, 9999)}-${getRandomInt(1000, 9999)}`,
                isNew: isNew,
                photo: '/free-icon-monitor.png', // Заглушка, переконайся що файл є в public
                title: `${titles[titleIndex]} ${getRandomInt(10, 99)}Gen`,
                type: productTypes[typeIndex],
                specification: specs[getRandomInt(0, specs.length - 1)],
                guaranteeStart: '2023-01-01 10:00:00',
                guaranteeEnd: '2025-01-01 10:00:00',
                prices: [
                    { value: priceUSD, symbol: 'USD', isDefault: 0 },
                    { value: priceUAH, symbol: 'UAH', isDefault: 1 }
                ],
                order: orderId // Прив'язка до ордера
            });
        }
    }
    return products;
};

export const productsData: IProduct[] = generateProducts();