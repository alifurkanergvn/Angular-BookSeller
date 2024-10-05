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
  selectedBook: Book = new Book();

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
    this.selectedBook = new Book();
    this.child?.showBookModal();
  }

  editBookRequest(item: Book) {
    //Nesnenin kopyasını kullanıyorum çünkü kitap nesnesinin bazı alanlarını değiştirsem ve kaydetmezsem öge dirty olur.
    // Bunu önlemek için Oject.assign kullandık
    this.selectedBook = Object.assign({},item);
    this.child?.showBookModal();
  }

  saveBookWatcher(book: Book) {
    //Kayıt işleminin editten mi yoksa yeni bir kayıttan mı olduğunu ayırt etmeliyiz.
    //Eğer book.id yoksa aşağıda -1 dönecek buda yeni kitap ekleme olduğunu edit kullanılmadığını gösterir
    let itemIndex = this.bookList.findIndex(item => item.id === book.id);
    if (itemIndex !== -1){
      this.bookList[itemIndex] = book;
    } else {
      this.bookList.push(book); //Verimizi child'tan parent a paylaşmış olduk burada.
      //Böylece Create Book modalını Save Changes dediğimizde anında All Books a düşmüş olacak yeni verimiz.
    }
  }
}
