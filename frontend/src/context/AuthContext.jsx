import { createContext, useContext, useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import api from '../api/axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const { i18n } = useTranslation();

  useEffect(() => {
    const stored = localStorage.getItem('user');
    if (stored) {
      const u = JSON.parse(stored);
      setUser(u);
      i18n.changeLanguage(u.preferredLanguage || 'hi');
    }
  }, []);

  const login = async (email, password) => {
    const { data } = await api.post('/auth/login', { email, password });
    localStorage.setItem('token', data.token);
    localStorage.setItem('user', JSON.stringify(data.user));
    setUser(data.user);
    i18n.changeLanguage(data.user.preferredLanguage || 'hi');
    return data.user;
  };

  const logout = () => {
    localStorage.clear();
    setUser(null);
  };

  const switchLanguage = async (lang) => {
    i18n.changeLanguage(lang);
    await api.put('/auth/language', { language: lang });
    const updated = { ...user, preferredLanguage: lang };
    localStorage.setItem('user', JSON.stringify(updated));
    setUser(updated);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, switchLanguage }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);