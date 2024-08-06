import userRegisterHandler from "../../handlers/user/userRegisterHandler.js";

const userRegisterController = async (req, res) => {
  try {
    const frontendUrl = req.headers.referer;
    const newUser = await userRegisterHandler(req.body, frontendUrl);
    return res.status(201).json({
      msg: "La cuenta fue registrada correctamente. Por favor activa tu email para entrar!",
      id: newUser.id,
    });
  } catch (error) {
    return res.status(error.errorCode).json({ error: error.message });
  }
};

export default userRegisterController;
