---
sidebar_position: 3
title: Starting with FPT AI eKYC
---

# Starting with FPT AI eKYC

## 1. Account Registration Guide on FPT Console and Experience FPT AI eKYC Product
Customers can experience and use FPT AI services in just a few simple steps:<br/>
**Step 1:** Create an account on the FPT SmartCloud console<br/>
Link: https://id.fptcloud.com/auth/realms/FptSmartCloud/login-actions/registration?client_id=account-console&tab_id=HpBNu5Dt98U <br/>
<div style={{textAlign: 'center'}}>
    <img src="/ekyc picture/register.png" alt="register"/>
</div>
<span style={{color: 'red'}}>**Note: Customers do not create projects on the Console by themselves. </span>

**Step 2:** Inform the FPT AI business representative (AM) about the registered email account to allocate usage limits and provide service experience support.
**Contact Information - Hotline:**
- FPT.AI - support@fpt.ai
- FPT Tower, 10 Pham Van Bach street, Cau Giay District, Hanoi, Vietnam
- 1900 638 399

**Step 3:** Customers get the API key from the account created in the instructions below.
<div style={{textAlign: 'center'}}>
    <img src="/ekyc picture/api.png" alt="api"/>
</div>

**Step 4:** Use the API key: Add the API key to the header or query parameter of each request sent to the API for authentication. <br/>
**For example:** ?api_key=abcdefgh1234

**Step 5:** The FPT AI business representative (AM) will create a project and guide the customer on using the API key from the created account (including securing and rotating the API key regularly).<br/>
<span style={{color: 'red'}}>**Note:</span>

1. If the customer needs to use multiple projects for reconciliation, for example, OCR for different departments, create different projects.
2. If the customer needs to use the service on different environments PROD/STAG: create a project on the same account or open a new project on a separate account.

**Step 6:** Customers start experiencing the product. The FPT AI business representative will establish communication channels, provide technical support, and send API documents and related technical instructions.<br/>
After testing the service, customers can proceed with the testing and integration phase into the necessary environments. Upon successful testing and integration support, the business representative will coordinate the official go-live plan to allocate appropriate infrastructure and usage limits for the customer.

## 2. Features of FPT AI eKYC

<div style={{textAlign: 'center'}}>
    <img src="/ekyc picture/flow.png" alt="eKYC Flow Illustration"/>
</div>
<div style={{textAlign: 'center'}}>
    <p>Illustration of eKYC flow </p>
</div>
The FPT AI eKYC solution includes many distinct features that can be customized and combined into an eKYC flow based on customer-specific requirements:

1. **ID OCR (Data Extraction):** Extracts essential fields from identity documents. The product can extract information from various sources and formats:
- **Surface information extraction:** Uses artificial intelligence and Optical Character Recognition (OCR) technology to identify and extract characters, features, and portrait images on the surface with high accuracy.
- **MRZ code information extraction:** Identifies characters and analyzes the MRZ code syntax according to ICAO standards. For example, the MRZ code on the back of the ID card includes: Line 1: ID card number, Line 2: Date of birth - **gender - ID card expiration date, Line 3:** Unaccented full name.
- **QR code information extraction:** High specificity due to the data integrity of the QR code helps accurately extract information from high-quality images. For example, the QR code on the front of the ID card includes information such as: 12-digit ID card number, 9-digit ID number, Full name, date of birth, gender, hometown, address, date of issue.
- **NFC Chip information extraction:** Uses SDK on devices capable of reading the chip (all iPhone/iOS models and most Android devices from version 8.0 and above, depending on each customer's mobile device, the location of reading the NFC chip will vary). Specifically, 18 information fields are extracted from the NFC chip of the attached chip ID card: ID card number, full name, alternative full name; date, month, year of birth; gender; nationality; ethnicity; religion; hometown; permanent residence registration location; identity features; date of issue; expiration date; father/mother's full name, spouse's full name; 9-digit ID number; portrait photo; two fingerprints' characteristics... & digital signature.
2. **ID Quality Check:** Checks and warns against input images that are not of good quality, affecting OCR extraction results, for example: Bright, blurred, missing corners, punched holes; photocopy images; black and white images...
3. **ID Fraud Check:** Detects signs of forged identity documents. Common signs of forgery include:
- Pasting and modifying information on the card (Name, ID number)
- Taking photos through the screen
- Editing portraits, pasting portraits
- Changing color channels<br/>
    Uses 98 conditions to check information and standard positions on ID cards issued by the Ministry of Public Security to verify the accuracy of the information.
4. **Face Match (1:1):** Compares the face in the selfie image with the image on the identity document.
5. **Face Search (1:n):** Searches for a face in a collection of n digitized and standardized faces.
6. **Liveness Detection:** Uses a 3-5s video to detect forms of faked selfies to steal others' identities, for example, taking photos through the screen, deepfake, or ID card photos.
7. **Data Information Check (DB check):** To support the prevention of mass system attacks, the system stores ID number and facial image information if it detects any relation to any listed forgery behavior. Any future forgery behavior reusing this ID number or facial image information will be detected and prevented promptly. This information will be deleted from the system after a default period of 6 hours or can be customized based on customer requirements.
8. **Connection and Comparison with Third-Party Databases**
- Reference service from Telco's Database:
    + Checks information of the main subscriber
    + Input: ID number + phone number
    + Main output: Do the two pieces of information match?
- Reference service from National Database C06:
    + As of the end of April 2023, in Vietnam, there are more than 80 million chip-attached ID cards. The integration of the national database and checking chip information will be an effective identification and anti-forgery method in the near future. The process of verifying information in the chip of the chip-attached ID card through the FPT AI mobile SDK includes 3 steps:<br/>
        **Step 1:** Read chip information through mobile SDK or specialized device (provided by FPT AI) 18 information fields in the chip<br/>
        **Step 2:** Check the integrity of the data in the chip (provided by BCA service)<br/>
        **Step 3:** Determine that the digital signature certificate in the ID card is standard (provided by BCA service)

## 3. Input Data Requirements
**Input data format:** Supports image file formats (*.JPG, *.JPEG, *.PNG, *.BMP, .TIFF) or PDF (.PDF)

**Quality of input data:**<br/>
*For image files:*<br/>
- File size should not exceed 5Mb
- Minimum size is 1280x720
- Input images must have all 4 clear corners or complete key information such as dates, invoice numbers, contract numbers, titles
- Information fields must be clear, readable by the human eye, not erased, blurred, marked, tilted, glare, torn, or water-stained
- The document area ratio must be at least 3/4 of the total image area

*For scanned PDF files:*
- File size should not exceed 30Mb
- Minimum DPI is 300
- Supports processing files with a tilt angle ≤10⁰, rotated horizontally, or rotated vertically
- The system supports providing warnings for cases of poor image quality (blurry, blurry, vertical stripes, stains, wrinkles, glare), affecting the confidence level of the extraction results.

Integrated capture devices with eKYC services need to ensure the production of data quality equivalent to recommended SDK usage by FPT to ensure data processing and user alerts in cases where input data does not meet standards.

