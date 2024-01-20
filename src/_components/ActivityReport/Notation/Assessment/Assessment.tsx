import { Row, Col, Form } from 'react-bootstrap';
import { Heading2 } from "../../../ToolBox/Headings"
import { ParagraphSm } from "../../../ToolBox/Paragraphs"

function Assessment({ assessment } : any) {

    return (
        <Col xs={12} md={12} lg={12} xl={4}>
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
            <div className="d-flex justify-content-center ">
                <ParagraphSm>Coef. {assessment.coefficient}</ParagraphSm>
            </div>
        </Col>
    )
}

export default Assessment;