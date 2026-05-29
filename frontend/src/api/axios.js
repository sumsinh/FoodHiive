import axios from "axios";

const api = axios.create({
  baseURL: "http://127.0.0.1:8000/api",
});

// Add access token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("access");

  const publicRoutes = [
    "/foods/",
    "/users/login/",
    "/users/register/",
    "/users/token/refresh/",
  ];

  const isPublicRoute = publicRoutes.some((route) =>
    config.url.includes(route)
  );

  if (token && !isPublicRoute) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});


// Auto refresh expired token
api.interceptors.response.use(
  (response) => response,

  async (error) => {
    const originalRequest = error.config;

    if (
      error.response?.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      try {
        const refresh = localStorage.getItem("refresh");

        const res = await axios.post(
          "http://127.0.0.1:8000/api/users/token/refresh/",
          { refresh }
        );

        localStorage.setItem(
          "access",
          res.data.access
        );

        originalRequest.headers.Authorization =
          `Bearer ${res.data.access}`;

        return api(originalRequest);

      } catch (err) {
        localStorage.clear();
        window.location.href = "/login";
      }
    }

    return Promise.reject(error);
  }
);

export default api;