import {BrowserRouter, Routes, Route} from 'react-router-dom'
import { RecipePage } from './pages/RecipePage'
import { RecipeFormPage } from './pages/RecipeFormPage'
import { Navigation } from './components/Navigation'
import { RegisterPage } from './pages/RegisterPage';
import { Toaster } from "react-hot-toast"
import { HomePage } from './pages/HomePage'

function App(){
  return (
    <BrowserRouter>
    <div className=' bg-custom-naranja-logo min-h-screen min-w-screen'>
      <Navigation/>

      <Routes>
      <Route path="/" element={<HomePage/>} />
        <Route path="/recipes" element={<RecipePage/>} />
        <Route path="/recipes-create" element={<RecipeFormPage/>} />
        <Route path="/recipes/:id" element={<RecipeFormPage/>} />
        <Route path="/register" element={<RegisterPage/>} />
      </Routes>
      <Toaster/>

      
    </div>
    </BrowserRouter>
  )
}

export default App