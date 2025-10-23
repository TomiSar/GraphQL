import { Route, Routes } from 'react-router-dom';
import Home from '../pages/Home';
import NotFound from '../pages/NotFound';
import Project from '../pages/Project';
import Client from '../pages/Client';

export default function AppRoutes() {
  return (
    <div className='container'>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/project/:id' element={<Project />} />
        <Route path='/client/:id' element={<Client />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </div>
  );
}
