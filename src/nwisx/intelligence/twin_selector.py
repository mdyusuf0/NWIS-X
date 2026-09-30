class GeologyAwareTwinSelector:
    def compute_similarity(self, well_a, well_b) -> float:
        """Compute geological similarity between two wells."""
        # TODO: Compute metric based on formation tops, lithology
        return 0.0
        
    def select_twins(self, target_well_id: str, k: int = 5) -> list:
        """Select k-nearest twin wells."""
        # TODO: Retrieve neighbors from DB
        return []
        
    def explain_match(self, match_result) -> str:
        """Provide reasoning for twin selection."""
        # TODO: Generate reasoning string
        return ""
