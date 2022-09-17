import { animate, animateChild, query, stagger, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { listAnimation } from '../core/router-animations';

@Component({
  selector: 'arturo-social',
  templateUrl: './social.component.html',
  styleUrls: ['./social.component.scss'],
  animations: [
    trigger('items', [
      transition(':enter', [
        style({ transform: 'scale(0.5)', opacity: 0 }),  // initial
        animate('1s cubic-bezier(.8, -0.6, 0.2, 1.5)',
          style({ transform: 'scale(1)', opacity: 1 }))  // final
      ])
    ]),

    trigger('list', [
      transition(':enter', [
        query('@items', stagger(300, animateChild()))
      ]),
    ])
  ]
})
export class SocialComponent implements OnInit {
  // https://iconos8.es/icon/set/social-media/color

  networks: any = {
    linkedin: 'https://es.linkedin.com/in/arturo-legaspi-rodrigo-393802bb',
    instagram: 'https://www.instagram.com/arturodev/',
    discord: 'https://discord.com/invite/TN3wqruf5y',
    twitter: 'https://twitter.com/0xarturito'
  }

  constructor() { }

  ngOnInit(): void {
    // https://alvarotrigo.com/blog/css-text-animations/
    const elts = {
      text1: document.getElementById("text1"),
      text2: document.getElementById("text2")
    };

    const texts = [
      "If",
      "You",
      "Enjoy",
      "Let's",
      "Connect"
    ];

    const morphTime = 1;
    const cooldownTime = 0.25;

    let textIndex = texts.length - 1;
    let time = new Date();
    let morph = 0;
    let cooldown = cooldownTime;

    elts.text1!.textContent = texts[textIndex % texts.length];
    elts.text2!.textContent = texts[(textIndex + 1) % texts.length];

    function doMorph() {
      morph -= cooldown;
      cooldown = 0;

      let fraction = morph / morphTime;

      if (fraction > 1) {
        cooldown = cooldownTime;
        fraction = 1;
      }

      setMorph(fraction);
    }

    function setMorph(fraction: any) {
      elts.text2!.style.filter = `blur(${Math.min(8 / fraction - 8, 100)}px)`;
      elts.text2!.style.opacity = `${Math.pow(fraction, 0.4) * 100}%`;

      fraction = 1 - fraction;
      elts.text1!.style.filter = `blur(${Math.min(8 / fraction - 8, 100)}px)`;
      elts.text1!.style.opacity = `${Math.pow(fraction, 0.4) * 100}%`;

      elts.text1!.textContent = texts[textIndex % texts.length];
      elts.text2!.textContent = texts[(textIndex + 1) % texts.length];
    }

    function doCooldown() {
      morph = 0;

      elts.text2!.style.filter = "";
      elts.text2!.style.opacity = "100%";

      elts.text1!.style.filter = "";
      elts.text1!.style.opacity = "0%";
    }

    function animate() {
      requestAnimationFrame(animate);

      let newTime = new Date();
      let shouldIncrementIndex = cooldown > 0;
      let dt = ((<any>newTime) - (<any>time)) / 1000;
      time = newTime;

      cooldown -= dt;

      if (cooldown <= 0) {
        if (shouldIncrementIndex) {
          textIndex++;
        }

        doMorph();
      } else {
        doCooldown();
      }
    }

    animate();
  }


  social(network: string) {
    const url = this.networks[network];
    window.open(url, '_blank');
  }

}
