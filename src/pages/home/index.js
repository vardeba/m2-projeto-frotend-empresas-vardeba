import { getAllCompanies, getAllSectors, filterCompanies } from "../../scripts/requests.js";

import { createCompanyToRender, createSectorToRender } from "../../scripts/renders.js";

const renderCompanies = async () => {
    const allCompanies = await getAllCompanies();
    const ulCompanies = document.querySelector('.companies');
    allCompanies.forEach(company => {
        const companyReady = createCompanyToRender(company);
        ulCompanies.insertAdjacentElement('beforeend', companyReady);
    });
};

const renderAllSectors = async () => {
    const selectSectors = document.querySelector('.sector-select');
    const allSectors = await getAllSectors();
    allSectors.forEach(sector => {
        const sectorReady = createSectorToRender(sector);
        selectSectors.insertAdjacentElement('beforeend', sectorReady);
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
            filteredCompanies.forEach(company => {
                const companyReady = createCompanyToRender(company);
                ulCompanies.insertAdjacentElement('beforeend', companyReady);
            });
        }

    });
}

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

await hamburgerMenu();

await renderCompanies();

await renderAllSectors();

await renderFilteredCompanies();






















