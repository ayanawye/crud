import { useCreatePostMutation } from "../services/postAPI";
import { useCreateTodoMutation } from "../services/todosApi";
import { useGetAllUsersQuery } from "../services/usersApi";
import { message } from "antd";
import { usePathname } from "next/navigation";
import React, { FC, useState } from "react";

interface AddNewPostProps {
  close: () => void;
}

const AddNewPost: FC<AddNewPostProps> = ({ close }) => {
  const [newPost, setNewPost] = useState({ title: "", body: "", userId: "" });
  const [newTodo, setNewTodo] = useState({title: "", userId: "", completed: false});
  const [createPost] = useCreatePostMutation();
  const [createTodo] = useCreateTodoMutation();
  const { data: users } = useGetAllUsersQuery("");
  const pathname = usePathname()

  const createNewPosts = (e: React.MouseEvent<HTMLFormElement>) => {
    e.preventDefault();
    createPost({...newPost, userId: Number(newPost.userId)});
    message.success("We created post");
    close();
  };
  const createNewTodo = (e: React.MouseEvent<HTMLFormElement>) => {
    e.preventDefault();
    createTodo({...newTodo, userId: Number(newPost.userId)});
    message.success("We created todo");
    close();
  };

  return (
    <div
      className="confirm_modal fixed flex justify-center items-center"
      onClick={() => close()}
    >
      <div className="modal_box2" onClick={(e) => e.stopPropagation()}>
        {pathname === '/' && <form onSubmit={createNewPosts}>
          <textarea
            value={newPost.title}
            onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
          />
          <textarea
            value={newPost.body}
            onChange={(e) => setNewPost({ ...newPost, body: e.target.value })}
          />
          <select
            value={newPost.userId}
            onChange={(event) =>
              setNewPost((prevPost) => ({
                ...prevPost,
                userId: event.target.value,
              }))
            }
          >
            <option disabled value="">Author</option>
            {users &&
              users?.map((user) => (
                <option key={user.id} value={user.id}>{user.name}</option>
              ))}
          </select>
          <button type="submit" className="font-medium">
            Create New Post
          </button>
        </form>}
        {pathname === '/todos' && <form onSubmit={createNewTodo}>
        <textarea
            value={newTodo.title}
            onChange={(e) => setNewTodo({ ...newTodo, title: e.target.value })}
          />
          <select
            value={newTodo.userId}
            onChange={(event) =>
              setNewTodo((prevPost) => ({
                ...prevPost,
                userId: event.target.value,
              }))
            }
          >
            <option disabled value="">Author</option>
            {users &&
              users?.map((user) => (
                <option key={user.id} value={user.id}>{user.name}</option>
              ))}
          </select>
          <button type="submit" className="font-medium">
            Create New Todo
          </button>
        </form> }
      </div>
    </div>
  );
};

export default AddNewPost;
