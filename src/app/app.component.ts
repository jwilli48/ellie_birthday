import { Component, HostListener, OnInit, Renderer2 } from '@angular/core';
import { interval, Subject, Observable, Observer } from 'rxjs';
import { takeUntil, switchMap } from 'rxjs/operators';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'ellie';

  constructor(private renderer: Renderer2) {}

  playing = false;
  currentImage = 'assets/ellie_josh1.jpg';
  currentMessage = ['Happy Birthday, Ellie!'];

  imageArray = [
    'assets/airport.jpg',
    'assets/airport_funny.jpg',
    'assets/ellie1.jpg',
    'assets/ellie_erza.jpg',
    'assets/ellie_friends.jpg',
    'assets/ellie_gumwall.jpg',
    'assets/ellie_gunther.jpg',
    'assets/ellie_josh2.jpg',
    'assets/ellie_josh_goofy.jpg',
    'assets/ellie_josh_gumwall.jpg',
    'assets/ellie_pregnant_gunther.jpg',
    'assets/ellie_rylen.jpg',
    'assets/erza.jpeg',
    'assets/erza.jpg',
    'assets/erza2.jpg',
    'assets/erza3.jpg',
    'assets/erza_car.jpg',
    'assets/erza_christmas.jpg',
    'assets/erza_ellie.jpg',
    'assets/erza_ellie2.jpg',
    'assets/erza_ellie3.jpg',
    'assets/erza_funny_face.jpg',
    'assets/erza_keyboard.jpg',
    'assets/erza_rain_suite.jpg',
    'assets/erza_ren.jpg',
    'assets/erza_ren_stroller.jpg',
    'assets/erza_sleeping.jpg',
    'assets/family_christmas.jpg',
    'assets/family_erza_1_party.jpg',
    'assets/family_gunther.jpg',
    'assets/family_josh_mom.jpg',
    'assets/family_seattle_pier.jpg',
    'assets/family_wa_1.jpg',
    'assets/funny_erza.jpg',
    'assets/gradtuation_erza.jpg',
    'assets/kissing_point.jpg',
    'assets/laughing_erza.jpg',
    'assets/propose.jpg',
    'assets/ren.jpg',
    'assets/ren2months.jpg',
    'assets/ren_ellie.jpg',
    'assets/ring1.jpg',
    'assets/ring2.jpg',
    'assets/santa_erza.jpg',
    'assets/space_needle.jpg',
    'assets/turckey_ellie.jpg',
    'assets/wedding.jpg',
    'assets/wedding2.jpg',
    'assets/wedding_josh_friends_car.jpg'
  ];
  currentImageIndex = 1;

  endSlideShow = new Subject();

  intervalTimer: Observable<number>;
  finalMessage = false;

  fading = false;

  ngOnInit() {
    this.shuffle(this.imageArray);

    const s = this.renderer.createElement('script') as HTMLScriptElement;
    s.src = 'https://www.youtube.com/iframe_api';
    this.renderer.appendChild(document.body, s);
    const s2 = this.renderer.createElement('script') as HTMLScriptElement;
    s2.src = 'https://cdn.rawgit.com/labnol/files/master/yt.js';
    this.renderer.appendChild(document.body, s2);
  }

  play() {
    if (this.playing) {
      this.playing = false;
    } else {
      this.playing = true;
      if (!this.intervalTimer) {
        this.intervalTimer = interval(3800).pipe(takeUntil(this.endSlideShow));
        this.intervalTimer.subscribe(() => {
          if (this.playing) {
            this.fading = true;
            setTimeout(() => {
              if (this.currentImageIndex < this.imageArray.length) {
                this.fading = false;
                this.currentImage = this.imageArray[this.currentImageIndex++];
              }
            }, 650);
          }
          if (this.currentImageIndex >= this.imageArray.length) {
            this.endSlideShow.next();
            this.currentMessage = ['I Love You'];
            setTimeout(() => { this.fading = false; this.currentImage = 'assets/ellie_josh_car.jpg'; this.finalMessage = true; }, 1500);
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
