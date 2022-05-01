'use strict'

const Produto = use('App/Models/Produto');

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with produtos
 */
class ProdutoController {
  /**
   * Show a list of all produtos.
   * GET produtos
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ request, response, view }) {
    const produtos = await Produto.query().select('titulo', 'autor', 'preco', 'id').orderBy('titulo', 'asc').fetch();

    return produtos;
  }

  /**
   * Create/save a new produto.
   * POST produtos
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response }) {
    const data = request.all();
    const novoProduto = await Produto.create({...data});

    return response.status(201).json({message: "Produto registrado com sucesso."});
  }

  /**
   * Display a single produto.
   * GET produtos/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, request, response, view }) {
    const detalharProduto = await Produto.query().where('id', params.id).first();

    if (!detalharProduto) {
      return response.status(404).json({message: "Produto não encontrado."});
    };

    return detalharProduto;
  }

  /**
   * Update produto details.
   * PUT or PATCH produtos/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {
    const {autor, editora, titulo, ano_publicacao, preco} = request.all();

    const produto = await Produto.query().where('id', params.id).first();

    if (!produto) {
      return response.status(404).json({message: "Produto não encontrado."});
    };

    const atualizarProduto = await Produto.query().where('id', params.id).update({
      autor,
      editora,
      titulo,
      ano_publicacao,
      preco
    });

    return response.status(200).json({message: "Produto atualizado com sucesso."});    
  }

  /**
   * Delete a produto with id.
   * DELETE produtos/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response }) {
    const deletarProduto = await Produto.findBy('id', params.id);

    if (!deletarProduto) {
      return response.status(404).json({message: "Produto não encontrado."});
    };

    await deletarProduto.delete();

    return response.status(200).json({message: "Produto excluído do banco de dados."});
  }
}

module.exports = ProdutoController
