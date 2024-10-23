function memory(isLarge) {
    let icons = ['🍎', '🍊', '🍉', '🍌', '🍇', '🍓', '🍒', '🍍'];
    let iconsLarge=['🌶️','🍄','🥑','🥕','🥔','🥒','🌽','🥦']
    if (isLarge) {
        icons = icons.concat(iconsLarge);
    }
    icons = [...icons, ...icons];
    icons.sort(() => Math.random() - 0.5);

    return {
        cartes: icons.map(icon => ({ value: icon, tournee: false, matched: false })),
        tourneecartes: [],
        affiche: document.getElementById("nombreEssais"),
        essai: 0,
        tournecarte(index) {
            let carte = this.cartes[index];
            if (carte.tournee || carte.matched || this.tourneecartes.length === 2) {
                return;
            }
            carte.tournee = true;
            this.tourneecartes.push(index);
            if (this.tourneecartes.length === 2) {
                this.essai++;
                this.affiche.innerHTML = this.essai;
                let [firstIdx, secondIdx] = this.tourneecartes;
                if (this.cartes[firstIdx].value === this.cartes[secondIdx].value) {
                    this.cartes[firstIdx].matched = true;
                    this.cartes[secondIdx].matched = true;
                } else {
                    setTimeout(() => {
                        this.cartes[firstIdx].tournee = false;
                        this.cartes[secondIdx].tournee = false;
                    }, 1000);
                }
                this.tourneecartes = [];
            }
            if (this.cartes.every(carte => carte.matched)) {
                setTimeout(() => {
                    alert('Bravo, vous avez gagné!');
                    document.getElementById("recommencer").classList.remove('hidden');
                }, 500);
            }
        },
        resetGame(isLarge) {
            this.cartes = memory(isLarge).cartes;
            this.tourneecartes = [];
            this.essai = 0;
            this.affiche.innerHTML = this.essai;
        }
    };
}