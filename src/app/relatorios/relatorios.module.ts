import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AgGridModule } from '@ag-grid-community/angular';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { RelatoriosListarComponent } from './relatorios-listar/relatorios-listar.component';
import { RelatoriosRoutingModule } from './relatorios-routing.module';
import { SociosEmpresasCampanhaComponent } from './socios-empresas-campanha/socios-empresas-campanha.component';

@NgModule({
  declarations: [
    RelatoriosListarComponent,
    SociosEmpresasCampanhaComponent
  ],
  imports: [
    CommonModule,
    AgGridModule.withComponents([]),
    NgbModule,
    RelatoriosRoutingModule
  ]
})
export class RelatoriosModule { }
