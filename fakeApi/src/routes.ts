import { FastifyInstance } from "fastify"
import * as Json from "./util/hearings.json"

export async function apiRoutes(app: FastifyInstance) {
    app.get("/teste", (request) => {
        return "Cheguei aqui !!!!"
    });

    app.get("/json",  (request) => {
        return Json
    });
}