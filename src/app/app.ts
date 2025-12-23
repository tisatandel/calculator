import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Display } from "./display/display";
import { Button } from "./button/button";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Display,Button],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('calculator');
}
