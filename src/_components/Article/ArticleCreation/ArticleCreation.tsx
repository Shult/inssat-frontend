import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createArticle } from '../Services/articleActions';
import {Article} from "../Services/interfacesArticles";
import articlesData from '../../../_data/articles.json';
import "./ArticleCreation.css"

interface ArticleCreationProps {
    onContentChange?: () => void; // Le '?' signifie que cette prop est optionnelle
}

const ArticleCreation: React.FC<ArticleCreationProps> = () => {
    const dispatch = useDispatch();
    const [title, setTitle] = useState('');
    const [snippet, setSnippet] = useState('');
    const [content, setContent] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [link, setLink] = useState('');
    const [tags, setTags] = useState('');
    const [publishDate, setPublishDate] = useState('');
    const [lastUpdate, setLastUpdate] = useState('');
    const [status, setStatus] = useState('');
    const [author, setAuthor] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        console.log("Creation of the new article");
        console.log("e = " + e.type);
        e.preventDefault();
        const articleToSubmit = {
            id: (Math.random() * 1000).toString(), // just a placeholder for id
            title,
            imageUrl,
            snippet,
            content,
            link,
            tags: tags.split(',').map(tag => tag.trim()), // assuming tags are comma separated
            publishDate,
            lastUpdate,
            status
        };

        [...articlesData].push(articleToSubmit); // Adding new article to the array
        dispatch(createArticle(articleToSubmit as Article));
        console.log("Article to add :"+
            "\nTitle : " + articleToSubmit.title +
            "\npublishDate : " + articleToSubmit.publishDate +
            "\nlastUpdate : " + articleToSubmit.lastUpdate +
            "\nstatus : " + articleToSubmit.status
        );

        // Serveur Express temporaire
        fetch('http://localhost:5000/create-article', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(articleToSubmit),
        })
            .then(response => response.json())
            .then(data => {
                console.log(data.message);
            });
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Créer une nouvelle publication</h2>

            <div className="input-group">
                <input className={"form-control"} type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Titre" />
            </div>

            <label><b>Miniature</b></label>
            <div className="input-group">
                <input className={"form-control"} value={link} onChange={(e) => setLink(e.target.value)} placeholder="Lien" />
            </div>

            <label> (1-2 lignes maximum)</label>
            <div className="input-group">
                <span className="input-group-text">Résumé</span>
                <textarea className={"form-control"} value={snippet} onChange={(e) => setSnippet(e.target.value)} placeholder="Elle sera utilisée dans la liste des publications"></textarea>
            </div>

            <div className="image-upload-group">
                <div className="image-upload-box">
                    {/*Solution temporarire en attendant que le back créer l'upload d'image*/}
                    <input className={"form-control"} value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} placeholder="URL de l'image" />
                </div>
            </div>

            <label><b>Article</b></label>

            <div className="input-group">
                <span className="input-group-text">Contenue</span>
                <textarea className={"form-control"} value={content} onChange={(e) => setSnippet(e.target.value)} placeholder="Contenu"></textarea>
            </div>

            <div className="side-content">
                <div className="categories">
                    <label>Categories</label>
                    {/* List of categories */}
                </div>
                <div className="tags">
                    <label>Tags</label>
                    <input className={"form-control"} value={tags} onChange={(e) => setTags(e.target.value)} placeholder="Tags (séparés par des virgules)" />
                    {/* List of tags */}
                </div>
            </div>

            <div className="buttons-group">
                <input type="date" value={publishDate} onChange={(e) => setPublishDate(e.target.value)} placeholder="Date de publication" />
                <input type="date" value={lastUpdate} onChange={(e) => setLastUpdate(e.target.value)} placeholder="Dernière mise à jour" />
                <select value={status} onChange={(e) => setStatus(e.target.value)}>
                    <option value="published">Publié</option>
                    <option value="draft">Brouillon</option>
                </select>
            </div>


            <div className="buttons-group">
                <button className={"btn btn btn-outline-danger"}>Supprimer</button>
                <button className={"btn btn-outline-warning"}>Brouillon</button>
                <button className={"btn btn-outline-primary"} type="submit" onClick={() => createArticle}>Créer</button>
            </div>

            {/*Basic example to create an article*/}
            {/*<input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Titre" />*/}
            {/*<input value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} placeholder="URL de l'image" />*/}
            {/*<textarea value={snippet} onChange={(e) => setSnippet(e.target.value)} placeholder="Contenu"></textarea>*/}
            {/*<input value={link} onChange={(e) => setLink(e.target.value)} placeholder="Lien" />*/}
            {/*<input value={tags} onChange={(e) => setTags(e.target.value)} placeholder="Tags (séparés par des virgules)" />*/}
            {/*<input type="date" value={publishDate} onChange={(e) => setPublishDate(e.target.value)} placeholder="Date de publication" />*/}
            {/*<input type="date" value={lastUpdate} onChange={(e) => setLastUpdate(e.target.value)} placeholder="Dernière mise à jour" />*/}
            {/*<select value={status} onChange={(e) => setStatus(e.target.value)}>*/}
            {/*    <option value="published">Publié</option>*/}
            {/*    <option value="draft">Brouillon</option>*/}
            {/*</select>*/}
            {/*<button type="submit">Créer</button>*/}
        </form>
    );
}

export default ArticleCreation;
