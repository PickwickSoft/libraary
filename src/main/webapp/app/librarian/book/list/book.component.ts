import { Component, OnInit } from '@angular/core';
import { Book } from '../../../entities/book/book.model';
import { BookService } from '../../../entities/book/book.service';
import {AfterViewInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'jhi-book-list',
  templateUrl: './book.component.html',
})
export class BookComponent implements OnInit {
  displayedColumns: string[] = ['id', 'title', 'author', 'year', 'publisher', 'publicationYear', 'pages', 'isbn'];
  dataSource: any | null = null;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private bookService: BookService) { }

  ngOnInit(): void {
    this.bookService.query().subscribe((result) => {
      this.dataSource = result.body
      console.log(this.dataSource)
    })
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  
  
}
