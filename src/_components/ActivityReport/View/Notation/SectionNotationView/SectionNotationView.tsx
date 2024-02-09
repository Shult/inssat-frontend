import { Row, Col } from 'react-bootstrap';
import AssessmentView from "../AssessmentView/AssessmentView"
import {AssessmentFinal} from "../AssessmentView/AssessmentFinal/AssessmentFinal"
import { Grade } from '../../../Services/interfaces';

interface SectionProps {
    grades: Grade[];
}

function SectionNotationView(sectionNotationView : SectionProps) {

    var average = 0.0;
    var nbCoeff = 0.0
    sectionNotationView.grades.map((grade, index) => {
            // console.log("sectionNotationView : \n"
            //     + "Grade " + sectionNotationView.grades[index].grade
            //     + "Coeff " + sectionNotationView.grades[index].assessment.coefficient);
            average += sectionNotationView.grades[index].grade * sectionNotationView.grades[index].assessment.coefficient;
            // console.log("Calcul ("+average+") =  Grade ("+sectionNotationView.grades[index].grade+") * Coeff ("+sectionNotationView.grades[index].assessment.coefficient+")")
            nbCoeff +=  sectionNotationView.grades[index].assessment.coefficient
            // console.log("Average = " + average / nbCoeff)
        }
    )

    return(
        <Row>
            {
                sectionNotationView.grades.map((grade : Grade, index) =>
                    <AssessmentView
                        key={index}
                        assessment={grade.assessment}
                        grade={grade}
                    ></AssessmentView>
                )
            }
            <Col>
                <AssessmentFinal
                    average ={average / nbCoeff}
                ></AssessmentFinal>
            </Col>
        </Row>
    )
}

export default SectionNotationView;