/* eslint-disable no-unused-vars */
import StandardError from '../errors/standardError.js';
import NotFound from '../errors/notFound.js';
import AlreadyExist from '../errors/alreadyExist.js';
import Unauthorized from '../errors/unauthorized.js';


function errorHandler(error, req, res, next) {
    // Verifica se o erro é do tipo NotFound e envia uma resposta de não encontrado
    if (error instanceof NotFound) {
        new NotFound(error.message).sendReply(res);
    } 
    // Verifica se o erro é do tipo AlreadyExist e envia uma resposta de recurso já existente
    else if (error instanceof AlreadyExist) {
        new AlreadyExist(error.message).sendReply(res);
    } 
    // Verifica se o erro é do tipo Unauthorized e envia uma resposta de não autorizado
    else if  (error instanceof Unauthorized) {
        new Unauthorized(error.message).sendReply(res);
    } 
    // Se o erro não se encaixar em nenhum dos tipos específicos, loga a mensagem de erro e envia uma resposta padrão
    else {
        console.log(error.message);
        new StandardError().sendReply(res);
    }
}

export default errorHandler;
