if (process.env.NODE_ENV !== "production") {
    import("dotenv").then((dotenv) => {
        dotenv.config(); // Configuring dotenv during development
    });
}
