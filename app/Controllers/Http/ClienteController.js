'use strict'

const Cliente = use('App/Models/Cliente');
const Endereco = use('App/Models/Endereco');
const Telefone = use('App/Models/Telefone');

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with clientes
 */
class ClienteController {
  /**
   * Show a list of all clientes.
   * GET clientes
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ request, response, view }) {
    const clientes = await Cliente.query().orderBy('id', 'asc').fetch();
    
    return clientes;
  }

  /**
   * Create/save a new cliente.
   * POST clientes
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response }) {
    const { nome, cpf, email, celular, residencial, rua, numero, bairro, complemento, cep, cidade, estado, pais } = request.all();

    const encontrarCpf = await Cliente.findBy('cpf', cpf);

    if (encontrarCpf) {
      return response.status(400).json({message: "Cliente já cadastrado."});
    };

    const novoCliente = await Cliente.create({
      nome,
      cpf,
      email
    });

    const telefone = await Telefone.create({
      celular,
      residencial,
      cliente_cpf: cpf
    });

    const endereco = await Endereco.create({
      rua,
      numero,
      bairro,
      complemento,
      cep,
      cidade,
      estado,
      pais,
      cliente_cpf: cpf
    });

    return response.status(201).json({message: "Cliente registrado com sucesso."});
  }

  /**
   * Display a single cliente.
   * GET clientes/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, request, response, view }) {

    const encontrarCliente = await Cliente.findBy('id', params.id);

    if (!encontrarCliente) {
      return response.status(400).json({message: "Cliente não encontrado."});
    };

    const cliente = await Cliente.query().with('vendas', (item) => {
      item.orderBy('data_venda', 'asc').fetch()
    }).where('id', params.id).first();

    return cliente;
  }

  /**
   * Update cliente details.
   * PUT or PATCH clientes/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {
    const {nome, cpf, email} = request.all();

    if (!nome || !cpf || !email) {
      return response.status(400).json({message: "Os campos nome, cpf e email são obrigatórios."});
    };

    const encontrarCliente = await Cliente.findBy('id', params.id);

    if (!encontrarCliente) {
      return response.status(400).json({message: "Cliente não encontrado."});
    };

    const atualizarCliente = await Cliente.query().where('id', params.id).update({
      nome: nome,
      cpf: cpf,
      email: email
    });

    return response.status(200).json({message: "Cliente atualizado com sucesso."});

  }

  /**
   * Delete a cliente with id.
   * DELETE clientes/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response }) {
    const encontrarCliente = await Cliente.findBy('id', params.id);

    if (!encontrarCliente) {
      return response.status(400).json({message: "Cliente não encontrado."});
    };

    await encontrarCliente.delete();

    return response.status(200).json({message: "Cliente excluído do banco de dados."});
  }
}

module.exports = ClienteController
