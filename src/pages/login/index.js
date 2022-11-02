import { login } from "../../scripts/requests.js";

const eventLogin = async() => {
    const form = document.querySelector('form');
    const elements = [...form.elements];
    form.addEventListener("submit", async (e) => {
        e.preventDefault();
        const body = {};
        elements.forEach((elem) => {
            if (elem.tagName == "INPUT" && elem.value !== ""){
                body[elem.id] = elem.value
            };
        });
        await login(body);
    });
};

await eventLogin();