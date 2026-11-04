// ==========================================
// TASK 3: Theme / Style Switcher
// ==========================================
const themeToggleBtn = document.getElementById('theme-toggle');
themeToggleBtn.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
});
// Task 8: Dynamic Cafe Open/Closed Status

function updateCafeStatus() {
    const statusElement = document.getElementById("status-banner"); // Ya "cafe-status" agar aapne ID change ki ho
    const currentHour = new Date().getHours();

    // Prominent pill-badge design ke liye common styling
    statusElement.style.display = "inline-block";
    statusElement.style.padding = "6px 16px";
    statusElement.style.borderRadius = "20px";
    statusElement.style.fontWeight = "bold";
    statusElement.style.fontSize = "0.95rem";
    statusElement.style.marginTop = "10px";
    statusElement.style.boxShadow = "0 2px 5px rgba(0,0,0,0.2)";

    if (currentHour >= 8 && currentHour < 20) {
        statusElement.textContent = "We are Open!";
        statusElement.style.backgroundColor = "#2e7d32"; // Bright Green
        statusElement.style.color = "#ffffff";           // White Text (High Contrast & Prominent)
    } else {
        statusElement.textContent = "We are Closed!";
        statusElement.style.backgroundColor = "#c62828"; // Bright Red
        statusElement.style.color = "#ffffff";           // White Text
    }
}

updateCafeStatus();

// ==========================================
// TASK 6: "Read More" Toggle for Cafe Article
// ==========================================
const readMoreBtn = document.getElementById('read-more-toggle');
const extraText = document.querySelector('.extra-text');
readMoreBtn.addEventListener('click', () => {
    if (extraText.style.display === 'inline') {
        extraText.style.display = 'none';
        readMoreBtn.textContent = 'Read More';
    } else {
        extraText.style.display = 'inline';
        readMoreBtn.textContent = 'Read Less';
    }
});

// ==========================================
// TASK 7: Live Category Filter for Menu Items
// ==========================================
const filterButtons = document.querySelectorAll('.filter-btn');
const menuRows = document.querySelectorAll('#menu-table tbody tr');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');

        const category = button.getAttribute('data-category');
        menuRows.forEach(row => {
            if (category === 'all' || row.getAttribute('data-category') === category) {
                row.style.display = '';
            } else {
                row.style.display = 'none';
            }
        });
    });
});

// ==========================================
// TASK 2: Table Row Highlighting (Menu Table)
// ==========================================
menuRows.forEach(row => {
    row.addEventListener('mouseover', () => {
        row.style.backgroundColor = 'var(--secondary-color)';
        row.style.color = '#ffffff';
    });
    row.addEventListener('mouseout', () => {
        row.style.backgroundColor = '';
        row.style.color = '';
    });
});

// ==========================================
// TASK 4: Interactive Order Total Calculator (Lists/Checkboxes)
// ==========================================
const checkboxes = document.querySelectorAll('.item-select');
const totalSpan = document.getElementById('total');

checkboxes.forEach(checkbox => {
    checkbox.addEventListener('change', () => {
        let total = 0;
        checkboxes.forEach(box => {
            if (box.checked) {
                total += parseInt(box.getAttribute('data-price'));
            }
        });
        totalSpan.textContent = `$${total}`;
    });
});

// ==========================================
// TASK 1, 5 & 9: Form Validation, Type Convertor & Character Counter
// ==========================================
const feedbackForm = document.getElementById('feedback-form');
const formMessage = document.getElementById('form-message');
const specialNotes = document.getElementById('special-notes');
const charCount = document.getElementById('char-count');

// Task 9: Character Counter for Special Request Box
specialNotes.addEventListener('input', () => {
    const maxLength = specialNotes.getAttribute('maxlength');
    const currentLength = specialNotes.value.length;
    const remaining = maxLength - currentLength;
    charCount.textContent = `${remaining} characters remaining`;
});

// Task 1 & 5: Form Submit, e.preventDefault() & parseInt() Age Discount
feedbackForm.addEventListener('submit', (e) => {
    e.preventDefault(); // Stop page refresh

    const username = document.getElementById('username').value.trim();
    const email = document.getElementById('email').value.trim();
    const birthYearInput = document.getElementById('birth-year').value.trim();

    if (username && email && birthYearInput) {
        const birthYear = parseInt(birthYearInput, 10);
        const currentYear = 2026;
        const age = currentYear - birthYear;

        let discountMessage = "";
        if (isNaN(birthYear)) {
            formMessage.textContent = "Please enter a valid numeric birth year.";
            formMessage.style.color = "red";
            return;
        }

        if (age <= 25 || age >= 60) {
            discountMessage = " You also qualify for our Special Student/Senior Discount!";
        } else {
            discountMessage = " Standard pricing applies to your account.";
        }

        formMessage.textContent = `Thank you for visiting, ${username}! We will contact you at ${email}.${discountMessage}`;
        formMessage.style.color = "green";
    }
});