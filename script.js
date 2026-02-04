const display = document.getElementById('display');
const buttonsContainer = document.querySelector('.buttons');
const clearBtn = document.getElementById('clearBtn');
const equalBtn = document.getElementById('equalBtn');
const backspaceBtn = document.getElementById('backspaceBtn');
const themeToggleBtn = document.getElementById('themeToggle');
const clickSound = document.getElementById('clickSound'); // optional

let currentExpression = "0";

// Play click sound if src is set
function playClick() {
  if (clickSound && clickSound.src) {
    try {
      clickSound.currentTime = 0;
      clickSound.play();
    } catch (e) {
      // ignore if the browser blocks autoplay
    }
  }
}

function updateDisplay(value) {
  display.textContent = value;
}

function appendValue(val) {
  if (currentExpression === "0" || currentExpression === "Error") {
    currentExpression = val;
  } else {
    currentExpression += val;
  }
  updateDisplay(currentExpression);
}

function clearDisplay() {
  currentExpression = "0";
  updateDisplay(currentExpression);
}

function backspace() {
  if (currentExpression === "Error") {
    clearDisplay();
    return;
  }
  if (currentExpression.length > 1) {
    currentExpression = currentExpression.slice(0, -1);
  } else {
    currentExpression = "0";
  }
  updateDisplay(currentExpression);
}

function calculate() {
  try {
    // Evaluate safely
    const result = eval(currentExpression);
    if (result === undefined || result === null || isNaN(result)) {
      currentExpression = "Error";
    } else {
      currentExpression = String(result);
    }
  } catch (e) {
    currentExpression = "Error";
  }
  updateDisplay(currentExpression);
}

// Handle button clicks via event delegation
buttonsContainer.addEventListener('click', (e) => {
  const btn = e.target.closest('button');
  if (!btn) return;

  playClick();
  animateButton(btn);

  const value = btn.getAttribute('data-value');

  if (value !== null) {
    appendValue(value);
  }
});

clearBtn.addEventListener('click', () => {
  playClick();
  animateButton(clearBtn);
  clearDisplay();
});

equalBtn.addEventListener('click', () => {
  playClick();
  animateButton(equalBtn);
  calculate();
});

backspaceBtn.addEventListener('click', () => {
  playClick();
  animateButton(backspaceBtn);
  backspace();
});

// Button press animation helper
function animateButton(button) {
  button.classList.add('key-press');
  setTimeout(() => button.classList.remove('key-press'), 80);
}

// Keyboard support
document.addEventListener('keydown', (event) => {
  const key = event.key;

  if (!isNaN(key) || key === '.') {
    appendValue(key);
    highlightKey(key);
  } else if (['+', '-', '*', '/'].includes(key)) {
    appendValue(key);
    highlightOpKey(key);
  } else if (key === 'Enter' || key === '=') {
    calculate();
    highlightSpecial(equalBtn);
  } else if (key === 'Backspace') {
    backspace();
    highlightSpecial(backspaceBtn);
  } else if (key.toLowerCase() === 'c' || key === 'Escape') {
    clearDisplay();
    highlightSpecial(clearBtn);
  }
});

// Visual highlight for keyboard presses
function highlightKey(key) {
  const btn = document.querySelector(`button[data-value="${key}"]`);
  if (btn) animateButton(btn);
}

function highlightOpKey(op) {
  const btn = document.querySelector(`button[data-value="${op}"]`);
  if (btn) animateButton(btn);
}

function highlightSpecial(btn) {
  if (btn) animateButton(btn);
}

// Theme toggle (dark / light)
themeToggleBtn.addEventListener('click', () => {
  document.body.classList.toggle('light');
  if (document.body.classList.contains('light')) {
    themeToggleBtn.textContent = 'Dark mode';
  } else {
    themeToggleBtn.textContent = 'Light mode';
  }
});

// Set initial theme label correctly
if (document.body.classList.contains('light')) {
  themeToggleBtn.textContent = 'Dark mode';
} else {
  themeToggleBtn.textContent = 'Light mode';
}
