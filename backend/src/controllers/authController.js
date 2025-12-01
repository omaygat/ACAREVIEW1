import User from "../models/User.js";

export const register = async (req, res) => {
  console.log("BODY QUE LLEGA AL BACKEND:", req.body); // <-- debug
  try {
    const { name, lastName, email, password, role } = req.body;

    if (!name || !lastName || !email || !password) {
      return res.status(400).json({ error: "Todos los campos son obligatorios" });
    }

    const exists = await User.findOne({ email });
    if (exists) return res.status(400).json({ error: "El correo ya existe" });

    const user = await User.create({ name, lastName, email, password, role });

    res.json({
      message: "Usuario registrado correctamente",
      user: {
        id: user._id,
        name: user.name,
        lastName: user.lastName,
        email: user.email,
        role: user.role
      }
    });

  } catch (error) {
    console.error("ERROR REGISTER:", error);
    res.status(500).json({ error: "Error registrando usuario" });
  }
};

export const login = async (req, res) => {
  console.log("BODY QUE LLEGA AL BACKEND:", req.body); // <-- debug
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ error: "Correo no encontrado" });

    const valid = await user.comparePassword(password);
    if (!valid) return res.status(401).json({ error: "Contraseña incorrecta" });

    res.json({
      message: "Login correcto",
      user: {
        id: user._id,
        name: user.name,
        lastName: user.lastName,
        email: user.email,
        role: user.role
      }
    });

  } catch (error) {
    console.error("ERROR LOGIN:", error);
    res.status(500).json({ error: "Error en login" });
  }
};
