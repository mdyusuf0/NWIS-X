import networkx as nx

class KnowledgeGraph:
    def __init__(self):
        self.graph = nx.DiGraph()
        
    def add_well_node(self, well_id, metadata):
        self.graph.add_node(well_id, type="well", **metadata)
        
    def add_formation_edge(self, well_id, formation_name, depth):
        formation_node_id = f"fmt_{formation_name}"
        if not self.graph.has_node(formation_node_id):
            self.graph.add_node(formation_node_id, type="formation", name=formation_name)
        self.graph.add_edge(well_id, formation_node_id, depth=depth, type="has_formation")
        
    def add_event_node(self, event_id, event_data):
        self.graph.add_node(event_id, type="event", **event_data)
        self.graph.add_edge(event_data["well_id"], event_id, type="has_event")
        
    def find_similar_wells(self, well_id, top_k=5):
        if not self.graph.has_node(well_id):
            return []
            
        formations = {v for u, v, d in self.graph.out_edges(well_id, data=True) if d.get('type') == 'has_formation'}
        well_scores = {}
        for node, data in self.graph.nodes(data=True):
            if data.get("type") == "well" and node != well_id:
                other_formations = {v for u, v, d in self.graph.out_edges(node, data=True) if d.get('type') == 'has_formation'}
                common = formations.intersection(other_formations)
                if common:
                    well_scores[node] = len(common)
                    
        sorted_wells = sorted(well_scores.items(), key=lambda x: x[1], reverse=True)
        return sorted_wells[:top_k]
        
    def get_well_context(self, well_id):
        if not self.graph.has_node(well_id):
            return {}
        context = {"well": self.graph.nodes[well_id], "formations": [], "events": []}
        for u, v, d in self.graph.out_edges(well_id, data=True):
            if d.get("type") == "has_formation":
                context["formations"].append(self.graph.nodes[v])
            elif d.get("type") == "has_event":
                context["events"].append(self.graph.nodes[v])
        return context
        
    def build_from_db(self, session):
        from src.nwisx.storage.models import Well, FormationTop, DrillingEvent
        self.graph.clear()
        
        wells = session.query(Well).all()
        for w in wells:
            self.add_well_node(w.id, {"name": w.name, "field_name": w.field_name})
            
        formations = session.query(FormationTop).all()
        for f in formations:
            self.add_formation_edge(f.well_id, f.formation_name, f.top_depth)
            
        events = session.query(DrillingEvent).all()
        for e in events:
            self.add_event_node(f"evt_{e.id}", {
                "well_id": e.well_id,
                "event_type": e.event_type,
                "depth": e.depth,
                "severity": e.severity
            })
