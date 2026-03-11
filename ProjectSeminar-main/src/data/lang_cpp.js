export const langCpp = {
    id: 'cpp',
    name: 'C++',
    fullName: 'C++ Programming',
    description: 'Mở rộng của C với lập trình hướng đối tượng, Templates và STL mạnh mẽ.',
    icon: 'C++',
    color: '#7c3aed',
    gradient: 'from-violet-700 to-violet-500',
    topics: [
        {
            id: 'intro',
            icon: '🚀',
            title: 'Nhập môn',
            lessons: [
                {
                    title: 'C++ khác C như thế nào?',
                    content: `**C++** (1983, Bjarne Stroustrup) là phần mở rộng của C, thêm:
- **OOP** (Class, Object, Inheritance, Polymorphism)
- **STL** – Standard Template Library
- **namespace**, **cin/cout** thay cho scanf/printf
- **new/delete** thay cho malloc/free
- **Reference** (tham chiếu)
- **Template** – generic programming`,
                    code: `#include <iostream>   // Thay cho <stdio.h>
using namespace std;

int main() {
    // cin/cout thay cho scanf/printf
    cout << "Hello, C++!" << endl;

    int x;
    cout << "Nhap so: ";
    cin >> x;
    cout << "Ban nhap: " << x << endl;

    return 0;
}`,
                    lang: 'cpp'
                },
                {
                    title: 'Namespace và I/O',
                    content: `**namespace** giúp tránh xung đột tên khi dùng nhiều thư viện.

**\`using namespace std;\`** cho phép dùng \`cout\`, \`cin\`, \`endl\` trực tiếp mà không cần viết \`std::\`

Không dùng \`using namespace std\` trong dự án lớn – có thể gây xung đột.`,
                    code: `#include <iostream>

// Cách 1: Dùng std:: tường minh (khuyến nghị)
int main() {
    std::cout << "An toan hon" << std::endl;

    // Cách 2: using namespace
    using namespace std;
    cout << "Tien hon nhung de xung dot" << endl;

    // Output nhiều kiểu dữ liệu
    int a = 10; double b = 3.14; bool c = true;
    cout << "int: " << a << ", double: " << b
         << ", bool: " << c << endl;
    return 0;
}`,
                    lang: 'cpp'
                }
            ],
            quiz: [
                { question: 'C++ được tạo ra bởi ai?', options: ['Dennis Ritchie', 'James Gosling', 'Bjarne Stroustrup', 'Guido van Rossum'], correct: 2 },
                { question: 'Lệnh xuất trong C++ là?', options: ['printf()', 'print()', 'cout <<', 'System.out.println()'], correct: 2 },
                { question: 'Namespace tránh điều gì?', options: ['Lỗi biên dịch', 'Xung đột tên', 'Lỗi bộ nhớ', 'Lỗi logic'], correct: 1 }
            ]
        },
        {
            id: 'basic',
            icon: '📦',
            title: 'Cơ bản',
            lessons: [
                {
                    title: 'Tham chiếu (References)',
                    content: `**Tham chiếu (Reference)** là bí danh (alias) cho biến khác. Khác với con trỏ:
- Không cần \`*\` để truy cập giá trị
- Không thể thay đổi để trỏ vào biến khác
- Không thể NULL

Dùng tham chiếu làm tham số hàm giúp **tránh sao chép** dữ liệu lớn.`,
                    code: `#include <iostream>
using namespace std;

void tangGap2(int &x) { // Tham chiếu
    x *= 2; // Thay doi bien goc
}

void inString(const string &s) { // Const reference - không sao chép
    cout << s << endl;
}

int main() {
    int a = 10;
    int &b = a; // b là alias của a

    b = 20;
    cout << "a = " << a << endl; // 20

    tangGap2(a);
    cout << "a sau tang: " << a << endl; // 40

    string clb = "CLB Tin hoc NTU";
    inString(clb);
    return 0;
}`,
                    lang: 'cpp'
                },
                {
                    title: 'Kiểu dữ liệu mở rộng',
                    content: `C++ bổ sung nhiều kiểu dữ liệu tiện lợi hơn C:
- \`bool\`: true/false (C không có)
- \`string\`: string class (không cần char array)
- \`auto\`: tự suy luận kiểu (C++11)
- \`nullptr\`: thay NULL
- Kích thước chính xác: \`int8_t\`, \`int32_t\`, \`int64_t\``,
                    code: `#include <iostream>
#include <string>
using namespace std;

int main() {
    bool isActive = true;
    string ten = "NTU"; // Tiện hơn char[]
    auto x = 42;        // int (tự suy luận)
    auto y = 3.14;      // double

    string hoTen = "CLB " + ten; // Noi chuoi bang +
    cout << hoTen << endl;
    cout << "Chieu dai: " << hoTen.length() << endl;

    if (isActive) cout << "Dang hoat dong" << endl;

    int *ptr = nullptr; // Thay NULL
    return 0;
}`,
                    lang: 'cpp'
                }
            ],
            quiz: [
                { question: 'Tham chiếu trong C++ ký hiệu bằng?', options: ['*', '&', '->', '::'], correct: 1 },
                { question: 'Khác biệt chính của tham chiếu và con trỏ?', options: ['Tốc độ', 'Tham chiếu không thể NULL và không dereference', 'Bộ nhớ', 'Cú pháp khai báo'], correct: 1 },
                { question: 'auto trong C++ có nghĩa là?', options: ['Tự động run', 'Biến global', 'Tự suy luận kiểu', 'Biến tĩnh'], correct: 2 }
            ]
        },
        {
            id: 'control',
            icon: '🔀',
            title: 'Điều khiển',
            lessons: [
                {
                    title: 'Range-based for loop (C++11)',
                    content: `C++ thêm **Range-based for loop** – duyệt phần tử trực tiếp không cần chỉ số:

\`for (auto elem : container) { ... }\`

Dùng \`auto &elem\` để **tránh sao chép** và cho phép sửa đổi.`,
                    code: `#include <iostream>
#include <vector>
using namespace std;

int main() {
    // Range-based for với array
    int diem[] = {8, 9, 7, 10, 6};
    int tong = 0;
    for (int d : diem) {
        tong += d;
        cout << d << " ";
    }
    cout << "\\nTong: " << tong << endl;

    // Với vector
    vector<string> tenSV = {"An", "Binh", "Chi"};
    for (const auto &ten : tenSV) { // const ref - không sao chép
        cout << "SV: " << ten << endl;
    }

    return 0;
}`,
                    lang: 'cpp'
                },
                {
                    title: 'If, Switch và biểu thức điều kiện',
                    content: `C++ (C++17) cho phép khai báo biến trực tiếp trong \`if\`:

\`if (int x = getValue(); x > 0) { ... }\`

**Toán tử 3 ngôi:** \`dieu_kien ? gia_tri_true : gia_tri_false\``,
                    code: `#include <iostream>
using namespace std;

int main() {
    // Toán tử điều kiện
    int x = 10;
    string kq = (x % 2 == 0) ? "Chan" : "Le";
    cout << x << " la " << kq << endl;

    // C++17: if với khởi tạo
    if (int y = x * 2; y > 15) {
        cout << y << " > 15" << endl;
    }

    // Switch với string (C++ không hỗ trợ switch với string)
    // Dùng if-else thay thế
    string ngon_ngu = "cpp";
    if (ngon_ngu == "c")        cout << "C";
    else if (ngon_ngu == "cpp") cout << "C++";
    else if (ngon_ngu == "java") cout << "Java";

    return 0;
}`,
                    lang: 'cpp'
                }
            ],
            quiz: [
                { question: 'Range-based for được giới thiệu từ C++ phiên bản nào?', options: ['C++98', 'C++03', 'C++11', 'C++17'], correct: 2 },
                { question: 'Cú pháp đúng của range-based for?', options: ['for (int i in arr)', 'for (auto x : arr)', 'foreach (x in arr)', 'for each x in arr'], correct: 1 }
            ]
        },
        {
            id: 'functions',
            icon: '⚡',
            title: 'Hàm/Phương thức',
            lessons: [
                {
                    title: 'Nạp chồng hàm (Function Overloading)',
                    content: `**Overloading** cho phép nhiều hàm **cùng tên** nhưng **khác tham số**.
Trình biên dịch tự chọn hàm phù hợp dựa trên kiểu và số lượng tham số.

Không được nạp chồng chỉ khác nhau kiểu trả về!`,
                    code: `#include <iostream>
using namespace std;

// Ba phiên bản hàm tong
int tong(int a, int b) {
    return a + b;
}
double tong(double a, double b) {
    return a + b;
}
int tong(int a, int b, int c) {
    return a + b + c;
}
string tong(string a, string b) {
    return a + b;
}

int main() {
    cout << tong(3, 4) << endl;        // 7
    cout << tong(1.5, 2.5) << endl;   // 4
    cout << tong(1, 2, 3) << endl;    // 6
    cout << tong("CLB ", "NTU") << endl; // CLB NTU
    return 0;
}`,
                    lang: 'cpp'
                },
                {
                    title: 'Default Parameters và Inline',
                    content: `**Default parameters:** Tham số có giá trị mặc định khi không truyền.
**Inline function:** Nhúng code hàm trực tiếp – nhanh hơn cho hàm nhỏ.
**Lambda (C++11):** Hàm không tên, định nghĩa tại chỗ.`,
                    code: `#include <iostream>
using namespace std;

// Default parameters
void giaoThieu(string ten, int tuoi = 18, string truong = "NTU") {
    cout << ten << ", " << tuoi << " tuoi, " << truong << endl;
}

// Inline function
inline int binh_phuong(int x) { return x * x; }

int main() {
    giaoThieu("An");           // An, 18 tuoi, NTU
    giaoThieu("Binh", 20);     // Binh, 20 tuoi, NTU
    giaoThieu("Chi", 22, "HUST"); // Chi, 22 tuoi, HUST

    cout << binh_phuong(5) << endl; // 25

    // Lambda
    auto nhan = [](int a, int b) { return a * b; };
    cout << nhan(3, 4) << endl; // 12

    return 0;
}`,
                    lang: 'cpp'
                }
            ],
            quiz: [
                { question: 'Overloading trong C++ là?', options: ['Nhiều class cùng tên', 'Nhiều hàm cùng tên khác tham số', 'Một hàm dùng nhiều lần', 'Nạp chồng toán tử'], correct: 1 },
                { question: 'Tham số mặc định phải đặt ở?', options: ['Đầu danh sách', 'Bất kỳ đâu', 'Cuối danh sách', 'Không quan trọng'], correct: 2 }
            ]
        },
        {
            id: 'data-structure',
            icon: '🗂️',
            title: 'Cấu trúc dữ liệu',
            lessons: [
                {
                    title: 'Vector và String class',
                    content: `**vector<T>** – mảng động trong STL, tự thay đổi kích thước.
**string** – class chuỗi tiện lợi với nhiều method built-in.

Luôn dùng \`vector\` thay array C thông thường khi không cần hiệu năng cực cao.`,
                    code: `#include <iostream>
#include <vector>
#include <string>
#include <algorithm>
using namespace std;

int main() {
    vector<int> v = {5, 3, 8, 1, 9, 2};

    v.push_back(7);      // Thêm phần tử
    v.pop_back();        // Xóa cuối
    cout << "Size: " << v.size() << endl;

    sort(v.begin(), v.end()); // Sắp xếp
    for (int x : v) cout << x << " ";

    // String class
    string s = "Hello, NTU!";
    cout << "\\nLength: " << s.length() << endl;
    cout << "Sub: " << s.substr(7, 3) << endl; // NTU
    cout << "Find: " << s.find("NTU") << endl;  // 7

    // Đổi thành uppercase
    transform(s.begin(), s.end(), s.begin(), ::toupper);
    cout << s << endl;
    return 0;
}`,
                    lang: 'cpp'
                }
            ],
            quiz: [
                { question: 'Hàm nào thêm phần tử vào cuối vector?', options: ['append()', 'add()', 'push_back()', 'insert()'], correct: 2 },
                { question: 'Header file nào cần include để dùng vector?', options: ['<array>', '<list>', '<vector>', '<stl>'], correct: 2 }
            ]
        },
        {
            id: 'memory',
            icon: '🧠',
            title: 'Quản lý bộ nhớ',
            lessons: [
                {
                    title: 'Con trỏ và new/delete',
                    content: `C++ dùng **new/delete** thay cho malloc/free của C:
- \`new\` – cấp phát bộ nhớ heap và gọi constructor
- \`delete\` – giải phóng bộ nhớ và gọi destructor

**Quan trọng:** Mỗi \`new\` phải có \`delete\` tương ứng → tránh **memory leak**`,
                    code: `#include <iostream>
using namespace std;

int main() {
    // Cấp phát đơn
    int *p = new int(42);
    cout << "Gia tri: " << *p << endl;
    delete p; // Giải phóng
    p = nullptr;

    // Cấp phát mảng
    int n = 5;
    int *arr = new int[n];
    for (int i = 0; i < n; i++) arr[i] = i * i;
    for (int i = 0; i < n; i++) cout << arr[i] << " ";
    cout << endl;
    delete[] arr; // Dùng delete[] cho mảng

    // Smart pointer (C++11) - tự động giải phóng
    // #include <memory>
    // auto sp = make_unique<int>(10);
    return 0;
}`,
                    lang: 'cpp'
                }
            ],
            quiz: [
                { question: 'Từ khóa cấp phát bộ nhớ động trong C++ là?', options: ['malloc()', 'alloc()', 'new', 'create'], correct: 2 },
                { question: 'Giải phóng mảng cấp phát bằng new[] dùng?', options: ['free(arr)', 'delete arr', 'delete[] arr', 'remove(arr)'], correct: 2 }
            ]
        },
        {
            id: 'oop',
            icon: '🏛️',
            title: 'Hướng đối tượng',
            lessons: [
                {
                    title: 'Class, Object, Constructor',
                    content: `**Class** là bản thiết kế (blueprint), **Object** là thể hiện cụ thể.

- **Constructor**: được gọi khi tạo object
- **Destructor (~Class)**: được gọi khi object bị hủy
- **Access modifiers**: \`public\`, \`private\`, \`protected\``,
                    code: `#include <iostream>
#include <string>
using namespace std;

class SinhVien {
private:
    string ten;
    int tuoi;
    double gpa;

public:
    // Constructor
    SinhVien(string t, int tu, double g) : ten(t), tuoi(tu), gpa(g) {}

    // Destructor
    ~SinhVien() { cout << ten << " bi huy" << endl; }

    // Getter/Setter
    string getTen() { return ten; }
    void setGPA(double g) { gpa = g; }

    void hienThi() {
        cout << ten << " | " << tuoi << " tuoi | GPA: " << gpa << endl;
    }
};

int main() {
    SinhVien sv1("Nguyen Van A", 20, 3.5);
    sv1.hienThi();
    sv1.setGPA(3.8);
    sv1.hienThi();
    return 0;
}`,
                    lang: 'cpp'
                },
                {
                    title: 'Kế thừa và Đa hình',
                    content: `**Kế thừa (Inheritance):** Class con kế thừa thuộc tính/method từ class cha.
**Đa hình (Polymorphism):** Cùng tên method, hành vi khác nhau tùy object.
Dùng \`virtual\` để cho phép override ở class con.`,
                    code: `#include <iostream>
using namespace std;

class HinhHoc {
public:
    virtual double dienTich() = 0; // Pure virtual
    virtual void inThongTin() {
        cout << "Dien tich: " << dienTich() << endl;
    }
};

class HinhTron : public HinhHoc {
    double r;
public:
    HinhTron(double r) : r(r) {}
    double dienTich() override { return 3.14159 * r * r; }
};

class HinhChuNhat : public HinhHoc {
    double w, h;
public:
    HinhChuNhat(double w, double h) : w(w), h(h) {}
    double dienTich() override { return w * h; }
};

int main() {
    HinhHoc *h1 = new HinhTron(5);
    HinhHoc *h2 = new HinhChuNhat(4, 6);

    h1->inThongTin(); // Dien tich: 78.54
    h2->inThongTin(); // Dien tich: 24

    delete h1; delete h2;
    return 0;
}`,
                    lang: 'cpp'
                }
            ],
            quiz: [
                { question: 'Từ khóa định nghĩa hàm ảo trong C++?', options: ['abstract', 'virtual', 'override', 'interface'], correct: 1 },
                { question: 'Thứ tự access modifier từ ít bảo mật đến nhiều bảo mật?', options: ['public > protected > private', 'private > public > protected', 'protected > private > public', 'public > private > protected'], correct: 0 }
            ]
        },
        {
            id: 'advanced',
            icon: '🔥',
            title: 'Nâng cao',
            lessons: [
                {
                    title: 'Template',
                    content: `**Template** cho phép viết code tổng quát cho nhiều kiểu dữ liệu – **Generic Programming**.

- **Function Template**: hàm dùng cho mọi kiểu
- **Class Template**: class dùng cho mọi kiểu (vd: \`vector<T>\`, \`map<K,V>\`)`,
                    code: `#include <iostream>
#include <vector>
using namespace std;

// Function Template
template <typename T>
T timMax(T a, T b) {
    return (a > b) ? a : b;
}

// Class Template
template <typename T>
class Stack {
    vector<T> data;
public:
    void push(T val) { data.push_back(val); }
    T pop() { T v = data.back(); data.pop_back(); return v; }
    bool empty() { return data.empty(); }
};

int main() {
    cout << timMax(3, 7) << endl;           // 7
    cout << timMax(3.14, 2.71) << endl;     // 3.14
    cout << timMax(string("z"), string("a")) << endl; // z

    Stack<int> st;
    st.push(1); st.push(2); st.push(3);
    cout << st.pop() << endl; // 3
    return 0;
}`,
                    lang: 'cpp'
                },
                {
                    title: 'STL – Standard Template Library',
                    content: `**STL** gồm các container, algorithm và iterator:

| Container | Mô tả |
|-----------|-------|
| \`vector\` | Mảng động |
| \`map\` | Key-value pairs (sắp xếp) |
| \`unordered_map\` | Hash map |
| \`set\` | Tập hợp không trùng |
| \`queue\`, \`stack\` | Hàng đợi, ngăn xếp |`,
                    code: `#include <iostream>
#include <map>
#include <set>
#include <algorithm>
#include <vector>
using namespace std;

int main() {
    // Map
    map<string, int> diem;
    diem["An"] = 90;
    diem["Binh"] = 85;
    diem["Chi"] = 92;
    for (auto &[ten, d] : diem) // C++17 structured binding
        cout << ten << ": " << d << endl;

    // Set
    set<int> s = {5, 3, 8, 3, 1, 5}; // Tự loại trùng
    for (int x : s) cout << x << " "; // 1 3 5 8
    cout << endl;

    // Algorithm
    vector<int> v = {5,2,8,1,9};
    sort(v.begin(), v.end());
    auto it = lower_bound(v.begin(), v.end(), 5);
    cout << "Tim thay 5 o vi tri: " << (it - v.begin()) << endl;
    return 0;
}`,
                    lang: 'cpp'
                }
            ],
            quiz: [
                { question: 'Template trong C++ dùng từ khóa?', options: ['generic', 'template', 'type', 'abstract'], correct: 1 },
                { question: 'Container nào trong STL tự loại bỏ phần tử trùng?', options: ['vector', 'list', 'set', 'map'], correct: 2 },
                { question: 'unordered_map khác map ở điểm nào?', options: ['Lưu nhiều hơn', 'Không sắp xếp, nhanh hơn O(1)', 'Cho phép trùng key', 'Chậm hơn'], correct: 1 }
            ]
        }
    ]
};
