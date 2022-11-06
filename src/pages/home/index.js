import { getAllCompanies, getAllSectors, filterCompanies } from "../../scripts/requests.js";

import { hamburgerMenu } from "../../scripts/hamburger.js";

import { toast } from "../../scripts/toast.js";

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

const renderCompanies = async () => {
    const allCompanies = await getAllCompanies();
    const ulCompanies = document.querySelector('.companies');
    allCompanies.forEach(async company => {
        const companyReady = await createCompanyToRender(company);
        ulCompanies.appendChild(companyReady);
    });
};

const renderAllSectors = async () => {
    const selectSectors = document.querySelector('.sector-select');
    const allSectors = await getAllSectors();
    allSectors.forEach(async sector => {
        const sectorReady = await createSectorToRender(sector);
        selectSectors.appendChild(sectorReady);
    });
};

const renderFilteredCompanies = async () => {
    const ulCompanies = document.querySelector('.companies');
    const selectSectors = document.querySelector('.sector-select');
    selectSectors.addEventListener('input', async (e) => {
        ulCompanies.innerHTML = "";
        if (selectSectors.value == "all"){
            renderCompanies();
        }else{
            const filteredCompanies = await filterCompanies(selectSectors.value);
            filteredCompanies.forEach(async company => {
                const companyReady = await createCompanyToRender(company);
                ulCompanies.appendChild(companyReady);
            });
        }

    });
}

await hamburgerMenu();

await renderCompanies();

await renderAllSectors();

await renderFilteredCompanies();

