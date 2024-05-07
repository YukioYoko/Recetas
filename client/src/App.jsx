import {BrowserRouter, Routes, Route} from 'react-router-dom'
import { RecipePage } from './pages/RecipePage'
import { CreateRecipePage } from './pages/CreateRecipePage'
import { Toaster } from "react-hot-toast"
import { HomePage } from './pages/HomePage'
import { Colecciones } from './pages/Colecciones'
import { NavigationLogged } from './components/NavigationLogged'
import { ColeccionesInternas } from './pages/ColeccionesInternas'
import { RegisterPage } from './pages/RegisterPage'
import { LoginPage } from './pages/LoginPage'

function App(){
  return (
    <BrowserRouter>
    <div className=' bg-custom-naranja-logo min-h-screen min-w-screen'>
      <NavigationLogged/>
      <Routes>
      <Route path="/" element={<HomePage/>} />
        <Route path="/recipe" element={<RecipePage/>} />
        <Route path="/recipe-create" element={<CreateRecipePage/>} />
        <Route path="/recipe/:id" element={<CreateRecipePage/>} />
        <Route path="/colecciones" element={<Colecciones/>} />
        <Route path="/coleccionesinternas" element={<ColeccionesInternas/>} />
        <Route path="/register" element={<RegisterPage/>} />
        <Route path="/login" element={<LoginPage/>} />
      </Routes>
      <Toaster/>

    </div>
    </BrowserRouter>
  )
}

export default App