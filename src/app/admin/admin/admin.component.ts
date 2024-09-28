import { Component, OnInit, ViewChild } from '@angular/core';
import {Book} from "../../models/book.model";
import {BookService} from "../../services/book.service";
import {BookComponent} from "../book/book.component";

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  bookList: Array<Book> = [];

  //Ana bileşenden(AdminComponent) BookComponent'in metotlarına veya özelliklerine doğrudan erişebilmek için yaptık.
  // undefined yazdık çünkü bileşen henüz yüklenmemiş olabilir
  @ViewChild(BookComponent) child: BookComponent | undefined
  constructor(private bookService: BookService) { }

  ngOnInit(): void {
    this.bookService.getAllBooks().subscribe(data => {
      this.bookList = data;
    });
  }

  createBookRequest() {
    this.child?.showBookModal();
  }

}
