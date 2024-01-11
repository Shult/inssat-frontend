import React, {useEffect, useState} from 'react';
import {Row} from "react-bootstrap";

import ArticleCreation from "../../_components/Article/ArticleCreation/ArticleCreation";
import Button from '../../_components/Clickable/Button';
import Modal from "../../_components/Modal/Modal";

import {Article} from '../../_components/Article/Services/interfacesArticles';
import {deleteArticle} from "../../_api/article";
import {getArticles} from "../../_components/Article/ArticleFetchAll";

import './Blog.css'

const Blog = () => {

    const [showChild, setShowChild] = useState(false);
    const [searched, setSearched] = useState("");
    const [articles, setArticles] = useState<any>([]);

    useEffect(() => {
        getArticles().then(result => setArticles(result))
    }, []);

    function getArticlesByTitle(searched: string, articles: Article[]){
        if (searched.length <= 3){ return articles }
        else {
            let newList = []
            for (let i = 0; i < articles.length; i++) {
                if (articles[i].title.toUpperCase().includes(searched.toUpperCase())) {
                    newList.push(articles[i])
                }
            }
            return newList
        }
    }

    return (
        <section className={'line w100'} id={"Blog"}>

            <div className={'line w100 space-between items-center'}>
                <h2 className={'w25'}>Liste des publications</h2>
                <input
                    className={'w50'}
                    type={'text'}
                    name={'searchPostByName'}
                    placeholder={'Recherche par nom...'}
                    onChange={ e => setSearched(e.target.value) }
                />
                <button className={'buttonWhite'} onClick={() => document.location.href = "/article/new"}>
                    + Nouvelle publication
                </button>

                <Modal show={showChild} onClose={() => setShowChild(false)}>
                    <ArticleCreation/>
                </Modal>
            </div>

            <article className={'w100'}>
                <table className={'w100 txtCenter'}>
                    <thead>
                    <tr>
                        <th>
                            <input type={'checkbox'}
                                   id={'mainCheckBox'}
                                   onClick={selectOrDisselectAll}
                            />
                        </th>
                        <th>Titre</th>
                        <th>Status</th>
                        <th>Date de création</th>
                    </tr>
                    </thead>
                    <tbody>
                    {getArticlesByTitle(searched, articles).map(article => (
                        <tr>
                            <td>
                                <input
                                    type={'checkbox'}
                                    name={'BlogCheckbox'}
                                    value={article.id}
                                />
                            </td>
                            <td>{article.title}</td>
                            <td>{article.status}</td>
                            <td>{article.publishDate}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </article>

            <Row>
                <Button className={'buttonError'}
                        name={'DeleteAllPosts'}
                        content={'Tout supprimer'}
                        onclick={deleteAllSelected}
                />
            </Row>
        </section>
    )


    function selectOrDisselectAll() {
        const mainCheckbox = document.getElementById('mainCheckBox');
        const checkboxes = document.getElementsByName('BlogCheckbox');

        if ((mainCheckbox as HTMLInputElement).checked) {
            for (let i = 0; i < checkboxes.length; i++) {
                (checkboxes[i] as HTMLInputElement).checked = true
            }
        } else {
            for (let i = 0; i < checkboxes.length; i++) {
                (checkboxes[i] as HTMLInputElement).checked = false
            }
        }
    }

    function deleteAllSelected() {
        const checkboxes = document.getElementsByName('BlogCheckbox');
        for (const checkbox of checkboxes) {
            if ((checkbox as HTMLInputElement).checked) {
                const id = checkbox.getAttribute("value")
                if (id !== null){
                    deleteArticle(id)
                }
                else {
                    console.log("id null")
                }
            }
        }
    }
}
export default Blog
