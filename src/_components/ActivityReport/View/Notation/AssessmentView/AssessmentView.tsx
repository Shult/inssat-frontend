import { Row, Col, Form } from 'react-bootstrap';
import { Heading2 } from "../../../../ToolBox/Headings"
import { ParagraphSm } from "../../../../ToolBox/Paragraphs"
import { Grade } from './Grade/Grade'

function AssessmentView({ assessment, grade } : any) {
    return (
        <Col xs={12} md={12} lg={12} xl={3} className={"division-with-border"}>
            <h2 className={"heading4"}>{assessment.name}</h2>
            <p>{grade.comment}</p>
                <Grade
                    grade={grade.grade}
                ></Grade>
            <div className="d-flex justify-content-center ">
                <ParagraphSm>Coef. {assessment.coefficient}</ParagraphSm>
            </div>
        </Col>
    )
}

export default AssessmentView;