import { getAllDepartments } from "./requests.js";

const createCompanyToRender = (company) => {
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

const createSectorToRender = (sector) => {
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
    eyeButton.classList.add('eye');
    eyeButton.innerText = "olho";

    const pencilButtonDept = document.createElement('button');
    pencilButtonDept.classList.add('pencil');
    pencilButtonDept.innerText = "lápis";

    const trashButtonDept = document.createElement('button');
    trashButtonDept.classList.add('trash');
    trashButtonDept.innerText = "lixo";

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
        pCompanyName.innerText = ``;
    }else{
        const allDepts = await getAllDepartments();
        const deptFiltered = allDepts.filter((dept) => dept.uuid == user.department_uuid);
        pCompanyName.innerText = `${deptFiltered.companies.name}`;
    }

    const div = document.createElement('div');
    div.classList.add('user-manage-buttons');

    const pencilButtonUser = document.createElement('button');
    pencilButtonUser.classList.add('pencil');
    pencilButtonUser.innerText = "lápis";

    const trashButtonUser = document.createElement('button');
    trashButtonUser.classList.add('trash');
    trashButtonUser.innerText = "lixo";

    div.append(pencilButtonUser, trashButtonUser);
    li.append(h3, pUserLevel, pCompanyName, div);

    return li;
};









export { createCompanyToRender, createSectorToRender, userInSession, createCompanyToAdmimSelect, createDepartmentOfCompanySelected, createUserInAdminDashboard };