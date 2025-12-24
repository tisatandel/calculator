
import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Service {
result = signal<number>(0);

  // disply 
  display = signal<string>('0');

  // number add
  addNumber(n: number) {
    this.display.set(this.display() + n);
  }

  // operator add
  addOperator(op: string) {
    this.display.set(this.display() + op);
  }

  // number result mai add karta hai
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

  //  equal
  equal() {
  const exp = this.display();   // eg. 1+1+1 or 2*3*4

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

  //left to right calculation
  let total = numbers[0];

  for (let i = 0; i < operators.length; i++) {
    if(operators[i] == '/') {
    
        total /= numbers[i + 1];
    }
    if(operators[i] == '*') {
    
        total *= numbers[i + 1];
    }
   if(operators[i] == '+') {
    
        total += numbers[i + 1];
    }
    if(operators[i] == '-') {
    
        total -= numbers[i + 1];
    }
     
  }

  this.result.set(total);
  this.display.set(exp + '=' + total); // eg. 1+1+1=3
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