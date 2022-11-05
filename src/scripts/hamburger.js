const hamburgerMenu = async () => {
    const hamburgerButton = document.querySelector('#hamburger');
    const buttonsContainer = document.querySelector('.btns_header_containner');
    hamburgerButton.addEventListener('click', () => {
        hamburgerButton.classList.toggle('show_hamburger');
        hamburgerButton.classList.toggle('hide_hamburger');
        buttonsContainer.classList.toggle('show_menu');
        buttonsContainer.classList.toggle('hide_menu');
    })
};













export { hamburgerMenu };