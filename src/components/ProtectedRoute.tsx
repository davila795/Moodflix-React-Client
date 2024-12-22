import {Outlet, Navigate} from "react-router-dom";
import {useSelector} from "react-redux";
import {RootState} from "../app/store.ts";

function ProtectedRoute() {
  const token = useSelector((state: RootState) => state.auth.token);

  if (!token) {
    return <Navigate to={'/login'}/>;
  }

  return <Outlet/>;
}

export default ProtectedRoute