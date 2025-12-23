import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Service {
  a = '';
  b = '';
  op = '';
  display = ''; 

  // Basic operations
  add(n1: number, n2: number) { return n1 + n2; }
  sub(n1: number, n2: number) { return n1 - n2; }
  mul(n1: number, n2: number) { return n1 * n2; }
  div(n1: number, n2: number) { return n1 / n2; }

  // Clear all
  clearAll() {
    this.a = '';
    this.b = '';
    this.op = '';
    this.display = '';
  }

  // Button click
  setValue(value: string) {
    if (value === 'AC') {
      this.clearAll();
      return;
    }

    if (value === 'C') {
      if (this.b !== '') this.b = this.b.slice(0, -1);
      else if (this.op !== '') this.op = '';
      else if (this.a !== '') this.a = this.a.slice(0, -1);

      this.display = this.a + this.op + this.b;
      return;
    }

    if (value === '=') {
      this.calculate();
      return;
    }

    // Operator
    if (value === '+' || value === '-' || value === '*' || value === '/') {
      // ✅ Do not calculate immediately
      this.op = value;
    } 
    // Number or dot
    else {
      if (this.op === '') this.a += value;
      else this.b += value;
    }

    this.display = this.a + this.op + this.b;
  }

  // Calculate result
  calculate() {
    if (this.a !== '' && this.b !== '' && this.op !== '') {
      const n1 = Number(this.a);
      const n2 = Number(this.b);
      let res = 0;

      if (this.op === '+') res = this.add(n1, n2);
      else if (this.op === '-') res = this.sub(n1, n2);
      else if (this.op === '*') res = this.mul(n1, n2);
      else if (this.op === '/') res = this.div(n1, n2);

      this.display = res.toString();
      this.a = res.toString();
      this.b = '';
      this.op = '';
    }
  }

  getDisplay() {
    return this.display;
  }
}
