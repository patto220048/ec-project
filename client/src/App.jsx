import './App.module.scss';
import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom';
import Home from './pages/home/Home';
import Login from './pages/login/Login';

function App() {
    function Layout() {
        return (
            <>
                <Outlet />
            </>
        );
    }

    const router = createBrowserRouter([
        {
            path: '/',
            element: <Layout />,
            children: [
                {
                    path: '/',
                    element: <Home />,
                },
            ],
            
        },
        {
            path: '/login',
            element: <Login />,
        }
    ]);
    return (
        <>
            <RouterProvider router={router} />
        </>
    );
}

export default App;
