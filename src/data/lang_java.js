export const langJava = {
    id: 'java',
    name: 'Java',
    fullName: 'Java Programming',
    description: 'Viết một lần, chạy mọi nơi. Ngôn ngữ hướng đối tượng mạnh mẽ cho enterprise.',
    icon: 'Java',
    color: '#dc2626',
    gradient: 'from-red-700 to-orange-600',
    topics: [
        {
            id: 'intro',
            icon: '🚀',
            title: 'Nhập môn',
            lessons: [
                {
                    title: 'JVM, JDK, JRE là gì?',
                    content: `**Java** (1995, James Gosling – Sun Microsystems) có triết lý **"Write Once, Run Anywhere"**

- **JVM** (Java Virtual Machine): Máy ảo chạy bytecode Java, hoạt động trên mọi OS
- **JRE** (Java Runtime Environment): JVM + thư viện chuẩn → để **chạy** Java
- **JDK** (Java Development Kit): JRE + trình biên dịch + công cụ → để **phát triển** Java

**Quá trình:** \`.java\` → (javac biên dịch) → \`.class\` (bytecode) → JVM thực thi`,
                    code: `// File: Hello.java
// Mỗi file Java: tên file = tên class public

public class Hello {
    public static void main(String[] args) {
        System.out.println("Hello, World!");
        System.out.println("CLB Tin hoc NTU");

        // In có định dạng
        String ten = "Sinh vien";
        int nam = 2024;
        System.out.printf("Chao %s nam %d%n", ten, nam);
    }
}
// Biên dịch: javac Hello.java
// Chạy:     java Hello`,
                    lang: 'java'
                },
                {
                    title: 'Cấu trúc Class trong Java',
                    content: `**Mọi thứ trong Java đều nằm trong class**. Java là ngôn ngữ OOP thuần túy.

**package**: Tổ chức code theo thư mục (như namespace)
**import**: Nhập thư viện/class khác

**Quy ước đặt tên:**
- Class: PascalCase → \`SinhVien\`, \`BankAccount\`
- Method/variable: camelCase → \`tenBien\`, \`getAge()\`
- Constant: UPPER_SNAKE → \`MAX_SIZE\``,
                    code: `// File: SinhVien.java
package com.clbntu.hoclap; // Package

import java.util.ArrayList; // Import

public class SinhVien {
    // Fields (instance variables)
    private String ten;
    private int maSV;
    private double gpa;

    // Constructor
    public SinhVien(String ten, int maSV) {
        this.ten = ten;
        this.maSV = maSV;
        this.gpa = 0.0;
    }

    // Methods
    public String getTen() { return ten; }
    public double getGPA() { return gpa; }
    public void setGPA(double gpa) { this.gpa = gpa; }

    @Override
    public String toString() {
        return "SV[" + maSV + "]: " + ten + " - GPA: " + gpa;
    }
}`,
                    lang: 'java'
                }
            ],
            quiz: [
                { question: 'JVM là viết tắt của?', options: ['Java Visual Machine', 'Java Virtual Machine', 'Java Variable Manager', 'Java Version Module'], correct: 1 },
                { question: 'Để PHÁT TRIỂN Java cần cài đặt gì?', options: ['JRE', 'JVM', 'JDK', 'SDK'], correct: 2 },
                { question: 'Phương thức main trong Java có ký hiệu gì?', options: ['void main()', 'static void main(String[] args)', 'int main()', 'public main()'], correct: 1 }
            ]
        },
        {
            id: 'basic',
            icon: '📦',
            title: 'Cơ bản',
            lessons: [
                {
                    title: 'Kiểu dữ liệu nguyên thủy và Wrapper',
                    content: `**Primitive types** (8 loại): byte, short, int, long, float, double, boolean, char

**Wrapper classes**: Đóng gói primitive thành object
- \`int\` → \`Integer\`
- \`double\` → \`Double\`
- \`char\` → \`Character\`
- **Autoboxing**: Java tự chuyển đổi primitive ↔ wrapper`,
                    code: `public class DataTypes {
    public static void main(String[] args) {
        // Primitives
        int tuoi = 20;
        long dansoBan = 8_000_000_000L;
        double gpa = 3.75;
        boolean isActive = true;
        char kyTu = 'A';

        // Wrapper - cần cho Collection
        Integer i = 42;       // Autoboxing: int -> Integer
        int j = i;            // Unboxing: Integer -> int
        Double d = 3.14;

        // String (không phải primitive)
        String ten = "CLB Tin hoc NTU";
        System.out.println(ten.length());     // 15
        System.out.println(ten.toUpperCase()); // CLB TIN HOC NTU
        System.out.println(ten.contains("NTU")); // true

        // Integer utilities
        System.out.println(Integer.MAX_VALUE); // 2147483647
        System.out.println(Integer.parseInt("123")); // 123
    }
}`,
                    lang: 'java'
                }
            ],
            quiz: [
                { question: 'Wrapper class của int trong Java là?', options: ['Int', 'INTEGER', 'Integer', 'IntWrapper'], correct: 2 },
                { question: 'Autoboxing là gì?', options: ['Hộp tự đóng', 'Tự chuyển primitive ↔ wrapper', 'Import tự động', 'Garbage collection'], correct: 1 },
                { question: 'long trong Java có kích thước?', options: ['4 bytes', '2 bytes', '8 bytes', '16 bytes'], correct: 2 }
            ]
        },
        {
            id: 'control',
            icon: '🔀',
            title: 'Điều khiển',
            lessons: [
                {
                    title: 'If-else, Vòng lặp, Break/Continue',
                    content: `Cú pháp tương tự C/C++. Java thêm tính năng:
- **Enhanced for loop**: \`for (Type item : collection)\`
- **Labeled break/continue**: Thoát vòng lặp ngoài
- **Switch expression** (Java 14+): ngắn gọn hơn`,
                    code: `import java.util.List;

public class Control {
    public static void main(String[] args) {
        // Enhanced for loop
        int[] diem = {8, 9, 7, 10, 6};
        int tong = 0;
        for (int d : diem) tong += d;
        System.out.println("Trung binh: " + (tong / 5.0));

        // Labeled break
        outer:
        for (int i = 0; i < 3; i++) {
            for (int j = 0; j < 3; j++) {
                if (i == 1 && j == 1) break outer;
                System.out.println(i + "," + j);
            }
        }

        // Switch expression (Java 14+)
        int ngay = 3;
        String tenNgay = switch (ngay) {
            case 1 -> "Thu Hai";
            case 2 -> "Thu Ba";
            case 3 -> "Thu Tu";
            default -> "Khong xac dinh";
        };
        System.out.println(tenNgay);
    }
}`,
                    lang: 'java'
                }
            ],
            quiz: [
                { question: 'Cú pháp enhanced for trong Java?', options: ['for(Type x in list)', 'for(Type x : list)', 'foreach(Type x : list)', 'for each x in list'], correct: 1 },
                { question: 'Labeled break dùng để làm gì?', options: ['Thoát method', 'Thoát vòng lặp ngoài cụ thể', 'Thoát switch', 'Thoát chương trình'], correct: 1 }
            ]
        },
        {
            id: 'functions',
            icon: '⚡',
            title: 'Hàm/Phương thức',
            lessons: [
                {
                    title: 'Static vs Non-static',
                    content: `**Static method**: Thuộc về class, gọi qua \`ClassName.method()\`, không cần tạo object.
**Non-static (instance) method**: Thuộc về object, phải tạo object mới gọi.

\`main\` phải là \`static\` vì JVM gọi nó mà không cần tạo object.`,
                    code: `public class PhuongThuc {
    private String ten;
    private static int soLuongSV = 0; // Static field

    public PhuongThuc(String ten) {
        this.ten = ten;
        soLuongSV++; // Tăng mỗi lần tạo object
    }

    // Non-static: cần object
    public void chao() {
        System.out.println("Xin chao, toi la " + ten);
    }

    // Static: gọi qua class
    public static int getSoLuong() {
        return soLuongSV;
    }

    // Static utility method
    public static int tinhTong(int[] arr) {
        int sum = 0;
        for (int x : arr) sum += x;
        return sum;
    }

    public static void main(String[] args) {
        PhuongThuc sv1 = new PhuongThuc("An");
        PhuongThuc sv2 = new PhuongThuc("Binh");

        sv1.chao();    // Non-static: qua object
        sv2.chao();
        System.out.println("So SV: " + PhuongThuc.getSoLuong()); // Static: qua class

        int[] a = {1,2,3,4,5};
        System.out.println("Tong: " + PhuongThuc.tinhTong(a));
    }
}`,
                    lang: 'java'
                }
            ],
            quiz: [
                { question: 'Static method được gọi qua?', options: ['Object', 'Class name', 'Interface', 'Package'], correct: 1 },
                { question: 'Tại sao main() phải là static?', options: ['Quy ước', 'JVM gọi không cần tạo object', 'Để nhanh hơn', 'Bảo mật hơn'], correct: 1 }
            ]
        },
        {
            id: 'data-structure',
            icon: '🗂️',
            title: 'Cấu trúc dữ liệu',
            lessons: [
                {
                    title: 'Array, ArrayList và String',
                    content: `**Array**: Kích thước cố định, kiểu nguyên thủy được hỗ trợ.
**ArrayList**: Mảng động, chỉ chứa Object (dùng Wrapper).
**String**: Immutable – mỗi thay đổi tạo String mới.
**StringBuilder**: Mutable – hiệu quả khi ghép chuỗi nhiều lần.`,
                    code: `import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;

public class CauTrucDuLieu {
    public static void main(String[] args) {
        // Array
        int[] arr = {5, 2, 8, 1, 9};
        Arrays.sort(arr);
        System.out.println(Arrays.toString(arr)); // [1, 2, 5, 8, 9]

        // ArrayList
        ArrayList<String> danhSach = new ArrayList<>();
        danhSach.add("An");
        danhSach.add("Binh");
        danhSach.add("Chi");
        danhSach.remove("Binh");
        System.out.println(danhSach.size());    // 2
        System.out.println(danhSach.get(0));    // An
        Collections.sort(danhSach);

        // String (immutable)
        String s = "Hello";
        s = s + " World"; // Tạo String mới

        // StringBuilder (mutable - hiệu quả hơn)
        StringBuilder sb = new StringBuilder();
        for (int i = 1; i <= 5; i++) sb.append(i).append(" ");
        System.out.println(sb.toString()); // 1 2 3 4 5
    }
}`,
                    lang: 'java'
                }
            ],
            quiz: [
                { question: 'ArrayList khác Array ở điểm chính nào?', options: ['Nhanh hơn', 'Kích thước động', 'Hỗ trợ primitive', 'Thread-safe'], correct: 1 },
                { question: 'String trong Java là?', options: ['Mutable', 'Immutable', 'Primitive', 'Abstract'], correct: 1 },
                { question: 'Dùng gì để ghép chuỗi hiệu quả trong vòng lặp?', options: ['String', 'StringBuffer', 'StringBuilder', 'StringJoiner'], correct: 2 }
            ]
        },
        {
            id: 'memory',
            icon: '🧠',
            title: 'Quản lý bộ nhớ',
            lessons: [
                {
                    title: 'Garbage Collection',
                    content: `**Garbage Collection (GC)** là cơ chế tự động thu hồi bộ nhớ trong Java.

**Lý thuyết hoạt động:**
- Objects không còn reference → GC đánh dấu là "garbage"
- JVM tự động gọi GC (không cần delete thủ công như C/C++)
- **Heap**: Nơi objects được lưu trữ
- **Stack**: Nơi local variables và references được lưu

**Lợi ích:** Không có memory leak, không cần quản lý thủ công
**Nhược điểm:** GC pause có thể ảnh hưởng performance`,
                    code: `public class GarbageCollection {
    private String ten;

    public GarbageCollection(String ten) {
        this.ten = ten;
        System.out.println("Tao object: " + ten);
    }

    // Được gọi khi GC thu hồi (không đảm bảo khi nào)
    @Override
    protected void finalize() {
        System.out.println("GC thu hoi: " + ten);
    }

    public static void main(String[] args) {
        GarbageCollection obj1 = new GarbageCollection("Obj1");
        GarbageCollection obj2 = new GarbageCollection("Obj2");

        obj1 = null; // obj1 không còn reference -> eligible for GC
        obj2 = new GarbageCollection("Obj3"); // Obj2 không còn reference

        // Gợi ý JVM chạy GC (không đảm bảo)
        System.gc();

        System.out.println("Chuong trinh tiep tuc...");
        // Programmer không cần lo về việc giải phóng bộ nhớ
    }
}`,
                    lang: 'java'
                }
            ],
            quiz: [
                { question: 'Garbage Collection trong Java làm gì?', options: ['Xóa file rác', 'Tự động thu hồi bộ nhớ không dùng', 'Tối ưu code', 'Giải phóng CPU'], correct: 1 },
                { question: 'Khi nào object trở thành "garbage"?', options: ['Sau 1 giây', 'Khi hết vòng lặp', 'Khi không còn reference', 'Khi gọi delete'], correct: 2 }
            ]
        },
        {
            id: 'oop',
            icon: '🏛️',
            title: 'Hướng đối tượng',
            lessons: [
                {
                    title: 'Tính đóng gói và Kế thừa',
                    content: `**4 trụ cột OOP trong Java:**
1. **Encapsulation** (Đóng gói): private fields + public getter/setter
2. **Inheritance** (Kế thừa): \`extends\` – tái sử dụng code
3. **Polymorphism** (Đa hình): override method
4. **Abstraction** (Trừu tượng): abstract class, interface`,
                    code: `// Lớp cha (Parent/Super)
abstract class DongVat {
    protected String ten;

    public DongVat(String ten) { this.ten = ten; }

    // Abstract method - buộc lớp con implement
    public abstract String keu();

    public void giaoThieu() {
        System.out.println("Toi la " + ten + ", keu: " + keu());
    }
}

class Cho extends DongVat {
    public Cho(String ten) { super(ten); }

    @Override
    public String keu() { return "Gau Gau"; }
}

class Meo extends DongVat {
    public Meo(String ten) { super(ten); }

    @Override
    public String keu() { return "Meo Meo"; }
}

public class OOPDemo {
    public static void main(String[] args) {
        DongVat[] thu = { new Cho("Buddy"), new Meo("Kitty") };
        for (DongVat dv : thu) {
            dv.giaoThieu(); // Polymorphism
        }
    }
}`,
                    lang: 'java'
                },
                {
                    title: 'Interface và Abstract Class',
                    content: `**Interface**: Hợp đồng thuần túy, class phải implement tất cả methods.
- Java cho phép implement **nhiều interface** (đa kế thừa qua interface)
- Từ Java 8: interface có \`default\` và \`static\` methods

**Abstract Class**: Không thể khởi tạo, có thể có method đã cài đặt.`,
                    code: `// Interface
interface CoTheChay {
    void chay();         // Abstract
    default void nghiNgoi() { // Default method (Java 8+)
        System.out.println("Dang nghi ngoi...");
    }
}

interface CoTheBoi {
    void boi();
}

// Implement nhiều interface
class VanDongVien implements CoTheChay, CoTheBoi {
    private String ten;

    public VanDongVien(String ten) { this.ten = ten; }

    @Override
    public void chay() { System.out.println(ten + " dang chay"); }

    @Override
    public void boi() { System.out.println(ten + " dang boi"); }
}

public class InterfaceDemo {
    public static void main(String[] args) {
        VanDongVien vdv = new VanDongVien("Nguyen An");
        vdv.chay();
        vdv.boi();
        vdv.nghiNgoi(); // default method từ interface
    }
}`,
                    lang: 'java'
                }
            ],
            quiz: [
                { question: 'Từ khóa kế thừa class trong Java?', options: ['inherits', 'implements', 'extends', 'super'], correct: 2 },
                { question: 'Java cho phép kế thừa bao nhiêu class?', options: ['1', '2', '3', 'Không giới hạn'], correct: 0 },
                { question: 'Từ khóa implement interface trong Java?', options: ['extends', 'uses', 'implements', 'with'], correct: 2 }
            ]
        },
        {
            id: 'advanced',
            icon: '🔥',
            title: 'Nâng cao',
            lessons: [
                {
                    title: 'Exception Handling',
                    content: `**Exception** là lỗi runtime làm gián đoạn chương trình.

- **try**: Khối code có thể gây exception
- **catch**: Xử lý exception cụ thể
- **finally**: Luôn chạy (đóng file, kết nối)
- **throw**: Ném exception thủ công
- **throws**: Khai báo method có thể ném exception`,
                    code: `public class ExceptionDemo {

    // Custom exception
    static class DuoiTuoiException extends Exception {
        public DuoiTuoiException(int tuoi) {
            super("Tuoi " + tuoi + " chua du dieu kien (can >= 18)");
        }
    }

    static void kiemTraTuoi(int tuoi) throws DuoiTuoiException {
        if (tuoi < 18) throw new DuoiTuoiException(tuoi);
        System.out.println("Tuoi hop le: " + tuoi);
    }

    public static void main(String[] args) {
        // Bắt nhiều exception
        try {
            int[] arr = {1, 2, 3};
            System.out.println(arr[5]); // ArrayIndexOutOfBoundsException
        } catch (ArrayIndexOutOfBoundsException e) {
            System.out.println("Loi chi so: " + e.getMessage());
        } catch (Exception e) {
            System.out.println("Loi khac: " + e.getMessage());
        } finally {
            System.out.println("Finally luon chay");
        }

        // Custom exception
        try {
            kiemTraTuoi(15);
        } catch (DuoiTuoiException e) {
            System.out.println("Loi: " + e.getMessage());
        }
    }
}`,
                    lang: 'java'
                },
                {
                    title: 'Package và Import',
                    content: `**Package** tổ chức code như thư mục, tránh xung đột tên class.

**Quy ước package:** \`com.tencongty.tentenduan.module\`

Java cung cấp nhiều package chuẩn:
- \`java.lang\` – String, Math, System (tự động import)
- \`java.util\` – ArrayList, HashMap, Scanner
- \`java.io\` – File I/O
- \`java.net\` – Network`,
                    code: `// com/clbntu/utils/MathUtils.java
package com.clbntu.utils;

public class MathUtils {
    public static int giaiThua(int n) {
        if (n <= 1) return 1;
        return n * giaiThua(n - 1);
    }

    public static boolean soNguyenTo(int n) {
        if (n < 2) return false;
        for (int i = 2; i <= Math.sqrt(n); i++)
            if (n % i == 0) return false;
        return true;
    }
}

// Main.java
package com.clbntu;

import com.clbntu.utils.MathUtils; // Import specific class
import java.util.Scanner;          // Standard library

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        System.out.print("Nhap n: ");
        int n = sc.nextInt();

        System.out.println(n + "! = " + MathUtils.giaiThua(n));
        System.out.println(n + " nguyen to? " + MathUtils.soNguyenTo(n));

        sc.close(); // Dong Scanner
    }
}`,
                    lang: 'java'
                }
            ],
            quiz: [
                { question: 'Khối nào trong try-catch luôn luôn được thực thi?', options: ['try', 'catch', 'finally', 'throws'], correct: 2 },
                { question: 'Package java.lang có cần import không?', options: ['Có, luôn cần', 'Không, tự động import', 'Tùy IDE', 'Tùy phiên bản Java'], correct: 1 },
                { question: 'Từ khóa tạo exception trong Java?', options: ['raise', 'throw', 'error', 'except'], correct: 1 }
            ]
        }
    ]
};
