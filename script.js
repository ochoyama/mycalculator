const display = document.getElementById('display');

    function appendValue(val) {
      if (display.textContent === "0" || display.textContent === "Error") {
        display.textContent = val;
      } else {
        display.textContent += val;
      }
    }

    function clearDisplay() {
      display.textContent = "0";
    }

    function backspace() {
      if (display.textContent.length > 1 && display.textContent !== "Error") {
        display.textContent = display.textContent.slice(0, -1);
      } else {
        display.textContent = "0";
      }
    }

    function calculate() {
      try {
        let result = eval(display.textContent);
        if (result === undefined || result === null || isNaN(result)) {
          display.textContent = "Error";
        } else {
          display.textContent = result;
        }
      } catch (e) {
        display.textContent = "Error";
      }
    }

    // Keyboard input support
    document.addEventListener('keydown', (event) => {
      const key = event.key;

      if (!isNaN(key)) {
        appendValue(key); // numbers
      } else if (['+', '-', '*', '/'].includes(key)) {
        appendValue(key); // operators
      } else if (key === '.') {
        appendValue('.');
      } else if (key === 'Enter' || key === '=') {
        calculate();
      } else if (key.toLowerCase() === 'c' || key === 'Escape') {
        clearDisplay();
      } else if (key === 'Backspace') {
        backspace();
      }
    });