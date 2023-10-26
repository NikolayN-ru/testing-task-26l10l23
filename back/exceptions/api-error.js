/**
 * Класс, представляющий ошибку API.
 */
module.exports = class ApiError extends Error {
  /**
   * Создает новый экземпляр ApiError.
   * @param {number} status - HTTP статус ошибки.
   * @param {string} message - Сообщение об ошибке.
   * @param {Array} errors - Ошибки, связанные с ошибкой (по умолчанию - пустой массив).
   */
  constructor(status, message, errors = []) {
    super(message);

    /**
     * HTTP статус ошибки.
     * @type {number}
     */
    this.status = status;

    /**
     * Ошибки, связанные с ошибкой.
     * @type {Array}
     */
    this.errors = errors;
  }

  /**
   * Возвращает экземпляр ApiError для ошибки "Пользователь не авторизован" (статус 401).
   * @returns {ApiError} Экземпляр ApiError для ошибки "Пользователь не авторизован".
   */
  static UnauthorizedError() {
    return new ApiError(401, "Пользователь не авторизован");
  }

  /**
   * Возвращает экземпляр ApiError для ошибки "Неверный запрос" (статус 400).
   * @param {string} message - Сообщение об ошибке.
   * @param {Array} errors - Ошибки, связанные с ошибкой (по умолчанию - пустой массив).
   * @returns {ApiError} Экземпляр ApiError для ошибки "Неверный запрос".
   */
  static BadRequest(message, errors = []) {
    return new ApiError(400, message, errors);
  }
};
