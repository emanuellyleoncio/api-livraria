# Livraria Bemobile

## Descrição do projeto

Este projeto consiste na criação de uma API de uma livraria utilizando o AdonisJs e MySQL.

## Tabela de conteúdos

- [Descrição do Projeto](#descrição-do-projeto)
- [Tabela de Conteúdo](#tabela-de-conteúdo)
- [Status](#status)
- [Instalação](#instalação)
	- [Pré-requisitos](#pré-requisitos)
	- [Instalação](#instalação)
- [Como usar](#como-usar)
- [Dificuldades encontradas](#dificuldades-encontradas)
- [Tecnologias](#tecnologias)
- [Autora](#autora)

## Status

Projeto finalizado :heavy_check_mark:

## Instalação

### Pré-requisitos

Antes de começar, você vai precisar ter instalado em sua máquina as seguintes ferramentas: [Node.js](https://nodejs.org/en/), editor de código como [VSCode](https://code.visualstudio.com/), banco de dados [MySQL](https://www.mysql.com/) e um programa para testar de API como o [Insomnia](https://insomnia.rest/download).

### Instalação

```bash
# Clone este repositório
$ git clone <https://github.com/emanuellyleoncio/api-livraria>

# Instale as dependências
$ npm install

# Execute as migrations
$ adonis migration:run

# Execute o servidor
$ adonis serve --dev

# Realize os testes utilizando o Insomnia

```
## Como usar

Esta API permite as seguintes funcionalidades:

-   Cadastrar um usuário do sistema
-   Logar com usuário cadastrado
-   Listar, detalhar, adicionar, editar e excluir clientes
-   Listar, detalhar, adicionar, editar e excluir produtos
-   Registrar venda de um produto a um cliente

Crie um banco de dados no MySQL. No arquivo **.env** altere as linhas de USER, PASSWORD e DATABASE conforme o seu banco de dados.

```bash
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_USER=
DB_PASSWORD=
DB_DATABASE=
HASH_DRIVER=bcrypt

```

Para os testes no Insomnia, utiliza-se a seguinte porta: **http://127.0.0.1:3333**

### 1 - Criar usuário

#### `POST` `/register`

Esse endpoint cria um usuário.

O corpo (body) deverá possuir um objeto com as seguintes propriedades (respeitando estes nomes):

    -   username
    -   email
    -   password

#### Exemplo de requisição efetuada:

![criar usuario](https://github.com/emanuellyleoncio/api-livraria/blob/main/public/readme_images/criar-usuario.PNG)

### 2 - Autenticação

#### `POST` `/authenticate`

Esse endpoint autentica um usuário do sistema gerando um token.

O corpo (body) deverá possuir um objeto com as seguintes propriedades (respeitando estes nomes):

    -   email
    -   password

#### Exemplo de requisição efetuada:

![autenticar](https://github.com/emanuellyleoncio/api-livraria/blob/main/public/readme_images/autenticacao.PNG)

### 3 - Login usuário

Os endpoints de Clientes, Produtos e Vendas são acessadas somente com usuário autenticado. Para isso, o token gerado na rota anterior (**'/authenticate'**) deve ser inserido como Bearer Token em todas as rotas apresentadas a seguir.

#### Exemplo:

![token](https://github.com/emanuellyleoncio/api-livraria/blob/main/public/readme_images/token.PNG)

### 4 - Cadastro de cliente

#### `POST` `/clientes`

Esse endpoint cadastra um novo cliente no sistema.

O corpo (body) deverá possuir um objeto com as seguintes propriedades (respeitando estes nomes):

    -   nome
    -   cpf
    -   email
    -   celular
    -   residencial*
    -   rua
    -   numero
    -   bairro
    -   complemento*
    -   cep
    -   estado
    -   pais*

*item não obrigatório

#### Exemplo de requisição efetuada:

![cadastrar](https://github.com/emanuellyleoncio/api-livraria/blob/main/public/readme_images/cad-cliente.PNG)

Caso o cpf informado no body da requisição já exista no banco de dados, a seguinte mensagem será exibida:

```bash
{
	"message": "Cliente já cadastrado."
}
```

### 5 - Listar clientes

#### `GET` `/clientes`

Esse endpoint lista todos os clientes cadastrados no sistema.


#### Exemplo de requisição efetuada:

![listar](https://github.com/emanuellyleoncio/api-livraria/blob/main/public/readme_images/listar-cliente.PNG)

### 6 - Detalhar cliente

#### `GET` `/clientes/:id`

Esse endpoint traz detalhes do cliente cadastrado, a partir do id informado.

#### Exemplo de requisição efetuada:

![detalhar](https://github.com/emanuellyleoncio/api-livraria/blob/main/public/readme_images/det-cliente.PNG)

Caso o id não exista no banco de dados, a seguinte mensagem será exibida:

```bash
{
	"message": "Cliente não encontrado."
}
```

### 7 - Editar cliente

#### `PUT` `/clientes/:id`

Esse endpoint edita um cadastro de cliente a partir do id informado na rota.

O corpo (body) deverá possuir um objeto com as seguintes propriedades (respeitando estes nomes):

    -   nome
    -   cpf
    -   email

#### Exemplo de requisição efetuada:

![editar](https://github.com/emanuellyleoncio/api-livraria/blob/main/public/readme_images/edit-cliente.PNG)

Caso o id não exista no banco de dados, a seguinte mensagem será exibida:

```bash
{
	"message": "Cliente não encontrado."
}
```

### 8 - Deletar cliente

#### `DELETE` `/clientes/:id`

Esse endpoint exclui um cliente cadastrado a partir do id informado.


#### Exemplo de requisição efetuada:

![deletar](https://github.com/emanuellyleoncio/api-livraria/blob/main/public/readme_images/del-cliente.PNG)

Caso o id não exista no banco de dados, a seguinte mensagem será exibida:

```bash
{
	"message": "Cliente não encontrado."
}
```
### 9 - Cadastro de produto

#### `POST` `/produtos`

Esse endpoint cadastra um novo produto no sistema.

O corpo (body) deverá possuir um objeto com as seguintes propriedades (respeitando estes nomes):

    -   autor
    -   editora
    -   titulo
    -   ano_publicacao
    -   preco

#### Exemplo de requisição efetuada:

![cadastrar](https://github.com/emanuellyleoncio/api-livraria/blob/main/public/readme_images/cad-produto.PNG)


### 10 - Listar produtos

#### `GET` `/produtos`

Esse endpoint lista todos os produtos cadastrados no sistema em ordem alfabética.


#### Exemplo de requisição efetuada:

![listar](https://github.com/emanuellyleoncio/api-livraria/blob/main/public/readme_images/listar-produto.PNG)

### 11 - Detalhar produto

#### `GET` `/produtos/:id`

Esse endpoint traz detalhes do cliente cadastrado, a partir do id informado.

#### Exemplo de requisição efetuada:

![detalhar](https://github.com/emanuellyleoncio/api-livraria/blob/main/public/readme_images/det-produto.PNG)

Caso o id não exista no banco de dados, a seguinte mensagem será exibida:

```bash
{
	"message": "Produto não encontrado."
}
```

### 12 - Editar produto

#### `PUT` `/produtos/:id`

Esse endpoint edita um cadastro de produtoe a partir do id informado na rota.

O corpo (body) deverá possuir um objeto com as seguintes propriedades (respeitando estes nomes):

    -   autor
    -   editora
    -   titulo
    -   ano_publicacao
    -   preco

#### Exemplo de requisição efetuada:

![editar](https://github.com/emanuellyleoncio/api-livraria/blob/main/public/readme_images/edit-produto.PNG)

Caso o id não exista no banco de dados, a seguinte mensagem será exibida:

```bash
{
	"message": "Produto não encontrado."
}
```

### 13 - Deletar produto

#### `DELETE` `/produtos/:id`

Esse endpoint exclui um produto cadastrado a partir do id informado.


#### Exemplo de requisição efetuada:

![deletar](https://github.com/emanuellyleoncio/api-livraria/blob/main/public/readme_images/del-produto.PNG)

Caso o id não exista no banco de dados, a seguinte mensagem será exibida:

```bash
{
	"message": "Produto não encontrado."
}
```

### 14 - Cadastrar venda

#### `POST` `/vendas`

Esse endpoint registra uma venda de um produto a um cliente no sistema.

O corpo (body) deverá possuir um objeto com as seguintes propriedades (respeitando estes nomes):

    -   cliente_id
    -   produto_id
    -   quantidade


#### Exemplo de requisição efetuada:

![vender](https://github.com/emanuellyleoncio/api-livraria/blob/main/public/readme_images/venda.PNG)

## Dificuldades encontradas

Encontrei dificuldades para transformar a data e hora da venda de produto de timestamp para datetime (AAAA-MM-DD hh:mm:ss). Apesar da rota "Detalhar cliente" estar com as vendas ordenadas a partir da mais recente, o campo data_venda em timestamp dificulta um pouco esta percepção.
Não foi possível implementar a filtragem das vendas por mês + ano. Acredito que um caminho provável seria utilizar mês e ano como query da rota.

## Tecnologias

As seguintes ferramentas foram usadas na construção do projeto:

- [Node.js](https://nodejs.org/en/)
- [AdonisJs](https://adonisjs.com/)
- [MySQL](https://www.mysql.com/)

## Autora

Projeto desenvolvido por Emanuelly Leoncio.

Entre em contato!

<div> 
  <a href = "mailto:manuleoncio01@gmail.com"><img src="https://img.shields.io/badge/Gmail-D14836?style=for-the-badge&logo=gmail&logoColor=white" target="_blank"></a>
  <a href="https://www.linkedin.com/in/emanuellyleoncio/" target="_blank"><img src="https://img.shields.io/badge/-LinkedIn-%230077B5?style=for-the-badge&logo=linkedin&logoColor=white" target="_blank"></a>
</div>
