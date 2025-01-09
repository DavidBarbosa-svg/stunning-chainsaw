function toggleMenu() {
    const menu = document.getElementById('menuOpcoes');
    if (menu.style.display === 'block') {
        menu.style.opacity = '0';
        menu.style.maxHeight = '0';
        setTimeout(() => {
            menu.style.display = 'none';
        }, 500);
    } else {
        menu.style.display = 'block';
        setTimeout(() => {
            menu.style.opacity = '1';
            menu.style.maxHeight = '500px';
        }, 10); 
    }
}
