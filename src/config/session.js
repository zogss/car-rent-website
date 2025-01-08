export default {
  secret: process.env.SESSION_SECRET || 'session-secret',
  resave: true,
  saveUninitialized: true,
};
