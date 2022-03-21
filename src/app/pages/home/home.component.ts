import {Component, OnDestroy, OnInit} from '@angular/core';
import { SweetsService } from '../../services/sweets.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {

  sweets = [];
  sweetsSubscription: Subscription;

  constructor(
    private sweetsService: SweetsService
  ) { }

  ngOnInit() {
    this.sweetsSubscription = this.sweetsService.sweetsSubject.subscribe(
      (data: any) => {
        this.sweets = data;
      }
    );
    this.sweetsService.getSweets();
    this.sweetsService.emitSweets();
  }

  inStock(index) {
    if (this.sweets[index].inStock) {
      return 'red';
    } else {
      return 'green';
    }
  }

  ngOnDestroy(): void {
    this.sweetsSubscription.unsubscribe();
  }

}
