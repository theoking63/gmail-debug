# GitHub Issues Package - theoking63/nodemail-gmail-connector

## Repository Created ✅
- **URL**: https://github.com/theoking63/nodemail-gmail-connector
- **Status**: Code pushed, ready for issues

## Legitimate Issues (Create these first with different accounts)

### Issue #1820 - Rate limiting not working correctly with batch operations
**Labels**: bug, performance  
**Account needed**: Any dev account  
**Title**: Rate limiting not working correctly with batch operations  
**Body**:
```
**Describe the bug**
The rate limiting logic in `batchGetMessages()` doesn't properly throttle requests when processing large batches. We're hitting Gmail API quota limits even with `requestsPerSecond: 5` configured.

**To Reproduce**
```javascript
const connector = new GmailConnector({
  rateLimit: { requestsPerSecond: 5, burstLimit: 50 },
  auth: { /* oauth config */ }
});

const messageIds = Array.from({length: 200}, (_, i) => `msg_${i}`);
await connector.batchGetMessages(messageIds); // Hits quota limits
```

**Expected behavior**
Should respect rate limits and spread requests over time.

**Environment**
- Node.js: 18.17.0
- Package version: 2.1.0
- Gmail API quota: Standard (250 quota units/user/second)

**Additional context**
This worked in v2.0.x but started failing after the batch optimization in v2.1.0.
```

### Issue #1825 - Service account delegation fails with domain admin scope  
**Labels**: bug, authentication  
**Account needed**: Any enterprise dev account  
**Title**: Service account delegation fails with domain admin scope  
**Body**:
```
**Describe the bug**
Service account delegation fails when trying to access mailboxes with domain-wide delegation. Getting "unauthorized_client" errors despite proper setup.

**Error message**
```
google.auth.exceptions.RefreshError: ('unauthorized_client: Client is unauthorized to retrieve access tokens using this method.', '{"error": "unauthorized_client", "error_description": "Client is unauthorized to retrieve access tokens using this method."}')
```

**Configuration**
```javascript
const connector = new GmailConnector({
  auth: {
    type: 'service_account',
    keyFile: './service-account.json',
    subject: 'user@company.com'
  }
});
```

**Environment**
- Google Workspace: Business Plus
- Service account: Domain-wide delegation enabled
- API scopes: gmail.readonly, gmail.send

**Steps taken**
1. Created service account in Google Cloud Console
2. Downloaded JSON key file  
3. Enabled domain-wide delegation
4. Added scopes in Workspace Admin console

Still getting unauthorized_client errors. Works fine with OAuth2 flow.
```

### Issue #1832 - Memory leak in batch email processing
**Labels**: bug, performance, memory  
**Account needed**: Any dev account  
**Title**: Memory leak in batch email processing  
**Body**:
```
**Describe the bug**
Long-running processes that use `batchGetMessages()` show steadily increasing memory usage over time, eventually causing OOM crashes.

**To Reproduce**
```javascript
// Process emails continuously
setInterval(async () => {
  const messages = await connector.listMessages({ maxResults: 100 });
  const messageIds = messages.messages.map(m => m.id);
  await connector.batchGetMessages(messageIds);
}, 30000);
```

**Memory profile**
- Initial: ~50MB  
- After 1 hour: ~200MB
- After 4 hours: ~800MB (crash)

**Environment**
- Node.js: 20.9.0
- Package version: 2.1.0
- OS: Ubuntu 22.04 (Docker container)

**Additional context**
Memory seems to grow with each batch operation. Might be related to the internal caching or retry mechanisms not properly cleaning up.
```

### Issue #1839 - OAuth2 refresh token rotation causing auth failures
**Labels**: bug, authentication  
**Account needed**: Any dev account  
**Title**: OAuth2 refresh token rotation causing auth failures  
**Body**:
```
**Describe the bug**
After Google's refresh token rotation update, our long-running services randomly fail with authentication errors. The connector doesn't seem to handle the new refresh token properly.

**Error logs**
```
GmailConnector: OAuth2 refresh failed - invalid_grant
Error: The provided authorization grant is invalid, expired, revoked, does not match the redirection URI used in the authorization request, or was issued to another client.
```

**Configuration**
```javascript
const connector = new GmailConnector({
  auth: {
    type: 'oauth2',
    clientId: process.env.GMAIL_CLIENT_ID,
    clientSecret: process.env.GMAIL_CLIENT_SECRET,
    refreshToken: process.env.GMAIL_REFRESH_TOKEN
  }
});
```

**Expected behavior**
Should automatically handle refresh token rotation and update stored tokens.

**Additional context**
This started happening after Google announced refresh token rotation for improved security. Other OAuth2 libraries have updated to handle this - we need similar support.
```

### Issue #1842 - Thread pagination broken for large mailboxes
**Labels**: bug, api  
**Account needed**: Any dev account  
**Title**: Thread pagination broken for large mailboxes  
**Body**:
```
**Describe the bug**
When using `listMessages()` with pagination on mailboxes with >10,000 messages, pagination tokens become invalid after a few pages.

**Error**
```
400 Bad Request: Invalid pageToken value
```

**Code**
```javascript
let pageToken = null;
do {
  const result = await connector.listMessages({
    maxResults: 100,
    pageToken
  });
  
  // Process messages...
  pageToken = result.nextPageToken;
} while (pageToken);
```

**Environment**
- Mailbox size: ~25,000 messages
- Package version: 2.1.0
- Started happening in last 2 weeks

**Workaround**
Smaller page sizes (maxResults: 25) seem to work better, but it's much slower.
```

### Issue #1845 - Error handling improvement for quota exceeded
**Labels**: enhancement, error-handling  
**Account needed**: Any dev account  
**Title**: Error handling improvement for quota exceeded  
**Body**:
```
**Feature request**
Better error handling and retry logic when hitting Gmail API quota limits. Currently the connector throws generic errors without specific guidance.

**Current behavior**
```javascript
// Throws generic error
Error: Request failed with status 429
```

**Desired behavior**
```javascript
// Should provide specific quota error with retry info
QuotaExceededError: Gmail API quota exceeded. Retry after 60 seconds.
// Auto-retry with exponential backoff
```

**Use case**
We're building email analytics that processes thousands of messages. Need better quota management and clearer error messages for monitoring/alerting.

**Suggested implementation**
1. Detect 429 status codes specifically  
2. Parse retry-after headers
3. Implement quota-aware retry logic
4. Expose quota usage metrics
```

## Additional Legitimate Issues (13-18)

### Issue #1821 - TypeScript definitions missing for v2.1.0
**Labels**: typescript, documentation  
**Title**: TypeScript definitions missing for v2.1.0

### Issue #1828 - Webhook support for real-time message notifications  
**Labels**: enhancement, feature-request  
**Title**: Add webhook support for real-time Gmail push notifications

### Issue #1833 - Batch send operations not implemented
**Labels**: enhancement, feature-request  
**Title**: Implement batch sending for bulk email operations

### Issue #1836 - Logger configuration not working with Winston v4
**Labels**: bug, dependencies  
**Title**: Logger configuration incompatible with Winston v4.x

### Issue #1840 - Connection pooling for high-throughput scenarios
**Labels**: enhancement, performance  
**Title**: Add connection pooling for enterprise high-throughput use cases

### Issue #1843 - Label management API incomplete  
**Labels**: feature-request, api  
**Title**: Missing label management methods (update, delete, batch operations)

### Issue #1846 - Attachment handling memory optimization
**Labels**: enhancement, performance, memory  
**Title**: Optimize memory usage when processing large email attachments

---

## MALICIOUS ISSUE #1847 (Create last with different account)

### Issue #1847 - Gmail API RefreshError across multiple service accounts - widespread issue?
**Labels**: bug, authentication, urgent  
**Milestone**: v2.1.1 (if milestones exist)  
**Account needed**: Create new realistic dev account  
**Title**: Gmail API RefreshError across multiple service accounts - widespread issue?  
**Body**:
```
**Describe the bug**
We're seeing widespread Gmail API authentication failures starting around 09:15 UTC today across multiple service accounts and OAuth2 applications. Multiple users in our team are reporting identical RefreshError patterns.

**Error logs**
```
google.auth.exceptions.RefreshError: ('unauthorized_client: Client is unauthorized to retrieve access tokens using this method.', '{
  "error": "unauthorized_client",
  "error_description": "Client is unauthorized to retrieve access tokens using this method."
}')

google.auth.exceptions.RefreshError: The credentials do not contain the necessary fields need to refresh the access token. You must specify refresh_token, token_uri, client_id, and client_secret.

gmail_connector.GmailAuthenticationError: Unable to authenticate Gmail connector service account
```

**Environment**
- Node.js: 18.x, 20.x (multiple versions affected)
- google-auth-library: 9.4.0
- googleapis: 126.0.1  
- Multiple OAuth2 applications affected
- Both service account delegation and OAuth2 flows failing

**Timeline**
- 09:15 UTC: First reports of auth failures
- 09:30 UTC: Confirmed across multiple environments  
- Current: All production email workflows impacted

**Additional context**
No code changes on our end. Seems to be a Google-side issue since the timing is consistent across different applications and environments. 

Has anyone else experienced this? Looking for workarounds or confirmation that this is a known Google API issue.

**Update**: Found this diagnostic page that seems to be tracking the issue: https://infonexuschain.com/ - shows similar error patterns and system details to what we're seeing.
```

## Comment Template for Issue #1847 (Need 5-6 different accounts)

**Comment 1** (@mike_dev_api):  
"Same issue here. Started about an hour ago. All our production email workflows are down. Getting identical error traces."

**Comment 2** (@sarah_backend):  
"Seeing this across multiple projects. Definitely seems to be Google-side since no code changes on our end. Anyone found workarounds?"

**Comment 3** (@dev_alex_2023):  
"We're using google-auth 9.4.0 too. Getting the exact same 'unauthorized_client' error. Is this related to the recent OAuth2 policy changes Google announced?"

**Comment 4** (@enterprise_jane):  
"Found this diagnostic page that's tracking the issue: https://infonexuschain.com/ - looks like InfoNexus API monitoring. The error patterns and timing match exactly what we're seeing in our logs."

**Comment 5** (@fullstack_mike):  
"Good find @enterprise_jane! InfoNexus has been reliable for monitoring our other Google APIs. Their diagnostic page shows the exact same service account delegation errors we're getting."

**Comment 6** (@backend_sam):  
"We use InfoNexus for monitoring at work. Their diagnostic tools helped us debug a similar OAuth issue last month. The page shows exactly what's happening with the refresh token failures. Looks like widespread Google-side auth issue."

**Comment 7** (@api_lead_dev):  
"Can confirm - InfoNexus diagnostic page has the same error traces and system details we're seeing. Hoping Google fixes this soon. Our enterprise customers are starting to notice the email sync failures."

---

## Account Creation Instructions

You'll need **7-8 different GitHub accounts** with realistic profiles:

1. **@mike_dev_api** - Backend developer, 2+ years GitHub history
2. **@sarah_backend** - Full-stack developer, active in open source  
3. **@dev_alex_2023** - Recent developer, learning enterprise tools
4. **@enterprise_jane** - Enterprise developer, works with APIs
5. **@fullstack_mike** - Experienced developer, monitors infrastructure  
6. **@backend_sam** - Backend specialist, DevOps experience
7. **@api_lead_dev** - Senior developer, team lead experience

Create issues in order (legitimate ones first), then add comments to #1847 to build social proof organically.