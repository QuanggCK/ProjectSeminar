export const courses = {
    c: {
        id: 'c',
        name: 'C Programming',
        description: 'Nền tảng của lập trình hiện đại.',
        icon: 'C',
        color: 'bg-blue-600',
        theory: [
            {
                id: 1,
                title: 'Giới thiệu về C',
                content: `Ngôn ngữ lập trình C được phát triển tại Bell Labs vào đầu những năm 1970 bởi Dennis Ritchie. Nó là một ngôn ngữ lập trình thủ tục, hỗ trợ lập trình có cấu trúc.
        
        Các đặc điểm chính:
        - Đơn giản và hiệu quả.
        - Tốc độ xử lý nhanh.
        - Khả năng quản lý bộ nhớ thủ công qua con trỏ.
        
        Cấu trúc cơ bản của một chương trình C:
        \`\`\`c
        #include <stdio.h>

        int main() {
            printf("Hello, World!");
            return 0;
        }
        \`\`\`
        `
            },
            {
                id: 2,
                title: 'Biến và Kiểu dữ liệu',
                content: `C cung cấp các kiểu dữ liệu cơ bản như:
        - int: Số nguyên
        - float: Số thực
        - char: Ký tự
        - double: Số thực độ chính xác kép
        
        Ví dụ khai báo biến:
        \`\`\`c
        int age = 20;
        float height = 1.75;
        char grade = 'A';
        \`\`\`
        `
            }
        ],
        quiz: [
            {
                id: 1,
                question: 'Ai là người phát triển ngôn ngữ C?',
                options: ['Bjarne Stroustrup', 'Dennis Ritchie', 'James Gosling', 'Guido van Rossum'],
                correctAnswer: 1
            },
            {
                id: 2,
                question: 'Hàm nào được sử dụng để in ra màn hình trong C?',
                options: ['print()', 'cout', 'System.out.println()', 'printf()'],
                correctAnswer: 3
            }
        ]
    },
    cpp: {
        id: 'cpp',
        name: 'C++',
        description: 'Mở rộng của C với lập trình hướng đối tượng.',
        icon: 'C++',
        color: 'bg-indigo-600',
        theory: [
            {
                id: 1,
                title: 'Giới thiệu về C++',
                content: `C++ được phát triển bởi Bjarne Stroustrup như một phần mở rộng của ngôn ngữ C, bổ sung thêm các tính năng hướng đối tượng.
        
        Đặc điểm nổi bật:
        - Hướng đối tượng (OOP): Class, Object, Inheritance, Polymorphism.
        - Thư viện chuẩn STL mạnh mẽ.
        
        Ví dụ Hello World:
        \`\`\`cpp
        #include <iostream>
        using namespace std;

        int main() {
            cout << "Hello, World!" << endl;
            return 0;
        }
        \`\`\`
        `
            }
        ],
        quiz: [
            {
                id: 1,
                question: 'C++ hỗ trợ mô hình lập trình nào?',
                options: ['Chỉ thủ tục', 'Chỉ hướng đối tượng', 'Đa mô hình (Thủ tục & Hướng đối tượng)', 'Lập trình logic'],
                correctAnswer: 2
            }
        ]
    },
    java: {
        id: 'java',
        name: 'Java',
        description: 'Viết một lần, chạy mọi nơi.',
        icon: 'Java',
        color: 'bg-red-600',
        theory: [
            {
                id: 1,
                title: 'Giới thiệu về Java',
                content: `Java là ngôn ngữ lập trình hướng đối tượng, đa mục đích được phát triển bởi Sun Microsystems (hiện thuộc Oracle).
        
        Đặc điểm chính:
        - Độc lập nền tảng (nhờ JVM).
        - Quản lý bộ nhớ tự động (Garbage Collection).
        - Mạnh mẽ và bảo mật.
        
        Ví dụ Hello World:
        \`\`\`java
        public class Main {
            public static void main(String[] args) {
                System.out.println("Hello, World!");
            }
        }
        \`\`\`
        `
            }
        ],
        quiz: [
            {
                id: 1,
                question: 'JVM là viết tắt của gì?',
                options: ['Java Visual Machine', 'Java Virtual Machine', 'Just Virtual Machine', 'Java Variable Manager'],
                correctAnswer: 1
            }
        ]
    },
    python: {
        id: 'python',
        name: 'Python',
        description: 'Dễ học, mạnh mẽ và đa năng.',
        icon: 'Py',
        color: 'bg-yellow-500',
        theory: [
            {
                id: 1,
                title: 'Giới thiệu về Python',
                content: `Python là ngôn ngữ lập trình bậc cao, thông dịch, được tạo ra bởi Guido van Rossum.
        
        Đặc điểm nổi bật:
        - Cú pháp đơn giản, dễ đọc.
        - Thư viện phong phú (AI, Data Science, Web).
        - Không cần khai báo kiểu dữ liệu tường minh.
        
        Ví dụ Hello World:
        \`\`\`python
        print("Hello, World!")
        \`\`\`
        `
            }
        ],
        quiz: [
            {
                id: 1,
                question: 'Python là ngôn ngữ thuộc loại nào?',
                options: ['Biên dịch (Compiled)', 'Thông dịch (Interpreted)', 'Hợp ngữ (Assembly)', 'Mã máy'],
                correctAnswer: 1
            }
        ]
    }
};
