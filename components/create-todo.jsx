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
import { Plus } from "lucide-react";

export default function CreateTodo({ refreshTodos }) {
  const [open, setOpen] = useState(false); //ダイアログ開閉状態
  const [title, setTitle] = useState("");

  const { toast } = useToast(); //トーストを初期化

  const createTodo = async (e) => {
    e.preventDefault();

    const res = await fetch("/api/todo", {
      method: "POST",
      body: JSON.stringify({ title }),
      headers: { "Content-Type": "application/json" },
    });

    if (res.ok) {
      setOpen(false);
      toast({
        title: "作成が完了しました！",
      });
      refreshTodos();
    } else {
      alert("エラー");
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="icon" className="rounded-full fixed right-4 bottom-4">
          <Plus />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={createTodo}>
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
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">作成</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
