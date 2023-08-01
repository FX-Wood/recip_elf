import { React } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.css";
import Auth from "./Auth";
import HomePage from "./HomePage";
import IngredientPage from "./IngredientPage";
import { UserProfileProvider } from "./components/auth/UserProfileProvider";
import { IngredientsProvider } from "./components/IngredientsProvider";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./components/auth/ProtectedRoute";

function App() {
  return (
    <UserProfileProvider>
      <IngredientsProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Auth />} />
            <Route
              path="/ingredients"
              element={
                <ProtectedRoute>
                  <IngredientPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/generate"
              element={
                <ProtectedRoute>
                  <HomePage />
                </ProtectedRoute>
              }
            />
          </Routes>
        </BrowserRouter>
      </IngredientsProvider>
    </UserProfileProvider>
  );
}

export default App;
