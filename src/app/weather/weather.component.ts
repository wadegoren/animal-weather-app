import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ApixuService } from "../apixu.service";

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css']

})
export class WeatherComponent implements OnInit {
  public weatherSearchForm: FormGroup;
  public weatherData: any;
  public rainyWeatherCodes: number[] = [359, 356, 353, 308, 305, 302, 296, 299, 293, 263, 266, 176]
  public snowyWeatherCodes: number[] = [395, 392, 371, 368, 338, 335, 326, 230, 227, 179]
  public freezingRainWeatherCodes: number[] = [377, 374, 365, 362, 350, 320, 317, 314, 311, 284, 281, 266, 185, 182]
  public clearWeatherCodes: number = 113;
  public partlyCloudyWeatherCodes: number = 116;
  public cloudyWeatherCodes: number[] = [119, 122]
  public mistFogWeatherCodes: number[] = [143, 248];

  public isRainy: boolean = true; // boolean variables to display images 
  public isSnowy: boolean = true;
  public isfreezingRain: boolean = true;
  public isClear: boolean = true;
  public ispartlyCloudy: boolean = true;
  public isCloudy: boolean = true;
  public isMisty: boolean = true;




  constructor(private formBuilder: FormBuilder,
    private apixuService: ApixuService) { }


  ngOnInit(): void {
    this.weatherSearchForm = this.formBuilder.group({
      location: [''],
    });
  }

  sendToAPIXU(formValues) { // get weather data from API 
    this.apixuService
      .getWeather(formValues.location)
      .subscribe(data => this.weatherData = data)
    console.log(this.weatherData);
    this.checkWeather();
  }

  resetImages() { // reset values for new search
    this.isRainy = true;
    this.isSnowy = true;
    this.isfreezingRain = true;
    this.isClear = true;
    this.ispartlyCloudy = true;
    this.isCloudy = true;
    this.isMisty = true;
  }

  checkWeather() { // function to check conditions of weather code
    if (this.rainyWeatherCodes.includes(this.weatherData.current.weather_code)) {
      this.isRainy = false;
    }
    else if (this.snowyWeatherCodes.includes(this.weatherData.current.weather_code)) {
      this.isSnowy = false;
    }
    else if (this.freezingRainWeatherCodes.includes(this.weatherData.current.weather_code)) {
      this.isfreezingRain = false;
    }
    else if (this.clearWeatherCodes == this.weatherData.current.weather_code) {
      this.isClear = false;
    }
    else if (this.partlyCloudyWeatherCodes == this.weatherData.current.weather_code) {
      this.ispartlyCloudy = false;
    }
    else if (this.cloudyWeatherCodes.includes(this.weatherData.current.weather_code)) {
      this.isCloudy = false;
    }
    else if (this.mistFogWeatherCodes.includes(this.weatherData.current.weather_code)) {
      this.isMisty = false;
    }
    else {
      console.log("ERROR: Weather Code not found");
    }
  }
}


