import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom'
import { RecipePage } from './pages/RecipePage'
import { RecipeFormPage } from './pages/RecipeFormPage'
import { Navigation } from './components/Navigation'
import { Toaster } from "react-hot-toast"

function App(){
  return (
    <BrowserRouter>
    <div className='container mx-auto'>
      <Navigation/>

      <Routes>
      <Route path="/" element={<Navigate to="recipes"/>} />
        <Route path="/recipes" element={<RecipePage/>} />
        <Route path="/recipes-create" element={<RecipeFormPage/>} />
        <Route path="/recipes/:id" element={<RecipeFormPage/>} />
      </Routes>
      <Toaster/>
    </div>
    </BrowserRouter>
  )
}

export default App