import { RouterProvider } from 'react-router-dom'
import { router } from './router'
import { useReducer } from 'react'
import { UserReducer } from './reducer/userReducer'
import { UserContext } from './contexts/userContext';
import { UserDispatchContext } from './contexts/UserDispatchContext';

function App() {
  const [userdata, dispatch] = useReducer(UserReducer, []);

  return (
    <>
      <UserContext.Provider value={userdata}>
        <UserDispatchContext.Provider value={dispatch}>
          <RouterProvider router={router}></RouterProvider>
        </UserDispatchContext.Provider>
      </UserContext.Provider>
    </>
  )
}

export default App
