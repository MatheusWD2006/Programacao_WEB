import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const [usuario, setUsuario] = useState("");
    const navigate = useNavigate();
    const isAuth = !!localStorage.getItem("usuario");

    return (
        <>
            {!isAuth ? (
                <>
                    Usuario: 
                    <input onChange={e => setUsuario(e.target.value)} value={usuario}/>
                    <button onClick={() => {
                        localStorage.setItem("usuario", usuario);
                        navigate('/privado');
                    }}>Login</button>
                </>
            ) : (
                <> 
                    <button onClick={() => {
                        localStorage.removeItem("usuario");
                        navigate('/');
                    }}>Logout</button>
                </>
            )}
        </>
    );
};

export default Login;