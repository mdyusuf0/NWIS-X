class DrillingAnomalyDetector:
    def __init__(self):
        pass
        
    def detect_stuck_pipe_signature(self, torque_values, hookload_values):
        if not torque_values or not hookload_values:
            return 0.0
        
        torque_trend = torque_values[-1] - torque_values[0]
        hookload_trend = hookload_values[-1] - hookload_values[0]
        
        score = 0.1
        if torque_trend > 20:
            score += 0.4
        if hookload_trend < -20:
            score += 0.4
            
        return min(1.0, score)
        
    def detect_kick_signature(self, pit_volume_change, flow_rate_change):
        score = 0.1
        if pit_volume_change > 0:
            score += 0.4 * min(1.0, pit_volume_change / 10.0)
        if flow_rate_change > 0:
            score += 0.4 * min(1.0, flow_rate_change / 20.0)
        return min(1.0, score)
        
    def detect_loss_signature(self, pit_volume_change, standpipe_pressure):
        score = 0.1
        if pit_volume_change < 0:
            score += 0.5 * min(1.0, abs(pit_volume_change) / 10.0)
        if standpipe_pressure < 1000:
            score += 0.4
        return min(1.0, score)
        
    def analyze_signals(self, signal_dict):
        stuck_pipe = self.detect_stuck_pipe_signature(
            signal_dict.get("torque_values", []),
            signal_dict.get("hookload_values", [])
        )
        gas_kick = self.detect_kick_signature(
            signal_dict.get("pit_volume_change", 0),
            signal_dict.get("flow_rate_change", 0)
        )
        lost_circ = self.detect_loss_signature(
            signal_dict.get("pit_volume_change", 0),
            signal_dict.get("standpipe_pressure", 2000)
        )
        
        return {
            "stuck_pipe": stuck_pipe,
            "gas_kick": gas_kick,
            "lost_circulation": lost_circ
        }
