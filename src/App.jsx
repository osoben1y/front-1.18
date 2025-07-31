import {Routes, Route } from 'react-router-dom';
import Layout from './pages/layout/Layout';
import Home from './pages/home/Home';
import User from './pages/user/User';
import Login from './pages/login/Login';
import NotFound from './pages/notfound/NotFound';
import Posts from './pages/posts/Posts';

const App = () => {
  return (
    
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/user" element={<User />} />
           <Route path="/posts" element={<Posts />} />
          <Route path="*" element={<NotFound />} />

        </Route>
        <Route>
          <Route path="/login" element={<Login />} />
        </Route>
      </Routes>
    
  );
};

export default App;
