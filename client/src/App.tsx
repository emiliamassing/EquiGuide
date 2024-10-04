import { RouterProvider } from 'react-router-dom'
import { router } from './router'
import { useReducer } from 'react'
import { UserReducer } from './reducer/UserReducer'
import { UserContext } from './contexts/UserContext';
import { RideContext } from './contexts/RideContext';
import { RideReducer } from './reducer/RideReducer';
import { HorseContext } from './contexts/HorseContext';
import { HorseReducer } from './reducer/HorseReducer';

function App() {
  const [userData, dispatch] = useReducer(UserReducer, []);
  const [rideData, rideDispatch] = useReducer(RideReducer, []);
  const [horseData, horseDispatch] = useReducer(HorseReducer, []);

  return (
    <>
      <UserContext.Provider value={{ userData, dispatch }}>
        <RideContext.Provider value={{ rideData, rideDispatch }}>
          <HorseContext.Provider value={{ horseData, horseDispatch }}>
            <RouterProvider router={router}></RouterProvider>  
          </HorseContext.Provider>
        </RideContext.Provider>
      </UserContext.Provider>
    </>
  )
}

export default App
