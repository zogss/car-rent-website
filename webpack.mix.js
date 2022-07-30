const mix = require('laravel-mix');
mix.js('src/resources/js/app.js', 'src/public/js/app.js');
mix.sass('src/resources/scss/app.scss', 'src/public/css/app.css');
mix.copy('src/resources/img', 'src/public/img');