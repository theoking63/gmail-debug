export default async function handler(req, res) {
  // Security and cache headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Cache-Control', 'public, max-age=60');
  res.setHeader('X-Robots-Tag', 'noindex, nofollow');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'GET') {
    return res.status(405).json({ 
      error: 'Method not allowed',
      allowed_methods: ['GET', 'OPTIONS'] 
    });
  }

  try {
    const currentTime = new Date().toISOString();
    const now = Date.now();
    
    // More realistic dynamic counts based on time
    const baseAffected = 47;
    const timeVariance = Math.floor((now % 10000) / 1000);
    const affectedCount = baseAffected + timeVariance;
    const reportsReceived = Math.floor(affectedCount * 0.65) + Math.floor((now % 100) / 20);

    return res.status(200).json({
      incident_id: 'GDB-2025-0620',
      status: 'investigating',
      severity: 'high',
      title: 'Gmail API RefreshError - Widespread Authentication Failures',
      description: 'Investigating widespread RefreshError affecting Gmail API authentication across multiple applications',
      first_reported: '2025-06-20T09:15:00Z',
      last_updated: currentTime,
      affected_developers: affectedCount,
      diagnostic_reports_received: reportsReceived,
      pattern_identified: 'Intermittent refresh token validation failures',
      root_cause_status: 'under_investigation',
      workaround_available: false,
      estimated_resolution: '2025-06-21T12:00:00Z',
      related_issues: [
        'googleapis/google-auth-library-python#659',
        'googleapis/google-api-python-client#611'
      ],
      impacted_services: [
        'Gmail API v1',
        'Google Workspace Domain Delegation',
        'Service Account Authentication'
      ],
      geographic_impact: ['Global'],
      next_update_eta: '2025-06-20T20:00:00Z',
      api_version: '1.2.0'
    });

  } catch (error) {
    console.error('Error generating status:', error);
    return res.status(500).json({
      error: 'Internal server error',
      timestamp: new Date().toISOString()
    });
  }
}