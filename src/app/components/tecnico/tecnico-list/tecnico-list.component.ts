import { Tecnico } from './../../../models/Tecnico';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-tecnico-list',
  templateUrl: './tecnico-list.component.html',
  styleUrls: ['./tecnico-list.component.css']
})
export class TecnicoListComponent implements OnInit {

  ELEMENT_DATA: Tecnico[] = [
    {
      id: 1,
      email: "fernandes@email.com",
      senha: "123",
      nome: "Fernandes",
      cpf: "123.456.789-10",
      perfis: ["0"]
    },
    {
      id: 2,
      email: "geovanna@email.com",
      senha: "123",
      nome: "Geovanna Samara",
      cpf: "123.456.789-11",
      perfis: ["0"]
    } 
  ];
  displayedColumns: string[] = ['id', 'nome', 'email', 'cpf', 'acoes'];
  dataSource = new MatTableDataSource<Tecnico>(this.ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator: MatPaginator;
  constructor() { }

  ngOnInit(): void {
    this.dataSource.paginator = this.paginator;
  }

}


