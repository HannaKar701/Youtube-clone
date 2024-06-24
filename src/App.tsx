import { FC, lazy } from 'react';
import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
    RouterProvider,
} from 'react-router-dom';

import { Login } from './components';
import withWrapper from './components/hoc/withWrapper';

const HomePage = lazy(() => import('./components/pages/HomePage'));

const SavedRequestsPage = lazy(() => import('./components/pages/SavedRequestsPage'));

const Registration = lazy(() => import('./components/Authorization/Registration'));

const ErrorPage = lazy(() => import('./components/pages/ErrorPage'));

const PrivateRoute = lazy(() => import('./components/PrivateRoute'));

const AlertError = lazy(() => import('./components/AlertError'));

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route>
            <Route path="/Youtube-clone" element={<Login />} />
            <Route path="/register" element={withWrapper(<Registration />)} />
            <Route
                path="/Youtube-clone/home"
                element={withWrapper(
                    <PrivateRoute>
                        <HomePage />
                    </PrivateRoute>,
                )}
            />
            <Route
                path="/Youtube-clone/home/saved"
                element={withWrapper(
                    <PrivateRoute>
                        <SavedRequestsPage />
                    </PrivateRoute>,
                )}
            />
            <Route path="*" element={withWrapper(<ErrorPage />)} />
            <Route path="error" element={withWrapper(<AlertError />)} />
        </Route>,
    ),
);

const App: FC = () => <RouterProvider router={router} />;

export default App;
