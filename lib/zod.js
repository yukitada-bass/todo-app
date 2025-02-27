import { z } from "zod";

export const signUpSchema = z.object({
  name: z.string().min(1, { message: "名前は必須です" }),
  email: z
    .string()
    .min(1, { message: "メールアドレスは必須です" })
    .email({ message: "正しいメールアドレスを入力してください" }),
  password: z
    .string()
    .min(1, { message: "パスワードは必須です" })
    .regex(
      /^[^\u3000-\u30ff\u4e00-\u9faf\u3040-\u30ff\u31f0-\u31ff\uff01-\uff60]*$/,
      { message: "半角英数字・記号のみを使用できます" }
    ),
});
