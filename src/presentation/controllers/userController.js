import { request, response } from "express";
import UserManager from "../../domain/managers/userManager.js";
import { createHash } from "../../helpers/dbValidators.js";

export const postUser = async (req = request, res = response) => {
    try {
        const { body } = req;
        const manager = new UserManager();

        const dto = {
            ...body,
            password: await createHash(body.password, 10)
        }
        const user = await manager.create(dto);
        res.send({ status: "sucess", msg: "Usuario creado", user });

    } catch (error) {
        res.status(500).send({ error: error.message })
    }
}