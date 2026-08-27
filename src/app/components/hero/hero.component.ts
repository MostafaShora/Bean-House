import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LanguageService } from '../../services/language.service';
import { translations } from '../../i18n/translations';

type Language = 'en' | 'ar';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.css'
})
export class HeroComponent {
  t = translations;

  constructor(private languageService: LanguageService) {}

  get currentLanguage(): Language {
    return this.languageService.language();
  }
}
