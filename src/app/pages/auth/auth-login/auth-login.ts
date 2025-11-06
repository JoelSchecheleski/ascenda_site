import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import * as feather from 'feather-icons';

@Component({
  selector: 'app-auth-login',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    TranslateModule
  ],
  templateUrl: './auth-login.html',
  styleUrls: ['./auth-login.scss']
})

export class AuthLogin implements
  OnInit, AfterViewInit {


  constructor() { }

  ngOnInit(): void {
  }
  ngAfterViewInit() {
    feather.replace();
  }

}