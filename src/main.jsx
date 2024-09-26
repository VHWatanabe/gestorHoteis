import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { ToastContainer } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css';
import { ThemeProvider } from './components/themeContext';

import Home from "./pages/home";
import Details from "./pages/details";
import Favoritos from "./pages/favoritos"
import NotFound from './pages/not-found';

import './index.css';

const router = createBrowserRouter([
    {
        path: "/",
        element: <Home />,
    },
    {
        path: "/detalhes/:id",
        element: <Details />,
    },
    {
        path: "/favoritos",
        element: <Favoritos />,
    },
    {
        path: "*",
        element: <NotFound />,
    },
]);

createRoot(document.getElementById('root')).render(
    <>
        <ThemeProvider>
            <RouterProvider router={router} />
            <ToastContainer 
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false} 
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable 
                pauseOnHover 
            />
        </ThemeProvider>
    </>
);
