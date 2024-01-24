# Hướng dẫn gọi API full luồng eKYC

## Step 1: Init session
Với mỗi phiên thực hiện eKYc, khởi tạo phiên bằng cách call API init session. Mỗi phiên sẽ tồn tại mặc định là 30 phút (có thể config thay đổi được), nếu quá thời gian thì sẽ báo lỗi session timeout
### Request Url
POST <base_url/session/init>
### Request Headers
| **Parameter** | **Required** | **Default** | **Description**                                                          |
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
- Http status <> 200: Return lỗi

### Ví dụ response thành công của API Init session

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
| message          | Thông báo lỗi |
| session-id       | Mã định danh của phiên eKYC |

### Mã lỗi

HTTP Code | Error Code | Error Message | Meaning
---------- | ------- | ------------- | -------
400 | 400 | device type must be provided | Nguồn gửi request đang không được cung cấp hoặc giá trị không phù hợp. Các giá trị cho phép bao gồm android / ios / web-sdk / api.
401 | 401 | get api key info failed | Thiếu hoặc sai API key

## Step 2: OCR mặt trước giấy tờ
### Request Url
POST <base_url/ocr>
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

- ```Http status = 200, response[errorCode] = "0"```: OCR mặt trước giấy tờ thành công. Chuyển qua step 3. 
--  ```response[data]```: list các phần tử chứa thông tin của **mặt trước giấy tờ**
- Nếu không thỏa mãn điều kiện trên: OCR thất bại, hiển thị message trong ```response[errorMessage]```để thông báo cho user chụp lại

### Ví dụ response thành công của API OCR mặt trước giấy tờ

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

Đối với các trường hợp request thành công, chi tiết các trường thông tin trả về như bảng bên dưới

### Chi tiết các trường thông tin trả về của mặt trước

| **Fields**       | **Description**                                     |
|------------------|-----------------------------------------------|
| errorCode        | Mã lỗi                          |
| errorMessage     | Thông báo lỗi |
| data     | Kết quả OCR. Trường thông tin data gồm một list các trường thông tin trích xuất được từ cả hai mặt của giấy tờ. Mỗi trường thông tin trích xuất được sẽ gồm các thông tin: "**key**" (tên định danh của trường), "**name**" (tên trường giải thích bằng tiếng Việt), "**value**" (giá trị OCR của trường), "**score**" (điểm tự tin của kết quả OCR), "**locale**" (mã quốc gia) - tham khảo [*response thành công của API OCR mặt trước giấy tờ*](#Ví-dụ-response-thành-công-của-API-OCR-mặt-trước-giấy-tờ)|
| ID | Số Chứng minh nhân dân hoặc Căn cước công dân |
| Name | Họ và tên |
| Date of birth | Ngày sinh |
| Sex | Giới tính |
| Nationality | Quốc tịch |
| Home | Nguyên quán |
| Address | Địa chỉ |
| Expired Date | Ngày hết hạn |
| QRcode | Giá trị QRcode |
| Type | Loại giấy tờ |
| Province | Tỉnh/thành phố tách từ Address |
| District | Quận/huyện tách từ Address |
| Ward | Phường/xã tách từ Address |
| Street | Đường/phố tách từ Address |

Đối với các trường hợp request không thành công (chưa tới được engine AI), lỗi trả về được liệt kê trong danh sách **Các mã lỗi chung** như dưới đây: 

### Các mã lỗi chung

HTTP Code | Error Code | Error Message | Meaning
---------- | ------- | ------------- | -------
200 | 400 | api-key must be provided | Thiếu hoặc sai API key
200 | 400 | document-type header must be provided | Thiếu thông tin về loại giấy tờ. Các giá trị cho phép bao gồm "idr" / "dlr" / "passport"
200 | 400 | document-type value is invalid | Thông tin về loại giấy tờ đã được cung cấp nhưng không nằm trong các giá trị cho phép. Các giá trị cho phép bao gồm "idr" / "dlr" / "passport"
403 | 403 | Session expired | Phiên thực hiện eKYC hết hạn
200 | 400 | uuid must be provided | Thiếu thông tin về session id
200 | 400 | country code value is invalid | Thông tin về mã quốc gia không hợp lệ. Giá trị cho phép là "vi"
200 | E101 | Front picture must be taken first | Mặt trước giấy tờ phải được gửi đi trước
200 | E102 | Document type is not supported | Loại giấy tờ không hợp lệ. Các giá trị cho phép bao gồm "idr" / "dlr" / "passport"
200 | E103 | Please capture your rear document | Khi đã gửi mặt trước trong phiên rồi thì không thể gửi tiếp mặt trước

Đối với các trường hợp request thành công (tới được engine AI), lỗi trả về được liệt kê trong các danh sách dưới đây:

- Lỗi file đầu vào
- Lỗi liên quan tới chất lượng ảnh
- Lỗi liên quan tới giả mạo
- Lỗi hậu kiểm

### Lỗi file đầu vào

HTTP Code | Error Code | Error Message | Meaning
---------- | ------- | ------------- | -------
400 | 1 | Invalid Parameters or Values | Sai thông tin khi gửi request
400 | 3 | Unable to find the selected document in the image | Không tìm thấy giấy tờ hợp lệ trong ảnh
400 | 7 | Invalid image file | File ảnh gửi lên bị hỏng

### Lỗi liên quan tới chất lượng ảnh

HTTP Code | Error Code | Error Message | Meaning
---------- | ------- | ------------- | -------
200 | QC01 | Image resolution is too low | Độ phân giải của ảnh quá thấp Tối thiểu là 640x480.
200 | QC02 | Image has bright spot(s) | Giấy tờ trong ảnh bị bóng
200 | QC03 | Image is blurry | Ảnh bị mờ
200 | QC04 | Image has bad luminance | Giấy tờ trong ảnh bị bóng

### Lỗi liên quan tới giả mạo

HTTP Code | Error Code | Error Message | Meaning
---------- | ------- | ------------- | -------
200 | FC01 | Document is black-and-white photocopy | Giấy tờ là bản photocopy đen trắng
200 | FC02 | Document has been re-captured from LCD screen | Giấy tờ là bản chụp lại từ màn hình LCD
200 | FC03 | Document has been edited or is colored photocopy | Giấy tờ là bản photocopy màu hoặc đã bị chỉnh sửa
200 | FC04 | Document has been cornered | Giấy tờ bị cắt góc
200 | FC05 | Missing face on front side of document | Không tìm thấy khuôn mặt ở mặt trước của giấy tờ
200 | FC06 | Missing QRcode on front side of document | Không tìm thấy QRcode ở mặt trước của căn cước công dân gắn chip
200 | FC07 | Missing MRZ on back side of document | Không tìm thấy vùng MRZ ở mặt sau của căn cước công dân gắn chip

### Lỗi hậu kiểm

HTTP Code | Error Code | Error Message | Meaning
---------- | ------- | ------------- | -------
200 | E-1 | Cannot do postcheck | Có lỗi xảy ra trong quá trình thực hiện hậu kiểm
200 | E01 | There is a blank field | Có trường trống trong kết quả OCR
200 | E02 | ID format is not correct | Format của số ID không đúng
200 | E03 | DoB format is not correct | Format của ngày sinh không đúng
200 | E04 | DoB is later than today | Ngày sinh trong kết quả OCR không thể sau ngày hôm nay
200 | E05 | Current age cannot be smaller than 14 | Tuổi hiện tại dưới 14 tuổi
200 | E06 | Nationality is not correct | Quốc tịch không đúng
200 | E07 | Year in DoB does not match with ID number | Năm sinh không khớp với số ID
200 | E08 | Gender code does not match | Mã giới tính trong số ID không khớp
200 | E09 | DoE format is not correct | Format của ngày hết hạn không đúng
200 | E10 | ID card has been expired | Giấy tờ hết hạn
200 | E11 | DoE cannot be KHÔNG THỜI HẠN | Ngày hết hạn không thể là KHÔNG THỜI HẠN đối với giấy tờ gửi lên
200 | E12 | DoI format is not correct | Format của ngày cấp không đúng
200 | E13 | DoI is later than today | Ngày cấp trong kết quả OCR không thể sau ngày hôm nay
200 | E15 | Please send images of the front and the back side of same type ID (old or new ID) | Hai mặt của giấy tờ không cùng loại (áp dụng cho các loại giấy tờ không phải CCCD gắn chip)
200 | E16 | There is a blank field in the front side | Có trường trống trong kết quả OCR của mặt trước
200 | E17 | Age at issue date cannot be smaller than 14 | Tuổi ở năm cấp giấy tờ CMND/CCCD không thể dưới 14
200 | E18 | DoE should be DoI + 15 years | Ngày hết hạn của giấy tờ gửi lên phải là 15 năm kể từ ngày cấp
200 | E19 | DoE should be birthday at 25 years old | Ngày hết hạn của giấy tờ gửi lên phải là sinh nhật 25 tuổi
200 | E20 | DoE should be birthday at 40 years old | Ngày hết hạn của giấy tờ gửi lên phải là sinh nhật 40 tuổi
200 | E21 | DoE should be birthday at 60 years old | Ngày hết hạn của giấy tờ gửi lên phải là sinh nhật 60 tuổi
200 | E22 |DoE should be KHÔNG THỜI HẠN | Ngày hết hạn của giấy tờ gửi lên phải là KHÔNG THỜI HẠN
200 | E23 | Passport has been expired | Passport hết hạn
200 | E24 | Passport number format is not correct | Format của số passport không đúng
200 | E25 | Name format is not correct | Format của tên trên passport không đúng
200 | E30 | Front side and back side are not from the same card | Hai mặt không phải của cùng một giấy tờ (áp dụng cho CCCD gắn chip)
200 | E32 | Type of document does not match issue date | Loại giấy tờ không khớp với ngày cấp
200 | E110 | Wrong side-type of document | Gửi sai mặt giấy tờ. Ví dụ: thông tin side-type là "front" nhưng lại gửi ảnh mặt sau 

## Step 3: OCR mặt sau giấy tờ
Tương tự OCR mặt trước giấy tờ, thay thế headers side-type=back
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

- ```Http status = 200, response[errorCode] = "0"```: OCR mặt sau giấy tờ thành công. Chuyển qua step 4
--  ```response[data]```: list các phần tử chứa thông tin **mặt trước và mặt sau giấy tờ**
- Nếu không thỏa mãn điều kiện trên: OCR thất bại, hiển thị message trong ```response[errorMessage]```để thông báo cho user chụp lại

### Ví dụ response thành công của API OCR mặt sau giấy tờ

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

### Chi tiết các trường thông tin trả về của mặt sau

| **Fields**       | **Description**                                     |
|------------------|-----------------------------------------------|
| errorCode        | Mã lỗi                          |
| errorMessage     | Thông báo lỗi |
| data     | Kết quả OCR. Trường thông tin data gồm một list các trường thông tin trích xuất được từ cả hai mặt của giấy tờ. Mỗi trường thông tin trích xuất được sẽ gồm các thông tin: "**key**" (tên định danh của trường), "**name**" (tên trường giải thích bằng tiếng Việt), "**value**" (giá trị OCR của trường), "**score**" (điểm tự tin của kết quả OCR), "**locale**" (mã quốc gia) - tham khảo [*response thành công của API OCR mặt trước giấy tờ*](#Ví-dụ-response-thành-công-của-API-OCR-mặt-trước-giấy-tờ)|
| Features | Đặc điểm nhận dạng |
| Issue Date | Ngày cấp |
| Issue Location | Nơi cấp |
| MRZ | Machine Readable Zone |

(Chú ý: *kết quả trả về khi gửi mặt sau sẽ bao gồm cả kết quả của mặt trước*)

Đối với các trường hợp lỗi hoặc request không thành công xem của phần [*mặt trước*](#Step-2:-OCR-mặt-trước-giấy-tờ.).

## Step 4: Liveness:

- ***Sau khi bước OCR đã hoàn thành thì mới có thể tiến hành bước liveness***

- Tại bước liveness, sẽ có config số lần được phép retry theo device type. Nếu sau số lần thử không pass bước liveness, thì phiên sẽ hết hạn, quá trình ekyc không thành công
### Request Url
 
POST <base_url/face/liveness>
 
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

- ```Http status = 200, response[code] = "200"```: Liveness thành công
- Nếu không thỏa mãn điều kiện trên, liveness thất bại
- ```response[is_complete_session]```: True nếu phiên ekyc đã kết thúc (thành công hoặc vượt quá số lần thử lại). False nếu liveness thất bại và có thể chụp lại ảnh

### Ví dụ kết quả thành công của API Liveness

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
Có thể tự điều chỉnh config search như top_k, bổ sung, bật tắt các collection,...
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

### Ví dụ kết quả lỗi của API Liveness

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

### Chi tiết các trường thông tin trả về

| **Fields**       | **Description**                                     |
|------------------|-----------------------------------------------|
| code             | Code/Error                               |
| is_live          | Kết quả kiểm tra Liveness. Kết quả là True nếu prob < 0.5, ngược lại là False |
| spoof_prob          | Điểm của kết quả kiểm tra Liveness  |
| is_deepfake      | Kết quả kiểm tra deepfake (chỉ trả về trong trường hợp video đầu vào có độ phân giải thấp). Kết quả là True nếu deepfake_prob >= 0.5, ngược lại là False |
| deepfake_prob    | Điểm của kết quả kiểm tra deepfake |
| face_match       | Kết quả kiểm tra so khớp khuôn mặt (ngưỡng khớp là 80)|
| warning       | Thông tin cảnh báo chất lượng video đầu vào có thể ảnh hưởng tới kết quả |

#### Mã lỗi

| **Code** | **Meaning**                                            |
|----------|--------------------------------------------------------|
| 200      | Không có lỗi |
| 301      | Face in video is spoof |
| 302      | Video seems like deepfake |
| 303      | Face is not matching with document |
| 406      | Chất lượng ảnh khuôn mặt không tốt (bị che, quá tối hoặc quá sáng, ...) |
| 408      | Có nhiều hơn 1 khuôn mặt trong video |
| 409      | Không có video được tải lên / Video tải lên sai định dạng / Video tải lên quá ngắn /Video tải lên không hợp lệ |
| 410      | Không tìm thấy khuôn mặt hoặc khuôn mặt bị mất trong video |
| 411      | Khuôn mặt trong video quá nhỏ |
| 412      | Khuôn mặt trong video bị mờ |
| 413      | Video quay lại ảnh tĩnh |
| 422      | Không tìm thấy khung hình có khuôn mặt trực diện trong video |
| 423      | Khuôn mặt bị ra khỏi khung hình |
