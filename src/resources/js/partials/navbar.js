const Navbar = () => ({
  menuToggle() {
    const toggleMenu = this.$refs.menu;
    toggleMenu.classList.toggle("active");
  },
});
export default Navbar;
