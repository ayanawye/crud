import { useUpdateTodoMutation } from "../../services/todosApi";
import { ITodo } from "@/models/ITodo";
import { message } from "antd";
import React, { FC, useState } from "react";
import { BiEditAlt } from "react-icons/bi";

interface TodoItemProps {
  todo: ITodo;
}

const TodoItem: FC<TodoItemProps> = ({ todo }) => {
  const [updateData, setUpdateData] = useState({...todo})
  const [visibleModal, setVisibleModal] = useState(false)
  const [updateTodo] = useUpdateTodoMutation()

  const handleUpdateTodo = (e: React.MouseEvent<HTMLFormElement>) => {
      e.preventDefault();
      updateTodo({ ...todo, title: updateData.title });
      message.success("This todo has been updated.");
      setVisibleModal(false);
  }

  return (
    <>
    <div className="flex gap-x-2 mt-5">
      <div className="flex">
        <input type="checkbox" className="mr-4" checked={todo.completed} onChange={() => todo.completed === false ? updateTodo({...todo, completed: true}) : updateTodo({...todo, completed: false})}/>
        <p className={todo.completed ? "line-text" : ""}>{todo.title}</p>
      </div>
        <button onClick={() => setVisibleModal(true)}>
          <BiEditAlt/>
        </button>
    </div>
    {visibleModal && (
      <div className="confirm_modal fixed flex justify-center items-center" onClick={() => setVisibleModal(false)} >
      <div className="modal_box2" onClick={(e) => e.stopPropagation()}>
        <form onSubmit={handleUpdateTodo}>
          <textarea
            value={updateData.title}
            onChange={(e) => setUpdateData({ ...updateData, title: e.target.value })}
          />
          <button type="submit" className="font-medium">
            Update
          </button>
        </form>
      </div>
    </div>
    )}
    </>

  );
};

export default TodoItem;
