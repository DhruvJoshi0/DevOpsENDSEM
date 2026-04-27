FROM python:3.9-slim

WORKDIR /app

# Install Python dependencies
RUN pip install selenium

# Copy application files
COPY index.html .
COPY script.js .
COPY style.css .
COPY test_todo.py .

# Install system dependencies for Chrome/Chromium
RUN apt-get update && apt-get install -y \
    chromium-browser \
    chromium-driver \
    && rm -rf /var/lib/apt/lists/*

# Install HTTP server
RUN pip install python-http-server

# Expose port 8000 for the web application
EXPOSE 8000

# Run the HTTP server
CMD ["python", "-m", "http.server", "8000", "--bind", "0.0.0.0"]
