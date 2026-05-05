import { useEffect, useState } from "react"
import GrupaService from "../../services/grupe/GrupaService"
import SmjerService from "../../services/smjerovi/SmjerService"
import PolaznikService from "../../services/polaznici/PolaznikService"
import { Link, useNavigate } from "react-router-dom"
import { IME_APLIKACIJE, RouteNames } from "../../constants"
import GrupaPDFGenerator from "../../components/GrupaPDFGenerator"
import { FaEdit, FaFilePdf, FaTrash } from "react-icons/fa"

export default function GrupaPregled() {

    const navigate = useNavigate()

    const [grupe, setGrupe] = useState([])
    const [smjerovi, setSmjerovi] = useState([])
    const [sviPolaznici, setSviPolaznici] = useState([])

    useEffect(()=>{document.title='Grupe, ' + IME_APLIKACIJE})

    const [tooltip, setTooltip] = useState({
        vidljivo: false,
        x: 0,
        y: 0,
        podaci: []
    })

    useEffect(() => {
        ucitajSmjerove()
        ucitajPolaznike()
        ucitajGrupe()
    }, [])

    async function ucitajGrupe() {
        await GrupaService.get().then((odgovor) => {
            if (!odgovor.success) {
                alert('Nije implementiran servis')
                return
            }
            setGrupe(odgovor.data)
        })
    }

    async function ucitajSmjerove() {
        await SmjerService.get().then((odgovor) => {
            if (!odgovor.success) {
                alert('Nije implementiran servis za smjerove')
                return
            }
            setSmjerovi(odgovor.data)
        })
    }

    async function ucitajPolaznike() {
        await PolaznikService.get().then((odgovor) => {
            if (!odgovor.success) {
                alert('Nije implementiran servis')
                return
            }
            setSviPolaznici(odgovor.data)
        })
    }

    // --- LOGIKA ZA TOOLTIP ---
    const handleMouseEnter = (sifrePolaznikaUGrupi) => {
        if (!sifrePolaznikaUGrupi || sifrePolaznikaUGrupi.length === 0) return;

        // Filtriraj objekte polaznika na temelju šifri iz grupe
        const filtrirani = sviPolaznici.filter(p => sifrePolaznikaUGrupi.includes(p.sifra));
        
        setTooltip(prev => ({ ...prev, vidljivo: true, podaci: filtrirani }));
    };

    const handleMouseMove = (e) => {
        // Pomicanje tooltipa 15px desno i dolje od miša da ne smeta kursoru
        //console.log(e.pageY)
        if(e.pageY>250){
            setTooltip(prev => ({ ...prev, x: e.pageX + 15, y: e.pageY - 200 }));
        }else{
            setTooltip(prev => ({ ...prev, x: e.pageX + 15, y: e.pageY + 15 }));
        }
        
    };

    const handleMouseLeave = () => {
        setTooltip(prev => ({ ...prev, vidljivo: false, podaci: [] }));
    };
    // -------------------------


    async function brisanje(sifra) {
        if (!confirm('Sigurno obrisati?')) return;
        await GrupaService.obrisi(sifra);
        await GrupaService.get().then((odgovor) => {
            setGrupe(odgovor.data)
        })
    }

    function dohvatiNazivSmjera(sifraSmjera) {
        const smjer = smjerovi.find(s => s.sifra === sifraSmjera)
        return smjer ? smjer.naziv : 'Nepoznat smjer'
    }

    async function generirajPDFZaGrupu(grupa) {
        // Dohvati smjer
        const smjer = smjerovi.find(s => s.sifra === grupa.smjer)
        if (!smjer) {
            alert('Smjer nije pronađen')
            return
        }

        // Dohvati sve polaznike
        const odgovorPolaznici = await PolaznikService.get()
        if (!odgovorPolaznici.success) {
            alert('Nije moguće dohvatiti polaznike')
            return
        }

        // Filtriraj polaznike koji pripadaju ovoj grupi
        const polazniciGrupe = odgovorPolaznici.data.filter(p =>
            grupa.polaznici && grupa.polaznici.includes(p.sifra)
        )

        // Generiraj PDF
        const generiraj = GrupaPDFGenerator({
            grupa,
            smjer,
            polaznici: polazniciGrupe
        })
        await generiraj()
    }

    return (
        <>
            <Link to={RouteNames.GRUPE_NOVI}
                className="btn btn-success w-100 my-3">
                Dodavanje nove grupe
            </Link>
            Dostupne grupe
            <ul style={{listStyleType: 'none'}}>
                {grupe && grupe.map((grupa) => (
                    <li key={grupa.sifra}>
                        <FaEdit 
                        style={{ cursor: 'hand' }}
                        color="blue"
                        onClick={() => { navigate(`/grupe/${grupa.sifra}`) }} title="Promjeni" />
                        &nbsp;&nbsp;
                        <FaFilePdf 
                        color="#cb72dd"
                        style={{ cursor: 'hand' }}
                        onClick={() => generirajPDFZaGrupu(grupa)} title="Generiraj PDF" />
                        &nbsp;&nbsp;
                        <span className="lead">
                            {grupa.naziv}
                        </span>&nbsp;({dohvatiNazivSmjera(grupa.smjer)})&nbsp;
                        <span
                            className="text-center"
                            style={{ cursor: 'help', fontWeight: 'bold' }}
                            onMouseEnter={() => handleMouseEnter(grupa.polaznici)}
                            onMouseMove={handleMouseMove}
                            onMouseLeave={handleMouseLeave}>
                            {grupa.polaznici ? grupa.polaznici.length : 0}
                        </span>
                        &nbsp;&nbsp;
                        {/* I ne mora biti uvijek button, može biti i samo ikona  */}
                        <FaTrash
                            onClick={() => brisanje(grupa.sifra)}
                            title="Obriši"
                            style={{ cursor: 'hand' }}
                            color="red" />
                    </li>
                ))}
            </ul>
            {/* Prikaz popisa polaznika (Tooltip) */}
            {tooltip.vidljivo && (
                <div style={{
                    position: 'absolute',
                    top: tooltip.y,
                    left: tooltip.x,
                    backgroundColor: 'white',
                    border: '1px solid #ccc',
                    padding: '10px',
                    borderRadius: '5px',
                    boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
                    zIndex: 1000,
                    minWidth: '200px',
                    pointerEvents: 'none' // Da tooltip ne "treperi" kad miš uđe u njega
                }}>
                    <h6>Polaznici u grupi:</h6>
                    <ol style={{ margin: 0, paddingLeft: '20px' }}>
                        {tooltip.podaci.map(p => (
                            <li key={p.sifra}>{p.ime} {p.prezime}</li>
                        ))}
                    </ol>
                </div>
            )}
        </>
    )
}
