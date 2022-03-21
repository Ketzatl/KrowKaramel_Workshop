import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, NgForm, Validators} from '@angular/forms';
import {SweetsService} from 'src/app/services/sweets.service';
import {Subscription} from 'rxjs';
import * as $ from 'jquery';
import {Sweet} from '../../../interfaces/sweet';




@Component({
  selector: 'app-admin-sweets',
  templateUrl: './admin-sweets.component.html',
  styleUrls: ['./admin-sweets.component.css']
})
export class AdminSweetsComponent implements OnInit {

  sweetsForm: FormGroup;
  sweetsSubscription: Subscription;
  sweets: Sweet[] = [];

  indexToRemove;

  indexToUpdate;
  editMode = false;

  photoUploading = false;
  photoUploaded = false;
  photosAdded: any[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private sweetsService: SweetsService
  ) { }

  ngOnInit(): void {
    this.initSweetsForm();
    this.sweetsService.sweetsSubject.subscribe(
      (data: Sweet[]) => {
        this.sweets = data;
      }
    );
    this.sweetsService.getSweets();
    this.sweetsService.emitSweets();
  }

  initSweetsForm() {
    this.sweetsForm = this.formBuilder.group({
      title: ['', Validators.required],
      category: ['', Validators.required],
      height: ['', Validators.required],
      tva: ['', Validators.required],
      description: ['', Validators.required],
      price: ['', Validators.required],
      in_stock: ''
    });
  }


  onSubmitSweetsForm() {
    const newSweet: Sweet = this.sweetsForm.value;
    newSweet.in_stock = this.sweetsForm.get('in_stock').value ? this.sweetsForm.get('in_stock').value : false;
    newSweet.photos = this.photosAdded ? this.photosAdded : [];
    if (this.editMode) {
      this.sweetsService.updateSweet(newSweet, this.indexToUpdate);
    } else {
      this.sweetsService.createSweet(newSweet);
    }
    $('#sweetsFormModal').modal('hide');
  }

  resetForm() {
    this.editMode = false;
    this.sweetsForm.reset();
    this.photosAdded = [];
  }

  onDeleteSweet(index) {
      $('#deleteSweetModal').modal('show');
      this.indexToRemove = index;
  }

  onConfirmDeleteSweet() {
      this.sweets[this.indexToRemove].photos.forEach(
        (photo) => {
          this.sweetsService.removeFile(photo);
        }
      );
      this.sweetsService.deleteSweet(this.indexToRemove);
      $('#deleteSweetModal').modal('hide');
  }

  onEditSweet(sweet: Sweet) {
    this.editMode = true;
    $('#sweetsFormModal').modal('show');
    this.sweetsForm.get('title').setValue(sweet.title);
    this.sweetsForm.get('category').setValue(sweet.category);
    this.sweetsForm.get('height').setValue(sweet.height);
    this.sweetsForm.get('tva').setValue(sweet.tva);
    this.sweetsForm.get('description').setValue(sweet.description ? sweet.description : '');
    this.sweetsForm.get('price').setValue(sweet.price);
    this.sweetsForm.get('in_stock').setValue(sweet.in_stock);
    this.photosAdded = sweet.photos ? sweet.photos : [];
    const index = this.sweets.findIndex(
      (sweetEl) => {
        if (sweetEl === sweet) {
          return true;
        }
      }
    );
    this.indexToUpdate = index;

  }

  onUploadFile(event) {
    this.photoUploading = true;
    this.sweetsService.uploadFile(event.target.files[0]).then(
      (url: string) => {
        this.photosAdded.push(url);
        this.photoUploading = false;
        this.photoUploaded = true;
        setTimeout(() => {
          this.photoUploaded = false;
        }, 4000);
      }
    );
  }


  onRemoveAddedPhoto(index) {
    this.sweetsService.removeFile(this.photosAdded[index]);
    this.photosAdded.splice(index, 1);
  }
}
