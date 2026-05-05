import { Form, Button, Row, Col, Container, Card } from "react-bootstrap"
import { Link, useNavigate, useParams } from "react-router-dom";
import { RouteNames } from "../../constants";
import SmjerService from "../../services/smjerovi/SmjerService";
import { useEffect, useState } from "react";
import { ShemaSmjer } from "../../schemas/ShemaSmjer"

export default function SmjerPromjena(){

    const navigate = useNavigate()
    const params = useParams()
    const [smjer,setSmjer] = useState({})
    const [aktivan,setAktivan] = useState(false)
    const [errors, setErrors] = useState({});

    async function ucitajSmjer() {
        await SmjerService.getBySifra(params.sifra).then((odgovor)=>{
            if(!odgovor.success){
                alert('Nije implementiran servis')
                return
            }
            const s = odgovor.data
            // po potrebi prilagođavam podatke
            
            s.datumPokretanja = s.datumPokretanja.substring(0,10)

            setSmjer(s)

            setAktivan(s.aktivan)
        })
    }

    useEffect(()=>{
        ucitajSmjer()
    },[])

    async function promjeni(smjer){
        //console.table(smjer) // ovo je za kontrolu da li je sve OK
        await SmjerService.promjeni(params.sifra,smjer).then(()=>{
            navigate(RouteNames.SMJEROVI)
        })
    }


    function odradiSubmit(e){ //e je event
        e.preventDefault() // nemoj odraditi submit
        const podaci = new FormData(e.target)

        setErrors({});
        const objektPodataka = Object.fromEntries(podaci);

        // Provjera pomoću Zod sheme
        const rezultat = ShemaSmjer.safeParse(objektPodataka);

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

        promjeni({
            naziv: podaci.get('naziv'),
            trajanje: parseInt(podaci.get('trajanje')),
            cijena: parseFloat(podaci.get('cijena')),
            datumPokretanja: new Date(podaci.get('datumPokretanja')).toISOString(),
            aktivan: podaci.get('aktivan') === 'on'
        })
    }

    const ocistiGresku = (nazivPolja) => {
        if (errors[nazivPolja]) {
            const noveGreske = { ...errors };
            delete noveGreske[nazivPolja];
            setErrors(noveGreske);
        }
    };

    return(
        <>
            <h3>Promjena smjera</h3>
            <Form onSubmit={odradiSubmit}>
                <Container className="mt-4">
                    <Card className="shadow-sm">
                        <Card.Body>
                            <Card.Title className="mb-4">Podaci o smjeru</Card.Title>

                            {/* Naziv - Pun širina na svim ekranima */}
                            <Row>
                                <Col xs={12}>
                                    <Form.Group controlId="naziv" className="mb-3">
                                        <Form.Label className="fw-bold">Naziv</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="naziv"
                                            placeholder="Unesite naziv smjera"
                                            defaultValue={smjer.naziv}
                                            isInvalid={!!errors.naziv}
                                            onFocus={() => ocistiGresku('naziv')}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            {errors.naziv}
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                </Col>
                            </Row>

                            {/* Trajanje i Cijena - Jedno pored drugog na md+, jedno ispod drugog na mobitelu */}
                            <Row>
                                <Col md={6}>
                                    <Form.Group controlId="trajanje" className="mb-3">
                                        <Form.Label className="fw-bold">Trajanje (sati)</Form.Label>
                                        <Form.Control
                                            type="number"
                                            name="trajanje"
                                            step={1}
                                            placeholder="0"
                                            defaultValue={smjer.trajanje}
                                            isInvalid={!!errors.trajanje}
                                            onFocus={() => ocistiGresku('trajanje')}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            {errors.trajanje}
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                </Col>
                                <Col md={6}>
                                    <Form.Group controlId="cijena" className="mb-3">
                                        <Form.Label className="fw-bold">Cijena (€)</Form.Label>
                                        <Form.Control
                                            type="number"
                                            name="cijena"
                                            step={0.01}
                                            placeholder="0,00"
                                            defaultValue={smjer.cijena}
                                            isInvalid={!!errors.cijena}
                                            onFocus={() => ocistiGresku('cijena')}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            {errors.cijena}
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                </Col>
                            </Row>

                            <Row className="align-items-center">
                                {/* Datum pokretanja */}
                                <Col md={6}>
                                    <Form.Group controlId="datumPokretanja" className="mb-3">
                                        <Form.Label className="fw-bold">Datum pokretanja</Form.Label>
                                        <Form.Control
                                            type="date"
                                            name="datumPokretanja"
                                            isInvalid={!!errors.datumPokretanja}
                                            onFocus={(e) => {
                                                ocistiGresku('datumPokretanja')
                                                e.target.showPicker()
                                            }}
                                            defaultValue={smjer.datumPokretanja}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            {errors.datumPokretanja}
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                </Col>

                                {/* Aktivan - Switch umjesto checkboxa za moderniji izgled */}
                                <Col md={6}>
                                    <Form.Group controlId="aktivan" className="mb-3 mt-md-3">
                                        <Form.Check
                                            type="switch"
                                            label="Smjer je aktivan"
                                            name="aktivan"
                                            className="fs-5"
                                            checked={aktivan}
                                            onChange={(e) => setAktivan(e.target.checked)}
                                        />
                                    </Form.Group>
                                </Col>
                            </Row>

                            <hr />

                            {/* Gumbi za akciju - RWD pozicioniranje */}
                            <div className="d-grid gap-2 d-md-flex justify-content-md-end mt-4">
                                <Link to={RouteNames.SMJEROVI} className="btn btn-danger px-4">
                                    Odustani
                                </Link>
                                <Button type="submit" variant="success">
                                    Promjeni smjer
                                </Button>
                            </div>
                        </Card.Body>
                    </Card>
                </Container>


            </Form>
        </>
    )
}