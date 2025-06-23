# Use official Python image
FROM python:3.11-slim

# Set working directory
WORKDIR /app

# Install dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy the rest of the backend code
COPY . .

# Copy startup script and make it executable
COPY start.sh /start.sh
RUN chmod +x /start.sh

# Expose FastAPI port
EXPOSE 8000

# Use the startup script
CMD ["/start.sh"]
