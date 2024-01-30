import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Login from './routes/Login';
import Signup from './routes/signup';
import Dashboard from './routes/dashboard';
import ProtectedRoute from './routes/protectedRaute';
import { AuthProvider } from './Autenticacion/AutProvider';
import Home from './components/Home';
import Perfil from './routes/perfil';
import ContactUs from './routes/contactUs';
import InfoParqueadero from './routes/infoParqueadero';
import Creacion from './routes/Creacion';
import Post from './pages/post/post'
import Posts from './pages/posts/posts';



const router = createBrowserRouter([
  {
    path: '/',
    element: <Login />,
  },
  
  {
    path: '/signup',
    element: <Signup />,
  },
  {
    path: '/Creacion',
    element: <Creacion />,
  },
  {
    path: '/Post',
    element: <Posts />
  },
  {
    path: '/Post',
    element: <Posts />
  },
  {
    path: "/post/:id" ,
    element: <Post />
  },
 
  {
    path: '/Home',
    element: <Home />,
  },
  {
    path: '/Perfil',
    element: <Perfil />,
  },
  {
    path: '/infoParqueadero',
    element: <InfoParqueadero />,
  },
  {
    path: '/ContactUs',
    element: <ContactUs />,
  },
  {
    path: '/',
    element: <Signup />,
  },
  {
    path: '/',
    element: <ProtectedRoute />,
    children: [
      {
        path: '/Dashboard',
        element: <Dashboard />,
      },
    ],
  },
]);


ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>,
);