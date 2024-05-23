import { BrowserRouter, Routes, Route } from "react-router-dom";
import { RecipePage } from "./pages/RecipePage";
import { CreateRecipePage } from "./pages/CreateRecipePage";
import { Toaster } from "react-hot-toast";
import { HomePage } from "./pages/HomePage";
import { Colecciones } from "./pages/Colecciones";
import { ColeccionesInternas } from "./pages/ColeccionesInternas";
import { RegisterPage } from "./pages/RegisterPage";
import { LoginPage } from "./pages/LoginPage";
import { ProfilePage } from "./pages/ProfilePage";
import { CategoriesPage } from "./pages/CategoriesPage";
import { Navigation } from "./components/Navigation";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { UserRecipesPage } from "./pages/UserRecipesPage";
import { EditRecipePage } from "./pages/EditRecipePage";

function App() {
  return (
    <BrowserRouter>
      <div className="bg-custom-naranja-logo min-h-screen min-w-screen">
        <Navigation />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/recipe/:id" element={<RecipePage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />  
          <Route path="/categories" element={<CategoriesPage />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/recipe-create" element={<CreateRecipePage />} />
            <Route path="/colecciones" element={<Colecciones />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/profile/:id" element={<ProfilePage />} />
            <Route path="/coleccionesinternas/:collectionId" element={<ColeccionesInternas />} />
            <Route path="/user-recipes" element={<UserRecipesPage />} />
            <Route path="/edit-recipe/:id" element={<EditRecipePage />} />
          </Route>
        </Routes>
        <Toaster />
      </div>
    </BrowserRouter>
  );
}

export default App;

