const connection = require('../db');

class Article {
    constructor() {
        console.log("Article is Ok");
    }

    getArticleList() {
        let sql = 'select id as id, title as title, ' +
            'article_content as articleContent, article_introduce as articleIntroduce, ' +
            'add_time as addTime, tags as tags from article; ';
        return new Promise((resolve, reject) => {
            connection.query(sql, (err, results) => {
                if (!err) {
                    resolve(results);
                }
            });
        });
    }

    async getArticleById(id) {
        return new Promise((resolve, reject) => {
            let sql = "select id as id, title as title, article_content as articleContent, " +
                "article_introduce as articleIntroduce, add_time as addTime," +
                "tags as tags from article where id = " + id;
            connection.query(sql, (err, result) => {
                if (!err) {
                    resolve(result);
                }
            });
        });
    }

    addNewArticle(data) {
        let articleField = ' (title, article_content, article_introduce, tags, add_time) ';
        let sql = 'insert into article ' + articleField + 'values (';
        for (let index in data) {
            sql += `"${data[index]}",`;
        }
        sql = sql.substring(0, sql.length - 1);
        sql += ");";

        // console.log(sql);
        connection.query(sql, (err, result, field) => {
            if (!err) {
                return true;
            } else {
                console.log(err);
            }
        })
    }
}

let article = new Article();
module.exports = article;