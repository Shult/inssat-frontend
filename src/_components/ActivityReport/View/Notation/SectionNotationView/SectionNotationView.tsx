import { Row, Col } from 'react-bootstrap';
import AssessmentView from "../AssessmentView/AssessmentView"
import {AssessmentFinal} from "../AssessmentView/AssessmentFinal/AssessmentFinal"
import { Grade } from '../../../Services/interfaces';

interface SectionProps {
    grades: Grade[];
}

function SectionNotationView(sectionNotationView : SectionProps) {
    return(
        <Row>
            {
                sectionNotationView.grades.map((grade : Grade, index) =>
                    <AssessmentView
                        key={index}
                        assessment={grade.assessment}
                        grade={sectionNotationView.grades[index]}
                    ></AssessmentView>
                )
            }
            <Col>
                <AssessmentFinal
                    grades={sectionNotationView.grades}
                ></AssessmentFinal>
            </Col>
        </Row>
    )
}

export default SectionNotationView;