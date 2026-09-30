import json
from datetime import datetime

class AuditLogger:
    def __init__(self, file_path="audit.log"):
        self.file_path = file_path
        
    def log(self, user: str, action: str, details: dict):
        entry = {
            "timestamp": datetime.utcnow().isoformat(),
            "user": user,
            "action": action,
            "details": details
        }
        with open(self.file_path, "a") as f:
            f.write(json.dumps(entry) + "\n")
