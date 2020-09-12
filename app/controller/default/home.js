'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    const { ctx } = this;
    ctx.body = 'api';
  }

  async getArticleList() {
    const sql = 'SELECT article.id as id,' +
      'article.title as title,' +
      'article.introduce as introduce,' +
      'article.add_time as add_time,' +
      'article.view_count as view_count ,' +
      '.type.type_number as type_name ' +
      'FROM article LEFT JOIN type ON article.type_id = type.id';
    const results = await this.app.mysql.query(sql);
    this.ctx.body = { data: results };
  }
}

module.exports = HomeController;
