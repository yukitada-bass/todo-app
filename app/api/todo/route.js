import prisma from "@/lib/prisma";
import { auth } from "@/auth";

export async function GET(req) {
  const userId = req.nextUrl.searchParams.get("userId");

  if (!userId) {
    return Response.json({ error: "userId is required" }, { status: 400 });
  }

  try {
    const todos = await prisma.todo.findMany({
      where: {
        userId: parseInt(userId),
      },
      orderBy: {
        id: "asc",
      },
    });

    return Response.json(todos, { status: 200 });
  } catch (error) {
    return Response.json({ error: "Failed to fetch todos" }, { status: 500 });
  }
}

export async function POST(req) {
  const session = await auth();

  if (!session) {
    return Response.json({ error: "セッションがない" }, { status: 401 });
  }

  const { title } = await req.json();
  if (!title) {
    return Response.json({ error: "タイトルがない" }, { status: 400 });
  }

  try {
    const newTodo = await prisma.todo.create({
      data: {
        title,
        completed: false,
        userId: parseInt(session.user.id, 10),
      },
    });

    return Response.json(newTodo, { status: 201 });
  } catch (error) {
    return Response.json({ error: "Failed to fetch todos" }, { status: 500 });
  }
}
