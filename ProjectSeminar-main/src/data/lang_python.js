export const langPython = {
    id: 'python',
    name: 'Python',
    fullName: 'Python Programming',
    description: 'Dễ học, mạnh mẽ và đa năng. Từ web đến AI/ML đều có thể làm với Python.',
    icon: 'Py',
    color: '#d97706',
    gradient: 'from-yellow-600 to-green-600',
    topics: [
        {
            id: 'intro',
            icon: '🚀',
            title: 'Nhập môn',
            lessons: [
                {
                    title: 'Giới thiệu Python và Cài đặt',
                    content: `**Python** (1991, Guido van Rossum) – ngôn ngữ thông dịch, bậc cao, đa mục đích.

**Ứng dụng:**
- Web (Django, Flask, FastAPI)
- AI/Machine Learning (TensorFlow, PyTorch, scikit-learn)
- Data Science (Pandas, NumPy, Matplotlib)
- Automation / Scripting
- Khoa học, nghiên cứu

**Cài đặt:**
1. Tải từ [python.org](https://python.org)
2. Kiểm tra: \`python --version\`
3. Chạy file: \`python ten_file.py\`
4. REPL: gõ \`python\` trong terminal`,
                    code: `# Python không cần compile, chạy trực tiếp

# Không có dấu ; và {}
# Thụt lề (indentation) quan trọng!

print("Hello, World!")
print("CLB Tin hoc NTU")

# f-string (Python 3.6+)
ten = "Sinh vien"
nam = 2024
print(f"Chao {ten} nam {nam}")

# Một dòng lệnh mạnh mẽ
print(sum(range(1, 101)))  # Tổng 1 đến 100 = 5050`,
                    lang: 'python'
                },
                {
                    title: 'Thụt lề (Indentation)',
                    content: `Python dùng **thụt lề (indentation)** để xác định khối code thay vì \`{}\`.

**Quy tắc:**
- Thụt lề nhất quán (thường 4 spaces)
- Không trộn tab và spaces
- Cùng cấp thụt lề = cùng khối

Đây là điểm khác biệt **lớn nhất** của Python với C/C++/Java.`,
                    code: `# ĐÚNG - Thụt lề nhất quán
def chao(ten):
    if ten:              # 4 spaces
        print(f"Chao {ten}!")  # 8 spaces
    else:
        print("Nhap ten di!")

chao("An")
chao("")

# SAI - Sẽ gây IndentationError
# def sai():
# print("Thieu thut le")  # Loi!

# Python tự động nhận biết kết thúc khối
x = 10
if x > 5:
    print("Lon hon 5")
    print("Van la trong if")  # Cùng indent -> cùng khối
print("Ngoai if")             # Khác indent -> ngoài if`,
                    lang: 'python'
                }
            ],
            quiz: [
                { question: 'Python dùng gì để phân định khối code?', options: ['Dấu {}', 'Dấu BEGIN/END', 'Thụt lề', 'Dấu ;'], correct: 2 },
                { question: 'Ai là người tạo ra Python?', options: ['James Gosling', 'Guido van Rossum', 'Dennis Ritchie', 'Bjarne Stroustrup'], correct: 1 },
                { question: 'Cách chạy script Python là?', options: ['javac file.py', 'gcc file.py', 'python file.py', 'run file.py'], correct: 2 }
            ]
        },
        {
            id: 'basic',
            icon: '📦',
            title: 'Cơ bản',
            lessons: [
                {
                    title: 'Biến động và Kiểu dữ liệu',
                    content: `Python có **kiểu động (dynamic typing)** – không cần khai báo kiểu, Python tự suy luận.

**Kiểu dữ liệu built-in:**
- \`int\`, \`float\`, \`complex\`: Số
- \`str\`: Chuỗi
- \`bool\`: True/False (viết hoa)
- \`list\`: Danh sách có thể thay đổi
- \`tuple\`: Danh sách bất biến
- \`dict\`: Key-value pairs
- \`set\`: Tập hợp không trùng`,
                    code: `# Không cần khai báo kiểu
tuoi = 20          # int
chieu_cao = 1.75   # float
ten = "Nguyen An"  # str
is_active = True   # bool

# Kiểm tra kiểu
print(type(tuoi))      # <class 'int'>
print(type(ten))       # <class 'str'>

# Python tự chuyển đổi kiểu
x = 10 / 3   # 3.3333... (float, không phải 3!)
y = 10 // 3  # 3 (chia lấy phần nguyên)
z = 10 % 3   # 1 (chia lấy phần dư)
w = 2 ** 8   # 256 (lũy thừa)

# List - kiểu dữ liệu quan trọng
diem = [8, 9, 7, 10, 6]      # List số
ten_sv = ["An", "Binh", "Chi"] # List chuỗi
hon_hop = [1, "hai", 3.0, True] # List hỗn hợp

# Dict - key-value
sv = {"ten": "Nguyen An", "tuoi": 20, "gpa": 3.5}
print(sv["ten"])       # Truy cập
print(sv.get("tuoi"))  # An toàn hơn`,
                    lang: 'python'
                }
            ],
            quiz: [
                { question: 'Python có kiểu gì?', options: ['Static typing', 'Dynamic typing', 'Strong typing only', 'Weak typing'], correct: 1 },
                { question: 'Toán tử lũy thừa trong Python?', options: ['^', '**', 'pow', '^^'], correct: 1 },
                { question: '10 / 3 trong Python 3 bằng?', options: ['3', '3.0', '3.3333...', 'Lỗi'], correct: 2 }
            ]
        },
        {
            id: 'control',
            icon: '🔀',
            title: 'Điều khiển',
            lessons: [
                {
                    title: 'If-elif-else, For-in, While',
                    content: `Python dùng \`elif\` thay cho \`else if\`.
**for-in**: Duyệt trực tiếp phần tử (không cần index).
\`range(start, stop, step)\`: Tạo dãy số.

**Walrus operator :=** (Python 3.8+): Vừa gán vừa kiểm tra.`,
                    code: `# If-elif-else
diem = 85
if diem >= 90:
    xep_loai = "Xuat sac"
elif diem >= 75:
    xep_loai = "Gioi"
elif diem >= 60:
    xep_loai = "Kha"
else:
    xep_loai = "Trung binh"
print(f"Xep loai: {xep_loai}")

# For-in (nhiều cách dùng)
fruits = ["tao", "chuoi", "xoai"]
for fruit in fruits:
    print(fruit)

# enumerate: lấy cả index và value
for i, fruit in enumerate(fruits, start=1):
    print(f"{i}. {fruit}")

# range()
for i in range(0, 10, 2):  # 0,2,4,6,8
    print(i, end=" ")

# While với else
n = 1
while n <= 5:
    print(n, end=" ")
    n += 1
else:  # Chạy khi while kết thúc bình thường
    print("\\nXong!")`,
                    lang: 'python'
                }
            ],
            quiz: [
                { question: 'Python dùng gì thay "else if"?', options: ['elseif', 'elsif', 'elif', 'else if'], correct: 2 },
                { question: 'range(1, 10, 3) tạo ra dãy nào?', options: ['1,2,3', '1,4,7', '1,3,6,9', '3,6,9'], correct: 1 },
                { question: 'enumerate() dùng để làm gì?', options: ['Đếm phần tử', 'Lấy cả index và value', 'Sắp xếp', 'Lọc danh sách'], correct: 1 }
            ]
        },
        {
            id: 'functions',
            icon: '⚡',
            title: 'Hàm/Phương thức',
            lessons: [
                {
                    title: 'Định nghĩa hàm (def) và Lambda',
                    content: `**def** định nghĩa hàm. Python hàm là **first-class citizen** – có thể truyền như tham số.

**Lambda**: Hàm ẩn danh, ngắn gọn, một dòng.
**Args/Kwargs**: Hàm nhận số lượng tham số không cố định.`,
                    code: `# Hàm cơ bản
def chao(ten, loi="Hello"):  # Default parameter
    return f"{loi}, {ten}!"

print(chao("An"))           # Hello, An!
print(chao("Binh", "Chao")) # Chao, Binh!

# *args: nhiều positional args
def tong(*so):
    return sum(so)
print(tong(1, 2, 3, 4, 5))  # 15

# **kwargs: nhiều keyword args
def in_thong_tin(**info):
    for key, val in info.items():
        print(f"  {key}: {val}")

in_thong_tin(ten="An", tuoi=20, gpa=3.5)

# Lambda - hàm ẩn danh
binh_phuong = lambda x: x ** 2
print(binh_phuong(5))  # 25

# Lambda với higher-order functions
so = [5, 2, 8, 1, 9, 3]
# sorted với key
sap_xep = sorted(so, key=lambda x: -x)  # Giảm dần
print(sap_xep)  # [9, 8, 5, 3, 2, 1]

# map và filter
boi_doi = list(map(lambda x: x * 2, so))
chan = list(filter(lambda x: x % 2 == 0, so))
print(boi_doi)  # [10, 4, 16, 2, 18, 6]
print(chan)     # [2, 8]`,
                    lang: 'python'
                }
            ],
            quiz: [
                { question: 'Từ khóa định nghĩa hàm trong Python?', options: ['function', 'func', 'def', 'fn'], correct: 2 },
                { question: 'Lambda trong Python là?', options: ['Từ khóa vòng lặp', 'Hàm ẩn danh', 'Biến toàn cục', 'Decorator'], correct: 1 },
                { question: '*args trong Python cho phép?', options: ['Một tham số', 'Số tham số không giới hạn', 'Chỉ keyword args', 'Tham số mặc định'], correct: 1 }
            ]
        },
        {
            id: 'data-structure',
            icon: '🗂️',
            title: 'Cấu trúc dữ liệu',
            lessons: [
                {
                    title: 'List, Tuple, Set, Dictionary',
                    content: `**Bốn cấu trúc dữ liệu tích hợp quan trọng:**

| | List | Tuple | Set | Dict |
|--|------|-------|-----|------|
| Ký hiệu | \`[]\` | \`()\` | \`{}\` | \`{k:v}\` |
| Có thứ tự | ✅ | ✅ | ❌ | ✅ (3.7+) |
| Mutable | ✅ | ❌ | ✅ | ✅ |
| Trùng lặp | ✅ | ✅ | ❌ | Key ❌ |`,
                    code: `# List - Mutable, có thứ tự
lst = [1, 2, 3, 4, 5]
lst.append(6)          # Thêm cuối
lst.insert(0, 0)       # Thêm vị trí 0
lst.remove(3)          # Xóa giá trị 3
print(lst[1:4])        # Slicing: [1, 2, 4]
print(lst[::-1])       # Đảo ngược

# Tuple - Immutable
toa_do = (10.5, 106.7)
lat, lon = toa_do      # Unpacking
print(f"Lat: {lat}, Lon: {lon}")

# Set - Không trùng, không thứ tự
s = {1, 2, 3, 2, 1}
print(s)  # {1, 2, 3}
s.add(4)
s.discard(2)
s1 = {1, 2, 3}; s2 = {2, 3, 4}
print(s1 & s2)  # Giao: {2, 3}
print(s1 | s2)  # Hợp: {1, 2, 3, 4}
print(s1 - s2)  # Hiệu: {1}

# Dictionary
sv = {"ten": "An", "tuoi": 20, "diem": [8, 9, 7]}
sv["truong"] = "NTU"   # Thêm key
print(sv.keys())        # dict_keys([...])
print(sv.values())      # dict_values([...])
for k, v in sv.items(): # Duyệt
    print(f"{k}: {v}")`,
                    lang: 'python'
                }
            ],
            quiz: [
                { question: 'Cấu trúc nào của Python là immutable (bất biến)?', options: ['list', 'dict', 'tuple', 'set'], correct: 2 },
                { question: 'Set trong Python có chứa phần tử trùng không?', options: ['Có', 'Không', 'Tùy trường hợp', 'Chỉ 2 phần tử giống nhau'], correct: 1 },
                { question: 'lst[1:4] trả về?', options: ['1 phần tử', 'Phần tử từ index 1 đến 4 (không gồm 4)', 'Phần tử từ index 1 đến 3 (không gồm 3)', 'Lỗi'], correct: 1 }
            ]
        },
        {
            id: 'memory',
            icon: '🧠',
            title: 'Quản lý bộ nhớ',
            lessons: [
                {
                    title: 'Python tự động quản lý bộ nhớ',
                    content: `Python dùng **Garbage Collector** tự động – lập trình viên **không cần lo** về bộ nhớ.

**Cơ chế:**
- **Reference Counting**: Mỗi object có bộ đếm tham chiếu
- Khi count = 0 → GC tự thu hồi
- **Cycle detector**: Phát hiện vòng tham chiếu

**Tuy nhiên cần lưu ý:**
- Với dữ liệu lớn: dùng \`del\` để giải phóng sớm
- \`gc\` module cho kiểm soát thủ công (hiếm khi cần)`,
                    code: `import sys
import gc

# Python tự động quản lý bộ nhớ
a = [1, 2, 3, 4, 5]
b = a           # b tham chiếu cùng list với a
print(id(a) == id(b))  # True - cùng một object

# Reference counting
print(sys.getrefcount(a))  # Số tham chiếu

# del - giải phóng tham chiếu
big_data = list(range(1_000_000))
print(f"So phan tu: {len(big_data)}")
del big_data  # Giải phóng tham chiếu
# big_data giờ có thể được GC thu hồi

# Context manager - quản lý tài nguyên an toàn
with open("test.txt", "w") as f:
    f.write("CLB Tin hoc NTU")
# File tự động đóng sau with block

# Không cần free/delete như C/C++!
x = "String 1"
x = "String 2"  # "String 1" sẽ tự được thu hồi

print("Python tu dong quan ly bo nho!")`,
                    lang: 'python'
                }
            ],
            quiz: [
                { question: 'Python quản lý bộ nhớ như thế nào?', options: ['Lập trình viên tự quản lý', 'Tự động (Garbage Collection)', 'Dùng malloc/free', 'Dùng new/delete'], correct: 1 },
                { question: 'del trong Python làm gì?', options: ['Xóa dữ liệu khỏi RAM ngay lập tức', 'Giải phóng tham chiếu', 'Tắt GC', 'Không có tác dụng'], correct: 1 }
            ]
        },
        {
            id: 'oop',
            icon: '🏛️',
            title: 'Hướng đối tượng',
            lessons: [
                {
                    title: 'Class, Kế thừa và __init__',
                    content: `Python hỗ trợ OOP đầy đủ. \`__init__\` (dunder method) là constructor.
\`self\` tương đương \`this\` trong Java/C++.

Python hỗ trợ **Multiple Inheritance** (kế thừa nhiều class).`,
                    code: `class DongVat:
    so_luong = 0  # Class variable

    def __init__(self, ten, am_thanh):
        self.ten = ten          # Instance variable
        self.am_thanh = am_thanh
        DongVat.so_luong += 1

    def __str__(self):          # Như toString() trong Java
        return f"DongVat({self.ten})"

    def __repr__(self):
        return self.__str__()

    def keu(self):
        return f"{self.ten}: {self.am_thanh}"


class Cho(DongVat):
    def __init__(self, ten, giong):
        super().__init__(ten, "Gau Gau")
        self.giong = giong

    def keu(self):              # Override
        return f"{self.ten} ({self.giong}): {self.am_thanh}!"


class Meo(DongVat):
    def __init__(self, ten):
        super().__init__(ten, "Meo Meo")


# Multiple inheritance
class ThuNuoi(Cho, Meo):      # Kế thừa nhiều class
    pass


cho1 = Cho("Buddy", "Golden Retriever")
meo1 = Meo("Kitty")

print(cho1.keu())              # Buddy (Golden Retriever): Gau Gau!
print(meo1.keu())              # Kitty: Meo Meo
print(f"Tong dong vat: {DongVat.so_luong}")
print(cho1)                    # DongVat(Buddy)
print(isinstance(cho1, DongVat))  # True`,
                    lang: 'python'
                }
            ],
            quiz: [
                { question: 'Constructor trong Python là?', options: ['constructor()', '__new__()', '__init__()', 'init()'], correct: 2 },
                { question: 'self trong Python tương đương với gì trong Java?', options: ['static', 'super', 'this', 'class'], correct: 2 },
                { question: 'Python hỗ trợ kế thừa từ bao nhiêu class?', options: ['Chỉ 1', 'Tối đa 2', 'Tối đa 3', 'Nhiều class (multiple inheritance)'], correct: 3 }
            ]
        },
        {
            id: 'advanced',
            icon: '🔥',
            title: 'Nâng cao',
            lessons: [
                {
                    title: 'List Comprehension và Decorator',
                    content: `**List Comprehension**: Cú pháp ngắn gọn tạo list.
\`[biểu_thức for phần_tử in iterable if điều_kiện]\`

**Decorator**: Hàm bao ngoài hàm khác, thêm chức năng mà không sửa code gốc.
Được dùng nhiều trong Flask, Django, FastAPI.`,
                    code: `# List Comprehension
so = range(1, 11)

binh_phuong = [x**2 for x in so]
print(binh_phuong)  # [1, 4, 9, 16, 25, 36, 49, 64, 81, 100]

so_chan = [x for x in so if x % 2 == 0]
print(so_chan)  # [2, 4, 6, 8, 10]

# Dict Comprehension
ky_tu = {c: ord(c) for c in "ABCDE"}
print(ky_tu)  # {'A': 65, 'B': 66, ...}

# Generator (tiết kiệm bộ nhớ)
gen = (x**2 for x in range(1_000_000))  # Chưa tính
print(next(gen))  # 0, tính từng phần


# Decorator
import time
import functools

def do_tg(func):  # Decorator đo thời gian
    @functools.wraps(func)
    def wrapper(*args, **kwargs):
        start = time.time()
        result = func(*args, **kwargs)
        end = time.time()
        print(f"{func.__name__} chay trong {end-start:.4f}s")
        return result
    return wrapper

@do_tg
def tinh_tong(n):
    return sum(range(n))

ket_qua = tinh_tong(1_000_000)
print(f"Tong: {ket_qua}")`,
                    lang: 'python'
                },
                {
                    title: 'PIP và Thư viện nổi bật',
                    content: `**pip** là trình quản lý gói (package manager) của Python.

**Lệnh pip thường dùng:**
- \`pip install ten_goi\`
- \`pip uninstall ten_goi\`
- \`pip list\`
- \`pip install -r requirements.txt\`

**Virtual Environment:** Cách ly môi trường dự án.`,
                    code: `# Cài thư viện: pip install requests numpy

# requests - HTTP library
import requests  # pip install requests

# Gọi API công khai
response = requests.get("https://api.github.com")
if response.status_code == 200:
    data = response.json()
    print("GitHub API OK")
    print(data.get("current_user_url"))


# ---- Numpy (pip install numpy) ----
import numpy as np

arr = np.array([1, 2, 3, 4, 5])
print(f"Mean: {arr.mean()}")    # 3.0
print(f"Std: {arr.std():.2f}") # 1.41
print(arr * 2)                  # [2 4 6 8 10]

# Ma trận
matrix = np.zeros((3, 3))
matrix[1][1] = 5
print(matrix)


# ---- Virtual Environment ----
# python -m venv myenv
# myenv\\Scripts\\activate  (Windows)
# source myenv/bin/activate (Linux/Mac)
# pip install ...
# deactivate`,
                    lang: 'python'
                }
            ],
            quiz: [
                { question: 'List comprehension [x**2 for x in range(4)] cho kết quả?', options: ['[1,4,9,16]', '[0,1,4,9]', '[1,2,3,4]', '[0,2,4,6]'], correct: 1 },
                { question: 'pip dùng để làm gì?', options: ['Biên dịch Python', 'Quản lý gói thư viện', 'Debug code', 'Tạo virtual environment'], correct: 1 },
                { question: 'Decorator trong Python dùng ký hiệu?', options: ['#', '$', '@', '!'], correct: 2 }
            ]
        }
    ]
};
