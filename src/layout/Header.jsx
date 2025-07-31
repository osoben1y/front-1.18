import { NavLink } from 'react-router-dom';

const Header = () => {
  return (
    <header className="bg-[#0f172a] text-white py-4 shadow-md">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <NavLink to="/" className="text-xl font-bold tracking-wide">
          Logo
        </NavLink>
        <nav className="flex gap-6 text-sm">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? 'text-blue-400 border-b-2 border-blue-400 pb-1' : 'text-gray-300 hover:text-white'
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/user"
            className={({ isActive }) =>
              isActive ? 'text-blue-400 border-b-2 border-blue-400 pb-1' : 'text-gray-300 hover:text-white'
            }
          >
            Todos
          </NavLink>
          <NavLink
            to="/posts"
            className={({ isActive }) =>
              isActive ? 'text-blue-400 border-b-2 border-blue-400 pb-1' : 'text-gray-300 hover:text-white'
            }
          >
            Posts
          </NavLink>
        </nav>
        <NavLink to="/login">
          <button className="bg-white text-gray-800 px-4 py-1.5 rounded hover:bg-gray-100 text-sm font-semibold">
            Sign in
          </button>
        </NavLink>
      </div>
    </header>
  );
};

export default Header;