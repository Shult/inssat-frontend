// Services for what ever touching to the article

// ArticleEnssatToArticleDetails
import {Article} from "../ArticlesEnssat/articleEnssatInterfaces";
import {ArticleDetails} from "./interfacesArticles";

export function SortArticleByDate(article : ArticleDetails[]){
    article.sort((a, b) => {
        const dateA = new Date(a.published_at);
        const dateB = new Date(b.published_at);
        return dateB.getTime() - dateA.getTime(); // Sorting from most recent to oldest
    });
}
export function ArticleInssatToArticleDetails(articleInssat : ArticleDetails[], articleDetails : ArticleDetails[]){
    let i = 0;
    while (articleInssat.length > i){
        articleDetails.push(articleInssat[i]);
        i++;
    }
}
export function ArticleEnssatToArticleDetails(articlesEnssat : Article[], articleDetails : ArticleDetails[]){
    articlesEnssat.forEach((article, index) => {
        if (article.title && typeof article.title._text === 'string') {
            // Create a new article object and push it into allArticles
            const newArticle : ArticleDetails = {
                id: index,
                title: article.title._text,
                description: article.content._text,
                thumbnail: article.content._text,
                author_id: article.author.name._text,
                published_at: article.published._text,
                article_tags: article.category.map(tag=> (
                    tag._attributes.term
                )),
                category: {
                    title: "cat0"
                },
                author: {
                    ID: index.toString(),
                    FIRST_NAME: article.author.name._text,
                    LAST_NAME: article.author.name._text
                },
                fromEnssat: true,
                link: article.link[2]._attributes.href
            };
            articleDetails.push(newArticle);
        }
    });
}

// Used to load the image, because I faced an issue when I past directly the images
export function loadImage(imagePath: string) {
    try {
        return require("../../../../public/_assets/"+imagePath);
    } catch (err) {
        return '';
    }
}

// Format the date to be easily readable
export function formatDateInFrench(dateString: string): string {
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = {
        weekday: 'long',
        day: '2-digit',
        month: 'long',
        year: 'numeric'
    };

    const dateFormatee = date.toLocaleDateString('fr-FR', options);
    const heure = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');

    return `Publiée le ${dateFormatee} à ${heure}h${minutes}`;
}

// Get the image from the xml from the RSS flux of the ENSSAT
export const extractFirstImageLink = (htmlString : any) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlString, "text/html");
    const imgElement = doc.querySelector("a");
    // console.log("imgElement = " + imgElement)
    if (imgElement) {
        return imgElement.href;
    }
    return loadImage("_user/Unknown.png");
}