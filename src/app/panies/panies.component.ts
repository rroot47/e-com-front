import { Component, OnInit } from '@angular/core';
import { PanieService } from './../services/panie.service';

@Component({
  selector: 'app-panies',
  templateUrl: './panies.component.html',
  styleUrls: ['./panies.component.css']
})
export class PaniesComponent implements OnInit {

  constructor(public panieService:PanieService) { }

  ngOnInit(): void {
  }

}
//composant tache principal : lire le donnée de l'interface, faire la validation, en suite faire appel au service pour le traitement