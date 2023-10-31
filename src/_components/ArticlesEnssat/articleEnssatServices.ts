import { xml2json } from 'xml-js';
import {CategoryType, Article} from "./articleEnssatInterfaces";

export const fetchRSSFeed = async () => {

    // Avoid CORS policy
    const url = "https://cors-anywhere.herokuapp.com/blog.enssat.fr/feeds/posts/default";

    // Classical RSS Flux
    //const url = "http://blog.enssat.fr/feeds/posts/default";

    // Reponse from RSS Flux
    const response = await fetch(url); // Get the data from the rss flux
    const text = await response.text(); // Response to string
    let textJson = JSON.parse(xml2json(text, { compact: true }));

    // Full Json from ENSSAT rss flux
    let jsonEnssatArticles = JSON.stringify(textJson, null, 2);
    //console.log("Full json : "+jsonEnssatArticles);

    //console.log("Get the information about the website article")
    let title = textJson.feed.title._text;
    //console.log("Title = "+ title);
    let subtitle = textJson.feed.subtitle._text;
    //console.log("Subtitle = "+ subtitle);
    let totalResults = textJson.feed["openSearch:totalResults"]["_text"];
    let startIndex = textJson.feed["openSearch:startIndex"]["_text"]
    let itemsPerPage = textJson.feed["openSearch:itemsPerPage"]["_text"];
    //console.log("totalResults = "+totalResults+" | startIndex = "+startIndex+" | itemsPerPage = "+itemsPerPage);

    // Get all the categories
    let feedCategory = textJson.feed.category;
    //console.log("Category 0 : "+feedCategory[0]._attributes.term);

    //console.log("Get the information of the last post.")
    // Example : Get the information of the last post.
    let post = textJson.feed.entry;
    //console.log("Title = "+post[0].title._text);
    //console.log("Published date = "+post[0].published._text);
    //console.log("Link = "+post[0].link[2]._attributes.href);
    //console.log("Content = "+post[0].content._text);    // HTML
    //console.log("Author = "+post[0].author.name._text);

    // //console.log("Category = "+post[0].category);  // List of all the post's categories
    const categories = post[0].category;
    const terms = categories.map((item: CategoryType) => item._attributes.term);
    //console.log("Categories:", terms);

    const infoEnssat = {
        info: {
            totalResults: parseInt(totalResults, 10),
            startIndex: parseInt(startIndex, 10),
            itemsPerPage: parseInt(itemsPerPage, 10),
        },
        articles: post.map((entry: Article) => ({
            title: entry.title,
            published: entry.published,
            link: entry.link,
            content: entry.content,
            author: entry.author,
            category: entry.category.map((item: CategoryType) => item),
        })),
        category: feedCategory.map((cat: CategoryType) => ({
            term: cat,
            scheme: cat
        }))
    };

    console.log(infoEnssat);

    return infoEnssat
}
