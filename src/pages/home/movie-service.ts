import {Injectable, OnInit} from '@angular/core';
import 'rxjs/add/operator/map';
import {Http} from '@angular/http';
import {Constants} from "../Utilities/Constants";

/**
 * Handles loading the movie feed
 */

@Injectable()
export class MovieService {

  http: any;

  constructor(private constants: Constants, http: Http) {
    this.http = http;
  }

  getNowPlaying(page: String) {
    return this.http
      .get('https://api.themoviedb.org/3/movie/now_playing?api_key=' + this.constants.API_KEY +  '&page=' + page + '&region=us')
      .map(res => res.json());
  }

  getUpcomingMovies(page: String) {
    return this.http
      .get('https://api.themoviedb.org/3/movie/upcoming?api_key='  + this.constants.API_KEY +  '&page=' + page + '&region=us')
      .map(res => res.json());
  }

}
