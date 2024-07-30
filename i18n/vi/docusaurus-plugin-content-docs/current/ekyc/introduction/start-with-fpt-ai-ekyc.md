---
sidebar_position: 3
title: Bắt đầu với FPT AI eKYC
---

# Bắt đầu với FPT AI eKYC
### 1. Hướng dẫn đăng ký tài khoản trên FPT Console và trải nghiệm sản phẩm FPT AI eKYC 
Quý khách hàng có thể trải nghiệm, sử dụng dịch vụ của FPT AI chỉ sau vài bước đơn giản sau đây: <br/>
**Bước 1:**  Khách hàng tạo tài khoản trên console FPT SmartCloud  
Link tạo: https://id.fptcloud.com/auth/realms/FptSmartCloud/login-actions/registration?client_id=account-console&tab_id=HpBNu5Dt98U 

<div style={{textAlign: 'center'}}>
    <img src="/ekyc picture/register.png" alt="Mô tả hình ảnh"/>
</div>
<span style={{color: 'red'}}>**Lưu ý: Khách hàng không tự tạo project trên Console. </span> 

**Bước 2:** Khách hàng thông báo lại cho nhân viên kinh doanh (AM) phía FPT AI về tài khoản email đã đăng ký để được phân bổ hạn mức sử dụng và hỗ trợ trải nhiệm dịch vụ. <br/>
**Thông tin liên hệ - hotline:** 
- FPT.AI - support@fpt.ai 
- FPT Tower, 10 Pham Van Bach street, Cau Giay District, Hanoi, Vietnam 
- 1900 638 399 

**Bước 3:** Khách hàng thực hiện lấy API key từ tài khoản đã tạo tại hướng dẫn hình dưới 
<div style={{textAlign: 'center'}}>
    <img src="/ekyc picture/api.png" alt="Mô tả hình ảnh"/>
</div>

**Bước 4:** Sử dụng API key: Thêm API key vào header hoặc tham số query của mỗi request gửi đến API để xác thực. <br/>
**Ví dụ:** ?api_key=abcdefgh1234 <br/>
**Bước 5:** AM (Nhân viên kinh doanh) của FPT AI sẽ tạo project và hướng dẫn khách hàng sử dụng api key từ tài khoản đã tạo (bao gồm bảo mật api key và rotate api key định kỳ). <br/>
<span style={{color: 'red'}}>**Lưu ý:</span>
1. Trong trường hợp khách hàng cần sử dụng nhiều project để phục vụ đối soát ví dụ OCR cho các phòng ban khách nhau: tạo project khác nhau. 
2. Trong trường hợp khách hàng cần sử dụng dịch vụ trên các môi trường khác nhau PROD/STAG: tạo project trên cùng tài khoản hoặc mở project mới trên tài khoản riêng biệt. 

**Bước 6:** Khách hàng bắt đầu trải nghiệm sản phẩm. AM (Nhân viên kinh doanh) sẽ tạo các kênh liên lạc, hỗ trợ kỹ thuật và gửi các tài liệu API và hướng dẫn kỹ thuật liên quan. <br/>
Sau bước trải nghiệm thử dịch vụ, khách hàng có thể tiến hành luôn giai đoạn kiểm thử và tích hợp lên các môi trường cần thiết. Quá trình hỗ trợ kiểm thử và tích hợp thành công, nhân viên kinh doanh sẽ thống nhất kế hoạch go-live chính thức để phân bổ hạ tầng và hạn mức sử dụng phù hợp cho khách hàng. 

### 2. Các tính năng của FPT AI eKYC 
<div style={{textAlign: 'center'}}>
    <img src="/ekyc picture/stream.png" alt="Minh họa luồng eKYC"/>
</div>

<div style={{textAlign: 'center'}}>
    <p>Minh họa luồng eKYC</p>
</div>

Giải pháp FPT AI eKYC bao gồm nhiều tính năng riêng biệt, có thể được tùy chỉnh, kết hợp thành luồng eKYC dựa trên các yêu cầu tùy chỉnh của khách hàng: 
1. **ID OCR (Trích xuất dữ liệu):** Bóc tách các trường quan trọng từ giấy tờ tùy thân. Sản phẩm có khả năng trích xuất thông tin từ nhiều nguồn và định dạng khác nhau: 
- **Trích xuất thông tin bề mặt:** Sử dụng công nghệ trí tuệ nhân tạo và Optical Character Recognition (OCR), các ký tự, đặc trưng và hình ảnh chân dung trên bề mặt đều được nhận diện và trích xuất với độ chính xác cao.  
- **Trích xuất thông tin từ mã MRZ:** Nhận diện ký tự và phân tích cú pháp mã MRZ theo tiêu chuẩn ICAO. <br/>
**Ví dụ:** mã MRZ mặt sau CCCD bao gồm: Dòng 1: số CCCD , Dòng 2: ngày sinh - giới tính - ngày hết hạn CCCD, Dòng 3: Họ và tên không dấu.   
- **Trích xuất thông tin từ mã QR code:** Độ đặc hiệu cao do tính toàn vẹn dữ liệu của mã QR code giúp trích xuất thông tin chính xác từ hình ảnh có chất lượng tốt.  Ví dụ mã QR code từ mặt trước CCCD bao gồm các thông tin: Số CCCD 12 số, số CMND 9 số, Họ tên, ngày tháng năm sinh, giới tính, quê quán, địa chỉ, ngày tháng năm cấp.  
- **Trích xuất thông tin từ Chip NFC:** Sử dụng SDK trên các thiết bị có khả năng đọc chip (tất cả các dòng máy iphone/iOS và hầu hết các dòng máy sử dụng hệ điều hành Android từ phiên bản 8.0 trở lên và tùy vào mỗi loại thiết bị di động của mỗi khách hàng mà vị trí đọc chip NFC sẽ khác nhau.). Cụ thể 18 trường thông tin được trích xuất từ chip NFC của CCCD gắn chip: Số CCCD, họ và tên, họ và tên khác; ngày, tháng, năm sinh; giới tính; quốc tịch; dân tộc; tôn giáo; quê quán; nơi đăng ký thường trú; đặc điểm nhân dạng; ngày cấp; ngày hết hạn; họ tên cha/mẹ, vợ/chồng; số CMND 9 số; ảnh chân dung; đặc điểm vân tay hai ngón trỏ... & chữ ký số.  
2. **ID Quality check:** Kiểm tra phát hiện và đưa ra cảnh báo đối với ảnh đầu vào không chất lượng, ảnh hưởng kết quả trích xuất OCR, ví dụ:  Chói sáng, mờ nhoè, mất góc, đục lỗ; hình photocopy; màu đen trắng… 
3. **ID Fraud check:** Phát hiện các giấy tờ tùy thân có dấu hiệu giả mạo. Các dấu hiệu giả mạo thường gặp như:  

- Dán đè ảnh, và sửa đổi thông tin trên thẻ (Tên, Số ID)   
- Chụp lại ảnh qua màn hình  
- Chỉnh sửa chân dung, dán đè chân dung  
- Thay đổi các kênh màu   

    Sử dụng bộ 98 điều kiện kiểm tra thông tin và vị trí tiêu chuẩn trên giấy CMND/CCCD của Bộ Công an để xác minh tính tính xác của thông tin. 
4. **Face Match (1:1):** So sánh gương mặt trên ảnh Selfie và ảnh trên giấy tờ tùy thân  
5. **Face Search (1:n):** Tìm kiếm một gương mặt trong tập hợp n gương mặt đã được số hóa và chuẩn hóa  
6. **Liveness Detection:** Sử dụng video 3-5s để phát hiện các hình thức giả mạo selfie để chiếm đoạt danh tính người khác, ví dụ chụp ảnh qua màn hình, deepfake hay ảnh thẻ.  
7. **Kiểm tra thông tin dữ liệu (DB check):** Nhằm hỗ trợ chống tấn công hệ thống hàng loạt, hệ thống thực hiện lưu thông tin số ID và hình ảnh khuôn mặt nếu phát hiện có liên quan đến bất kì hành vi giả mạo nào đã liệt kê ở trên. Các hành vi giả mạo trong tương lai sử dụng lại các thông tin số ID hoặc hình ảnh gương mặt này sẽ bị phát hiện và ngăn chặn kịp thời. Các thông tin này sẽ được xóa khỏi hệ thống sau một khoảng thời gian mặc định 6 tiếng hoặc có thể tùy chỉnh theo yêu cầu của khách hàng.  
8. **Kết nối và đối chiếu với Cơ sở dữ liệu bên thứ ba** 
- Dịch vụ tham chiếu thông tin từ CSDL Telco :  
    + Kiểm tra thông tin thuê bao chính chủ 
    + Input: số ID + số điện thoại   
    + Output chính: Hai thông tin trên có khớp không   
* Dịch vụ tham chiếu thông tin CSDL Quốc gia C06:  
    + Tính đến hết tháng 4 năm 2023, tại Việt Nam có hơn 80 triệu CCCD gắn chip, việc tích hợp cơ sở dữ liệu quốc gia và kiểm tra thông tin chip sẽ là phương thức định danh và chống giả mạo hiệu quả trong thời gian tới. Quá trình xác thực thông tin trong chip của CCCD chip thông qua mobile FPT AI SDK gồm 3 bước: 	  <br/>
        **Bước 1:** Đọc thông tin chip thông qua mobile SDK hoặc thiết bị chuyên dụng (FPT AI cung cấp) 18 trường thông tin trong chip <br/>
        **Bước 2:** Kiểm tra tính toàn vẹn của data trong chip (dịch vụ BCA cung cấp)   <br/>
        **Bước 3:** Xác định certificate chữ ký số trong CCCD là chuẩn (dịch vụ BCA cung cấp)  

### 3. Yêu cầu dữ liệu đầu vào 
**Định dạng dữ liệu đầu vào:** Hỗ trợ file định dạng ảnh (*.JPG, *.JPEG, *.PNG, *.BMP) hoặc PDF (*.PDF) 

**Chất lượng dữ liệu đầu vào:** <br/>
*Đối với file ảnh:*  
* Dung lượng file không vượt quá 5Mb 
* Kích thước tối thiểu đạt 1280x720 
* Ảnh đầu vào phải đủ 4 góc rõ ràng hoặc đầy đủ các thông tin chính của 1 giấy tờ như ngày tháng, mã số hóa đơn, số hợp đồng, tiêu đề 
* Các trường thông tin phải rõ ràng, so sánh khi mắt người có thể đọc được dễ dàng, không tẩy xóa, mờ bẩn, vạch kẻ, cong nghiêng, lóa, rách hay bị nhòe nước 
* Tỉ lệ diện tích giấy tờ phải chiếm tối thiểu 3/4 tổng diện tích ảnh 

*Đối với file PDF scan:* 
* Dung lượng file không vượt quá 30Mb 
* DPI tối thiểu đạt 300 
* Hỗ trợ xử lí các file có độ nghiêng ≤10⁰, xoay ngang, xoay ngược 
* Hệ thống hỗ trợ đưa ra cảnh báo với các trường hợp chất lượng ảnh kém (scan mờ, nhòe, sọc dọc, vết bẩn, nhăn, rách, bóng lóa), ảnh hưởng độ tự tin kết quả trích xuất được. 

Các thiết bị quay chụp có tích hợp dịch vụ eKYC cần đảm bảo cho ra được chất lượng dữ liệu tương đương, khuyến nghị nên sử dụng SDK do phía FPT cung cấp để đảm bảo việc xử lý dữ liệu và có thể cảnh báo người dung với các trường hợp dữ liệu đầu vào không đạt tiêu chuẩn. 


