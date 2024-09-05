// Commence un partie
function Partie(type){
	// Stockage des éléments HTML
	var joueurVsIA = document.getElementById("joueurVsIA");
	var iaVsIA = document.getElementById("iaVsIA");
	var divScoreP1 = document.getElementById("divScoreP1");
	var divScoreP2 = document.getElementById("divScoreP2");
	var spanScoreP1 = document.getElementById("spanScoreP1");
	var spanScoreP2 = document.getElementById("spanScoreP2");
	var inpScoreP1 = document.getElementById("inpScoreP1");
	var inpScoreP2 = document.getElementById("inpScoreP2");
	var divWinner = document.getElementById("divWinner");
	var divMinuteur = document.getElementById("divMinuteur");
	var resetGame = document.getElementById("resetGame");

	// Dissimulation des boutons d'accueil
	joueurVsIA.style.display = 'none';
	iaVsIA.style.display = 'none';

	// Affichage et démarrage du minuteur et affichage du bouton "recommencer"
	divMinuteur.style.display = '';
	minuteurStart();
	minuteur();
	resetGame.style.display = '';

	// Remplissage des éléments HTML en fonction du type de la partie (joueur vs IA / IA vs IA)
	if(type == 0){
		var joueurPFC = document.getElementById("joueurPFC");
		joueurPFC.style.display = '';
		spanScoreP1.innerHTML = 'Score joueur 1';
		inpScoreP1.value = "0";
		divScoreP1.style.display = '';
		spanScoreP2.innerHTML = 'Score de l\'IA';
		inpScoreP2.value = "0";
		divScoreP2.style.display = '';
		divWinner.innerHTML = '';
		divWinner.style.display = '';
	} else{
		divScoreP1.innerHTML += 'Score de l\'IA 1';
		divScoreP1.style.display = '';
		divScoreP2.innerHTML += 'Score de l\'IA 2';
		divScoreP2.style.display = '';
		divWinner.style.display = '';
	}

	// Retourne le gagnant d'une manche
	this.manche = function(player1, player2, inpScoreP1, inpScoreP2, divWinner, players){
		var scoreP1 = 0;
		var scoreP2 = 0;

		// 1 == pierre ; 2 == feuille ; 3 == ciseaux
		if(player1 == 1){
			if(player2 == 2){
				scoreP2++;
			} else if(player2 == 3){
				scoreP1++;
			}
		} else if(player1 == 2){ 
			if(player2 == 1){
				scoreP1++;
			} else if(player2 == 3){
				scoreP2++;
			}
		} else if(player1 == 3){ 
			if(player2 == 1){
				scoreP2++;
			} else if(player2 == 2){
				scoreP1++;
			}
		}

		var winner;
		var totalP1 = document.getElementById(inpScoreP1);
		var totalP2 = document.getElementById(inpScoreP2);
		if(scoreP1 > scoreP2){
			totalP1.value++;
			if(players == 0){
				winner = "Player 1 gagne la manche";
			}
		} else if(scoreP2 > scoreP1){
			totalP2.value++;
			if(players == 0){
				winner = "L'IA gagne la manche";
			}
		} else{
			if(players == 0){
				winner = "Égalité sur la manche";
			}
		}
		document.getElementById(divWinner).innerHTML = winner;
		return winner;
	}

	// Retourne le gagnant d'une partie
	this.getWinner = function(inpScoreP1, inpScoreP2, divWinner, type){
		var scoreP1 = document.getElementById(inpScoreP1).value;
		var scoreP2 = document.getElementById(inpScoreP2).value;
		var winner = document.getElementById(divWinner);
		if(scoreP1 > scoreP2){
			if(type == 0){
				winner.innerHTML = "Player 1 gagne la partie";
			} else{
				winner.innerHTML = "L'IA 1 gagne la partie";
			}
		} else if (scoreP1 < scoreP2){
			if(type == 0){
				winner.innerHTML = "L'IA gagne la partie";
			} else{
				winner.innerHTML = "L'IA 2 gagne la partie";
			}
		} else{
			winner.innerHTML = "Égalité";
		}
		return winner;
	}

	resetGame.onclick = function(){
		if(confirm("Recommencer la partie annulera celle en cours.\nVoulez vous continuer ?")){
			minuteurStop();
			minuteurReset();
			var partie = new Partie(type);
		}
	}
}

// Minuteur d'une heure
var start = 0;
var timerID = 0;
function minuteur(){
	end = new Date();
	var diff = start - end;
	diff = new Date(diff);
	var sec = diff.getSeconds();
	var min = diff.getMinutes();
	var hr = diff.getHours();
	if (min < 10){
		min = "0" + min;
	}
	if (sec < 10){
		sec = "0" + sec;
	}

	document.getElementById("minuteur").value = hr + ":" + min + ":" + sec;
	var timer = document.getElementById("minuteur").value;
	if(timer != "0:00:00"){
		timerID = setTimeout("minuteur()", 1000);
	} else{
		timer = "Temps écoulé !";
		minuteurReset();
		minuteurStop();
	}
	return timer;
}

// Lance le minuteur
function minuteurStart(){
	start = new Date();
	minuteur();
}

// Arrête le minuteur
function minuteurStop(){
	clearTimeout(timerID);
}

// Remise à zéro du minuteur
function minuteurReset(){
	document.getElementById("minuteur").innerHTML = "0:00:00";
	start = new Date();
}
