import { NextRequest, NextResponse } from "next/server";

export async function GET() {

    try {
        const res = await fetch("https://dummyjson.com/users?limit=6");
        const data = await res.json();
        return NextResponse.json(data);

    } catch (error) {
        console.error(error);
    }
}

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        return NextResponse.json(body, { status: 201 });
    } catch (error) {
        console.error("Error creating user:", error);
    }
}
