export class ErrorInvalidPasswordOrUser extends Error {
  constructor() {
    super('ERROR: Usuario o contraseña invalida');
    Object.setPrototypeOf(this, ErrorInvalidPasswordOrUser.prototype);
  }
}

export class ErrorConectServer extends Error {
  constructor() {
    super(
      'ERROR: No es posible conectar con el servidor. Intente nuevamente más tarde'
    );
    Object.setPrototypeOf(this, ErrorInvalidPasswordOrUser.prototype);
  }
}
