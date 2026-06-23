import { useAuth } from '../contexts/AuthContext';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, requireAdmin = false, requireBoardMember = false }) => {
  const { isAuthenticated, isAdmin, isBoardMember, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (requireAdmin && !isAdmin()) {
    return <Navigate to="/" replace />;
  }

  if (requireBoardMember && !isBoardMember()) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
