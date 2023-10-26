const { Schema, model } = require("mongoose");

/**
 * Схема новости.
 * @class
 */
const NewsSchema = new Schema({
  /**
   * Автор новости.
   * @type {string}
   * @required
   */
  author: { type: String, required: true },

  /**
   * Заголовок новости (уникальный).
   * @type {string}
   * @unique
   * @required
   */
  title: { type: String, unique: true, required: true },

  /**
   * Содержание новости.
   * @type {string}
   * @required
   */
  content: { type: String, required: true },

  /**
   * Фотография новости.
   * @type {string}
   */
  photo: { type: String },

  /**
   * Дата создания новости.
   * @type {Date}
   * @default Date.now
   */
  createdAt: { type: Date, default: Date.now },

  /**
   * Доступная дата новости.
   * @type {Date}
   */
  availableDate: { type: Date },

  /**
   * Активность новости.
   * @type {boolean}
   * @default true
   */
  isActive: { type: Boolean, default: true },

  /**
   * Подписчики новости (ссылки на объекты пользователей).
   * @type {Array<Schema.Types.ObjectId>}
   * @ref "User"
   */
  subscribers: [{ type: Schema.Types.ObjectId, ref: "User" }],

  /**
   * Другие файлы, связанные с новостью.
   * @type {Array<string>}
   */
  otherFiles: [{ type: String }],
});

/**
 * Модель новости.
 * @type {Model}
 */
module.exports = model("News", NewsSchema);
