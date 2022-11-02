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



















export { createCompanyToRender, createSectorToRender };