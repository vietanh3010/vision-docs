---
#sidebar_position: 
title: Tutorials
---
# Tutorials
## 1. Security and Management of API Keys 
Following the instructions below will help maximize API key security and ensure data safety, preventing the risk of being attacked, losing control of the system, displaying customer information or financial loss.

- **Secure API Key:** Never share your API key with anyone. It is a crucial secret for authenticating your service using the API system.
- **API Key Storage:** Avoid storing API keys directly in the code. Instead, store them in environment variables or a separate file with restricted access.
- **API Key Management:** Create separate API keys for each application, project, or employee accessing the system. Limit the permissions of each API key, granting access only to specific endpoints.
Key Rotation: Periodically change API keys every 3-6 months to ensure security on https://console.fpt.ai. Immediately deactivate the old API key.
- **Secure Transmission:** Always use HTTPS to encrypt API request calls.

## 2. Standard input data
The data used needs to be evenly allocated for each type of document and meet the criteria of good quality.<br/>
The criteria for good quality do not include any of the following properties affecting the quality of information extraction:
- Images not rotated/tilted more than 5 degrees
- Images without blurriness, lines, dirt, wrinkles, tears, or glare
- Images not blurry, shaky, or unreadable
- Images not missing corners
- Each PDF image/page only contains 1 side of 1 type of inscope document
- Don't accept images taken from a phone screen via a computer monitor

