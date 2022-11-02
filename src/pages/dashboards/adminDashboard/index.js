import { getAllCompanies, getAllDepartmentsofOneCompany, getAllUsers } from "../../../scripts/requests.js";

import { createCompanyToAdmimSelect, createDepartmentOfCompanySelected, createUserInAdminDashboard } from "../../../scripts/renders.js";

const renderSelectCompany = async () => {
    const selectCompanyAdminSelect = document.querySelector('.company-select');
    const allCompanies = await getAllCompanies();
    allCompanies.forEach(async company => {
        const companyReady = await createCompanyToAdmimSelect(company);
        selectCompanyAdminSelect.append(companyReady);
    });
};

await renderSelectCompany();

const renderDepartmentsOfOneCompany = async () => {
    const ulDepartments = document.querySelector('.departments');
    const selectCompanyAdminSelect = document.querySelector('.company-select');
    selectCompanyAdminSelect.addEventListener('input', async (e) => {
        if (selectCompanyAdminSelect.value != ""){
            ulDepartments.innerHTML = "";
            const allDepartments = await getAllDepartmentsofOneCompany();
            allDepartments.forEach(async department => {
                const departmentReady = await createDepartmentOfCompanySelected(department);
                ulDepartments.append(departmentReady);
            });
        };
    });
};

await renderDepartmentsOfOneCompany();

const renderUsersInAdminDashboard = async () => {
    const ulUsers = document.querySelector('.users');
    ulUsers.innerHTML = "";
    const allUsers = await getAllUsers();
    allUsers.forEach(async user => {
        const userReady = await createUserInAdminDashboard(user);
        ulUsers.appendChild(userReady);
    });
};

await renderUsersInAdminDashboard();













