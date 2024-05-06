import {BrowserRouter, Routes, Route} from 'react-router-dom'
import { RecipePage } from './pages/RecipePage'
import { RecipeFormPage } from './pages/RecipeFormPage'
import { Navigation } from './components/Navigation'
import { Toaster } from "react-hot-toast"
import { HomePage } from './pages/HomePage'
import { NavigationLogged } from './components/NavigationLogged'

function App(){
  return (
    <BrowserRouter>
    <div className=' bg-custom-naranja-logo min-h-screen min-w-screen'>
      
      <NavigationLogged/>

      <Routes>
      <Route path="/" element={<HomePage/>} />
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