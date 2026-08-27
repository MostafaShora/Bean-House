import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RevealDirective } from '../../directives/reveal.directive';

interface Product {
  name: string;
  tag: string;
  description: string;
  price: string;
  img: string;
  alt: string;
  added: boolean;
}

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, RevealDirective],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent {
  readonly products: Product[] = [
    {
      name: 'Sunrise Ethiopia',
      tag: 'Light Roast',
      description: 'Bright and floral with notes of bergamot, peach, and honey. A washed-process single origin.',
      price: '$18.50',
      img: 'https://images.unsplash.com/photo-1447933601403-0c6688de566e?auto=format&fit=crop&w=700&q=80',
      alt: 'Bag of Sunrise Ethiopia coffee beans',
      added: false
    },
    {
      name: 'House Blend No.3',
      tag: 'Medium Roast',
      description: 'Our signature everyday blend — chocolate, toasted hazelnut, and a soft caramel finish.',
      price: '$16.00',
      img: 'https://images.unsplash.com/photo-1442550528053-c431ecb55509?auto=format&fit=crop&w=700&q=80',
      alt: 'Bag of House Blend coffee beans',
      added: false
    },
    {
      name: 'Midnight Sumatra',
      tag: 'Dark Roast',
      description: 'Bold, earthy, and full-bodied with dark cocoa and a low, smoky finish.',
      price: '$17.25',
      img: 'https://images.unsplash.com/photo-1524350876685-274059332603?auto=format&fit=crop&w=700&q=80',
      alt: 'Bag of Midnight Sumatra coffee beans',
      added: false
    }
  ];

  addToCart(product: Product): void {
    product.added = true;
    setTimeout(() => (product.added = false), 1200);
  }

  onImgError(event: Event): void {
    const img = event.target as HTMLImageElement;
    img.style.opacity = '0';
    img.parentElement?.style.setProperty(
      'background',
      'linear-gradient(135deg, var(--beige), var(--gold-soft))'
    );
  }
}
