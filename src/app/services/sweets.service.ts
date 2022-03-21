import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Sweet } from '../interfaces/sweet';
import * as firebase from 'firebase';
import {newArray} from '@angular/compiler/src/util';

@Injectable({
  providedIn: 'root'
})
export class SweetsService {

  sweets: Sweet[] = [];

  sweetsSubject = new Subject<Sweet[]>();

  constructor() { }

  emitSweets() {
    this.sweetsSubject.next(this.sweets);
  }

  saveSweets() {
    firebase.database().ref('/sweets').set(this.sweets);
  }

  getSweets() {
    firebase.database().ref('/sweets').on('value', (data) => {
      this.sweets = data.val() ? data.val() : [];
      this.emitSweets();
    });
  }

  getSingleSweets(id) {
    return new Promise(
      (resolve, reject) => {
        firebase.database().ref('/sweets/' + id).once('value').then(
          (data) => {
            resolve(data.val());
          }
        ).catch(
          (error) => {
            reject(error);
          }
        );
      }
    );
  }

  createSweet(property: Sweet) {
    this.sweets.push(property);
    this.saveSweets();
    this.emitSweets();
  }

  deleteSweet(index) {
    this.sweets.splice(index, 1);
    this.saveSweets();
    this.emitSweets();
  }

  updateSweet(property: Sweet, index) {
    /*this.sweets[index] = property;
    this.saveProperties();
    this.emitProperties();*/
    firebase.database().ref('/sweets/' + index).update(property).catch(
      (error) => {
        console.log(error);
      }
    );
  }

  uploadFile(file: File) {
    return new Promise(
      (resolve, reject) => {
        const uniqueId = Date.now().toString();
        const fileName = uniqueId + file.name;
        const upload = firebase.storage().ref().child('images/sweets/' + fileName).put(file);
        upload.on(firebase.storage.TaskEvent.STATE_CHANGED,
          () => {
              console.log('Chargement...');
          },
          (error) => {
              console.error(error);
              reject(error);
          },
          () => {
              upload.snapshot.ref.getDownloadURL().then(
                (downLoadUrl) => {
                  resolve(downLoadUrl);
                }
              );
          }
        );
      }
    );
  }

  removeFile(fileLink: string) {
    if (fileLink) {
      const storageRef = firebase.storage().refFromURL(fileLink);
      storageRef.delete().then(
        () => {
          console.log('File deleted');
        }
      ).catch(
        (error) => {
          console.log(error);
        }
      );
    }
  }

}
