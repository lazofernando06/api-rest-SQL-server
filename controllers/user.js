const { request, response } = require('express');
const { User } = require('../models/user');

const userGet = async (req = request, res = response) => {
    const user = new User();
    const result = await user.getUserList();

    res.json({
        msg: "put API - s",
        result
    });
    /*
    const {
        id,
        name="",
        description="",
        price="",
        stars="",
        people="",
        selected_people="",
        img="",
        location="",
        created_at="",
        updated_at
    } = req.query;
    res.json(
        {
            msg: "get API - controlador",
            id,
            name,
            description,
            price,
            stars,
            people,
            selected_people,
            img,
            location,
            created_at,
            updated_at,

        }


    );
    */
}

const userGet_x_id = async (req = request, res = response) => {
    const { id = 0, email = '' } = req.query;
    console.log('id',id,'email',email);
    const user = new User(id, email);
    const result = await user.getUserItem();
    res.json({
        msg: "get API - item",
        result
    });

}
const userPost = (req, res = response) => {
    const body = req.body;
    res.json(
        {
            msg: "post API - controlador",
            // body
        }
    );
}




const guestPut = (req, res = response) => {
    const { id } = req.params;
    res.json(
        {
            msg: "put API - controlador",
            id
        }
    );
}
const guestPatch = (req, res = response) => {
    res.json(
        {
            msg: "patch API - controlador"
        }
    );
}
const guestDelete = (req, res = response) => {

    res.json(
        {
            msg: "delete API - controlador"
        }

    );
}

module.exports = {
    userGet,
    userGet_x_id,
    userPost,
    guestPut,
    guestDelete,
}