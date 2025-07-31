import axios from 'axios';
import React, { useEffect, useState } from 'react';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get('https://dummyjson.com/users')
      .then((res) => {
        setUsers(res.data.users);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const openModal = (user) => {
    setSelectedUser(user);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setSelectedUser(null);
    document.body.style.overflow = 'auto';
  };

  useEffect(() => {
    const escHandler = (e) => {
      if (e.key === 'Escape') closeModal();
    };
    window.addEventListener('keydown', escHandler);
    return () => window.removeEventListener('keydown', escHandler);
  }, []);

  if (loading)
    return <p className="text-center mt-10 text-lg animate-pulse">Yuklanmoqda...</p>;
  if (error)
    return <p className="text-center mt-10 text-red-600">{error}</p>;

  return (
    <div className="max-w-screen-xl mx-auto px-4 py-10">
      <h2 className="text-4xl font-bold text-center text-gray-900 dark:text-white mb-10">
         User list
      </h2>

      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {users.map((user) => (
          <div
            key={user.id}
            className="rounded-3xl border border-gray-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 shadow-md hover:shadow-xl transition-all duration-300"
          >
            <img
              src={user.image}
              alt={`${user.firstName} ${user.lastName}`}
              className="w-full h-60 object-cover rounded-t-3xl"
            />
            <div className="p-5 text-center">
              <h3 className="text-2xl font-semibold text-gray-800 dark:text-white mb-1">
                {user.firstName} {user.lastName}
              </h3>
              <p className="text-gray-500 dark:text-gray-400 text-sm mb-1">{user.email}</p>
              <p className="text-gray-500 dark:text-gray-400 text-sm">
                 {user.address.city}, {user.address.state}
              </p>
              <button
                onClick={() => openModal(user)}
                className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-full transition"
              >
                Profilni ko‘rish
              </button>
            </div>
          </div>
        ))}
      </div>

      {selectedUser && (
        <div
          className="fixed inset-0 bg-black/60 flex items-center justify-center z-50"
          onClick={closeModal}
        >
          <div
            className="bg-white dark:bg-zinc-900 rounded-3xl shadow-2xl p-8 w-[90%] max-w-xl relative animate-fade-in"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={closeModal}
              className="absolute top-4 right-5 text-2xl text-gray-500 hover:text-red-600"
            >
              &times;
            </button>

            <img
              src={selectedUser.image}
              alt={selectedUser.firstName}
              className="w-40 h-40 rounded-full object-cover border-4 border-blue-500 mx-auto mb-4"
            />

            <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-white mb-2">
              {selectedUser.firstName} {selectedUser.lastName}
            </h2>

            <p className="text-center text-gray-600 dark:text-gray-300 mb-1">
               <span className="font-medium">{selectedUser.email}</span>
            </p>
            <p className="text-center text-gray-600 dark:text-gray-300 mb-1">
               <span className="font-medium">{selectedUser.phone}</span>
            </p>
            <p className="text-center text-gray-600 dark:text-gray-300 mb-1">
               Username: <span className="font-medium">{selectedUser.username}</span>
            </p>
            <p className="text-center text-gray-700 dark:text-gray-200 font-semibold mt-3">
               Manzil: {selectedUser.address.city}, {selectedUser.address.state}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Users;
