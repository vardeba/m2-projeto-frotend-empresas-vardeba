import { register } from "../../scripts/requests.js";

const eventRegister = async () => {
    const form = document.querySelector('form');
    const elements = [...form.elements];
    form.addEventListener("submit", async (e) => {
        e.preventDefault();
        const body = {};
        elements.forEach((elem) => {
            if ((elem.tagName == "INPUT" || elem.tagName == "SELECT") && elem.value !== ""){
                body[elem.id] = elem.value
            };
        });
        console.log(body);
        await register(body);
    });

}

eventRegister();

































