import { useState } from 'react'
import '../../styles/SignIn_LogIn.css'
import { useNavigate, Link } from 'react-router-dom';
import { useUser } from '../../Context/UserContext.tsx';

const SignIn = () => {

    const { signin } = useUser();
    const [username, setUserName] = useState('');
    const [email, setUserEmail] = useState('');
    const [password, setUserPassword] = useState('');
    const navigate = useNavigate();

    async function signIn(e: React.SubmitEvent<HTMLFormElement>) {
        e.preventDefault();
        try {
            const userData = {
                userName: username,
                email: email,
                password: password,
                id: Date.now().toString(),
            }
            await signin(userData);
            console.log('perfil creado exitosamente!');
            localStorage.setItem('user', JSON.stringify(userData));
            navigate('/user', {replace: true});
        } catch (error) {
            console.error('error al registrar:', error);
            alert(`error al registrar: ${error}`);
        };
        
    };
    return (
        <section id="SignIn">
            <h3><i>¡Unete a Boutique eclat!</i></h3>
            <form className="register" onSubmit={signIn}>
                <input type="text" name="name" id="username" value={username} onChange={(e)=>setUserName(e.target.value)} placeholder="Nombre de usuario" required />
                <input type="email" name="email" id="email" value={email} onChange={(e)=>setUserEmail(e.target.value)} placeholder="Email" required />
                <input type="password" name="password" id="password" value={password} onChange={(e)=>setUserPassword(e.target.value)} placeholder="Contraseña" required />
                <div>
                    <input type="checkbox" id="checkbox" required />
                    <label htmlFor="checkbox">Acepto la <a href="#">politica de privacidad</a></label>
                </div>
                <button type="submit">Crear cuenta</button>
            </form>
            <small>¡Respetamos tu privacidad!</small>
            <small>ya tienes cuenta? <Link to='/auth_form' replace>inicia sesion!</Link></small>
        </section>
    )
}

export default SignIn