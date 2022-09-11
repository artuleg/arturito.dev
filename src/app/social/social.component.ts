import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'arturo-social',
  templateUrl: './social.component.html',
  styleUrls: ['./social.component.scss']
})
export class SocialComponent {
  // https://iconos8.es/icon/set/social-media/color

  networks: any = {
    linkedin: 'https://es.linkedin.com/in/arturo-legaspi-rodrigo-393802bb',
    instagram: 'https://www.instagram.com/arturodev/',
    discord: 'https://discord.com/invite/TN3wqruf5y',
    twitter: 'https://twitter.com/0xarturito'
  }

  constructor() { }

  social(network: string) {
    const url = this.networks[network];
    window.open(url, '_blank');
  }

}
