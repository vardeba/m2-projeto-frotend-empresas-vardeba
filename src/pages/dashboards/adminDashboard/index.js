import { getAllCompanies, getAllDepartmentsofOneCompany, getAllUsers, createDepartment, getAllDepartments, editDepartment, deleteDepartment, updateUser, userDelete, hireUser, dismissUser } from "../../../scripts/requests.js";

import { createCompanyToAdmimSelect, createDepartmentOfCompanySelected, createUserInAdminDashboard } from "../../../scripts/renders.js";

import { createDepartmentModal, dinamicModal, dinamicModalSmall } from "../../../scripts/modal.js";

import { toast } from "../../../scripts/toast.js";

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
    const departments = await getAllDepartments();
    departments.forEach(async department => {
        const departmentReady = await createDepartmentOfCompanySelected(department);
        ulDepartments.append(departmentReady);
});
    selectCompanyAdminSelect.addEventListener('input', async (e) => {
        if (selectCompanyAdminSelect.value != ""){
            ulDepartments.innerHTML = "";
            const allDepartments = await getAllDepartmentsofOneCompany(selectCompanyAdminSelect.value);
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
        ulUsers.insertAdjacentElement("beforeend", userReady);
    });
};

await renderUsersInAdminDashboard();

const openModalCreateDepartment = async () => {
    const createDepartmentButton = document.querySelector('.btn_create_department');
    createDepartmentButton.addEventListener('click', async () => {
        dinamicModalSmall(await createDepartmentModal());
        await eventCreateDepartment();
    })
};

await openModalCreateDepartment();

const eventCreateDepartment = async () => {
    const form = document.querySelector('.modal_create_department_form');
    const elements = [...form.elements];
    form.addEventListener("submit", async (e) => {
        e.preventDefault();
        const body = {};
        elements.forEach((elem) => {
            if ((elem.tagName == "INPUT" || elem.tagName == "SELECT") && elem.value !== ""){
                body[elem.id] = elem.value
            };
        });
        await createDepartment(body);
    });

}

const eventEditDepartment = async (dept_id) => {
    const form = document.querySelector('.modal_edit_department_form');
    const elements = [...form.elements];
    form.addEventListener("submit", async (e) => {
        e.preventDefault();
        const body = {};
        elements.forEach((elem) => {
            if ((elem.tagName == "INPUT" || elem.tagName == "SELECT") && elem.value !== ""){
                body[elem.id] = elem.value
            };
        });
        await editDepartment(body, dept_id);
    });
};

const eventDeleteDepartment = async (dept_id) => {
    const removeDepartmentButton = document.querySelector('.modal_remove_department_button');
    removeDepartmentButton.addEventListener('click', async () => {
        await deleteDepartment(dept_id);
    })
};

const eventEditUser = async (user_id) => {
    const form = document.querySelector('.modal_user_edit_form');
    const elements = [...form.elements];
    form.addEventListener("submit", async (e) => {
        e.preventDefault();
        const body = {};
        elements.forEach((elem) => {
            if ((elem.tagName == "INPUT" || elem.tagName == "SELECT") && elem.value !== ""){
                body[elem.id] = elem.value
            };
        });
        await updateUser(body, user_id);
        setTimeout(async () => {
            await toast("OK", "Usuário atualizado com sucesso");
            window.location.reload();
        }, 3000);
    });
};

const eventRemoveUser = async (user_id) => {
    const removeUserButton = document.querySelector('.modal_remove_user_button');
    removeUserButton.addEventListener('click', async () => {
        await userDelete(user_id);
    })
};

const eventHireUser = async (dept_id) => {
    const form = document.querySelector('.modal_manage_department_hire_user_form');
    const elements = [...form.elements];
    form.addEventListener("submit", async (e) => {
        e.preventDefault();
        const body = {
            department_uuid: dept_id,
        };
        elements.forEach((elem) => {
            if ((elem.tagName == "INPUT" || elem.tagName == "SELECT") && elem.value !== ""){
                body[elem.id] = elem.value
            };
        });
        await hireUser(body);
    });
};
const eventDismissUser = async (user) => {
    const dismissUserButton = document.querySelector('.modal_dismiss_user_button');
    dismissUserButton.addEventListener('click', async () => {
        await dismissUser(user.uuid);
    });
};

const logout = async () => {
    const logoutButton = document.querySelector('.btn-logout')
    logoutButton.addEventListener('click', async () => {
        localStorage.clear();
        toast("OK", "Logout realizado!");
        setTimeout(() => {
            window.location.replace('../../../pages/login/');
        }, 3000);
        
    });
};

await logout();

export { eventEditDepartment, eventDeleteDepartment, eventEditUser, eventRemoveUser, eventHireUser, eventDismissUser };