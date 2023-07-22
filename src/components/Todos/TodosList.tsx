"use client";
import { useGetAllTodosQuery } from "../../services/todosApi";
import React, { useMemo, useState } from "react";
import TodoItem from "./TodoItem";
import AddNewPost from "../AddNewPost";
import Pagination from "../Pagination";

const TodosList = () => {
  const [limit, setLimit] = useState<string>("10");
  const { data: todos, isLoading } = useGetAllTodosQuery(limit);
  const [newTodo, setNewTodo] = useState<boolean>(false)
  const [done, setDone] = useState<string>('')
  const [filter, setFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(10);

  const lastRepositoryIndex = currentPage * postsPerPage;
  const firstRepositoryIndex = lastRepositoryIndex - postsPerPage;
  const paginate = (pageNumber: any) => setCurrentPage(pageNumber);
  
  const currentTodo = useMemo(() => {
    const todosNew = todos ? [...todos] : [];
    
    if (done === "title") {
      return todosNew?.slice(firstRepositoryIndex, lastRepositoryIndex).sort((a, b) => a.title.localeCompare(b.title));
    } else if (done === "completed") {
        return todosNew?.slice(firstRepositoryIndex, lastRepositoryIndex).sort((a, b) => {
        if (a.completed === b.completed) {
          return 0;
        } else if (a.completed) {
          return -1; // a.completed === true, а b.completed === false, поэтому a должно быть первым
        } else {
          return 1; // a.completed === false, а b.completed === true, поэтому b должно быть первым
        }
      
      })
    } else if (done === "notCompleted") {
      todosNew.sort((a, b) => (a.completed === b.completed ? 0 : a.completed ? -1 : 1));
    }
    return todosNew?.slice(firstRepositoryIndex, lastRepositoryIndex).sort((a, b) => {
      if (a.completed === b.completed) {
        return 0;
      } else if (a.completed) {
        return 1;
      } else {
        return -1;
      }
    })
  }, [todos, done, filter, currentPage, postsPerPage]);

  return (
    <div className="container">
      <div className="flex gap-x-6 mt-4">
      <select
          value={limit}
          onChange={(event) => setLimit(event.target.value)}
        >
          <option value="10">10 Posts</option>
          <option value="20">20 Posts</option>
          <option value="50">50 Posts</option>
          <option value="100">100 Posts</option>
          <option value="">All</option>
        </select>
      <button onClick={() => setNewTodo(true)}>Add New Todo</button>
      <button onClick={() => setDone("title")}>Filter By Title</button>
      <select value={done} onChange={(event) => setDone(event.target.value)}>
        <option value="" disabled>Filter</option>
        <option value="completed">Completed</option>
        <option value="notCompleted">Not completed</option>
      </select>
      </div>
      <div className="todos mt-9">
        {isLoading && (
          <h1 className="font-bold text-3xl text-center">Loading...</h1>
        )}
        {currentTodo &&
          currentTodo.map((todo) => <TodoItem todo={todo} key={todo.id} />)}
      </div>
      {newTodo && <AddNewPost close={() => setNewTodo(false)} />}
      <Pagination
          perPage={postsPerPage}
          totalRepocitories={todos?.length}
          paginate={paginate}
          currentPage={currentPage}
        />
    </div>
  );
};

export default TodosList;
