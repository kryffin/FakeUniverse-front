import {Component, EventEmitter, OnChanges, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Body} from '../interfaces/body.interface';
import {BodyService} from '../services/body.service';
import {Router} from '@angular/router';
import {HttpErrorResponse} from '@angular/common/http';

@Component({
  selector: 'app-form-edit',
  templateUrl: './form-create.component.html',
  styleUrls: ['./form-create.component.css']
})
export class FormCreateComponent implements OnInit, OnChanges {

  private readonly _form: FormGroup;
  private _model: Body;

  constructor(private _bodyService: BodyService, private _router: Router) {
    this._form = this._buildForm();
  }

  get form(): FormGroup {
    return this._form;
  }

  submit(body: Body): void {
    this._bodyService.create(body)
      .subscribe(
        (data) => {
          this._router.navigate(['/Bodies']);
        },
        (error: HttpErrorResponse) => {
          console.log(error);
        }
      );
  }

  cancel(): void {
    this._router.navigate(['/Bodies']);
  }

  ngOnChanges(record) {
    this._model = {
      name: '',
      radius: 0.0,
      distanceFromOrigin: 0.0,
      gravity: 0.0
    };

    this._form.patchValue(this._model);
  }

  private _buildForm(): FormGroup {
    return new FormGroup({
      name: new FormControl('', Validators.compose([
        Validators.required, Validators.minLength(2)
      ])),
      radius: new FormControl(0.0, Validators.compose([
        Validators.min(0.0), Validators.required
      ])),
      distanceFromOrigin: new FormControl(0.0, Validators.compose([
        Validators.min(0.0), Validators.required
      ])),
      gravity: new FormControl(0.0, Validators.compose([
        Validators.min(0.0), Validators.required
      ])),
    });
  }

  ngOnInit(): void {
  }

}
