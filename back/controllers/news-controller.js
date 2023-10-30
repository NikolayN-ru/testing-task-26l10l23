const newsShema = require("../models/news-model");
const newsService = require("../service/news-service");
const NewsService = require("../service/news-service");
const userService = require("../service/user-service");
const path = require("path");

/**
 * Класс, управляющий контроллером новостей.
 */
class NewsController {
  /**
   * Получает все новости.
   * @param {Request} req - Запрос Express.
   * @param {Response} res - Ответ Express.
   * @param {NextFunction} next - Функция для перехода к следующему обработчику.
   */
  async getAll(req, res, next) {
    try {
      const news = await NewsService.getAllNews();
      res.json(news);
    } catch (e) {
      console.log(e);
    }
  }

  /**
   * Получает новость по её идентификатору.
   */
  async getNewsId(req, res, next) {
    try {
      const newsId = req.params.id;
      const news = await newsShema.findById(newsId);

      if (!news) {
        return res.status(404).json({ message: "Новость не найдена" });
      }

      return res.json(news);
    } catch (e) {
      console.log(e);
      return res.status(500).json({ message: "Ошибка при получении новости" });
    }
  }

  /**
   * Создает новость.
   */
  async createNews(req, res, next) {
    // console.log(req, 'req')
    const author = req.user.id;
    try {
      const { title, content, photo, availableDate } = req.body;
      if (!title || !content) {
        return res.json({
          message: "у новости должен быть заголовок и контент",
        });
      }
      const news = new newsShema({
        title,
        content,
        photo,
        availableDate,
        author,
      });

      await news.save();
      return res.json({ message: "Новость успешно создана", news });
    } catch (e) {
      console.log(e);
      return res.json({ message: "Ошибка при создании новости" });
    }
  }

  /**
   * Обновляет новость.
   */
  async updateNewsContent(req, res, next) {
    try {
      // console.log(req.body, 'req_body')
      const newsId = req.body.post_id;
      const news = await newsShema.findById(newsId);
      // if (news.author.toString() !== req.user.id) {
      //   return res.json({
      //     message: "У вас нет прав на редактирование этой новости",
      //   });
      // }

      news.title = req.body.title;
      news.content = req.body.content;
      await news.save();

      return res.json({ message: "Новость успешно обновлена", news });
    } catch (e) {
      console.log(e);
      return res.json({ message: "Ошибка при обновлении новости" });
    }
  }

  /**
   * Удаляет новость.
   */
  async deleteNews(req, res, next) {
    try {
      return res.json("no");
    } catch (e) {
      console.log(e);
    }
  }

  /**
   * Загружает фото для новости.
   */
  async updateNews(req, res, next) {
    try {
      const idUser = req.body.id;
      const user = await userService.findUser(idUser);
      const newsId = req.body.newsId;
      const news = await newsService.findById(newsId);
      console.log(user, "user", news, "news");
      const file = req.files;
      for (const uploadedFile of Object.values(file)) {
        uploadedFile.mv(
          path.resolve(__dirname, "..", "uploads", uploadedFile.name)
        );
        news.photo = uploadedFile.name;
        await news.save();
      }
      return res.json({ message: "File uploaded successfully" });
    } catch (e) {
      console.log(e);
      return res.status(500).json({ message: "Ошибка при загрузке файла" });
    }
  }
}

module.exports = new NewsController();
