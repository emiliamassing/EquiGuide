import { RouterProvider } from 'react-router-dom'
import { router } from './router'
import { useReducer } from 'react'
import { UserReducer } from './reducer/UserReducer'
import { UserContext } from './contexts/UserContext';
import { CookiesProvider } from 'react-cookie';

function App() {
  const [userData, dispatch] = useReducer(UserReducer, []);

  return (
    <>
      <CookiesProvider>
        <UserContext.Provider value={{ userData, dispatch }}>
            <RouterProvider router={router}></RouterProvider>
        </UserContext.Provider>
      </CookiesProvider>
    </>
  )
}

export default App
