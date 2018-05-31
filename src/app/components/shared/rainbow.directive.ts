import {Directive, HostBinding, HostListener, Input, OnInit} from '@angular/core';

@Directive({
  selector: '[appRainbow]'
})

export class RainbowDirective implements OnInit {
  possibleColors = ['red', 'blue', 'green', 'yellow', 'purple', 'orange'];

  // use the directive with [appRainbow]='x' to set the intervaltimer to x ms
  @Input('appRainbow') intervalTimer = 1000;

  // verander de color variable om op de host element deze waarde ook te zetten voor style.color
  @HostBinding('style.color') color: string;

  // verander de borderColor variable om op de host element deze waarde ook te zetten voor style.border-color
  @HostBinding('style.border-color') borderColor: string;

  @HostListener('mouseover') mouseOver(event: Event) {
    this.gainRandomColor();
  }

  @HostListener('mouseleave') mouseLeave(event: Event) {
    this.gainRandomColor();
  }

  ngOnInit() {
    // moet hier gedaan worden, in constructor is de waarde van this.intervalTimer nog niet binnen
     setInterval(() => this.runningLoop(Event), this.intervalTimer);
  }

  gainRandomColor() {
    const randomColor = this.possibleColors[Math.floor(Math.random() * this.possibleColors.length)];
    this.color = this.borderColor = randomColor;
  }

  constructor() {
  }

  runningLoop(el) {
    // console.log('intervalTimer: ' + this.intervalTimer);
    this.gainRandomColor();
  }


}
