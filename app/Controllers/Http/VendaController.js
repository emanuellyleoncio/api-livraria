'use strict'

const Venda = use('App/Models/Venda');
const Produto = use('App/Models/Produto');

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with vendas
 */
class VendaController {
  /**
   * Show a list of all vendas.
   * GET vendas
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ request, response, view }) {

  }

  /**
   * Render a form to be used for creating a new venda.
   * GET vendas/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async create ({ request, response, view }) {
  }

  /**
   * Create/save a new venda.
   * POST vendas
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response, auth }) {
    const {cliente_id, produto_id, quantidade} = request.all();
    const valor = await Produto.query().column('preco').where('id', produto_id).first();
    const venda = await Venda.create({
      cliente_id,
      produto_id,
      quantidade,
      preco_unitario: valor.preco,
      preco_total: valor.preco * quantidade,
      usuario_id: auth.user.id,
    });

    return response.json({message: "Venda registrada com sucesso."})
  }

  /**
   * Display a single venda.
   * GET vendas/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, request, response, view }) {
  }

  /**
   * Render a form to update an existing venda.
   * GET vendas/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit ({ params, request, response, view }) {
  }

  /**
   * Update venda details.
   * PUT or PATCH vendas/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {
  }

  /**
   * Delete a venda with id.
   * DELETE vendas/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response }) {
  }
}

module.exports = VendaController
