const { response } = require("express");
const { generateJWT } = require("../helpers/generateJWT");
const User = require('../models/user');

const postLogin = async (req, res = response) => {
    const { email, password } = req.body;

    try {
        let user = new User({ email });
        user.passwordUser = password;

        if (!email) {
            return res.status(400).json({
                msg: 'Email/Password son obligatorios'
            });
        }
        if (!password) {
            return res.status(400).json({
                msg: 'Email/Password son obligatorios'
            });
        }
        const [register] = await user.getRecordByEmail();
        if (register == null) {
            return res.status(400).json({
                msg: 'Email / Password no son correctos'
            });
        }
        user.idUser = register.id;
        if (register.password != user.passwordUser) {
            return res.status(400).json({
                msg: 'Email / Password no son correctos'
            }); 
        }
        const token= await generateJWT(user.idUser);
        res.json({
            msg: 'Logion ok',
            token
        })
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            msg: 'Hable con el administrador'
        });
    }


}

module.exports = {
    postLogin,
}