describe('Los estudiantes under monkeys', function() {
    it('visits los estudiantes and survives monkeys', function() {
        cy.visit('https://losestudiantes.co');
        cy.contains('Cerrar').click();
        cy.wait(1000);
        var eventosALanzar = 10;
        randomEvents(eventosALanzar);
    })
})
function randomEvents(monkeysLeft2) {
    function getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min;
    };

    function getRandomEvent() {
        var events = ['link', 'texto', 'seleccion', 'boton'];
        var randEvent = events[Math.floor(Math.random() * events.length)];
        return randEvent;
    };

    function getRandomText(){
        //return Math.random().toString(36).substring(0,10);
        let random_string = '';
        let random_ascii;
        let ascii_low = 65;
        let ascii_high = 90;
        for(let i = 0; i < 10; i++) {
            random_ascii = Math.floor((Math.random() * (ascii_high - ascii_low)) + ascii_low);
            random_string += String.fromCharCode(random_ascii);
        }
        return random_string;
    }

    var monkeysLeft = monkeysLeft2;
    if(monkeysLeft > 0) {
        var evento = getRandomEvent();
        if (evento === 'link'){
            cy.get('a').then($link => {
                var randomLink = $link.get(getRandomInt(0, $link.length));
                if(!Cypress.dom.isHidden(randomLink)) {
                    cy.wrap(randomLink).click({force: true});
                    monkeysLeft = monkeysLeft - 1;
                }
                cy.wait(1000);
                randomEvents(monkeysLeft);
            });
        } else if (evento === 'texto') {
            cy.get('input').then($text => {
                var randomInput = $text.get(getRandomInt(0, $text.length));
                if(!Cypress.dom.isHidden(randomInput)) {
                    cy.wrap(randomInput).click().type(getRandomText());
                    monkeysLeft = monkeysLeft - 1;
                } else {
                    cy.wrap(randomInput).type(getRandomText(), {force: true});
                    monkeysLeft = monkeysLeft - 1;
                }
                cy.wait(1000);
                randomEvents(monkeysLeft);
            });
        } else if (evento === 'seleccion') {
            cy.get('select').then($select => {
                var randomSelect = $select.get(getRandomInt(0, $select.length));
                if(!Cypress.dom.isHidden(randomSelect)) {
                    cy.wrap(randomSelect).children('option').eq(getRandomInt(0, randomSelect.options.length)).then(e => {
                        cy.wrap(randomSelect).select(e.val());
                    }); 
                    monkeysLeft = monkeysLeft - 1;
                }
                cy.wait(1000);
                randomEvents(monkeysLeft);
            });
        } else if (evento === 'boton'){
            cy.get('button').then($button => {
                var randomButton = $button.get(getRandomInt(0, $button.length));
                if(!Cypress.dom.isHidden(randomButton)) {
                    cy.wrap(randomButton).click();
                    monkeysLeft = monkeysLeft - 1;
                }
                cy.wait(1000);
                randomEvents(monkeysLeft);
            });
        }
    }   
}