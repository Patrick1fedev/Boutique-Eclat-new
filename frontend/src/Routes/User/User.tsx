import '../../styles/User.css'
import { useUser } from '../../Context/UserContext.tsx';
import { Navigate, useNavigate } from 'react-router-dom';
import ProfileImageManager from '../../components/ProfileImg/ProfileImg.tsx';

type UserProps = {
  bgImge: string;
}

const User = ({bgImge}: UserProps) => {
  const { user, isLoading, logout, deleteAccount } = useUser();
  const navigate = useNavigate();

  if (isLoading) {
    return <p>cargando datos de usuario...</p>
  };

  if (!user) {
    return <Navigate to='/auth_form' />
  };

  const userStyles = {
    background: `url(${bgImge}), linear-gradient(to top, var(--color-fondo) 60%, var(--color-terciario) 75%) `,
  };

  console.log(user);

  return (
    <section className='user' style={userStyles}>
      <div className='user-info'>
        <ProfileImageManager />
        <h4>Informacion de usuario:</h4>
        <ul>
          <li>Nombre: {user.userName}</li>
          <li>Email: {user.email}</li>
          <li>ID: {user.id}</li>
        </ul>
      </div>
      <hr />
      <div className="userBtns">
        <button className='userBtn' onClick={() => navigate('/cart')}>ver carrito</button>
        <button className='userBtn' onClick={() => navigate('/favs')}>ver favoritos</button>
        <button className='userBtn' onClick={logout}>cerrar sesion</button>
        <button className='userBtn' onClick={deleteAccount}>eliminar cuenta</button>
      </div>
    </section>
  )
}

export default User