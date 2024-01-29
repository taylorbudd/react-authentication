import Register from './components/Register';
import Login from './components/Login';
import Home from './components/Home';
import Profile from './components/Profile';
import Missing from './components/Missing';
import Layout from './components/Layout';
import Logout from './components/Logout';
import RequireAuth from './components/RequireAuth';
import { Routes, Route } from 'react-router-dom';
import Cookies from 'js-cookie';

function App() {

  const cookie = Cookies.get('user');

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* public routes */}
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        
        {/* private routes */}
        <Route element={<RequireAuth />}>
          <Route path="/" element={<Home />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/logout' element={<Logout />} />
        </Route>

        <Route path="*" element={<Missing />} />
      </Route>
    </Routes>
  );
}

export default App;
