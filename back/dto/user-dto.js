/**
 * Класс, представляющий DTO (Data Transfer Object) пользователя.
 */
module.exports = class UserDto {
  /**
   * Создает новый экземпляр UserDto.
   * @param {Object} model - Модель пользователя.
   * @param {string} model.email - Email пользователя.
   * @param {string} model._id - Идентификатор пользователя.
   */
  constructor(model) {
    /**
     * Email пользователя.
     * @type {string}
     */
    this.email = model.email;

    /**
     * Идентификатор пользователя.
     * @type {string}
     */
    this.id = model._id;
  }
};
