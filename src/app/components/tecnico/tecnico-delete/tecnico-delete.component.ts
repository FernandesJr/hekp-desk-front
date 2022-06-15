import { ActivatedRoute, Router } from '@angular/router';
import { Tecnico } from './../../../models/Tecnico';
import { TecnicoService } from './../../../services/tecnico.service';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-tecnico-delete',
  templateUrl: './tecnico-delete.component.html',
  styleUrls: ['./tecnico-delete.component.css']
})
export class TecnicoDeleteComponent implements OnInit {

  tecnico: Tecnico = {
    id: '',
    nome: '',
    cpf: '',
    email:  '',
    senha: '',
    perfis: [],
    dataCriacao: ''
  }

  constructor(
    private service: TecnicoService,
    private toastr: ToastrService, 
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.findById(this.route.snapshot.paramMap.get("id"));
  }

  findById(id: any) {
    this.service.findById(id).subscribe(resposta => {
      this.tecnico = resposta;
      this.tecnico.perfis = [];
      this.tecnico.dataCriacao = null;
      console.log(this.tecnico);
    });
  }

  delete() {
    console.log(this.tecnico)
    this.service.delete(this.tecnico.id).subscribe(() => {
      this.toastr.show("Usuário deletado com sucesso.", "Delete");
      this.router.navigate(["tecnicos"]);
    }, ex => {
      if(ex.error.error) {
        this.toastr.error(ex.error.message);
      }else {
        this.toastr.error(ex.error.errors[0].message);
      }
      console.log(ex);
    });
  }

}
