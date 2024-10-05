import {Component} from '@angular/core';
import {Book} from "../../models/book.model";
import {BookService} from "../../services/book.service";

declare var $: any;  //Jquary tanımı

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent {

  book: Book = new Book();
  errorMessage: string = "";  //Kitap kaydederken sunucuya gönderdiğimiz isteklerde hata oluşursa hatayı göstereceğiz

  constructor(private bookService: BookService) {
  }

  saveBook() {
    this.bookService.saveBook(this.book).subscribe(data => {
      $('#bookModal').modal('hide');
      //...
    }, error => {
      this.errorMessage = 'Unexpected error occured when saving book.';
      console.log(error);
    })
  }

  //Diyalogu gösterme ve gizleme fonksiyonu bookComponent html indeki id ye bağladık
  showBookModal() {
    $('#bookModal').modal('show')
  }

}
