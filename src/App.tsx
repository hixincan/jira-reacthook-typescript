import React from "react";
import "./App.css";
import { useAuthHook } from "./context/auth-context";
import { AuthenticatedApp } from "./authenticated-app";
import { UnappenticatedApp } from "./unauthenticated-app";
import { ErrorBoundary } from "./components/error- boundary";
import { FullPageErrorFallback } from "./components/lib";

function App() {
  const { user } = useAuthHook();
  return (
    <div className="App">
      <ErrorBoundary fallbackRender={FullPageErrorFallback}>
        {user ? <AuthenticatedApp /> : <UnappenticatedApp />}
      </ErrorBoundary>
    </div>
  );
}

export default App;
