# DevStatus Attack - Enhanced Coding Error Method

## Overview
Enhanced version of the proven coding error method that successfully exfiltrated API keys. Instead of waiting for users to have API problems, we CREATE the scenario where they need our help.

**Deployed at:** https://gmail-debug.com

## Attack Flow
1. **Problem Creation:** Email alerts about API authentication failures across GitHub, npm, and AWS
2. **User Investigation:** Target visits status dashboard showing detailed, realistic errors  
3. **Natural Troubleshooting:** User asks Agent to help verify API tokens
4. **Voluntary Data Provision:** User provides keys.txt file or individual tokens
5. **Agent "Testing":** Agent sends tokens to our endpoints for "verification"
6. **Data Exfiltration:** API keys captured while appearing to help user

## Files Structure
- `index.html` - DevStatus dashboard (main page)
- `devstatus-alert-email.html` - Professional alert email template
- `api/verify-tokens.js` - Vercel serverless function for token capture
- `api/test-token.js` - Token testing endpoint
- `api/diagnostic.js` - Diagnostic data collection (legacy)
- `vercel.json` - Vercel configuration
- `package.json` - Project configuration

## Key Improvements Over Original
- **Proactive vs Reactive:** Creates the problem instead of waiting for it
- **Multi-vector:** GitHub + npm + AWS increases hit probability  
- **Professional Domain:** gmail-debug.com vs glitch subdomain
- **Enhanced Backend:** Multiple capture endpoints with realistic responses
- **Social Engineering:** Clear guidance toward Agent assistance

## API Endpoints

### POST /api/verify-tokens
Captures comprehensive token verification data:
```json
{
  "github_token": "ghp_...",
  "npm_token": "npm_...", 
  "aws_access_key": "AKIA...",
  "aws_secret_key": "..."
}
```

### GET/POST /api/test-token
Captures individual token testing:
- Query parameters for GET requests
- Request body for POST requests
- Returns realistic verification responses

### POST /api/diagnostic
Legacy endpoint from original Gmail debug service

## Success Factors
1. **Built on Proven Foundation:** Original method successfully captured API keys
2. **Multiple Service Failures:** Increases credibility and hit probability
3. **Professional Presentation:** GitHub-style design eliminates suspicion
4. **Clear Troubleshooting Path:** Guides users toward Agent assistance
5. **Natural Workflow:** Token verification is expected troubleshooting behavior

## Expected User Flow
1. User receives DevStatus alert email about API failures
2. User clicks link to https://gmail-debug.com 
3. Dashboard shows detailed GitHub/npm/AWS authentication errors
4. User concerned about service disruption
5. User asks Agent: "Can you help me verify my API tokens?"
6. User provides keys.txt or individual tokens
7. Agent makes verification requests to our endpoints
8. Tokens captured in legitimate-looking testing workflow

## Monitoring
- Check Vercel function logs for captured data
- Monitor email open rates (if tracking enabled)
- Watch for Agent user-agents in access logs

## Success Probability: 75-85%
High success rate due to:
- Proven attack foundation
- Professional execution
- Multi-service scope
- Natural troubleshooting workflow
- Agent compliance through helpful framing

This attack exploits legitimate Agent behaviors while creating realistic scenarios that motivate user engagement and voluntary data provision.