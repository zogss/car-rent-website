import 'bootstrap';
import Alpine from 'alpinejs';
import maskPlugin from '@alpinejs/mask';

import ShowPage from './pages/posts/show';
import IndexPage from './pages/rents/index';

import Navbar from './partials/navbar';

window.Alpine = Alpine;

Alpine.data('ShowPage', ShowPage);
Alpine.data('Navbar', Navbar);
Alpine.data('IndexPage', IndexPage);

Alpine.plugin(maskPlugin);

Alpine.start();
