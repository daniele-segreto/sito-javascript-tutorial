document.addEventListener('DOMContentLoaded', function() {


    // Setto il tasto 'indietro' come 'disabilitato' al caricamento della pagina
    document.getElementById('btnPrecedente').disabled = true;


    // -------------------------------------------------------------------------------------
    // ******* GESTIONE DELLA CLASSE ACTIVE *******

    // Seleziona tutti gli elementi del menu
    const menuItems = document.querySelectorAll('#menu a');

    // Aggiungi un listener di evento a ciascun elemento del menu
    menuItems.forEach(function(item) {
        item.addEventListener('click', function(e) {
            // Rimuovi la classe 'active' da tutti gli elementi del menu
            menuItems.forEach(function(item) {
                item.classList.remove('active');
            });

            // Aggiungi la classe 'active' all'elemento cliccato (this)
            this.classList.add('active');
            
            // Abilita il tasto "Indietro"
            document.getElementById('btnPrecedente').disabled = false;
        });

    });


    // -------------------------------------------------------------------------------------
    // ******* GESTIONE DEL TOGGLE *******

    // Seleziona tutti gli elementi con classe 'freccia-toogle' invece di 'freccia'
    var freccia_toogle = document.querySelectorAll('.freccia-toogle');

    // Aggiungi un listener di evento a ciascun elemento con classe 'freccia-toogle'
    freccia_toogle.forEach(freccia => {
        freccia.addEventListener('click', event => {
            // Ottieni l'ID del target dal dataset (data-target)
            const targetId = freccia.dataset.target;
            // Seleziona l'elemento con l'ID ottenuto (l'elemento cliccato)
            const sotto_menu = document.getElementById(targetId);
            // Alterna tra 'block' e 'none' per la visibilità
            sotto_menu.style.display = sotto_menu.style.display === 'block' ? 'none' : 'block';
        });
    });


    // -------------------------------------------------------------------------------------
    // ******* GESTIONE DEL CAMBIO DI CONTENUTO ALL'INTERNO DELLA PAGINA *******

    // Seleziona tutti gli elementi 'a' all'interno di #menu
    const menu_a = document.querySelectorAll('#menu a');
    // Ottieni l'elemento con ID 'contenuto'
    const contenutoDiv = document.getElementById('contenuto');

    // Aggiungi un listener di evento a ciascun elemento 'a'
    menu_a.forEach(function(item, index) {
        item.addEventListener('click', function(e) {
            // Impedisci il comportamento predefinito del link
            e.preventDefault();
            // Ottieni l'URL dall'attributo 'href'
            const url = this.getAttribute('href');
            console.log(url);
            // Esegui una richiesta fetch per l'URL
            fetch(url)
            .then(response => response.text())
            .then(data => {
                // Inserisci il testo ottenuto nell'elemento 'contenuto'
                contenutoDiv.innerHTML = data;
                // Aggiorna l'indice della pagina corrente
                currentPageIndex = index; // Aggiunto

                // *Ho aggiunto "index" come secondo argomento alla funzione che gestisce il click sulle voci di menu. Quando l'utente clicca su una voce di menu, l'indice della pagina corrente (currentPageIndex) viene aggiornato con l'indice della voce di menu cliccata. Questo dovrebbe assicurare che la pagina corrente corrisponda all'elemento del menu selezionato dall'utente.
            });
        });
    });


    // -------------------------------------------------------------------------------------
    // ******* GESTIONE DEI TASTI INDIETRO E AVANTI *******

    // Crea un array di pagine dalla variabile 'menu_a'
    const pages = Array.from(menu_a); // #menu a
    // Inizializza l'indice della pagina corrente
    let currentPageIndex = -1;

    // *menu_a è una NodeList che contiene tutti gli elementi <a> all'interno dell'elemento con ID menu.
    // *Array.from(), converte la NodeList in un vero e proprio array.
    // *creo un array chiamato 'pages' che contiene tutti gli elementi del menu come oggetti array. Questo array viene utilizzato successivamente per la navigazione tra le pagine quando si preme il pulsante "Avanti" o "Indietro".


    // -------------------------------------------------------------------------------------
    // ******* TASTO AVANTI *******

    // Aggiungi un event listener al pulsante 'btnSuccessivo'
    document.getElementById('btnSuccessivo').addEventListener('click', function() {
        // Verifica se c'è una pagina successiva disponibile
        if (currentPageIndex < pages.length - 1) {
            // Incrementa l'indice della pagina corrente
            currentPageIndex++;
            // Mostra la nuova pagina
            showPage(pages[currentPageIndex]);
            // Aggiorna l'elemento attivo nel menu
            updateActiveMenuItem(currentPageIndex);

            // Gestisci l'apertura dei sottomenu
            handleSubmenu(currentPageIndex);
        }

        // Disabilita il tasto "Avanti" se si raggiunge l'ultima pagina
        if (currentPageIndex === pages.length - 1) {
            this.disabled = true;
        }

        // Abilita il tasto "Indietro" se era precedentemente disabilitato
        document.getElementById('btnPrecedente').disabled = false;
    });


    // -------------------------------------------------------------------------------------
    // ******* TASTO INDIETRO *******

    // Aggiungi un event listener al pulsante 'btnPrecedente'
    document.getElementById('btnPrecedente').addEventListener('click', function() {
        // Verifica se c'è una pagina precedente disponibile
        if (currentPageIndex > 0) {
            // Decrementa l'indice della pagina corrente
            currentPageIndex--;
            // Mostra la nuova pagina
            showPage(pages[currentPageIndex]);
            // Aggiorna l'elemento attivo nel menu
            updateActiveMenuItem(currentPageIndex);

            // Gestisci l'apertura dei sottomenu
            handleSubmenu(currentPageIndex);
        }

        // Disabilita il tasto "Indietro" se si raggiunge la prima pagina
        if (currentPageIndex === 0) {
            this.disabled = true;
        }

        // Abilita il tasto "Avanti" se era precedentemente disabilitato
        document.getElementById('btnSuccessivo').disabled = false;
    });


    // -------------------------------------------------------------------------------------
    // ******* MOSTRA IL CONTENUTO AL CLICK DEI TASTI 'AVANTI' E 'INDIETRO' *******

    // Mostra la pagina ai click dei tasti 'indietro' e 'avanti'
    function showPage(page) {
        // Ottieni l'URL dalla pagina
        const url = page.getAttribute('href');
        console.log(url);
        // Effettua una richiesta per ottenere il testo della pagina
        fetch(url)
        .then(response => response.text())
        .then(data => {
            // Inserisci il testo nel contenuto del div
            contenutoDiv.innerHTML = data;
        });
    }


    // -------------------------------------------------------------------------------------
    // ******* GESTIONE DELLA CLASSE ACTIVE AL CLICK DEI TASTI 'AVANTI' E 'INDIETRO' *******

    // Aggiorna l'elemento attivo nel menu
    function updateActiveMenuItem(index) {
        // Rimuove la classe 'active' da tutti gli elementi del menu
        menuItems.forEach(function(item) {
            item.classList.remove('active');
        });
        // Aggiunge la classe 'active' all'elemento corrente nel menu
        menuItems[index].classList.add('active');
    }


    // -------------------------------------------------------------------------------------
    // ******* GESTIONE DEL SOTTOMENU *******

    function handleSubmenu(index) {
        // Seleziono tutti i sottomenu
        var sotto_menu_1 = document.getElementById('sotto-menu-1');
        var sotto_menu_2 = document.getElementById('sotto-menu-2');
        var sotto_menu_3 = document.getElementById('sotto-menu-3');
        var sotto_menu_4 = document.getElementById('sotto-menu-4');
        var sotto_menu_5 = document.getElementById('sotto-menu-5');

        // Chiudo tutti i sottomenu
        sotto_menu_1.style.display = 'none';
        sotto_menu_2.style.display = 'none';
        sotto_menu_3.style.display = 'none';
        sotto_menu_4.style.display = 'none';
        sotto_menu_5.style.display = 'none';

        // Apro il sottomenu relativo alla pagina corrente
        if (index >= 0 && index < 4) {
            sotto_menu_1.style.display = 'block';
        } else if (index >= 4 && index < 9) {
            sotto_menu_2.style.display = 'block';
        } else if (index >= 9 && index < 11) {
            sotto_menu_3.style.display = 'block';
        } else if (index >= 11 && index < 14) {
            sotto_menu_4.style.display = 'block';
        } else if (index >= 14) {
            sotto_menu_5.style.display = 'block';
        }
    }

});