import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import bcrypt from "bcryptjs";

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required." },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db("nivlehost");

    // Check if user already exists
    const existingUser = await db.collection("users").findOne({ email: email.toLowerCase() });
    if (existingUser) {
      return NextResponse.json(
        { error: "A user with this email already exists." },
        { status: 400 }
      );
    }

    // Hash the password securely
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert new user
    const newUserResult = await db.collection("users").insertOne({
      email: email.toLowerCase(),
      password: hashedPassword,
      createdAt: new Date(),
    });

    // Auto-provision a default Minecraft server for the new user!
    const defaultServer = {
      userId: newUserResult.insertedId.toString(),
      name: "Survival Lobby Server",
      gameId: "minecraft",
      gameName: "Minecraft Java",
      ram: "4 GB LPDDR5",
      slots: 100,
      location: {
        id: "us-east",
        city: "Dallas",
        country: "USA",
        region: "North America",
        ip: "45.132.112.18",
        flag: "🇺🇸",
        coordinates: { x: 25, y: 42 }
      },
      ip: `45.132.112.18:${Math.floor(Math.random() * 9000) + 25565}`,
      status: "online",
      createdAt: new Date()
    };

    await db.collection("servers").insertOne(defaultServer);

    return NextResponse.json(
      { success: true, message: "User registered successfully and default server provisioned." },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Registration error:", error);
    return NextResponse.json(
      { error: "Internal server error occurred." },
      { status: 500 }
    );
  }
}
