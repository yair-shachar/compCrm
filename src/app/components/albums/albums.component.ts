import { Component, OnInit } from '@angular/core';
import { Album } from '../../models/album';
import { AlbumsService } from '../../services/albums.service';
import { Title } from "@angular/platform-browser";

@Component({
  selector: 'app-albums',
  templateUrl: './albums.component.html',
  styleUrls: ['./albums.component.css']
})
export class AlbumsComponent implements OnInit {
pageTitle: string = 'Albums';
headerIcon: string = 'fas fa-compact-disc'; 

  albums: Album[] = [];

  constructor(private albumService: AlbumsService,
    private titleService: Title
   ) { }
    
    ngOnInit(): void {
      this.titleService.setTitle('Company CRM | Albums');
      this.albumService.getAlbums().subscribe((albums: Album[]) => {
      this.albums = albums;
      });
  }

}
