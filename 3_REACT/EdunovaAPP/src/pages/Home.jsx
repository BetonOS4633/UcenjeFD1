import { IME_APLIKACIJE } from "../constants";
import slika from '../assets/edunova.svg'
import { DotLottieReact } from '@lottiefiles/dotlottie-react'
import { Col, Row, Card } from "react-bootstrap";
import { useState, useEffect } from "react";
import SmjerService from "../services/smjerovi/SmjerService";
import PolaznikService from "../services/polaznici/PolaznikService";
import GrupaService from "../services/grupe/GrupaService";
import OperaterService from "../services/operateri/OperaterService";

export default function Home() {
    const [brojSmjerova, setBrojSmjerova] = useState(0);
    const [brojPolaznika, setBrojPolaznika] = useState(0);
    const [brojGrupa, setBrojGrupa] = useState(0);
    const [brojOperatera, setBrojOperatera] = useState(0);
    const [brojAdmina, setBrojAdmina] = useState(0);
    const [brojKorisnika, setBrojKorisnika] = useState(0);
    const [animatedSmjerovi, setAnimatedSmjerovi] = useState(0);
    const [animatedPolaznici, setAnimatedPolaznici] = useState(0);
    const [animatedGrupe, setAnimatedGrupe] = useState(0);
    const [animatedOperateri, setAnimatedOperateri] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const smjeroviRezultat = await SmjerService.get();
                const polaznici = await PolaznikService.get();
                const grupe = await GrupaService.get();
                const operateri = await OperaterService.get();
                
                setBrojSmjerova(smjeroviRezultat.data.length);
                setBrojPolaznika(polaznici.data.length);
                setBrojGrupa(grupe.data.length);
                setBrojOperatera(operateri.data.length);
                
                // Izračunaj broj admina i korisnika
                const admini = operateri.data.filter(op => op.uloga === 'admin').length;
                const korisnici = operateri.data.filter(op => op.uloga === 'korisnik').length;
                setBrojAdmina(admini);
                setBrojKorisnika(korisnici);
            } catch (error) {
                console.error('Greška pri dohvaćanju podataka:', error);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        if (animatedSmjerovi < brojSmjerova) {
            const timer = setTimeout(() => {
                setAnimatedSmjerovi(prev => Math.min(prev + 1, brojSmjerova));
            }, 300);
            return () => clearTimeout(timer);
        }
    }, [animatedSmjerovi, brojSmjerova]);

    useEffect(() => {
        if (animatedPolaznici < brojPolaznika) {
            const timer = setTimeout(() => {
                setAnimatedPolaznici(prev => Math.min(prev + 1, brojPolaznika));
            }, 100);
            return () => clearTimeout(timer);
        }
    }, [animatedPolaznici, brojPolaznika]);

    useEffect(() => {
        if (animatedGrupe < brojGrupa) {
            const timer = setTimeout(() => {
                setAnimatedGrupe(prev => Math.min(prev + 1, brojGrupa));
            }, 200);
            return () => clearTimeout(timer);
        }
    }, [animatedGrupe, brojGrupa]);

    useEffect(() => {
        if (animatedOperateri < brojOperatera) {
            const timer = setTimeout(() => {
                setAnimatedOperateri(prev => Math.min(prev + 1, brojOperatera));
            }, 150);
            return () => clearTimeout(timer);
        }
    }, [animatedOperateri, brojOperatera]);

    return (
        <>
        <Row>
            <Col md={6}>
            <div style={{ textAlign: 'center' }}>
                <img src={slika} />
            </div>
            <p className="lead m-5 text-center">Dobrodošli na {IME_APLIKACIJE}</p>
            <div style={{maxWidth: '500px', margin: 'auto'}}>
                <DotLottieReact
                    src="/animacija.lottie"
                    loop
                    autoplay
                />
            </div>
            </Col>
            <Col className="d-flex align-items-center justify-content-center">
                <div style={{ width: '100%', maxWidth: '500px' }}>
                    <Row>
                        <Col md={6} className="mb-3">
                            <Card className="shadow-lg border-0 statistikaPanel h-100">
                                <Card.Body className="text-center">
                                    <p className="text-white">Smjerovi</p>
                                    <div className="statistikaTekst">
                                        {animatedSmjerovi}
                                    </div>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col md={6} className="mb-3">
                            <Card className="shadow-lg border-0 statistikaPanel h-100">
                                <Card.Body className="text-center">
                                    <p className="text-white">Polaznici</p>
                                    <div className="statistikaTekst">
                                        {animatedPolaznici}
                                    </div>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={6} className="mb-3">
                            <Card className="shadow-lg border-0 statistikaPanel h-100">
                                <Card.Body className="text-center">
                                    <p className="text-white">Grupe</p>
                                    <div className="statistikaTekst">
                                        {animatedGrupe}
                                    </div>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col md={6} className="mb-3">
                            <Card className="shadow-lg border-0 statistikaPanel h-100">
                                <Card.Body className="text-center">
                                    <p className="text-white">Operateri</p>
                                    <div className="statistikaTekst">
                                        {animatedOperateri}
                                    </div>
                                    <div style={{ fontSize: '0.9rem', marginTop: '10px' }}>
                                        <span className="badge bg-danger me-2">Admin: {brojAdmina}</span>
                                        <span className="badge bg-primary">Korisnik: {brojKorisnika}</span>
                                    </div>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </div>
            </Col>
        </Row>
        </>
    )
}
