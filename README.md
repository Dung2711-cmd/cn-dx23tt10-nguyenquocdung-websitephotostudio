# Website Photo Studio

Repository chứa mã nguồn website quản lý studio ảnh và các tài liệu phục vụ đồ án. Phần
website được xây dựng theo kiến trúc **Next.js App Router**, sử dụng **TypeScript** và
**Supabase** cho xác thực, dữ liệu và các nghiệp vụ phía máy chủ.

## Tổng quan bố cục

```text
.
├── README.md                 # Tài liệu tổng quan và mô tả cấu trúc dự án
├── progress-report/          # Nơi lưu báo cáo tiến độ, hiện chưa có nội dung
├── setup/                    # Nơi lưu tài liệu hoặc tệp cài đặt, hiện chưa có nội dung
├── scr/                      # Mã nguồn website
│   ├── app/                  # Route, layout, API và CSS theo Next.js App Router
│   ├── components/           # Các React component được nhóm theo tính năng
│   └── lib/                  # Mã dùng chung và phần tích hợp dịch vụ
└── thesis/                   # Báo cáo, slide, poster và tài liệu tham khảo của đồ án
    ├── abs/                  # Slide thuyết trình
    ├── doc/                  # Báo cáo định dạng Word
    ├── pdf/                  # Báo cáo và slide đã xuất sang PDF
    ├── poster/               # Poster đồ án và tệp nguồn poster
    └── refs/                 # Tài liệu tham khảo
```

> Lưu ý: thư mục mã nguồn hiện được đặt tên là `scr/`, không phải tên thường gặp
> `src/`.

## Chi tiết thư mục mã nguồn

### `scr/app/` - Route và layout

Mỗi thư mục chứa `page.tsx` tương ứng với một trang. File `layout.tsx` định nghĩa giao
diện dùng chung cho các trang con. File `route.ts` là API endpoint hoặc handler phía
máy chủ.

```text
scr/app/
├── layout.tsx                       # Root layout, metadata và khung HTML toàn website
├── globals.css                      # Toàn bộ style dùng chung
├── favicon.ico                      # Biểu tượng website
│
├── (site)/                          # Nhóm route công khai; tên nhóm không xuất hiện trên URL
│   ├── layout.tsx                   # Khung trang công khai gồm Header và Footer
│   ├── page.tsx                     # Trang chủ: /
│   ├── about/page.tsx               # Giới thiệu studio: /about
│   ├── contact/page.tsx             # Liên hệ: /contact
│   ├── gallery/page.tsx             # Thư viện ảnh: /gallery
│   ├── login/page.tsx               # Đăng nhập: /login
│   ├── register/page.tsx            # Đăng ký: /register
│   ├── privacy-policy/page.tsx      # Chính sách bảo mật: /privacy-policy
│   ├── service-details/page.tsx     # Chi tiết dịch vụ: /service-details
│   ├── services/page.tsx            # Danh sách dịch vụ: /services
│   ├── studio-guidelines/page.tsx   # Hướng dẫn tại studio: /studio-guidelines
│   └── terms-of-service/page.tsx    # Điều khoản dịch vụ: /terms-of-service
│
├── auth/                            # Luồng xác thực qua email
│   ├── confirm/route.ts              # Xác nhận mã/token và chuyển hướng sau xác thực
│   └── confirmed/page.tsx            # Trang thông báo xác nhận thành công
│
├── customer/                        # Khu vực khách hàng, chỉ dành cho role customer
│   ├── layout.tsx                   # Bảo vệ route và dùng Header/Footer chung
│   ├── page.tsx                     # Tổng quan tài khoản: /customer
│   ├── agreement/page.tsx           # Hợp đồng của khách hàng
│   ├── booking/page.tsx             # Quy trình đặt lịch
│   ├── info/page.tsx                # Thông tin cá nhân và đổi mật khẩu
│   ├── list/page.tsx                # Danh sách lịch đặt
│   ├── list/[bookId]/page.tsx       # Chi tiết một lịch đặt theo ID
│   └── payment/page.tsx             # Thanh toán và lịch sử thanh toán
│
├── dashboard/                       # Khu vực quản trị, chỉ dành cho role admin
│   ├── layout.tsx                   # Bảo vệ route và hiển thị sidebar quản trị
│   ├── page.tsx                     # Trang tổng quan quản trị
│   ├── bookings/page.tsx            # Quản lý lịch đặt
│   ├── bookings/[id]/page.tsx       # Chi tiết một lịch đặt
│   ├── contracts/page.tsx           # Quản lý hợp đồng
│   ├── customers/page.tsx           # Quản lý khách hàng
│   ├── payments/page.tsx            # Quản lý thanh toán
│   ├── reports/page.tsx             # Báo cáo và thống kê
│   ├── services/page.tsx            # Quản lý dịch vụ
│   └── users/page.tsx               # Quản lý người dùng
│
└── api/                             # API nội bộ của ứng dụng
    ├── bookings/route.ts             # GET danh sách và POST tạo lịch đặt
    ├── bookings/[id]/route.ts        # GET chi tiết lịch đặt theo ID
    ├── agreements/route.ts            # GET danh sách và PATCH ký hợp đồng
    └── agreements/[id]/invoice/
        └── route.ts                  # GET hóa đơn hợp đồng ở định dạng HTML
```

### `scr/components/` - React component

Component được nhóm theo trang hoặc tính năng để các file route trong `scr/app/` chỉ
đảm nhiệm việc ghép giao diện. Những thư mục có `index.ts` dùng để gom và xuất component
qua một điểm import chung.

| Thư mục | Trách nhiệm chính |
| --- | --- |
| `about/` | Banner, phần giới thiệu, thành viên và dòng thời gian của trang giới thiệu. |
| `auth/` | Khung form đăng nhập/đăng ký, trường nhập liệu, nút thao tác, đăng xuất và `ProtectedRoute` kiểm tra quyền truy cập. |
| `auth-confirmation/` | Giao diện thông báo sau khi xác nhận email. |
| `contact/` | Form liên hệ, bản đồ, hotline và liên kết mạng xã hội. |
| `customer/` | Toàn bộ giao diện nghiệp vụ khách hàng: hồ sơ, đặt lịch, danh sách lịch, chi tiết lịch, hợp đồng, hóa đơn và thanh toán. |
| `dashboard/` | Sidebar, tiêu đề trang, bảng quản lý, KPI, biểu đồ, lịch hôm nay và dữ liệu mẫu cho trang quản trị. |
| `gallery/` | Bộ lọc danh mục, masonry gallery, lightbox và dữ liệu ảnh. |
| `home/` | Hero, dịch vụ nổi bật, album mẫu và lời kêu gọi đặt lịch trên trang chủ. |
| `layout/` | `Header` và `Footer` dùng chung cho khu vực website công khai và khách hàng. |
| `privacy-policy/` | Các phần nội dung của trang chính sách bảo mật. |
| `service-detail/` | Hero, mô tả, thông tin, bảng giá, gallery và CTA của trang chi tiết dịch vụ. |
| `services/` | Hero, thẻ dịch vụ, bảng giá, nội dung nổi bật, CTA và dữ liệu dịch vụ. |
| `studio-guidelines/` | Các thẻ hướng dẫn chuẩn bị, thiết bị, quy định, phong cách và mẹo chụp. |
| `terms-of-service/` | Hero, mục lục, từng phần điều khoản và hình minh họa. |

Các file dữ liệu nằm cạnh component sử dụng chúng:

```text
scr/components/
├── customer/
│   ├── booking-detail-data.ts       # Dữ liệu hiển thị chi tiết lịch đặt
│   ├── booking-list-data.ts         # Dữ liệu danh sách lịch đặt
│   └── payment-data.ts              # Dữ liệu thanh toán
├── dashboard/dashboard-data.ts      # Dữ liệu cho dashboard quản trị
├── gallery/gallery-data.ts          # Danh mục và dữ liệu gallery
└── services/services-data.ts        # Dữ liệu dịch vụ
```

### `scr/lib/` - Tích hợp và kiểu dữ liệu dùng chung

```text
scr/lib/
└── supabase/
    ├── client.ts                    # Supabase client dùng phía trình duyệt
    ├── admin.ts                     # Supabase client phía server dùng service role
    └── types.ts                     # Kiểu TypeScript cho bảng và role trong database
```

Các bảng database được mô tả trong `types.ts` gồm:

- `users`: tài khoản và vai trò `admin` hoặc `customer`.
- `customers`: hồ sơ khách hàng.
- `services`: dịch vụ chụp ảnh.
- `bookings`: lịch đặt dịch vụ.
- `contracts`: hợp đồng gắn với lịch đặt.
- `payments`: thanh toán của hợp đồng.
- `admin_assignments`: phân công nhân sự quản trị cho lịch đặt.

## Phân chia khu vực ứng dụng

| Khu vực | Layout | Quyền truy cập | Mục đích |
| --- | --- | --- | --- |
| Website công khai | `scr/app/(site)/layout.tsx` | Mọi người | Giới thiệu studio, dịch vụ, gallery, liên hệ và trang pháp lý. |
| Khách hàng | `scr/app/customer/layout.tsx` | `customer` | Quản lý hồ sơ, đặt lịch, hợp đồng và thanh toán. |
| Quản trị | `scr/app/dashboard/layout.tsx` | `admin` | Theo dõi và quản lý toàn bộ hoạt động studio. |
| API | `scr/app/api/**/route.ts` | Bearer token/Supabase Auth | Xử lý nghiệp vụ lịch đặt, hợp đồng và hóa đơn. |

## Chi tiết thư mục tài liệu đồ án

```text
thesis/
├── abs/
│   └── picturestudio-thuyet-trinh-nguyen-quoc.pptx  # Slide thuyết trình
├── doc/
│   └── Bao cao.docx                                  # Báo cáo Word
├── pdf/
│   ├── Bao cao.pdf                                   # Báo cáo PDF
│   └── picturestudio-thuyet-trinh-nguyen-quoc.pdf    # Slide thuyết trình dạng PDF
├── poster/
│   ├── picturestudio-poster-nguyen-quoc.png          # Poster đã xuất thành ảnh
│   └── picturestudio-poster-nguyen-quoc.pptx         # Tệp nguồn poster
└── refs/
    ├── A REVISED MODEL FOR ROLE-BASED ACCESS CONTROL .pdf
    ├── Database-Design-2nd-Edition-1660153697.pdf
    ├── OWASP_Testing_Guide_v4.pdf
    ├── Serializable Snapshot Isolation in PostgreSQL.pdf
    └── The PostgreSQL Global Development Group.pdf
```

## Quy ước tổ chức file

- `page.tsx`: trang tương ứng với URL của thư mục.
- `layout.tsx`: giao diện và logic dùng chung cho một nhóm route.
- `route.ts`: API endpoint hoặc server-side handler.
- `[id]`, `[bookId]`: dynamic route nhận ID từ URL.
- `(site)`: route group để tổ chức mã nguồn mà không tạo thêm đoạn URL.
- `index.ts`: điểm export chung của một nhóm component.
- `*-data.ts`: dữ liệu tĩnh hoặc dữ liệu mẫu phục vụ giao diện.
- Component dùng **PascalCase**, ví dụ `BookingCard.tsx`; file tiện ích và dữ liệu dùng
  **kebab-case** hoặc tên thường, ví dụ `booking-list-data.ts`.

## Biến môi trường được sử dụng

Mã nguồn Supabase hiện tham chiếu các biến sau:

```env
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
```

`NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` được ưu tiên; `NEXT_PUBLIC_SUPABASE_ANON_KEY`
được dùng làm giá trị dự phòng. `SUPABASE_SERVICE_ROLE_KEY` chỉ được sử dụng ở phía
server và không được công khai cho trình duyệt.

## Trạng thái cấu hình

Repository hiện chưa chứa `package.json`, file lock, cấu hình Next.js hoặc tệp môi
trường mẫu. Vì vậy, README chỉ mô tả cấu trúc và vai trò của mã nguồn hiện có; các bước
cài đặt và chạy dự án cần được bổ sung sau khi bộ cấu hình ứng dụng được đưa vào
repository.
