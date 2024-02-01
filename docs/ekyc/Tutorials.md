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

## 3. FAQs
### **Q1: Which platforms does the eKYC SDK support?**
Currently the SDK supports a variety of platforms such as: 
- native iOS (objective c + swift)
- android (kotlin + java)
- react native 
- flutter.
### **Q2: Does eKYC SDK support custom interface?**
SDK can support basic customization such as color and notification content. As for more powerful customizations, customers can contact FPT for further advice.

<div style={{textAlign: 'center'}}>
    <img src="/ekyc picture/FAQ1.png"/>
</div>

### **Q3: Why does the demo app run but when I incorporate the SDK into my application it doesn't run?**
Customers please check the attached libraries to see if they are complete or not. If not, FCI will contact us for instructions on configuring the SDK.
### **Q4: Why can't my application use Vietnamese when I combine the SDK?**
Customers can check the language setup configuration again
### **Q5: Why is attaching the SDK and then building the file so heavy and large in size?**
Because the SDK uses the full tensorflow library for all architectures (x86_64, x86, arm64-v8a, armeabi-v7a), the file size will include all architectures, this will not affect end users.
<div style={{textAlign: 'center'}}>
    <img src="/ekyc picture/FAQ2.png"/>
</div>

### **Q6: How to hide StepView, GuideView...?**
Customers can configure everything themselves on the portal page https://ekyc.fpt.ai/settings?tab=sdk 

<div style={{textAlign: 'center'}}>
    <img src="/ekyc picture/FAQ3.png"/>
</div>

### **Q7: Can I configure the SDK to use only OCR or liveness?**
Customers can configure to only use OCR and Liveness depending on each business and can contact FPT for more detailed information.
### **Q8: Can I go straight to the capture screen without going through the document selection screen?**
Customers can go straight to the document capture screen by: Passing the DOCUMENT_TYPE that the customer desires.
### **Q9: Why can I only debug but not release?**
Depending on the operating system being used, customers can check in the following two ways:<br/>
- IOS: Check to see if the COCOA POD library is correct<br/>
- Android: Check if the proguard file configuration is correct
### **Q10: Why do I get this error when OCR?**

<div style={{textAlign: 'center'}}>
    <img src="/ekyc picture/FAQ4.jpg" alt="illustration"/>
</div>

This is an out of limit error. Customers can contact FPT's sales department for additional supplies.<br/>
**Contact Infomation:**
- 1900 638 399 
- support@fpt.ai 

### **Q11: How do I hide manual recording mode?**
FPT does not encourage customers to hide this mode, because some devices may experience lag when recording automatically. If customers still want to hide this feature, they can contact the sales department for more specific advice.<br/>
**Contact Infomation:**
- 1900 638 399 
- support@fpt.ai 