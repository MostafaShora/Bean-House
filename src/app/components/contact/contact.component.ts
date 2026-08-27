import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LanguageService } from '../../services/language.service';
import { translations } from '../../i18n/translations';

type Language = 'en' | 'ar';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent implements OnInit {
  formData = {
    name: '',
    email: '',
    message: ''
  };

  formSubmitted = false;
  submitted = false;
  showSuccess = false;
  currentLanguage: Language = 'en';
  t = translations;

  constructor(private languageService: LanguageService) {}

  ngOnInit(): void {
    this.currentLanguage = this.languageService.getCurrentLanguage();
    this.languageService.language$.subscribe((lang) => {
      this.currentLanguage = lang;
    });
  }

  onSubmit(): void {
    this.formSubmitted = true;

    if (this.isFormValid()) {
      console.log('Form submitted:', this.formData);
      this.showSuccess = true;
      this.formData = { name: '', email: '', message: '' };
      this.formSubmitted = false;

      setTimeout(() => {
        this.showSuccess = false;
      }, 4000);
    }
  }

  isFormValid(): boolean {
    return (
      this.formData.name.trim() !== '' &&
      this.formData.email.trim() !== '' &&
      this.isValidEmail(this.formData.email) &&
      this.formData.message.trim() !== ''
    );
  }

  isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  getErrorMessage(field: 'name' | 'email' | 'message'): string {
    const messages = this.t[this.currentLanguage].contact.form;
    if (field === 'email' && this.formData.email && !this.isValidEmail(this.formData.email)) {
      return messages.invalidEmail;
    }
    return messages.required;
  }
}
