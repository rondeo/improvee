import { IonContent, DomController } from '@ionic/angular';
import { Directive, ElementRef, Input, Renderer2, OnInit } from '@angular/core';
@Directive({
  selector: '[appScrollVanish]'
})
export class ScrollVanishDirective implements OnInit {
  @Input('appScrollVanish') scrollArea: IonContent
  private hidden: boolean = false;
  private triggerDistance: number = 20;


  constructor(private element: ElementRef, private renderer: Renderer2, private domCtrl: DomController) {
  }

  ngOnInit() {
    this.initStyles();
    this.scrollArea.ionScroll.subscribe(scrollEvent => {
      let delta = scrollEvent.detail.deltaY;
      if (scrollEvent.detail.currentY === 0 && this.hidden) {
        this.show();
      }
      else if (!this.hidden && delta > this.triggerDistance) {
        this.hide();
      } else if (this.hidden && delta < -this.triggerDistance) {
        this.show();
      }

    })
  }

  initStyles() {

    this.domCtrl.write(() => {
      this.renderer.setStyle(this.element.nativeElement, 'transition', '1s linear');
    });

  }

  hide() {

    this.domCtrl.write(() => {
      this.renderer.setStyle(this.element.nativeElement, 'min-height', '0px');
      this.renderer.setStyle(this.element.nativeElement, 'height', '0px');
      this.renderer.setStyle(this.element.nativeElement, 'opacity', '0');
      this.renderer.setStyle(this.element.nativeElement, 'padding', '0');
      this.renderer.setStyle(this.element.nativeElement, 'transition', 'opacity  1.5s ');
    });

    this.hidden = true;

  }

  show() {

    this.domCtrl.write(() => {
      this.renderer.setStyle(this.element.nativeElement, 'height', '160px');
      this.renderer.removeStyle(this.element.nativeElement, 'opacity');
      this.renderer.removeStyle(this.element.nativeElement, 'min-height');
      this.renderer.removeStyle(this.element.nativeElement, 'padding');
      
    });

    this.hidden = false;

  }
}