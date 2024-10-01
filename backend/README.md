# FastAPI

Here, we create a FastAPI application that can analyse insurance documents and answer questions about them. We create 3 endpoints:

1. `/analyse_doc`: Analyse a document and return the analysis.
2. `/status/{task_id}`: Get the status of a task.
3. `/chat/{task_id}`: Chat with the agent.

## Running the application

To run the application, we use Docker and Docker Compose.

```bash
cd ..
docker-compose up --build
```

## Setting up the environment

We need to create a `.env` file in the root of the project with the following variables:

```env
PROJECT_NAME="Insurance Bot"

# Environment: local, staging, production
ENVIRONMENT="local"

# LLM key
ANTHROPIC_API_KEY="YOUR_ANTHROPIC_API_KEY"
```

An example is shown in [.env.example](./.env.example) file.

## Accessing the application

The application will be running on `http://localhost:8000`.

## API Documentation

The API documentation is available on `http://localhost:8000/docs`.
