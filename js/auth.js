// auth.js - Pour gérer l'authentification
class Auth {
    constructor() {
        this.users = JSON.parse(localStorage.getItem('users')) || [];
    }

    register(user) {
        if (this.users.some(u => u.email === user.email || u.username === user.username || u.phone === user.phone)) {
            alert('Un compte avec ces informations existe déjà.');
            return false;
        }
        this.users.push(user);
        localStorage.setItem('users', JSON.stringify(this.users));
        alert('Votre compte a été créé avec succès.');
        window.location.href = 'login.html';
        return true;
    }

    login(identifier, password) {
        const user = this.users.find(u => (u.email === identifier || u.username === identifier || u.phone === identifier) && u.password === password);
        if (!user) {
            alert('Identifiants non valides.');
            return false;
        }
        localStorage.setItem('currentUser', JSON.stringify(user));
        window.location.href = 'produits.html';
        return true;
    }

    logout() {
        localStorage.removeItem('currentUser');
        window.location.href = 'login.html';
    }

    getCurrentUser() {
        return JSON.parse(localStorage.getItem('currentUser'));
    }
}

export default new Auth();

// register.js - Gestion de l'inscription
document.getElementById('registerForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const user = {
        username: document.getElementById('username').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        password: document.getElementById('password').value
    };
    
    import('./auth.js').then(module => {
        module.default.register(user);
    });
});

// login.js - Gestion de la connexion
document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const identifier = document.getElementById('identifier').value;
    const password = document.getElementById('password').value;
    
    import('./auth.js').then(module => {
        module.default.login(identifier, password);
    });
});


