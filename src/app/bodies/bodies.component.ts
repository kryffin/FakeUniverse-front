import { Component, OnInit } from '@angular/core';
import {Body} from '../shared/interfaces/body.interface';
import {Router} from '@angular/router';
import {BodyService} from '../shared/services/body.service';

@Component({
  selector: 'app-bodies',
  templateUrl: './bodies.component.html',
  styleUrls: ['./bodies.component.css']
})
export class BodiesComponent implements OnInit {

  private _bodies: Body[];
  displayedColumns: string[] = ['position', 'name', 'radius', 'distanceFromOrigin', 'gravity', 'delete'];

  constructor(private _router: Router, private _bodyService: BodyService) {
    this._bodies = [];
  }

  get bodies(): Body[] {
    return this._bodies;
  }

  delete(body: Body): void {
    this._bodyService
      .delete(body.name)
      .subscribe(_ => this._bodies = this._bodies.filter(__ => __.name !== _));
  }

  ngOnInit(): void {
    this._bodyService
      .fetch().subscribe((bodies: Body[]) => this._bodies = bodies);
  }

}
