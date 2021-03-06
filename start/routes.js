'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')


Route.post('/register', 'AuthenticationController.register');
Route.post('/authenticate', 'AuthenticationController.authenticate');

Route.group(() => {
    Route.resource('clientes', 'ClienteController').apiOnly();
}).middleware(['auth']);

Route.group(() => {
    Route.resource('produtos', 'ProdutoController').apiOnly();
}).middleware(['auth']);

Route.group(() => {
    Route.resource('/vendas', 'VendaController').apiOnly();
}).middleware(['auth']);

