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
import { useToast } from "@/components/hooks/use-toast";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signUpSchema } from "@/lib/zod";

export default function SignUp() {
  const { toast } = useToast(); //トーストを初期化
  const [open, setOpen] = useState(false); //ダイアログ開閉状態

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm({
    resolver: zodResolver(signUpSchema),
  });

  const createAccount = async (data) => {
    const res = await fetch("/api/user", {
      method: "POST",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" },
    });

    if (res.ok) {
      setOpen(false);
      toast({
        title: "アカウント作成が完了しました！",
        description: "ログインしてください。",
      });
    } else {
      setError("email", {
        type: "manual", // 手動で設定するためのタイプ
        message: await res.text(), // APIからのエラーメッセージを設定
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="w-full">
          アカウントを作成
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit(createAccount)}>
          <DialogHeader>
            <DialogTitle>アカウントを作成</DialogTitle>
            <DialogDescription>
              名前とメールアドレス、パスワードを入力してください。
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div>
              <Label htmlFor="name" className="text-right">
                名前
              </Label>
              <Input id="name" className="col-span-3" {...register("name")} />
              {errors.name && (
                <p className="text-red-500 text-sm mt-2">
                  {errors.name.message}
                </p>
              )}
            </div>
            <div>
              <Label htmlFor="email" className="text-right">
                メールアドレス
              </Label>
              <Input id="email" className="col-span-3" {...register("email")} />
              {errors.email && (
                <p className="text-red-500 text-sm mt-2">
                  {errors.email.message}
                </p>
              )}
            </div>
            <div>
              <Label htmlFor="password" className="text-right">
                パスワード
              </Label>
              <Input
                id="password"
                className="col-span-3"
                {...register("password")}
              />
              {errors.password && (
                <p className="text-red-500 text-sm mt-2">
                  {errors.password.message}
                </p>
              )}
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
