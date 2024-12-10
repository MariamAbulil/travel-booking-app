interface LoginResponse {
    token: string;
    UserType: string;
}

export const loginAuth = async (
    username: string, 
    password: string, 
    setError: (message: string) => void
): Promise<void> => {
    try {
        const response = await fetch('https://app-hotel-reservation-webapi-uae-dev-001.azurewebsites.net/api/auth/login', {
            method: 'POST',
            body: JSON.stringify({ username, password }),
            headers: { 'Content-Type': 'application/json' },
        });

        if (!response.ok) {
            throw new Error('An error occurred during login');
        }

        const data: LoginResponse = await response.json();

        if (data.token) {
            localStorage.setItem('authToken', data.token);
            console.log(data.UserType === 'Admin' ? 'The user is an Admin' : 'The user is a User');
        } else {
            setError('Invalid login credentials');
        }
    } catch (err) {
        setError('An error occurred while connecting to the server');
        console.error(err);
    }
};
