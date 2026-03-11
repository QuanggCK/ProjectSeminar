export const langC = {
    id: 'c',
    name: 'C',
    fullName: 'C Programming',
    description: 'Ngôn ngữ nền tảng cho lập trình hệ thống, hiểu sâu cách máy tính hoạt động.',
    icon: 'C',
    color: '#2563eb',
    gradient: 'from-blue-700 to-blue-500',
    topics: [
        {
            id: 'intro',
            icon: '🚀',
            title: 'Nhập môn',
            lessons: [
                {
                    title: 'Giới thiệu ngôn ngữ C',
                    content: `Ngôn ngữ C được phát triển năm 1972 bởi **Dennis Ritchie** tại Bell Labs. C là ngôn ngữ lập trình thủ tục bậc trung, được dùng để viết hệ điều hành Unix.

**Đặc điểm nổi bật:**
- Tốc độ thực thi cao, gần với phần cứng
- Quản lý bộ nhớ thủ công qua con trỏ
- Portable – chạy được trên nhiều nền tảng
- Nền tảng của C++, Java, Python`,
                    code: `#include <stdio.h>

int main() {
    printf("Hello, World!\\n");
    return 0;
}`,
                    lang: 'c'
                },
                {
                    title: 'Cài đặt môi trường',
                    content: `Để lập trình C, bạn cần:

**Trình biên dịch:** GCC (khuyến nghị)
- Windows: Cài **MinGW** hoặc dùng **VS Code + GCC**
- Linux/Mac: GCC thường đã có sẵn

**Biên dịch và chạy:**
\`gcc ten_file.c -o output\`
\`./output\`

**IDE phổ biến:** VS Code, Code::Blocks, Dev-C++`,
                    code: `// Bước 1: Viết file hello.c
#include <stdio.h>

int main() {
    printf("Xin chao CLB tin hoc NTU!\\n");
    return 0;
}

// Bước 2: Biên dịch: gcc hello.c -o hello
// Bước 3: Chạy: ./hello (Linux) hoặc hello.exe (Windows)`,
                    lang: 'c'
                }
            ],
            quiz: [
                { question: 'Ai là người phát triển ngôn ngữ C?', options: ['Bjarne Stroustrup', 'Dennis Ritchie', 'James Gosling', 'Linus Torvalds'], correct: 1 },
                { question: 'C được phát triển vào năm nào?', options: ['1960', '1972', '1985', '1991'], correct: 1 },
                { question: 'Hàm nào dùng để in ra màn hình trong C?', options: ['print()', 'cout', 'printf()', 'echo()'], correct: 2 }
            ]
        },
        {
            id: 'basic',
            icon: '📦',
            title: 'Cơ bản',
            lessons: [
                {
                    title: 'Biến và Kiểu dữ liệu',
                    content: `**Các kiểu dữ liệu cơ bản trong C:**

| Kiểu | Kích thước | Ví dụ |
|------|-----------|-------|
| int | 4 bytes | -2147483648 đến 2147483647 |
| float | 4 bytes | 3.14f |
| double | 8 bytes | 3.14159265 |
| char | 1 byte | 'A', 'z' |

**Khai báo biến:** \`kiểu_dữ_liệu tên_biến = giá_trị;\``,
                    code: `#include <stdio.h>

int main() {
    int tuoi = 20;
    float chieu_cao = 1.75f;
    double pi = 3.14159265358979;
    char diem = 'A';

    printf("Tuoi: %d\\n", tuoi);
    printf("Chieu cao: %.2f\\n", chieu_cao);
    printf("Pi: %.10lf\\n", pi);
    printf("Diem: %c\\n", diem);
    return 0;
}`,
                    lang: 'c'
                },
                {
                    title: 'Hằng số',
                    content: `Hằng số là giá trị **không thay đổi** trong suốt chương trình.

**Hai cách khai báo:**
1. Dùng \`#define\` (preprocessor)
2. Dùng từ khóa \`const\`

**Lưu ý:** Hằng số nên đặt tên in HOA để dễ phân biệt.`,
                    code: `#include <stdio.h>

#define PI 3.14159
#define MAX_SIZE 100

int main() {
    const int NAM_HIEN_TAI = 2024;
    const float TRONG_LUC = 9.81f;

    float dien_tich = PI * 5 * 5;

    printf("Dien tich hinh tron: %.2f\\n", dien_tich);
    printf("Nam: %d, Trong luc: %.2f\\n", NAM_HIEN_TAI, TRONG_LUC);
    return 0;
}`,
                    lang: 'c'
                }
            ],
            quiz: [
                { question: 'Kiểu dữ liệu nào lưu số nguyên trong C?', options: ['float', 'double', 'int', 'char'], correct: 2 },
                { question: 'char chiếm bao nhiêu byte trong C?', options: ['4 bytes', '2 bytes', '8 bytes', '1 byte'], correct: 3 },
                { question: 'Cách nào dùng để khai báo hằng số?', options: ['var', '#define và const', 'let', 'fixed'], correct: 1 }
            ]
        },
        {
            id: 'control',
            icon: '🔀',
            title: 'Điều khiển',
            lessons: [
                {
                    title: 'If-else và Switch-case',
                    content: `**Cấu trúc rẽ nhánh** giúp chương trình đưa ra quyết định dựa trên điều kiện.

**If-else:** Dùng cho điều kiện logic phức tạp.
**Switch-case:** Dùng khi so sánh một biến với nhiều giá trị cụ thể.`,
                    code: `#include <stdio.h>

int main() {
    int diem = 85;

    // If-else
    if (diem >= 90) {
        printf("Xep loai: Xuat sac\\n");
    } else if (diem >= 75) {
        printf("Xep loai: Gioi\\n");
    } else if (diem >= 60) {
        printf("Xep loai: Kha\\n");
    } else {
        printf("Xep loai: Trung binh\\n");
    }

    // Switch-case
    char grade = 'B';
    switch (grade) {
        case 'A': printf("Xuat sac"); break;
        case 'B': printf("Gioi"); break;
        case 'C': printf("Kha"); break;
        default:  printf("Can co gang");
    }
    return 0;
}`,
                    lang: 'c'
                },
                {
                    title: 'Vòng lặp (for, while, do-while)',
                    content: `**Ba loại vòng lặp trong C:**

- **for**: Biết trước số lần lặp
- **while**: Lặp khi điều kiện đúng
- **do-while**: Luôn chạy ít nhất 1 lần

**break**: Thoát khỏi vòng lặp
**continue**: Bỏ qua lần lặp hiện tại`,
                    code: `#include <stdio.h>

int main() {
    // For loop
    for (int i = 1; i <= 5; i++) {
        printf("For: %d\\n", i);
    }

    // While loop
    int n = 1;
    while (n <= 3) {
        printf("While: %d\\n", n);
        n++;
    }

    // Do-while
    int x = 0;
    do {
        printf("Do-while: %d\\n", x);
        x++;
    } while (x < 3);

    return 0;
}`,
                    lang: 'c'
                }
            ],
            quiz: [
                { question: 'Vòng lặp nào luôn thực thi ít nhất 1 lần?', options: ['for', 'while', 'do-while', 'foreach'], correct: 2 },
                { question: 'Từ khóa nào thoát khỏi vòng lặp?', options: ['exit', 'stop', 'break', 'return'], correct: 2 },
                { question: 'Lệnh nào bỏ qua vòng lặp hiện tại?', options: ['skip', 'continue', 'next', 'pass'], correct: 1 }
            ]
        },
        {
            id: 'functions',
            icon: '⚡',
            title: 'Hàm/Phương thức',
            lessons: [
                {
                    title: 'Khai báo và gọi hàm',
                    content: `**Hàm** là khối mã thực hiện một nhiệm vụ cụ thể, có thể tái sử dụng.

**Cấu trúc:** \`kiểu_trả_về tên_hàm(tham_số) { ... }\`

**Lưu ý:**
- Hàm phải được khai báo trước khi sử dụng (hoặc dùng prototype)
- \`void\` = hàm không trả về giá trị`,
                    code: `#include <stdio.h>

// Function prototype
int tong(int a, int b);
void chao(char ten[]);

int main() {
    int kq = tong(5, 3);
    printf("5 + 3 = %d\\n", kq);
    chao("NTU");
    return 0;
}

int tong(int a, int b) {
    return a + b;
}

void chao(char ten[]) {
    printf("Xin chao %s!\\n", ten);
}`,
                    lang: 'c'
                },
                {
                    title: 'Tham số và Scope',
                    content: `**Phạm vi biến (Scope):**
- **Biến cục bộ (local):** Chỉ tồn tại trong hàm/khối nơi khai báo
- **Biến toàn cục (global):** Tồn tại trong toàn bộ chương trình

**Truyền tham số:**
- **Truyền theo giá trị (pass by value):** Hàm nhận bản sao
- **Truyền theo con trỏ (pass by pointer):** Hàm có thể thay đổi biến gốc`,
                    code: `#include <stdio.h>

int bien_toan_cuc = 100; // Global

void tang_gia_tri(int *x) { // Pass by pointer
    *x = *x + 10;
}

void khong_thay_doi(int x) { // Pass by value
    x = x + 10; // Chỉ thay đổi bản sao
}

int main() {
    int a = 5;
    khong_thay_doi(a);
    printf("Sau khong_thay_doi: %d\\n", a); // 5

    tang_gia_tri(&a);
    printf("Sau tang_gia_tri: %d\\n", a); // 15

    printf("Global: %d\\n", bien_toan_cuc);
    return 0;
}`,
                    lang: 'c'
                }
            ],
            quiz: [
                { question: 'Kiểu trả về nào dùng khi hàm không trả về gì?', options: ['null', 'empty', 'void', 'none'], correct: 2 },
                { question: 'Biến cục bộ tồn tại ở đâu?', options: ['Toàn chương trình', 'Chỉ trong hàm khai báo', 'Trong toàn file', 'Không bao giờ'], correct: 1 }
            ]
        },
        {
            id: 'data-structure',
            icon: '🗂️',
            title: 'Cấu trúc dữ liệu',
            lessons: [
                {
                    title: 'Mảng (Array)',
                    content: `**Mảng** là tập hợp các phần tử cùng kiểu dữ liệu, lưu trữ liên tiếp trong bộ nhớ.

- Chỉ số mảng bắt đầu từ **0**
- Kích thước cố định khi khai báo
- Mảng 2 chiều = ma trận`,
                    code: `#include <stdio.h>

int main() {
    // Mảng 1 chiều
    int diem[5] = {8, 9, 7, 10, 6};
    float tong = 0;

    for (int i = 0; i < 5; i++) {
        tong += diem[i];
        printf("Diem[%d] = %d\\n", i, diem[i]);
    }
    printf("Trung binh: %.1f\\n", tong / 5);

    // Mảng 2 chiều (Ma trận)
    int matrix[2][3] = {{1,2,3},{4,5,6}};
    for (int r = 0; r < 2; r++) {
        for (int c = 0; c < 3; c++)
            printf("%d ", matrix[r][c]);
        printf("\\n");
    }
    return 0;
}`,
                    lang: 'c'
                },
                {
                    title: 'Chuỗi (String)',
                    content: `Trong C, **chuỗi** là mảng ký tự kết thúc bằng ký tự null \`'\\0'\`.

**Thư viện \`<string.h>\`** cung cấp các hàm làm việc với chuỗi:
- \`strlen(s)\` – độ dài chuỗi
- \`strcpy(dest, src)\` – sao chép chuỗi
- \`strcat(dest, src)\` – nối chuỗi
- \`strcmp(s1, s2)\` – so sánh chuỗi`,
                    code: `#include <stdio.h>
#include <string.h>

int main() {
    char ten[50] = "CLB Tin hoc";
    char truong[] = " NTU";

    printf("Do dai: %lu\\n", strlen(ten)); // 11

    strcat(ten, truong); // Noi chuoi
    printf("Sau noi: %s\\n", ten); // CLB Tin hoc NTU

    char s1[] = "abc", s2[] = "abc";
    if (strcmp(s1, s2) == 0)
        printf("Hai chuoi bang nhau\\n");

    return 0;
}`,
                    lang: 'c'
                }
            ],
            quiz: [
                { question: 'Chỉ số đầu tiên của mảng trong C là?', options: ['1', '-1', '0', 'Tùy ý'], correct: 2 },
                { question: 'Hàm nào trả về độ dài chuỗi?', options: ['sizeof()', 'length()', 'strlen()', 'size()'], correct: 2 },
                { question: 'Chuỗi trong C kết thúc bằng?', options: ["' '", "'\\n'", "'\\0'", "NULL"], correct: 2 }
            ]
        },
        {
            id: 'memory',
            icon: '🧠',
            title: 'Quản lý bộ nhớ',
            lessons: [
                {
                    title: 'Con trỏ (Pointers)',
                    content: `**Con trỏ** là biến lưu **địa chỉ bộ nhớ** của biến khác.

- \`&biến\` – lấy địa chỉ của biến
- \`*con_tro\` – truy xuất giá trị tại địa chỉ đó (dereference)

Con trỏ là concept **quan trọng và đặc trưng** nhất của C.`,
                    code: `#include <stdio.h>

int main() {
    int x = 42;
    int *ptr = &x; // ptr trỏ tới x

    printf("Gia tri x: %d\\n", x);
    printf("Dia chi x: %p\\n", (void*)&x);
    printf("Gia tri ptr luu: %p\\n", (void*)ptr);
    printf("Gia tri tai dia chi ptr: %d\\n", *ptr);

    *ptr = 100; // Thay doi x qua con tro
    printf("x sau khi thay doi: %d\\n", x); // 100

    return 0;
}`,
                    lang: 'c'
                },
                {
                    title: 'Cấu trúc (Struct)',
                    content: `**Struct** cho phép nhóm nhiều biến có kiểu khác nhau thành một kiểu dữ liệu mới.

Hữu ích khi cần biểu diễn một đối tượng thực tế (Sinh viên, Điểm, v.v.)`,
                    code: `#include <stdio.h>
#include <string.h>

struct SinhVien {
    char ten[50];
    int tuoi;
    float gpa;
};

void inThongTin(struct SinhVien sv) {
    printf("Ten: %s\\n", sv.ten);
    printf("Tuoi: %d\\n", sv.tuoi);
    printf("GPA: %.2f\\n", sv.gpa);
}

int main() {
    struct SinhVien sv1;
    strcpy(sv1.ten, "Nguyen Van A");
    sv1.tuoi = 20;
    sv1.gpa = 3.5f;

    inThongTin(sv1);
    return 0;
}`,
                    lang: 'c'
                }
            ],
            quiz: [
                { question: 'Toán tử nào lấy địa chỉ của một biến?', options: ['*', '#', '&', '@'], correct: 2 },
                { question: 'Toán tử nào để dereference con trỏ?', options: ['&', '->', '#', '*'], correct: 3 },
                { question: 'Struct trong C dùng để làm gì?', options: ['Khai báo hàm', 'Nhóm nhiều biến lại', 'Tạo vòng lặp', 'Khai báo mảng'], correct: 1 }
            ]
        },
        {
            id: 'oop',
            icon: '🏛️',
            title: 'Hướng đối tượng',
            lessons: [
                {
                    title: 'C không có OOP',
                    content: `**C là ngôn ngữ lập trình thủ tục**, không hỗ trợ trực tiếp OOP.

Tuy nhiên, có thể **mô phỏng OOP** trong C bằng:
- **Struct** → thay thế cho Class (chứa dữ liệu)
- **Function pointer trong struct** → thay thế cho method
- **Pointer** → thay thế cho tham chiếu đối tượng

Đây là kỹ thuật nâng cao. Nếu cần OOP, hãy dùng **C++**.`,
                    code: `#include <stdio.h>
#include <string.h>

// Mô phỏng OOP trong C
typedef struct {
    char ten[50];
    int tuoi;
    void (*chao)(struct { char ten[50]; }*); // Function pointer
} NguoiDung;

void chao_impl(void *self) {
    NguoiDung *nd = (NguoiDung*)self;
    printf("Xin chao! Toi la %s\\n", nd->ten);
}

int main() {
    NguoiDung nd;
    strcpy(nd.ten, "Minh");
    nd.tuoi = 21;

    printf("Ten: %s, Tuoi: %d\\n", nd.ten, nd.tuoi);
    return 0;
}`,
                    lang: 'c'
                }
            ],
            quiz: [
                { question: 'C có hỗ trợ lập trình hướng đối tượng không?', options: ['Có đầy đủ', 'Không, C là ngôn ngữ thủ tục', 'Có một phần', 'Tùy phiên bản'], correct: 1 },
                { question: 'Ngôn ngữ nào là phiên bản OOP của C?', options: ['Java', 'Python', 'C++', 'C#'], correct: 2 }
            ]
        },
        {
            id: 'advanced',
            icon: '🔥',
            title: 'Nâng cao',
            lessons: [
                {
                    title: 'Đọc/Ghi File',
                    content: `**File I/O** trong C dùng kiểu \`FILE*\` và các hàm trong \`<stdio.h>\`:

- \`fopen(path, mode)\` – mở file (mode: "r", "w", "a", "r+", ...)
- \`fprintf()\` – ghi định dạng vào file
- \`fscanf()\` – đọc định dạng từ file
- \`fclose()\` – **luôn phải đóng file** sau khi dùng`,
                    code: `#include <stdio.h>

int main() {
    // Ghi file
    FILE *f = fopen("data.txt", "w");
    if (f == NULL) {
        printf("Khong mo duoc file!\\n");
        return 1;
    }
    fprintf(f, "CLB tin hoc NTU\\n");
    fprintf(f, "Diem: %d\\n", 100);
    fclose(f);

    // Doc file
    FILE *fr = fopen("data.txt", "r");
    char dong[100];
    while (fgets(dong, sizeof(dong), fr)) {
        printf("%s", dong);
    }
    fclose(fr);
    return 0;
}`,
                    lang: 'c'
                },
                {
                    title: 'Header files',
                    content: `**Header file (.h)** chứa khai báo hàm, struct, macro để chia sẻ giữa các file .c.

**Quy trình:**
1. Tạo \`utils.h\` – khai báo (prototype)
2. Tạo \`utils.c\` – định nghĩa (implementation)
3. \`#include "utils.h"\` trong file cần dùng

\`#ifndef\` guard ngăn include nhiều lần.`,
                    code: `// --- utils.h ---
#ifndef UTILS_H
#define UTILS_H

int tong(int a, int b);
int tich(int a, int b);

#endif

// --- utils.c ---
#include "utils.h"

int tong(int a, int b) { return a + b; }
int tich(int a, int b) { return a * b; }

// --- main.c ---
#include <stdio.h>
#include "utils.h"

int main() {
    printf("Tong: %d\\n", tong(3, 4));
    printf("Tich: %d\\n", tich(3, 4));
    return 0;
}
// Bien dich: gcc main.c utils.c -o chuong_trinh`,
                    lang: 'c'
                }
            ],
            quiz: [
                { question: 'Hàm nào mở file trong C?', options: ['openFile()', 'fopen()', 'open()', 'FileOpen()'], correct: 1 },
                { question: 'Mode "w" trong fopen() có nghĩa là?', options: ['Đọc file', 'Ghi file (xóa nội dung cũ)', 'Đọc và ghi', 'Thêm vào cuối'], correct: 1 },
                { question: 'Header file có đuôi mở rộng gì?', options: ['.c', '.h', '.cpp', '.txt'], correct: 1 }
            ]
        }
    ]
};
