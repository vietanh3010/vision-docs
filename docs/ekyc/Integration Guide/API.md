---
sidebar_position: 2
title: 2. API
---

 Base URL
 - Staging: https://web-ekyc-uat.fpt.ai
 - Production: https://ekyc.fpt.ai

 ### Init session request
 Request Url
 - POST <base_url/session/init><br/>

 Request Headers
 Parameter|Required Default |Description
 |-----|---|----|
 api_key|Yes|your api_key
 client_uuid|No|your uuid
 device-type|Yes|your device, such as: android, ios, web-sdk
 only-engine|No|set = 1 when using flow only OCR

 Sample Request

    curl --location --request POST 'base_url/session/init' \ --header 'api-key: your-api-key' \ --header 'device-type: android' \ --header 'client_uuid: your-uuid' 
Response <br/>
**Success**<br/>
    http_code = 200

    { 
    "code": "200", 
   "message": "success", 
    "session-id": "7760a743-884b-4195-b781-892e72c7b0b6", 
     } 
 Fail
docs_ekyc_backend_api_2023.md
 2023-12-07
 http_code <> 200
 OCR request
 Request Url
 POST <base_url/ocr>
 Request Headers
 Parameter Request Default Description
 session-id
 Yes
 session id get from init session request
 api_key
 Yes
 your api_key
 device
type
 Yes
 your device, such as: android, ios, web-sdk
 document
type
 Yes
 one of 3 values: idr, passport, dlr. Meaning: idr (identity card), dlr
 (driver license)
 side-type
 optional
 if you want to request API with each side of document, set value by
 front or back. Note that front must be requested first
 lang
 Request Body
 optional
 en
 response language, supported: en, vi
 FormData containing the images to query. The order of front side and back side must be exact. If
 document-type is passport or using side-type in headers, there only needs 1 file.
 Parameter Request Value
 Description
 files
 Yes
 path-to-image
 captured image of frond
 files
 Yes
 Sample Request
 path-to-image
 captured image of back
 curl --location --request POST 'base_url/ocr' \ --header 'api-key: your api-key' \ --header 'session-id: 7760a743-884b-4195-b781-892e72c7b0b6' \ --header 'device-type: android' \ --header 'document-type: idr' \ --header 'lang: vi' \ --form 'files=@"path-to-front.jpg"' \ --form 'files=@"path-to-back.jpg"' 
2 / 8
 Response
docs_ekyc_backend_api_2023.md
 2023-12-07
 Success
 { 
    "errorCode": "0", 
    "errorMessage": "", 
    "data": [ 
        { 
            "key": "ID", 
            "name": "Sô
 ́/ No", 
            "value": "xxxxx", 
            "score": "98.66", 
            "locale": "vn" 
        }, 
        { 
        }, 
        { 
        }, 
        { 
        }, 
        { 
        }, 
        { 
        }, 
        { 
            "key": "Name", 
            "name": "Họ và tên", 
            "value": "your name, 
            "score": "99.71", 
            "locale": "vn" 
            "key": "Date of birth", 
            "name": "Ngày sinh", 
            "value": "dd/mm/yyyy", 
            "score": "98.41", 
            "locale": "vn" 
            "key": "Sex", 
            "name": "Giới tính", 
            "value": "NAM", 
            "score": "98.30", 
            "locale": "vn" 
            "key": "Nationality", 
            "name": "Quô
 ́c tịch", 
            "value": "VIỆT NAM", 
            "score": "99.77", 
            "locale": "vn" 
            "key": "Home", 
            "name": "Quê quán", 
            "value": "X, Y NAM ĐỊNH", 
            "score": "96.54", 
            "locale": "vn" 
            "key": "Address", 
            "name": "Địa chi
 ̉", 
            "value": "X, Y NAM ĐỊNH", 
3 / 8
docs_ekyc_backend_api_2023.md
            "score": "98.27", 
            "locale": "vn" 
        }, 
        { 
        }, 
        { 
        }, 
        { 
        }, 
        { 
        }, 
        { 
        }, 
        { 
        }, 
        { 
        }, 
        { 
            "key": "Expired Date", 
            "name": "Ngày hê
 ́t hạn", 
            "value": "dd/mm/yyyy", 
            "score": "98.93", 
            "locale": "vn" 
            "key": "Type", 
            "name": "Loại", 
            "value": "7", 
            "score": "N/A", 
            "locale": "vn" 
            "key": "Province", 
            "name": "Ti
 ̉nh/Thành Phô ́", 
            "value": "NAM ĐỊNH", 
            "score": "N/A", 
            "locale": "vn" 
            "key": "District", 
            "name": "Quận/ Huyện", 
            "value": "Y, 
            "score": "N/A", 
            "locale": "vn" 
            "key": "Ward", 
            "name": "Phường/Xã", 
            "value": "X", 
            "score": "N/A", 
            "locale": "vn" 
            "key": "Features", 
            "name": "Đặc điê
 ̉m nhận dạng", 
            "value": "SẸO CHÂ
 ́M , 
            "score": "99.78", 
            "locale": "vn" 
            "key": "Issue Date", 
            "name": "Ngày câ
 ́p", 
            "value": "dd/mm/yyyy", 
            "score": "99.31", 
            "locale": "vn" 
            "key": "Issue Location", 
́
 2023-12-07
 4 / 8
docs_ekyc_backend_api_2023.md
            "name": "Nơi câ
 ́p", 
            "value": "CỤC TRƯƠ
 TỰ XÃ HỘI", 
        } 
            "score": "95.40", 
            "locale": "vn" 
    ], 
    "total_data": [] 
} 
Returned Information
 Fields
 errorCode
 Description
 2023-12-07
 ̉NG CỤC CA ̉NH SÁT QUA ̉N LÝ HÀNH CHÍNH VÊ ̀ TRẬT 
error code, errorCode = 0 means request success. Otherwise request has error. Such
 as: not valid document, document is expired,...
 errorMessage message display to user. message has value when errorCode <> 0. Language of
 message is set by lang in headers
 data
 returned data to show OCR result
 Sample Response: Error
 Session expired
 Return when session is invalid such as: not registered, timeout, not match with device type,..
 { 
} 
OCR error
 { 
} 
    "errorCode": "403", 
    "errorMessage": "Phiên làm việc đã hê ́t hạn" 
    "errorCode": "3", 
    "errorMessage": "Không tìm thâ ́y tài liệu đã chọn trong ảnh" 
Face Liveness and Face Match request
 Request Url
 5 / 8
 POST <base_url/face/liveness>
docs_ekyc_backend_api_2023.md
 2023-12-07
 Request Headers
 Parameter
 Request Default Description
 session-id
 Yes
 session id get from init session request
 api_key
 Yes
 your api_key
 auto
 Yes
 set True when call from FPT SDK. Otherwise, False
 device-type
 Yes
 your device, such as: android, ios, web-sdk
 lang
 Request Body
 optional
 en
 response language, supported: en, vi
 FormData containing the selfies to query.
 Parameter Request Value
 Description
 selfies
 Yes
 Sample Request
 path-to-image
 selfie image
 curl --location --request POST 'base_url/face/liveness' \ --header 'api-key: your-api-key' \ --header 'session-id: 7760a743-884b-4195-b781-892e72c7b0b6' --header 'device-type: android' \ --header 'lang: vi' \ --form 'selfies=@"path-to-selfie-image"' \ 
Response
 Success
 { 
    "code": "200", 
    "message": "Kiê ̉m tra thực thê ̉ sô ́ng thành công", 
    "liveness": { 
        "code": "200", 
        "message": "liveness check successful", 
        "is_live": "true", 
        "spoof_prob": "N/A", 
        "need_to_review": "N/A", 
        "is_deepfake": "N/A", 
        "deepfake_prob": "N/A", 
        "warning": "N/A", 
    }, 
    "face_match": { 
        "code": "200", 
6 / 8
docs_ekyc_backend_api_2023.md
        "message": "face matching successful", 
        "isMatch": "true", 
        "similarity": "95.84", 
        "warning": "N/A" 
    }, 
    "is_complete_session": false 
} 
Returned Information
 Fields
 Description
 2023-12-07
 code
 code = 200 means request success. Otherwise request has error. Such as: not
 match, selfie image is invalid,...
 message
 message display to user. Language of message is set by lang in headers
 liveness
 returned liveness result
 face_match
 returned face match result
 is_complete_session
 Sample Error response
 { 
define whether session is complete. if False, user can retry with face verify,
 otherwise, user must capture document again
    "code": "303", 
    "message": "Khuôn mặt không khớp với giâ ́y tờ", 
    "liveness": { 
        "code": "200", 
        "message": "liveness check successful", 
        "is_live": "true", 
        "spoof_prob": "N/A", 
        "need_to_review": "N/A", 
        "is_deepfake": "N/A", 
        "deepfake_prob": "N/A", 
        "warning": "N/A", 
    }, 
    "face_match": { 
        "code": "303", 
        "message": "face is not matching with document", 
        "isMatch": "false", 
        "similarity": "5.84", 
        "warning": "N/A" 
    }, 
    "is_complete_session": false 
7 / 8
 } 
docs_ekyc_backend_api_2023.md
 2023-12-07
 { 
}
    "code": "407", 
    "message": "2 faces exist", 
    "liveness": { 
        "code": "200", 
        "message": "liveness check successful", 
        "is_live": "true", 
        "spoof_prob": "N/A", 
        "need_to_review": "N/A", 
        "is_deepfake": "N/A", 
        "deepfake_prob": "N/A", 
        "warning": "N/A", 
    }, 
    "face_match": { 
        "code": "407", 
        "message": "2 faces exist", 
        "isMatch": "N/A", 
        "similarity": "N/A", 
        "warning": "N/A" 
    }, 
    "is_complete_session": false 
8 / 8