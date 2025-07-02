document.addEventListener('DOMContentLoaded', () => {

    // --- API Keys & Config (for reference) ---
    const firebaseConfig = {
        apiKey: "AIzaSyD2Z9tCmmgReMG77ywXukKC_YIXsbP3uoU",
        authDomain: "hatakesocial-88b5e.firebaseapp.com",
        projectId: "hatakesocial-88b5e",
    };
    const pokemonTcgApiKey = "60a08d4a-3a34-43d8-8f41-827b58cfac6d";

    // --- DOM Elements ---
    const themeToggle = document.getElementById('theme-toggle');
    const userSessionDiv = document.getElementById('user-session');
    const profileWidgetContent = document.getElementById('profile-widget-content');

    // --- Theme (Dark Mode) Logic ---
    const applyTheme = (theme) => {
        if (theme === 'dark') {
            document.documentElement.classList.add('dark');
            themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
        } else {
            document.documentElement.classList.remove('dark');
            themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
        }
    };

    // Check for saved theme in localStorage or system preference
    const savedTheme = localStorage.getItem('color-theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (savedTheme) {
        applyTheme(savedTheme);
    } else {
        applyTheme(systemPrefersDark ? 'dark' : 'light');
    }

    // Theme toggle button event listener
    themeToggle.addEventListener('click', () => {
        const isDark = document.documentElement.classList.toggle('dark');
        const newTheme = isDark ? 'dark' : 'light';
        localStorage.setItem('color-theme', newTheme);
        applyTheme(newTheme);
    });


    // --- Login Persistence & UI Update Logic ---
    const updateUIForLoginStatus = () => {
        const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

        if (isLoggedIn) {
            // User is logged in
            userSessionDiv.innerHTML = `
                <button class="btn btn-primary" id="logout-button">Logout</button>
            `;
            profileWidgetContent.innerHTML = `
                <div class="profile-widget-user">
                    <img src="https://i.pravatar.cc/80?u=user1" alt="User Avatar" class="avatar profile-widget-avatar">
                    <strong>Current_User</strong>
                    <small>@current_user</small>
                </div>
            `;
            document.getElementById('logout-button').addEventListener('click', handleLogout);
        } else {
            // User is logged out
            userSessionDiv.innerHTML = `
                <button class="btn btn-primary" id="login-button">Login</button>
            `;
            profileWidgetContent.innerHTML = `
                <p>Login to see your profile and start interacting!</p>
            `;
            document.getElementById('login-button').addEventListener('click', handleLogin);
        }
    };

    // --- Event Handlers for Login/Logout ---
    function handleLogin() {
        // In a real app, this would trigger a login modal/flow
        console.log('Login action triggered');
        localStorage.setItem('isLoggedIn', 'true');
        updateUIForLoginStatus();
    }

    function handleLogout() {
        console.log('Logout action triggered');
        localStorage.setItem('isLoggedIn', 'false');
        updateUIForLoginStatus();
    }

    // --- Initial UI Update on Page Load ---
    updateUIForLoginStatus();

});
