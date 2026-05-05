import { useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import PolaznikService from "../../services/polaznici/PolaznikService"
import { Button, Col, Form, Row } from "react-bootstrap"
import { RouteNames } from "../../constants"
import { ShemaPolaznik } from "../../schemas/ShemaPolaznik"

export default function PolaznikPromjena() {

    const navigate = useNavigate()
    const params = useParams()
    const [polaznik, setPolaznik] = useState({})
    const [errors, setErrors] = useState({});

    useEffect(() => {
        ucitajPolaznika()
    }, [])

    async function ucitajPolaznika() {
        await PolaznikService.getBySifra(params.sifra).then((odgovor) => {
            if (!odgovor.success) {
                alert('Nije implementiran servis')
                return
            }
            setPolaznik(odgovor.data)
        })
    }

    async function promjeni(polaznik) {
        await PolaznikService.promjeni(params.sifra, polaznik).then(() => {
            navigate(RouteNames.POLAZNICI)
        })
    }

    function odradiSubmit(e) {
        e.preventDefault()
        const podaci = new FormData(e.target)

        setErrors({});
        const objektPodataka = Object.fromEntries(podaci);

        // Provjera pomoću Zod sheme
        const rezultat = ShemaPolaznik.safeParse(objektPodataka);

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
            ime: podaci.get('ime'),
            prezime: podaci.get('prezime'),
            email: podaci.get('email'),
            oib: podaci.get('oib')
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
            <h3>Promjena polaznika</h3>
            <Form onSubmit={odradiSubmit}>
                <Form.Group controlId="ime">
                    <Form.Label>Ime</Form.Label>
                    <Form.Control
                        type="text"
                        name="ime"
                        defaultValue={polaznik.ime}
                        isInvalid={!!errors.ime}
                        onFocus={() => ocistiGresku('ime')}
                    />
                    <Form.Control.Feedback type="invalid">
                        {errors.ime}
                    </Form.Control.Feedback>
                </Form.Group>

                <Form.Group controlId="prezime">
                    <Form.Label>Prezime</Form.Label>
                    <Form.Control
                        type="text"
                        name="prezime"
                        defaultValue={polaznik.prezime}
                        isInvalid={!!errors.prezime}
                        onFocus={() => ocistiGresku('prezime')}
                    />
                    <Form.Control.Feedback type="invalid">
                        {errors.prezime}
                    </Form.Control.Feedback>
                </Form.Group>

                <Form.Group controlId="email">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                        type="email"
                        name="email"
                        defaultValue={polaznik.email}
                        isInvalid={!!errors.email}
                        onFocus={() => ocistiGresku('email')}
                    />
                    <Form.Control.Feedback type="invalid">
                        {errors.email}
                    </Form.Control.Feedback>
                </Form.Group>

                <Form.Group controlId="oib">
                    <Form.Label>OIB</Form.Label>
                    <Form.Control
                        type="text"
                        name="oib"
                        maxLength={11}
                        defaultValue={polaznik.oib}
                        isInvalid={!!errors.oib}
                        onFocus={() => ocistiGresku('oib')}
                    />
                    <Form.Control.Feedback type="invalid">
                        {errors.oib}
                    </Form.Control.Feedback>
                </Form.Group>

                <Row className="mt-4">
                    <Col>
                        <Link to={RouteNames.POLAZNICI} className="btn btn-danger">
                            Odustani
                        </Link>
                    </Col>
                    <Col>
                        <Button type="submit" variant="success">
                            Promjeni polaznika
                        </Button>
                    </Col>
                </Row>

            </Form>
        </>
    )
}
