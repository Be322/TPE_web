let userLogged = false;

const userMenu = document.querySelector('.user-menu');
const userIcon = document.getElementById('userIcon');
const loginOption = document.getElementById('loginOption');
const logoutOption = document.getElementById('logoutOption');

userIcon.addEventListener('click', e => {
    e.preventDefault();
    userMenu.classList.toggle('open');
});

function renderMenu() {
    const restrictedItems = document.querySelectorAll('.menu-item');

    if (userLogged) {
        restrictedItems.forEach(i => i.style.display = 'block');

        loginOption.style.display = 'none';
        logoutOption.style.display = 'block';

    } else {
        restrictedItems.forEach(i => i.style.display = 'none');

        loginOption.style.display = 'block';
        logoutOption.style.display = 'none';
    }
}

renderMenu();

function logout() {
    userLogged = false;
    renderMenu();
    alert("Você saiu!");
}
