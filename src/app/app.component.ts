import { Component, OnInit, Renderer2 } from '@angular/core';
import { interval, Subject, Observable } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import {
  trigger,
  state,
  style,
  animate,
  transition,
  AnimationEvent
} from '@angular/animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    trigger('fade', [
      state('fade-out', style({
        opacity: 0
      })),
      state('fade-in', style({
        opacity: 1
      })),
      transition('fade-in => fade-out', [animate('.8s ease-out')]),
      transition('fade-out => fade-in', [animate('.8s ease-in')])
    ])
  ]
})
export class AppComponent implements OnInit {
  title = 'ellie';

  constructor(private renderer: Renderer2) {}

  fade: string = 'fade-in';
  playing = false;
  currentImage = 'assets/ellie_josh1.jpg';
  currentMessage = ['Happy Birthday, Ellie!'];

  messages = [
    'You are amazing',
    'I am so happy being with you',
    'No one could make me happier then you have',
    'Our family is wonderful',
    'There is no one I would rather spend my time with',
    'You are perfect for me',
    'You are beautiful',
    'I love you with all of my heart',
    'Our life together has made me so happy',
    'I will never forget our memories together',
    'And I look forward to the memories we will make',
    'For the rest of eternity',
    'I will always be there for you',
    'Like you have always been for me',
    'You are the light of my life',
    'And the best mother',
    'For our amazing children',
    'We are so lucky to have you',
    'You change the lives of those around you',
    'You work harder then anyone else',
    'I am so happy to have you by my side',
    'For all the rest of our lives',
    'I hope I make you as happy as you make me',
    'I Love You'
  ]

  currentMessageIndex = 0;

  imageArray = [
    'assets/christmas_first.jpg',
    'assets/ellie_josh_goofy.jpg',
    'assets/family_washington.jpg',
    'assets/erza_ren_stroller.jpg',
    'assets/propose.jpg',
    'assets/ellie_carrying_erza.jpg',
    'assets/ellie1.jpg',
    'assets/erza_ellie3.jpg',
    'assets/baseball.jpg',
    'assets/airport.jpg',
    'assets/ren2months.jpg',
    'assets/ring2.jpg',
    'assets/graduation_ellie_josh.jpg',
    'assets/disney_land.jpg',
    'assets/ellie_erza.jpg',
    'assets/ren_ellie.jpg',
    'assets/erza_ren.jpg',
    'assets/erza3.jpg',
    'assets/ellie_friends.jpg',
    'assets/gradtuation_erza.jpg',
    'assets/family_gunther.jpg',
    'assets/wedding2.jpg',
    'assets/ellie_josh2.jpg',
    'assets/ring1.jpg',
  ];

  randImageArray = [
    'assets/erza.jpeg',
    'assets/ellie_gunther.jpg',
    'assets/ellie_josh_gumwall.jpg',
    'assets/erza_keyboard.jpg',
    'assets/ellie_pregnant_gunther.jpg',
    'assets/erza.jpg',
    'assets/erza2.jpg',
    'assets/erza_car.jpg',
    'assets/erza_christmas.jpg',
    'assets/erza_ellie.jpg',
    'assets/family_josh_mom.jpg',
    'assets/erza_ellie2.jpg',
    'assets/erza_funny_face.jpg',
    'assets/ellie_rylen.jpg',
    'assets/erza_rain_suite.jpg',
    'assets/erza_sleeping.jpg',
    'assets/family_christmas.jpg',
    'assets/family_erza_1_party.jpg',
    'assets/family_seattle_pier.jpg',
    'assets/family_wa_1.jpg',
    'assets/kissing_point.jpg',
    'assets/laughing_erza.jpg',
    'assets/ren.jpg',
    'assets/santa_erza.jpg',
    'assets/wedding.jpg',
    'assets/wedding_josh_friends_car2.jpg'
  ]

  currentImageIndex = 0;

  endSlideShow = new Subject();

  intervalTimer: Observable<number>;
  finalMessage = false;

  fading = false;

  ngOnInit() {
    // this.shuffle(this.imageArray);
    this.shuffle(this.randImageArray);
    this.imageArray = [...this.imageArray, ...this.randImageArray];
    this.imageArray.push('assets/ellie_josh_car.jpg');

    const s = this.renderer.createElement('script') as HTMLScriptElement;
    s.src = 'https://www.youtube.com/iframe_api';
    this.renderer.appendChild(document.body, s);
    const s2 = this.renderer.createElement('script') as HTMLScriptElement;
    s2.src = 'https://cdn.rawgit.com/labnol/files/master/yt.js';
    this.renderer.appendChild(document.body, s2);
  }

  onAnimationDone(event: AnimationEvent) {
    if (this.playing && event.fromState === 'fade-in') {
      if (this.currentMessageIndex < this.messages.length) {
        this.currentMessage = [this.messages[this.currentMessageIndex++]];
      }
      this.currentImage = this.imageArray[this.currentImageIndex++];
      setTimeout(() => this.fade = 'fade-in', 500);
    }
  }

  play() {
    if (this.playing) {
      this.playing = false;
    } else {
      this.playing = true;
      if (!this.intervalTimer) {
        this.intervalTimer = interval(3800).pipe(takeUntil(this.endSlideShow));
        this.intervalTimer.pipe(takeUntil(this.endSlideShow)).subscribe(() => {
          if (this.playing && this.currentImageIndex < this.imageArray.length) {
            this.fade = 'fade-out';
          }
          if (this.currentImageIndex >= this.imageArray.length) {
            this.endSlideShow.next();
            this.currentMessage = ['I Love You'];
            this.finalMessage = true;
          }
        });
      }
    }
  }

  shuffle(array: string[]) {
    let currentIndex = array.length;
    let temporaryValue: string;
    let randomIndex: number;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }

    return array;
  }
}
