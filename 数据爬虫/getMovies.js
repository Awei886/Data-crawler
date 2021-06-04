/**
 * 得到所有电影的html字符串
 */

const axios = require("axios");
const cheerio = require('cheerio');
async function getMoviesHtml() {
    const resp = await axios.get("https://movie.douban.com/chart");
    return resp.data;
}

async function getMoviesData() {
    const html = await getMoviesHtml();
    const $ = cheerio.load(html);
    var trs = $("tr.item");
    var movies = []
    for (let i = 0; i < trs.length; i++) {
        var tr = trs[i];
        var m = await getMovie($(tr));
        movies.push(m)
    }
    return movies
}

function getMovie(tr) {
    var names = tr.find("div.pl2 a").text().replace(/\s/g, "").split("/")[0];
    var imgSrc = tr.find("a.nbg img").attr("src");
    var detail = tr.find("div.pl2 p.pl").text();

    return {
        names,
        imgSrc,
        detail
    }
}


module.exports = getMoviesData;