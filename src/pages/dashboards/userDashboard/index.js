import { getUserData, updateUserProfile, getAllCoworkers, getAllCompanies } from "../../../scripts/requests.js";

import { toast } from "../../../scripts/toast.js";

const userLogged = async (user) => {
    const noJob = document.querySelector('.no-job');
    const companyNameAndDepartment = document.querySelector('.company-name-and-department');
    const employiesArray = document.querySelector('.employies');

    const li = document.createElement('li');
    li.classList.add('user_logged_data');

    const divUserLoggedNameData = document.createElement('div');
    divUserLoggedNameData.classList.add('user_logged_name_data');

    const h2 = document.createElement('h2');
    h2.classList.add('user_logged_username');
    h2.innerText = `${user.username}`;

    const divUserLoggedInfo = document.createElement('div');
    divUserLoggedInfo.classList.add('user_logged_info');

    const pUserLoggedEmail = document.createElement('p');
    pUserLoggedEmail.classList.add('user_logged_email');
    pUserLoggedEmail.innerText = `E-Mail: ${user.email}`;

    const pUserLoggedLevel = document.createElement('p');
    pUserLoggedLevel.classList.add('user_logged_level');
    if (user.professional_level == null){
        pUserLoggedLevel.innerText = ``;
    }else{
        pUserLoggedLevel.innerText = `${user.professional_level}`;
    };
    

    const pUserLoggedKindOfWork = document.createElement('p');
    pUserLoggedKindOfWork.classList.add('user_logged_kind_of_work');
    if (user.kind_of_work == null){
        pUserLoggedKindOfWork.innerText = ``;
    }else{
        pUserLoggedKindOfWork.innerText = `${user.kind_of_work}`;
    };

    if (user.department_uuid == null){
        noJob.classList.remove('display_none');
        noJob.classList.add('display_flex');
        companyNameAndDepartment.classList.remove('display_flex');
        companyNameAndDepartment.classList.add('display_none');
        employiesArray.classList.remove('display_flex');
        employiesArray.classList.add('display_none');
    }else{
        noJob.classList.remove('display_flex');
        noJob.classList.add('display_none');
        companyNameAndDepartment.classList.remove('display_none');
        companyNameAndDepartment.classList.add('display_flex');
        employiesArray.classList.remove('display_none');
        employiesArray.classList.add('display_flex');
        await showCoworkers();
    };


    const button = document.createElement('button');
    button.classList.add('user_logged_edit_data');
    button.addEventListener('click', async () => {
        dinamicModalSmall(await editProfileModal(user));
    });

    divUserLoggedInfo.append(pUserLoggedEmail, pUserLoggedLevel, pUserLoggedKindOfWork);
    divUserLoggedNameData.append(h2, divUserLoggedInfo);
    li.append(divUserLoggedNameData, button);

    return li;
};

const renderUserData = async () => {
    const sectionUserLogged = document.querySelector('.user_logged')
    const user = await getUserData();
    const userLoggedDashboard = await userLogged(user);
    sectionUserLogged.appendChild(userLoggedDashboard);
};

await renderUserData();

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
    form.addEventListener('click', async (e) => {
        //e.preventDefault();
        await eventEditprofile();
    },
    {once: true});
    

    form.append(inputUsername, inputEmail, inputPassword, button);
    div.append(h2, form);

    return div;
}

const eventEditprofile = async () => {
    const form = document.querySelector('.modal_profile_edit_form');
    const elements = [...form.elements];
    form.addEventListener("submit", async (e) => {
        e.preventDefault();
        const body = {};
        elements.forEach((elem) => {
            if (elem.tagName == "INPUT"){
                body[elem.id] = elem.value
            };
        });
        await updateUserProfile(body);
    });
};

const renderCoworker = async (user) => {
    const li = document.createElement('li');
    li.classList.add('employie');

    const h3 = document.createElement('h3');
    h3.classList.add('employie-name');
    h3.innerText = `${user.username}`;

    const p = document.createElement('p');
    p.classList.add('employie-level');
    p.innerText = `${user.professional_level}`;

    li.append(h3, p);

    return li;
};

const showCoworkers = async () => {
    const labelCompanyDepartment = document.querySelector('.company-department');
    const ulEmployies = document.querySelector('.employies');
    const allCompanies = await getAllCompanies();
    const infoDept = await getAllCoworkers();
    const selectedCompany = allCompanies.filter((company) => company.uuid == infoDept[0].company_uuid);
    labelCompanyDepartment.innerText = `${selectedCompany[0].name} - ${infoDept[0].name}`;
    const allCoworkers = infoDept[0].users;
    allCoworkers.forEach(async coworker => {
        const coworkerReady = await renderCoworker(coworker);
        ulEmployies.appendChild(coworkerReady);
    });
};

const logout = async () => {
    const logoutButton = document.querySelector('.btn-logout')
    logoutButton.addEventListener('click', async () => {
        localStorage.clear();
        await toast("OK", "Logout realizado!")
        setTimeout(() => {
            window.location.replace('../../../pages/login/');
        }, 3000);
        
    });
};

await logout();
