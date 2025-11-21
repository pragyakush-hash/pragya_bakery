import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { refreshUserToken } from "../features/auth/authSlice";

const AuthInitializer = () => {
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.auth);
  const hasTriedRefresh = useRef(false);

  useEffect(() => {
    
    if (!isAuthenticated && !hasTriedRefresh.current) {
      hasTriedRefresh.current = true;
      dispatch(refreshUserToken()).catch(() => {
    
      });
    }
  }, [dispatch, isAuthenticated]);

  return null;
};

export default AuthInitializer;

