import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApixuService {

  constructor(private http: HttpClient) { }

  getWeather(location) { // HTTP request for weather data
    return this.http.get(
      'http://api.weatherstack.com/current?access_key=7b45d154b974b468be24beb63e9ba61e&query=' + location
    );
  }
}
