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
    console.log(token);
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







export { getAllCompanies, getAllSectors, filterCompanies, login, validateUser };