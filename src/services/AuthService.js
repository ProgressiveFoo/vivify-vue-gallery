import http from "./BaseService";
class AuthService {
  async login(credentials) {
    const { data } = await http.post("/login", credentials);
    return data;
  }

  async register(user) {
    const { data } = await http.post("/register", user);
    return data;
  }

  logout() {
    return http.post("/logout");
  }

  async getMyProfile() {
    const { data } = await http.get("/me");
    return data;
  }

  async emailCheck(email) {
    console.log(email);
    const { data } = await http.post("/email-check", {
      params: { email: email },
    });
    return data;
  }
}

const authService = new AuthService();
export default authService;
