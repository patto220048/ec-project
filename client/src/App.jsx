import './App.module.scss';
import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom';
import Home from './pages/home/Home';

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
    ]);
    return (
        <>
            <RouterProvider router={router} />
        </>
    );
}

export default App;
