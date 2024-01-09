import { RouterProvider } from 'react-router-dom'
import './style/_App.scss'
import { router } from './router'

function App() {
  return (
    <>
      <RouterProvider router={router}></RouterProvider>
    </>
  )
}

export default App
