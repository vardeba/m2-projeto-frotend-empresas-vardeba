const toast = async (type, message) => {
    const div = document.createElement('div');
    div.classList.add('toast');
    if (type == "OK"){
        div.classList.add('toast_ok');
    };
    if (type == "ERRO"){
        div.classList.add('toast_erro');
    };

    const p = document.createElement('p');
    p.classList.add('toast_text');
    p.innerText = `${message}`;

    div.appendChild(p);

    return div;
};

export { toast };