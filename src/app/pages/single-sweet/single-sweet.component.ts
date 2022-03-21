import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {SweetsService} from '../../services/sweets.service';
import {Sweet} from '../../interfaces/sweet';

@Component({
  selector: 'app-single-sweet',
  templateUrl: './single-sweet.component.html',
  styleUrls: ['./single-sweet.component.css']
})
export class SingleSweetComponent implements OnInit {

  sweet: Sweet;

  constructor(
    private route: ActivatedRoute,
    private sweetsService: SweetsService
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.sweetsService.getSingleSweets(id).then(
      (sweet: Sweet) => {
        this.sweet = sweet;
      }
    ).catch(
      (error) => {
        console.error(error);
      }
    );
  }

}
