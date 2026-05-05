import { Form, Button, Row, Col, Container, Card } from "react-bootstrap"
import { Link, useNavigate } from "react-router-dom";
import { RouteNames } from "../../constants";
import SmjerService from "../../services/smjerovi/SmjerService";
import { ShemaSmjer } from "../../schemas/ShemaSmjer"
import { useEffect, useState } from "react"
import { useRive, useStateMachineInput } from '@rive-app/react-canvas';

export default function SmjerNovi() {

    const navigate = useNavigate()
    const [errors, setErrors] = useState({});
    const [spustiRuke, setSpustiRuke] = useState(true);

    const { rive, RiveComponent } = useRive({
        src: '/animacija.riv',
        stateMachines: 'State Machine 1', // Važno: mora odgovarati nazivu u Rive editoru
        autoplay: true,
    });

    // Povezivanje s inputima iz Rive-a
    const isHandsUp = useStateMachineInput(rive, 'State Machine 1', 'hands_up');
    const fail = useStateMachineInput(rive, 'State Machine 1', 'fail');



    useEffect(() => {
        if (!rive || !isHandsUp) return;

        if (!spustiRuke) {
            // 1. Podigni ruke
            isHandsUp.value = true;
            // 2. Ako je tek pokrenut submit (puna lista grešaka), "stisni" fail trigger
            if (fail) fail.fire();
        } else{
            isHandsUp.value = false;
        }
    }, [errors, isHandsUp, fail, rive]);






    async function dodaj(smjer) {
        //console.table(smjer) // ovo je za kontrolu da li je sve OK
        await SmjerService.dodaj(smjer).then(() => {
            navigate(RouteNames.SMJEROVI)
        })
    }


    function odradiSubmit(e) { //e je event
        e.preventDefault() // nemoj odraditi submit
        const podaci = new FormData(e.target)
        setSpustiRuke(true)
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
            setSpustiRuke(false)
            return;
        }

        dodaj({
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
            setSpustiRuke(true)
        }
    };


    // Dodajemo interaktivnost na fokus polja
    const handleFocus = (nazivPolja) => {
        ocistiGresku(nazivPolja);
        if (isChecking) isChecking.value = true;
    };

    const handleBlur = () => {
        if (isChecking) isChecking.value = false;
    };

    return (
        <>
            <Row>
                <Col md={7} className="mt-4">
                    <Form onSubmit={odradiSubmit}>


                        <Container>
                            <Card className="shadow-sm">
                                <Card.Body>
                                    <Card.Title className="mb-4">Unos novog smjera</Card.Title>

                                    {/* Naziv - Pun širina na svim ekranima */}
                                    <Row>
                                        <Col xs={12}>
                                            <Form.Group controlId="naziv" className="mb-3">
                                                <Form.Label className="fw-bold">Naziv</Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    name="naziv"
                                                    placeholder="Unesite naziv smjera"
                                                    isInvalid={!!errors.naziv}
                                                    onFocus={() => handleFocus('naziv')} // Pozivamo novu funkciju
                                                    onBlur={handleBlur}
                                                    onChange={(e) => {
                                                        if (numLook) numLook.value = e.target.value.length * 2;
                                                    }}
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
                                                    placeholder="0"
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
                                                    placeholder="0,00"
                                                    step={0.01}
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
                                            Dodaj novi smjer
                                        </Button>
                                    </div>
                                </Card.Body>
                            </Card>
                        </Container>

                    </Form>
                </Col>
                <Col md={5} className="mt-4">
                    <RiveComponent />
                </Col>
            </Row>
        </>
    )
}