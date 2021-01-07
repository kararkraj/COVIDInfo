import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError, pipe } from 'rxjs';
import { catchError, retry, map, filter } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  public data: any[] = [];

  constructor(private http: HttpClient) { }

  getData() {
    return this.http.get("https://api.covid19api.com/summary").pipe(
      map((response) => {
        this.data = response["Countries"];
        this.data;
        return this.getTotalConfirmedData();
      })
    )
  }

  getTotalConfirmedData() {
    const tcd = [];
    this.data.forEach(element => {
      const data = {
        "name": element.Country,
        "value": element.TotalConfirmed
      }
      tcd.push(data);
    });
    return tcd;
  }

  getNewConfirmedData() {
    const ncd = [];
    this.data.forEach(element => {
      const data = {
        "name": element.Country,
        "value": element.NewConfirmed
      }
      ncd.push(data);
    });
    return ncd;
  }

  getTotalDeathsData() {
    const tdd = [];
    this.data.forEach(element => {
      const data = {
        "name": element.Country,
        "value": element.TotalDeaths
      }
      tdd.push(data);
    });
    return tdd;
  }
}
