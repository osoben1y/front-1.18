import axios from 'axios';
import React, { useEffect, useState } from 'react';

const Todos = () => {
  const [todos, setTodos] = useState([]);
  const [selectedTodo, setSelectedTodo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get('https://dummyjson.com/todos')
      .then((res) => {
        setTodos(res.data.todos);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const openModal = (todo) => {
    setSelectedTodo(todo);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setSelectedTodo(null);
    document.body.style.overflow = 'auto';
  };

  useEffect(() => {
    const escHandler = (e) => {
      if (e.key === 'Escape') closeModal();
    };
    window.addEventListener('keydown', escHandler);
    return () => window.removeEventListener('keydown', escHandler);
  }, []);

  if (loading) return <p className="text-center mt-10 text-lg animate-pulse">Yuklanmoqda...</p>;
  if (error) return <p className="text-center mt-10 text-red-600">{error}</p>;

  return (
    <div className="max-w-screen-xl mx-auto px-4 py-10">
      <h2 className="text-4xl font-semibold text-center text-gray-800 dark:text-white mb-10 ">
        Vazifalar Ro'yxati
      </h2>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {todos.map((todo) => (
          <div
            key={todo.id}
            className="rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-zinc-800 shadow-sm hover:shadow-lg transition duration-300 overflow-hidden p-6"
          >
            <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-2">
              {todo.todo}
            </h3>
            <p
              className={`text-sm font-semibold ${
                todo.completed ? 'text-green-600' : 'text-yellow-600'
              }`}
            >
              {todo.completed ? '✅ Bajarilgan' : '⏳ Bajarilmagan'}
            </p>
            <button
              onClick={() => openModal(todo)}
              className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md transition"
            >
              Batafsil
            </button>
          </div>
        ))}
      </div>

      {selectedTodo && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          onClick={closeModal}
        >
          <div
            className="bg-white dark:bg-zinc-900 rounded-2xl shadow-lg p-6 w-[90%] max-w-md relative animate-fade-in"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={closeModal}
              className="absolute top-3 right-4 text-gray-400 hover:text-red-500 text-xl"
            >
              &times;
            </button>
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
              Vazifa tafsilotlari
            </h2>
            <p className="text-gray-700 dark:text-gray-300 mb-2">
              <span className="font-semibold">📌 Vazifa:</span> {selectedTodo.todo}
            </p>
            <p className="text-gray-700 dark:text-gray-300 mb-2">
              <span className="font-semibold">👤 Foydalanuvchi ID:</span> {selectedTodo.userId}
            </p>
            <p className="text-gray-700 dark:text-gray-300">
              <span className="font-semibold">📅 Status:</span>{' '}
              {selectedTodo.completed ? 'Bajarilgan ✅' : 'Bajarilmagan ⏳'}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Todos;
