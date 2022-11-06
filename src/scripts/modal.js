import { getAllCompanies, usersOutOfWork, getAllUsers } from "./requests.js";

import { createCompanyToAdmimSelect, createUserToManageDepartmentSelect, createUsersHiredByDepartment } from "./renders.js";

import { eventHireUser } from "../pages/dashboards/adminDashboard/index.js";

const dinamicModalSmall = async (content) => {
    const body = document.querySelector('body');

    const backgroudContainer = document.createElement('section');
    backgroudContainer.classList.add('backgroundModal')

    const divModalContainer = document.createElement('div');
    divModalContainer.classList.add("modalContainerSmall");

    const closeModalButton = document.createElement('button');
    closeModalButton.classList = 'closeModal';
    closeModalButton.innerText = "";

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
    closeModalButton.innerText = "";

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

const dinamicModalBig = async (content) => {
    const body = document.querySelector('body');

    const backgroudContainer = document.createElement('section');
    backgroudContainer.classList.add('backgroundModal')

    const divModalContainer = document.createElement('div');
    divModalContainer.classList.add("modalContainerBig");

    const closeModalButton = document.createElement('button');
    closeModalButton.classList = 'closeModal';
    closeModalButton.innerText = "";

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

const editProfileModal = async (user) => {
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

const userEditModal = async (user) => {
    const div = document.createElement('div');
    div.classList.add('modal_user_edit');

    const h2 = document.createElement('h2');
    h2.classList.add('modal_user_edit_title');
    h2.innerText = `Editar ${user.username}`;

    const form = document.createElement('form');
    form.classList.add('modal_user_edit_form');

    const selectKindOfWork = document.createElement('select');
    selectKindOfWork.setAttribute('required', true);
    selectKindOfWork.setAttribute('name', "modal_user_edit_select_kind_of_work");
    selectKindOfWork.setAttribute('id', "kind_of_work");

    const optionSelectKind = document.createElement('option');
    optionSelectKind.setAttribute('value', "");
    optionSelectKind.innerText = "Selecionar modalidade de trabalho";

    const optionHomeOffice = document.createElement('option');
    optionHomeOffice.setAttribute('value', "home office");
    optionHomeOffice.innerText = "Home Office";

    const optionHybrid = document.createElement('option');
    optionHybrid.setAttribute('value', "hibrido");
    optionHybrid.innerText = "Híbrido";

    const optionPresential = document.createElement('option');
    optionPresential.setAttribute('value', "presencial");
    optionPresential.innerText = "Presencial";

    const selectProfissionalLevel = document.createElement('select');
    selectProfissionalLevel.setAttribute('required', true);
    selectProfissionalLevel.setAttribute('name', "modal_user_edit_select_profissional_level");
    selectProfissionalLevel.setAttribute('id', "professional_level");

    const optionSelectLevel = document.createElement('option');
    optionSelectLevel.setAttribute('value', "");
    optionSelectLevel.innerText = "Selecionar nível profissional";

    const optionInternship = document.createElement('option');
    optionInternship.setAttribute('value', "estágio");
    optionInternship.innerText = "Estágio";

    const optionJunior = document.createElement('option');
    optionJunior.setAttribute('value', "júnior");
    optionJunior.innerText = "Júnior";

    const optionFull = document.createElement('option');
    optionFull.setAttribute('value', "pleno");
    optionFull.innerText = "Pleno";

    const optionSenior = document.createElement('option');
    optionSenior.setAttribute('value', "sênior");
    optionSenior.innerText = "Senior";

    const button = document.createElement('button');
    button.classList.add('modal_user_edit_button');
    button.innerText = "Editar";


    selectProfissionalLevel.append(optionSelectLevel, optionInternship, optionJunior, optionFull, optionSenior);
    selectKindOfWork.append(optionSelectKind, optionHomeOffice, optionHybrid, optionPresential);
    form.append(selectKindOfWork, selectProfissionalLevel, button);
    div.append(h2, form);

    return div;
};

const createDepartmentModal = async () => {
    const div = document.createElement('div');
    div.classList.add('modal_create_department');

    const h2 = document.createElement('h2');
    h2.classList.add('modal_create_department_title');
    h2.innerText = "Criar Departamento";

    const form = document.createElement('form');
    form.classList.add('modal_create_department_form');

    const inputDepartmentName = document.createElement('input');
    inputDepartmentName.setAttribute('required', true);
    inputDepartmentName.setAttribute('type', "text");
    inputDepartmentName.setAttribute('id', "name");
    inputDepartmentName.setAttribute('placeholder', "Nome do departamento");

    const inputDepartmentDescription = document.createElement('input');
    inputDepartmentDescription.setAttribute('required', true);
    inputDepartmentDescription.setAttribute('type', "text");
    inputDepartmentDescription.setAttribute('id', "description");
    inputDepartmentDescription.setAttribute('placeholder', "Descrição");

    const select = document.createElement('select');
    select.setAttribute('required', true);
    select.setAttribute('name', "modal_create_department_select_company");
    select.setAttribute('id', "company_uuid");

    const optionCompanySelect = document.createElement('option');
    optionCompanySelect.setAttribute('value', "");
    optionCompanySelect.innerText = "Selecionar empresa";

    const allCompanies = await getAllCompanies();
    allCompanies.forEach(async company => {
        const companyReady = await createCompanyToAdmimSelect(company);
        select.append(companyReady);
    });

    const button = document.createElement('button');
    button.classList.add('modal_create_department_create_button');
    button.innerText = "Criar o departamento";

    select.appendChild(optionCompanySelect);
    form.append(inputDepartmentName, inputDepartmentDescription, select, button);
    div.append(h2, form);

    return div;
};

const editDepartmentModal = async (department) => {
    const div = document.createElement('div');
    div.classList.add('modal_edit_department');

    const h2 = document.createElement('h2');
    h2.classList.add('modal_edit_department_title');
    h2.innerText = "Editar Departamento";

    const form = document.createElement('form');
    form.classList.add('modal_edit_department_form');

    const input = document.createElement('input');
    input.setAttribute('required', true);
    input.setAttribute('id', "description");
    input.setAttribute('type', "text");
    input.setAttribute('placeholder', `${department.description}`);

    const button = document.createElement('button');
    button.classList.add('modal_edit_department_save_button');
    button.innerText = "Salvar alterações";

    form.append(input, button);
    div.append(h2, form);

    return div;
};

const removeUserModal = async (user) => {
    const div = document.createElement('div');
    div.classList.add('modal_remove_user');

    const h2 = document.createElement('h2');
    h2.classList.add('modal_remove_user_message');
    h2.innerText = `Realmente deseja remover o usuário ${user.username}?`;

    const button = document.createElement('button');
    button.classList.add('modal_remove_user_button');
    button.innerText = "Deletar";

    div.append(h2, button);

    return div;
};

const removeDepartmentModal = async (department) => {
    const div = document.createElement('div');
    div.classList.add('modal_remove_department');

    const h2 = document.createElement('h2');
    h2.classList.add('modal_remove_department_message');
    h2.innerText = `Realmente deseja deletar o departamento ${department.name} e demitir seus funcionários?`;

    const button = document.createElement('button');
    button.classList.add('modal_remove_department_button');
    button.innerText = "Confirmar";

    div.append(h2, button);

    return div;
};

const manageDepartmentModal = async (department) => {
    const div = document.createElement('div');
    div.classList.add('modal_manage_department');

    const divManageDepartmentHeader = document.createElement('div');
    divManageDepartmentHeader.classList.add('modal_manage_department_header');

    const h2ManageDepartmentName = document.createElement('h2');
    h2ManageDepartmentName.classList.add('modal_manage_department_name');
    h2ManageDepartmentName.innerText = `${department.name}`;

    const divManageDepartmentInformation = document.createElement('div');
    divManageDepartmentInformation.classList.add('modal_manage_department_information');

    const h3ManageDepartmentDescription = document.createElement('h3');
    h3ManageDepartmentDescription.classList.add('modal_manage_department_description');
    h3ManageDepartmentDescription.innerText = `${department.description}`;

    const pManageDepartmentCompanyName = document.createElement('p');
    pManageDepartmentCompanyName.classList.add('modal_manage_department_company_name');
    pManageDepartmentCompanyName.innerText = `${department.companies.name}`;

    const form = document.createElement('form');
    form.classList.add('modal_manage_department_hire_user_form');

    const select = document.createElement('select');
    select.setAttribute('required', true);
    select.setAttribute('name', "modal_manage_department_hire_user_select");
    select.setAttribute('id', "user_uuid");

    const option = document.createElement('option');
    option.setAttribute('selected', true);
    option.setAttribute('value', "");
    option.innerText = "Selecionar usuário";

    const allUsersOutOfWork = await usersOutOfWork();
    allUsersOutOfWork.forEach(async user => {
        const userReady = await createUserToManageDepartmentSelect(user);
        select.insertAdjacentElement("beforeend", userReady);
    });


    const buttonManageDepartmentHireUser = document.createElement('button');
    buttonManageDepartmentHireUser.classList.add('modal_manage_department_hire_user_hire_button');
    buttonManageDepartmentHireUser.innerText = "Contratar";
    buttonManageDepartmentHireUser.addEventListener('click', async (e) => {
        await eventHireUser(department.uuid);
    })


    const ul = document.createElement('ul');
    ul.classList.add('modal_manage_department_users_hired');

    const h1 = document.createElement('h1');
    h1.innerText = "Nenhum funcionário contratado no departamento!";

    const allUsers = await getAllUsers();
    const usersFromDepartment = allUsers.filter((user) => user.department_uuid == department.uuid);
    if (usersFromDepartment.length< 1){
        ul.appendChild(h1);
    }else{
        usersFromDepartment.forEach(async user => {
            const userReady = await createUsersHiredByDepartment(user, department.companies.name);
            ul.appendChild(userReady);
        });
    };

    select.appendChild(option);
    form.append(select, buttonManageDepartmentHireUser);
    divManageDepartmentInformation.append(h3ManageDepartmentDescription, pManageDepartmentCompanyName);
    divManageDepartmentHeader.append(h2ManageDepartmentName, divManageDepartmentInformation, form);
    div.append(divManageDepartmentHeader, ul);

    return div;
};

const dismissUserModal = async (user) => {
    const div = document.createElement('div');
    div.classList.add('modal_dismiss_user');

    const h2 = document.createElement('h2');
    h2.classList.add('modal_dismiss_user_message');
    h2.innerText = `Realmente deseja demitir o usuário ${user.username}?`;

    const button = document.createElement('button');
    button.classList.add('modal_dismiss_user_button');
    button.innerText = "Demitir";

    div.append(h2, button);

    return div;
};





export { dinamicModal, dinamicModalSmall, dinamicModalBig, editProfileModal, userEditModal, createDepartmentModal, editDepartmentModal, removeUserModal, removeDepartmentModal, manageDepartmentModal, dismissUserModal };