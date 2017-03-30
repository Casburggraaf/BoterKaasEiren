/*jslint browser: true, devel: true, eqeq: true, plusplus: true, sloppy: true, vars: true, white: true*/
/* BRONNEN:
    Als bron heb ik meerdere websites gebruikt:
        http://stackoverflow.com
        http://www.w3schools.com/
    Ook heb ik de twee boeken van john ducket gebruikt, javascript en html&CSS
    Voor de rest heb ik eigen kennis gebruikt, de lessen en handouts van me vorige opleiding(geschreven door Bram Reurings)
*/

var beurdGroen; // of beurd groen is true of false.
var firstGame = true; //Variable die bij houd of het het eerste spel is.
var delayReset; // Een delay die tussen de games zit.
var spel = []; //Hier worden alle zetten in opgeslagen.
var score = [0,0]; //Hier is de score in te vinden, [0] Groen en [1] Geel
var blokjes; // Lege variable voor de scoop

window.onload = function() {
	blokjes = document.querySelectorAll("td"); //Maakt een array met alle "td's", dit zijn alle blokjes.
	
    resetSpel(); // Runt een keer de function resetSpel als de pagina geladen word
    
    document.querySelector("#resetBeurt").addEventListener("click", function(){ //als er op de knop resetBeurt word gedrukt dan reset de beurt zich
        firstGame = true; // Dit om de delay op 0 miliseconde te zetten
        resetSpel(); // Runt resetSpel()
    });
    
    document.querySelector("#resetGame").addEventListener("click", function(){ //als er op de knop resetGame word gedrukt dan reset de game zich
        document.querySelector("#scoreGroen").innerHTML = "0"; // Reset de score
        document.querySelector("#scoreGeel").innerHTML = "0"; // Reset de score
        score = [0,0]; // Reset de score
        firstGame = true; // Dit om de delay op 0 miliseconde te zetten
        resetSpel(); // Runt resetSpel()
    });
    
    document.addEventListener("keypress", function(e){ // http://stackoverflow.com/questions/14542062/eventlistener-enter-key en http://www.cambiaresearch.com/articles/15/javascript-key-codes
        var key = e.which || e.keyCode; //checkt welke knop word ingedrukt
        if (key === 32) { //Als het de spatie balk is word dit uitgevoert
            firstGame = true; // Dit om de delay op 0 miliseconde te zetten
            resetSpel(); // Runt resetSpel()
        } else if (key == 13){ //Als het de enter is word dit uitgevoert
            document.querySelector("#scoreGroen").innerHTML = "0"; // Reset de score
            document.querySelector("#scoreGeel").innerHTML = "0"; // Reset de score
            score = [0,0]; // Reset de score
            firstGame = true; // Dit om de delay op 0 miliseconde te zetten
            resetSpel(); // Runt resetSpel()
        }
    });
     
};

function resetSpel() {//Reset spel word in tussen elk spel en voor het eerste spel uitgevoerd.
    var i = 0;
	beurdGroen = true; //Groen begind altijd
	spel = []; //Maakt de array leeg
	if (firstGame === true){ //Checkt of het het eerste spel is
        delayReset = 0; //Zet de delay op 0 miliseconden
        firstGame = false;
    } else { // Als het niet het eerste spel in word dit uigevoerd
        delayReset = 1000; //Zet de delay op 10000 miliseconden
    }
	
	setTimeout(function(){ //Timeout voor als het neit het 
		for (i = 0; i < blokjes.length; ++i){ // Een for loop om aan alle blokjes een click event te hangen en als reset alle kleurtjes te verwijderen
			blokjes[i].addEventListener('click', beurt);
			blokjes[i].classList.remove("green", "yellow");
		}
	},delayReset); // delayReset is hoeveel miliseconden het word uitgesteld tussen de games
}

function checkWin(){ //Word elke beurd uitgevoert om te checken of er een winnaar is
    var i = 0;
	if((spel[0] === 0 && spel[1] === 0 && spel[2] === 0) || (spel[3] === 0 && spel[4] === 0 && spel[5] === 0) || (spel[6] === 0 && spel[7] === 0 && spel[8] === 0) || (spel[0] === 0 && spel[3] === 0 && spel[6] === 0) || (spel[1] === 0 && spel[4] === 0 && spel[7] === 0) || (spel[2] === 0 && spel[5] === 0 && spel[8] === 0) || (spel[0] === 0 && spel[4] === 0 && spel[8] === 0) || (spel[2] === 0 && spel[4] === 0 && spel[6] === 0)){ // Checkt win Groen
		for (i = 0; i < blokjes.length; ++i){
			blokjes[i].classList.remove("green", "yellow");//Verwijdert alle kleuren
            blokjes[i].classList.add("green"); //Maakt alles groen
		}
       score[0] += 1; //Zet in de array score dat geel heeft gewonnen
       document.querySelector("#scoreGroen").innerHTML = score[0]; //Zet de score in de span waar de score staat
	   resetSpel(); // Reset het bord
	} else if((spel[0] === 1 && spel[1] === 1 && spel[2] === 1) || (spel[3] === 1 && spel[4] === 1 && spel[5] === 1) || (spel[6] === 1 && spel[7] === 1 && spel[8] === 1) || (spel[0] === 1 && spel[3] === 1 && spel[6] === 1) || (spel[1] === 1 && spel[4] === 1 && spel[7] === 1) || (spel[2] === 1 && spel[5] === 1 && spel[8] === 1) || (spel[0] === 1 && spel[4] === 1 && spel[8] === 1) || (spel[2] === 1 && spel[4] === 1 && spel[6] === 1)){ //Checkt win geel
		for (i = 0; i < blokjes.length; ++i){
			blokjes[i].classList.remove("green", "yellow");//Verwijdert alle kleuren
            blokjes[i].classList.add("yellow"); //Maakt alles geel
		}
        score[1] += 1; //Zet in de array score dat groen heeft gewonnen
        document.querySelector("#scoreGeel").innerHTML = score[1]; //Zet de score in de span waar de score staat
		resetSpel(); // Reset het bord
	} else if(spel[0] !== undefined && spel[1] !== undefined && spel[2] !== undefined && spel[3] !== undefined && spel[4] !== undefined && spel[5] !== undefined && spel[6] !== undefined && spel[7] !== undefined && spel[8] !== undefined){ //Checkt gelijkspel
		resetSpel();
	}
}	

function beurt(){ //word elke beurd uitgevoerd
	var tempCount = this.dataset.count; //Zet in een variable welk blokje is ingedrukt, dit haalt hij uit de data tag in de html
	if (beurdGroen === true){
			this.classList.add("green"); // Geeft een kleurtje aan een blokje
			spel[tempCount] = 0; // Zet in de variable spel de zet van geel
			beurdGroen = false; // Veranderd de beurt
		} else {
			this.classList.add("yellow"); // Geeft een kleurtje aan een blokje
			spel[tempCount] = 1; // Zet in de variable spel de zet van geel
			beurdGroen = true; // Veranderd de beurt
		}
		this.removeEventListener('click', beurt); // Dat er niet twee keer het zelfde blokje gebruikt word
		checkWin(); // Voert checkWin() uit om te kijken of er een winnaar is
}