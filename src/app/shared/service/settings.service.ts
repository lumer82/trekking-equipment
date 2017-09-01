import { Injectable } from '@angular/core';
import { Settings } from '../domain/settings';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class SettingsService {

  private settings: Settings = {budget: 500, weight: 10000};
  private _settings$: BehaviorSubject<Settings> = new BehaviorSubject(this.settings);

  settings$: Observable<Settings> = this._settings$.asObservable();

  updateSettings(settings: Settings): void {
    this.settings = {...this.settings, ...settings};
    console.log(this.settings);
    this._settings$.next(this.settings);
  }

}
