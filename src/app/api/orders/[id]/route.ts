// src/app/api/orders/[id]/route.ts
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

type Props = {
    params: Promise<{ id: string }>;
};

export async function DELETE(request: Request, props: Props) {
    try {
        const params = await props.params;
        const id = Number(params.id);

        if (isNaN(id)) {
            return NextResponse.json({ error: "Invalid ID" }, { status: 400 })
        }
        
        await prisma.order.delete({
            where: { id },
        });

        return NextResponse.json({ message: 'Order deleted successfully' });
    } catch (error) {
        console.error('Error deleting order:', error);
        return NextResponse.json(
            { error: 'Failed to delete order' },
            { status: 500 }
        );
    }
}