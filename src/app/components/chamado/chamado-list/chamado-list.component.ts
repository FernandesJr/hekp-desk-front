import { ChamadoService } from './../../../services/chamado.service';
import { Chamado } from './../../../models/chamado';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-chamado-list',
  templateUrl: './chamado-list.component.html',
  styleUrls: ['./chamado-list.component.css']
})
export class ChamadoListComponent implements OnInit {

  ELEMENT_DATA: Chamado[] = [];
  FILTERED_DATA: Chamado[] = [];
  displayedColumns: string[] = ['id', 'titulo', 'nomeCliente', 'nomeTecnico', 'dataAbertura', 'dataFechamento', 'prioridade', 'status', 'acoes'];
  dataSource: any;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private service: ChamadoService) { }

  ngOnInit(): void {
    this.findAll();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  findAll(): void {
    this.service.findAll().subscribe(response => {
     this.ELEMENT_DATA = response;
     this.dataSource = new MatTableDataSource<Chamado>(this.ELEMENT_DATA);
     this.dataSource.paginator = this.paginator;
    });
  }

  prioridadeDesc(cod: any): string {
    if(cod == "0"){
      return "BAIXA";
    } else if(cod == "1"){
      return "MÉDIA";
    } else {
      return "ALTA";
    }
  }

  statusDesc(cod: any): string {
    if(cod == "0"){
      return "ABERTO";
    } else if(cod == "1"){
      return "EM ANDAMENTO";
    } else {
      return "FECHADO";
    }
  }

  orderByStatus(cod: any): void {
    this.FILTERED_DATA = [];
    this.ELEMENT_DATA.forEach(e => {
      if(e.status == cod){
        this.FILTERED_DATA.push(e);
      }
    });
    this.dataSource = new MatTableDataSource<Chamado>(this.FILTERED_DATA);
    this.dataSource.paginator = this.paginator;
  }

}
