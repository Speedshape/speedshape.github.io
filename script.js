		// I USED CHAT GPT TO HELP ME WRITE THIS CODE MORE ELEGANT AND COMPACT!!

		// Eine Liste mit SVG-Pfad-Strings für verschiedene Formen.
		const figureList = [
		  '<path d="m5 150c0-80.08 64.92-145 145-145v0c80.08 0 145 64.92 145 145v0c0 80.08-64.92 145-145 145v0c-80.08 0-145-64.92-145-145v0z" />',
		  '<polygon points="150,10 290,290 10,290"/>',
		  '<path d="m10 10h280v280h-280v-280z" />',
		  '<polygon points="300,150 225,280 75,280 0,150 75,20 225,20"></polygon>'
		];


		// Verschiedene DOM-Elemente werden in Variablen gespeichert.
		const border = document.getElementById('borderIcon');
		const score = document.getElementById('score');
		const player = document.getElementById("playerIcon");

		// Maximalgrößen für den Rahmen und das Spielfeld werden festgelegt.
		const maxGameSize = (Math.round(window.innerWidth * 0.4) < 698) ? window.innerWidth : (window.innerWidth * 0.4);
		const maxBorderSize = Math.max(300, (maxGameSize * 0.65));

		// Die Breite des Spielfelds wird auf die maximale Größe gesetzt.
		document.getElementById("game").style.width = `${maxGameSize}px`;

		// Zählervariable für den Punktestand, Variablen für die Kontrolle des Rahmenwachstums und die Rahmenveränderungsdauer.
		let counter = 0;
		let borderController;
		let duration;
		// Die play()-Funktion wird aufgerufen, wenn der Startbutton gedrückt wird.
		function play() {
		  duration = window.innerWidth < 600 ? 38 : 33;
		  document.getElementById('lostScreen').style.display = "none";
		  document.getElementById('startScreen').style.display = "none";
		  document.getElementById('main').style.display = "flex";
		  counter = 0;
		  score.textContent = `Score: ${counter}`;
		  borderSeter();
		}

		// Die changePlayer()-Funktion ändert das Spieler-Icon, wenn der Spieler die entsprechende Taste drückt.
		function changePlayer(p) {
		  const figures = {
		    "circle": 0,
		    "triangle": 1,
		    "square": 2,
		    "hexagon": 3
		  };
		  player.innerHTML = figureList[figures[p]];
		}

		// Eine Funktion, um eine zufällige Farbe zu generieren.
		function getRandomColor() {
		  let color = '#';
		  for (let i = 0; i < 6; i++) {
		    color += Math.floor(Math.random() * 16).toString(16);
		  }
		  return color;
		}

		// Eine Event-Listener-Funktion, die auf Tastendrücke reagiert und das Spieler-Icon entsprechend ändert.
		document.addEventListener('keypress', logKey);
		function logKey(e) {
		  const key = e.code;
		  const figures = {
		    "KeyW": "circle",
		    "KeyA": "triangle",
		    "KeyS": "square",
		    "KeyD": "hexagon"
		  };
		  if (figures[key]) {
		    changePlayer(figures[key]);
		  }
		}

		// Diese Funktion zählt das erreichte Score und zeigt es an, außerdem wird die Periodendauer reduziert um das Spiel zu verschnellern
		function addScore() {
		  counter++;
		  score.textContent = `Score: ${counter}`;
		  if (counter % 3 === 0 && duration > 15) {
		    duration--;
		  }
		}

		// Border/Rahmen Kontrollfunktion
		function borderSeter() {
		  // eine zufällige Farbe und Form wird ausgesucht 
		  const randomFigure = figureList[Math.floor(Math.random() * figureList.length)];
		  border.innerHTML = (border.innerHTML === randomFigure) ? figureList[(figureList.indexOf(randomFigure) + 1) % figureList.length] : randomFigure;
		  border.style.stroke = getRandomColor();



		  // Dieser Teil der Funktion richtet die Rahmen größe und verkleinert es mit dem Abstand 'duration'
		  let width = maxBorderSize;
		  borderController = setInterval(function() {
		  	// Sollte der Rahmen die größe des Spielers erreichen dann die Funktion 'check()' ausgerufen.
		    if (width >= 110) {
		      width -= 10;
		      border.style.width = `${width}px`;
		    } else {
		      check();
		    }
		  }, duration);
		}

		// Kontrolliert ob der Spieler die Gleiche Form wie den Rahmen hat
		function check() {
		  	// ...die Funktion für den Border/Rahmen wird neu gestartet 
			  if (border.innerHTML == player.innerHTML) {
			    clearInterval(borderController);
			    border.style.width = `${maxBorderSize}px`;
				player.style.fill=border.style.stroke;
			    addScore();
			    borderSeter();
			  } else {
			  	// Kümmert sich um den Highscore.
			  	localStorage.setItem("highscoreSpeedShape", Math.max(counter, localStorage.getItem("highscoreSpeedShape") || 0));
			  	// ist das nicht der Fall wird das Spiel angehalten und der Spieler bekommt den 'lostScreen' angezeigt
			    clearInterval(borderController);
				document.getElementById('lostScreenScore').textContent = `Your Score is ${counter}`;
				document.getElementById('lostScreenHighScore').textContent = `Your High Score is ${localStorage.getItem("highscoreSpeedShape")}`;

			    document.getElementById('lostScreen').style.display = "flex";
			    document.getElementById('main').style.display = "none";
			  }
		}
