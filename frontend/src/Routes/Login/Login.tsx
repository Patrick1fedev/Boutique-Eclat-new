import { useState } from 'react'
import { useNavigate, Link, useLocation} from 'react-router-dom';
import '../../styles/SignIn_LogIn.css'
import { useUser } from '../../Context/UserContext.tsx';

const LogIn = () => {
    const { login, user } = useUser();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from || "/";

    const handleLogin = async(e) => {
        e.preventDefault();
        const savedUser = localStorage.getItem('user');

       try {
        await login(email, password);
            console.log('usuario autenticado', user);
            navigate( from, {replace: true});
       } catch (error) {
        setError(error.message);
        alert(error);
        console.log('error: ', error)
       }
    };

  return (
    <section id='LogIn'>
        <h3><i>Bienvenido de vuelta!</i></h3>
        <p>Inicia sesion para acceder a tu cuenta.</p>
        <form className='register' onSubmit={handleLogin}>
            <input type="email" value={email} onChange={(e)=> setEmail(e.target.value)} placeholder='Email' required/>
            <input type="password" value={password} onChange={(e)=> setPassword(e.target.value)} placeholder='Contraseña' required/>
            <button type='submit'>Iniciar sesion</button>
            </form>
        <small>No tienes cuenta? <Link to='/sign_form' replace>Registrate Aqui</Link></small>
    </section>
  )
}

export default LogIn