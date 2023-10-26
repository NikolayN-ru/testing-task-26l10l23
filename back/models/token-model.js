/**
 * @module Token
 */

const { Schema, model } = require("mongoose");

/**
 * Схема токена обновления.
 *
 * @class
 * @name TokenSchema
 */
const TokenSchema = new Schema({
  /**
   * Пользователь, связанный с токеном.
   *
   * @type {Schema.Types.ObjectId}
   * @ref {User}
   */
  user: { type: Schema.Types.ObjectId, ref: "User" },

  /**
   * Токен обновления.
   *
   * @type {string}
   * @required - обязателен для заполнения
   */
  refreshToken: { type: String, required: true },
});

/**
 * Модель токена обновления.
 *
 * @class
 * @name Token
 */
module.exports = model("Token", TokenSchema);
