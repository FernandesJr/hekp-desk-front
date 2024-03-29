import { ToastrService } from 'ngx-toastr';
import { AuthService } from './../../services/auth.service';
import { Router, Routes } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  
  constructor(private router: Router,
     private authService: AuthService, 
     private toastr: ToastrService) { }

  ngOnInit(): void {
    this.router.navigate(["home"]);
  }

  logout() {
    this.router.navigate(["login"]);
    this.authService.logout();
    this.toastr.info("Logout realizado com sucesso.", "Logout", {timeOut: 7000});
  }

}
