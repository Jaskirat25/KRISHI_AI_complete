FROM python:3.10-slim

# Set environment variables
ENV PYTHONUNBUFFERED=1 \
    PYTHONDONTWRITEBYTECODE=1 \
    PORT=7860 \
    TF_USE_LEGACY_KERAS=1

# Create a secure non-root user
RUN useradd -m -u 1000 user

# Set working directory and permissions
WORKDIR /home/user/app

# Install system build dependencies
RUN apt-get update && apt-get install -y --no-install-recommends \
    build-essential \
    && rm -rf /var/lib/apt/lists/*

# Copy requirements file first to leverage Docker cache
COPY --chown=user requirements.txt .

# Switch to non-root user
USER user

# Install dependencies into user local directory
RUN pip install --no-cache-dir --user -r requirements.txt

# Add user bin to PATH to allow executing installed commands (like uvicorn)
ENV PATH="/home/user/.local/bin:${PATH}"

# Copy the rest of the application files
COPY --chown=user . .

# Expose Hugging Face Space default port
EXPOSE 7860

# Run the application
CMD ["uvicorn", "backend.server:app", "--host", "0.0.0.0", "--port", "7860"]
