/* ============================================================
   Programming Learning Hub - Main JavaScript
   Xử lý Dark Mode, Sidebar, Search, Code Editor, Quiz
   ============================================================ */

// ============================================================
// 1. DARK MODE TOGGLE - Chuyển đổi chế độ sáng/tối
// ============================================================

/**
 * Khởi tạo theme từ localStorage hoặc mặc định là 'light'
 */
function initTheme() {
  const savedTheme = localStorage.getItem('plh-theme') || 'light';
  document.documentElement.setAttribute('data-theme', savedTheme);
  updateThemeIcon(savedTheme);
}

/**
 * Chuyển đổi giữa light mode và dark mode
 */
function toggleTheme() {
  const current = document.documentElement.getAttribute('data-theme');
  const next = current === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', next);
  localStorage.setItem('plh-theme', next);
  updateThemeIcon(next);
}

/**
 * Cập nhật icon hiển thị trên nút toggle
 * @param {string} theme - 'light' hoặc 'dark'
 */
function updateThemeIcon(theme) {
  const btn = document.getElementById('theme-toggle');
  if (btn) {
    btn.textContent = theme === 'dark' ? '☀️' : '🌙';
    btn.setAttribute('aria-label',
      theme === 'dark' ? 'Chuyển sang Light Mode' : 'Chuyển sang Dark Mode'
    );
  }
}

// ============================================================
// 2. SIDEBAR TOGGLE - Mở/đóng sidebar trên mobile
// ============================================================

/**
 * Mở hoặc đóng sidebar
 */
function toggleSidebar() {
  const sidebar = document.getElementById('sidebar');
  const overlay = document.getElementById('sidebar-overlay');
  if (sidebar) {
    sidebar.classList.toggle('open');
    if (overlay) overlay.classList.toggle('active');
    // Ngăn body scroll khi sidebar mở
    document.body.style.overflow = sidebar.classList.contains('open') ? 'hidden' : '';
  }
}

/**
 * Đóng sidebar (dùng khi click overlay)
 */
function closeSidebar() {
  const sidebar = document.getElementById('sidebar');
  const overlay = document.getElementById('sidebar-overlay');
  if (sidebar) {
    sidebar.classList.remove('open');
    if (overlay) overlay.classList.remove('active');
    document.body.style.overflow = '';
  }
}

// ============================================================
// 3. COLLAPSIBLE SECTIONS - Phần mở rộng / thu gọn
// ============================================================

/**
 * Khởi tạo các phần thu gọn: thêm sự kiện click
 */
function initCollapsibles() {
  document.querySelectorAll('.collapsible-header').forEach(header => {
    header.addEventListener('click', () => {
      const parent = header.closest('.collapsible');
      if (parent) {
        parent.classList.toggle('open');
      }
    });
  });
}

// ============================================================
// 4. COPY CODE - Nút sao chép code
// ============================================================

/**
 * Sao chép nội dung code vào clipboard
 * @param {HTMLElement} btn - Nút copy được click
 */
function copyCode(btn) {
  const codeBlock = btn.closest('.code-block');
  if (!codeBlock) return;

  const pre = codeBlock.querySelector('pre');
  if (!pre) return;

  // Lấy text thuần (không bao gồm HTML tags)
  const text = pre.textContent;

  navigator.clipboard.writeText(text).then(() => {
    // Hiển thị trạng thái "Copied!"
    const originalText = btn.textContent;
    btn.textContent = '✓ Copied!';
    btn.classList.add('copied');

    // Quay lại trạng thái ban đầu sau 2 giây
    setTimeout(() => {
      btn.textContent = originalText;
      btn.classList.remove('copied');
    }, 2000);
  }).catch(() => {
    // Fallback cho trình duyệt cũ
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.opacity = '0';
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand('copy');
    document.body.removeChild(textArea);

    btn.textContent = '✓ Copied!';
    btn.classList.add('copied');
    setTimeout(() => {
      btn.textContent = 'Copy';
      btn.classList.remove('copied');
    }, 2000);
  });
}

// ============================================================
// 5. SEARCH FUNCTIONALITY - Chức năng tìm kiếm
// ============================================================

/**
 * Lọc các thẻ nội dung theo từ khóa tìm kiếm
 */
function initSearch() {
  const searchInput = document.getElementById('search-input');
  if (!searchInput) return;

  searchInput.addEventListener('input', (e) => {
    const query = e.target.value.toLowerCase().trim();

    // Tìm kiếm trong các card ngôn ngữ
    document.querySelectorAll('.lang-card').forEach(card => {
      const text = card.textContent.toLowerCase();
      card.style.display = text.includes(query) || query === '' ? '' : 'none';
    });

    // Tìm kiếm trong các concept card
    document.querySelectorAll('.concept-card').forEach(card => {
      const text = card.textContent.toLowerCase();
      card.style.display = text.includes(query) || query === '' ? '' : 'none';
    });

    // Tìm kiếm trong các collapsible sections
    document.querySelectorAll('.collapsible').forEach(section => {
      const text = section.textContent.toLowerCase();
      section.style.display = text.includes(query) || query === '' ? '' : 'none';
    });

    // Tìm kiếm trong các setup cards
    document.querySelectorAll('.setup-card').forEach(card => {
      const text = card.textContent.toLowerCase();
      card.style.display = text.includes(query) || query === '' ? '' : 'none';
    });
  });
}

// ============================================================
// 6. INTERACTIVE CODE EDITOR - Trình soạn code tương tác
// ============================================================

/**
 * Danh sách các chương trình mẫu theo ngôn ngữ
 * Dùng để mô phỏng kết quả chạy code
 */
const codeExamples = {
  c: {
    hello: {
      code: '#include <stdio.h>\n\nint main() {\n    printf("Hello, World!\\n");\n    return 0;\n}',
      output: 'Hello, World!'
    },
    variables: {
      code: '#include <stdio.h>\n\nint main() {\n    int age = 20;\n    float gpa = 3.5;\n    char grade = \'A\';\n    \n    printf("Age: %d\\n", age);\n    printf("GPA: %.1f\\n", gpa);\n    printf("Grade: %c\\n", grade);\n    return 0;\n}',
      output: 'Age: 20\nGPA: 3.5\nGrade: A'
    },
    loop: {
      code: '#include <stdio.h>\n\nint main() {\n    for (int i = 1; i <= 5; i++) {\n        printf("Lan lap thu: %d\\n", i);\n    }\n    return 0;\n}',
      output: 'Lan lap thu: 1\nLan lap thu: 2\nLan lap thu: 3\nLan lap thu: 4\nLan lap thu: 5'
    }
  },
  cpp: {
    hello: {
      code: '#include <iostream>\nusing namespace std;\n\nint main() {\n    cout << "Hello, C++!" << endl;\n    return 0;\n}',
      output: 'Hello, C++!'
    },
    class: {
      code: '#include <iostream>\nusing namespace std;\n\nclass SinhVien {\npublic:\n    string ten;\n    int tuoi;\n    \n    void hienThi() {\n        cout << "Ten: " << ten << endl;\n        cout << "Tuoi: " << tuoi << endl;\n    }\n};\n\nint main() {\n    SinhVien sv;\n    sv.ten = "Nguyen Van A";\n    sv.tuoi = 20;\n    sv.hienThi();\n    return 0;\n}',
      output: 'Ten: Nguyen Van A\nTuoi: 20'
    }
  },
  java: {
    hello: {
      code: 'public class Main {\n    public static void main(String[] args) {\n        System.out.println("Hello, Java!");\n    }\n}',
      output: 'Hello, Java!'
    },
    oop: {
      code: 'class Animal {\n    String name;\n    \n    Animal(String name) {\n        this.name = name;\n    }\n    \n    void speak() {\n        System.out.println(name + " makes a sound");\n    }\n}\n\nclass Dog extends Animal {\n    Dog(String name) {\n        super(name);\n    }\n    \n    void speak() {\n        System.out.println(name + " says: Woof!");\n    }\n}\n\npublic class Main {\n    public static void main(String[] args) {\n        Animal dog = new Dog("Buddy");\n        dog.speak();\n    }\n}',
      output: 'Buddy says: Woof!'
    }
  },
  python: {
    hello: {
      code: 'print("Hello, Python!")',
      output: 'Hello, Python!'
    },
    list: {
      code: '# Danh sach va List Comprehension\nnumbers = [1, 2, 3, 4, 5]\nsquares = [x**2 for x in numbers]\n\nprint("Numbers:", numbers)\nprint("Squares:", squares)\nprint("Sum:", sum(squares))',
      output: 'Numbers: [1, 2, 3, 4, 5]\nSquares: [1, 4, 9, 16, 25]\nSum: 55'
    },
    oop: {
      code: 'class SinhVien:\n    def __init__(self, ten, tuoi):\n        self.ten = ten\n        self.tuoi = tuoi\n    \n    def gioi_thieu(self):\n        print(f"Xin chao, toi la {self.ten}")\n        print(f"Toi {self.tuoi} tuoi")\n\nsv = SinhVien("Nguyen Van A", 20)\nsv.gioi_thieu()',
      output: 'Xin chao, toi la Nguyen Van A\nToi 20 tuoi'
    }
  }
};

/**
 * Chạy mô phỏng code trong editor
 * Tìm code trong textarea, so sánh với mẫu, hiển thị output
 * @param {string} editorId - ID của editor container
 */
function runCode(editorId) {
  const editor = document.getElementById(editorId);
  if (!editor) return;

  const textarea = editor.querySelector('textarea');
  const outputEl = editor.querySelector('.editor-output');
  if (!textarea || !outputEl) return;

  const code = textarea.value.trim();

  // Hiển thị hiệu ứng "đang chạy"
  outputEl.textContent = '⏳ Đang chạy chương trình...';

  setTimeout(() => {
    // Tìm output phù hợp từ danh sách mẫu
    let result = simulateCode(code);
    outputEl.textContent = result;
  }, 800); // Delay giả lập biên dịch
}

/**
 * Mô phỏng chạy code bằng cách so sánh với mẫu
 * Nếu không khớp mẫu, thử phân tích cơ bản
 * @param {string} code - Mã nguồn cần chạy
 * @returns {string} Output mô phỏng
 */
function simulateCode(code) {
  // Kiểm tra với từng mẫu code
  for (const lang of Object.values(codeExamples)) {
    for (const example of Object.values(lang)) {
      // So sánh tương đối
      if (normalizeCode(code) === normalizeCode(example.code)) {
        return '✅ ' + example.output;
      }
    }
  }

  // Phân tích cơ bản: tìm câu lệnh in
  return analyzeCode(code);
}

/**
 * Chuẩn hóa code để so sánh (loại bỏ khoảng trắng thừa)
 * @param {string} code
 * @returns {string}
 */
function normalizeCode(code) {
  return code.replace(/\s+/g, ' ').trim();
}

/**
 * Phân tích cơ bản code để tạo output giả lập
 * @param {string} code
 * @returns {string}
 */
function analyzeCode(code) {
  let output = [];

  // Tìm Python print()
  const pythonPrints = code.match(/print\s*\(\s*["'](.+?)["']\s*\)/g);
  if (pythonPrints) {
    pythonPrints.forEach(p => {
      const match = p.match(/print\s*\(\s*["'](.+?)["']\s*\)/);
      if (match) output.push(match[1]);
    });
  }

  // Tìm C printf()
  const cPrints = code.match(/printf\s*\(\s*["'](.+?)["']\s*\)/g);
  if (cPrints) {
    cPrints.forEach(p => {
      const match = p.match(/printf\s*\(\s*["'](.+?)["']\s*\)/);
      if (match) output.push(match[1].replace(/\\n/g, ''));
    });
  }

  // Tìm Java System.out.println()
  const javaPrints = code.match(/System\.out\.println\s*\(\s*["'](.+?)["']\s*\)/g);
  if (javaPrints) {
    javaPrints.forEach(p => {
      const match = p.match(/System\.out\.println\s*\(\s*["'](.+?)["']\s*\)/);
      if (match) output.push(match[1]);
    });
  }

  // Tìm C++ cout
  const cppCouts = code.match(/cout\s*<<\s*["'](.+?)["']/g);
  if (cppCouts) {
    cppCouts.forEach(p => {
      const match = p.match(/cout\s*<<\s*["'](.+?)["']/);
      if (match) output.push(match[1]);
    });
  }

  if (output.length > 0) {
    return '✅ ' + output.join('\n');
  }

  return '📝 Chương trình đã được biên dịch thành công!\n(Mô phỏng cơ bản - để chạy thực tế, hãy sử dụng compiler tương ứng)';
}

/**
 * Tải code mẫu vào editor
 * @param {string} editorId - ID của editor
 * @param {string} lang - Ngôn ngữ (c, cpp, java, python)
 * @param {string} example - Tên ví dụ (hello, variables, loop, ...)
 */
function loadExample(editorId, lang, example) {
  const editor = document.getElementById(editorId);
  if (!editor) return;

  const textarea = editor.querySelector('textarea');
  const outputEl = editor.querySelector('.editor-output');
  if (!textarea) return;

  const ex = codeExamples[lang] && codeExamples[lang][example];
  if (ex) {
    textarea.value = ex.code;
    if (outputEl) outputEl.textContent = '// Nhấn "▶ Chạy Code" để xem kết quả';
  }
}

/**
 * Xóa nội dung editor
 * @param {string} editorId - ID của editor
 */
function clearEditor(editorId) {
  const editor = document.getElementById(editorId);
  if (!editor) return;

  const textarea = editor.querySelector('textarea');
  const outputEl = editor.querySelector('.editor-output');
  if (textarea) textarea.value = '';
  if (outputEl) outputEl.textContent = '// Output sẽ hiển thị ở đây';
}

// ============================================================
// 7. QUIZ SYSTEM - Hệ thống trắc nghiệm
// ============================================================

/**
 * Lưu trữ dữ liệu quiz cho từng trang
 */
const quizData = {};

/**
 * Khởi tạo quiz từ dữ liệu HTML
 * Quiz được đánh dấu bằng data-* attributes
 */
function initQuiz() {
  document.querySelectorAll('.quiz-container').forEach(container => {
    const quizId = container.id;
    if (!quizId) return;

    // Thêm sự kiện click cho các lựa chọn
    container.querySelectorAll('.quiz-option').forEach(option => {
      option.addEventListener('click', () => selectQuizOption(option, quizId));
    });
  });
}

/**
 * Xử lý khi người dùng chọn một đáp án
 * @param {HTMLElement} option - Phần tử option được chọn
 * @param {string} quizId - ID của quiz container
 */
function selectQuizOption(option, quizId) {
  const container = document.getElementById(quizId);
  if (!container) return;

  // Bỏ chọn tất cả options khác trong cùng câu hỏi
  const questionBlock = option.closest('.quiz-question-block');
  if (!questionBlock) return;

  questionBlock.querySelectorAll('.quiz-option').forEach(opt => {
    opt.classList.remove('selected');
  });

  // Đánh dấu option được chọn
  option.classList.add('selected');
}

/**
 * Kiểm tra đáp án quiz
 * @param {string} quizId - ID của quiz container
 */
function checkQuiz(quizId) {
  const container = document.getElementById(quizId);
  if (!container) return;

  let score = 0;
  let total = 0;

  container.querySelectorAll('.quiz-question-block').forEach(block => {
    total++;
    const correct = block.getAttribute('data-correct');
    const selected = block.querySelector('.quiz-option.selected');
    const resultEl = block.querySelector('.quiz-result');

    // Reset styles
    block.querySelectorAll('.quiz-option').forEach(opt => {
      opt.classList.remove('correct', 'incorrect');
    });

    if (selected) {
      const answer = selected.getAttribute('data-answer');
      if (answer === correct) {
        score++;
        selected.classList.add('correct');
        if (resultEl) {
          resultEl.textContent = '✅ Chính xác!';
          resultEl.className = 'quiz-result show correct';
        }
      } else {
        selected.classList.add('incorrect');
        // Hiển thị đáp án đúng
        block.querySelectorAll('.quiz-option').forEach(opt => {
          if (opt.getAttribute('data-answer') === correct) {
            opt.classList.add('correct');
          }
        });
        if (resultEl) {
          resultEl.textContent = '❌ Sai rồi! Xem đáp án đúng ở trên.';
          resultEl.className = 'quiz-result show incorrect';
        }
      }
    } else {
      if (resultEl) {
        resultEl.textContent = '⚠️ Bạn chưa chọn đáp án!';
        resultEl.className = 'quiz-result show incorrect';
      }
    }
  });

  // Hiển thị điểm tổng
  const scoreEl = container.querySelector('.quiz-score');
  if (scoreEl) {
    scoreEl.innerHTML = `
      <div class="score-number">${score}/${total}</div>
      <p>Bạn trả lời đúng ${score} trên ${total} câu hỏi!</p>
      ${score === total ? '<p>🎉 Xuất sắc! Bạn đã nắm vững kiến thức!</p>' : '<p>💪 Hãy ôn lại và thử lại nhé!</p>'}
    `;
    scoreEl.classList.add('show');
  }
}

/**
 * Reset quiz về trạng thái ban đầu
 * @param {string} quizId - ID của quiz container
 */
function resetQuiz(quizId) {
  const container = document.getElementById(quizId);
  if (!container) return;

  container.querySelectorAll('.quiz-option').forEach(opt => {
    opt.classList.remove('selected', 'correct', 'incorrect');
  });

  container.querySelectorAll('.quiz-result').forEach(el => {
    el.className = 'quiz-result';
    el.textContent = '';
  });

  const scoreEl = container.querySelector('.quiz-score');
  if (scoreEl) {
    scoreEl.classList.remove('show');
  }
}

// ============================================================
// 8. SCROLL ANIMATIONS - Hiệu ứng khi cuộn
// ============================================================

/**
 * Thêm hiệu ứng fade-in khi các phần tử xuất hiện trên viewport
 */
function initScrollAnimations() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-fadeInUp');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });

  // Quan sát các phần tử cần animation
  document.querySelectorAll('.lang-card, .concept-card, .collapsible, .setup-card, .content-section').forEach(el => {
    el.style.opacity = '0';
    observer.observe(el);
  });
}

// ============================================================
// 9. ACTIVE NAVIGATION - Đánh dấu trang hiện tại trên sidebar
// ============================================================

/**
 * Đánh dấu liên kết active trên sidebar dựa trên URL hiện tại
 */
function setActiveNav() {
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';

  document.querySelectorAll('.sidebar-nav a').forEach(link => {
    const href = link.getAttribute('href');
    if (!href) return;

    const linkPage = href.split('/').pop();
    if (linkPage === currentPage) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
}

// ============================================================
// 10. TAB SWITCHING - Chuyển đổi tab trong editor
// ============================================================

/**
 * Chuyển tab trong code editor
 * @param {HTMLElement} tabBtn - Nút tab được click
 * @param {string} tabName - Tên tab cần hiển thị
 */
function switchTab(tabBtn, tabName) {
  const editor = tabBtn.closest('.code-editor');
  if (!editor) return;

  // Bỏ active tất cả tabs
  editor.querySelectorAll('.editor-tab').forEach(t => t.classList.remove('active'));
  tabBtn.classList.add('active');

  // Hiển thị nội dung tab tương ứng
  editor.querySelectorAll('.tab-content').forEach(tc => {
    tc.style.display = tc.getAttribute('data-tab') === tabName ? '' : 'none';
  });
}

// ============================================================
// 11. SMOOTH SCROLL - Cuộn mượt đến anchor
// ============================================================

/**
 * Thêm smooth scroll cho tất cả anchor links
 */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = anchor.getAttribute('href').substring(1);
      const targetEl = document.getElementById(targetId);
      if (targetEl) {
        // Kiểm tra xem đây có phải là section được phân trang không
        if (targetEl.classList.contains('content-section') && typeof window.goToPage === 'function') {
          const sections = Array.from(document.querySelectorAll('.content-section'));
          const targetIndex = sections.indexOf(targetEl);
          if (targetIndex !== -1) {
            window.goToPage(targetIndex);
          }
        } else {
          targetEl.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
        // Đóng sidebar trên mobile
        closeSidebar();
      }
    });
  });
}

// ============================================================
// 12. PAGINATION - Phân trang bài học
// ============================================================

/**
 * Hiển thị từng section dưới dạng một trang riêng biệt
 */
function initPagination() {
  const sections = Array.from(document.querySelectorAll('.content-section'));
  if (sections.length === 0) return;

  let currentIndex = 0;

  // Ẩn tất cả ngoại trừ trang đầu tiên
  sections.forEach((sec, index) => {
    if (index !== 0) {
      sec.style.display = 'none';
    } else {
      sec.classList.add('active-page');
    }
  });

  // Tạo giao diện nút chuyển trang
  const paginationContainer = document.createElement('div');
  paginationContainer.className = 'pagination-controls';
  paginationContainer.style.display = 'flex';
  paginationContainer.style.justifyContent = 'space-between';
  paginationContainer.style.alignItems = 'center';
  paginationContainer.style.marginTop = '2rem';
  paginationContainer.style.paddingTop = '1.5rem';
  paginationContainer.style.borderTop = '1px solid var(--border)';

  const prevBtn = document.createElement('button');
  prevBtn.className = 'btn btn-secondary';
  prevBtn.innerHTML = '⬅️ Bài trước';
  prevBtn.disabled = true;

  const indicator = document.createElement('span');
  indicator.className = 'page-indicator';
  indicator.style.fontWeight = '600';
  indicator.style.color = 'var(--text-secondary)';
  indicator.textContent = `Phần 1 / ${sections.length}`;

  const nextBtn = document.createElement('button');
  nextBtn.className = 'btn btn-primary';
  nextBtn.innerHTML = 'Bài tiếp ➡️';
  if (sections.length <= 1) nextBtn.disabled = true;

  paginationContainer.appendChild(prevBtn);
  paginationContainer.appendChild(indicator);
  paginationContainer.appendChild(nextBtn);

  const mainContent = document.querySelector('.main-content');
  if (mainContent) {
    mainContent.appendChild(paginationContainer);
  }

  // Hàm chuyển trang
  window.goToPage = function(index) {
    if (index < 0 || index >= sections.length) return;
    
    sections[currentIndex].style.display = 'none';
    sections[currentIndex].classList.remove('active-page');
    
    currentIndex = index;
    
    sections[currentIndex].style.display = '';
    sections[currentIndex].classList.add('active-page');
    
    // Thêm animation
    sections[currentIndex].classList.remove('animate-fadeInUp');
    void sections[currentIndex].offsetWidth; // trigger reflow
    sections[currentIndex].classList.add('animate-fadeInUp');

    // Cập nhật trạng thái nút
    prevBtn.disabled = currentIndex === 0;
    nextBtn.disabled = currentIndex === sections.length - 1;
    indicator.textContent = `Phần ${currentIndex + 1} / ${sections.length}`;

    // Cuộn lên đầu content
    const pageHeader = document.querySelector('.page-header');
    if (pageHeader) {
      pageHeader.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  prevBtn.addEventListener('click', () => {
    window.goToPage(currentIndex - 1);
  });

  nextBtn.addEventListener('click', () => {
    window.goToPage(currentIndex + 1);
  });
}

// ============================================================
// 13. INITIALIZATION - Khởi tạo khi trang load
// ============================================================

/**
 * Khởi tạo tất cả chức năng khi DOM sẵn sàng
 */
document.addEventListener('DOMContentLoaded', () => {
  initTheme();         // Khởi tạo theme
  initCollapsibles();  // Khởi tạo collapsible sections
  initSearch();        // Khởi tạo tìm kiếm
  initQuiz();          // Khởi tạo quiz
  initScrollAnimations(); // Khởi tạo scroll animations
  setActiveNav();      // Đánh dấu trang active
  initPagination();    // Khởi tạo phân trang bài học
  initSmoothScroll();  // Smooth scroll

  // Event: Nút theme toggle
  const themeBtn = document.getElementById('theme-toggle');
  if (themeBtn) {
    themeBtn.addEventListener('click', toggleTheme);
  }

  // Event: Nút sidebar toggle (mobile)
  const sidebarBtn = document.getElementById('sidebar-toggle');
  if (sidebarBtn) {
    sidebarBtn.addEventListener('click', toggleSidebar);
  }

  // Event: Overlay click => đóng sidebar
  const overlay = document.getElementById('sidebar-overlay');
  if (overlay) {
    overlay.addEventListener('click', closeSidebar);
  }

  // Event: Tất cả nút copy code
  document.querySelectorAll('.copy-btn').forEach(btn => {
    btn.addEventListener('click', () => copyCode(btn));
  });
});
