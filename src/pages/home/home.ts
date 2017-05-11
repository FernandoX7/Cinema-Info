import {Component, OnInit} from '@angular/core';
import {NavController} from 'ionic-angular';
import {MovieService} from "./movie-service";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage implements OnInit {

  constructor(public navCtrl: NavController, private data: MovieService) {

  }

  ngOnInit() {
    this.data
      .getNowPlaying('1')
      .subscribe(
        data => {
          console.log('data', data);
        },
        err => console.error('There was an error loading the movies now playing in theatres', err),
        () => console.log('Successfully loaded the movies now playing in theatres')
      );
  }

}
