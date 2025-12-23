
import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Service {
result = signal<number>(0);

  // NEW: display string
  display = signal<string>('');

  // number add
  addNumber(n: number) {
    this.display.set(this.display() + n);
  }

  // operator add
  addOperator(op: string) {
    this.display.set(this.display() + op);
  }

  // existing logic
  add(value: number) {
    this.result.set(this.result() + value);
  }

  subtract(value: number) {
    this.result.set(this.result() - value);
  }

  multiply(value: number) {
    this.result.set(this.result() * value);
  }

  divide(value: number) {
    if (value !== 0) {
      this.result.set(this.result() / value);
    } else {
      this.result.set(0);
    }
  }

  //  NEW: equal logic
  equal() {
  const exp = this.display();   // ex: 1+1+1 or 2*3*4

  let numbers: number[] = [];
  let operators: string[] = [];
  let temp = '';

  //  expression split
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

  //calculation (left to right)
  let total = numbers[0];

  for (let i = 0; i < operators.length; i++) {
    switch (operators[i]) {
      case '+':
        total += numbers[i + 1];
        break;
      case '-':
        total -= numbers[i + 1];
        break;
      case '*':
        total *= numbers[i + 1];
        break;
      case '/':
        total /= numbers[i + 1];
        break;
    }
  }

  this.result.set(total);
  this.display.set(exp + '=' + total); // ex: 1+1+1=3
}

  clear() {
    this.result.set(0);
    this.display.set('');
  }

  backspace() {
    const current = this.display();
    if (current.length > 0) {
      this.display.set(current.slice(0, -1)); 
    }
  }
}