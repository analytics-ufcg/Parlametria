import { Component, OnInit, ViewChildren, QueryList } from '@angular/core';

import { Observable } from 'rxjs';

import { NgbdSortableHeaderDirective, SortEvent } from 'src/app/shared/directives/sortable.directive';
import { RuralistasAmbientalistasService } from './ruralistas-ambientalistas.service';

@Component({
  selector: 'app-ruralistas-ambientalistas',
  templateUrl: './ruralistas-ambientalistas.component.html',
  styleUrls: ['./ruralistas-ambientalistas.component.scss']
})
export class RuralistasAmbientalistasComponent implements OnInit {

  parlamentares$: Observable<any[]>;
  total$: Observable<number>;

  @ViewChildren(NgbdSortableHeaderDirective) headers: QueryList<NgbdSortableHeaderDirective>;

  constructor(private service: RuralistasAmbientalistasService) { }

  ngOnInit() {
    this.parlamentares$ = this.service.parlamentares$;
    this.total$ = this.service.total$;
  }

  onSort({ column, direction }: SortEvent) {
    // resetting other headers
    this.headers.forEach(header => {
      if (header.sortable !== column) {
        header.direction = '';
      }
    });

    this.service.sortColumn = column;
    this.service.sortDirection = direction;
  }

}
