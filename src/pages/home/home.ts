import {Component, OnInit} from '@angular/core';
import {NavController} from 'ionic-angular';
import {MovieService} from "./movie-service";
import * as _ from 'lodash';
import {StatusBar} from "@ionic-native/status-bar";
import * as moment from 'moment';

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
          let localMovieService = this.movieService;
          this.movies = data.results;
          console.log('Now playing movies', this.movies);

          // Add a new 'posterImg' property with the full url of the poster image
          _.forEach(this.movies, function(movie) {
            movie.posterImg = 'http://image.tmdb.org/t/p/w185' + movie.poster_path;

            // TODO: Refactor this to use function - scope problem at the moment - Also has hard coded year
            localMovieService
              .getMovieDetails(_.split(movie.title), '2017')
              .subscribe(
                data => {
                  console.log('Movie detail', data);

                  if (!_.isNil(data.Runtime)) {
                    movie.detailRuntime = data.Runtime.replace('min', '').trim() + ' Minutes';
                  }

                  movie.detailYear = data.Year;
                  movie.detailRated = data.Rated;
                  movie.detailReleased = moment(data.Released).format('dddd, MMMM Do YYYY');
                  movie.detailRatings = data.Ratings;
                  movie.detailActors = data.Actors;


                },
                err => console.error('There was an error loading the movies now playing in theatres', err),
                () => console.log('Successfully loaded the movies now playing in theatres')
              );

          });

        },
        err => console.error('There was an error loading the movies now playing in theatres', err),
        () => console.log('Successfully loaded the movies now playing in theatres')
      );
  }

  getMovieDetail(title: String, year: String) {
    this.movieService
      .getMovieDetails(title, year)
      .subscribe(
        data => {
          console.log('Movie detail', data);
        },
        err => console.error('There was an error getting ' + title + ' details', err),
        () => console.log('Successfully got ' + title + ' details')
      );
  }

}
