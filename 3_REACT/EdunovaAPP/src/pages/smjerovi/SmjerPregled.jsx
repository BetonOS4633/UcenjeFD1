import { useEffect, useState } from "react"
import SmjerService from "../../services/smjerovi/SmjerService"
import GrupaService from "../../services/grupe/GrupaService"
import { Link, useNavigate } from "react-router-dom"
import { IME_APLIKACIJE, RouteNames } from "../../constants"
import useBreakpoint from "../../hooks/useBreakpoint"
import SmjerPregledGrid from "./SmjerPregledGrid"
import SmjerPregledTablica from "./SmjerPregledTablica"
import useLoading from "../../hooks/useLoading"

export default function SmjerPregled() {

    const navigate = useNavigate()
    const sirina = useBreakpoint();

    const [smjerovi, setSmjerovi] = useState([])
    const { showLoading, hideLoading } = useLoading()

    useEffect(()=>{document.title='Smjerovi, ' + IME_APLIKACIJE})

    useEffect(() => {
        ucitajSmjerove()
    }, [])

    async function ucitajSmjerove() {
        showLoading();
        await SmjerService.get().then((odgovor) => {
            if (!odgovor.success) {
                alert('Nije implementiran servis')
                return
            }
            setSmjerovi(odgovor.data)
            hideLoading()
        })
    }

    async function brisanje(sifra) {
        if (!confirm('Sigurno obrisati?')) return;

        // Provjeri da li je smjer korišten u grupama
        const grupeRezultat = await GrupaService.get();
        if (grupeRezultat.success) {
            const grupeKojeKoristeSmjer = grupeRezultat.data.filter(grupa => grupa.smjer === sifra);

            if (grupeKojeKoristeSmjer.length > 0) {
                alert(`Ne možete obrisati ovaj smjer jer je postavljen na ${grupeKojeKoristeSmjer.length} grupa/e. Prvo obrišite ili promijenite smjer u tim grupama.`);
                return;
            }
        }
        showLoading()
         // samo za potrebe testa prikaza rada loading
        await new Promise(resolve => setTimeout(resolve, 2000));
    

        await SmjerService.obrisi(sifra);
        await SmjerService.get().then((odgovor) => {
            setSmjerovi(odgovor.data)
        })
        hideLoading()
    }

    return (
        <>
            <Link to={RouteNames.SMJEROVI_NOVI}
                className="btn btn-success w-100 my-3">
                Dodavanje novog smjera
            </Link>
            {/* tableti prema manje */}
            {['xs', 'sm', 'md'].includes(sirina) ? (
                <SmjerPregledGrid 
                    smjerovi={smjerovi} 
                    navigate={navigate} 
                    brisanje={brisanje} 
                />
            ) : (
                <SmjerPregledTablica
                    smjerovi={smjerovi} 
                    navigate={navigate} 
                    brisanje={brisanje} 
                />
            )}



        </>
    )
}