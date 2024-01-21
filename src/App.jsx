import {createBrowserRouter,RouterProvider} from "react-router-dom";
import Main from "./Components/Main";
import SignIn from "./Pages/SignIn";
import Private from "./Components/Private";
import Products from "./Pages/Products";
import About from "./Pages/About";



function App() {
  
  const router  = createBrowserRouter([
    {path:"/",element:<Main></Main>,children:[
      {path:"/",element:<SignIn></SignIn>},
      {element:<Private></Private>,children:[
        {path:"/products",element:<Products></Products>},
        {path:"/about",element:<About></About>}
      ]}
    ]}
  ])
  
  return (
      <RouterProvider router={router}>

      </RouterProvider>
  )
}

export default App
