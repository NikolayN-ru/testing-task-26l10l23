/**
 * @module User
 */

const { Schema, model } = require("mongoose");

/**
 * Схема пользователя.
 *
 * @class
 * @name UserSchema
 */
const UserSchema = new Schema({
  /**
   * Электронная почта пользователя.
   *
   * @type {string}
   * @unique - должна быть уникальна
   * @required - обязательна
   */
  email: { type: String, unique: true, required: true },

  /**
   * Пароль пользователя.
   *
   * @type {string}
   * @required - обязателен
   */
  password: { type: String, required: true },
});

/**
 * Модель пользователя.
 *
 * @class
 * @name User
 */
module.exports = model("User", UserSchema);
