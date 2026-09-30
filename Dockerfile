FROM python:3.10-slim

WORKDIR /app

RUN apt-get update && apt-get install -y     build-essential     libpq-dev     tesseract-ocr     libmupdf-dev     && rm -rf /var/lib/apt/lists/*

COPY pyproject.toml requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt

COPY src/ ./src/

CMD ["uvicorn", "nwisx.main:app", "--host", "0.0.0.0", "--port", "8000"]
