import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Service {

  // final result
  result = signal<number>(0);

  // display value
  display = signal<string>('0');

  // =====================
  // Add number
  // =====================
  addNumber(n: number) {
    if (this.display() === '0') {
      this.display.set(n.toString());
    } else {
      this.display.set(this.display() + n);
    }
  }

  // =====================
  // Add operator
  // =====================
  addOperator(op: string) {
    const lastChar = this.display().slice(-1);
    if (lastChar !== '+' && lastChar !== '-' && lastChar !== '*' && lastChar !== '/') {
      this.display.set(this.display() + op);
    }
  }

  
  // EQUAL (BODMAS LOGIC)
  
  equal() {
    const exp = this.display();   // eg. 2+3*4

    let numbers: number[] = [];
    let operators: string[] = [];
    let temp = '';

    // split numbers & operators
    for (let ch of exp) {
      if (ch === '+' || ch === '-' || ch === '*' || ch === '/') {
        numbers.push(Number(temp));
        operators.push(ch);
        temp = '';
      } else {
        temp += ch;
      }
    }
    numbers.push(Number(temp));

    // ==========================
    // STEP 1: * and /
    // ==========================
    for (let i = 0; i < operators.length; i++) {
      if (operators[i] === '*' || operators[i] === '/') {
        let value =
          operators[i] === '*'
            ? numbers[i] * numbers[i + 1]
            : numbers[i] / numbers[i + 1];

        numbers.splice(i, 2, value);
        operators.splice(i, 1);
        i--;
      }
    }

    // ==========================
    // STEP 2: + and -
    // ==========================
    let total = numbers[0];

    for (let i = 0; i < operators.length; i++) {
      if (operators[i] === '+') {
        total += numbers[i + 1];
      }
      if (operators[i] === '-') {
        total -= numbers[i + 1];
      }
    }

    this.result.set(total);
    this.display.set(exp + '=' + total);
  }

  // Clear all
  clear() {
    this.result.set(0);
    this.display.set('0');
  }

  // Backspace
  backspace() {
    const current = this.display();
    if (current.length > 1) {
      this.display.set(current.slice(0, -1));
    } else {
      this.display.set('0');
    }
  }
}
