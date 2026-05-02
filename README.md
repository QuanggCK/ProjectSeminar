# 🎓 CodeLearning — Nền tảng Học Lập Trình Trực Tuyến

> Web học lập trình tương tác dành cho CLB Tin học NTU — học C, C++, Java, Python với bài giảng, ví dụ code và quiz.

![React](https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react)
![Vite](https://img.shields.io/badge/Vite-7-646CFF?style=flat-square&logo=vite)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3-06B6D4?style=flat-square&logo=tailwindcss)
![Zustand](https://img.shields.io/badge/Zustand-State-orange?style=flat-square)

---

## 📖 Mô tả

**CodeLearning** là nền tảng học lập trình trực tuyến được xây dựng cho seminar của CLB Tin học NTU. Web cung cấp:

- 📚 **4 khóa học**: C, C++, Java, Python
- 📖 **Bài giảng có cấu trúc**: Lý thuyết → Ví dụ code → Quiz mỗi chủ đề
- ✅ **Quiz tương tác**: Trắc nghiệm với chấm điểm tự động
- 📊 **Theo dõi tiến độ**: Tiến độ từng khóa, từng bước
- 📝 **Ghi chú bài học**: Viết ghi chú cho mỗi bài học
- 🔖 **Bookmark**: Đánh dấu bài quan trọng
- 🏆 **Thành tựu**: Huy hiệu khi hoàn thành mốc quan trọng
- 🔐 **Đăng ký/Đăng nhập**: Hệ thống auth với localStorage
- 🎨 **Aqua Mint Design**: Thiết kế hiện đại, chuyên nghiệp

---

## 🛠️ Tech Stack

| Công nghệ | Mục đích |
|---|---|
| **React 19** | UI Framework |
| **Vite 7** | Build tool & Dev server |
| **React Router 7** | Routing (SPA) |
| **Zustand** | State management |
| **TailwindCSS 3** | Utility-first CSS |
| **Lucide React** | Icon library |
| **localStorage** | Mock database |

---

## 🚀 Cách chạy

### Yêu cầu
- Node.js >= 18
- npm >= 9

### Cài đặt & Chạy

```bash
# Clone repo
git clone <repo-url>
cd ProjectSeminar

# Cài dependencies
npm install

# Chạy dev server
npm run dev
```

Mở trình duyệt tại: `http://localhost:5173`

### Build production

```bash
npm run build
npm run preview
```

---

## 📁 Cấu trúc thư mục

```
src/
├── components/
│   ├── common/          # Button, Card, Input, LoadingSpinner
│   └── layout/          # Navbar, Sidebar, Layout
├── pages/
│   ├── LoginPage.jsx        # Đăng nhập
│   ├── RegisterPage.jsx     # Đăng ký
│   ├── DashboardPage.jsx    # Trang chủ (thống kê, khóa học)
│   ├── CoursesPage.jsx      # Danh sách khóa học
│   ├── CourseDetailPage.jsx # Học bài (wizard steps)
│   ├── ProfilePage.jsx      # Hồ sơ, ghi chú, bookmark
│   └── NotFoundPage.jsx     # 404
├── store/
│   └── useStore.js      # Zustand (auth + course + UI)
├── services/
│   ├── authService.js   # Mock auth (register/login)
│   └── courseService.js # Progress, notes, bookmarks
├── utils/
│   ├── constants.js     # App constants, routes, themes
│   └── helpers.js       # Utility functions
├── data/
│   ├── courses.js       # Course registry
│   ├── lang_c.js        # Nội dung C
│   ├── lang_cpp.js      # Nội dung C++
│   ├── lang_java.js     # Nội dung Java
│   └── lang_python.js   # Nội dung Python
├── App.jsx              # Router & route guards
├── main.jsx             # Entry point
└── index.css            # Aqua Mint design system
```

---

## 🎨 Design System — Aqua Mint

| Token | Giá trị | Vai trò |
|---|---|---|
| Primary | `#0F2E2C` | Tiêu đề, text chính |
| Secondary | `#5A8280` | Caption, metadata |
| Tertiary | `#2DD4BF` | CTA button, accent |
| Neutral | `#E8F7F3` | Nền trang |
| Surface | `#FFFFFF` | Card, panel |
| Font | DM Sans / DM Mono | Display / Code |

---

## 🗺️ Routing

| Đường dẫn | Trang | Yêu cầu Auth |
|---|---|:---:|
| `/` | Đăng nhập | ❌ |
| `/register` | Đăng ký | ❌ |
| `/dashboard` | Dashboard | ✅ |
| `/courses` | Danh sách khóa học | ✅ |
| `/course/:id` | Chi tiết khóa học | ✅ |
| `/profile` | Hồ sơ cá nhân | ✅ |
| `*` | 404 | ❌ |

---

## 👥 Tác giả

CLB Tin học — Đại học Nha Trang (NTU)

---

## 📄 License

MIT
