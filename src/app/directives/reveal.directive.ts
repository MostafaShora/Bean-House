import { Directive, ElementRef, OnDestroy, AfterViewInit, Renderer2 } from '@angular/core';

/**
 * Usage: <div appReveal class="reveal">...</div>
 * Adds the `in` class the first time the element scrolls into view,
 * matching the fade/slide-up reveal from the original vanilla build.
 */
@Directive({
  selector: '[appReveal]',
  standalone: true
})
export class RevealDirective implements AfterViewInit, OnDestroy {
  private observer?: IntersectionObserver;

  constructor(private el: ElementRef<HTMLElement>, private renderer: Renderer2) {}

  ngAfterViewInit(): void {
    this.observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            this.renderer.addClass(this.el.nativeElement, 'in');
            this.observer?.unobserve(this.el.nativeElement);
          }
        }
      },
      { threshold: 0.15 }
    );
    this.observer.observe(this.el.nativeElement);
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }
}
