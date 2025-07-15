import { PrismaClient } from "@prisma/client";
import { writeFile } from "fs/promises";
import { NextResponse } from "next/server";
const prisma = new PrismaClient();
import path from "path";

export async function GET() {
  try {
    const menus = await prisma.menu.findMany({
      orderBy: {
        available: "desc",
      },
    });
    return Response.json(menus);
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req) {
  console.log(req);
  const formData = await req.formData();

  const name = formData.get("name");
  const price = parseInt(formData.get("price"));
  const type = formData.get("type");
  const file = formData.get("image");
  const available = false;

  if (!name || !price || !type || !file) {
    return NextResponse.json(
      { message: "Semua field wajib diisi" },
      { status: 400 }
    );
  }

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);
  const filename = Date.now() + "-" + file.name;
  const filepath = path.join(process.cwd(), "public/uploads", filename);
  await writeFile(filepath, buffer);

  const newMenu = await prisma.menu.create({
    data: {
      name,
      price,
      type,
      image: `/uploads/${filename}`,
      available,
    },
  });

  return NextResponse.json(newMenu);
}
