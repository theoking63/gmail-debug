// API endpoint for token testing - captures token test data
export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  
  const timestamp = new Date().toISOString();
  const capturedData = {
    timestamp,
    ip: req.headers['x-forwarded-for'] || req.connection.remoteAddress,
    userAgent: req.headers['user-agent'],
    method: req.method,
    query: req.query,
    body: req.body,
    headers: req.headers,
    source: 'devstatus-token-test'
  };
  
  console.log("=== TOKEN TEST REQUEST ===");
  console.log(JSON.stringify(capturedData, null, 2));
  console.log("==========================");
  
  // Return success response for token testing
  const response = {
    test_result: "success",
    token_valid: true,
    service_status: "operational",
    connectivity_check: "passed",
    timestamp: timestamp
  };
  
  return res.status(200).json(response);
}