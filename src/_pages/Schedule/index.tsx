 
import { Container, Row, Col } from 'react-bootstrap';
import ArticleDetails from '../../_components/ArticleDetails';
 
 
import HorizontalCard from '../../_components/Cards/Horizontal';
import FeaturedUpdate from '../../_components/Cards/FeaturedUpdate';
//import CalendarToday
import CalendarCustom from '../../_components/Calendar/CalendarCustom'

const Schedule = () => {


    const article = {
        "id": 1,
        "title": "The profound and  far-reaching impact of global  warming on communities and individuals is  increasingly triggering alarm and concern worldwide.",
        "description": "The profound and far-reaching impact of global warming on communities and individuals is increasingly triggering alarm and concern worldwide. The Earth's climate is changing at an alarming rate, primarily due to human activities such as the burning of fossil fuels and deforestation. This ongoing environmental crisis is causing a cascade of consequences that touch the lives of people in diverse and profound ways. From extreme weather events like hurricanes and wildfires to rising sea levels and melting ice caps, the effects of global warming are disrupting ecosystems, economies, and human societies on a global scale. One of the most immediate and visible consequences of global warming is the increase in the frequency and severity of extreme weather events. Communities around the world are facing more frequent hurricanes, droughts, floods, and wildfires. These events not only endanger lives but also result in extensive property damage and economic losses. Vulnerable populations, often in low-income areas, are disproportionately affected, leading to increased inequality and social injustices.",
        "thumbnail": "default-thumbnail.png",
        "author_id": "e2200e94-445e-483b-899d-59fd8acb5980",
        "published_at": "2023-11-14T12:00:00.000Z",
        "article_tags": [
          "Science",
          "Food & Cooking",
          "already_been_seeded"
        ],
        "category": {
          "title": "Technology"
        },
        "author": {
          "ID": "e2200e94-445e-483b-899d-59fd8acb5980",
          "FIRST_NAME": "Sylvain",
          "LAST_NAME": "Shult"
        }
      }

      const recommended_article = article;
      recommended_article.thumbnail = "default-thumbnail-horizontal.png";

    return (
      <Container fluid className="w-100">
        <Row className="justify-content-center">
          <Col xs={12} md={12} lg={12}>
          <FeaturedUpdate article={article} />
          </Col> 
        </Row>
        <Row className="justify-content-center">
          <Col xs={12} md={12} lg={12} xl={12}>
          <CalendarCustom  calendarType='timeGridWeek' />
          </Col>
           
        </Row>
      </Container>
    )

 
}
export default Schedule
