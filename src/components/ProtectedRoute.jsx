import { Navigate, useLocation } from 'react-router';
import { useUser } from '../context/UserContext';

export default function ProtectedRoute({ children }) {
  const { user } = useUser();
  const location = useLocation();

  if (!user) {
    // 로그인 후 원래 가려던 페이지로 리다이렉션하기 위해 state로 전달
    return <Navigate to='/signin' state={{ from: location }} replace />;
  }

  return children;
}
