import { RouterProvider } from 'react-router-dom'
import { router } from './router'
import { useReducer } from 'react'
import { UserReducer } from './reducer/UserReducer'
import { UserContext } from './contexts/UserContext';
import { RideContext } from './contexts/RideContext';
import { RideReducer } from './reducer/RIdeReducer';

function App() {
  const [userData, dispatch] = useReducer(UserReducer, []);
  const [rideData, rideDispatch] = useReducer(RideReducer, []);

  return (
    <>
      <UserContext.Provider value={{ userData, dispatch }}>
        <RideContext.Provider value={{ rideData, rideDispatch }}>
          <RouterProvider router={router}></RouterProvider>
        </RideContext.Provider>
      </UserContext.Provider>
    </>
  )
}

export default App
