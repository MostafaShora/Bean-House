import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RevealDirective } from '../../directives/reveal.directive';
import { LanguageService } from '../../services/language.service';
import { translations } from '../../i18n/translations';

interface Review {
  key: 'amelia' | 'david';
  quote: string;
  name: string;
  meta: string;
  img: string;
}

type Language = 'en' | 'ar';

@Component({
  selector: 'app-reviews',
  standalone: true,
  imports: [CommonModule, RevealDirective],
  templateUrl: './reviews.component.html',
  styleUrl: './reviews.component.css'
})
export class ReviewsComponent {
  readonly reviews: Review[] = [
    {
      key: 'amelia',
      quote: "The House Blend has genuinely replaced my old coffee shop habit. It's rich without being bitter, and it always arrives roasted within the week.",
      name: 'Amelia Ross',
      meta: 'Subscriber since 2022',
      img: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=100&q=80'
    },
    {
      key: 'david',
      quote: 'You can genuinely taste the difference in the Sunrise Ethiopia. Bright, fruity, and nothing like the stale bags from the supermarket.',
      name: 'David Kim',
      meta: 'Home Barista',
      img: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=100&q=80'
    }
  ];

  t = translations;

  constructor(private languageService: LanguageService) {}

  get currentLanguage(): Language {
    return this.languageService.language();
  }
}
