const toast = async (type, message) => {
    const body = document.querySelector('body');

    const div = document.createElement('div');
    div.classList.add('toast_container');
    if (type == "OK"){
        div.classList.add('toast_ok');
    };
    if (type == "ERRO"){
        div.classList.add('toast_erro');
    };

    const p = document.createElement('p');
    p.classList.add('toast_message');
    p.innerText = `${message}`;
    

    div.appendChild(p);

    body.appendChild(div);
};

export { toast };