import { Component, HostListener, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LanguageService } from '../../services/language.service';
import { translations } from '../../i18n/translations';

interface NavLink {
  label: string;
  href: string;
  id: string;
}

type Language = 'en' | 'ar';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {
  scrolled = false;
  menuOpen = false;
  activeId = 'home';
  currentLanguage: Language = 'en';
  t = translations;

  constructor(private languageService: LanguageService) {}

  ngOnInit(): void {
    this.currentLanguage = this.languageService.getCurrentLanguage();
    this.languageService.language$.subscribe((lang) => {
      this.currentLanguage = lang;
    });
  }

  getLinks(): NavLink[] {
    return [
      { label: this.t[this.currentLanguage].nav.home, href: '#home', id: 'home' },
      { label: this.t[this.currentLanguage].nav.about, href: '#about', id: 'about' },
      { label: this.t[this.currentLanguage].nav.products, href: '#products', id: 'products' },
      { label: this.t[this.currentLanguage].nav.reviews, href: '#reviews', id: 'reviews' },
      { label: this.t[this.currentLanguage].nav.contact, href: '#contact', id: 'contact' }
    ];
  }

  @HostListener('window:scroll')
  onWindowScroll(): void {
    this.scrolled = window.scrollY > 40;
    this.updateActiveLink();
  }

  toggleMenu(): void {
    this.menuOpen = !this.menuOpen;
  }

  closeMenu(): void {
    this.menuOpen = false;
  }

  toggleLanguage(): void {
    this.languageService.toggleLanguage();
  }

  private updateActiveLink(): void {
    const sections = document.querySelectorAll<HTMLElement>('section[id]');
    let current = 'home';
    sections.forEach((sec) => {
      const top = sec.offsetTop - 120;
      if (window.scrollY >= top) {
        current = sec.id;
      }
    });
    this.activeId = current;
  }
}
