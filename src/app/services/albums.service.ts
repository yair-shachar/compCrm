import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AlbumsService {

  constructor(private HttpClient: HttpClient) { }

getAlbums() {
return this.HttpClient.get('https://jsonplaceholder.typicode.com/albums');
}

}
