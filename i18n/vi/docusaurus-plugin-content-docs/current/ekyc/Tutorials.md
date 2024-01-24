---
#sidebar_position: 4
title: Tutorials
---
# Tutorials
## 1. Bảo mật và quản lý API key

Việc tuân thủ các hướng dẫn dưới đây sẽ giúp bảo mật tối đa API key và đảm bảo tính toàn vẹn cho dữ liệu, phòng tránh được các rủi ro tấn công, mất quyền kiểm soát hệ thống, lộ thông tin khách hàng hoặc thiệt hại tài chính, pháp lý khác.

- **Bảo mật API key:** Không bao giờ chia sẻ API key của bạn với bất kỳ ai. Đây là bí mật quan trọng để xác thực dịch vụ của bạn đang sử dụng với hệ thống API.
- **Lưu trữ API key:** Không nên lưu API key trực tiếp trong code. Thay vào đó, lưu trữ trong biến môi trường hoặc file riêng biệt có quyền truy cập hạn chế.
- **Quản lý API key:** Nên tạo các API key riêng biệt cho từng ứng dụng, từng dự án hoặc từng nhân viên truy cập. Hạn chế quyền của mỗi API key. Chỉ cấp quyền truy cập API cho những endpoint cụ thể.
- **Đổi mới API key:** Nên đổi API key định kỳ 3-6 tháng một lần để đảm bảo an toàn tại trang https://console.fpt.ai. Vô hiệu hóa ngay API key cũ.
- **Bảo mật đường truyền:** Luôn sử dụng HTTPS để mã hóa các request gọi API.

## 2. Frequently Asked Questions:
### **Q1: eKYC SDK hỗ trợ những nền tảng nào?**  
Hiện tại SDK hỗ trợ đa dạng các nền tảng như: native iOS (objective c + swift), android (kotlin + java), react native và flutter.  
### **Q2: eKYC SDK có hỗ trợ custom giao diện được không?**   
SDK có thể hỗ trợ tùy chỉnh căn bản như màu sắc, nội dung thông báo. Còn đối với các tùy chỉnh sâu hơn thì khách hàng có thể liên hệ FPT để được nhân viên tư vấn thêm nhé. 

<div style={{textAlign: 'center'}}>
    <img src="/ekyc picture/FAQ1.png" alt="illustration"/>
</div>

### **Q3: Tại sao app demo run mà khi ghép SDK vào ứng dụng của tôi lại không chạy?**  
Khách hàng hãy kiểm tra lại các thư viện đính kèm xem đã đủ hay chưa, nếu chưa thì phía FPT sẽ liên hệ để hướng dẫn config SDK. 
### **Q4: Tại sao khi ghép SDK mà ứng dụng của tôi không dùng được tiếng việt?**  
Khách hàng có thể kiểm tra lại cấu hình setup ngôn ngữ xem đã cài đặt tiếng Việt chưa nhé. 
### **Q5: Tại sao gắn SDK rồi build ra file lại nặng, kích thước lớn**  
Do SDK sử dụng thư viện tensorflow đầy đủ tất cả các kiến trúc(x86_64, x86, arm64-v8a, armeabi-v7a) nên dung lượng file sẽ bao gồm tất cả các kiến trúc, việc này sẽ không ảnh hưởng tới end user. 

<div style={{textAlign: 'center'}}>
    <img src="/ekyc picture/FAQ2.png" alt="illustration"/>
</div> 

### **Q6: Tôi muốn ẩn StepView, GuideView... thì làm thế nào?**  
Khách hàng có thể tự cấu hình mọi thứ trên trang portal https://ekyc.fpt.ai/settings?tab=sdk  

<div style={{textAlign: 'center'}}>
    <img src="/ekyc picture/FAQ3.png" alt="illustration"/>
</div>

### **Q7: Tôi có thể cấu hình SDK để chỉ sử dụng OCR hoặc liveness ko?** 
Khách hàng có thể tùy ý cài đặt cấu hình để chỉ sử dụng OCR, Liveness tùy vào từng nghiệp vụ hoặc có thể liên hệ FPT để biết thêm các thông tin chi tiết. 
### **Q8: Tôi có thể vào thẳng màn chụp mà không cần qua màn chọn giấy tờ không?** 
Khách hàng có thể vào thẳng màn chụp giấy tờ bằng cách: Truyền DOCUMENT_TYPE mà khách hàng mong muốn. 
### **Q9: Tại sao tôi chỉ debug được mà không release được?** 
    A: Tùy thuộc vào hệ điều hành đang sử dụng mà khách hàng có thể kiểm tra theo 2 cách sau:  <br/>
- IOS: Kiểm tra lại xem đã COCOA POD thư viện đúng chưa <br/>
- Android: Kiểm tra lại xem cấu hình file proguard đúng chưa 

### **Q10: Tại sao OCR tôi lại gặp lỗi này?** 

<div style={{textAlign: 'center'}}>
    <img src="/ekyc picture/FAQ4.jpg" alt="illustration"/>
</div>

Đây là lỗi hết hạn mức. Khách hàng có thể liên hệ bộ phận sales bên FPT để được cấp thêm. <br/>
**Thông tin liên hệ:** 
- 1900 638 399 
- support@fpt.ai 

### **Q11: Tôi muốn ẩn chế độ quay thủ công thì làm thế nào?** 
FPT không khuyến khích khách hàng ẩn chế độ này, vì có một số máy có thể gặp hiện tượng giật, lag khi quay tự động. Nếu khách hàng vẫn muốn ẩn tính năng này thì có thể liên hệ bộ phận sales để được tư vấn cụ thể hơn.
**Thông tin liên hệ:** 
- 1900 638 399 
- support@fpt.ai 
