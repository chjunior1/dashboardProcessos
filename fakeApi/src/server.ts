import Fastify from "fastify";
import cors from "@fastify/cors";
import { apiRoutes } from "./routes";

const app = Fastify();

app.register(cors);
app.register(apiRoutes);

app.listen({
    port: 3000
}).then(() => {
    console.log('HTTP server listening on port 3000')
});