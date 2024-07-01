import swaggerJsDoc from "swagger-jsdoc";
import path, { dirname } from "path";
import { fileURLToPath } from "url";

// Get the directory of the current module
const __dirname = dirname(fileURLToPath(import.meta.url));
//configuration of swagger

const swaggerSpec = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: 'SEGIMED API REST',
            version: '1.0.0'
        },
        servers: [
            {
                url: 'http://localhost:5000/api',
                description: "Sandbox server (uses test data)"
            },
            {
                url: 'https://backend.segimed.com/api',
                description: "Production server (uses live data)"
            }
        ]
    },
    apis: [`${path.join(__dirname, "./utils/swagger/paths/*.yaml")}`]
}


export default swaggerJsDoc(swaggerSpec);
