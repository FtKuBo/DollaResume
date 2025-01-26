import { Provider } from "@gadgetinc/react";
import { Suspense } from "react";
import { RouterProvider, createBrowserRouter } from "react-router";
import { ErrorBoundary } from "react-error-boundary";
import { api } from "../api";
import { routes } from "../config/routes";
import "./App.css";

const ErrorFallback = ({ error, resetErrorBoundary }) => (
  <div className="error-container">
    <h2>Application Error</h2>
    <p>{error.message}</p>
    <button onClick={resetErrorBoundary}>Try Again</button>
  </div>
);

// Create router instance
const router = createBrowserRouter(routes);

const App = () => (
  <ErrorBoundary
    FallbackComponent={ErrorFallback}
    onReset={() => window.location.reload()}
  >
    <Provider api={api} signInPath="/sign-in">
      <Suspense fallback={<div className="loading">Loading...</div>}>
        <RouterProvider router={router} />
      </Suspense>
    </Provider>
  </ErrorBoundary>
);

export default App;
