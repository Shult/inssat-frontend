import { Accordion, Card, Col, Row } from "react-bootstrap"
import React from "react";
import Button from "../../_components/Clickable/Button";

import "./ApprenticeshipTickets.css"

const ApprenticeshipTickets = () => {


    

    return (
        <div>
            <h1>Fiches de spécification du travail en entreprise, de suivi et de bilan</h1>

            <div className="container">

            

            <Card>
                <Card.Body>
                    <Card.Title>Fiche de suivi</Card.Title>
                    <Row>
                        <Col className="container">
                        <Card>
                            <Card.Body>
                                <Card.Title>Entreprise</Card.Title>
                                <ul>
                                    <li>Nom : Groupama Support et Service</li>
                                    <li>Nom : Groupama Support et Service</li>
                                    <li>Nom : Groupama Support et Service</li>
                                    <li>Nom : Groupama Support et Service</li>
                                </ul>

                            </Card.Body>

                        </Card>
                        </Col>

                        <Col className="container">
                        <Card>
                            <Card.Body>
                                <Card.Title>Maitre d'apprentissage</Card.Title>
                                <ul>
                                    <li>Nom : Groupama Support et Service</li>
                                    <li>Nom : Groupama Support et Service</li>
                                    <li>Nom : Groupama Support et Service</li>
                                    <li>Nom : Groupama Support et Service</li>
                                </ul>

                            </Card.Body>

                        </Card>
                        </Col>

                        </Row>

                        <Row>

                        <Col className="container">

                        <Card>
                            <Card.Body>
                                <Card.Title>Tuteur</Card.Title>
                                <ul>
                                    <li>Nom : Groupama Support et Service</li>
                                    <li>Nom : Groupama Support et Service</li>
                                    <li>Nom : Groupama Support et Service</li>
                                    <li>Nom : Groupama Support et Service</li>
                                </ul>

                            </Card.Body>

                        </Card>
                        </Col>

                        <Col className="container">
                        <Card>
                            <Card.Body>
                                <Card.Title>Elève</Card.Title>
                                <ul>
                                    <li>Nom : Groupama Support et Service</li>
                                    <li>Nom : Groupama Support et Service</li>
                                    <li>Nom : Groupama Support et Service</li>
                                    <li>Nom : Groupama Support et Service</li>
                                </ul>

                            </Card.Body>

                        </Card>
                        </Col>

                    </Row>
                </Card.Body>
            </Card>

            </div>

            <div className="container">
            <Card>
                <Card.Body>
                    <Card.Title>Tickets d'évaluations</Card.Title>
                    

                    <div className="container">
                    <Accordion>
                        <Accordion.Item eventKey="0">
                            <Accordion.Header>Bilan période 1</Accordion.Header>
                            <Accordion.Body>
                                <Row>
                                    <Col>
                                        <div>
                                            <p>Travail réalisé en entreprise : </p><span>17 / 20</span>
                                        </div>
                                    </Col>
                                    <Col>
                                        <div>
                                            <p>Rapport écrit rendu à l'école : </p><span>17 / 20</span>
                                        </div>
                                    </Col>
                                    <Col>
                                        <div>
                                            <p>Soutenance orale : </p><span>17 / 20</span>
                                        </div>
                                    </Col>
                                    <Col>
                                        <div>
                                            <p>Note finale : </p><span>17 / 20</span>
                                        </div>
                                    </Col>
                                    <Col>
                                    <Button className={"buttonGold txtCenter"}
                            content={"Détail"} />
                             {/* Ajouter redirection vers Sylvain */}
                                    </Col>
                                </Row>
                            
                            </Accordion.Body>
                        </Accordion.Item>
                        <Accordion.Item eventKey="1">
                            <Accordion.Header>Bilan période 2</Accordion.Header>
                            <Accordion.Body>
                                <Row>
                                    <Col>
                                        <div>
                                            <p>Travail réalisé en entreprise : </p><span>17 / 20</span>
                                        </div>
                                    </Col>
                                    <Col>
                                        <div>
                                            <p>Rapport écrit rendu à l'école : </p><span>17 / 20</span>
                                        </div>
                                    </Col>
                                    <Col>
                                        <div>
                                            <p>Soutenance orale : </p><span>17 / 20</span>
                                        </div>
                                    </Col>
                                    <Col>
                                        <div>
                                            <p>Note finale : </p><span>17 / 20</span>
                                        </div>
                                    </Col>
                                    <Col>
                                    <Button className={"buttonGold txtCenter"}
                            content={"Détail"} />
                             {/* Ajouter redirection vers Sylvain */}
                                    </Col>
                                </Row>
                            
                            </Accordion.Body>
                        </Accordion.Item>
                    </Accordion>
                    </div>
                    <div className="container center">
                    <Button className={"buttonWhite txtCenter"}
                            content={"Créer un nouveau tickets"} />
                    {/* Ajouter redirection vers Sylvain */}

                    </div>

                


                </Card.Body>
            </Card>
            </div>
        </div>
    )
}

export default ApprenticeshipTickets
