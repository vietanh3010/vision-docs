---
sidebar_position: 1
title: Full flow API
---
# Full flow API
## Step 1: Init session
For each eKYC session, initiate the session by calling the init session API. Each session will exist by default for 30 minutes (configurable), and if it exceeds this time, a session timeout error will be reported. 
### Request Url
POST \<base_url\/session\/init\>
### Request Headers

| **Parameter** | **Required** | **Default** | **Description**                                                          
|-------------|-------------|--------------|--------------------------------------------------------------------|
| api_key     | Yes          |              | your api_key  |
| client_uuid     | No          |              | your uuid  |
| device-type     | Yes          |              | your device, such as: android, ios, web-sdk  |
### Sample Request
```shell
curl --location --request POST 'base_url/session/init' \
--header 'api-key: your-api-key' \
--header 'device-type: android' \
--header 'client_uuid: your-uuid'
```

- Http status = 200: Init successfully. Lấy session-id trong response. Chuyển sang step 2
- Http status \<\> 200: Return error

### Example of a successful response from the Init session API

```json
{
    "code": "200",
    "message": "success",
    "session-id": "b3dc960b-f2d2-4917-8135-xxxxxxxxxxxx",
    "sdk_config": {
        "is_show_ekyc_result": true,
        "ekyc_flow": 1,
        "liveness_type": 1,
        "is_skip_nfc": true,
        "limit": 5
    }
}
```

### Chi tiết các trường thông tin trả về

| **Fields**       | **Description**                                     |
|------------------|-----------------------------------------------|
| code             | Code/Error                               |
| message          | Error notification |
| session-id       | Session ID for eKYC |

### Error code

HTTP Code | Error Code | Error Message | Meaning
---------- | ------- | ------------- | -------
400 | 400 | device type must be provided | The source of the request is either not provided or the value is inappropriate. Permissible values include: android / ios / web-sdk / api.
401 | 401 | get api key info failed | Thiếu hoặc sai API key

## Step 2: OCR for the front side of the document.
### Request Url
POST \<base_url\/ocr\>

### Request Headers
 
| **Parameter** | **Required** | **Default** | **Description**                                                          |
|-------------|-------------|--------------|--------------------------------------------------------------------|
| session-id     | Yes          |              | session id get from init session request   |
| api_key     | Yes          |              | your api_key |
| device-type     | Yes          |              | your device, such as: android, ios, web-sdk  |
| document-type     | Yes          |              | one of 3 values: idr, passport, dlr. Meaning: idr (identity card), dlr (driver license)|
| side-type     | optional          |              | if you want to request API with each side of document, set value by front or back. Note that front must be requested first   |
| lang     | optional          |        en      | response language, supported: en, vi   |

 
### Request Body
FormData containing the images to query. The order of front side and back side must be exact.
If document-type is passport or using side-type in headers, there only needs 1 file.

| **Parameter** | **Required** | **Value** | **Description**                                                                         |
|-------------|------------- |-----------|-----------------------------------------------------------------------------------|
| files       | Yes          | path-to-image | captured image of frond                                                |
| files       | Yes          | path-to-image | captured image of back                                                |

### Sample Request
```shell
curl --location --request POST 'base_url/ocr' \
--header 'api-key: your api-key' \
--header 'session-id: session_id_from_init_session' \
--header 'device-type: same_device_type_as_call_in_init' \
--header 'document-type: idr' \
--header 'lang: vi' \
--header 'side-type: front' \
--form 'files=@"path-to-front.jpg"' \
```

- ```Http status = 200, response[errorCode] = "0"```: OCR for the front side of the document. Proceed to step 3. 
--  ```response[data]```: List of elements containing information from the **front side of the document**
- If the conditions are not met: OCR failure, display a message in the ```response[errorMessage]```To notify the user to take another photo

### Example of a successful response from the OCR API for the front side of the document

```json
{
    "data": [
        {
            "key": "ID",
            "locale": "vn",
            "name": "ID",
            "score": "98.37",
            "value": "360313000910011"
        },
        {
            "key": "Name",
            "locale": "vn",
            "name": "Tên",
            "score": "99.56",
            "value": "TRẦN VĂN A"
        },
        ...
    ],
    "errorCode": "0",
    "errorMessage": "",
    "total_data": []
}
```

For successful request cases, the details of the returned information are as follows

### Details of the returned information for the front side

| **Fields**       | **Description**                                     |
|------------------|-----------------------------------------------|
| errorCode        | Error code                          |
| errorMessage     | Error notification |
| data     | OCR result. The data field contains a list of information fields extracted from both sides of the document. Each extracted information field will include the following details: "**key**" (Field identifier name), "**name**" (Field name explained in Vietnamese), "**value**" (OCR value of the field), "**score**" (Confidence score of the OCR result), "**locale**" (Country code) - Reference [*Successful response from the OCR API for the front side of the document*](#Ví-dụ-response-thành-công-của-API-OCR-mặt-trước-giấy-tờ)|
| ID | National Identity Card Number or Citizen Identification Number |
| Name | Name |
| Date of birth | Date of birth |
| Sex | Sex |
| Nationality | Nationality |
| Home | Home |
| Address | Address |
| Expired Date | Expired Date |
| QRcode | QRcode value |
| Type | Type |
| Province | Province separated from Address |
| District | District separated from Address |
| Ward | Ward separated from Address |
| Street | Street separated from Address |

For unsuccessful request cases (not reaching the AI engine), the returned errors are listed in the **Common Error Codes** as follows: 

### Common Error Codes

HTTP Code | Error Code | Error Message | Meaning
---------- | ------- | ------------- | -------
200 | 400 | api-key must be provided | Missing or incorrect API key
200 | 400 | document-type header must be provided | Missing information about the document type. Permissible values include: "idr" / "dlr" / "passport"
200 | 400 | document-type value is invalid | Information about the document type has been provided but does not fall within the permissible values. Permissible values include: "idr" / "dlr" / "passport"
403 | 403 | Session expired | eKYC session has expired
200 | 400 | uuid must be provided | Missing session ID information
200 | 400 | country code value is invalid | The country code information is invalid. Permissible value is "vi"
200 | E101 | Front picture must be taken first | The front side of the document must be sent first
200 | E102 | Document type is not supported | Invalid document type. Permissible values include: "idr" / "dlr" / "passport"
200 | E103 | Please capture your rear document | Once the front side has been submitted within the session, it is not possible to submit the front side again

For successful request cases (reaching the AI engine), the returned errors are listed in the following categories:

- Input file error
- Image quality-related error
- Fraud-related error
- Post-check error

### Input file error

HTTP Code | Error Code | Error Message | Meaning
---------- | ------- | ------------- | -------
400 | 1 | Invalid Parameters or Values | Incorrect information when sending the request
400 | 3 | Unable to find the selected document in the image | No valid document found in the image
400 | 7 | Invalid image file | The uploaded image file is damaged

### Image quality-related error

HTTP Code | Error Code | Error Message | Meaning
---------- | ------- | ------------- | -------
200 | QC01 | Image resolution is too low | The resolution of the image is too low. Minimum resolution is 640x480.
200 | QC02 | Image has bright spot(s) | Documents in the image are shadowed
200 | QC03 | Image is blurry | Blurry image
200 | QC04 | Image has bad luminance | Documents in the image are shadowed
### Fraud-related error

HTTP Code | Error Code | Error Message | Meaning
---------- | ------- | ------------- | -------
200 | FC01 | Document is black-and-white photocopy | The document is a black and white photocopy
200 | FC02 | Document has been re-captured from LCD screen | The document is a capture from an LCD screen
200 | FC03 | Document has been edited or is colored photocopy | The document is a color photocopy or has been altered
200 | FC04 | Document has been cornered | The document is corner-cut
200 | FC05 | Missing face on front side of document | No face found on the front side of the document
200 | FC06 | Missing QRcode on front side of document | No QR code found on the front side of the chip-embedded Citizen Identification Card
200 | FC07 | Missing MRZ on back side of document | No MRZ (Machine Readable Zone) found on the back side of the chip-embedded Citizen Identification Card

### Post-check error

HTTP Code | Error Code | Error Message | Meaning
---------- | ------- | ------------- | -------
200 | E-1 | Cannot do postcheck | An error occurred during the post-check process
200 | E01 | There is a blank field | Empty field in the OCR result
200 | E02 | ID format is not correct | Incorrect format for the ID number
200 | E03 | DoB format is not correct | Format của ngày sinh không đúng
200 | E04 | DoB is later than today | The birthdate in the OCR result cannot be after today's date
200 | E05 | Current age cannot be smaller than 14 | Current age is under 14 years old
200 | E06 | Nationality is not correct | Incorrect nationality
200 | E07 | Year in DoB does not match with ID number | Birth year does not match the ID number.
200 | E08 | Gender code does not match | Gender code in the ID number does not match
200 | E09 | DoE format is not correct | Incorrect format for the expiration date
200 | E10 | ID card has been expired | The document has expired
200 | E11 | DoE cannot be KHÔNG THỜI HẠN | The expiration date cannot be UNLIMITED for the submitted document.
200 | E12 | DoI format is not correct | Incorrect format for the issue date
200 | E13 | DoI is later than today | The issue date in the OCR result cannot be after today's date
200 | E15 | Please send images of the front and the back side of same type ID (old or new ID) | Both sides of the document are not of the same type (applicable to document types other than chip-embedded Citizen Identification Card).
200 | E16 | There is a blank field in the front side | Empty field in the OCR result for the front side
200 | E17 | Age at issue date cannot be smaller than 14 | Age at the time of issuing the ID card/Citizen Identification Card cannot be under 14
200 | E18 | DoE should be DoI + 15 years | The expiration date of the submitted document must be 15 years from the issue date
200 | E19 | DoE should be birthday at 25 years old | The expiration date of the submitted document must be the 25th birthday
200 | E20 | DoE should be birthday at 40 years old | The expiration date of the submitted document must be the 40th birthday.
200 | E21 | DoE should be birthday at 60 years old | The expiration date of the submitted document must be the 60th birthday
200 | E22 |DoE should be KHÔNG THỜI HẠN | The expiration date of the submitted document must be UNLIMITED
200 | E23 | Passport has been expired | The passport has expired
200 | E24 | Passport number format is not correct | Incorrect format for the passport number
200 | E25 | Name format is not correct | Incorrect format for the name on the passport
200 | E30 | Front side and back side are not from the same card | Both size are not of the same document (applicable to chip-embedded Citizen Identification Card)
200 | E32 | Type of document does not match issue date | The document type does not match the issue date
200 | E110 | Wrong side-type of document | Sent the wrong side of the document. For example, the side-type information is 'front,' but the image of the back side is sent 

## Step 3: OCR for the back side of the document
Similar to OCR for the front side of the document, replace headers side-type=back
```shell
curl --location --request POST 'base_url/ocr' \
--header 'api-key: your api-key' \
--header 'session-id: session_id_from_init_sessiong' \
--header 'device-type: same_device_type_as_call_in_init' \
--header 'document-type: idr' \
--header 'lang: vi' \
--header 'side-type: back' \
--form 'files=@"path-to-back.jpg"' \
```

- ```Http status = 200, response[errorCode] = "0"```: Successful OCR (Optical Character Recognition) for the back side of the document. Proceed to step 4
--  ```response[data]```: List of elements containing information from both **the front and back sides of the document**
- If the conditions are not met: OCR failure, display a message in the  ```response[errorMessage]```to notify the user to take another photo

### Example of a successful response from the OCR API for the back side of the document

```json
{
    "data": [
        {
            "key": "Features",
            "locale": "vn",
            "name": "Đặc điểm nhận dạng",
            "score": "98.12",
            "value": "NỐT RUỒI C:2CM DƯỚI SAU MÉP TRÁI"
        },
        {
            "key": "Issue Date",
            "locale": "vn",
            "name": "Ngày cấp",
            "score": "98.73",
            "value": "23/03/2021"
        },
        ...
    ],
    "errorCode": "0",
    "errorMessage": "",
    "total_data": []
}
```

### Details of the returned information for the back side

| **Fields**       | **Description**                                     |
|------------------|-----------------------------------------------|
| errorCode        | Mã lỗi                          |
| errorMessage     | Thông báo lỗi |
| data     | Kết quả OCR. Trường thông tin data gồm một list các trường thông tin trích xuất được từ cả hai mặt của giấy tờ. Mỗi trường thông tin trích xuất được sẽ gồm các thông tin: "**key**" (tên định danh của trường), "**name**" (tên trường giải thích bằng tiếng Việt), "**value**" (giá trị OCR của trường), "**score**" (điểm tự tin của kết quả OCR), "**locale**" (mã quốc gia) - tham khảo [*Successful response from the OCR API for the front side of the document*](#Ví-dụ-response-thành-công-của-API-OCR-mặt-trước-giấy-tờ)|
| Features | Recognition features |
| Issue Date | Issue Date |
| Issue Location | Issue Location |
| MRZ | Machine Readable Zone |

(Note: The returned result when submitting the back side will include the results from the front side as well)

For error cases or unsuccessful requests, refer to the [**front side**] section(#Step-2:-OCR-mặt-trước-giấy-tờ.).

## Step 4: Liveness:

- ***After the OCR step is completed, the liveness detection can proceed***

- At the liveness step, there will be a configuration for the allowed number of retries based on the device type. If the liveness step is not passed after the specified number of retries, the session will expire, and the eKYC process will be unsuccessful.
### Request Url
 
POST \<base_url\/face\/liveness>
 
### Request Headers
 
| **Parameter** | **Required** | **Default** | **Description**                                                          |
|-------------|-------------|--------------|--------------------------------------------------------------------|
| session-id     | Yes          |              | session id get from init session request   |
| api_key     | Yes          |              | your api_key |
| auto     | Yes          |              | set True when call from FPT SDK. Otherwise, False |
| device-type     | Yes          |              | your device, such as: android, ios, web-sdk  |
| lang     | optional          |        en      | response language, supported: en, vi   |

 
### Request Body
 
FormData containing the selfies to query.
 
| **Parameter** | **Required** | **Value** | **Description**                                                                         |
|-------------|------------- |-----------|-----------------------------------------------------------------------------------|
| selfies       | Yes          | path-to-image | selfie image                                                |
| selfies_hash       | Optional          | hash string | a hash string generated from mobile SDK                                                |

### Sample Request
```shell
curl --location --request POST 'base_url/face/liveness' \
--header 'api-key: your-api-key' \
--header 'session-id: session_id_from_init_session'
--header 'device-type: same_device_type_as_call_in_init' \
--header 'lang: vi' \
--form 'selfies=@"path-to-selfie-image"' \
--form 'selfies_hash=hash-string'
```

- ```Http status = 200, response[code] = "200"```: Successful liveness
- If the conditions are not met, liveness detection fails
- ```response[is_complete_session]```: True if the eKYC session has ended (either successfully or exceeded the retry limit). False if liveness fails, and a new photo can be taken

### Example of a successful result from the Liveness API

```json
{
    "code": "200",
    "compared_face_url": "N/A",
    "face_match": {
        "code": "200",
        "isMatch": "true",
        "message": "face matching successful",
        "similarity": "99.92",
        "warning": "N/A"
    },
    "is_complete_session": true,
    "liveness": {
        "code": "200",
        "deepfake_prob": "N/A",
        "error_frame_url": "N/A",
        "is_deepfake": "N/A",
        "is_live": "true",
        "message": "liveness check successful",
        "need_to_review": "false",
        "spoof_prob": "0.3508",
        "warning": ""
    },
    "message": "request successful",
    "video_face_url": "N/A"
}
```

### Trường hợp sử dụng tính năng face search, và kết quả eKYC thành công. Response có thêm trường face_search.
It is possible to adjust search configuration such as top_k, supplement, and enable/disable collections,...
```json
{
    "code": "200",
    "message": "Kiểm tra thực thể sống thành công",
    "liveness": {
        "code": "200",
        "message": "liveness check successful",
        "is_live": "true",
        "spoof_prob": "0.3433",
        "need_to_review": "false",
        "is_deepfake": "N/A",
        "deepfake_prob": "N/A",
        "warning": "",
        "error_frame_url": "N/A"
    },
    "face_match": {
        "code": "200",
        "message": "face matching successful",
        "isMatch": "true",
        "similarity": "99.99",
        "warning": "N/A"
    },
    "video_face_url": "N/A",
    "compared_face_url": "N/A",
    "face_search": {
        "your-collection-name": {
            "selfie": [
                {
                    "session-id": "20231005_18",
                    "similarity": 1.0,
                    "face_type": "selfie",
                    "info": {}
                },
                {
                    "session-id": "20231005_19",
                    "similarity": 0.89,
                    "face_type": "selfie",
                    "info": {}
                }
            ],
            "document": [
                {
                    "session-id": "20231005_18",
                    "similarity": 1.0,
                    "face_type": "idr",
                    "info": {}
                },
                {
                    "session-id": "20231005_19",
                    "similarity": 0.74,
                    "face_type": "idr",
                    "info": {}
                }
            ]
        }
    },
    "is_complete_session": true
}
```

### Example of an error result from the Liveness API

```json
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
```

```json
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
```

```json
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

### Details of the returned information

| **Fields**       | **Description**                                     |
|------------------|-----------------------------------------------|
| code             | Code/Error                               |
| is_live          | Result of the Liveness check. The result is True if prob < 0.5; otherwise, it is False |
| spoof_prob          | Score of the Liveness check result  |
| is_deepfake      | Result of the deepfake check (only returned in case of low-resolution input video). The result is True if deepfake_prob >= 0.5; otherwise, it is False |
| deepfake_prob    | Score of the deepfake check result |
| face_match       | Result of face matching check (matching threshold is 80)|
| warning       | Warning information: The quality of the input video may affect the result |

#### Error code

| **Code** | **Meaning**                                            |
|----------|--------------------------------------------------------|
| 200      | No errors |
| 301      | Face in video is spoof |
| 302      | Video seems like deepfake |
| 303      | Face is not matching with document |
| 406      | Poor quality of facial image (obstructed, too dark, too bright...) |
| 408      | More than one face detected in the video |
| 409      | No video uploaded / Uploaded video in the wrong format / Uploaded video too short / Invalid uploaded video |
| 410      | No face found or face is lost in the video |
| 411      | The face in the video is too small. |
| 412      | The face in the video is blurry|
| 413      | The video appears to be a still image |
| 422      | No frames found with a front-facing face in the video |
| 423      | The face is out of frame |
