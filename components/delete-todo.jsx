import { useToast } from "./hooks/use-toast";
import { Button } from "./ui/button";

const DeleteTodo = ({ id, refreshTodos }) => {
  const { toast } = useToast(); //トーストを初期化

  const deleteTodo = async (e) => {
    e.preventDefault();

    if (confirm("削除してもよろしいですか？")) {
      const res = await fetch(`/api/todo/${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        toast({
          title: "削除しました！",
        });
        refreshTodos();
      } else {
        alert("エラー");
      }
    }
  };
  return (
    <Button onClick={deleteTodo} variant="destructive">
      削除
    </Button>
  );
};

export default DeleteTodo;
