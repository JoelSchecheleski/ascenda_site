import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import * as feather from 'feather-icons';

@Component({
  selector: 'app-auth-re-password',
  standalone: true,
  imports: [
    RouterLink,
    CommonModule,
    TranslateModule
  ],
  templateUrl: './auth-re-password.html',
  styleUrls: ['./auth-re-password.scss']
})
export class AuthRePassword implements
  OnInit, AfterViewInit {


  constructor() { }

  ngOnInit(): void {
  }
  ngAfterViewInit() {
    feather.replace();
  }

}