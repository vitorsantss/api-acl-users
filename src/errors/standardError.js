// Classe base para representar erros padronizados no servidor, estendendo a classe nativa Error
class StandardError extends Error {
    // Construtor que aceita uma mensagem padrão e um código de status padrão (500 Internal Server Error)
    constructor(message = 'Erro interno no servidor', status = 500) {
        super(message);
        // Configura as propriedades da instância com a mensagem e o código de status fornecidos
        this.message = message;
        this.status = status;
    }

    // Método para enviar uma resposta HTTP com a mensagem de erro e código de status
    sendReply(res) {
        res.status(this.status).json({
            message: this.message,
            status: this.status
        });
    }
}

export default StandardError;
