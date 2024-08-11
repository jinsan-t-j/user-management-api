# User Management Microservice with Caching and Search

A microservice for managing users including caching, support for searching users, and allow users to block other users so that ignored users are not visible in search results using PostgreSQL, Sequelize and redis.

## Prerequisites

Before running the application, ensure you have the following installed:

- [Docker](https://docs.docker.com/get-docker/) (if using DevContainers)
- [Node.js](https://nodejs.org/) (v22.x recommended)
- [npm](https://www.npmjs.com/)
- [PostgreSQL](https://www.postgresql.org/download/) (if not using Docker)
- [Redis](https://redis.io/download) (if not using Docker)

## Installation

### Using DevContainers (Recommended)

1. **Clone the repository**:

    ```bash
    git clone https://github.com/jinsan-t-j/user-management-api.git
    cd user-management-api
    ```

2. **Open the project in VSCode**:

    If you're using VSCode, open the project folder. The DevContainer should automatically prompt you to open it within a container. If not, press `Ctrl+Shift+P` and search for `Dev Containers: Reopen in Container`.

    This will automatically install all dependencies, including PostgreSQL and Redis, within the container.

### Manual Installation

If you prefer to set up the environment manually:

1. **Clone the repository**:

    ```bash
    git clone https://github.com/jinsan-t-j/user-management-api.git
    cd user-management-api
    ```

2. **Install PostgreSQL and Redis**:

    Install and configure PostgreSQL and Redis on your local machine. Make sure they are running.

3. **Copy environment variables**:

    Copy the example environment file and update it with your configuration.

    ```bash
    sudo cp .env.example .env
    ```

### After Installation

1. **Install Node.js dependencies**:

    ```bash
    npm install
    ```

2. **Run database migrations**:

    ```bash
    npx sequelize-cli db:migrate
    ```

3. **Seed the database**:

    ```bash
    npx sequelize-cli db:seed:all
    ```

## Running the Application

To start the application in development mode:

```bash
npm run start:dev
```

The application should now be running. Access it in your browser

## Testing the Application

To start the application in development mode:

```bash
npm run test:e2e
```

## Additional Notes

- Ensure that your .env file is properly configured with the necessary environment variables before running the application.

- If you encounter any issues with database connectivity, double-check your PostgreSQL and Redis configurations in the .env file.

- For Docker-based installations, make sure Docker is running and properly configured on your system.