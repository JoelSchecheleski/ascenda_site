import { Component } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import * as feather from 'feather-icons';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar-full',
  standalone: true,
  imports: [
    RouterLink, 
    CommonModule,
    TranslateModule
  ],
  templateUrl: './navbar-full.html',
  styleUrl: './navbar-full.scss'
})
export class NavbarFull {
  currentLanguage: string = 'es';
  showLanguageMenu: boolean = false;
  
  languages = [
    { code: 'es', name: 'Español', flag: '/assets/lag/es.svg' },
    { code: 'pt-BR', name: 'Português', flag: '/assets/lag/pt.svg' },
    { code: 'en', name: 'English', flag: '/assets/lag/en.svg' },
    { code: 'gn', name: 'Guaraní', flag: '/assets/lag/gn.svg' }
  ];

  constructor(private router : Router, private translate: TranslateService) {
    // Configurar idiomas disponíveis
    this.translate.addLangs(['es', 'pt-BR', 'en', 'gn']);
    this.translate.setDefaultLang('es');
    
    // Verificar se há idioma salvo no localStorage
    const savedLang = localStorage.getItem('language');
    if (savedLang && this.translate.langs.includes(savedLang)) {
      this.currentLanguage = savedLang;
      this.translate.use(savedLang);
    } else {
      this.translate.use('es');
    }
  }

  ngOnInit(): void {
      console.log(this.router.url);
      window.scrollTo(0, 0);
  }
  
  switchLanguage(lang: string): void {
    this.currentLanguage = lang;
    this.translate.use(lang);
    localStorage.setItem('language', lang);
    this.showLanguageMenu = false;
  }
  
  toggleLanguageMenu(): void {
    this.showLanguageMenu = !this.showLanguageMenu;
  }
  
  getCurrentLanguageFlag(): string {
    const lang = this.languages.find(l => l.code === this.currentLanguage);
    return lang ? lang.flag : '/assets/lag/es.svg';
  }
  ngAfterViewInit() {
    feather.replace();
    this.activateMenu();
  }

  status: boolean = false;
  toggleMenu(){
      this.status = !this.status;       
  }
  manu:boolean = true
  manuOpen:string=''
  subManu(item:any){
    this.manu = !this.manu;  
    this.manuOpen = item
    console.log(this.manuOpen);
    
    
  }

  windowScroll() {
    const navbar = document.getElementById('topnav') as HTMLInputElement;
    if (document.body.scrollTop >= 50 || document.documentElement.scrollTop > 50) {
      navbar.classList.add('nav-sticky');
    } else {
      navbar.classList.remove('nav-sticky');
    }

    var mybutton = document.getElementById("back-to-top");
    if (mybutton != null) {
      if (document.body.scrollTop > 500 || document.documentElement.scrollTop > 500) {
        mybutton.classList.add("block");
        mybutton.classList.remove("hidden");
      } else {
        mybutton.classList.add("hidden");
        mybutton.classList.remove("block");
      }
    }

  }

  activateMenu() {
    var menuItems = document.getElementsByClassName("sub-menu-item") as any;
    if (menuItems) {

      var matchingMenuItem = null;
      for (var idx = 0; idx < menuItems.length; idx++) {
        if (menuItems[idx].href === window.location.href) {
          matchingMenuItem = menuItems[idx];
        }
      }

      if (matchingMenuItem) {
        matchingMenuItem.classList.add('active');
        var immediateParent = this.getClosest(matchingMenuItem, 'li');

        if (immediateParent) {
          immediateParent.classList.add('active');
        }

        var parent = this.getClosest(immediateParent, '.child-menu-item');
        if (parent) {
          parent.classList.add('active');
        }
        console.log('Netlink =>', parent);
        var parent = this.getClosest(parent || immediateParent, '.parent-menu-item');

        if (parent) {
          parent.classList.add('active');

          var parentMenuitem = parent.querySelector('.menu-item');
          if (parentMenuitem) {
            parentMenuitem.classList.add('active');
          }

          var parentOfParent = this.getClosest(parent, '.parent-parent-menu-item');
          if (parentOfParent) {
            parentOfParent.classList.add('active');
          }
        } else {
          var parentOfParent = this.getClosest(matchingMenuItem, '.parent-parent-menu-item');
          if (parentOfParent) {
            parentOfParent.classList.add('active');
          }
        }
      }
    }
  }
  getClosest(elem: any, selector: any) {
    for (; elem && elem !== document; elem = elem.parentNode) {
      if (elem.matches(selector)) return elem;
    }
    return null;

  };
}
