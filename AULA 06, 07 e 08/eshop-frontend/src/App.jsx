import {
    createBrowserRouter,
    RouterProvider
} from "react-router-dom";

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css'

import Menu from "./components/Menu";
import Home from "./components/view/Home";
import Categoria from "./components/view/categoria/Categoria";
import Produto from "./components/view/produto/Produto";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Menu />,

        children: [

            {
                index: true,
                element: <Home />,
            },

            {
                path: "categorias",
                element: <Categoria/>
            },

            {
                path: "produtos",
                element: <Produto/>
            }

        ]
    }
]);

function App() {
    return (
        <RouterProvider router={router} />
    );
}

export default App;
