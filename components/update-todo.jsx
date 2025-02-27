"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { useToast } from "@/components/hooks/use-toast";

export default function UpdateTodo({ id, previousTitle, refreshTodos }) {
  const [open, setOpen] = useState(false); //ダイアログ開閉状態
  const [title, setTitle] = useState(previousTitle);

  const { toast } = useToast(); //トーストを初期化

  const updateTodo = async (e) => {
    e.preventDefault();

    const res = await fetch(`/api/todo/${id}`, {
      method: "PATCH",
      body: JSON.stringify({ title }),
      headers: { "Content-Type": "application/json" },
    });

    if (res.ok) {
      setOpen(false);
      toast({
        title: "修正が完了しました！",
      });
      refreshTodos();
    } else {
      alert("エラー");
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">編集</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={updateTodo}>
          <DialogHeader>
            <DialogTitle>タスクを追加</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="title" className="text-right">
                タイトル
              </Label>
              <Input
                id="title"
                className="col-span-3"
                onChange={(e) => setTitle(e.target.value)}
                value={title}
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">修正</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
