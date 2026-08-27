import { Injectable, signal } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

type Language = 'en' | 'ar';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  readonly language = signal<Language>(
    localStorage.getItem('lang') === 'ar' ? 'ar' : 'en'
  );

  private currentLanguage = new BehaviorSubject<Language>(
    this.language()
  );

  language$ = this.currentLanguage.asObservable();

  constructor() {
    this.applyLanguage(this.currentLanguage.value);
  }

  getCurrentLanguage(): Language {
    return this.language();
  }

  setLanguage(lang: Language): void {
    this.language.set(lang);
    this.currentLanguage.next(lang);
    localStorage.setItem('lang', lang);
    this.applyLanguage(lang);
  }

  private applyLanguage(lang: Language): void {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.style.fontFamily = lang === 'ar' ? '"Tajawal", sans-serif' : '';
  }

  toggleLanguage(): void {
    const newLang = this.language() === 'en' ? 'ar' : 'en';
    this.setLanguage(newLang);
  }
}
