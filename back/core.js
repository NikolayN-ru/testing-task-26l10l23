/**
 * Загружаем конфигурацию из файла .env
 */
require("dotenv").config();

const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const router = require("./route/index");
const errorMessage = require("./miidlewares/error-middleware");
const fileUpload = require("express-fileupload");

// Получаем порт из переменных окружения
const PORT = process.env.PORT;

// Создаем экземпляр Express приложения
const app = express();

const corsOptions = {
  // Определяем настройки CORS
  origin: process.env.CORS,
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  // credentials: true, // Разрешаем использование учетных данных в запросах
};

// Регистрируем middleware для обработки файлов (загрузка файлов)
app.use(fileUpload({}));

// Регистрируем middleware для разбора JSON-запросов
app.use(express.json());

// Регистрируем middleware для обработки куки в запросах
app.use(cookieParser());

// Регистрируем middleware CORS с настройками из corsOptions
app.use(cors(corsOptions));

// Регистрируем маршрут /api для обработки запросов, используя маршруты из модуля router
app.use("/api", router);

// Регистрируем статический маршрут /uploads для обслуживания файлов из папки /uploads
app.use("/uploads", express.static(__dirname + "/uploads"));

// Регистрируем мидлваир
app.use(errorMessage);

/**
 * Асинхронная функция start для подключения к MongoDB и запуска сервера
 */
const start = async () => {
  try {
    // Подключаемся к MongoDB с использованием параметров из переменных окружения
    await mongoose.connect(process.env.MONGO, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    // Запускаем сервер на указанном порту
    app.listen(PORT, () =>
      console.log(`server start ${5070} ${process.env.MONGO}`)
    );
  } catch (e) {
    console.log(e);
  }
};

// Вызываем функцию start для запуска сервера
start();
