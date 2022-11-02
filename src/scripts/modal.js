
const dinamicModalSmall = async (content) => {
    const body = document.querySelector('body');

    const backgroudContainer = document.createElement('section');
    backgroudContainer.classList.add('backgroundModal')

    const divModalContainer = document.createElement('div');
    divModalContainer.classList.add("modalContainerSmall");

    const closeModalButton = document.createElement('button');
    closeModalButton.classList = 'closeModal';
    closeModalButton.innerText = "X";

    backgroudContainer.addEventListener('click', (event) => {
        const {className} = event.target;
        if (className === "closeModal" || className === "backgroundModal"){
            backgroudContainer.remove();
        }
    });

    divModalContainer.append(closeModalButton, content);
    backgroudContainer.appendChild(divModalContainer);
    body.appendChild(backgroudContainer)
};


const dinamicModal = async (content) => {
    const body = document.querySelector('body');

    const backgroudContainer = document.createElement('section');
    backgroudContainer.classList.add('backgroundModal')

    const divModalContainer = document.createElement('div');
    divModalContainer.classList.add("modalContainer");

    const closeModalButton = document.createElement('button');
    closeModalButton.classList = 'closeModal';
    closeModalButton.innerText = "X";

    backgroudContainer.addEventListener('click', (event) => {
        const {className} = event.target;
        if (className === "closeModal" || className === "backgroundModal"){
            backgroudContainer.remove();
        }
    });

    divModalContainer.append(closeModalButton, content);
    backgroudContainer.appendChild(divModalContainer);
    body.appendChild(backgroudContainer)
};

const editProfileModal = async () => {
    const div = document.createElement('div');
    div.classList.add('modal_profile_edit');

    const h2 = document.createElement('h2');
    h2.classList.add('modal_profile_edit_title');
    h2.innerText = "Editar Perfil";

    const form = document.createElement('form');
    form.classList.add('modal_profile_edit_form');

    const inputUsername = document.createElement('input');
    inputUsername.classList.add('modal_edit_profile_username_input');
    inputUsername.setAttribute('type', 'text');
    inputUsername.setAttribute('name', 'username');
    inputUsername.setAttribute('id', 'username');
    inputUsername.setAttribute('placeholder', 'Seu nome');

    const inputEmail = document.createElement('input');
    inputEmail.classList.add('modal_edit_profile_email_input');
    inputEmail.setAttribute('type', 'email');
    inputEmail.setAttribute('name', 'email');
    inputEmail.setAttribute('id', 'email');
    inputEmail.setAttribute('placeholder', 'Seu e-mail');

    const inputPassword = document.createElement('input');
    inputPassword.classList.add('modal_edit_profile_password_input');
    inputPassword.setAttribute('type', 'password');
    inputPassword.setAttribute('name', 'password');
    inputPassword.setAttribute('id', 'password');
    inputPassword.setAttribute('placeholder', 'Sua senha');

    const button = document.createElement('button');
    button.classList.add('modal_edit_profile_button');
    button.innerText = "Editar Perfil";

    form.append(inputUsername, inputEmail, inputPassword, button);
    div.append(h2, form);

    return div;
}














export { dinamicModal, dinamicModalSmall, editProfileModal };