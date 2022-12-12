import { Directive, ElementRef, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appDestacar]',
})
export class DestacarDirective {
  constructor(private el: ElementRef, private renderer: Renderer2) {
    renderer.setAttribute(el.nativeElement, 'fontSize', '50px');
    renderer.setAttribute(el.nativeElement, 'color', 'blue');
    renderer.setAttribute(el.nativeElement, 'border', '2px solid blue');
  }
}
