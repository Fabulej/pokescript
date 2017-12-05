var life=10;
var rivalLife=10;
var playerChoice;
var pause;
var endgame = false;

var pokemon = {
	'0':'Bulbasaur',
	'1':'Squirtle',
	'2':'Charmander',
	'3':'Pikachu',
	'4':'Sandshrew',
	'5':'Snorlax'
};

var rivalChoice = {
	init: function() {
		this.rivalPokemon = Math.floor(Math.random() * 6);
		this.pokemonName = pokemon[this.rivalPokemon];
	},
	rivalPokemon: '',
	pokemonName: ''
};

function pokemonAttack(attacker, defender){
	// super effective
	if ((attacker=== 0 && defender === 1) ||
	(attacker===1 && (defender === 2 || defender === 4)) ||
	(attacker===2 && defender === 0) ||
	(attacker===3 && defender === 1) ||
	(attacker===4 && (defender === 2 || defender === 3))) {
		console.log("super");
		return 4;
	// not very effective
}	else if ((attacker===0 && (defender === 0 ||  defender ===2)) ||
	(attacker===1 && (defender === 0 || defender === 1)) ||
	(attacker===2 && (defender === 1 || defender === 2 || defender === 4)) ||
	(attacker===3 && (defender === 0 || defender === 3 || defender === 4)) ||
	(attacker===4 && defender === 0)) {
		console.log("notsuper");
		return 1;
	// no effect
	} else if (attacker === 3 && defender === 4) {
		return 0;
	// regular attack
	} else {
		return 2;
	}
}

var commentator = document.querySelector('p');
printSentence('Rozpocznij walkę!');

var header = document.querySelector('h1');
header.innerText = 'Wybierz swojego pokemona';

function printSentence(sentence){
  pause = true;
  for(var i = 0; i < sentence.length; i++){
    (function(index) {
      setTimeout(function() {
      	if (sentence[index] === ' ') {
      		commentator.innerText += ('\xa0');
      	}
        commentator.innerText+=sentence[index];
        if (index+1 === sentence.length) {
            if (endgame === false) {
                pause = false;
            }
        }
      }, 20 * i);
    })(i);
  }
}

function assignClick(tag, pos) {
    tag.addEventListener('click', function(){
        if (pause === false) {
            commentator.innerText = '';
            playerChoice = pos;
            rivalChoice.init();
            rivalDmg = pokemonAttack(rivalChoice.rivalPokemon, playerChoice);
            playerDmg = pokemonAttack(playerChoice, rivalChoice.rivalPokemon);
            rivalLife-= playerDmg;
            life -= rivalDmg;
            printSentence(('Pokemonem przeciwnika jest ' +rivalChoice.pokemonName + '!\nJego atak zadał Ci '
             + rivalDmg + ' pkt obrażeń.'+'\nTwoj ' +pokemon[pos] + ' zadał przeciwnikowi '
             + playerDmg + ' pkt obrażeń.\nZostało Ci ' + life + ' pkt życia.'
             +'\nPreciwnikowi zostało ' + rivalLife + ' pkt życia.'));
            if (life<1 && rivalLife < 1) {
                endgame = true;
                header.innerText = 'Zremisowałeś pojedynek!'
            } else if (rivalLife < 1) {
                header.innerText = 'JESTEŚ MISTRZEM POKEMON!!! ';
                endgame = true;
            } else if (life < 1){
                header.innerText = 'Odniosłeś porażkę...'
                endgame = true;
            }
        } else if (endgame === true) {
            window.location.reload();
        }
    })

}

var images = {
	tags: document.getElementsByTagName('img'),
	init: function() {
		for(var i = 0; i < this.tags.length; i++) {
			assignClick(this.tags[i], i);
		}
	}
}

images.init();
