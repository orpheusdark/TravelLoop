import { lazy, Suspense } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import Navigation from './components/Navigation';
import LoadingFallback from './components/LoadingFallback';
import { useAuthStore } from './hooks/useAuthStore';
import AuthLayout from './layouts/AuthLayout';

const DashboardPage = lazy(() => import('./pages/DashboardPage'));
const LoginPage = lazy(() => import('./pages/LoginPage'));
const SignupPage = lazy(() => import('./pages/SignupPage'));
const ForgotPasswordPage = lazy(() => import('./pages/ForgotPasswordPage'));
const TripsPage = lazy(() => import('./pages/TripsPage'));
const CreateTripPage = lazy(() => import('./pages/CreateTripPage'));
const BuilderPage = lazy(() => import('./pages/BuilderPage'));
const DiscoverPage = lazy(() => import('./pages/DiscoverPage'));
const ActivityPage = lazy(() => import('./pages/ActivityPage'));
const AnalyticsPage = lazy(() => import('./pages/AnalyticsPage'));
const PackingPage = lazy(() => import('./pages/PackingPage'));
const NotesPage = lazy(() => import('./pages/NotesPage'));
const PublicTripPage = lazy(() => import('./pages/PublicTripPage'));
const ProfilePage = lazy(() => import('./pages/ProfilePage'));

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const token = useAuthStore((state) => state.token);
  return token ? children : <Navigate to="/login" replace />;
};

const App = () => {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <Suspense fallback={<LoadingFallback />}>
        <Routes>
          <Route path="/login" element={<AuthLayout><LoginPage /></AuthLayout>} />
          <Route path="/signup" element={<AuthLayout><SignupPage /></AuthLayout>} />
          <Route path="/forgot-password" element={<AuthLayout><ForgotPasswordPage /></AuthLayout>} />

          <Route
            path="/"
            element={
              <ProtectedRoute>
                <div className="grid min-h-screen gap-6 px-4 py-6 lg:grid-cols-[280px_1fr] lg:px-10">
                  <Navigation />
                  <main className="space-y-6">
                    <DashboardPage />
                  </main>
                </div>
              </ProtectedRoute>
            }
          />

          <Route
            path="/trips"
            element={
              <ProtectedRoute>
                <div className="grid min-h-screen gap-6 px-4 py-6 lg:grid-cols-[280px_1fr] lg:px-10">
                  <Navigation />
                  <main className="space-y-6">
                    <TripsPage />
                  </main>
                </div>
              </ProtectedRoute>
            }
          />
          <Route
            path="/create-trip"
            element={
              <ProtectedRoute>
                <div className="grid min-h-screen gap-6 px-4 py-6 lg:grid-cols-[280px_1fr] lg:px-10">
                  <Navigation />
                  <main className="space-y-6">
                    <CreateTripPage />
                  </main>
                </div>
              </ProtectedRoute>
            }
          />
          <Route
            path="/builder"
            element={
              <ProtectedRoute>
                <div className="grid min-h-screen gap-6 px-4 py-6 lg:grid-cols-[280px_1fr] lg:px-10">
                  <Navigation />
                  <main className="space-y-6">
                    <BuilderPage />
                  </main>
                </div>
              </ProtectedRoute>
            }
          />
          <Route
            path="/discover"
            element={
              <ProtectedRoute>
                <div className="grid min-h-screen gap-6 px-4 py-6 lg:grid-cols-[280px_1fr] lg:px-10">
                  <Navigation />
                  <main className="space-y-6">
                    <DiscoverPage />
                  </main>
                </div>
              </ProtectedRoute>
            }
          />
          <Route
            path="/activities"
            element={
              <ProtectedRoute>
                <div className="grid min-h-screen gap-6 px-4 py-6 lg:grid-cols-[280px_1fr] lg:px-10">
                  <Navigation />
                  <main className="space-y-6">
                    <ActivityPage />
                  </main>
                </div>
              </ProtectedRoute>
            }
          />
          <Route
            path="/analytics"
            element={
              <ProtectedRoute>
                <div className="grid min-h-screen gap-6 px-4 py-6 lg:grid-cols-[280px_1fr] lg:px-10">
                  <Navigation />
                  <main className="space-y-6">
                    <AnalyticsPage />
                  </main>
                </div>
              </ProtectedRoute>
            }
          />
          <Route
            path="/packing"
            element={
              <ProtectedRoute>
                <div className="grid min-h-screen gap-6 px-4 py-6 lg:grid-cols-[280px_1fr] lg:px-10">
                  <Navigation />
                  <main className="space-y-6">
                    <PackingPage />
                  </main>
                </div>
              </ProtectedRoute>
            }
          />
          <Route
            path="/notes"
            element={
              <ProtectedRoute>
                <div className="grid min-h-screen gap-6 px-4 py-6 lg:grid-cols-[280px_1fr] lg:px-10">
                  <Navigation />
                  <main className="space-y-6">
                    <NotesPage />
                  </main>
                </div>
              </ProtectedRoute>
            }
          />
          <Route path="/trip/:shareId" element={<PublicTripPage />} />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <div className="grid min-h-screen gap-6 px-4 py-6 lg:grid-cols-[280px_1fr] lg:px-10">
                  <Navigation />
                  <main className="space-y-6">
                    <ProfilePage />
                  </main>
                </div>
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Suspense>
    </div>
  );
};

export default App;
