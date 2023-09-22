// Attendi il caricamento del documento
document.addEventListener('DOMContentLoaded', function() {
    
    // CLASSE ACTIVE:
    
    // Seleziona tutti i tag <a> che si trovano dentro al menù
    const menuItems = document.querySelectorAll('#menu a');
    
    // Cicla tutti gli elementi selezionato
    menuItems.forEach(function(item) {
        // Al Click fai scattare un evento
        item.addEventListener('click', function(e) {
            // Cicla tutti gli elementi del menu
            menuItems.forEach(function(item) {
                // Rimuovi la classe 'active' da tutti gli elementi del menu
                item.classList.remove('active');
            });
            
            // Aggiungi la classe 'active' all'elemento selezionato (this)
            this.classList.add('active');
        });
    });
    
    // -------------------------------------------------------------------
    
    // TOOGLE DEL MENU':
    
    // Seleziona tutti gli elementi con classe 'freccia'
    var freccia = document.querySelectorAll('.freccia');
    
    // Cicla tutti gli elementi con la classe freccia
    freccia.forEach(freccia => {
        // Fai scattare un evento al click
        freccia.addEventListener('click', event => {
            // Ottieni l'ID del target dal dataset (data-target)
            const targetId = freccia.dataset.target;
            // Seleziona l'elemento con l'ID ottenuto (l'elemento cliccato)
            const sotto_menu = document.getElementById(targetId);
            // Alterna tra 'block' e 'none' per la visibilità
            sotto_menu.style.display = sotto_menu.style.display === 'block' ? 'none' : 'block';
            
            // Ottieni il genitore dell'elemento freccia
            // const voce = freccia.parentElement;
            // Aggiungi o rimuovi la classe 'aperto' dal genitore dell'elemento freccia
            // voce.classList.toggle('aperto'); // (aperto: true / aperto: false)
            
            // Verifica se il sotto-menu è aperto (se è identico a block)
            // const isOpen = sotto_menu.style.display === 'block';
            // Salva lo stato di apertura nel localStorage
            // localStorage.setItem(`${targetId}_aperto`, isOpen.toString());
            // ES. ---> key: value ---> sotto-menu-1_aperto: true(o false)
            // [inOpen da come risultato un booleano, quindi va convertito come stringa]
        });
    });
    
    // -------------------------------------------------------------------
    
    // CAMBIO PAGINA: 
    
    // Seleziona tutti gli elementi 'a' all'interno di #menu
    const menu_a = document.querySelectorAll('#menu a'); // ***
    // Ottieni l'elemento con ID 'contenuto'
    const contenutoDiv = document.getElementById('contenuto');
    
    // Aggiungi un listener per il click a ciascun elemento 'a'
    menu_a.forEach(function(item) {
        item.addEventListener('click', function(e) {
            // Impedisci il comportamento predefinito del link
            e.preventDefault();
            // Ottieni l'URL dall'attributo 'href'
            const url = this.getAttribute('href');
            // Esegui una richiesta fetch per l'URL
            fetch(url)
            .then(response => response.text())
            .then(data => {
                // Inserisci il testo ottenuto nell'elemento 'contenuto'
                contenutoDiv.innerHTML = data;
            });
        });
    });
    
    // -------------------------------------------------------------------

// TASTI INDIETRO E AVANTI

// Creo un array di pagine dalla variabile 'menu_a'
const pages = Array.from(menu_a); // ***

// Inizializzo l'indice della pagina corrente
let currentPageIndex = -1;

// Aggiungo un event listener al pulsante 'btnSuccessivo'
document.getElementById('btnSuccessivo').addEventListener('click', function() {
    // Verifico se c'è una pagina successiva disponibile (la lunghezza dell'array)
    if (currentPageIndex < pages.length - 1) {
        // Incremento l'indice della pagina corrente
        currentPageIndex++;
        // Mostro la nuova pagina
        showPage(pages[currentPageIndex]);
    }
});

// Aggiungo un event listener al pulsante 'btnPrecedente'
document.getElementById('btnPrecedente').addEventListener('click', function() {
    // Verifico se c'è una pagina precedente disponibile
    if (currentPageIndex > 0) {
        // Decremento l'indice della pagina corrente
        currentPageIndex--;
        // Mostro la nuova pagina
        showPage(pages[currentPageIndex]);
    }
});

// Funzione che mostra una pagina
function showPage(page) {
    // Ottengo l'URL dalla pagina
    const url = page.getAttribute('href');
    // Effettuo una richiesta per ottenere il testo della pagina
    fetch(url)
    .then(response => response.text())
    .then(data => {
        // Inserisco il testo nel contenuto del div
        contenutoDiv.innerHTML = data;
    });
}

// Dio vede e provvede
// A buon intenditore buone parole

    
    
    
    
    // ...
    
    
    
    
    
    // APERTURA - CHIUSURA SOTTO MENU':
    
    // Seleziona tutti gli elementi con classe 'voce_principale'
    // document.querySelectorAll('.voce_principale').forEach(el_voce => {
    //     // Ottieni l'indice dal dataset (data-index)
    //     const index = el_voce.dataset.index;
    //     // Seleziona l'elemento con l'ID basato sull'indice
    //     const sotto_menu = document.getElementById(`sotto-menu-${index}`);
    //     // Verifica se il sotto-menu era aperto in precedenza
    //     const isAperto = localStorage.getItem(`${sotto_menu.id}_aperto`) === 'true';
    //     // Imposta la visibilità in base allo stato di apertura
    //     sotto_menu.style.display = isAperto ? 'block' : 'none';
    //     // Aggiungi la classe 'aperto' se il sotto-menu è aperto
    //     if (isAperto) {
    //         el_voce.classList.add('aperto');
    //     }
    // });
    
    
})
