import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RevealDirective } from '../../directives/reveal.directive';
import { LanguageService } from '../../services/language.service';
import { translations } from '../../i18n/translations';

interface Stat {
  value: string;
  label: 'years' | 'farms' | 'cups';
}

type Language = 'en' | 'ar';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule, RevealDirective],
  templateUrl: './about.component.html',
  styleUrl: './about.component.css'
})
export class AboutComponent {
  readonly stats: Stat[] = [
    { value: '9+', label: 'years' },
    { value: '14', label: 'farms' },
    { value: '50k+', label: 'cups' }
  ];

  t = translations;

  constructor(private languageService: LanguageService) {}

  get currentLanguage(): Language {
    return this.languageService.language();
  }
}
