module.exports = {
    name: "todo-app",
    script: "serve",
    env: {
        PM2_SERVE_PATH: "./build",
        PM2_SERVE_PORT: 80,
        PM2_SERVE_SPA: "true",
    },
};

