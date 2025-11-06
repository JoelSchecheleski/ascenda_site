import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  standalone: true,
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('app');

  constructor(private translate: TranslateService) {
    // Configurar idiomas disponíveis
    this.translate.addLangs(['es', 'pt-BR', 'en', 'gn']);
    this.translate.setDefaultLang('es');
    
    // Verificar se há idioma salvo no localStorage
    const savedLang = localStorage.getItem('language');
    if (savedLang && this.translate.langs.includes(savedLang)) {
      this.translate.use(savedLang);
    } else {
      // Usar espanhol como idioma padrão
      this.translate.use('es');
    }
  }
}
