import { Component } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { DataService } from './../services/data.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  COVIDdata: any[] = [];
  control: string = "tc";

  // options
  gradient: boolean = true;
  showLegend: boolean = true;
  showLabels: boolean = true;
  isDoughnut: boolean = false;
  legendPosition: string = 'below';

  colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };

  constructor(private dataService: DataService) {
    this.dataService.getData().subscribe((response) => {
      this.COVIDdata = response;
    });
  }

  onSelect(data: any): void {
    console.log('Item clicked', JSON.parse(JSON.stringify(data)));
  }

  onActivate(data: any): void {
    console.log('Activate', JSON.parse(JSON.stringify(data)));
  }

  onDeactivate(data: any): void {
    console.log('Deactivate', JSON.parse(JSON.stringify(data)));
  }

  updateData() {
    console.log(this.control);
    if (this.control == "tc") {
      this.COVIDdata = this.dataService.getTotalConfirmedData();
    } else if(this.control == "nc") {
      this.COVIDdata = this.dataService.getNewConfirmedData();
    } else if(this.control == "td") {
      this.COVIDdata = this.dataService.getTotalDeathsData();
    }
  }

}
