import { Component } from '@angular/core';
import { Service } from '../service';

@Component({
  selector: 'app-button',
  imports: [],
  templateUrl: './button.html',
  styleUrl: './button.css',
})
export class Button {
  constructor(public service: Service) {}

  onClick(value: string) {
    if (value === '=') {
      this.service.calculate();
    } else {
      this.service.setValue(value);
    }
  }
}
