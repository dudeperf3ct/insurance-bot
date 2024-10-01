FROM python:3.12-slim-bullseye

# Install uv.
COPY --from=ghcr.io/astral-sh/uv:latest /uv /bin/uv

# Copy the application into the container.
COPY . /app

# Install the application dependencies.
WORKDIR /app
RUN uv sync --frozen --no-cache

# Expose the port the app runs on
EXPOSE 8000

# Run the application.
CMD ["/app/.venv/bin/fastapi", "run", "app/main.py"]
