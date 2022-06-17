import { ActivatedRoute, Router } from '@angular/router';
import { Cliente } from '../../../models/cliente';
import { ClienteService } from '../../../services/cliente.service';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-cliente-delete',
  templateUrl: './cliente-delete.component.html',
  styleUrls: ['./cliente-delete.component.css']
})
export class ClienteDeleteComponent implements OnInit {

  cliente: Cliente = {
    id: '',
    nome: '',
    cpf: '',
    email:  '',
    senha: '',
    perfis: [],
    dataCriacao: ''
  }

  constructor(
    private service: ClienteService,
    private toastr: ToastrService, 
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.findById(this.route.snapshot.paramMap.get("id"));
  }

  findById(id: any) {
    this.service.findById(id).subscribe(resposta => {
      this.cliente = resposta;
      this.cliente.perfis = [];
      this.cliente.dataCriacao = null;
      console.log(this.cliente);
    });
  }

  delete() {
    console.log(this.cliente)
    this.service.delete(this.cliente.id).subscribe(() => {
      this.toastr.show("Usuário deletado com sucesso.", "Delete");
      this.router.navigate(["clientes"]);
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
