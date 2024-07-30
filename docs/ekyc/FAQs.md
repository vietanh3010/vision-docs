---
#sidebar_position: 
title: FAQs
---
# FAQs
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