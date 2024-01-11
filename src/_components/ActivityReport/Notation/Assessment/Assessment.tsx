import { Row, Col, Form } from 'react-bootstrap';
import { Heading2 } from "../../../ToolBox/Headings"
import { ParagraphSm } from "../../../ToolBox/Paragraphs"

function Assessment({ assessment } : any) {

    return (
        <Col xs={4}>
            <h2 className={"heading4"}>{assessment.name}</h2>
            <Form.Control as="textarea" rows={3} placeholder="Commentaire" id={"text-form"}/>
            <Row>
                <Col xs={9}>
                    <Form.Control type="text" placeholder="Note"/>
                </Col>
                <Col xs={3}>
                    <Heading2>/20</Heading2>
                </Col>
            </Row>
            <p id={"coef"}><ParagraphSm>Coef. {assessment.coefficient}</ParagraphSm></p>
        </Col>
    )
}

export default Assessment;