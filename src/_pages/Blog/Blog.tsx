import Button from '../../_components/Clickable/Button';
import Link from '../../_components/Clickable/Link';
import {useDispatch, useSelector} from 'react-redux';
import {Article} from '../../_components/articleCRUD/interfacesArticles';
import {useEffect} from 'react';
import {deleteArticle, getArticles} from '../../_components/articleCRUD/articleActions';
import './Blog.css'

const Blog = () => {
    const articles = useSelector((state: any) => state.articles.articles) as Article[];
    const dispatch = useDispatch();
    useEffect(() => { dispatch(getArticles()); }, [dispatch]);


    return (
        <section className={'line w100'}>

            <div className={'line w100 space-between'}>
                <h2 className={'w50'}>Liste des publications</h2>
                <input
                    className={'w25'}
                    type={'text'}
                    name={'searchPostByName'}
                    placeholder={'Recherche par nom...'}
                />
                <Link
                    className={'buttonWhite'}
                    href={'/newPostEditor'}
                    name={'NewPost'}
                    content={'+ Nouvelle publication'}/>
            </div>

            <article className={'w100'} id={'styleBlogSection'}>
                <table className={'w100 txtCenter'}>
                    <thead>
                    <tr id={'styleBlogThead'}>
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
                    {articles.map(article => (
                        <tr
                            id={'styleBlogTbody'}
                            key={article.id}
                        >
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

                <div className={'line w100 items-center'}>
                    <div className={'w66'}>
                        <Button className={'buttonError'}
                                name={'DeleteAllPosts'}
                                content={'Tout supprimer'}
                                onclick={deleteAllSelected}
                        />
                    </div>

                    <div className={'line w33 space-around items-center'}>
                        <div className={'line w50 space-around items-center'}>
                            <h6>Publications par page </h6>
                            <select name={'RowPerPage'}>
                                <option value={5}>5</option>
                                <option value={10}>10</option>
                                <option value={20}>20</option>
                            </select>
                        </div>

                        <div className={'line w50 space-around items-center'}>
                            <Button className={"buttonGrey"} content={"<"}/>
                                Page 1/1
                            <Button className={"buttonGrey"} content={">"}/>
                        </div>
                    </div>
                </div>
            </article>
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
                    dispatch(deleteArticle(id))
                }
                else {
                    console.log("id null")
                }
            }
        }
    }
}
export default Blog
