import { getAllDepartments } from "./requests.js";

import { dinamicModal, dinamicModalSmall, dinamicModalBig, editDepartmentModal, removeDepartmentModal, removeUserModal, userEditModal, manageDepartmentModal, dismissUserModal } from "./modal.js";

import { eventEditDepartment, eventDeleteDepartment, eventEditUser, eventRemoveUser, eventDismissUser } from "../pages/dashboards/adminDashboard/index.js";

const createCompanyToRender = async (company) => {
    const li = document.createElement('li');
    li.classList.add('company');

    const h2 = document.createElement('h2');
    h2.classList.add('company-name');
    h2.innerText = `${company.name}`;

    const p = document.createElement('p');
    p.classList.add('opening-hours');
    p.innerText = `${company.opening_hours}`;

    const button = document.createElement('button');
    button.classList.add('btn-sector');
    button.innerText = `${company.sectors.description}`;

    li.append(h2, p, button);
    return li;

};

const createSectorToRender = async (sector) => {
    const option = document.createElement('option');
    option.setAttribute('value', `${sector.description}`);
    option.innerText = `${sector.description}`
    return option;
}

const userInSession = async (user) => {
    const divUserControl = document.createElement('div');
    divUserControl.classList.add('user-control');
    
    const divUserNameData = document.createElement('div');
    divUserNameData.classList.add('user-name-data');

    const h2Username = document.createElement('h2');
    h2Username.classList.add('username');
    h2Username.innerText = `${user.username}`;

    const divUserData = document.createElement('div');
    divUserData.classList.add('user-data');

    const pUserDataEmail = document.createElement('p');
    pUserDataEmail.classList.add('p-user=data-email');
    pUserDataEmail.innerText = `E-Mail: ${user.email}`;

    const pUserDataJob = document.createElement('p');
    pUserDataJob.classList.add('p-user-data-job');
    pUserDataJob.innerText = `${user.professional_level}`;

    const pUserDataWork = document.createElement('p');
    pUserDataWork.classList.add('p-user-data-work');
    if (user.kind_of_work == null){
        pUserDataWork.innerText = ``;
    }else{
        pUserDataWork.innerText = `${user.kind_of_work}`;
    };

    const buttonEditUserData = document.createElement('button');
    buttonEditUserData.classList.add('edit-user-data');
    buttonEditUserData.innerText = "Edit";

    divUserData.append(pUserDataEmail, pUserDataJob, pUserDataWork);
    divUserNameData.append(h2Username, divUserData);
    divUserControl.append(divUserNameData, buttonEditUserData);

    return divUserControl;
}

const createCompanyToAdmimSelect = async (company) => {
    const option = document.createElement('option');
    option.setAttribute('value', `${company.uuid}`);
    option.innerText = `${company.name}`
    return option;
};

const createDepartmentOfCompanySelected = async (department) => {
    const li = document.createElement('li');
    li.classList.add('department');

    const h3 = document.createElement('h3');
    h3.classList.add('department-name');
    h3.innerText = `${department.name}`

    const pDepartmentDescription = document.createElement('p');
    pDepartmentDescription.classList.add('department-description');
    pDepartmentDescription.innerText = `${department.description}`;

    const pCompanyName = document.createElement('p');
    pCompanyName.classList.add('company-name');
    pCompanyName.innerText = `${department.companies.name}`;

    const div = document.createElement('div');
    div.classList.add('department-manage-buttons');

    const eyeButton = document.createElement('button');
    eyeButton.classList = 'eye eye_department';
    eyeButton.addEventListener('click', async (e) => {
        dinamicModalBig(await manageDepartmentModal(department));
        //await evenEditDepartment(department.uuid);
    });

    const pencilButtonDept = document.createElement('button');
    pencilButtonDept.classList = 'pencil pencil_department';
    pencilButtonDept.addEventListener('click', async (e) => {
        dinamicModalSmall(await editDepartmentModal(department));
        await eventEditDepartment(department.uuid);
    });

    const trashButtonDept = document.createElement('button');
    trashButtonDept.classList = 'trash trash_department';
    trashButtonDept.addEventListener('click', async (e) => {
        dinamicModal(await removeDepartmentModal(department));
        await eventDeleteDepartment(department.uuid);
    });

    div.append(eyeButton, pencilButtonDept, trashButtonDept);
    li.append(h3, pDepartmentDescription, pCompanyName, div);

    return li;
}

const createUserInAdminDashboard = async (user) => {
    const li = document.createElement('li');
    li.classList.add('user');

    const h3 = document.createElement('h3');
    h3.classList.add('user-name');
    h3.innerText = `${user.username}`;

    const pUserLevel = document.createElement('p');
    pUserLevel.classList.add('user-level');
    pUserLevel.innerText = `${user.professional_level}`;

    const pCompanyName = document.createElement('p');
    pCompanyName.classList.add('company-name');
    if (user.department_uuid == null){
        pCompanyName.innerText = `Aguardando contratação`;
    }else{
        const allDepts = await getAllDepartments();
        const deptFiltered = allDepts.filter((dept) => dept.uuid == user.department_uuid);
        pCompanyName.innerText = `${deptFiltered[0].companies.name}`;
    }

    const div = document.createElement('div');
    div.classList.add('user-manage-buttons');

    const pencilButtonUser = document.createElement('button');
    pencilButtonUser.classList = 'pencil pencil_user';
    pencilButtonUser.addEventListener('click', async (e) => {
        dinamicModalSmall(await userEditModal(user));
        await eventEditUser(user.uuid);
    });


    const trashButtonUser = document.createElement('button');
    trashButtonUser.classList = 'trash trash_user';
    trashButtonUser.addEventListener('click', async (e) => {
        dinamicModal(await removeUserModal(user));
        await eventRemoveUser(user.uuid);
    });


    div.append(pencilButtonUser, trashButtonUser);
    li.append(h3, pUserLevel, pCompanyName, div);

    return li;
};

const userToAdminDashboard = async (user, company) => {
    const li = document.createElement('li');
    li.classList.add('modal_manage_department_user_hired');

    const h3ManageDepartmentUserHiredUsername = document.createElement('h3');
    h3ManageDepartmentUserHiredUsername.classList.add('modal_manage_department_user_hired_username');
    h3ManageDepartmentUserHiredUsername.innerText = `${user.username}`;

    const pManageDepartmentUserHiredLevel = document.createElement('p');
    pManageDepartmentUserHiredLevel.classList.add('modal_manage_department_user_hired_professional_level');
    pManageDepartmentUserHiredLevel.innerText = `${user.profissional_level}`;

    const pManageDepartmentUserHiredCompanyName = document.createElement('p');
    pManageDepartmentUserHiredCompanyName.classList.add('modal_manage_department_user_hired_company_name');
    pManageDepartmentUserHiredCompanyName.innerText = `${company}`;

    const buttonManageDepartmentDismissUser = document.createElement('button');
    buttonManageDepartmentDismissUser.classList.add('modal_manage_department_user_hired_dismiss_button');
    buttonManageDepartmentDismissUser.innerText = "Desligar";

    li.append(h3ManageDepartmentUserHiredUsername, pManageDepartmentUserHiredLevel, pManageDepartmentUserHiredCompanyName, buttonManageDepartmentDismissUser);

    return li;
};

const createUserToManageDepartmentSelect = async (user) => {
    const option = document.createElement('option');
    option.setAttribute('value', `${user.uuid}`);
    option.innerText = `${user.username}`
    return option;
};

const createUsersHiredByDepartment = async (user, companyName) => {
    const div = document.createElement('div');
    div.classList.add('divCreateUsersHiredByDepartment');

    const h3 = document.createElement('h3');
    h3.classList.add('h3CreateUsersHiredByDepartment');
    h3.innerText = `${user.username}`;

    const p = document.createElement('p');
    p.classList.add('pCreateUsersHiredByDepartment');
    p.innerText = `${user.professional_level}`;

    const span = document.createElement('span');
    span.classList.add('spanCreateUsersHiredByDepartment');
    span.innerText = `${companyName}`;
    
    const button = document.createElement('button');
    button.classList.add('buttonCreateUsersHiredByDepartment');
    button.innerText = `Desligar`;
    button.addEventListener("click", async () => {
        await dinamicModal(await dismissUserModal(user));
        await eventDismissUser(user);
    });

    
    div.append(h3, p, span, button);
    return div;
};





export { createCompanyToRender, createSectorToRender, userInSession, createCompanyToAdmimSelect, createDepartmentOfCompanySelected, createUserInAdminDashboard, userToAdminDashboard, createUserToManageDepartmentSelect, createUsersHiredByDepartment };