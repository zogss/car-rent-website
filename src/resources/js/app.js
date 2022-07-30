import "bootstrap";
import Alpine from "alpinejs";
import mask from "@alpinejs/mask";
import ShowPage from "./pages/posts/show";
import Navbar from "./partials/navbar";
import IndexPage from "./pages/rents/index"

window.Alpine = Alpine;

Alpine.data("ShowPage", ShowPage);
Alpine.data("Navbar", Navbar);
Alpine.data("IndexPage", IndexPage)

Alpine.plugin(mask);

Alpine.start();
