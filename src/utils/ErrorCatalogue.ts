class ErrorCatalogue {
  static list = {
    0: 'No se encontró el endpoint',
    1: 'Datos faltantes o inválidos',
    4: 'El correo o la contraseña no coinciden',
    6: 'El correo ya fue registrado con anterioridad',
  };

  static get(error: any): string {
    console.log(error);
    if ((ErrorCatalogue.list as any)[error.code])
      return (ErrorCatalogue.list as any)[error.code];
    return error.message;
  }
}

export default ErrorCatalogue;
