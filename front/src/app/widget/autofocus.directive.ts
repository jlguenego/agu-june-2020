import { Directive, ElementRef, OnInit } from '@angular/core';

@Directive({
  selector: '[appAutofocus]',
})
export class AutofocusDirective implements OnInit {
  constructor(private elt: ElementRef<HTMLElement>) {
    console.log('directive instantiated');
  }
  ngOnInit(): void {
    console.log('focus');
    this.elt.nativeElement.focus();
  }
}
