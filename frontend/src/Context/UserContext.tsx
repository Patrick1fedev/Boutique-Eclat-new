import { createContext, useContext, useEffect, useState } from 'react'

interface User {
  id: string;
  email: string;
  userName: string;
  password: string;
  profilePic?: string;
}

interface UserProviderProps {
  children: React.ReactNode;
}

interface UserContextType {
  user: User | null;
  isLoading: boolean;
  signin: (userData: Omit<User, 'id'>) => User;
  login: (email: string, password: string) => User;
  logout: () => void;
  deleteAccount: () => void;
  updateProfilePic: (base64Image: string) => void;
  removeProfilePic: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

export function UserProvider({ children }: UserProviderProps) {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    const signin = (userData: Omit<User, 'id'>): User => {
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      if (users.some((u: User) => u.email === userData.email)) {
        throw new Error('el usuario ya existe, por favor intente de nuevo');
      }

      const newUser: User = { ...userData, id: Date.now().toString() };
      const updateUsers = [...users, newUser];
      localStorage.setItem('users', JSON.stringify(updateUsers));

      setUser(newUser);
      return newUser;
    };

    const login = (email: string, password: string): User => {
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      const foundUser = users.find((u: User) => u.email === email && u.password === password);
      if (!foundUser) throw new Error('credenciales incorrectas, intentelo de nuevo');
      setUser(foundUser);
      return foundUser;
    };

    const logout = (): void => {
      setUser(null);
    };

    const deleteAccount = (): void => {
      if (!user) return;
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      const updatedUsers = users.filter((u: User) => u.email !== user.email);
      localStorage.setItem('users', JSON.stringify(updatedUsers));
      setUser(null);
    };

    // ✅ Añadido: actualizar imagen de perfil
    const updateProfilePic = (base64Image: string): void => {
      if (!user) return;

      const updatedUser: User = { ...user, profilePic: base64Image };
      setUser(updatedUser);

      const users = JSON.parse(localStorage.getItem('users') || '[]');
      const updatedUsers = users.map((u: User) =>
        u.email === user.email ? updatedUser : u
      );
      localStorage.setItem('users', JSON.stringify(updatedUsers));
      localStorage.setItem('currentUser', JSON.stringify(updatedUser));
    };

    // ✅ Añadido: eliminar imagen de perfil
    const removeProfilePic = (): void => {
      if (!user || !user.profilePic) return;

      const updatedUser: User = { ...user };
      delete updatedUser.profilePic;
      setUser(updatedUser);

      const users = JSON.parse(localStorage.getItem('users') || '[]');
      const updatedUsers = users.map((u: User) =>
        u.email === user.email ? updatedUser : u
      );
      localStorage.setItem('users', JSON.stringify(updatedUsers));
      localStorage.setItem('currentUser', JSON.stringify(updatedUser));
    };

    useEffect(() => {
      if (user) {
        localStorage.setItem('currentUser', JSON.stringify(user))
      }
    }, [user]);

    useEffect(()=>{
      const loadUser = () => {
        try {
          const savedUser = localStorage.getItem('currentUser');
          if (savedUser) {
            setUser(JSON.parse(savedUser));
          }
        } catch (error) {
          console.error('error cargando usuario: ', error);
        } finally{
          setIsLoading(false);
        }
      };
      loadUser();
    }, []);

  return (
    <UserContext.Provider
      value={{
        user,
        login,
        logout,
        signin,
        deleteAccount,
        isLoading,
        updateProfilePic,
        removeProfilePic
      }}
    >
        {children}
    </UserContext.Provider>
  )
}
