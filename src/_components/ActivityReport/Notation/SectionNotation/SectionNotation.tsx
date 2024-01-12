import { Row } from 'react-bootstrap';
import "../../../ToolBox/styles.css"
import "./SectionNotation.css"
import Assessment from "../Assessment/Assessment"
import {IAssessment} from "../../Services/activityReportInterfaces"

interface SectionProps {
    assessments: IAssessment[];
    periodId: number;
}
function SectionNotation({assessments, periodId} : SectionProps) {

    return(
        <Row>
            {
                assessments.map((assessment, index) =>
                    <Assessment
                        assessment={assessment}
                        key={index}
                        periodId={periodId}
                        studentId={"0cabe1b3-e680-4cac-8d19-0fbeab35134e"}
                    />
                )
            }
        </Row>
    )
}

export default SectionNotation;