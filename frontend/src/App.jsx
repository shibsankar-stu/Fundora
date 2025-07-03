import { Routes, Route } from 'react-router-dom';
import Register from './pages/register';
import Home from './pages/home';
import Login from './pages/login';

import FundDetails from './pages/fundDetails';
import Profile from './pages/profile';

function App() {
  return (
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/fund/:code" element={<FundDetails />} />
      <Route path="/profile" element={<Profile />} />
    </Routes>
  );
}

export default App;
