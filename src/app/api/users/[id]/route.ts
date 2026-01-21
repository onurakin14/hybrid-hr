import { NextRequest, NextResponse } from "next/server";

export async function GET({ params }: { params: { id: string } }) {

    try {
        const id = parseInt(params.id);
        const res = await fetch(`https://dummyjson.com/users/${id}`);
        const data = await res.json();
        return NextResponse.json(data);

    } catch (error) {
        console.error(error);
    }
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
    try {
        const id = parseInt(params.id);
        const body = await request.json();

        return NextResponse.json(body, { status: 200 });
    } catch (error) {
        console.error("Error updating user:", error);
    }
}

export async function DELETE({ params }: { params: { id: string } }) {

    try {
        const id = parseInt(params.id);
        const res = await fetch(`https://dummyjson.com/users/${id}`, { method: 'DELETE' });
        return NextResponse.json(res, { status: 200 });

    } catch (error) {
        console.error("Error deleting user:", error);
    }
}
