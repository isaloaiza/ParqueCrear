const jwt = require("jsonwebtoken");
const User = require("../models/user");
const Role = require("../models/Role");
const { SECRET, TOKEN_EXPIRATION } = require("./config");

const signupHandler = async (req, res, next) => {
  try {
    const { username, email, password, roles } = req.body;

    const newUser = new User({
      username,
      email,
      password,
    });

    // Verificar roles
    if (roles) {
      const foundRoles = await Role.find({ name: { $in: roles } });
      newUser.roles = foundRoles.map((role) => role._id);
    } else {
      const defaultRole = await Role.findOne({ name: "user" });
      newUser.roles = [defaultRole._id];
    }

    // Guardar el objeto Usuario en MongoDB
    const savedUser = await newUser.save();

    // Crear un token
    const token = jwt.sign({ id: savedUser._id }, SECRET, {
      expiresIn: TOKEN_EXPIRATION,
    });

    return res.status(200).json({ token });
  } catch (error) {
    next(error);
  }
};

const signinHandler = async (req, res, next) => {
  try {
    // El email en el cuerpo de la solicitud puede ser un email o un nombre de usuario
    const userFound = await User.findOne({ email: req.body.email }).populate(
      "roles"
    );

    if (!userFound) {
      return res.status(400).json({ message: "Usuario no encontrado" });
    }

    const matchPassword = await User.comparePassword(
      req.body.password,
      userFound.password
    );

    if (!matchPassword) {
      return res.status(401).json({
        token: null,
        message: "Contraseña inválida",
      });
    }

    const token = jwt.sign({ id: userFound._id }, SECRET, {
      expiresIn: TOKEN_EXPIRATION,
    });

    res.json({ token });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  signupHandler,
  signinHandler,
};