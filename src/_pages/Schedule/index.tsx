import { Container, Row, Col } from 'react-bootstrap';

//import CalendarToday
import CalendarCustom from '../../_components/Calendar/CalendarCustom'

const Schedule = () => {

    return (
        <Container fluid className="w-100">

            <Row className="justify-content-center">

                <Col xs={12} md={12} lg={12} xl={12}>
                    <CalendarCustom Height={"95vh"} />
                </Col>

            </Row>
        </Container>
    )


}
export default Schedule
