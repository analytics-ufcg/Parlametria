import { Injectable, PipeTransform } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';

import { BehaviorSubject, Observable, of, Subject } from 'rxjs';
import { debounceTime, delay, switchMap, tap } from 'rxjs/operators';

import { SortDirection } from 'src/app/shared/directives/sortable.directive';

interface SearchResult {
  parlamentares: any[];
  total: number;
}

interface State {
  page: number;
  pageSize: number;
  searchTerm: string;
  sortColumn: string;
  sortDirection: SortDirection;
}

function compare(v1, v2) {
  return v1 < v2 ? -1 : v1 > v2 ? 1 : 0;
}

function sort(parlamentares: any[], column: string, direction: string): any[] {
  if (direction === '') {
    return parlamentares;
  } else {
    return [...parlamentares].sort((a, b) => {
      let res = compare(a[column], b[column]);
      if (column === 'nome_eleitoral') {
        // compara nome eleitoral sem acentos e pontuações
        res = compare(
          a[column].normalize('NFD').replace(/[\u0300-\u036f]/g, ""),
          b[column].normalize('NFD').replace(/[\u0300-\u036f]/g, ""));
      }
      return direction === 'asc' ? res : -res;
    });
  }
}

function matches(parlamentar: any, term: string, pipe: PipeTransform) {
  return parlamentar.nome_eleitoral.toLowerCase().includes(term.toLowerCase());
  // || pipe.transform(parlamentar.area).includes(term)
  // || pipe.transform(parlamentar.population).includes(term);
}

@Injectable({ providedIn: 'root' })
export class RuralistasAmbientalistasService {

  private _loading$ = new BehaviorSubject<boolean>(true);
  private _search$ = new Subject<void>();
  private _parlamentares$ = new BehaviorSubject<any[]>([]);
  private _total$ = new BehaviorSubject<number>(0);
  private PARLAMENTARES: any;

  private _state: State = {
    page: 1,
    pageSize: 25,
    searchTerm: '',
    sortColumn: '',
    sortDirection: ''
  };

  constructor(private pipe: DecimalPipe, private http: HttpClient) {
    this.getJson();
    this._search$.pipe(
      tap(() => this._loading$.next(true)),
      debounceTime(200),
      switchMap(() => this._search()),
      delay(200),
      tap(() => this._loading$.next(false))
    ).subscribe(result => {
      this._parlamentares$.next(result.parlamentares);
      this._total$.next(result.total);
    });

    // this._search$.next();
  }

  getJson() {
    return this.http.get('/data/deputados_relacionados_ao_agro_ambientalistas.json')
      .subscribe(p => {
        this.PARLAMENTARES = p;
        this._search$.next();
      });
  }

  get parlamentares$() { return this._parlamentares$.asObservable(); }
  get total$() { return this._total$.asObservable(); }
  get loading$() { return this._loading$.asObservable(); }
  get page() { return this._state.page; }
  get pageSize() { return this._state.pageSize; }
  get searchTerm() { return this._state.searchTerm; }

  set page(page: number) { this._set({ page }); }
  set pageSize(pageSize: number) { this._set({ pageSize }); }
  set searchTerm(searchTerm: string) { this._set({ searchTerm }); }
  set sortColumn(sortColumn: string) { this._set({ sortColumn }); }
  set sortDirection(sortDirection: SortDirection) { this._set({ sortDirection }); }

  private _set(patch: Partial<State>) {
    Object.assign(this._state, patch);
    this._search$.next();
  }

  private _search(): Observable<SearchResult> {
    const { sortColumn, sortDirection, pageSize, page, searchTerm } = this._state;

    // 1. sort
    let parlamentares = sort(this.PARLAMENTARES, sortColumn, sortDirection);

    // 2. filter
    parlamentares = parlamentares.filter(parlamentar => matches(parlamentar, searchTerm, this.pipe));
    const total = parlamentares.length;

    // 3. paginate
    parlamentares = parlamentares.slice((page - 1) * pageSize, (page - 1) * pageSize + pageSize);
    return of({ parlamentares, total });
  }
}
