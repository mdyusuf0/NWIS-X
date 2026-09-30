class BayesianRiskFusion:
    def __init__(self):
        pass
        
    def fuse(self, prior_prob, live_signal_score, mud_window_margin):
        likelihood = live_signal_score
        if likelihood == 0:
            likelihood = 0.1
            
        adjusted_prior = prior_prob * (1.5 if mud_window_margin < 0.5 else 0.8)
        adjusted_prior = min(0.9, adjusted_prior)
        
        posterior = (likelihood * adjusted_prior) / ((likelihood * adjusted_prior) + ((1 - likelihood) * (1 - adjusted_prior)))
        return posterior
        
    def calibrate(self, raw_prob, calibration_factor=1.0):
        import math
        logit = math.log(raw_prob / (1 - raw_prob + 1e-9))
        calibrated_logit = logit * calibration_factor
        return 1 / (1 + math.exp(-calibrated_logit))
        
    def classify_risk(self, probability):
        if probability > 0.7:
            return 'ALERT'
        elif probability > 0.3:
            return 'WATCH'
        else:
            return 'SAFE'
            
    def generate_risk_summary(self, well_id, current_depth, session):
        from src.nwisx.intelligence.hazard_prior import ExposureNormalisedHazardPrior
        from src.nwisx.intelligence.anomaly_detector import DrillingAnomalyDetector
        
        prior_model = ExposureNormalisedHazardPrior()
        detector = DrillingAnomalyDetector()
        
        priors = prior_model.get_corridor_risk(well_id, current_depth, 100, session)
        
        signals = {
            "torque_values": [100, 105, 120, 150],
            "hookload_values": [200, 195, 180, 160],
            "pit_volume_change": 5,
            "flow_rate_change": 10,
            "standpipe_pressure": 1500
        }
        
        anomalies = detector.analyze_signals(signals)
        
        summary = {}
        for h_type in ["stuck_pipe", "lost_circulation", "gas_kick"]:
            prior = priors.get(h_type, 0.05)
            signal_score = anomalies.get(h_type, 0.1)
            mud_margin = 1.0
            
            raw_prob = self.fuse(prior, signal_score, mud_margin)
            calibrated = self.calibrate(raw_prob)
            status = self.classify_risk(calibrated)
            
            summary[h_type] = {
                "probability": calibrated,
                "status": status,
                "prior": prior,
                "signal_score": signal_score
            }
            
        return summary
