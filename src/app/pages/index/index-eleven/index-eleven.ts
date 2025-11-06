import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { Navbar } from "../../../components/navbar/navbar";
import { GetInTouch } from "../../../components/get-in-tuch/get-in-touch";
import { Team } from "../../../components/team/team";
import { Categories } from "../../../components/categories/categories";
import { PropertyFeature } from "../../../components/property-feature/property-feature";
import { Footer } from "../../../components/footer/footer";

@Component({
  selector: 'app-index-eleven',
  imports: [
    CommonModule,
    RouterLink,
    TranslateModule,
    Navbar,
    GetInTouch,
    Team,
    Categories,
    PropertyFeature,
    Footer
],
  templateUrl: './index-eleven.html',
  styleUrl: './index-eleven.css'
})
export class IndexEleven {

}
