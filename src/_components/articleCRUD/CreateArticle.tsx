import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createArticle } from '../../_actions/articleActions';
import {Article} from "../../_interfaces/interfacesArticles";

const CreateArticle: React.FC = () => {
    const dispatch = useDispatch();
    const [title, setTitle] = useState('');
    const [snippet, setContent] = useState('');

    const article : Article = {
        "id": 6,
        "title": "React 2",
        "imageUrl": "_imgArticles/logo.svg",
        "snippet": "C'est trop bien React !",
        "link": "https://react.com",
        "tags": ["Phot", "IAI", "INFO", "SysNum"],
        "publishDate": "26/10/2023"
    }
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        dispatch(createArticle(article));
    };

    return (
        <form onSubmit={handleSubmit}>
            <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Titre" />
            <textarea value={snippet} onChange={(e) => setContent(e.target.value)} placeholder="Contenu"></textarea>
            <button type="submit">Créer</button>
        </form>
    );
}

export default CreateArticle;
