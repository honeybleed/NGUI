export interface ValidateHandlerInterface {
  valid(value: any): {ret: boolean, msg: string};
}

