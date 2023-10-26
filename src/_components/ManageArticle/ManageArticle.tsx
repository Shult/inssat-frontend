import React, {useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createArticle, updateArticle, deleteArticle, getArticles } from '../../_actions/articleActions';
import {ArticleState} from "../../_interfaces/interfacesArticles";

const ManageArticles: () => void = () => {
    const dispatch = useDispatch();
    const articles = useSelector((state: { articles: ArticleState }) => state.articles.articles);

    useEffect(() => {
        dispatch(getArticles());
    }, [dispatch]);
}

export default ManageArticles;
