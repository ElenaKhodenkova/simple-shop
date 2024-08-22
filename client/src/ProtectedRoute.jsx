import { Navigate } from "react-router-dom";


export default function ProtectedRoute({ children, authUser, redirectTo }) {
  if (authUser) {
    return <Navigate to={redirectTo} replace/>
  } else {
    return children
  }
}
