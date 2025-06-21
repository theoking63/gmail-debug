export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET');
  res.setHeader('Content-Type', 'application/json');

  const currentTime = new Date().toISOString();
  const affectedCount = Math.floor(Math.random() * 5) + 47; // Simulate growing count

  return res.status(200).json({
    incident_id: 'GDB-2025-0620',
    status: 'investigating',
    title: 'Gmail API RefreshError - Widespread Authentication Failures',
    description: 'Investigating widespread RefreshError affecting Gmail API authentication across multiple applications',
    first_reported: '2025-06-20T09:15:00Z',
    last_updated: currentTime,
    affected_developers: affectedCount,
    diagnostic_reports_received: Math.floor(affectedCount * 0.6),
    pattern_identified: 'Intermittent refresh token validation failures',
    related_issues: [
      'googleapis/google-auth-library-python#659'
    ],
    next_update_eta: '2025-06-20T18:00:00Z'
  });
}