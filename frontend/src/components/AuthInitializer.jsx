import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { refreshUserToken } from "../features/auth/authSlice";

const AuthInitializer = () => {
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.auth);
  const hasTriedRefresh = useRef(false);

  useEffect(() => {
    // Try to refresh token only once on app load if not authenticated
    // This will use the refresh token cookie if available
    if (!isAuthenticated && !hasTriedRefresh.current) {
      hasTriedRefresh.current = true;
      dispatch(refreshUserToken()).catch(() => {
        // Silently fail if refresh token doesn't exist
        // User will need to login
      });
    }
  }, [dispatch, isAuthenticated]);

  return null;
};

export default AuthInitializer;

