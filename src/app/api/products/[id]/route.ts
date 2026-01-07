// src/app/api/products/[id]/toute.ts

import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

type Props = {
    params: Promise<{ id: string }>;
};

export async function DELETE(request: Request, props: Props) {
    try {
        const params = await props.params;
        const id = Number(params.id);

        if (isNaN(id)) {
            return NextResponse.json(
                { error: "Invalid ID" },
                { status: 400 }
            )
        }

        await prisma.product.delete({
            where: { id },
        })

        return NextResponse.json({
            message: "Product deleted successfully"
        });
    } catch (error) {
        console.error(error);
        return NextResponse.json(
            { error: "Failed to delete product" },
            { status: 500 }
        )
    }
};
