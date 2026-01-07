// src/app/api/orders/route.ts
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function GET() {
    try {
        const orders = await prisma.order.findMany({
            include: {
                products: {
                    include: {
                        prices: true,
                    },
                },
            },
            orderBy: {
                date: 'desc',
            },
        });

        return NextResponse.json(orders);
    } catch (error) {
        console.error('Error fetching orders:', error);
        return NextResponse.json(
            { error: 'Failed to fetch orders' },
            { status: 500 }
        );
    }
}