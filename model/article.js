const connection = require('../db');

class Article {
    constructor() {
        console.log("Article is Ok");
    }

    getArticleList() {
        let sql = 'SELECT article.id as id,' +
            'article.title as title,' +
            'article.introduce as introduce,' +
            "FROM_UNIXTIME(article.add_time,' %Y-%m-%d %H:%i:%s' ) as add_time," +
            'article.view_count as view_count ,' +
            '.type.type_number as type_name ' +
            'FROM article LEFT JOIN type ON article.type_id = type.id';
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
            let sql = 'SELECT article.id as id,' +
                'article.title as title,' +
                'article.introduce as introduce,' +
                'article.article_content as article_content,' +
                "FROM_UNIXTIME(article.add_time,'%Y-%m-%d %H:%i:%s' ) as add_time," +
                'article.view_count as view_count ,' +
                'type.type_number as type_name ,' +
                'type.id as type_id ' +
                'FROM article LEFT JOIN type ON article.type_id = type.id ' +
                'WHERE article.id=' + id;
            connection.query(sql, (err, result) => {
                if (!err) {
                    resolve(result);
                }
            });
        });

    }
}

let article = new Article();
module.exports = article;