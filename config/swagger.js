const swaggerJSDoc = require("swagger-jsdoc");
const swaggerUI = require("swagger-ui-express");

const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "User Authentication API",
            version: "1.0.0",
            description: "API for user authentication (Register, Login, Update, Get Current User)",
        },
        servers: [
            {
                url: "http://localhost:3000",
            },
        ],
    },
    apis: ["./routes/UserRoutes.js"], // Path to API documentation
};

const swaggerSpec = swaggerJSDoc(options);

const swaggerDocs = (app) => {
    app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerSpec));
    console.log("Swagger Docs available at /api-docs");
};

module.exports = swaggerDocs;
