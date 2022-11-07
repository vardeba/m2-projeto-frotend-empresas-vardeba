import { toast } from "../scripts/toast.js";

import { animationStart, animationStop } from "./spinner.js";

const baseUrl = "http://localhost:6278";

const getAllCompanies = async () => {
    try {
        const request = await fetch(`${baseUrl}/companies`);
        if (request.ok != true){
            throw new Error("Algo deu errado!");
        }else{
            const response = await request.json();
            return response;
        };
    }catch(err){
        console.log(err);
    };
};

const getAllSectors = async () => {
    try {
        const request = await fetch(`${baseUrl}/sectors`);
        if (request.ok != true){
            throw new Error("Algo deu errado!");
        }else{
            const response = await request.json();
            return response;
        };
    }catch(err){
        console.log(err);
    };
};

const filterCompanies = async (sector) => {
    try {
        const request = await fetch(`${baseUrl}/companies/${sector}`);
        if (request.ok != true){
            throw new Error("Algo deu errado!");
        }else{
            const response = await request.json();
            return response;
        };
    }catch(err){
        console.log(err);
    };
};

const login = async (body) => {
    try {
        animationStart("btn_login_login");
        const request = await fetch(`${baseUrl}/auth/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body),
        });
        if (request.ok != true){
            throw new Error("Algo deu errado!");
        }else{
            const response = await request.json();
            const userToken = JSON.stringify(response.token);
            localStorage.setItem("userToken", userToken);
            const userValidated = await validateUser(userToken);
            setTimeout(() => {
                if (userValidated.is_admin){
                    window.location.replace("../../pages/dashboards/adminDashboard/index.html");
                }else{
                    window.location.replace("../../pages/dashboards/userDashboard/index.html");
                };
            }, 2000);
            return response;
        };
    }catch(err){
        await toast("ERRO", "Email ou Senha incorretos")
        setTimeout(async () => {
            animationStop("btn_login_login", "Login");
        }, 3000)
    };
}

const validateUser = async (token) => {
    const tokenToUse = JSON.parse(token);
    try {
        const request = await fetch(`${baseUrl}/auth/validate_user`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${tokenToUse}`,
            },
        });
        if (request.ok != true){
            throw new Error("Algo deu errado!");
        }else{
            const response = await request.json();
            return response;
        };
    }catch(err){
        console.log(err);
    };
};

const register = async (body) => {
    try {
        animationStart("btn_register_register")
        const request = await fetch(`${baseUrl}/auth/register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body),
        });
        if (request.ok != true){
            throw new Error("Algo deu errado!");
        }else{
            const response = await request.json();
            toast("OK", "Usuário criado com sucesso!")
            setTimeout(() => {
                window.location.replace("../../pages/login/index.html");
            }, 2000);
            return response;
        };
    }catch(err){
        toast("ERRO", "Verifique os dados informados e tente novamente!")
        setTimeout(async () => {
            animationStop("btn_register_register", "Cadastre-se")
        }, 3000);
        console.log(err);
    };
}

const getUserData = async () => {
    const token = localStorage.getItem('userToken');
    const tokenToUse = JSON.parse(token);
    try {
        const request = await fetch(`${baseUrl}/users/profile`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${tokenToUse}`,
            },
        });
        if (request.ok != true){
            throw new Error("Algo deu errado!");
        }else{
            const response = await request.json();
            const userData = JSON.stringify(response);
            localStorage.setItem("userLogged", userData);

            return response;
        };
    }catch(err){
        console.log(err);
    };
}

const getAllDepartmentsofOneCompany = async (id) => {
    const token = localStorage.getItem('userToken');
    const tokenToUse = JSON.parse(token);
    try {
        const request = await fetch(`${baseUrl}/departments/${id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${tokenToUse}`,
            },
        });
        if (request.ok != true){
            throw new Error("Algo deu errado!");
        }else{
            const response = await request.json();
            return response;
        };
    }catch(err){
        console.log(err);
    };
};

const getAllUsers = async () => {
    const token = localStorage.getItem('userToken');
    const tokenToUse = JSON.parse(token);
    try {
        const request = await fetch(`${baseUrl}/users`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${tokenToUse}`,
            },
        });
        if (request.ok != true){
            throw new Error("Algo deu errado!");
        }else{
            const response = await request.json();
            return response;
        };
    }catch(err){
        console.log(err);
    };
}

const getAllDepartments = async () => {
    const token = localStorage.getItem('userToken');
    const tokenToUse = JSON.parse(token);
    try {
        const request = await fetch(`${baseUrl}/departments`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${tokenToUse}`,
            },
        });
        if (request.ok != true){
            throw new Error("Algo deu errado!");
        }else{
            const response = await request.json();
            return response;
        };
    }catch(err){
        console.log(err);
    };
};

const getAllCoworkers = async () => {
    const token = localStorage.getItem('userToken');
    const tokenToUse = JSON.parse(token);
    try {
        const request = await fetch(`${baseUrl}/users/departments/coworkers`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${tokenToUse}`,
            },
        });
        if (request.ok != true){
            throw new Error("Algo deu errado!");
        }else{
            const response = await request.json();
            return response;
        };
    }catch(err){
        console.log(err);
    };
};

const updateUser = async (body, user_id) => {
    const token = localStorage.getItem('userToken');
    const tokenToUse = JSON.parse(token);
    try {
        const request = await fetch(`${baseUrl}/admin/update_user/${user_id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${tokenToUse}`,
            },
            body: JSON.stringify(body),
        });
        if (request.ok != true){
            throw new Error("Algo deu errado!");
        }else{
            const response = await request.json();
            toast("OK", "Usuário atualizado");
            setTimeout(async () => {
                window.location.reload();
            }, 3000);
            return response;
        };
    }catch(err){
        toast("ERRO", "Verifique os dados e tente novamente!")
    };
};

const updateUserProfile = async (body) => {
    const token = localStorage.getItem('userToken');
    const tokenToUse = JSON.parse(token);
    try {
        const request = await fetch(`${baseUrl}/users/`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${tokenToUse}`,
            },
            body: JSON.stringify(body),
        });
        if (request.ok != true){
            throw new Error("Algo deu errado!");
        }else{
            const response = await request.json();
            toast("OK", "Usuário atualizado!")
            setTimeout(async () => {
                window.location.reload();
            }, 3000)
            return response;
        };
    }catch(err){
        toast("ERRO", "Verifique os dados e tente novamente!")
    };
};

const usersOutOfWork = async () => {
    const token = localStorage.getItem('userToken');
    const tokenToUse = JSON.parse(token);
    try {
        const request = await fetch(`${baseUrl}/admin/out_of_work`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${tokenToUse}`,
            },
        });
        if (request.ok != true){
            throw new Error("Algo deu errado!");
        }else{
            const response = await request.json();
            return response;
        };
    }catch(err){
        console.log(err);
    };
};

const updateUserInAdminDashboard = async (body, id) => {
    const token = localStorage.getItem('userToken');
    const tokenToUse = JSON.parse(token);
    try {
        const request = await fetch(`${baseUrl}/admin/update_user/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${tokenToUse}`,
            },
            body: JSON.stringify(body),
        });
        if (request.ok != true){
            throw new Error("Algo deu errado!");
        }else{
            const response = await request.json();
            toast("OK", "Usuário atualizado com sucesso!")
            setTimeout(async () => {
                window.location.reload();
            }, 3000);
            return response;
        };
    }catch(err){
        console.log(err);
    };
};

const userDelete = async (user_id) => {
    const token = localStorage.getItem('userToken');
    const tokenToUse = JSON.parse(token);
    try {
        const request = await fetch(`${baseUrl}/admin/delete_user/${user_id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${tokenToUse}`,
            },
        });
        if (request.ok != true){
            throw new Error("Algo deu errado!");
        }else{
            const response = await request.json();
            toast("OK", "Usuário deletado com sucesso!");
            setTimeout(async () => {
                window.location.reload();
            }, 3000);
            return response;
        };
    }catch(err){
        toast("OK", "Usuário deletado com sucesso!");
        setTimeout(async () => {
            window.location.reload();
        }, 3000);
    };
};

const createDepartment = async (body) => {
    const token = localStorage.getItem('userToken');
    const tokenToUse = JSON.parse(token);
    try {
        const request = await fetch(`${baseUrl}/departments`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${tokenToUse}`,
            },
            body: JSON.stringify(body),
        });
        if (request.ok != true){
            throw new Error("Algo deu errado!");
        }else{
            const response = await request.json();
            toast("OK", "Departamento criado com sucesso!");
            setTimeout(async () => {
                window.location.reload();
            }, 3000);
            return response;
        };
    }catch(err){
        toast("ERRO", "Verifique os dados e tente novamente!");
    };
};

const hireUser = async (body) => {
    const token = localStorage.getItem('userToken');
    const tokenToUse = JSON.parse(token);
    try {
        const request = await fetch(`${baseUrl}/departments/hire/`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${tokenToUse}`,
            },
            body: JSON.stringify(body),
        });
        if (request.ok != true){
            throw new Error("Algo deu errado!");
        }else{
            const response = await request.json();
            toast("OK", "Usuário contratado com sucesso!");
            setTimeout(async () => {
                window.location.reload();
            }, 3000);
            return response;
        };
    }catch(err){
        toast("ERRO", "Verifique os dados e tente novamente!");
    };
};

const dismissUser = async (id) => {
    const token = localStorage.getItem('userToken');
    const tokenToUse = JSON.parse(token);
    try {
        const request = await fetch(`${baseUrl}/departments/dismiss/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${tokenToUse}`,
            },
        });
        if (request.ok != true){
            throw new Error("Algo deu errado!");
        }else{
            const response = await request.json();
            toast("OK", "Usuário demitido com sucesso!");
            setTimeout(async () => {
                window.location.reload();
            }, 3000);

            return response;
        };
    }catch(err){
        toast("ERRO", "Verifique os dados e tente novamente!");
    };
};

const editDepartment = async (body, id) => {
    const token = localStorage.getItem('userToken');
    const tokenToUse = JSON.parse(token);
    try {
        const request = await fetch(`${baseUrl}/departments/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${tokenToUse}`,
            },
            body: JSON.stringify(body),
        });
        if (request.ok != true){
            throw new Error("Algo deu errado!");
        }else{
            const response = await request.json();
            toast("OK", "Departamento atualizado com sucesso!");
            setTimeout(async () => {
                window.location.reload();
            }, 3000);

            return response;
        };
    }catch(err){
        toast("ERRO", "Verifique os dados e tente novamente!");
    };
};

const deleteDepartment = async (id) => {
    const token = localStorage.getItem('userToken');
    const tokenToUse = JSON.parse(token);
    try {
        const request = await fetch(`${baseUrl}/departments/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${tokenToUse}`,
            },
        });
        if (request.ok != true){
            throw new Error("Algo deu errado!");
        }else{
            const response = await request.json();
            toast("OK", "Departamento deletado com sucesso!");
            setTimeout(async () => {
                window.location.reload();
            }, 3000);

            return response;
        };
    }catch(err){
        toast("OK", "Departamento deletado com sucesso!");
        setTimeout(async () => {
            window.location.reload();
        }, 3000);
    };
};

export { getAllCompanies, getAllSectors, filterCompanies, login, validateUser, register, getUserData, getAllDepartmentsofOneCompany, getAllUsers, getAllDepartments, getAllCoworkers, updateUser, usersOutOfWork, updateUserInAdminDashboard, userDelete, createDepartment, hireUser, dismissUser, editDepartment, deleteDepartment, updateUserProfile };