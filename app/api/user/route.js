import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";

export async function POST(req) {
  try {
    const { name, email, password } = await req.json();
    // すでに登録済みのメールアドレスならエラー
    if (await prisma.user.findUnique({ where: { email } })) {
      return new Response("すでに登録済みのメールアドレスです", {
        status: 400,
      });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await prisma.user.create({
      data: { name, email, password: hashedPassword },
    });
    return new Response(JSON.stringify(newUser), { status: 201 });
  } catch (error) {
    return new Response("Error creating user", { status: 500 });
  }
}
