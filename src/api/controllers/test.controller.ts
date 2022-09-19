import { Action, ApiController, Controller } from "@miracledevs/paradigm-express-webapi";

@Controller({ route: "/" })
export class TestController extends ApiController {
    constructor() {
        super();
    }

    @Action({ route: "/" })
    get() {
        try {
            this.httpContext.response.status(200).send("home");
            return;
        } catch {
            this.httpContext.response.sendStatus(500);
            return;
        }
    }
}
