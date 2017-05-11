import {Component, OnInit} from '@angular/core';
import {NavController} from 'ionic-angular';
import {MovieService} from "./movie-service";
import * as _ from 'lodash';
import {StatusBar} from "@ionic-native/status-bar";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage implements OnInit {

  movies: any;

  constructor(public navCtrl: NavController, private movieService: MovieService, private statusBar: StatusBar) {

  }

  ngOnInit() {
    this.statusBar.backgroundColorByHexString('#babdbe');

    this.movieService
      .getNowPlaying('1')
      .subscribe(
        data => {
          this.movies = data.results;
          console.log('Now playing movies', this.movies);

          // Add a new 'posterImg' property with the full url of the poster image
          _.forEach(this.movies, function(movie) {
            movie.posterImg = 'http://image.tmdb.org/t/p/w185' + movie.poster_path;
          });

        },
        err => console.error('There was an error loading the movies now playing in theatres', err),
        () => console.log('Successfully loaded the movies now playing in theatres')
      );
  }

}
