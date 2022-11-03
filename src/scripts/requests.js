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
            setTimeout(() => {
                // window.location.replace("../../pages/home/index.html");
            }, 2000);
            await validateUser(userToken);
            return response;
        };
    }catch(err){
        console.log(err);
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
        console.log(request);
        if (request.ok != true){
            throw new Error("Algo deu errado!");
        }else{
            const response = await request.json();
            setTimeout(() => {
                if (response.is_admin){
                    window.location.replace("../dashboards/adminDashboard/index.html");
                }else{
                    window.location.replace("../dashboards/userDashboard/index.html");
                };
            }, 2000);
            return response;
        };
    }catch(err){
        console.log(err);
    };
};

const register = async (body) => {
    try {
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
            setTimeout(() => {
                window.location.replace("../../pages/login/index.html");
            }, 2000);
            return response;
        };
    }catch(err){
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

const updateUser = async (body) => {
    const token = localStorage.getItem('userToken');
    const tokenToUse = JSON.parse(token);
    try {
        const request = await fetch(`${baseUrl}/users`, {
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
            return response;
        };
    }catch(err){
        console.log(err);
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
            return response;
        };
    }catch(err){
        console.log(err);
    };
};

const userDelete = async (id) => {
    const token = localStorage.getItem('userToken');
    const tokenToUse = JSON.parse(token);
    try {
        const request = await fetch(`${baseUrl}/admin/delete_user/${id}`, {
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
            return response;
        };
    }catch(err){
        console.log(err);
    };
};

const createDepartment = async (id) => {
    const token = localStorage.getItem('userToken');
    const tokenToUse = JSON.parse(token);
    try {
        const request = await fetch(`${baseUrl}/departments`, {
            method: "POST",
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
            return response;
        };
    }catch(err){
        console.log(err);
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
            return response;
        };
    }catch(err){
        console.log(err);
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
            return response;
        };
    }catch(err){
        console.log(err);
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
            return response;
        };
    }catch(err){
        console.log(err);
    };
};

export { getAllCompanies, getAllSectors, filterCompanies, login, validateUser, register, getUserData, getAllDepartmentsofOneCompany, getAllUsers, getAllDepartments, getAllCoworkers, updateUser, usersOutOfWork, updateUserInAdminDashboard, userDelete, createDepartment, hireUser, dismissUser, editDepartment, deleteDepartment };