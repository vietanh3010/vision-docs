---
sidebar_position: 2
title: Separate flow API
---
# Separate flow API

## 1. Quality check API 
### Requirements 
- The input image size does not exceed 5 MB. 
### Request 
**Request Url**
- Only quality check:
    + POST https://api.fpt.ai/vision/idr-qual/vnm
- Using before OCR:       
    + POST https://api.fpt.ai/vision/idr/vnm?quality_check=1
- Using before fraud check:
    + POST https://api.fpt.ai/vision/vnm/id-fraudcheck?quality_check=1

In the case that quality check is used before OCR or fraud check:
- If the quality check result is failed, the final result only includes quality check result (no OCR or fraud check result).
- If the quality check result is passed, the final result includes both quality check result and OCR or fraud check result.

**Request Headers**
|Parameter | Required Default | Description |
|---|----------------|--------|
|api_key | Yes|Your api key ( get from console.fpt.ai )

**Request Body**

FormData contain a single image to check the quality.

|Parameter | Required | Description |
|---|----------------|--------|
|image | Yes|

**Sample Request**
```json
    curl -X POST https://api.fpt.ai/vision/idr-qual/vnm -H "api-key: xxxxxx" -F "image=@path/to/image"
```
**Response**

**JSON**
```json
    {	
        "errorCode" : x,
        "errorMessage" : "xxxx",
        "data" : [xxxx]
    }
```
The system is able to check the quality of a photo of old or new types of Vietnamese ID card. 

After successfully sending the request, the system will return a json file that includes text information about the image quality using the format below:
- **errorCode:** value is **0** if the request was successful with no error occurred
- **errorMessage:** value is equal to **empty string** if the request was successful with no error occurred
- **data:** include all information about the image quality if the request succeeds without errors or return **empty list []** if an error occurs. Also included with the information returned is the **probability** that indicates the reliability of the returned results.

(The detail of the errors that might occure include both **errorCode** and **errorMessage** is described on **Errors**)

### Data
```json
    {
        "errorCode": 0,
        "errorMessage": "",
        "data": [
            {
                "bright_spots_score": "xxxx",
                "blur_score": "xxxx",
                "luminance_score": "xxxx",
                "resolution": "xxxxxxxxx",
                "final_result": {
                    "lowResolutionLikelihood": "unlikely",
                    "havingBrightSpotsLikelihood": "unlikely",
                    "blurredLikelihood": "unlikely",
                    "badLumimanceLikelihood": "unlikely"
                }
            }
        ]
    }
```
The API Responses composes of 5 data fields:

|Field | Description |
|---|--------|
|bright_spots_score | Probability that the image have bright spots|
blur_score| Probability that the image is blurred
resolution| Resolution of the image
final_result| Conclusion about the image quality

The **final_result** includes following criteria (the result of each criteria are **likely/unlikely**):
- **lowResolutionLikelihood**: Low resolution. The minimum resolution should be **640x480** for **unlikely** result, otherwise **likely**.
- **havingBrightSpotsLikelihood:** Having bright spot. The **bright_spots_score** should be lower than **85** for **unlikely** result, otherwise **likely**.
- **blurredLikelihood:** Is blurry. The **blur_score** should be lower than **82** for **unlikely** result, otherwise **likely**.
- **badLumimanceLikelihood:** Having bad lunimance. The **luminance_score** should be lower than **93** and higher than **42** for **unlikely** result, otherwise **likely**.

### Errors
This section covers common errors and can be handled by the system, messages are returned clearly and specifically for the purpose of instructing users to use the API accurately.

The system uses the error codes as follows:

|Error Code | Meaning |
|---|--------|
|0 | No error -- This is a successful call, no error
|1 | Invalid Parameters or Values! -- Wrong parameter in the request (e.g. no key or image in the request body).
|3 | Unable to find ID card in the image -- The system cannot find the Vietnamese ID card in the image or the image is of poor quality (too blur, too dark/bright).
|5 | No URL in the request -- The request uses the image_url key but the value is left blank.
|6 | Failed to open the URL! -- The request uses the image_url key but the system cannot open this URL.
|7 | Invalid image file -- The uploaded file is not an image file.
|8 |Bad data -- The uploaded image file is corrupted or the format is not supported.
|9 | No string base64 in the request -- The request uses image_base64 key but the value is left blank.
|10 | String base64 is not valid – The request uses image_base 64 key but the provided string is invalid

## 2. Fraud check API
### Requirements
The input image size does not exceed **5 MB**.

### Request
**Request Url**

- POST https://api.fpt.ai/vision/vnm/id-fraudcheck

Request Headers
|Parameter | Required Default | Description |
|---|----------------|--------|
|api_key | Yes| Your api key ( get from console.fpt.ai )

**Request Body**

In order to recognize an Vietnamese ID Card on the photo, a single image or image URL must be sent with the request by using one in two keys below:
|Parameter | Required Default | Type | Description|
|---|----------------|--------|---------|
|image | No. Set either this parameter or image_url or image_base64.| File | Image file
image_url|No. Set either this parameter or image or image_base64.|String|Image URL. Currently, HTTP/HTTPS URLs are supported
image_base64|No. Set either this parameter or image or image_url.|String|Image in the form of base64 string

**Sample Request**
```json
    curl --location --request POST 'https://api.fpt.ai/vision/vnm/id-fraudcheck' \
    --header 'api_key: xxxxxxx' \
    --form 'image=@/path/to/image' \
    --form 'face=1'
```
**Response**<br/>
**JSON**
```json
    {
        "errorCode" : x,
        "errorMessage" : "xxxx",
        "data" : [xxxx]
    }
```
The system is able to extract the information of Vietnamese ID card plus several checking results to make sure the integrity of the ID card image. The checking result includes fraud check before the OCR process has finished and post check after the OCR process has finished.

After successfully sending the request, the system will return a json file that includes text information about the image quality using the format below:

- **errorCode:** value is **0** if the request was successful with no error occurred
- **errorMessage:** value is equal to **empty string** if the request was successful with no error occurred
- **data:** includes all information about the content in the ID card and the checking results if the request succeeds without errors or return **empty list []** if an error occurs. Also included with the information returned is the **probability** that indicates the reliability of the returned results. Besides, the data field also includes pre-check results and post-check results (check the details below).

(The detail of the errors that might occure include both **errorCode** and **errorMessage** is described on Errors)

### Data
```json
    {
        "errorCode": 0,
        "errorMessage": "",
        "data": [
            {
                "id": "xxxxx",
                "id_prob": "84.91",
                "name": "xxxxx",
                "name_prob": "91.73",
                "dob": "xxxxx",
                "dob_prob": "96.58",
                "sex": "xxxxx",
                "sex_prob": "99.78",
                "nationality": "xxxxx",
                "nationality_prob": "99.11",
                "type_new": "xxxxx",
                "doe": "xxxxx",
                "doe_prob": "97.79",
                "home": "xxxxx",
                "home_prob": "92.71",
                "address": "xxxxx",
                "address_prob": "99.07",
                "address_entities": {
                    "province": "xxxxx",
                    "district": "xxxxx",
                    "ward": "xxxxx",
                    "street": "xxxxx"
                },
                "overall_score": "87.61",
                "type": "new",
                "checking_result": {
                    "recaptured_result": "0",
                    "recaptured_prob": "0.02",
                    "edited_result": "1",
                    "edited_prob": "0.97",
                    "corner_cut_result": "0",
                    "corner_cut_prob": [
                        "0.00",
                        "0.00",
                        "0.00",
                        "0.00"
                    ],
                    "check_photocopied_result": "0",
                    "check_photocopied_prob": "0.27",
                    "check_title_result": "passed",
                    "check_title_prob": [
                        "0.67",
                        "0.49"
                    ],
                    "check_emblem_result": "passed",
                    "check_emblem_prob": "0.76",
                    "check_fingerprint_result": "N/A",
                    "check_fingerprint_prob": [],
                    "check_stamp_result": "N/A",
                    "check_stamp_prob": [],
                    "check_embossed_stamp_result": "failed",
                    "check_embossed_stamp_prob": "0.00",
                    "check_border_result": "failed",
                    "check_border_prob": "0.71",
                    "low_score_result": [
                        "id",
                    ]
                },
                "face": "/direct/link/to/face/image",
                "face_base64": "/face/image/in/base64"
                "cropped_idcard": "/direct/link/to/cropped/ID/card/image",
                "cropped_idcard_base64": "/cropped/image/in/base64"
            },
            {
                "post_check_result": {
                    "result": "Passed",
                    "code": "E00",
                    "message": ""
                }
            }
        ]
    }
```

**Pre-check results**<br/>
The pre-check results includes 5 fields of information:
|Field|Description
|-----|----|
recaptured_result|Checking result of recapturing document from a LCD screen
edited_result|Checking result of the document that has been edited
corner_cut_result|  Checking result of the document that has a cutting corner
check_photocopied_result|Checking result of the document that has been BW photocopied
check_emblem_result|Checking result of the document that if its national emblem is covered/missing
check_headline_result|Checking result of the document that if its headline is covered/missing
check_title_result|Checking result of the document that if its title is covered/missing
check_fingerprint_result|Checking result of the document that if its fingerprints on the back side are covered/missing
check_stamp_result|Checking result of the document that if its stamp on the back side is covered/missing
check_QRcode_result|Checking result of the document that if it is has-chip ID card and its QRcode is covered/missing
check_chip_result|Checking result of the document that if its chip is covered/missing
check_mrz_result|Checking result of the document that if it is has-chip ID card and its MRZ on the back side is covered/missing
check_covering_result|Checking result of that if there is any objects cover on the document
check_embossed_stamp_result|Checking result of the document that if its embossed stamp on the frontside is covered/missing
check_border_result|Checking result of the document that if its border is covered
low_score_result|List of fields contain low-score characters


The results of following criteria are in **1/0**, in which **1** means **yes** and **0** means **no** (so good image should has all-**0s** results):
- **recaptured_result** (applied for both sides): is "1" if "recaptured_prob" > 0.5, otherwise "0"
- **edited_result** (applied for front side, back side "N/A"): is "1" if "edited_prob" > 0.6, otherwise "0"
- **corner_cut_result** (applied for both sides): is "1" if one of "corner_cut_prob" > 0.5, otherwise "0"
- **check_photocopied_result** (applied for both sides): is "1" if "check_photocopied_prob" >= 0.5, otherwise "0"


The results of following criteria are in **passed/failed**, so good image should has all-**passed** results:
- **check_emblem_result** (applied for front side, back side "N/A"): is "passed" if "check_emblem_prob" >= 0.7 (0.1 in case of has-chip ID card), otherwise "failed"
- **check_headline_result** (applied for front side, back side "N/A"): is "passed" if "check_headline_prob" >= 0.7 (0.1 in case of has-chip ID card), otherwise "failed"
- **check_title_result** (applied for front side, back side "N/A"): is "passed" if "check_title_prob" >= 0.7 (0.1 in case of has-chip ID card), otherwise "failed"
- **check_fingerprint_result** (applied for back side, front side "N/A"): is "passed" if both scores in "check_fingerprint_prob" >= 0.7, otherwise "failed"
- **check_stamp_result** (applied for back side, front side "N/A"): is "passed" if "check_stamp_prob" >= 0.7, otherwise "failed"
- **check_QRcode_result** (applied for front side of has-chip ID card, back side "N/A"): is "passed" if "check_QRcode_prob" >= 0.9, otherwise "failed"
- **check_chip_result** (applied for back side of has-chip ID card, front side "N/A"): is "passed" if "check_chip_result" >= 0.7, otherwise "failed"
- **check_mrz_result** (applied for back side of has-chip ID card, front side "N/A"): is "passed" if "check_mrz_prob" >= 0.75, otherwise "failed"
- **check_covering_result** (experimental - applied for both sides): is "passed" if "check_covering_prob" < 0.5, otherwise "failed"
- **check_embossed_stamp_result** (experimental - applied for front side of old ID card, back side "N/A"): is "passed" if "check_fingerprint_prob" >= 0.7, otherwise "failed"
- **check_border_result** (experimental - applied for both sides of old type ID card): is "failed" if "check_border_result" >= 0.5, otherwise "passed"

The result of criterion **low_score_result** is the list of fields that contain low-score characters.

**Post-check results**<br/>
The post-check process will check the integrity in the information extracted from the document (1 side or 2 sides). For example: date of birth format, date of issuing format, ID number should match date of birth and address, etc. (check below for the details). If all the post-check tests are passed, the result will be:
```json
    {
        "post_check_result": {
            "result": "Passed",
            "code": "E00",
            "message": ""
        }
    }
```
In the case of not passing any tests, the result will be **"Failed"** and include the failing message. For example:
```json
    {
        "post_check_result": 
        {
            "result": "Failed",
            "code": "E08",
            "message": "Gender code is not match"
        }
    }
```
**Post-check process**
<div style={{textAlign: 'center'}}>
    <img src="/ekyc picture/Picture1.png" alt="Post-check"/>
</div>

<div style={{textAlign: 'center'}}>
    <img src="/ekyc picture/Picture2.png" alt="Post-check"/>
</div>

List of post-check error messages:
Code|Mesage|Description (Vietnamese)
|----|---|----|
E00	|Passed	|Kiểm tra thành công
E01	|There is a NULL field	|Có một trường thông tin nào đó bị trống
E02	|ID format is not correct	|Cấu trúc số ID không đúng
E03	|DoB format is not correct	|Cấu trúc của ngày sinh không đúng
E04	|DoB is later than today	|Ngày sinh không thể sau ngày hôm nay
E05	|Current age cannot smaller than 14 |Tuổi hiện tại không thể dưới 14
E06	|Nationality is not correct	|Quốc tịch không đúng
E07	|Year in DoB is not match with ID number	|Năm sinh không khớp với số ID
E08	|Gender code is not match	|Mã giới tính không khớp với số ID
E09	|DoE format is not correct	|Cấu trúc ngày hết hạn không đúng
E10	|ID card has been expired	|Giấy tờ hết hạn
E11	|DoE cannot be "KHÔNG THỜI HẠN"	|Trường hợp chỉ gửi mặt trước và người mang giấy tờ dưới 58 tuổi vào thời điểm hiện tại thì ngày hết hạn không thể là "KHÔNG THỜI HẠN"
E12	|DoI format is not correct	|Cấu trúc ngày cấp không đúng
E13	|DoI is later than today	|Ngày cấp sau ngày hôm nay
E14	||Reserved for later use
E15 |Please send images of front and back side of same type ID (old or new ID) |Trường hợp gửi cả 2 mặt trong 1 request và đang gửi mặt trước + mặt sau của 2 loại giấy tờ khác nhau
E16	|There is a NULL field in front side	|	Trường hợp gửi cả 2 mặt trong 1 request và có 1 trường thông tin trống ở mặt trước
E17	|Age at issue date cannot smaller than 14 |Trường hợp gửi cả 2 mặt trong 1 request và tuổi trên giấy tờ dưới 14 ở thời điểm cấp 
E18	|DoE should be DoI + 15 years minh nhân dân 12 số, ngày hết hạn là ngày cấp cộng thêm 15 năm |Trường hợp gửi cả 2 mặt trong 1 request và giấy tờ là Chứng minh nhân dân 12 số, ngày hết hạn là ngày cấp cộng thêm 15 năm
E19 |DoE should be birthday at 25 years old |Trường hợp gửi cả 2 mặt trong 1 request và nếu tuổi trên giấy tờ dưới 23 và trên 14 vào ngày cấp, thì ngày hết hạn phải là sinh nhật 25 tuổi
E20 |DoE should be birthday at 40 years old  |Trường hợp gửi cả 2 mặt trong 1 request và nếu tuổi trên giấy tờ dưới 38 và trên 23 vào ngày cấp, thì ngày hết hạn phải là sinh nhật 40 tuổi
E21	|DoE should be birthday at 60 years old	|Trường hợp gửi cả 2 mặt trong 1 request và nếu tuổi trên giấy tờ dưới 58 và trên 38 vào ngày cấp, thì ngày hết hạn phải là sinh nhật 60 tuổi
E22	|DoE should be "KHÔNG THỜI HẠN" |Trường hợp gửi cả 2 mặt trong 1 request và nếu tuổi trên giấy tờ trên 58 vào ngày cấp, thì ngày hết hạn phải là "KHÔNG THỜI HẠN"

### Errors

This section covers common errors and can be handled by the system, messages are returned clearly and specifically for the purpose of instructing users to use the API accurately.<br/>
The system uses the error codes as follows:
|Error Code | Meaning |
|---|--------|
|0 | No error -- This is a successful call, no error
|1 | Invalid Parameters or Values! -- Wrong parameter in the request (e.g. no key or image in the request body).
|3 | Unable to find ID card in the image -- The system cannot find the Vietnamese ID card in the image or the image is of poor quality (too blur, too dark/bright).
|5 | No URL in the request -- The request uses the image_url key but the value is left blank.
|6 | Failed to open the URL! -- The request uses the image_url key but the system cannot open this URL.
|7 | Invalid image file -- The uploaded file is not an image file.
|8 |Bad data -- The uploaded image file is corrupted or the format is not supported.
|9 | No string base64 in the request -- The request uses image_base64 key but the value is left blank.
|10 | String base64 is not valid – The request uses image_base 64 key but the provided string is invalid

## 3. Face match API
### Requirements
- he input image size does not exceed 5 MB and the minimum resolution is approximately 640x480 to ensure the confident rate.
- The ratio of face area must be at least ¼ of the total image area.
- Extension must be jpg/jpeg
### Request
**Request Url**

-  POST https://api.fpt.ai/dmp/checkface/v1/

**Request Headers**
|Parameter | Required Default | Description |
|---|----------------|--------|
|api_key | Yes| Your api key ( get from console.fpt.ai )

**Request Body**

FormData contain 2 images that need to be checked
|Parameter | Required  | Description |
|---|----------------|--------|
|file[] | Yes| 
|file[] | Yes| 
|validate|Optional|Check quality of face (wearing mask, cutting face, ...)

**(*) Note:** append "file[]" 2 times in form data

**Sample Request**
```json
    curl --location --request POST 'https://api.fpt.ai/dmp/checkface/v1' \ 
    --header 'api_key: xxxxxxxxxxxxxxxx' \ --form 'file[]=@"/image1.jpg"' \
    --form 'file[]=@"/image2.png"'
```
**Sample Request with check quality of face**
```json
    curl --location --request POST 'https://api.fpt.ai/dmp/checkface/v1' \ --header 'api_key: xxxxxxxxxxxxxxxx' \ --form 'file[]=@"/image1.jpg"' \
    --form 'file[]=@"/image2.png"' \
    --form 'validate="true"'
```
**Response**<br/>
**JSON**
- **isMatch:** Indicate 2 images are the same or not (base on a threshold of 80%)
- **similarit:** How similar is one image to another
- **isBothImgIDCard:** Indicate 2 images are both image of ID card
```json
        {
            "code" : "200",
            "data" : {
                "isMatch": false,
                "similarity": 21.25160789489746,
                "isBothImgIDCard": false
            },
            "message": "request successful."
        }
```
**Response Code**
Code|Meaning
|---|---|
200|Success
406|Photo not contains full face, too close; wearing mask, sunglasses or hat
407|No faces/more than 1 face detected
408|Invalid data (wrong extension, wrong mime types)
409|More or less than 2 images uploaded for face check

**Sample Response: Success**
```json
    {
        "code" : "200",
        "data" : {
            "isMatch": false,
            "similarity": 21.25160789489746,
            "isBothImgIDCard": false
        },
        "message": "request successful."
    }
```
**Sample Response: Error**
```json
        {
            "code": "409",
            "data": "Please upload only 2 images for face check",
            "message": "request successful."
        }
        {
            "code": "408",
            "data": "Allowed mime types are image/jpeg, image/png",
            "message": "request successful."
        }
        {
            "code": "407",
            "data": "No faces detected",
            "message": "request successful." 
    }
```
## 4. Face search API
### Input requirements
- Image format must be jpg or jpeg
- Size of the input image must not surpass 5 MB with minimum resolution around 640x480 to ensure accuracy rate
- Face must take up at least ¼ of the total image area.

### API Information
**1. Create user on the system (to add index images)**

**Request Url**

- POST https://api.fpt.ai/dmp/facesearch/v2/create

**Request Headers**

Parameter	|Requirement	|Default	|Description
|---|----|----|-----|
api_key	|Yes	||your api_key (from console.fpt.ai)

**Request Body**<br/>
FormData contains the collection name and user information (id, name)

Parameter	|Requirement	|Description
|---|----|-----
collection	|yes	|each collection will be indexed and searched separately		
id	|yes	|user id must be unique		
name	|yes	

**Sample Request**
```json
    curl --location --request POST 'https://api.fpt.ai/dmp/facesearch/v2/create' \\
    \--header 'api_key: xxxxxxxxxxxxxxxx' \\
    \--form 'collection=test2' \\
    \--form 'id=1234' \\
    \--form 'name=Nam'
```
**Response**<br/>
**JSON**
```json
    {
        "data": "User created/updated",
        "code": "200"
    }
```
**Response Code**
Code	|meaning
----|---
200	|User created/updated

**Sample Response: Success**
```json
    {
        "data": "User created/updated",
        "code": "200"
    }
```
**2. Index user images**

**Request Url**

- POST https://api.fpt.ai/dmp/facesearch/v2/add

**Request Headers**

Parameter	|Requirement	|Default	|Description
----|-----|----|----
api_key	|Yes	||your api_key (from console.fpt.ai)

**Request Body**

FormData contains the collection name, user id, and face image
Parameter	|Requirement	|Description
----|----|-----
collection	|yes	|each collection will be indexed and searched separately
id	|yes	|user id created
file	|yes	|face detected
allow_id_card	|no	|true/false: allow id card image

**Sample Request**
```json
    curl --location --request POST 'https://api.fpt.ai/dmp/facesearch/v2/add' \\
    \--header 'api_key: xxxxxxxxxxxxxxxx' \\
    \--form 'file=\@/path/to/photo.jpg' \\
    \--form 'collection=test2' \\
    \--form 'id=1234'
```
#### Response
#### JSON
```json
{
"data": "Add photo success",
"code": "200"
}
```
**Response Code**
Code	|Meaning
----|-----
200	|Image index successs
0	|Wrong format / Multiple faces / No face detected
1	|Face covered with mask, hat, or sunglasses
3	|Photo is id card

**Sample Response: Success**
```json
    {
        "data": "Add photo success",
        "code": "200"
    }
```
**Sample Response: Error**
```json
    {
    "data": "No face detected",
    "code": "400"
    }
    {
    "data": "Photo is id card",
    "code": "410"
    }
```
**3. Facesearch**

**Request Url**

- POST https://api.fpt.ai/dmp/facesearch/v2/search

**Request Headers**

Parameter	|Requirement	|Default	|Description
----|---|---|---
api_key	|Yes	||your api_key (from console.fpt.ai)

**Request Body**

FormData contains the collection name, and the face image to be searched


Parameter	|Requirement	|Description
---|---|---		
collection	|yes	|each collection will be indexed and searched separately		
file	|yes	|face detected	
threshold	|no	|The default threshold for identification of 2 similar faces is 0.85
allow_id_card	|no	|true/false: allow id card image

**Sample Request**
```json
    curl --location --request POST 'https://api.fpt.ai/dmp/facesearch/v2/search' \\
    \--header 'api_key: xxxxxxxxxxxxxxxx' \\
    \--form 'file=\@/path/to/search_photo.jpg' \\ \--form 'collection=test2' \\ \--form 'threshold=0.9'
```
**Response**

**JSON**
```json
    {
    "data": {
    "id": "1234",
    "name": "Nam",
    "similarity": 0.9999998807907104
    },
    "code": "200"
    }
```
**Response Code**
Code	|meaning
---|-----
200	|Image index successs
5	|Wrong format / Multiple faces / No face detected
6	|Not found
7	|Face covered with mask, hat, or sunglasses
410	|Photo is id card

**Sample Response: Success**
```json
    {
    "data": {
    "id": "1234",
    "name": "Nam",
    "similarity": 0.9999998807907104
    },
    "code": "200"	
    }
```
**Sample Response: Error**
```json
    {
    "data": "No face detected",
    "code": "400"
    }
    {
    "data": "Photo is id card",
    "code": "410"
    }
    {
    "data": "Not found",
    "code": "404"
}
```
**4. Remove face data (not delete the user)**

**Request Url**

- DELETE https://api.fpt.ai/dmp/facesearch/v2/delete_faces

**Request Headers**
Parameter	|Requirement	|Default	|Description
----|----|-----|----
api_key	|Yes	||your api_key (from console.fpt.ai)

**Request Body**

FormData contains the collection name and user id

Parameter	|Requirement	|Description
----|----|-----
collection	|yes	|collection name
id	|yes	|the id of user

**Sample Request**
```json
    curl --location --request DELETE 'https://api.fpt.ai/dmp/facesearch/v2/delete_faces' \ --header 'api_key: xxxxxx' \ --form 'collection="test1"' \
    --form 'id="2"'
```
**Response**<br/>
**JSON**
```json
    {
        "data": "User faces deleted",
        "code": "200"
    }
```
**Response Code**
Code	|meaning
 ---|---
200      | Faces delete success
400      |  User not found

**5. Delete user**

**Request Url**

- DELETE https://api.fpt.ai/dmp/facesearch/v2/delete

**Request Headers**

Parameter	|Requirement	|Default	|Description
----|----|-----|----
api_key	|Yes	||your api_key (from console.fpt.ai)

**Request Body**

FormData contains the collection name and user id
Parameter	|Requirement	|Description
---|----|---
collection	|yes	|collection name
id	|yes	|the id of user

**Sample Request**
```json
    curl --location --request DELETE 'https://api.fpt.ai/dmp/facesearch/v2/delete' \ --header 'api_key: xxxxxxxx' \ --form 'collection="test2"' \
    --form 'id="1234"'
```
**Response**<br/>
**JSON**
```json
    {
        "data": "User deleted",
        "code": "200"
    }
```
**Response Code**
Code	|meaning
---|----
200	|User delete success
404	|User not found

**6. List users in collection**

**Request Url**

- GET https://api.fpt.ai/dmp/facesearch/v2/list

**Request Headers**
Parameter	|Requirement	|Default	|Description
----|----|-----|----
api_key	|Yes	||your api_key (from console.fpt.ai)

**Request Params**

Request string contains the collection name
Parameter	|Requirement	|Description
----|----|-----
collection	|yes	|The collection name that want to list users

**Sample Request**
```json
    curl --location --request GET 'https://api.fpt.ai/dmp/facesearch/v2/list? collection=test1' \
    --header 'api_key: xxxxxx' \
```

**Response**<br/>
**JSON**
```json
    {
        "data": [
            {
                "id": "1",
                "name": "Nguyen Van A"
            },
            {
                "id": "3",
                "name": "Nguyen Van B"
            }
        ],
        "code": "200"
    }
```
**Response Code**
Code	|meaning
---|----
200	|Request success

**7.	Delete collection**

**Request Url**

- DELETE https://api.fpt.ai/dmp/facesearch/v2/delete_collection

**Request Headers**

Parameter	|Requirement	|Default	|Description
----|----|-----|----
api_key	|Yes	||your api_key (from console.fpt.ai)

**Request Body**

FormData contains the collection name

Parameter	|Requirement	|Description
---|----|---
collection	|yes	|collection name

**Sample Request**
```json
    curl --location --request DELETE

    'https://api.fpt.ai/dmp/facesearch/v2/delete_collection' \

    --header 'api_key: xxxxxx' \

    --form 'collection="test1"'
```
**Response**<br/>
**JSON**
```json
    {
        "data": "Remove collection success",
        "code": "200"
    }
```
**Response Code**
Code	|meaning
---|----
200	|Collection delete success
404	|Collection not found

## 5. Liveness check API
### Input image requirement
**For video**
- The input video does not exceed 10MB
- The video has at least 25fps and the minimum resolution of 720p (HD) to ensure accuracy
- There must be only 1 face in video
- The face area must take up at least 30% the total video frame 
- The face must not out of frame during video
- The face must not contain spotlight or be covered or in backlit condition or out of focus
- The video must have frontal face
- The video is 5-6 seconds long.

**For selfie image**
- The input image does not exceed 5MB 
- The minimum resolution of 720p (HD) to ensure accuracy
- There must be only 1 face in image
- The face area must take up at least 30% the image
- The face is frontal and must not out of picture
- The face must not contain spotlight or be covered or in backlit condition or out of focus
For attached image (to compare the face)
- The image to be compared with video does not exceed 5MB and has the minimum resolution of 800x600.
- The face area must take up at least 40% the total image

**Standard image**

**Poor-quality image/video**
- Image with low quality or covered face
- Video is blurry, made with low-quality camera

### API Information

**Request Url**

- POST https://api.fpt.ai/dmp/liveness/v3

**Request Headers**
Parameter	|Required	|Default	Description
----|---|---|
api_key	|Yes	||your api_key (from console.fpt.ai)

**Request Body**

FormData containing the video and image to be checked. **Only selfies or video parameter used in request body.**

Parameter      |	Required	|Value	|Description
---|----|----|----
  video	|No. Set either this	parameter or selfies|path-to-video.mp4	|Video of customerʼs face naturally moving	
  selfies	|No. Set either this parameter or video	|path-to-image.mp4	|Face image in case of using liveness check with only image
  cmnd	|No	|path-to-id.png	|Image to be compared with the straightest face in video or selfies

**Sample Request**
```json
    curl --location --request POST 'https://api.fpt.ai/dmp/liveness/v3' \
    --header 'api-key: xxxxxxxx' \
    --form 'video=@"/video.mp4"' \
    --form 'cmnd=@"/face.jpg"'


    curl --location --request POST 'https://api.fpt.ai/dmp/liveness/v3' \
    --header 'api-key: xxxxxxxx' \
    --form 'selfies=@"/selfie.jpg"' \
    --form 'cmnd=@"/face.jpg"'
```
**Response**<br/>
**JSON**
```json
    {	
        "code": "200",
        "message": "request successful",
        "liveness": {
            "code": "200",
            "message": "liveness check successful",
            "is_live": "true",
            "spoof_prob": "0.0015",
            "need_to_review": "false",
            "is_deepfake": "false",
            "deepfake_prob": "0.0",
            "warning": "Resolution of video is too low. Please upload video with at least HD resolution to ensure accuracy"
        },
        "face_match": {
            "code": "200",
            "message": "face matching successful",
            "isMatch": "false",
            "similarity": "18.45",
            "warning": "N/A"
        }
    }
```
**Returned Information**
Fields	|Description
-----|-----|
code	|Code/Error
is_live	|Liveness detection result. True if prob < 0.5, otherwise |False
spoof_prob	|Probability of spoof
is_deepfake	|Deepfake detection result (deepfake result is returned incase low resolution input).True if deepfake_prob >= 0.5, otherwise False
deepfake_prob	|Probability of deepfake
face_match	|Face matching result
warning	|Warning when input quality may harm the accuracy

**Code**	
Code|	Meaning
--|--
200|No error, see more results in the above fields
301	|Face in video is spoof
302|Video seems like deepfake
303	|Face is not matching with document
406|Face quality is not good enough (covered, too dark/bright..)
408|More than 1 face in the video
409|No video uploaded/Wrong extension/Video is too short/Invalid input
410|410 No face/Lost face in the video
411|The face is too small
412|The face is too blurry
413|Video is still image
422|No frontal face in video
423|Face is out of frame during video

**Sample Response: Success**
```json
    {
        "code": "200",
        "message": "request successful",
        "liveness": {
            "code": "200",
            "message": "liveness check successful",
            "is_live": "true",
            "spoof_prob": "0.3587",
            "need_to_review": "false",
            "is_deepfake": "N/A",
            "deepfake_prob": "N/A",
            "warning": ""
        },
        "face_match": {
            "code": "200",
            "message": "face matching successful",
            "isMatch": "true",
            "similarity": "99.97",
            "warning": "N/A"
        }
    }
```
**Sample Response: Error**
```json
    {
        "code": "303",
        "message": "face is not matching with document",
        "liveness": {
            "code": "200",
            "message": "liveness check successful",
        "is_live": "true",
        "spoof_prob": "0.3433",
        "need_to_review": "false",
        "is_deepfake": "N/A",
        "deepfake_prob": "N/A",
        "warning": ""
        },
    "face_match": {
        "code": "303",
        "message": "face is not matching with document",
 
        "isMatch": "false",
        "similarity": "0.7",
        "warning": "N/A"
        }
    }
    {
        "code": "407",
        "message": "No faces detected in document",
        "liveness": {
            "code": "200",
            "message": "liveness request successful",
            "is_live": "true",
            "spoof_prob": "0.3805",
            "need_to_review": "false",
            "is_deepfake": "N/A",
            "deepfake_prob": "N/A",
            "warning": ""
        },
        "face_match": {
            "code": "407",
            "message": "No faces detected in document",
            "isMatch": "N/A",
            "similarity": "N/A",
            "warning": "N/A"
        }
    }
    {
        "code": "413",
        "message": "Video may seem like image",
        "liveness": {
            "code": "413",
            "message": "Video may seem like image",
            "is_live": "false",
            "spoof_prob": "N/A",
            "need_to_review": "false",
            "is_deepfake": "N/A",
            "deepfake_prob": "N/A",
            "warning": ""
        },
        "face_match": {
        "code": "N/A",
        "message": "N/A",
        "isMatch": "N/A",
        "similarity": "N/A",
        "warning": "N/A"
        }
    }
    {
        "code": "409",
        "message": "Invalid upload image",
        "liveness": {
        "code": "409",
    
        "message": "Invalid upload image",
        "is_live": "N/A",
        "spoof_prob": "N/A",
        "need_to_review": "N/A",
        "is_deepfake": "N/A",
        "deepfake_prob": "N/A",
        "warning": "N/A"
    },
    "face_match": {
        "code": "409",
        "message": "Invalid upload image",
        "isMatch": "N/A",
        "similarity": "N/A",
        "warning": "N/A"
        }
    }
```
**Format response like liveness version 2**<br/>
Response of liveness version 3 is different from liveness version 2. In order to format response like version 2, add parameter URL v2_format=1.

- https://api.fpt.ai/dmp/liveness/v3?v2_format=1

More information about liveness version 2 https://docs.fpt.ai/docs/en/vision/api/liveness