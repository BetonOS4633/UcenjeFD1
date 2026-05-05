import { useEffect, useState } from "react"
import PolaznikService from "../../services/polaznici/PolaznikService"
import { Row, Col, Card, Button, Container, Pagination, Form, InputGroup } from "react-bootstrap"
import { Link, useNavigate } from "react-router-dom"
import { IME_APLIKACIJE, RouteNames } from "../../constants"
import { FaEdit, FaTrash, FaSearch } from "react-icons/fa"
import useLoading from "../../hooks/useLoading"

export default function PolaznikPregled() {

    const navigate = useNavigate()

    const [polaznici, setPolaznici] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    const [totalPages, setTotalPages] = useState(0)
    const [totalItems, setTotalItems] = useState(0)
    const [searchTerm, setSearchTerm] = useState('')
    const pageSize = 8

    const { showLoading, hideLoading } = useLoading()

    useEffect(()=>{document.title='Polaznici, ' + IME_APLIKACIJE})


    useEffect(() => {
        ucitajPolaznike(currentPage, searchTerm)
    }, [currentPage, searchTerm])

    async function ucitajPolaznike(page, search) {
        await PolaznikService.getPage(page, pageSize, search).then((odgovor) => {
            if (!odgovor.success) {
                alert('Nije implementiran servis')
                return
            }
            setPolaznici(odgovor.data)
            setTotalPages(odgovor.totalPages)
            setTotalItems(odgovor.totalItems)
        })
    }

    async function brisanje(sifra) {
        if (!confirm('Sigurno obrisati?')) return;

         showLoading()
         // samo za potrebe testa prikaza rada loading
        await new Promise(resolve => setTimeout(resolve, 2000));
    
        await PolaznikService.obrisi(sifra);
        // Nakon brisanja, provjeri je li trenutna stranica još uvijek validna
        const newTotalItems = totalItems - 1;
        const newTotalPages = Math.ceil(newTotalItems / pageSize);

        if (currentPage > newTotalPages && newTotalPages > 0) {
            setCurrentPage(newTotalPages);
        } else {
            ucitajPolaznike(currentPage, searchTerm);
        }

        hideLoading()
    }

    function handlePageChange(page) {
        setCurrentPage(page)
    }

    function handleSearchChange(e) {
        setSearchTerm(e.target.value)
        setCurrentPage(1) // Reset na prvu stranicu pri pretraživanju
    }

    return (
        <>
            <Link to={RouteNames.POLAZNICI_NOVI}
                className="btn btn-success w-100 my-3">
                Dodavanje novog polaznika
            </Link>

            {/* Search input */}
            <InputGroup className="mb-3">
                <InputGroup.Text>
                    <FaSearch />
                </InputGroup.Text>
                <Form.Control
                    type="text"
                    placeholder="Pretraži polaznike (ime, prezime, email, OIB)..."
                    value={searchTerm}
                    onChange={handleSearchChange}
                />
            </InputGroup>

            <Container className="py-3 px-0">
                <Row>
                    {polaznici && polaznici.map((polaznik) => (
                        <Col key={polaznik.sifra} xs={12} sm={6} lg={4} xl={3} className="mb-4">
                            <Card className="shadow-sm h-100 border-0">
                                {/* Slika polaznika */}
                                <div style={{ height: "200px", overflow: "hidden" }}>
                                    <Card.Img
                                        variant="top"
                                        src={polaznik.slika}
                                        style={{
                                            objectFit: "cover",
                                            height: "100%",
                                            width: "100%"
                                        }}
                                    />
                                </div>

                                <Card.Body className="d-flex flex-column">
                                    <Card.Title>
                                        {polaznik.ime} {polaznik.prezime} <span  style={{fontSize: '0.5rem'}} title="OIB" className="fw-semibold text-dark">({polaznik.oib})</span> 
                                    </Card.Title>

                                    <Card.Text className="text-muted small mb-3">
                                        <i className="bi bi-envelope"></i> {polaznik.email} <br />
                                        
                                    </Card.Text>

                                    <div className="mt-auto d-flex gap-2">
                                        <Button
                                            variant="outline-primary"
                                            className="flex-fill"
                                            onClick={() => navigate(`/polaznici/${polaznik.sifra}`)}
                                         title="Promjeni">
                                    <FaEdit />
                                        </Button>
                                        <Button
                                            variant="outline-danger"
                                            onClick={() => brisanje(polaznik.sifra)}
                                            title="Obriši"
                                        >
                                         <FaTrash />
                                        </Button>
                                    </div>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </Container>

            {/* Pagination komponenta */}
            {totalPages > 1 && (

                <div className="d-flex justify-content-center">
                    <Pagination>
                        <Pagination.First
                            onClick={() => handlePageChange(1)}
                            disabled={currentPage === 1}
                        />
                        <Pagination.Prev
                            onClick={() => handlePageChange(currentPage - 1)}
                            disabled={currentPage === 1}
                        />

                        {[...Array(totalPages)].map((_, index) => {
                            const pageNumber = index + 1;
                            // Prikaži samo stranice blizu trenutne stranice
                            if (
                                pageNumber === 1 ||
                                pageNumber === totalPages ||
                                (pageNumber >= currentPage - 2 && pageNumber <= currentPage + 2)
                            ) {
                                return (
                                    <Pagination.Item
                                        key={pageNumber}
                                        active={pageNumber === currentPage}
                                        onClick={() => handlePageChange(pageNumber)}
                                    >
                                        {pageNumber}
                                    </Pagination.Item>
                                );
                            } else if (
                                pageNumber === currentPage - 3 ||
                                pageNumber === currentPage + 3
                            ) {
                                return <Pagination.Ellipsis key={pageNumber} disabled />;
                            }
                            return null;
                        })}

                        <Pagination.Next
                            onClick={() => handlePageChange(currentPage + 1)}
                            disabled={currentPage === totalPages}
                        />
                        <Pagination.Last
                            onClick={() => handlePageChange(totalPages)}
                            disabled={currentPage === totalPages}
                        />
                    </Pagination>
                </div>

            )}


        </>
    )
}
