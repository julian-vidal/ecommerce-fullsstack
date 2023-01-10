const SwaggerOptions = {
  definition: {
      openapi: "3.0.3",
      info: {
          title: "Backend ecommerce",
          description: "This is the final project of the CoderHouse backend bootcamp",
          version: "1.0.0",
          contact: {
              name: "Julian Vidal",
              email: "julianvidal@yopmail.com",
              url: "https://github.com/julian-vidal"
          }
      }
  },
  apis: ["docs/**/*.yaml"]
}

module.exports = SwaggerOptions