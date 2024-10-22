import ErroBase from './ErroBase.js';

class NotFound extends ErroBase{
  constructor(){
    super('Pagina n encontrada!', 404);
  }
}

export default NotFound;