import { ReactNode, Suspense, lazy } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { Loader } from "..";

const ErrorPage = lazy(() => import("../pages/ErrorPage"));

const withWrapper = (wrappedComponent: ReactNode): JSX.Element => (
  <ErrorBoundary FallbackComponent={ErrorPage}>
    <Suspense fallback={<Loader />}>{wrappedComponent}</Suspense>
  </ErrorBoundary>
);
export default withWrapper;
