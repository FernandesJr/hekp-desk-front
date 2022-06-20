import { ActivatedRoute, Router } from '@angular/router';
import { ClienteService } from '../../../services/cliente.service';
import { FormControl, Validators } from '@angular/forms'
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Cliente } from 'src/app/models/Cliente';

@Component({
  selector: 'app-cliente-update',
  templateUrl: './cliente-update.component.html',
  styleUrls: ['./cliente-update.component.css']
})
export class ClienteUpdateComponent implements OnInit {

  nome = new FormControl(null, Validators.minLength(3));
  cpf = new FormControl(null, Validators.required);
  email = new FormControl(null, Validators.email);
  senha = new FormControl(null, Validators.minLength(3));
  //senha2 = new UntypedFormControl(null, Validators.minLength(3));

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

  update() {
    console.log(this.cliente)
    this.service.update(this.cliente).subscribe(() => {
      this.toastr.success("Usuário atualizado com sucesso.", "Update");
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

  addPerfil(perfil: any) {
    if(this.cliente.perfis.includes(perfil)){
      this.cliente.perfis.splice(this.cliente.perfis.indexOf(perfil), 1);
    }else {
      this.cliente.perfis.push(perfil);
    }
  }

  validar(): boolean {
    return this.nome.valid && this.cpf.valid && 
      this.email.valid && this.senha.valid ;
  }

}
