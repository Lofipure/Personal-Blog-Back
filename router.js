const router = require("koa-router")();
const article = require("./model/article");
router.get('/default/getArticleList', async (ctx) => {
    ctx.body = { data: await article.getArticleList() };
});

router.get('/default/getArticleById', async (ctx) => {
    ctx.body = { data: await article.getArticleById(ctx.query.id) };
});
router.post('/admin/addNewArticle', async (ctx) => {
    new Promise((resolve, reject) => {
        let postData = '';
        ctx.req.on('data', data => {
            postData += data;
        });
        ctx.req.on('end', () => {
            resolve(JSON.parse(postData));
        })
    }).then(data => {
        ctx.body = article.addNewArticle(data);
    });
    ctx.body = true;
});
router.get('/admin/getArticleList', async (ctx) => {
    ctx.body = { data: await article.getArticleList() };
});
router.get('/admin/deleteArticleListById', async (ctx) => {
    ctx.body = article.deleteArticleById(ctx.query.id);
});
module.exports = router;