import React, { useEffect, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import HorizontalCard from '../../_components/Cards/Horizontal';
import FeaturedUpdate from '../../_components/Cards/FeaturedUpdate';
import CalendarCustom from '../../_components/Calendar/CalendarCustom';
import {
    getArticlesCrossOrigin,
    getLastArticle
} from "../../_components/Article/ArticleFetchAll";

const Home = () => {

    const [lastArticle, setLastArticle] = useState<any>([]);
    const [articles, setArticles] = useState<any>([]);

    useEffect(() => {
        getArticlesCrossOrigin().then(result => setArticles(result))
        getLastArticle().then(result => setLastArticle(result))
    }, []);

    useEffect(() => {
        // console.log(articles)
    }, [articles]);

    return (
        <Container fluid className="w-100">

            <Row className="justify-content-center">
                <Col xs={12} md={12} lg={12}>
                    <FeaturedUpdate article={lastArticle} />
                </Col>
            </Row>

            <Row className="justify-content-center">

                <Col className='mb-3' xs={12} md={12} lg={7} xl={8} >
                    <CalendarCustom calendarType={"timeGridDay"} Height={"70vh"}/>
                </Col>

                <Col className={"scrollable"} xs={12} md={12} lg={5} xl={4}>
                    <div className='hide-scroller internal-box-shadow ' style={{height: "70vh", overflowY: "scroll"}}>
                        {articles.length > 0 &&
                            articles.map((article: any, index: any) => (
                                <HorizontalCard key={index} article={article} />
                            ))}
                    </div>
                </Col>

            </Row>
        </Container>
    );
};

export default Home;
