import { getUserData } from "../../../scripts/requests.js";

import { userInSession } from "../../../scripts/renders.js";

const renderUserData = async () => {
    const sectionUserLogged = document.querySelector('.user_logged')
    const user = await getUserData();
    const userLogged = await userInSession(user);
    sectionUserLogged.appendChild(userLogged);
};

await renderUserData();












