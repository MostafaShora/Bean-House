import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

type Language = 'en' | 'ar';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  private currentLanguage = new BehaviorSubject<Language>(
    (localStorage.getItem('lang') as Language) || 'en'
  );

  language$ = this.currentLanguage.asObservable();

  constructor() {
    this.applyLanguage(this.currentLanguage.value);
  }

  getCurrentLanguage(): Language {
    return this.currentLanguage.value;
  }

  setLanguage(lang: Language): void {
    this.currentLanguage.next(lang);
    localStorage.setItem('lang', lang);
    this.applyLanguage(lang);
  }

  private applyLanguage(lang: Language): void {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    if (lang === 'ar') {
      document.documentElement.style.fontFamily = '"Tajawal", sans-serif';
    }
  }

  toggleLanguage(): void {
    const newLang = this.currentLanguage.value === 'en' ? 'ar' : 'en';
    this.setLanguage(newLang);
  }
}
