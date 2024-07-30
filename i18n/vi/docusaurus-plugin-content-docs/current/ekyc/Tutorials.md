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

## 2. Dữ liệu chuẩn đầu vào

Dữ liệu sử dụng cần phân bổ số lượng đồng đều cho từng loại văn bản, và đạt tiêu chí chất lượng đẹp <br/>
Tiêu chí chất lượng đẹp không bao gồm một trong các tính chất gây ảnh hưởng chất lượng trích xuất thông tin :
- Ảnh không bị xoay/nghiêng trên 5 độ
- Ảnh không có vết mờ, vạch kẻ, vết bẩn, nhăn, rách hoặc bóng lóa
- Ảnh không nhòe, rung, không đọc được ký tự
- Ảnh không chụp mất góc
- Mỗi ảnh/trang PDF chỉ chứa 1 mặt của 1 loại giấy tờ inscope
- Không chấp nhận ảnh được chụp lại từ điện thoại qua màn hình máy tính


