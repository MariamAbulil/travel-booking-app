interface LoginResponse {
    authentication: string;
    userType: string;
  }
  
  export const loginAuth = async (
    username: string,
    password: string
  ): Promise<{ error: string; userType: string }> => {
    let error = "";
    let userType = "user";
    try {
      const response = await fetch(
        "https://app-hotel-reservation-webapi-uae-dev-001.azurewebsites.net/api/auth/authenticate",
        {
          method: "POST",
          body: JSON.stringify({ username, password }),
          headers: { "Content-Type": "application/json" },
        }
      );
  
      if (!response.ok) {
        throw new Error("An error occurred during login");
      }
  
      const data: LoginResponse = await response.json();
      if (data.authentication) {
        userType = data.userType.toLocaleLowerCase();
        localStorage.setItem("authToken", data.authentication);
        localStorage.setItem("userType", userType);
      } else {
        error = "Invalid login credentials";
      }
    } catch (err) {
      error = "An error occurred while connecting to the server";
      console.error(err);
    } finally {
      return {
        error,
        userType,
      };
    }
  };
  