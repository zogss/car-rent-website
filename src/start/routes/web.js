import { Router } from 'express';
import authController from '../../app/controllers/AuthController';
import postsController from '../../app/controllers/PostsController';
import usersController from '../../app/controllers/UsersControllers';
import rentController from '../../app/controllers/RentController';
import auth from '../../app/middlewares/auth';
import upload from '../../config/multer';

const routes = Router();

//* Initial route
routes.get('/api/status', (_, res) => {
  res.json({
    message: 'Hello World!',
  });
});
routes.get('/', (_, res) => {
  res.redirect('/posts');
});

//* Posts
routes.post('/posts', auth, upload.single('fileName'), postsController.store);
routes.get('/posts', auth, postsController.index);

routes.get('/posts/create', auth, postsController.create);

routes.put(
  '/posts/:id',
  auth,
  upload.single('fileName'),
  postsController.update,
);
routes.delete('/posts/:id', auth, postsController.destroy);
routes.get('/posts/:id', auth, postsController.show);

routes.get('/posts/:id/edit', auth, postsController.edit);

routes.post('/posts/rent/:id', auth, rentController.store);

routes.get('/posts/rent/create/:id', auth, rentController.create);

//* Rentals
routes.get('/rentals', auth, rentController.index);

routes.delete('/rentals/:id', auth, rentController.destroy);

//* Auth
routes.post('/login', authController.store);
routes.get('/login', authController.index);

routes.get('/register', usersController.create);

routes.post('/users', usersController.store);

routes.post('/logout', authController.logout);

//* Wildcard routes
routes.get('/*', (_, res) => {
  return res.redirect('/');
});

export default routes;
