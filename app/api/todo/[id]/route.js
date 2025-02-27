import prisma from "@/lib/prisma";

export async function PATCH(req, { params }) {
  const { id } = await params;
  const { title, completed } = await req.json();

  const updatedTodo = await prisma.todo.update({
    where: { id: parseInt(id) },
    data: {
      ...(title !== undefined && { title }),
      ...(completed !== undefined && { completed }),
    },
  });

  return Response.json(updatedTodo);
}

export async function DELETE(req) {
  const id = req.nextUrl.pathname.split("/").pop();

  try {
    const deletedTodo = await prisma.todo.delete({
      where: { id: parseInt(id) },
    });

    return Response.json(deletedTodo, { status: 200 });
  } catch (error) {
    return Response.json({ error: "Failed to fetch todos" }, { status: 500 });
  }
}
