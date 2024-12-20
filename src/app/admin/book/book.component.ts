import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Book} from "../../models/book.model";
import {BookService} from "../../services/book.service";

declare var $: any;  //Jquary tanımı

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent {

  //@Input(): Bir bileşenin ebeveyn bileşeninden (parent component) veri almasını sağlar.
  //new Book(): Bileşen dışarıdan bir book nesnesi almazsa, bu tanım ile boş bir Book nesnesi atanır.
  // Bu, book'un başlangıçta undefined olmasını önler.
  @Input() book: Book = new Book();
  errorMessage: string = "";  //Kitap kaydederken sunucuya gönderdiğimiz isteklerde hata oluşursa hatayı göstereceğiz
  //@Output(): Bileşen içinde bir olay tetiklendiğinde, bu olay ebeveyn(AdminComponent) bileşene iletilir.
  //EventEmitter Angular'ın olay yayma mekanizmasıdır. Bileşen içinden bu event emitter aracılığıyla olaylar yayılır.
  @Output() save = new EventEmitter<any>();

  constructor(private bookService: BookService) {
  }

  saveBook() {
    this.bookService.saveBook(this.book).subscribe(data => {
      this.save.emit(data);  //olayın tetiklenmesi için kullanılır.
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
