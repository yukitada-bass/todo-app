"use client";

import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableCell,
  TableHead,
  TableFooter,
} from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import CreateTodo from "./create-todo";
import UpdateTodo from "./update-todo";
import DeleteTodo from "./delete-todo";
import { useState } from "react";

export default function Todos({ fetchTodos, initialTodos }) {
  const [todos, setTodos] = useState(initialTodos);

  // todosを再レンダリングする関数
  // fetchをラップしているので非同期処理
  const refreshTodos = async () => {
    // 状態管理しているtodosをfetchTodosで更新
    setTodos(await fetchTodos());
  };

  // 完了ステータス更新
  const handleChange = async (id, completed) => {
    try {
      const res = await fetch(`/api/todo/${id}`, {
        method: "PATCH",
        body: JSON.stringify({ completed }),
        headers: { "Content-Type": "application/json" },
      });

      if (res.ok) {
        refreshTodos();
      } else {
        alert("更新に失敗しました。");
      }
    } catch (error) {
      console.error("更新エラー:", error);
    }
  };

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-4">✅</TableHead>
            <TableHead>タスク</TableHead>
            <TableHead className="w-24 text-center">ステータス</TableHead>
            <TableHead className="w-20 text-center">編集</TableHead>
            <TableHead className="w-20 text-center">削除</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {todos.map((todo) => (
            <TableRow
              key={todo.id}
              className={todo.completed ? "bg-gray-200 hover:bg-gray-200" : ""}
            >
              <TableCell>
                <Checkbox
                  checked={todo.completed}
                  onCheckedChange={(checked) => handleChange(todo.id, checked)}
                />
              </TableCell>
              <TableCell>{todo.title}</TableCell>
              <TableCell className="w-24 text-center">
                {todo.completed ? "完了" : "未完了"}
              </TableCell>
              <TableCell className="w-20 text-center">
                <UpdateTodo
                  id={todo.id}
                  previousTitle={todo.title}
                  refreshTodos={refreshTodos}
                />
              </TableCell>
              <TableCell className="w-20 text-center">
                <DeleteTodo id={todo.id} refreshTodos={refreshTodos} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <CreateTodo refreshTodos={refreshTodos} />
    </>
  );
}
