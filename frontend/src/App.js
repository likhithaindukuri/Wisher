import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Landing from './pages/Landing';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Navbar from './components/Navbar';
import NotFound from './pages/NotFound';
import { useAuthContext } from './hooks/useAuthContext';

function App() {
  const { user } = useAuthContext();

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-slate-50 to-sky-50 text-slate-900">
      <BrowserRouter>
        <Navbar />
        <main className={user ? "px-4 py-6 md:px-8 md:py-10 max-w-6xl mx-auto" : ""}>
          <Routes>
            <Route
              path="/"
              element={user ? <Home /> : <Landing />}
            />
            <Route
              path="/login"
              element={!user ? <Login /> : <Navigate to="/" />}
            />
            <Route
              path="/signup"
              element={!user ? <Signup /> : <Navigate to="/" />}
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
      </BrowserRouter>
    </div>
  );
}

export default App;
