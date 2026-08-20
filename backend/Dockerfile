# Stage 1: Builder - install dependencies
FROM python:3.12-slim AS builder

# Install uv
COPY --from=ghcr.io/astral-sh/uv:latest /uv /uvx /bin/

# Set environment variables for faster builds
ENV UV_COMPILE_BYTECODE=1 \
  UV_LINK_MODE=copy

WORKDIR /app

# Copy dependency files first to leverage Docker cache
COPY backend/pyproject.toml backend/uv.lock ./
RUN --mount=type=cache,target=/root/.cache/uv \
  uv sync --frozen --no-install-project --no-dev

# Copy the rest of the project
COPY backend/ .
RUN --mount=type=cache,target=/root/.cache/uv \
  uv sync --frozen --no-dev

# Stage 2: Final runtime image
FROM python:3.12-slim

# Create a non-root user
RUN useradd -m -u 1000 appuser
USER appuser

WORKDIR /app

# Copy the virtual environment from the builder stage
COPY --from=builder --chown=appuser:appuser /app/.venv /app/.venv

# Make the virtual environment's executables available in PATH
ENV PATH="/app/.venv/bin:$PATH"

# Command to run your application
# CHANGE THIS: Replace with your app's entry point
CMD ["python", "-m", "src/ai_chatbot/main:app"]