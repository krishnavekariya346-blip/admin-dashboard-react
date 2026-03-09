import {create} from "zustand";

const getUsers = () => JSON.parse(localStorage.getItem("users")) || [];

export const Auth = create((set) => ({
    user: JSON.parse(localStorage.getItem("user")) || null,
    isAuthenticated: !!localStorage.getItem("user"),

    signup: (userData) => {
        const users = getUsers();

        const alreadyExists = users.find((u) => u.email === userData.email);
        if(alreadyExists) {
            throw new Error("User already registered!");
        }
        users.push(userData);
        localStorage.setItem("users", JSON.stringify(users));
        localStorage.setItem("user", JSON.stringify(userData));

        set({ user: userData, isAuthenticated: true});
    },

    login: (email, password) => {
        const users = getUsers();

        const validUser = users.find(
            (u) => u.email === email && u.password === password
        );

        if(!validUser) {
            throw new Error("Invalid Email Or Password");
        }
        localStorage.setItem("user", JSON.stringify(validUser));
        set({ user: validUser, isAuthenticated: true });
    },

    logout: () => {
        localStorage.removeItem("user");
        set({ user: null, isAuthenticated: false});
    },
}));