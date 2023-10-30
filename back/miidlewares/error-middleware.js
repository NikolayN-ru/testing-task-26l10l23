const ApiError = require('../exceptions/api-error');
const tokenService = require('../service/token-service');

/**
 * Middleware для обработки ошибок.
 * @param {Error} err - Объект ошибки.
 * @param {Request} req - Запрос Express.
 * @param {Response} res - Ответ Express.
 * @param {NextFunction} next - Функция для перехода к следующему обработчику.
 */
module.exports = function (err, req, res, next) {
  console.log(err);

  /**
   * Если ошибка является экземпляром ApiError, отправляет клиенту соответствующий статус и сообщение об ошибке.
   */
  if (err instanceof ApiError) {
    return res
      .status(err.status)
      .json({ message: err.message, errors: err.errors });
  }

  /**
   * Если ошибка не является экземпляром ApiError, отправляет клиенту статус 500 и сообщение о непредвиденной ошибке сервера.
   */
  return res.status(500).json({ message: "Непредвиденная ошибка сервера" });
};
