const mix = require('laravel-mix');
mix.js('src/resources/js/app.js', 'src/public/js/app.js');
mix.css('src/resources/css/app.css', 'src/public/css/app.css');
mix.copy('src/resources/img', 'src/public/img');