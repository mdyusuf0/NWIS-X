import math
from src.nwisx.storage.models import Well, FormationTop

class GeologyAwareTwinSelector:
    def __init__(self):
        pass
        
    def compute_similarity(self, well_a, well_b, formations_a, formations_b):
        fa_names = {f.formation_name for f in formations_a}
        fb_names = {f.formation_name for f in formations_b}
        
        intersection = len(fa_names.intersection(fb_names))
        union = len(fa_names.union(fb_names))
        formation_similarity = intersection / union if union > 0 else 0
        
        td_diff = abs(well_a.total_depth - well_b.total_depth)
        depth_similarity = max(0, 1 - (td_diff / 5000.0))
        
        mud_system_match = 1.0 if well_a.mud_system == well_b.mud_system else 0.0
        
        def haversine(lat1, lon1, lat2, lon2):
            R = 6371
            dlat = math.radians(lat2 - lat1)
            dlon = math.radians(lon2 - lon1)
            a = math.sin(dlat/2)**2 + math.cos(math.radians(lat1)) * math.cos(math.radians(lat2)) * math.sin(dlon/2)**2
            c = 2 * math.atan2(math.sqrt(a), math.sqrt(1-a))
            return R * c
            
        dist = haversine(well_a.latitude, well_a.longitude, well_b.latitude, well_b.longitude)
        distance_score = max(0, 1 - (dist / 100.0))
        
        ya = well_a.spud_date.year if well_a.spud_date else 2000
        yb = well_b.spud_date.year if well_b.spud_date else 2000
        era_score = max(0, 1 - (abs(ya - yb) / 20.0))
        
        total = (0.35 * formation_similarity) + (0.20 * depth_similarity) + (0.15 * mud_system_match) + (0.15 * distance_score) + (0.15 * era_score)
        
        return {
            "total_score": total,
            "formation_match": formation_similarity,
            "structural_match": depth_similarity,
            "mud_match": mud_system_match,
            "era_match": era_score
        }

    def select_twins(self, target_well_id, session, top_k=5):
        target_well = session.query(Well).filter(Well.id == target_well_id).first()
        if not target_well:
            return []
            
        target_formations = session.query(FormationTop).filter(FormationTop.well_id == target_well_id).all()
        
        all_wells = session.query(Well).filter(Well.id != target_well_id).all()
        results = []
        for w in all_wells:
            w_formations = session.query(FormationTop).filter(FormationTop.well_id == w.id).all()
            scores = self.compute_similarity(target_well, w, target_formations, w_formations)
            explanation = self.explain_match(target_well, w, scores)
            results.append((scores["total_score"], w, scores, explanation))
            
        results.sort(key=lambda x: x[0], reverse=True)
        return results[:top_k]
        
    def explain_match(self, target_well, offset_well, score_breakdown):
        reasons = []
        if score_breakdown["formation_match"] > 0.7:
            reasons.append("high geological similarity")
        if score_breakdown["mud_match"] == 1.0:
            reasons.append(f"same {target_well.mud_system} mud system")
        if score_breakdown["era_match"] > 0.8:
            reasons.append("drilled in similar time period")
            
        if not reasons:
            reasons.append("moderate overall similarity")
            
        return f"Selected as twin due to " + " and ".join(reasons) + f" (Score: {score_breakdown['total_score']:.2f})."
