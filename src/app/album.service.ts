import { Injectable } from '@angular/core';
import { Album } from './model/album.model';
import { ALBUMS } from './mock-album';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';

@Injectable()
export class AlbumService {
  albums: FirebaseListObservable<any[]>; //binding to a firebase array

  constructor(private database: AngularFireDatabase) {
    this.albums = database.list('albums');
  }
  getAlbums() {
    return this.albums;
  } //returns the list of imported ALBUMS

  addAlbum(newAlbum: Album){
    this.albums.push(newAlbum);
  }

  getAlbumById(albumId: string){
    return this.database.object('albums/' + albumId);
  }//returns a specific album

  updateAlbum(localUpdatedAlbum){
    let albumEntryInFirebase = this.getAlbumById(localUpdatedAlbum.$key);
    albumEntryInFirebase.update({title: localUpdatedAlbum.title,
                                artist: localUpdatedAlbum.artist,
                                description: localUpdatedAlbum.description});
  }

  deleteAlbum(localAlbumToDelete) {
    let albumEntryInFirebase = this.getAlbumById(localAlbumToDelete.$key);
    albumEntryInFirebase.remove();
  }

}
