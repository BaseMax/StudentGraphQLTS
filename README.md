# StudentGraphQLTS - GraphQL-based University/Student System (TypeScript)

StudentGraphQLTS is a GraphQL-based system built with TypeScript that allows universities, students, and professors to interact and manage academic information. This system provides an API to query and manipulate data related to students, professors, courses, and other university-related entities.

## Getting Started

To run the StudentGraphQLTS project locally, follow these steps:

Clone the repository:
```bash
git clone https://github.com/BaseMax/StudentGraphQLTS
```

Navigate to the project directory:
```bash
cd StudentGraphQLTS
```

Install the dependencies:
```bash
npm install
```

Build the project:
```bash
npm run build
```

Start the server:
```bash
npm start
```

Once the server is running, you can access the GraphQL API at `http://localhost:4000/graphql`.

## Configuration

Before running the project, you need to configure the following settings in the .env file:

- `DATABASE_URL`: This is the connection URL for the PostgreSQL database. Replace postgres with your database username and password, and `localhost:5432/student?schema=public` with your database host and port.

- `SECRET_KEY`: Set this to a secure secret key for your application.

- `MAIL_HOST`: The hostname or IP address of the mail server.

- `MAIL_PORT`: The port number for the mail server.

- `MAIL_USER`: The username or email address used to authenticate with the mail server.

- `MAIL_PASSWORD`: The password for the mail server authentication.

## Testing

To run the tests, use the following command:

```shell
npm run test:e2e
```

This will execute the test suite and provide the test results.

## Dependencies

The project relies on the following dependencies:

- `nestjs`: Web framework for Node.js.
- `graphql`: GraphQL implementation for JavaScript.
- `graphql-tools`: Tools for building and manipulating GraphQL schemas.
- `apollo-server-express`: Integration of Apollo Server with Express.
- `typescript`: TypeScript compiler and language tools.

Please ensure that these dependencies are installed before running the project.

## License

This project is licensed under the GPL-3.0 License. Feel free to use and modify the code as per your requirements.

Copyright 2023, Max Base
