FROM python:3.9-slim

WORKDIR /app

# Copy application files
COPY index.html .
COPY script.js .
COPY style.css .
COPY test_todo.py .

# Expose port 8000 for the web application
EXPOSE 8000

# Run the HTTP server
CMD ["python", "-m", "http.server", "8000", "--bind", "0.0.0.0"]
