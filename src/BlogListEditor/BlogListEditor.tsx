import Button from "../_components/Buttons/Button";
import "./BlogListEditor.css"
import Link from "../_components/Links/Link";
import {useDispatch, useSelector} from "react-redux";
import {Article} from "../_interfaces/interfacesArticles";
import {useEffect} from "react";
import {getArticles} from "../_actions/articleActions";

const BlogListEditor = () => {
    const articles = useSelector((state: any) => state.articles.articles) as Article[];

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getArticles());
    }, [dispatch]);


    return (
        <section className={"line w100"}>

            <div className={"line w100 space-between"}>
                <h2 className={"w50"}>Liste des publications</h2>
                <input className={"w25"} type={"text"} name={"searchPostByName"} placeholder={"Recherche par nom..."}/>
                <Button className={"buttonWhite"} href={"/newPostEditor"} name={"NewPost"} content={"+ Nouvelle publication"}/>
            </div>

            <article className={"w100"} id={"divTable"}>
                <table className={"w100"}>
                    <thead>
                    <tr>
                        <th><input type={'checkbox'}/></th>
                        <th>UUID</th>
                        <th>Titre</th>
                        <th>Status</th>
                        <th>Date de création</th>
                        <th>Mis à jour le</th>
                        <th></th>
                    </tr>
                    </thead>
                    <tbody>
                    {articles.map(article => (
                        <tr>
                            <td><input type={'checkbox'} value={article.id}/></td>
                            <td>{article.id}</td>
                            <td>{article.title}</td>
                            <td>{article.status}</td>
                            <td>{article.publishDate}</td>
                            <td>{article.lastUpdate}</td>
                            <td><Link content={"..."}/></td>
                        </tr>
                    ))}
                    </tbody>
                </table>

                <div className={"line w100 items-center"}>

                    <div className={"w75"}>
                        <Button className={"buttonError"} href={"/delAllPosts"} name={"DeleteAllPosts"} content={"Tout supprimer"}/>
                    </div>

                    <div className={"line w25"}>
                        <div className={"line w50"}>
                            <h6>Publications par page</h6>
                            <select name={"RowPerPage"}>
                                <option value={5}>5</option>
                                <option value={10}>10</option>
                                <option value={20}>20</option>
                            </select>
                        </div>

                        <div className={"line w50"}>&lt x &gt</div>
                    </div>
                </div>
            </article>
        </section>
    )
}
export default BlogListEditor
