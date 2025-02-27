import Todos from "@/components/todos";
import { Button } from "@/components/ui/button";
import { signOut, auth } from "@/auth";

export default async function page() {
  const { user } = await auth();

  const fetchTodos = async () => {
    "use server";
    // フルパスで記述　あとで直す
    const res = await fetch(`http://localhost:3000/api/todo?userId=${user.id}`);
    return await res.json();
  };

  // 初回レンダリング時
  const todos = await fetchTodos();

  return (
    <div className="flex flex-col gap-4 min-h-svh w-full p-6 md:p-10">
      <header className="flex justify-between items-center">
        <h1>ようこそ{user.name}さん</h1>
        <form
          action={async () => {
            "use server";
            await signOut();
          }}
        >
          <Button type="submit">ログアウト</Button>
        </form>
      </header>
      <Todos fetchTodos={fetchTodos} initialTodos={todos} />
    </div>
  );
}
