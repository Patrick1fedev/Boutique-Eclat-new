import { useUser } from '../../Context/UserContext.tsx'
import { Navigate, useLocation } from 'react-router-dom'

type PrivateProps = {
  children: React.ReactNode;
}

const Private = ({ children }: PrivateProps) => {
  const { user, isLoading } = useUser();
  const location = useLocation();

  if (isLoading) {
    return <div>cargando...</div>
  }

  if (!user) {
    return <Navigate to='/auth_form' state={{ from: location.pathname }} replace />;
  }

  return children;
}

export default Private