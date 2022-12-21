"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const integrations_1 = require("@sentry/integrations");
const Sentry = require("@sentry/node");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    Sentry.init({
        dsn: "https://02dfe9021ae34c2eb9958147410605f8@o4504315562426368.ingest.sentry.io/4504315565768705",
        integrations: [
            new integrations_1.RewriteFrames({
                root: global.__rootdir__,
            }),
        ],
    });
    await app.listen(process.env.PORT || 3000);
}
bootstrap();
//# sourceMappingURL=main.js.map