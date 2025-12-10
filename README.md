# 🎯 Nuôi Nam - Trang Fundraising Minh Bạch

Một trang fundraising vui vẻ, minh bạch 100%, được lấy cảm hứng từ "Nuôi Tôi" nhưng với nội dung dành riêng cho **Nuôi Nam**.

## 📋 Giới thiệu

"Nuôi Nam" là một dự án mã nguồn mở để tạo một trang web fundraising với các đặc điểm chính:

✅ **Minh bạch hoàn toàn** - Mỗi đồng tiêu được ghi lại  
✅ **Realtime log** - Cập nhật chi tiêu liên tục  
✅ **Không drama** - Chỉ đơn giản là: tôi cần tiền, bạn giúp  
✅ **Mã nguồn mở** - Fork, sửa, customize theo ý mình  

## 🎨 Các tính năng

- 🏠 **Trang chủ** - Giới thiệu và thống kê nhanh
- 📊 **Sao kê realtime** - Log chi tiêu hôm nay (demo)
- 💰 **Mục tiêu tháng** - Progress bar với mục tiêu tài chính
- 🤔 **Tại sao nên nuôi?** - 3 lý do chính
- ⚖️ **So sánh** - So sánh với cách làm khác
- 📈 **Phân tích chi tiêu** - Biểu đồ doughnut chi tiết
- 💳 **Donate** - Nhiều cách donate (Momo, ZaloPay, Ngân hàng)
- 👥 **Danh sách người ủng hộ** - Log donation từ bạn bè (demo)
- ❓ **FAQ** - Trả lời các câu hỏi thường gặp
- 📱 **Responsive** - Hoạt động tốt trên mọi thiết bị

## 🛠️ Công nghệ sử dụng

- **HTML5** - Cấu trúc
- **CSS3** - Styling (Gradient, Flexbox, Grid)
- **JavaScript (Vanilla)** - Interactivity
- **Chart.js** - Biểu đồ chi tiêu

## 📦 Cài đặt

### Yêu cầu
- Không cần cài đặt server phức tạp
- Chỉ cần một trình duyệt web hiện đại

### Cách sử dụng

1. **Clone repository**
```bash
git clone https://github.com/yourusername/nuoi-nam.git
cd nuoi-nam
```

2. **Mở tệp `index.html` trong trình duyệt**
```bash
open index.html
# hoặc
start index.html
```

3. **Hoặc sử dụng live server (nếu có)**
```bash
python -m http.server 8000
# Sau đó truy cập http://localhost:8000
```

## ⚙️ Cấu hình

### Chỉnh sửa thông tin cơ bản

Mở `index.html` và tìm các phần cần chỉnh sửa:

1. **Thay đổi tên từ "Nam" thành tên của bạn**
   - Tìm `.logo-text` trong navbar
   - Tìm `hero-title` và thay đổi nội dung

2. **Cập nhật thống kê**
   - Sửa `total-amount` (tổng donate)
   - Sửa `supporter-count` (số người ủng hộ)

3. **Thêm mã QR donate**
   - Thay thế `.qr-placeholder` bằng hình ảnh QR code của bạn
   - Tìm dòng: `<div class="qr-placeholder">`

4. **Cập nhật link donate**
   - Mở `script.js`
   - Tìm hàm `setupFormListeners()`
   - Thêm link Momo, ZaloPay, Ngân hàng của bạn

5. **Chỉnh sửa danh mục chi tiêu**
   - Trong section "Tiền của bạn sẽ đi đâu?"
   - Sửa % và mô tả cho phù hợp

## 📝 Cấu trúc tệp

```
nuoi-nam/
├── index.html          # File HTML chính
├── styles.css          # File CSS styling
├── script.js           # File JavaScript
├── README.md           # File hướng dẫn (file này)
└── .gitignore          # File git ignore
```

## 🎯 Hướng phát triển tiếp theo

- [ ] Kết nối database để lưu trữ log chi tiêu thực tế
- [ ] Tích hợp Momo API để xử lý donation
- [ ] Tích hợp ZaloPay API
- [ ] Thêm tính năng đăng ký nhận thông báo
- [ ] Thêm dashboard admin để quản lý log
- [ ] Hỗ trợ đa ngôn ngữ (EN, ZH)
- [ ] Dark mode
- [ ] PWA (Progressive Web App)

## 🚀 Deploy

### GitHub Pages (Miễn phí)

1. Tạo một repository trên GitHub: `yourusername.github.io`
2. Push code lên:
```bash
git remote add origin https://github.com/yourusername/yourusername.github.io.git
git branch -M main
git push -u origin main
```
3. Trang của bạn sẽ có sẵn tại: `https://yourusername.github.io`

### Vercel (Miễn phí)

1. Truy cập [vercel.com](https://vercel.com)
2. Kết nối repository GitHub của bạn
3. Click "Deploy"

### Netlify (Miễn phí)

1. Truy cập [netlify.com](https://netlify.com)
2. Kéo và thả thư mục `nuoi-nam`
3. Trang của bạn sẽ được deploy tự động

## 💡 Tips & Tricks

1. **Tùy chỉnh màu sắc**
   - Mở `styles.css`
   - Tìm `:root`
   - Thay đổi các biến CSS

2. **Thêm từ của riêng bạn**
   - Hãy thêm một phần "Một chút về tôi" với tiểu sử
   - Thêm ảnh đại diện

3. **Tối ưu hóa cho SEO**
   - Thêm description chi tiết trong `<meta>`
   - Thêm og:image cho preview tốt hơn

4. **Bảo mật**
   - Không chia sẻ thông tin cá nhân quá chi tiết
   - Sử dụng các dịch vụ payment uy tín

## 📄 License

MIT License - Bạn tự do sử dụng, sửa đổi, và phân phối code này.

## 🤝 Đóng góp

Những đóng góp được chào đón! Hãy:

1. Fork repository
2. Tạo một branch feature (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Mở Pull Request

## ❓ Câu hỏi thường gặp

**Q: Tôi có thể copy code này không?**  
A: Có, đó là mục đích của nó! Fork nó, customize, deploy, và chia sẻ.

**Q: Có an toàn không?**  
A: Đây là HTML/CSS/JS tĩnh. Hoàn toàn an toàn. Nếu bạn muốn backend, tự thêm sau.

**Q: Tôi có thể thay đổi thông tin donate không?**  
A: Có, chỉnh sửa file `index.html` và `script.js` theo ý bạn.

**Q: Làm sao để thêm database?**  
A: Bạn có thể sử dụng Firebase, Supabase, hoặc backend riêng.

## 📞 Liên hệ

Nếu có vấn đề hoặc câu hỏi, hãy:
- Mở một Issue trên GitHub
- Gửi pull request với cải thiện của bạn

## 🙏 Cảm ơn

Cảm ơn bạn đã ủng hộ dự án này!

---

**Made with ❤️ & instant noodles** 🍜

*TRANG VUI VẺ • KHÔNG LÙA GÀ*
