const NewsModel = require("../models/news-model");

class NewsService {
  async getAllNews() {
    const news = await NewsModel.find();
    return news;
  }

  async findById(id) {
    const newsItem = await NewsModel.findById(id);
    return newsItem;
  }
}

module.exports = new NewsService();
