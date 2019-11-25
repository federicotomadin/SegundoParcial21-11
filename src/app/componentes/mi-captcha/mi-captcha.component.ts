import { Component, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-mi-captcha',
  templateUrl: './mi-captcha.component.html',
  styleUrls: ['./mi-captcha.component.css']
})
export class MiCaptchaComponent implements OnInit {

  @Output() captcha = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  resolved(captchaResponse: string) {
    this.captcha.emit(captchaResponse);
    // console.log(`Resolved captcha with response: ${captchaResponse}`);
  }

}
