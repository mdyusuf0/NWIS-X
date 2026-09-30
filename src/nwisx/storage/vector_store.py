import numpy as np
from collections import defaultdict

class VectorStore:
    def __init__(self):
        self.documents = {}
        self.vocab = {}
        self.doc_vectors = {}
        
    def embed_text(self, text):
        words = str(text).lower().split()
        tf = defaultdict(int)
        for w in words:
            tf[w] += 1
            if w not in self.vocab:
                self.vocab[w] = len(self.vocab)
                
        vec = np.zeros(len(self.vocab))
        for w, count in tf.items():
            idx = self.vocab[w]
            vec[idx] = count
        return vec
        
    def add_document(self, doc_id, text, metadata):
        vec = self.embed_text(text)
        self.documents[doc_id] = {"text": text, "metadata": metadata}
        
        for existing_id in self.doc_vectors:
            if len(self.doc_vectors[existing_id]) < len(self.vocab):
                self.doc_vectors[existing_id] = np.pad(self.doc_vectors[existing_id], (0, len(self.vocab) - len(self.doc_vectors[existing_id])))
                
        self.doc_vectors[doc_id] = vec
        
    def search(self, query, top_k=5):
        if not self.documents:
            return []
        q_vec = self.embed_text(query)
        if len(q_vec) < len(self.vocab):
            q_vec = np.pad(q_vec, (0, len(self.vocab) - len(q_vec)))
            
        results = []
        for doc_id, doc_vec in self.doc_vectors.items():
            if len(doc_vec) < len(q_vec):
                doc_vec = np.pad(doc_vec, (0, len(q_vec) - len(doc_vec)))
            elif len(q_vec) < len(doc_vec):
                q_vec = np.pad(q_vec, (0, len(doc_vec) - len(q_vec)))
                
            norm_doc = np.linalg.norm(doc_vec)
            norm_q = np.linalg.norm(q_vec)
            if norm_doc == 0 or norm_q == 0:
                sim = 0.0
            else:
                sim = np.dot(doc_vec, q_vec) / (norm_doc * norm_q)
            results.append((sim, doc_id, self.documents[doc_id]))
            
        results.sort(key=lambda x: x[0], reverse=True)
        return results[:top_k]
        
    def clear(self):
        self.documents.clear()
        self.vocab.clear()
        self.doc_vectors.clear()
