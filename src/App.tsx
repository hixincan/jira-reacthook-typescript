import React from "react";
import "./App.css";
import { useAuthHook } from "./context/auth-context";
import { AuthenticatedApp } from "./authenticated-app";
import { UnappenticatedApp } from "./unauthenticated-app";

function App() {
  const { user } = useAuthHook();
  return (
    <div className="App">
      {user ? <AuthenticatedApp /> : <UnappenticatedApp />}
    </div>
  );
}

export default App;
