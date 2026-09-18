import { createBrowserRouter, RouterProvider } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css'
import '@popperjs/core/dist/cjs/popper.js'
import 'bootstrap/dist/js/bootstrap.min.js'
import 'bootstrap-icons/font/bootstrap-icons.css'
import Menu from './components/Menu'
import Home from './components/view/Home'
import Sobre from "./components/view/Sobre";
import Categoria from "./components/view/categoria/Categoria";

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
        path: "/sobre",
        element: <Sobre />,
      },
      {
        path: "/categorias",
        element: <Categoria />,
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