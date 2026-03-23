import'bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import { Container } from 'react-bootstrap'
import Izbornik from './components/Izbornik'
import { Route, Routes } from 'react-router-dom'
import { RouteNames } from './constants'
import Home from './pages/home'
import SmjerPregled from './pages/smjerovi/SmjerPregled'
import SmjerNovi from './pages/smjerovi/SmjerNovi'



function App() {

  return ( 
    <Container>
      <Izbornik></Izbornik>
    <Routes>
      <Route path={RouteNames.HOME} element={<Home />} />
      <Route path={RouteNames.SMJEROVI} element={<SmjerPregled />} />
      <Route path={RouteNames.SMJEROVI_NOVI} element={<SmjerNovi />}/>
    </Routes>
    <hr />
    &copy; Edunova
    </Container>
  )
}

export default App
