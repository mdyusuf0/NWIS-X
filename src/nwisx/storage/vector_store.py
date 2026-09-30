class VectorStore:
    def embed(self, text: str) -> list[float]:
        """Create embeddings."""
        # TODO: Generate embedding using sentence-transformers
        return []
        
    def search(self, vector: list[float], limit: int = 5):
        """Search similar vectors in pgvector."""
        # TODO: Execute pgvector similarity query
        pass
