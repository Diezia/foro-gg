import { Action, ApiController, Controller } from "@miracledevs/paradigm-express-webapi";

@Controller({ route: "/api/echo" })
export class EchoController extends ApiController {
    constructor() {
        super();
    }

    @Action({ route: "/" })
    async get(): Promise<void> {
        try {
            this.httpContext.response.status(200).send("ta to okei");
            return;
        } catch {
            this.httpContext.response.sendStatus(500);
            return;
        }
    }
    @Action({ route: "/" })
    async post(): Promise<void> {
        try {
            this.httpContext.response.status(200).send(this.httpContext.request.body);
            return;
        } catch {
            this.httpContext.response.sendStatus(500);
            return;
        }
    }
}
