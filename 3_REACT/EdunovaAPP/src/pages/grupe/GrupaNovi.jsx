import { useEffect, useState } from "react"
import { Form, Button, Row, Col, Container, Card, Table } from "react-bootstrap"
import { RouteNames } from "../../constants"
import { Link, useNavigate } from "react-router-dom"
import GrupaService from "../../services/grupe/GrupaService"
import SmjerService from "../../services/smjerovi/SmjerService"
import PolaznikService from "../../services/polaznici/PolaznikService"
import { ShemaGrupa } from "../../schemas/ShemaGrupa"

export default function GrupaNovi() {

    const navigate = useNavigate()
    const [smjerovi, setSmjerovi] = useState([])
    const [polaznici, setPolaznici] = useState([])
    const [odabraniPolaznici, setOdabraniPolaznici] = useState([])
    const [pretragaPolaznika, setPretragaPolaznika] = useState('')
    const [prikaziAutocomplete, setPrikaziAutocomplete] = useState(false)
    const [odabraniIndex, setOdabraniIndex] = useState(-1)
    const [errors, setErrors] = useState({});

    useEffect(() => {
        ucitajSmjerove()
        ucitajPolaznike()
    }, [])

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
                alert('Nije implementiran servis za polaznike')
                return
            }
            setPolaznici(odgovor.data)
        })
    }

    function dodajPolaznika(polaznik) {
        if (!odabraniPolaznici.find(p => p.sifra === polaznik.sifra)) {
            setOdabraniPolaznici([...odabraniPolaznici, polaznik])
        }
        setPretragaPolaznika('')
        setPrikaziAutocomplete(false)
        setOdabraniIndex(-1)
    }

    function ukloniPolaznika(sifra) {
        setOdabraniPolaznici(odabraniPolaznici.filter(p => p.sifra !== sifra))
    }

    function filtrirajPolaznike() {
        if (!pretragaPolaznika) return []
        return polaznici.filter(p =>
            !odabraniPolaznici.find(op => op.sifra === p.sifra) &&
            (p.ime.toLowerCase().includes(pretragaPolaznika.toLowerCase()) ||
                p.prezime.toLowerCase().includes(pretragaPolaznika.toLowerCase()))
        )
    }

    function handleKeyDown(e) {
        const filtriraniPolaznici = filtrirajPolaznike()

        if (e.key === 'ArrowDown') {
            e.preventDefault()
            setOdabraniIndex(prev => {
                if (prev + 1 === filtriraniPolaznici.length) {
                    return 0
                }
                return prev < filtriraniPolaznici.length - 1 ? prev + 1 : prev
            }

            )
        } else if (e.key === 'ArrowUp') {
            e.preventDefault()
            setOdabraniIndex(prev => {
                if (prev === 0) {
                    return filtriraniPolaznici.length - 1
                }
                return prev > 0 ? prev - 1 : 0
            })
        } else if (e.key === 'Enter' && odabraniIndex >= 0 && filtriraniPolaznici.length > 0) {
            e.preventDefault()
            dodajPolaznika(filtriraniPolaznici[odabraniIndex])
        } else if (e.key === 'Escape') {
            setPrikaziAutocomplete(false)
            setOdabraniIndex(-1)
        }
    }

    async function dodaj(grupa) {
        await GrupaService.dodaj(grupa).then(() => {
            navigate(RouteNames.GRUPE)
        })
    }

    function odradiSubmit(e) {
        e.preventDefault()
        const podaci = new FormData(e.target)

        setErrors({});
        const objektPodataka = Object.fromEntries(podaci);

        // Provjera pomoću Zod sheme
        const rezultat = ShemaGrupa.safeParse(objektPodataka);

        if (!rezultat.success) {
            const noveGreske = {};

            // Prolazimo kroz sve issues (probleme) koje je Zod pronašao
            rezultat.error.issues.forEach((issue) => {
                const kljuc = issue.path[0];
                if (!noveGreske[kljuc]) {
                    noveGreske[kljuc] = issue.message;
                }
            });

            setErrors(noveGreske);
            return;
        }

        const odabraniSmjer = parseInt(podaci.get('smjer'))

        dodaj({
            naziv: podaci.get('naziv'),
            smjer: odabraniSmjer,
            polaznici: odabraniPolaznici.map(p => p.sifra)
        })
    }

    const ocistiGresku = (nazivPolja) => {
        if (errors[nazivPolja]) {
            const noveGreske = { ...errors };
            delete noveGreske[nazivPolja];
            setErrors(noveGreske);
        }
    };

    return (
        <>
            <h3>Unos nove grupe</h3>
            <Form onSubmit={odradiSubmit}>
                <Container className="mt-4">
                    <Row>
                        {/* Lijeva strana - Podaci o grupi */}
                        <Col md={6}>
                            <Card className="shadow-sm">
                                <Card.Body>
                                    <Card.Title className="mb-4">Podaci o grupi</Card.Title>

                                    {/* Naziv */}
                                    <Form.Group controlId="naziv" className="mb-3">
                                        <Form.Label className="fw-bold">Naziv</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="naziv"
                                            placeholder="Unesite naziv grupe"
                                            isInvalid={!!errors.naziv}
                                            onFocus={() => ocistiGresku('naziv')}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            {errors.naziv}
                                        </Form.Control.Feedback>
                                    </Form.Group>


                                    {/* Smjer */}
                                    <Form.Group controlId="smjer" className="mb-3">
                                        <Form.Label className="fw-bold">Smjer</Form.Label>
                                        <Form.Select
                                            name="smjer"
                                            isInvalid={!!errors.smjer}
                                            onFocus={() => ocistiGresku('smjer')}>
                                            <option value="">Odaberite smjer</option>
                                            {smjerovi && smjerovi.map((smjer) => (
                                                <option key={smjer.sifra} value={smjer.sifra}>
                                                    {smjer.naziv}
                                                </option>
                                            ))}
                                        </Form.Select>
                                        <Form.Control.Feedback type="invalid">
                                            {errors.smjer}
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                </Card.Body>
                            </Card>
                        </Col>

                        {/* Desna strana - Polaznici */}
                        <Col md={6}>
                            <Card className="shadow-sm">
                                <Card.Body>
                                    <Card.Title className="mb-4">Polaznici</Card.Title>

                                    {/* Autocomplete pretraga */}
                                    <Form.Group className="mb-3 position-relative">
                                        <Form.Label className="fw-bold">Dodaj polaznika</Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder="Pretraži polaznika..."
                                            value={pretragaPolaznika}
                                            onChange={(e) => {
                                                setPretragaPolaznika(e.target.value)
                                                setPrikaziAutocomplete(e.target.value.length > 0)
                                                setOdabraniIndex(-1)
                                            }}
                                            onFocus={() => setPrikaziAutocomplete(pretragaPolaznika.length > 0)}
                                            onKeyDown={handleKeyDown}
                                        />
                                        {prikaziAutocomplete && filtrirajPolaznike().length > 0 && (
                                            <div className="position-absolute w-100 bg-white border rounded shadow-sm" style={{ zIndex: 1000, maxHeight: '200px', overflowY: 'auto' }}>
                                                {filtrirajPolaznike().map((polaznik, index) => (
                                                    <div
                                                        key={polaznik.sifra}
                                                        className="p-2 cursor-pointer"
                                                        style={{
                                                            cursor: 'pointer',
                                                            backgroundColor: index === odabraniIndex ? '#007bff' : 'white',
                                                            color: index === odabraniIndex ? 'white' : 'black'
                                                        }}
                                                        onClick={() => dodajPolaznika(polaznik)}
                                                        onMouseEnter={(e) => {
                                                            setOdabraniIndex(index)
                                                        }}
                                                    >
                                                        {polaznik.ime} {polaznik.prezime}
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </Form.Group>

                                    {/* Tablica odabranih polaznika */}
                                    {odabraniPolaznici.length > 0 && (
                                        <div style={{ overflow: 'auto', maxHeight: '300px' }}>
                                            <Table striped bordered hover size="sm">
                                                <thead>
                                                    <tr>
                                                        <th>Ime i prezime</th>
                                                        <th style={{ width: '80px' }}>Akcija</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {odabraniPolaznici.map(polaznik => (
                                                        <tr key={polaznik.sifra}>
                                                            <td>{polaznik.ime} {polaznik.prezime}</td>
                                                            <td>
                                                                <Button
                                                                    variant="danger"
                                                                    size="sm"
                                                                    onClick={() => ukloniPolaznika(polaznik.sifra)}
                                                                >
                                                                    Obriši
                                                                </Button>
                                                            </td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </Table>
                                        </div>

                                    )}
                                    {odabraniPolaznici.length === 0 && (
                                        <p className="text-muted">Nema odabranih polaznika</p>
                                    )}
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>

                    <hr className="my-4" />

                    {/* Gumbi za akciju */}
                    <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                        <Link to={RouteNames.GRUPE} className="btn btn-danger px-4">
                            Odustani
                        </Link>
                        <Button type="submit" variant="success">
                            Dodaj novu grupu
                        </Button>
                    </div>
                </Container>
            </Form>
        </>
    )
}
