import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { UserModel } from "./../models/userModel.js";

const router = express.Router();

//register user
router.post("/register", async (req, res) => {
    try {
        const { username, password } = req.body; // Извлекаем имя пользователя и пароль из тела запроса.

        const user = await UserModel.findOne({ username: username }); // Ищем в базе данных пользователя с таким же именем пользователя.

        if (user) {
            return res.status(409).json({
                message: "User already exists", // Если пользователь уже существует, возвращаем сообщение об этом.
            });
        }

        const hashedPwd = await bcrypt.hash(password, 10); // Хэшируем пароль.

        const newUser = new UserModel({
            // Создаем нового пользователя с именем пользователя и хэшированным паролем.
            username: username,
            password: hashedPwd,
        });

        await newUser.save(); // Сохраняем нового пользователя в базе данных.

        res.status(201).json({
            message: "User registered successfully", // Возвращаем сообщение об успешной регистрации.
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Server error" });
    }
});

//login user
router.post("/login", async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await UserModel.findOne({ username: username });

        if (!user) {
            return res.status(404).json({ message: "User does not exist" });
        }

        const isPwdValid = await bcrypt.compare(password, user.password); // Сравниваем введенный пароль с паролем в базе данных

        if (!isPwdValid) {
            return res.status(401).json({ message: "Username or password is incorrect" });
        }

        const token = jwt.sign({ id: user._id }, "secret"); // Создаем токен, включающий идентификатор пользователя
        res.json({ token, userID: user._id }); // Возвращаем токен и идентификатор пользователя
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Server error" });
    }
});

export { router as usersRouter };

// export const verifyToken = (req, res, next) => {
//     const token = req.headers.authorization;
//     if (token) {
//         jwt.verify(token, "secret", (err) => {
//             if (err) return res.sendStatus(403);
//             next();
//         });
//     } else {
//         res.sendStatus(401);
//     }
// };