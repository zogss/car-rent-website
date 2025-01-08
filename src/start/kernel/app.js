import express from 'express';
import { engine } from 'express-handlebars';
import path from 'path';
import fs from 'fs';
import morgan from 'morgan';
import { allowInsecurePrototypeAccess } from '@handlebars/allow-prototype-access';
import Handlebars from 'handlebars';
import methodOverride from 'method-override';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import flash from 'connect-flash';
import passport from 'passport';

import viewHelpers from './view-helpers';
import sessionConfig from '../../config/session';
import passportProvider from '../../providers/PassportProvider';
import mongoProvider from '../../providers/MongoProvider';
import web from '../routes/web';

class App {
  app;

  viewsPath = path.resolve(__dirname, '..', '..', 'resources', 'views');
  publicPath = path.resolve(__dirname, '..', '..', 'public');
  filesPath = path.resolve(__dirname, '..', '..', '..', 'tmp', 'uploads');

  constructor() {
    this.app = express();
    this.prestart();
    this.middlewares();
    this.routes();
    this.registerProviders();
  }

  prestart() {
    if (
      process.env.STORAGE_TYPE === 'local' &&
      !fs.existsSync(this.filesPath)
    ) {
      fs.mkdirSync(this.filesPath, { recursive: true });
    }
  }

  middlewares() {
    this.app.engine(
      'hbs',
      engine({
        extname: '.hbs',
        helpers: viewHelpers,
        handlebars: allowInsecurePrototypeAccess(Handlebars),
      }),
    );
    this.app.use('/public', express.static(this.publicPath));
    this.app.use('/files', express.static(this.filesPath));
    this.app.set('view engine', 'hbs');
    this.app.set('views', this.viewsPath);
    this.app.use(cookieParser());
    this.app.use(session(sessionConfig));
    this.app.use(passport.authenticate('session'));
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(methodOverride('_method'));
    this.app.use(morgan('dev'));
    this.app.use(flash());
    this.app.use((req, res, next) => {
      res.locals.error_message = req.flash('error_message');
      res.locals.success_message = req.flash('success_message');
      res.locals.user = req.user || null;
      next();
    });
  }

  routes() {
    this.app.use('/', web);
  }

  registerProviders() {
    mongoProvider.boot();
    passportProvider.boot();
  }
}

export default new App();
