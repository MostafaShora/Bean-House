import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RevealDirective } from '../../directives/reveal.directive';
import { LanguageService } from '../../services/language.service';
import { translations } from '../../i18n/translations';

interface Stat {
  value: string;
  label: string;
}

type Language = 'en' | 'ar';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule, RevealDirective],
  templateUrl: './about.component.html',
  styleUrl: './about.component.css'
})
export class AboutComponent implements OnInit {
  readonly stats: Stat[] = [
    { value: '9+', label: 'Years Roasting' },
    { value: '14', label: 'Origin Farms' },
    { value: '50k+', label: 'Cups Served' }
  ];

  currentLanguage: Language = 'en';
  t = translations;

  constructor(private languageService: LanguageService) {}

  ngOnInit(): void {
    this.currentLanguage = this.languageService.getCurrentLanguage();
    this.languageService.language$.subscribe((lang) => {
      this.currentLanguage = lang;
    });
  }
}
