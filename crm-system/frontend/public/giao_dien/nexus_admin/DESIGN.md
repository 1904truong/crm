```markdown
# Tài Liệu Hệ Thống Thiết Kế (Design System) - Admin CRM Dashboard

## 1. Overview & Creative North Star: "The Precision Architect"
Hệ thống thiết kế này không chỉ dừng lại ở việc quản lý dữ liệu; nó được xây dựng để tạo ra một cảm giác về sự **Thấu đáo (Intentionality)** và **Uy quyền (Authority)**. Thay vì đi theo lối mòn của các bảng điều khiển (dashboard) dạng lưới cứng nhắc và chia cắt bởi các đường kẻ 1px nhàm chán, chúng ta hướng tới phong cách **"The Precision Architect"**.

**Định hướng sáng tạo:**
*   **Bất đối xứng có chủ đích:** Sử dụng các khoảng trắng (negative space) rộng rãi để điều hướng thị giác, thay vì nhồi nhét thông tin.
*   **Phân tầng bằng sắc độ (Tonal Layering):** Loại bỏ hoàn toàn các đường viền (borders) truyền thống. Cấu trúc giao diện được định nghĩa bằng sự chuyển biến tinh tế của các lớp màu nền (surface tokens).
*   **Tính biên tập (Editorial Feel):** Áp dụng tỷ lệ chữ tương phản cao giữa `Display` và `Body`, biến các bảng dữ liệu khô khan thành một trải nghiệm có nhịp điệu.

---

## 2. Colors & Surface Philosophy
Hệ thống màu sắc tuân thủ chặt chẽ các token Material Design nhưng được tinh chỉnh để tạo ra chiều sâu "Glass & Gradient".

### Bảng màu chủ đạo (Core Tokens)
*   **Primary (`#004ac6`):** Màu xanh đại diện cho sự tin cậy và quyết đoán. Sử dụng cho các hành động chính.
*   **Surface (`#f8f9fb`):** Nền tảng của toàn bộ ứng dụng.
*   **Surface Container Tier:**
    *   `Lowest` (#ffffff): Dùng cho các thẻ (cards) nổi bật nhất trên nền tối hơn.
    *   `Low` (#f2f4f6): Dòng chảy chính của layout.
    *   `High` (#e7e8ea): Dùng cho các khu vực điều hướng như Sidebar khi thu nhỏ hoặc Table Header.

### Quy tắc thiết kế "No-Line"
**Tuyệt đối không sử dụng đường kẻ (border 1px solid) để phân chia các khu vực lớn.** 
*   Sử dụng sự thay đổi sắc độ giữa `Surface` và `Surface-Container-Low` để tạo ranh giới.
*   **Glassmorphism:** Đối với các phần tử lơ lửng như Modal hoặc Popover, sử dụng `Surface-Container-Lowest` với độ trong suốt 85% và `backdrop-blur: 20px`.

### Signature Textures
Sử dụng Gradient từ `Primary` (#004ac6) sang `Primary-Container` (#2563eb) với góc 135 độ cho các nút bấm chính (Primary Button) hoặc các thẻ thống kê quan trọng (Hero Stats) để tạo "linh hồn" cho giao diện, tránh cảm giác phẳng lì (flat) đơn điệu.

---

## 3. Typography: The Inter Scale
Chúng ta sử dụng **Inter** làm font chữ duy nhất để đảm bảo tính hiện đại và khả năng đọc tối ưu trong tiếng Việt.

*   **Display Large (56px):** Dùng cho các con số tổng quát (Big Numbers) trong báo cáo CRM.
*   **Headline Small (24px):** Tiêu đề của các phân khu lớn hoặc Modal.
*   **Title Medium (18px):** Tiêu đề của các thẻ Card hoặc Table Title.
*   **Body Medium (14px):** Kích thước chuẩn cho dữ liệu bảng và nội dung văn bản.
*   **Label Small (11px):** Dùng cho Caption bên dưới icon hoặc Tag/Badge.

**Ghi chú biên tập:** Luôn giữ khoảng cách dòng (line-height) ở mức 1.5 cho văn bản dài và 1.2 cho các tiêu đề để tạo sự thanh thoát.

---

## 4. Elevation & Depth: Layering Principle
Chiều sâu không đến từ bóng đổ đen kịt mà đến từ sự "xếp chồng" của các lớp vật liệu.

*   **Layering Rule:** Đặt một Card màu `Surface-Container-Lowest` lên trên một vùng nền `Surface-Container-Low`. Hiệu ứng thị giác sẽ tạo ra sự nổi khối tự nhiên mà không cần Shadow.
*   **Ambient Shadows:** Khi cần dùng bóng đổ cho Modal hoặc Drawer, hãy dùng: `box-shadow: 0 16px 48px rgba(0, 74, 198, 0.08)`. Lưu ý: bóng đổ có ám sắc xanh của màu Primary để trông tự nhiên hơn.
*   **Ghost Border Fallback:** Nếu cần phân tách các ô nhập liệu (Input), chỉ dùng `outline-variant` với độ trong suốt 20%. Tuyệt đối không dùng màu đen hoặc xám đặc.

---

## 5. Components: The Editorial Primitives

### Sidebar & Topbar
*   **Sidebar:** Sử dụng `Surface-Container-Low`. Khi thu nhỏ, các Menu Item chỉ hiển thị Icon với Tooltip. Trạng thái Active không dùng box màu, mà dùng một vạch dọc (Indicator) màu `Primary` dày 4px ở mép trái.
*   **Topbar:** Hoàn toàn trong suốt (Blur effect). Dữ liệu trên Topbar phải được căn lề theo lưới 12 cột của nội dung bên dưới.

### Table-centric UI (Trái tim của CRM)
*   **No Divider:** Loại bỏ các đường kẻ ngang giữa các dòng. Thay vào đó, sử dụng `Padding-Y: 1.1rem` (Token 5) và hiệu ứng `Hover` thay đổi màu nền sang `Surface-Container-High`.
*   **Zebra Styling:** Sử dụng màu `Surface-Container-Low` cho các dòng chẵn để hỗ trợ mắt quét dữ liệu theo chiều ngang.

### Buttons & Chips
*   **Primary Button:** Bo góc `md` (0.375rem). Sử dụng Gradient nhẹ.
*   **Status Chips (Badge):** Không dùng màu nền đặc. Sử dụng màu nền nhạt (Opacity 15% của màu chủ đạo) và chữ đậm màu. Ví dụ: Badge "Thành công" có nền xanh lá 15% và chữ `#16A34A`.

### Drawer & Modal
*   **Drawer (Phải):** Sử dụng để xem nhanh chi tiết khách hàng. Luôn có lớp Overlay phủ mờ bằng màu `on-surface` với opacity 40%.
*   **Timeline:** Sử dụng các đường nối đứt đoạn (dashed) màu `outline-variant` với độ dày 1px để tạo cảm giác nhẹ nhàng, không lấn át thông tin chính.

---

## 6. Do's and Don'ts (Nên và Không nên)

### Nên (Do)
*   **Sử dụng khoảng trắng làm vách ngăn:** Tăng giá trị Spacing (ví dụ dùng Token 8 - 1.75rem) giữa các section thay vì dùng đường kẻ.
*   **Ưu tiên căn lề trái (Left-aligned):** Đối với tất cả dữ liệu chữ trong bảng để tối ưu tốc độ đọc.
*   **Việt hóa chuẩn xác:** Sử dụng thuật ngữ chuyên môn CRM đồng nhất (ví dụ: "Tiềm năng", "Cơ hội", "Chốt đơn").

### Không nên (Don't)
*   **Lạm dụng màu sắc:** Đừng biến Dashboard thành "cầu vồng". Chỉ dùng màu Success/Danger khi thực sự cần cảnh báo hoặc thông báo trạng thái.
*   **Bóng đổ cứng (Hard Shadows):** Tránh các bóng đổ có độ mờ thấp hoặc màu đen đặc (#000).
*   **Sử dụng bo góc quá lớn:** CRM cần sự chuyên nghiệp, hãy giữ bo góc ở mức `md` (6px) hoặc `lg` (8px). Tránh dùng bo góc `xl` hoặc `full` cho các container lớn vì sẽ làm mất đi tính "Architectural".

---

**Kết luận từ Giám đốc Sáng tạo:** 
Hãy nhớ, sự tinh tế nằm ở những thứ chúng ta **loại bỏ**. Một giao diện CRM cao cấp là nơi người dùng cảm thấy dữ liệu đang "thở" chứ không phải bị giam cầm trong những ô lưới. Hãy tận dụng hệ thống sắc độ để tạo ra một môi trường làm việc tĩnh lặng, tập trung và đầy quyền uy.