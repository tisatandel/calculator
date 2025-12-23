import { Component } from '@angular/core';
import { Service } from '../service';

@Component({
  selector: 'app-buttons',
  imports: [],
  templateUrl: './button.html',
  styleUrl: './button.css',
})
export class Button  {

  constructor(public service: Service) {}

  number(n: number) {
  this.service.addNumber(n);
}

op(op: string) {
  this.service.addOperator(op);
}

equal() {
  this.service.equal();
}

clear() {
  this.service.clear();
}
}