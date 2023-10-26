/**
 * Middleware для аутентификации пользователей по токену доступа.
 * @param {Request} req - Запрос Express.
 * @param {Response} res - Ответ Express.
 * @param {NextFunction} next - Функция для перехода к следующему обработчику.
 */
module.exports = function (req, res, next) {
  try {
    /**
     * Получает заголовок "Authorization" из запроса.
     * @type {string}
     */
    const authorizationHeader = req.headers.authorization;

    /**
     * Если заголовок "Authorization" отсутствует, вызывает ошибку "Пользователь не авторизован".
     */
    if (!authorizationHeader) {
      return next(ApiError.UnauthorizedError());
    }

    /**
     * Разбивает заголовок "Authorization" на две части: "Bearer" и токен доступа.
     * @type {string}
     */
    const accessToken = authorizationHeader.split(" ")[1];

    /**
     * Если токен доступа отсутствует, вызывает ошибку "Пользователь не авторизован".
     */
    if (!accessToken) {
      return next(ApiError.UnauthorizedError());
    }

    /**
     * Проверяет и валидирует токен доступа с использованием сервиса токенов.
     * @type {Object | null} userData - Данные пользователя, связанные с токеном доступа.
     */
    const userData = tokenService.validateAccessToken(accessToken);

    /**
     * Если данные пользователя не найдены, вызывает ошибку "Пользователь не авторизован".
     */
    if (!userData) {
      return next(ApiError.UnauthorizedError());
    }

    /**
     * Устанавливает данные пользователя в объект запроса для последующего использования.
     * @type {Object} req.user - Данные пользователя.
     */
    req.user = userData;

    /**
     * Передает управление следующему обработчику.
     */
    next();
  } catch (e) {
    /**
     * Если произошла ошибка, вызывает ошибку "Пользователь не авторизован".
     */
    return next(ApiError.UnauthorizedError());
  }
};
