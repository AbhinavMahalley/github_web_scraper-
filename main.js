let url="https://github.com/topics";
const request = require("request");
const cheerio = require("cheerio");
const getReposPageHtml=require("./reposPage");

request(url,cb);
function cb(error,response,html){
    if(error){
        console.log(error);
    }else if(response.statusCode=='404'){
        console.log("Page not found");
    } else{
        // console.log(html);
        getTopicLinks(html);
    }
}

function getTopicLinks(html){
    let $=cheerio.load(html);
    let linkElemArr=$(".no-underline.d-flex.flex-column.flex-justify-center");

    for(let i=0;i<linkElemArr.length;i++){
        let link=$(linkElemArr[i]).attr("href");
        // console.log(link);
        let topic=link.split("/").pop();
        let fullLink=`https://github.com/${link}`
        // console.log(fullLink);
        getReposPageHtml(fullLink,topic);
    }

}