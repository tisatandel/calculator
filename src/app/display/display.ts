import { Component } from '@angular/core';
import { Service } from '../service';

@Component({
  selector: 'app-display',
  imports: [],
  templateUrl: './display.html',
  styleUrl: './display.css',
})
export class Display {

   constructor(public service: Service) {}
}