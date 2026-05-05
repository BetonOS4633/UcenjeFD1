import { Container, Row, Col, Card, Button, Badge } from 'react-bootstrap';
import { FaGithub, FaGlobe } from 'react-icons/fa';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import { IME_APLIKACIJE } from '../constants';
import { useEffect } from 'react';

export default function AplikacijePolaznika() {

    useEffect(()=>{document.title='Aplikacije polaznika, ' + IME_APLIKACIJE})


    const polazniciFD1 = [
        {
            "ime": "Vladimir",
            "prezime": "Geić",
            "git": "https://github.com/vladogeic",
            "url": "https://edunova1.origo.hr",
            "aplikacija": "Kalkulator ponavljanja vježbi"
        },
        {
            "ime": "Rudolf",
            "prezime": "Gergelj",
            "git": "https://github.com/BetonOS4633",
            "url": "https://edunova2.origo.hr",
            "aplikacija": "Kalkulacije u građevini"
        },
        {
            "ime": "Luka",
            "prezime": "Hlavati",
            "git": "https://github.com/lhlavati",
            "url": "https://edunova3.origo.hr",
            "aplikacija": "Sportsko rekreacijski centar"
        },
        {
            "ime": "Tankred",
            "prezime": "Kralj",
            "git": "https://github.com/Tankred031",
            "url": "https://edunova4.origo.hr",
            "aplikacija": "Wine and cheese pairing app"
        },
        {
            "ime": "Maja",
            "prezime": "Šnalcer",
            "git": "https://github.com/snalcermaja",
            "url": "https://edunova11.origo.hr",
            "aplikacija": "Online rezervacija termina"
        },
        {
            "ime": "Alen",
            "prezime": "Tandara",
            "git": "https://github.com/alentandara",
            "url": "https://edunova12.origo.hr",
            "aplikacija": "Mjerenje prijeđenog puta"
        },
        {
            "ime": "Vincent Edward",
            "prezime": "Tilhof",
            "git": "https://github.com/EdwardTilhof",
            "url": "https://edunova13.origo.hr",
            "aplikacija": "Predstavljanje obrtnika"
        },
        {
            "ime": "Roberto",
            "prezime": "Perković",
            "git": "https://github.com/rperkovi",
            "url": "https://edunova8.origo.hr",
            "aplikacija": "Kuća za odmor"
        },
        {
            "ime": "Fran",
            "prezime": "Liović",
            "git": "https://github.com/Liovic031",
            "url": "https://edunova5.origo.hr",
            "aplikacija": "Rezervacija i kupnja ulaznica"
        },
        {
            "ime": "Robert",
            "prezime": "Marković",
            "git": "https://github.com/RobertMarkovic710",
            "url": "https://edunova6.origo.hr",
            "aplikacija": "CatteryManager"
        },
        {
            "ime": "Filip",
            "prezime": "Pernar",
            "git": "https://github.com/filippernar",
            "url": "https://edunova9.origo.hr",
            "aplikacija": "EVIDENCIJA SERVISNIH USLUGA AUTOMEHANIČARSKE RADIONICE"
        },
        {
            "ime": "Hrvoje",
            "prezime": "Mitrić",
            "git": "https://github.com/hrki1971",
            "url": "https://edunova7.origo.hr",
            "aplikacija": "Kupnja slatkiša"
        },
        {
            "ime": "Ivan",
            "prezime": "Kaniža",
            "git": "https://github.com/IKustomOS",
            "url": "https://edunova15.origo.hr",
            "aplikacija": "Dnevnik rada obrtnika"
        },
        {
            "ime": "Ivica",
            "prezime": "Šamu",
            "git": "https://github.com/ivicasamu",
            "url": "https://edunova10.origo.hr",
            "aplikacija": "EquipManagerAPP"
        },
        {
            "ime": "Josip",
            "prezime": "Budimčić",
            "git": "https://github.com/JosipBudimcic",
            "url": "https://edunova16.origo.hr",
            "aplikacija": "Brzi popravci"
        }];


    const polazniciFD2 = [
        {
            "ime": "Blanka",
            "prezime": "Despotović",
            "git": "https://github.com/blankadespotovic",
            "url": "https://edunova32.origo.hr",
            "aplikacija": "Akigoto"
        },
        {
            "ime": "Marija",
            "prezime": "Dergez",
            "git": "https://github.com/marijadergez",
            "url": "https://edunova31.origo.hr",
            "aplikacija": "fip.hr knjigovodstveni servis"
        },
        {
            "ime": "Khan",
            "prezime": "Delagić",
            "git": "https://github.com/khan-milopan",
            "url": "https://edunova30.origo.hr",
            "aplikacija": "LLMConvo"
        },
       {
            "ime": "Borna",
            "prezime": "Novak",
            "git": "https://github.com/BornaNovak",
            "url": "https://edunova37.origo.hr",
            "aplikacija": "AeroMusicay"
        },
        {
            "ime": "Željka",
            "prezime": "Haramina",
            "git": "https://github.com/ZeljkaH55",
            "url": "https://edunova34.origo.hr",
            "aplikacija": "Planiranje poslova"
        },
        {
            "ime": "Boris",
            "prezime": "Despotović",
            "git": "https://github.com/Boris-Despotovic",
            "url": "https://edunova33.origo.hr",
            "aplikacija": "Ikosthetics"
        },
        {
            "ime": "Katarina",
            "prezime": "Skenderović",
            "git": "https://github.com/KatSKe",
            "url": "https://edunova41.origo.hr",
            "aplikacija": "LaLa Booking"
        },
        {
            "ime": "Juraj",
            "prezime": "Kardoš",
            "git": "https://github.com/jkardos10",
            "url": "https://edunova43.origo.hr",
            "aplikacija": "Job app tracker"
        },
        {
            "ime": "Gabrijel",
            "prezime": "Ramić",
            "git": "https://github.com/gabrielramic",
            "url": "https://edunova39.origo.hr",
            "aplikacija": "Kozmetički salon"
        }
    ];


    // Interna komponenta za prikaz pojedinačne kartice
    const ProjektCard = ({ p }) => (
        <Col>
            <Card className="h-100 shadow-sm" 
            style={{ transition: 'transform 0.2s', borderRadius: '12px', border: '2px dotted gray' }}
            >
                <Card.Body className="d-flex flex-column">
                    <div className="mb-2">
                        <Badge bg="secondary" pill className="fw-normal">
                            {p.prezime} {p.ime}
                        </Badge>
                    </div>
                    <Card.Title className="flex-grow-1 fw-bold mb-3 mt-2" style={{ fontSize: '1.1rem' }}>
                        {p.aplikacija}
                    </Card.Title>
                    <object data={p.url} type="text/html" 
                        style={{border: '2px solid black', minHeight: '600px'}}></object>
                    <div className="d-flex gap-2 border-top pt-3">
                        <Button
                            variant="outline-dark"
                            size="sm"
                            href={p.git}
                            target="_blank"
                            className="w-100 d-flex align-items-center justify-content-center"
                        >
                            <FaGithub className="me-2" /> GitHub
                        </Button>
                        <Button
                            variant="primary"
                            size="sm"
                            href={p.url}
                            target="_blank"
                            className="w-100 d-flex align-items-center justify-content-center"
                        >
                            <FaGlobe className="me-2" /> Live
                        </Button>
                    </div>
                </Card.Body>
            </Card>
        </Col>
    );


    return (
        <Container className="py-1" style={{ backgroundColor: '#fcfcfc' }}>

            {/* Sekcija FD1 */}
            <div className="text-center mb-1">
                <p className="text-muted">Pregled završnih radova frontend grupa FD1 i FD2</p>
            </div>

            <Tabs
                defaultActiveKey="FD1"
                id="uncontrolled-tab-example"
                className="mb-3"
            >
                <Tab eventKey="FD1" title="FD1">
                   <Row xs={1} sm={2} lg={2} xl={3} className="g-4 mb-5" >
                        {polazniciFD1.map((p, index) => (
                            <ProjektCard key={`fd1-${index}`} p={p} />
                        ))}
                    </Row>
                </Tab>
                <Tab eventKey="FD2" title="FD2">
                    <Row xs={1} sm={2} lg={3} xl={3} className="g-4">
                        {polazniciFD2.map((p, index) => (
                            <ProjektCard key={`fd2-${index}`} p={p} />
                        ))}
                    </Row>
                </Tab>
            </Tabs>
        </Container>
    );
}
