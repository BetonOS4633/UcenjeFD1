import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import { Container } from 'react-bootstrap'
import Izbornik from './components/Izbornik'
import { Route, Routes } from 'react-router-dom'
import { IME_APLIKACIJE, RouteNames } from './constants'
import Home from './pages/Home'
import SmjerPregled from './pages/smjerovi/SmjerPregled'
import SmjerNovi from './pages/smjerovi/SmjerNovi'
import SmjerPromjena from './pages/smjerovi/SmjerPromjena'

import PolaznikPregled from './pages/polaznici/PolaznikPregled'
import PolaznikNovi from './pages/polaznici/PolaznikNovi'
import PolaznikPromjena from './pages/polaznici/PolaznikPromjena'

import GrupaPregled from './pages/grupe/GrupaPregled'
import GrupaNovi from './pages/grupe/GrupaNovi'
import GrupaPromjena from './pages/grupe/GrupaPromjena'
import GeneriranjePodataka from './pages/GeneriranjePodataka'

import OperaterPregled from './pages/operateri/OperaterPregled'
import OperaterNovi from './pages/operateri/OperaterNovi'
import OperaterPromjena from './pages/operateri/OperaterPromjena'
import OperaterPromjenaLozinke from './pages/operateri/OperaterPromjenaLozinke'

import AplikacijePolaznika from './pages/AplikacijePolaznika'
import Test from './pages/GeneriranjeDOCXPrimjer'
import LoadingSpinner from './components/LoadingSpinner'
import Login from './pages/login/Login'
import Registracija from './pages/registracija/Registracija'
import NadzornaPloca from './pages/NadzornaPloca'
import useAuth from './hooks/useAuth'

function App() {

  const { isLoggedIn, authUser } = useAuth()

  return (
    <>
      <LoadingSpinner />
      <Container style={{ backgroundColor: window.location.hostname === 'localhost' ? '#ffefea' : 'none' }}>
        <Izbornik />
        <Container className='app'>
          <Routes>
            <Route path={RouteNames.HOME} element={<Home />} />

            {isLoggedIn ? (
              <>
                <Route path={RouteNames.NADZORNA_PLOCA} element={<NadzornaPloca />} />

                <Route path={RouteNames.SMJEROVI} element={<SmjerPregled />} />
                <Route path={RouteNames.SMJEROVI_NOVI} element={<SmjerNovi />} />
                <Route path={RouteNames.SMJEROVI_PROMJENA} element={<SmjerPromjena />} />
                <Route path={RouteNames.POLAZNICI} element={<PolaznikPregled />} />
                <Route path={RouteNames.POLAZNICI_NOVI} element={<PolaznikNovi />} />
                <Route path={RouteNames.POLAZNICI_PROMJENA} element={<PolaznikPromjena />} />
                <Route path={RouteNames.GRUPE} element={<GrupaPregled />} />
                <Route path={RouteNames.GRUPE_NOVI} element={<GrupaNovi />} />
                <Route path={RouteNames.GRUPE_PROMJENA} element={<GrupaPromjena />} />
                
                {authUser.uloga === 'admin' && (
                  <>
                    <Route path={RouteNames.OPERATERI} element={<OperaterPregled />} />
                    <Route path={RouteNames.OPERATERI_NOVI} element={<OperaterNovi />} />
                    <Route path={RouteNames.OPERATERI_PROMJENA} element={<OperaterPromjena />} />
                    <Route path={RouteNames.OPERATERI_PROMJENA_LOZINKE} element={<OperaterPromjenaLozinke />} />
                    <Route path={RouteNames.GENERIRANJE_PODATAKA} element={<GeneriranjePodataka />} />
                  </>
                )}

                <Route path={RouteNames.APLIKACIJE_POLAZNIKA} element={<AplikacijePolaznika />} />
                <Route path={RouteNames.TEST} element={<Test />} />
              </>
            ) : (
              <>
                <Route path={RouteNames.LOGIN} element={<Login />} />
                <Route path={RouteNames.REGISTRACIJA} element={<Registracija />} />
              </>
            )}


          </Routes>
        </Container>
        <hr />
        &copy; {IME_APLIKACIJE}
      </Container></>
  )
}

export default App
