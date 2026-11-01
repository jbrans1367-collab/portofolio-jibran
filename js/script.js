const typingTexts = [
    "Informatics Student",
    "Web Developer",
    "Cyber Security Enthusiast",
];

const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const typingElement = document.getElementById("typing");
let typingIndex = 0;

function showTypingText() {
    if (!typingElement) {
        return;
    }

    typingElement.textContent = typingTexts[typingIndex];
    typingIndex = (typingIndex + 1) % typingTexts.length;
}

showTypingText();

if (typingElement && !prefersReducedMotion) {
    window.setInterval(showTypingText, 2500);
}

const themeToggle = document.getElementById("themeToggle");
const savedTheme = window.localStorage.getItem("theme");

function applyTheme(isLight) {
    document.body.classList.toggle("light-mode", isLight);
    document
        .querySelector('meta[name="theme-color"]')
        ?.setAttribute("content", isLight ? "#bdeaff" : "#17152f");

    if (!themeToggle) {
        return;
    }

    themeToggle.textContent = isLight ? "☀️" : "🌙";
    themeToggle.setAttribute("aria-label", isLight ? "Aktifkan tema gelap" : "Aktifkan tema terang");
    themeToggle.setAttribute("aria-pressed", String(isLight));
}

applyTheme(savedTheme === "light");

themeToggle?.addEventListener("click", () => {
    const isLight = !document.body.classList.contains("light-mode");
    applyTheme(isLight);
    window.localStorage.setItem("theme", isLight ? "light" : "dark");
});

const menuToggle = document.getElementById("menuToggle");
const primaryMenu = document.getElementById("primaryMenu");

function closeMenu() {
    if (!menuToggle || !primaryMenu) {
        return;
    }

    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Buka menu navigasi");
    primaryMenu.classList.remove("active");
}

menuToggle?.addEventListener("click", () => {
    if (!primaryMenu) {
        return;
    }

    const isExpanded = menuToggle.getAttribute("aria-expanded") === "true";
    menuToggle.setAttribute("aria-expanded", String(!isExpanded));
    menuToggle.setAttribute("aria-label", isExpanded ? "Buka menu navigasi" : "Tutup menu navigasi");
    primaryMenu.classList.toggle("active", !isExpanded);
});

primaryMenu?.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", closeMenu);
});

const loader = document.getElementById("loader");

if (loader) {
    window.setTimeout(() => {
        loader.classList.add("loader-hide");
    }, prefersReducedMotion ? 0 : 500);
}

const topButton = document.getElementById("topBtn");

function updateTopButton() {
    if (topButton) {
        topButton.hidden = window.scrollY < 400;
    }
}

window.addEventListener("scroll", updateTopButton, { passive: true });
updateTopButton();

topButton?.addEventListener("click", () => {
    window.scrollTo({
        top: 0,
        behavior: prefersReducedMotion ? "auto" : "smooth",
    });
});

const projectModal = document.getElementById("projectModal");
const modalTitle = document.getElementById("modalTitle");
const modalDescription = document.getElementById("modalDescription");
const closeModalButton = document.getElementById("closeModal");
let lastFocusedElement = null;

function closeProjectModal() {
    if (!projectModal || projectModal.hidden) {
        return;
    }

    projectModal.hidden = true;
    document.body.classList.remove("modal-open");
    lastFocusedElement?.focus();
}

document.querySelectorAll(".project-details").forEach((button) => {
    button.addEventListener("click", () => {
        if (!projectModal || !modalTitle || !modalDescription) {
            return;
        }

        lastFocusedElement = button;
        modalTitle.textContent = button.dataset.title ?? "Detail Project";
        modalDescription.textContent = button.dataset.description ?? "";
        projectModal.hidden = false;
        document.body.classList.add("modal-open");
        closeModalButton?.focus();
    });
});

closeModalButton?.addEventListener("click", closeProjectModal);

projectModal?.addEventListener("click", (event) => {
    if (event.target === projectModal) {
        closeProjectModal();
    }
});

document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
        closeProjectModal();
        closeMenu();
    }
});

const contactForm = document.getElementById("contactForm");
const contactStatus = document.getElementById("contactStatus");

contactForm?.addEventListener("submit", (event) => {
    event.preventDefault();

    if (contactStatus) {
        contactStatus.textContent = "Form belum dapat mengirim pesan karena layanan backend belum dikonfigurasi.";
        contactStatus.hidden = false;
    }
});

document.querySelectorAll(".counter").forEach((counter) => {
    const target = Number(counter.dataset.target);

    if (!Number.isFinite(target) || target < 0) {
        return;
    }

    if (prefersReducedMotion) {
        counter.textContent = String(target);
        return;
    }

    const duration = 800;
    const startTime = performance.now();

    function updateCounter(currentTime) {
        const progress = Math.min((currentTime - startTime) / duration, 1);
        counter.textContent = String(Math.round(target * progress));

        if (progress < 1) {
            window.requestAnimationFrame(updateCounter);
        }
    }

    window.requestAnimationFrame(updateCounter);
});

const truthForm = document.getElementById("truthForm");
const logicInput = document.getElementById("logicInput");
const truthResult = document.getElementById("truthResult");
const truthStatus = document.getElementById("truthStatus");

truthForm?.addEventListener("submit", (event) => {
    event.preventDefault();

    if (!logicInput || !truthResult || !truthStatus) {
        return;
    }

    const expression = logicInput.value.trim();
    const binaryMatch = expression.match(/^([A-Za-z][A-Za-z0-9_]*)\s+(AND|OR|XOR)\s+([A-Za-z][A-Za-z0-9_]*)$/i);
    const notMatch = expression.match(/^NOT\s+([A-Za-z][A-Za-z0-9_]*)$/i);

    if (!binaryMatch && !notMatch) {
        truthResult.replaceChildren();
        truthStatus.textContent = "Format belum didukung. Gunakan P AND Q, P OR Q, P XOR Q, atau NOT P.";
        return;
    }

    const table = document.createElement("table");
    const head = document.createElement("thead");
    const headerRow = document.createElement("tr");
    const body = document.createElement("tbody");
    const rows = notMatch ? [[true], [false]] : [[true, true], [true, false], [false, true], [false, false]];

    const headers = notMatch ? [notMatch[1], `NOT ${notMatch[1]}`] : [binaryMatch[1], binaryMatch[3], expression.toUpperCase()];

    headers.forEach((label) => {
        const cell = document.createElement("th");
        cell.scope = "col";
        cell.textContent = label;
        headerRow.append(cell);
    });
    head.append(headerRow);

    rows.forEach((values) => {
        const row = document.createElement("tr");
        let result;

        if (notMatch) {
            result = !values[0];
        } else {
            const operator = binaryMatch[2].toUpperCase();
            result =
                operator === "AND"
                    ? values[0] && values[1]
                    : operator === "OR"
                      ? values[0] || values[1]
                      : values[0] !== values[1];
        }

        [...values, result].forEach((value) => {
            const cell = document.createElement("td");
            cell.textContent = value ? "T" : "F";
            row.append(cell);
        });

        body.append(row);
    });

    table.append(head, body);
    truthResult.replaceChildren(table);
    truthStatus.textContent = "";
});

const queue = [];
const queueForm = document.getElementById("queueForm");
const queueInput = document.getElementById("queueInput");
const queueDisplay = document.getElementById("queueDisplay");
const queueStatus = document.getElementById("queueStatus");
const dequeueButton = document.getElementById("dequeueButton");
const clearQueueButton = document.getElementById("clearQueueButton");

function renderQueue() {
    if (!queueDisplay) {
        return;
    }

    queueDisplay.innerHTML = "";

    if (queue.length === 0) {
        const emptyState = document.createElement("p");
        emptyState.className = "queue-empty";
        emptyState.textContent = "Antrian masih kosong.";
        queueDisplay.append(emptyState);
        return;
    }

    const list = document.createElement("ul");
    list.className = "queue-list";

    queue.forEach((patientName, index) => {
        const item = document.createElement("li");
        item.className = "queue-card";

        const number = document.createElement("span");
        number.className = "queue-number";
        number.textContent = `A-${index + 1}`;

        const name = document.createElement("span");
        name.textContent = patientName;

        item.append(number, name);
        list.append(item);
    });

    queueDisplay.append(list);
}

queueForm?.addEventListener("submit", (event) => {
    event.preventDefault();

    if (!queueInput || !queueStatus) {
        return;
    }

    const patientName = queueInput.value.trim();

    if (!patientName) {
        queueStatus.textContent = "Nama pasien tidak boleh kosong.";
        return;
    }

    queue.push(patientName);
    queueInput.value = "";
    queueStatus.textContent = `${patientName} ditambahkan ke antrian.`;
    renderQueue();
    queueInput.focus();
});

dequeueButton?.addEventListener("click", () => {
    if (!queueStatus) {
        return;
    }

    const nextPatient = queue.shift();
    queueStatus.textContent = nextPatient ? `Memanggil: ${nextPatient}.` : "Antrian masih kosong.";
    renderQueue();
});

clearQueueButton?.addEventListener("click", () => {
    queue.length = 0;
    if (queueStatus) {
        queueStatus.textContent = "Antrian berhasil direset.";
    }
    renderQueue();
});

const cursorGlow = document.querySelector(".cursor-glow");

if (cursorGlow && window.matchMedia("(pointer: fine)").matches) {
    document.addEventListener("pointermove", (event) => {
        cursorGlow.style.left = `${event.clientX}px`;
        cursorGlow.style.top = `${event.clientY}px`;
    });
}

const passwordInput = document.getElementById("passwordInput");
const passwordResult = document.getElementById("passwordResult");
const checkPasswordButton = document.getElementById("checkPasswordButton");

function checkPassword() {
    if (!passwordInput || !passwordResult) {
        return;
    }

    const password = passwordInput.value;

    if (!password.trim()) {
        passwordResult.textContent = "Masukkan password terlebih dahulu.";
        passwordResult.style.color = "var(--muted-text)";
        return;
    }

    if (password.length < 6) {
        passwordResult.textContent = "❌ Weak Password";
        passwordResult.style.color = "red";
        return;
    }

    if (password.length < 10) {
        passwordResult.textContent = "⚠ Medium Password";
        passwordResult.style.color = "orange";
        return;
    }

    passwordResult.textContent = "✅ Strong Password";
    passwordResult.style.color = "#3b82f6";
}

checkPasswordButton?.addEventListener("click", checkPassword);
passwordInput?.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        event.preventDefault();
        checkPassword();
    }
});