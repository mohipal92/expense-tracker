import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";
import Dashboard from "./pages/Dashboard";
import AuthPage from "./pages/AuthPage";

function App() {
  const { user } = useContext(AuthContext);

  return user ? <Dashboard /> : <AuthPage />;
}

export default App;
