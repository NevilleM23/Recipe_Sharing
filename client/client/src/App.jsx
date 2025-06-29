import React  from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import HomePage from './pages/HomePage';
import RecipePage from './pages/RecipePage';
import MapPage from './pages/MapPage';
import UserProfile from './pages/UserProfile'
import LoginPage from './pages/LoginPage';
import RegistrationPage from './pages/RegistrationPage';
import EditRecipePage from './pages/EditRecipe';
import Header from './components/Header';
import Footer from './components/Footer';
import CreateRecipe from './pages/CreateRecipes';
import RecipeListPage from './pages/RecipeListPage'
import './App.css'

const ProtectedRoute = ({ children }) => {
  const { currentUser } = useAuth();
  return currentUser ? children : <Navigate to="/login" />;
};

function App() {

  return (
    <AuthProvider>
      <Router>
        <div className="app">
          <Header />
          <main>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/recipe/:id" element={<RecipePage />} />
              <Route path="/recipes" element={<RecipeListPage />} />
              <Route path="/map" element={<MapPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegistrationPage />} />
        
              {/* Protected routes */}
              <Route path="/profile" element={
                <ProtectedRoute>
                  <UserProfile  />
                </ProtectedRoute>
              } />
              <Route path="/edit-recipe/:id" element=
              {<ProtectedRoute>
                <EditRecipePage />
              </ProtectedRoute>
              } />
              <Route path="/create-recipe" element=
              {<ProtectedRoute>
                <CreateRecipe />
              </ProtectedRoute>
              } />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  )
}

export default App
