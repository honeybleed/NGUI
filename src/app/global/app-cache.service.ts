import { Injectable } from '@angular/core';
import { AppVersion } from '../app-common/model/AppVersion';

@Injectable()
export class AppCacheService {
  get userid(): string {
    return this._userid;
  }

  set userid(value: string) {
    this._userid = value;
  }
  get sessionid(): string {
    return this._sessionid;
  }

  set sessionid(value: string) {
    this._sessionid = value;
  }
  get username(): string {
    return this._username;
  }

  set username(value: string) {
    this._username = value;
  }
  get versionStr(): string {
    return this._versionStr;
  }

  set versionStr(value: string) {
    this._versionStr = value;
  }
  get version(): AppVersion {
    return this._version;
  }

  set version(value: AppVersion) {
    this._version = value;
  }
  private _version: AppVersion;
  private _versionStr: string;
  private _username: string;
  private _sessionid: string;
  private _userid: string;
  initVersion(version: AppVersion, versionStr: string): void {
    this._version = version;
    this._versionStr = versionStr;
  }
  constructor() { }

}
