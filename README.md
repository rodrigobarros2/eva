# Backend - API de Jornadas para Colaboradores

## Visão Geral
Este projeto implementa uma API REST para a Eva, permitindo a associação de jornadas a colaboradores e a execução automática de ações definidas dentro dessas jornadas. As ações são processadas por um job em background utilizando BullJS.

## Tecnologias Utilizadas
- **Node.js** com **Express** para criação da API
- **MongoDB** para armazenamento de dados
- **Joi** para validação de schemas
- **BullJS** para gerenciamento de jobs em background
- **Vitest** para testes unitários

## Instalação e Configuração
### 1. Clonar o repositório
```sh
git clone https://github.com/seu-usuario/eva-back-end.git
cd eva-back-end
```

### 2. Instalar as dependências
```sh
npm install
```

### 3. Configurar variáveis de ambiente
Crie um arquivo `.env` na raiz do projeto com base no `.env.example`.
```env
PORT="3333"

MONGODB_URI="mongodb+srv://rodrigodev:WZDWX7pRbG9wlh7g@evacluster.rjxzp.mongodb.net/?retryWrites=true&w=majority&appName=EvaCluster"

# redis
REDIS_HOST="redis-19381.c262.us-east-1-3.ec2.redns.redis-cloud.com"
REDIS_PORT="19381"
REDIS_PASSWORD="EE00y7UxE9UvyLXtbWJO3XZoXzGzU3df"
```

### 4. Executar o projeto
Inicie a API localmente com:
```sh
npm run dev
```
A API estará disponível em `http://localhost:3333`.

### 5. Executar os testes
```sh
npm run test
```

## Endpoints Principais
### **1. Criar um colaborador**
**POST** `http://localhost:3333/api/v1/collaborators`
```json
{
    "name": "Rodrigo",
    "email": "rodrigobarros110@hotmail.com.com",
    "phone": "89981391733"
}
```

### **2. Criar uma jornada**
**POST** `http://localhost:3333/api/v1/journeys`
```json
{
    "name": "Jornada de Onboarding",
    "description": "Jornada para novos colaboradores",
    "actions": [
        {
            "type": "email",
            "config": {
                "template": "welcome-email"
            },
            "order": 1
        },
        {
            "type": "whatsapp",
            "config": {
                "template": "welcome-whatsapp"
            },
            "order": 2
        }
    ]
}
```

### **3. Executar uma jornada**
**POST** `http://localhost:3333/api/v1/journey-executions`
```json
{
    "journeyId": "67b1123674f4d8d5b7074e55",
    "collaboratorId": "67b1121874f4d8d5b7074e53",
    "startDate": "2025-02-15T21:35:55"
}
```

## Considerações Finais
Este projeto foi desenvolvido utilizando conceitos de **arquitetura hexagonal** e **programação funcional**, garantindo escalabilidade e modularidade. Em caso de dúvidas, entre em contato!

Eu utilizaria o Nodemailer para implementar a lógica de envio de e-mails e a API nativa do WhatsApp para disparo das mensagens aqui.
![image](https://github.com/user-attachments/assets/5907cd62-a7eb-4d11-9987-f902a01f908f)



