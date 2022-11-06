function animationStart(classList){
    const button = document.querySelector(`.${classList}`);
    button.innerHTML = '';
    const img = document.createElement('img');
    img.setAttribute('src', '../../assets/spinner.svg');
    img.setAttribute('alt', "spinner");
    img.classList.add('loading');
    button.appendChild(img);
}

function animationStop(classList, innerText){
    const button = document.querySelector(`.${classList}`);
    button.innerHTML = '';
    button.classList = `${classList}`;
    button.innerText = `${innerText}`;
};

export { animationStart, animationStop};