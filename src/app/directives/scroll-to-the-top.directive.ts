import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appScrollToTheTop]'
})
export class ScrollToTheTopDirective {

  constructor(private el: ElementRef) {}
  
  @HostListener('click')
  onClick() {
    //console.log("activated scroll to the top");
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }

}
