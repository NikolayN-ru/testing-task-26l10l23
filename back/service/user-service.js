const UserModel = require("../models/user-models");
const bcrypt = require("bcrypt");
const tokenService = require("./token-service");

const UserDto = require("../dto/user-dto");

const ApiError = require("../exceptions/api-error");

class UserService {
  async registration(email, password) {
    const candidate = await UserModel.findOne({ email });
    if (candidate) {
      return ApiError.BadRequest(
        400,
        "Пользователь с таким email уже существует"
      );
    }
    const hashPassword = await bcrypt.hash(password, Number(process.env.SALT));
    const user = await UserModel.create({
      email,
      password: hashPassword,
    });
    const userDto = new UserDto(user);
    const tokens = tokenService.generateTokens({ ...userDto });

    await tokenService.saveToken(userDto.id, tokens.refreshToken);

    return {
      ...tokens,
      user: userDto,
    };
  }

  async login(email, password) {
    const user = await UserModel.findOne({ email });
    if (!user) {
      throw ApiError.BadRequest(400, "Пользователь с таким email ненайден");
    }
    const isPassYes = await bcrypt.compare(password, user.password);
    if (!isPassYes) {
      throw ApiError.BadRequest(400, "Пароль неверный");
    }
    const userDto = new UserDto(user); //для выбрасывания всего ненужного из модели
    const tokens = tokenService.generateTokens({ ...userDto });

    await tokenService.saveToken(userDto.id, tokens.refreshToken);
    return {
      ...tokens,
      user: userDto,
    };
  }

  async logout(refreshToken) {
    const token = await tokenService.removeToken(refreshToken);
    return token;
  }

  async refresh(refreshToken) {
    if (!refreshToken) {
      throw ApiError.UnauthorizedError("токен невалиден");
    }
    const userData = await tokenService.valudateRefreshToken(refreshToken);
    const tokenFromDb = await tokenService.findToken(refreshToken);
    if (!userData || !tokenFromDb) {
      throw ApiError.UnauthorizedError();
    }
    const user = await UserModel.findById(userData.id);
    const userDto = new UserDto(user); //для выбрасывания всего ненужного из модели
    const tokens = tokenService.generateTokens({ ...userDto });

    await tokenService.saveToken(userDto.id, tokens.refreshToken);
    return {
      ...tokens,
      user: userDto,
    };
  }

  async getAllUsers() {
    const users = await UserModel.find();
    return users;
  }

  async findUser(id){
    const user = await UserModel.findById(id)
    return user;
  }
}

module.exports = new UserService();
