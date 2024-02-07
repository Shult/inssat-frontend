import { Row } from 'react-bootstrap';
import "../../../ToolBox/styles.css"
import "./SectionNotation.css"
import Assessment from "../Assessment/Assessment"
import {IAssessment} from "../../Services/activityReportInterfaces"

interface SectionProps {
    assessments: IAssessment[];
    periodId: number;
    studentId: string | undefined;
}
function SectionNotation({assessments, periodId, studentId} : SectionProps) {

    return(
        <Row>
            {
                assessments.map((assessment, index) =>
                    <Assessment
                        assessment={assessment}
                        key={index}
                        periodId={periodId}
                        studentId={studentId}
                    />
                )
            }
        </Row>
    )
}

export default SectionNotation;