import { Component, AfterViewInit } from '@angular/core';
import { AppComponent } from 'src/app/app.component';
import { GetDataService } from 'src/app/services/get-data.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements AfterViewInit {
  isSendMessage = false;

  constructor(private dataService: GetDataService, public appComponent: AppComponent) { }

  ngAfterViewInit(): void {
  }

  keydownTextarea(event) {
    setTimeout(() => {
      event.target.style.height = "auto";
      event.target.style.height = event.target.scrollHeight + "px";
      window.dispatchEvent(new Event('resize'));
    });
  }

  sendMessage() {
    for (let i = 0; i < this.appComponent.message.data.length; i++) {
      if (this.appComponent.message.data[i].value.trim() == '') {
        return;
      }
    }
    this.dataService.setData({ data: JSON.stringify(this.appComponent.message) }).subscribe(data => {
      this.isSendMessage = true;
    });
  }
}
