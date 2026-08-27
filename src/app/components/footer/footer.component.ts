import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LanguageService } from '../../services/language.service';
import { translations } from '../../i18n/translations';

type Language = 'en' | 'ar';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {
  t = translations;
  currentYear = new Date().getFullYear();

  constructor(private languageService: LanguageService) {}

  get currentLanguage(): Language {
    return this.languageService.language();
  }
}
