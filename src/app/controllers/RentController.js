import Posts from '../models/Posts';
import Rent from '../models/Rent';
// import Users from "../models/Users";
// import schema from "../schemas/postSchema";

class RentController {
  async store(req, res) {
    //* armazenar dados do model no banco de dados
    await Rent.create({
      user: req.user._id,
      car: req.params.id,
      rentTime: 'tempo aleatorio',
      rentCar: 'retorno de carro',
      return: false,
    });

    return res.redirect('/rentals');
  }

  async index(req, res) {
    //* mostra os models
    const rents = (await Rent.find({ user: req.user._id }).populate('car')).map(
      (rent) => {
        rent.car.valuePerDay = Intl.NumberFormat('pt-BR', {
          style: 'currency',
          currency: 'BRL',
        }).format(Number(rent.car.valuePerDay) / 100);
        return rent;
      },
    );
    return res.render('rents/index', { rents });
  }

  // async show(req, res) {}

  // async update(req, res) {}

  async destroy(req, res) {
    try {
      const rentUser = await Rent.findOne({
        _id: req.params.id,
        user: req.user._id,
      });

      if (rentUser) {
        await rentUser.remove();
        req.flash('success_message', 'Aluguel removido com sucesso!');
        return res.redirect('/rentals');
      } else {
        req.flash(
          'error_message',
          'Erro ao remover o aluguel, tente novamente!',
        );
        return res.redirect('/rentals');
      }
    } catch (err) {
      req.flash('error_message', 'Erro ao remover o aluguel, tente novamente!');
      return res.redirect('/rentals');
    }
  }

  async create(req, res) {
    const post = await Posts.findById(req.params.id);
    return res.render('rents/create', { post });
  }

  // async edit(req, res) {}
}

export default new RentController();
