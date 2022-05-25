const { request,
    response } = require('express');

const guestGet = (req = request, res = response) => {
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
}
const guestPost = (req, res = response) => {
    const body = req.body;
    res.json(
        {
            msg: "post API - controlador",
            body
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
    guestPost,
    guestGet,
    guestPatch,
    guestPut,
    guestDelete,
}