import { createBrowserRouter, RouterProvider } from "react-router";
import Home from "./Home";
import Usuario from "./Usuario";
import MenuPrivado from "./MenuPrivado";
import MenuPublico from "./MenuPublico";
import Login from "./Login";
import CalculadoraProtegida from "./CalculadoraProtegida"; // Importada aqui!

const router = createBrowserRouter([
  {
    path: "/",
    element: <MenuPublico />,
    children: [
      {
        index: true,
        element: <Home />
      },
      {
        path: "login",
        element: <Login />
      }
    ]
  },
  {
    path: "/privado",
    element: <MenuPrivado />,
    children: [
      {
        index: true,
        element: <Home />
      },
      {
        path: "usuario",
        element: <Usuario />
      },
      {
        path: "calculadora", // Rota adicionada conforme requisitado no exercício
        element: <CalculadoraProtegida />
      }
    ]
  }
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;