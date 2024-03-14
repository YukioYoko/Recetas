import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom'
import { RecipePage } from './pages/RecipePage'
import { RecipeFormPage } from './pages/RecipeFormPage'
import {Navigation} from "./components/Navigation"

function App(){
  return (
    <BrowserRouter>
      <Navigation/>

      <Routes>
      <Route path="/" element={<Navigate to="recipes"/>} />
        <Route path="/recipes" element={<RecipePage/>} />
        <Route path="/recipes-create" element={<RecipeFormPage/>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App