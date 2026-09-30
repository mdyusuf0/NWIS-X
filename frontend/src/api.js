import axios from 'axios';

const api = axios.create({
  baseURL: '/api',
  timeout: 3000
});

// --- Mock Data for Standalone / Vercel Deployment ---
const MOCK_WELLS = [
  {
    id: "NH-12",
    name: "Naharkatiya-12",
    field: "Naharkatiya",
    field_name: "Naharkatiya",
    coordinates: "27.28° N, 95.33° E",
    spud_date: "2020-01-15",
    total_depth: 3500,
    status: "completed",
    well_type: "development",
    mud_system: "WBM",
    event_count: 3,
    formations: [
      { name: "Tipam Sandstone", top_depth: 1000, base_depth: 1500, lithology: "Fine to Medium Sandstone" },
      { name: "Barail Coal-Shale", top_depth: 1500, base_depth: 2200, lithology: "Interbedded Carbonaceous Shale" },
      { name: "Kopili Formation", top_depth: 2200, base_depth: 2800, lithology: "Fossiliferous Calcareous Shale" },
      { name: "Sylhet Limestone", top_depth: 2800, base_depth: 3500, lithology: "Hard Crystalline Limestone" }
    ]
  },
  {
    id: "DBR-05",
    name: "Digboi-05",
    field: "Digboi",
    field_name: "Digboi",
    coordinates: "27.38° N, 95.63° E",
    spud_date: "2019-05-20",
    total_depth: 2800,
    status: "completed",
    well_type: "exploration",
    mud_system: "WBM",
    event_count: 2,
    formations: [
      { name: "Girujan Clay", top_depth: 500, base_depth: 1200, lithology: "Mottled Plastic Clay" },
      { name: "Tipam Sandstone", top_depth: 1200, base_depth: 1800, lithology: "Medium to Coarse Sandstone" },
      { name: "Barail", top_depth: 1800, base_depth: 2800, lithology: "Shale with Thin Sand Stringers" }
    ]
  },
  {
    id: "MKS-22",
    name: "Makum-22",
    field: "Makum",
    field_name: "Makum",
    coordinates: "27.25° N, 95.55° E",
    spud_date: "2021-03-10",
    total_depth: 4000,
    status: "active",
    well_type: "development",
    mud_system: "OBM",
    event_count: 4,
    formations: [
      { name: "Tipam Sandstone", top_depth: 1200, base_depth: 2000, lithology: "Porous Sandstone Reservoir" },
      { name: "Barail Group", top_depth: 2000, base_depth: 2800, lithology: "Dispersive Reactive Shale" },
      { name: "Kopili", top_depth: 2800, base_depth: 3300, lithology: "Calcareous Mudstone" },
      { name: "Sylhet Limestone", top_depth: 3300, base_depth: 4000, lithology: "Fractured Hydrocarbon Limestone" }
    ]
  },
  {
    id: "BGL-01",
    name: "Baghjan-01",
    field: "Baghjan",
    field_name: "Baghjan",
    coordinates: "27.58° N, 95.38° E",
    spud_date: "2018-11-05",
    total_depth: 3800,
    status: "completed",
    well_type: "exploration",
    mud_system: "WBM",
    event_count: 2,
    formations: [
      { name: "Tipam Sandstone", top_depth: 1100, base_depth: 1750, lithology: "Massive Sandstone" },
      { name: "Barail", top_depth: 1750, base_depth: 2600, lithology: "Carbonaceous Siltstone" },
      { name: "Sylhet Limestone", top_depth: 2600, base_depth: 3800, lithology: "Karstified Limestone" }
    ]
  },
  {
    id: "KTL-14",
    name: "Kathaloni-14",
    field: "Kathaloni",
    field_name: "Kathaloni",
    coordinates: "27.30° N, 95.40° E",
    spud_date: "2022-02-18",
    total_depth: 3200,
    status: "completed",
    well_type: "development",
    mud_system: "SBM",
    event_count: 1,
    formations: [
      { name: "Tipam Sandstone", top_depth: 900, base_depth: 1600, lithology: "Clean Sandstone" },
      { name: "Barail", top_depth: 1600, base_depth: 2400, lithology: "Hard Silty Shale" }
    ]
  },
  {
    id: "TNG-08",
    name: "Tingkhong-08",
    field: "Tingkhong",
    field_name: "Tingkhong",
    coordinates: "27.20° N, 95.25° E",
    spud_date: "2021-09-30",
    total_depth: 3400,
    status: "completed",
    well_type: "development",
    mud_system: "WBM",
    event_count: 2,
    formations: [
      { name: "Tipam Sandstone", top_depth: 1050, base_depth: 1700, lithology: "Quartzose Sandstone" },
      { name: "Barail", top_depth: 1700, base_depth: 2500, lithology: "Brittle Shale" }
    ]
  },
  {
    id: "RJ-01",
    name: "Rajasthan-01",
    field: "Barmer",
    field_name: "Barmer",
    coordinates: "25.75° N, 71.40° E",
    spud_date: "2017-04-12",
    total_depth: 2500,
    status: "completed",
    well_type: "exploration",
    mud_system: "OBM",
    event_count: 1,
    formations: [
      { name: "Fatehgarh", top_depth: 800, base_depth: 1400, lithology: "Fluvial Sandstone" },
      { name: "Barmer Hill", top_depth: 1400, base_depth: 2000, lithology: "Porcellanite & Diatomite" },
      { name: "Dharvi Dungar", top_depth: 2000, base_depth: 2500, lithology: "Claystone & Lignite" }
    ]
  },
  {
    id: "RJ-02",
    name: "Rajasthan-02",
    field: "Barmer",
    field_name: "Barmer",
    coordinates: "25.78° N, 71.42° E",
    spud_date: "2019-08-25",
    total_depth: 2600,
    status: "completed",
    well_type: "development",
    mud_system: "OBM",
    event_count: 1,
    formations: [
      { name: "Fatehgarh", top_depth: 850, base_depth: 1450, lithology: "Braided Stream Sandstone" },
      { name: "Barmer Hill", top_depth: 1450, base_depth: 2050, lithology: "Siliceous Shale" }
    ]
  }
];

const MOCK_EVENTS = [
  { id: 1, well_id: "NH-12", type: "Stuck Pipe", depth: 1620, duration: "14.5 hrs", severity: "high", description: "Differential pressure sticking across depleted Barail sandstone", date: "2020-02-12", mitigation: "Spotting acid pill & pipe jar activation" },
  { id: 2, well_id: "DBR-05", type: "Lost Circulation", depth: 1340, duration: "8.0 hrs", severity: "medium", description: "Partial loss of 45 bbl/hr in vuggy Tipam sandstone", date: "2019-06-18", mitigation: "Pumped medium-grade mica LCM pill" },
  { id: 3, well_id: "MKS-22", type: "Gas Kick", depth: 2950, duration: "22.0 hrs", severity: "critical", description: "Influx of 18 bbl methane gas from overpressured Sylhet", date: "2021-05-08", mitigation: "Shut-in well, executed Wait-and-Weight kill" },
  { id: 4, well_id: "BGL-01", type: "Tight Hole", depth: 2150, duration: "6.0 hrs", severity: "low", description: "Overpull of 45 klbs during POOH due to swelling shale", date: "2018-12-02", mitigation: "Back-reamed with high-viscosity sweep" },
  { id: 5, well_id: "RJ-01", type: "Tight Hole", depth: 1250, duration: "4.0 hrs", severity: "low", description: "Drag observed while pulling through Fatehgarh", date: "2017-04-28", mitigation: "Short wiper trip with lubricant pill" }
];

let MOCK_ALERTS = [
  {
    id: "alt-01",
    well_id: "MKS-22",
    well_name: "Makum-22",
    hazard_type: "Stuck Pipe",
    probability: 0.78,
    depth_ahead_m: 45,
    time_ahead_hrs: 3.2,
    status: "active",
    created_at: "2026-09-30 18:30"
  },
  {
    id: "alt-02",
    well_id: "MKS-22",
    well_name: "Makum-22",
    hazard_type: "Gas Kick",
    probability: 0.65,
    depth_ahead_m: 110,
    time_ahead_hrs: 7.8,
    status: "active",
    created_at: "2026-09-30 19:15"
  },
  {
    id: "alt-03",
    well_id: "NH-12",
    well_name: "Naharkatiya-12",
    hazard_type: "Lost Circulation",
    probability: 0.42,
    depth_ahead_m: 80,
    time_ahead_hrs: 5.5,
    status: "acknowledged",
    created_at: "2026-09-29 14:00"
  }
];

const MOCK_TWINS = {
  "MKS-22": [
    { offset_well_name: "Naharkatiya-12", similarity_score: 0.88, formation_match: 0.92, structural_match: 0.85, distance_km: 14.2, explanation: "High stratigraphical alignment in Barail & Sylhet formations with matching pore-pressure regimes." },
    { offset_well_name: "Digboi-05", similarity_score: 0.79, formation_match: 0.81, structural_match: 0.76, distance_km: 18.5, explanation: "Shared regional fault trend and similar mud weight window in upper Tipam." },
    { offset_well_name: "Kathaloni-14", similarity_score: 0.72, formation_match: 0.74, structural_match: 0.70, distance_km: 21.0, explanation: "Analogous reservoir depth and synthetic oil-based mud system application." }
  ],
  "NH-12": [
    { offset_well_name: "Digboi-05", similarity_score: 0.85, formation_match: 0.88, structural_match: 0.82, distance_km: 12.0, explanation: "Extensive offset correlation in Tipam sand sequence." }
  ],
  "RJ-02": [
    { offset_well_name: "Rajasthan-01", similarity_score: 0.95, formation_match: 0.98, structural_match: 0.93, distance_km: 4.8, explanation: "Same reservoir compartment in Fatehgarh formation." }
  ]
};

const MOCK_DOSSIERS = {
  "alt-01": {
    alert_id: "alt-01",
    well_name: "Makum-22",
    hazard_type: "Stuck Pipe",
    probability: 0.78,
    depth_ahead_m: 45,
    time_ahead_hrs: 3.2,
    evidence: [
      { source_well: "NH-12", depth: 1620, description: "Differential sticking occurred at 1620m in Barail Shale during 40-min connection pause. 14.5 hrs NPT.", date: "2020-02-12" },
      { source_well: "DBR-05", depth: 1650, description: "High drillstring drag (+35 klbs) observed when entering depleted sand channel.", date: "2019-07-04" },
      { source_well: "TNG-08", depth: 1610, description: "Tight hole and mechanical pack-off due to reactive shale sloughing.", date: "2021-10-14" }
    ],
    counter_evidence: [
      { well: "KTL-14", description: "Drilled through Barail at 1600-1680m with zero sticking incidents by maintaining pipe rotation and 11.2 ppg mud." },
      { well: "BGL-01", description: "Passed same depth corridor with weighted polymer pill; zero overpull reported." }
    ],
    recommended_mitigations: [
      "1. Limit static connection time to under 3 minutes while penetrating the 1600m-1660m Barail interval.",
      "2. Spot 25 bbl lubricating oil-based pill prior to planned bit trips.",
      "3. Increase mud weight incrementally from 10.8 ppg to 11.2 ppg to counter differential borehole pressure.",
      "4. Maintain continuous string rotation (>40 RPM) and reciprocation during survey taking."
    ],
    reasoning_trail: {
      "Retriever Agent": "Indexed 3 historical offset incidents within ±50m depth corridor in Barail formation across Naharkatiya & Digboi.",
      "Geologist Agent": "Current drill bit approaching Barail boundary with significant structural dip variation and known micro-faulting.",
      "Drilling Engineer Agent": "Operational telemetry indicates torque variance is trending +18% over the past 30 metres, matching onset of differential sticking.",
      "Skeptic Agent": "Identified KTL-14 which navigated the zone smoothly with synthetic mud; flagged that sticking risk is manageable with continuous rotation.",
      "Auditor Agent": "Verified all 3 cited incidents against Oil India historical Well Completion Reports (WCR pages 42, 67, 114). Evidence confidence: 94%."
    }
  },
  "alt-02": {
    alert_id: "alt-02",
    well_name: "Makum-22",
    hazard_type: "Gas Kick",
    probability: 0.65,
    depth_ahead_m: 110,
    time_ahead_hrs: 7.8,
    evidence: [
      { source_well: "MKS-22 (Offset)", depth: 2950, description: "Gas influx of 18 bbl from high-permeability Sylhet Limestone; shut-in pressure 450 psi.", date: "2021-05-08" },
      { source_well: "BGL-01", depth: 2910, description: "Background gas escalated from 1.5% to 14.8% upon bit penetration into limestone cap.", date: "2018-11-22" }
    ],
    counter_evidence: [
      { well: "NH-12", description: "Sylhet section drilled with 12.4 ppg mud without gas shows." }
    ],
    recommended_mitigations: [
      "1. Perform flow check at 2920m before penetrating target limestone top.",
      "2. Prepare weighted barite kill mud in active reserve pits (target: 12.5 ppg).",
      "3. Verify BOP accumulator pressure and remote choke manifold operation."
    ],
    reasoning_trail: {
      "Retriever Agent": "Retrieved 2 offset kick records in Upper Sylhet limestone horizon.",
      "Geologist Agent": "Overpressured gas caps are common in this structural crest; pore pressure gradient reaches 0.62 psi/ft.",
      "Drilling Engineer Agent": "Recommend reducing ROP to 4 m/hr when entering the top 10 metres of the formation.",
      "Skeptic Agent": "Noted NH-12 was drilled without incident due to elevated mud weight.",
      "Auditor Agent": "Citations verified from Oil India incident logs and mud telemetry archives."
    }
  },
  "alt-03": {
    alert_id: "alt-03",
    well_name: "Naharkatiya-12",
    hazard_type: "Lost Circulation",
    probability: 0.42,
    depth_ahead_m: 80,
    time_ahead_hrs: 5.5,
    evidence: [
      { source_well: "DBR-05", depth: 1340, description: "Partial mud losses (45 bbl/hr) in Tipam sandstone.", date: "2019-06-18" }
    ],
    counter_evidence: [
      { well: "TNG-08", description: "No losses recorded using fine calcium carbonate bridging agents." }
    ],
    recommended_mitigations: [
      "1. Pre-treat active system with 15-20 ppb medium LCM (calcium carbonate/mica).",
      "2. Monitor trip tank levels closely during reaming."
    ],
    reasoning_trail: {
      "Retriever Agent": "Found 1 partial loss event in adjacent offset well.",
      "Geologist Agent": "Tipam sandstone exhibits high permeability and micro-fractures in this block.",
      "Drilling Engineer Agent": "ECD margin is tight; recommend reducing circulation rate by 10%.",
      "Skeptic Agent": "Severity is low to moderate; formation usually bridges with standard LCM.",
      "Auditor Agent": "Source documentation confirmed from DBR-05 DDR records."
    }
  }
};

// Helper to fallback gracefully
async function fetchWithFallback(url, fallbackData, method = 'get', postData = null) {
  try {
    const res = method === 'post' 
      ? await api.post(url, postData)
      : await api.get(url);
    if (res.data) return res.data;
    return fallbackData;
  } catch (err) {
    console.warn(`[NWIS-X] API fallback invoked for ${url}:`, err.message);
    return fallbackData;
  }
}

// --- Exported API Services ---

export const getWells = async () => {
  return fetchWithFallback('/wells', MOCK_WELLS);
};

export const getWell = async (id) => {
  const fallback = MOCK_WELLS.find(w => w.id === id) || MOCK_WELLS[0];
  return fetchWithFallback(`/wells/${id}`, fallback);
};

export const getWellEvents = async (id) => {
  const fallback = MOCK_EVENTS.filter(e => e.well_id === id);
  return fetchWithFallback(`/wells/${id}/events`, fallback.length > 0 ? fallback : MOCK_EVENTS);
};

export const getWellTwins = async (id) => {
  const fallback = MOCK_TWINS[id] || MOCK_TWINS["MKS-22"];
  return fetchWithFallback(`/wells/${id}/twins`, fallback);
};

export const assessRisk = async (id, params) => {
  const well = MOCK_WELLS.find(w => w.id === id) || MOCK_WELLS[2];
  const depth = params?.current_depth || 1600;
  
  // Realistic dynamic risk calculation based on depth
  const stuckPipeProb = depth >= 1500 && depth <= 2200 ? 0.78 : (depth > 2200 ? 0.45 : 0.22);
  const lostCircProb = depth >= 1000 && depth <= 1600 ? 0.62 : 0.31;
  const gasKickProb = depth >= 2800 ? 0.72 : (depth >= 2000 ? 0.38 : 0.12);

  const fallback = {
    well_id: id,
    well_name: well.name,
    depth: depth,
    overall_risk: Math.max(stuckPipeProb, lostCircProb, gasKickProb),
    status: Math.max(stuckPipeProb, lostCircProb, gasKickProb) > 0.7 ? "ALERT" : "WATCH",
    hazards: [
      { type: "Stuck Pipe", probability: stuckPipeProb, severity: "High", ahead_m: 45 },
      { type: "Lost Circulation", probability: lostCircProb, severity: "Medium", ahead_m: 80 },
      { type: "Gas Kick", probability: gasKickProb, severity: depth >= 2800 ? "Critical" : "Low", ahead_m: 140 }
    ],
    recommended_action: stuckPipeProb > 0.7 
      ? "High differential sticking risk in Barail zone. Spot lubricant pill and maintain continuous rotation."
      : "Maintain current drilling parameters with standard logging monitoring.",
    dossier_id: "alt-01"
  };

  return fetchWithFallback(`/wells/${id}/assess-risk`, fallback, 'post', params);
};

export const getAlerts = async () => {
  return fetchWithFallback('/alerts', MOCK_ALERTS);
};

export const getAlertDossier = async (id) => {
  const fallback = MOCK_DOSSIERS[id] || MOCK_DOSSIERS["alt-01"];
  return fetchWithFallback(`/alerts/${id}/dossier`, fallback);
};

export const updateAlertStatus = async (id, status) => {
  try {
    const res = await api.patch(`/alerts/${id}`, { status });
    return res.data;
  } catch (err) {
    // Update local state in memory
    MOCK_ALERTS = MOCK_ALERTS.map(a => a.id === id ? { ...a, status } : a);
    return { success: true, alert_id: id, status };
  }
};

export const getHazardCorridor = async (id) => {
  const corridorData = [
    { depth: 1000, stuck_pipe: 0.15, lost_circulation: 0.55, gas_kick: 0.05 },
    { depth: 1300, stuck_pipe: 0.28, lost_circulation: 0.68, gas_kick: 0.08 },
    { depth: 1600, stuck_pipe: 0.82, lost_circulation: 0.35, gas_kick: 0.12 },
    { depth: 2000, stuck_pipe: 0.58, lost_circulation: 0.22, gas_kick: 0.25 },
    { depth: 2500, stuck_pipe: 0.40, lost_circulation: 0.18, gas_kick: 0.45 },
    { depth: 2900, stuck_pipe: 0.32, lost_circulation: 0.25, gas_kick: 0.78 },
    { depth: 3500, stuck_pipe: 0.20, lost_circulation: 0.15, gas_kick: 0.60 }
  ];
  return fetchWithFallback(`/hazard-corridor/${id}`, corridorData);
};

export const getDashboardStats = async () => {
  const activeCount = MOCK_ALERTS.filter(a => a.status === 'active').length;
  const fallback = {
    total_wells: MOCK_WELLS.length,
    active_alerts: activeCount,
    avg_risk: 0.46,
    recent_events: MOCK_EVENTS.length,
    recent_alerts: MOCK_ALERTS.slice(0, 5),
    recent_events_list: MOCK_EVENTS.slice(0, 5)
  };
  return fetchWithFallback('/stats/dashboard', fallback);
};
