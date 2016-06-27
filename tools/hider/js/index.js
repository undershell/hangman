
/*
	Onload
*/

window.onload = function() {

	var word; // Selected word
	var guess; // Geuss
	var geusses = []; // Stored geusses
	var space; // Number of spaces in word '-'
	var block;
	var copyword;
	
/*
	Loading Data
*/
	// remove space

	// remove duplicated letters
	function noDups( s ) {
	  var chars = {}, rv = '';
	  for (var i = 0; i < s.length; ++i) {
	    if (!(s[i] in chars) && s[i]!=" ") {
	      chars[s[i]] = 1;
	      rv += s[i];
	    }
	  }
	  return rv;
	}

	// create alphabet ul
	function getButtons(word) {
		 bword = noDups(word);
		 myButtons = document.getElementById('buttons');
		 myButtons.appendChild(document.createElement('hr'));
		 letters = document.createElement('ul');
		
		for (var i = 0; i < bword.length; i++) {
			letters.id = 'alphabet';
			list = document.createElement('li');
			list.id = 'letter';
			list.className = "letter";
			list.innerHTML = bword[i];
			check();
			myButtons.appendChild(letters);
			letters.appendChild(list);
		}
	}
	
  // Create geusses ul
 var result = function() {
    var wordHolder = document.getElementById('hold');
    var correct = document.createElement('ul');

    for (var i = 0; i < word.length; i++) {
      correct.setAttribute('id', 'my-word');
      guess = document.createElement('li');
      guess.setAttribute('class', 'guess');
      if (word[i] === " ") {
        guess.innerHTML = "&nbsp;&nbsp;";
        space = space + 1;
      } else {
        guess.innerHTML = "_";
      }

      geusses.push(guess);
      wordHolder.appendChild(correct);
      correct.appendChild(guess);
    }
    
  }

	// OnClick Function
	check = function() {
		list.onclick = function() {
			if(!block){
				guess = (this.innerHTML);
				this.setAttribute("class", "active");
				this.onclick = null;
				
				for (var i = 0; i < word.length; i++) {
					if (word[i] === guess) {
						geusses[i].innerHTML = guess;
						//counter += 1;
					}
					
				}
				copy();
			}
		}
	}


/*
	Play - reset - hint Functions
*/

	var clipboard = new Clipboard('.cpybtn');
	
	function copy(){
		copyword = "";
		for (var i = 0; i < word.length; i++) {
				copyword =	copyword + $( "#my-word li:eq("+i+")" ).text();
				if($( "#my-word li:eq("+i+")" ).html() == "&nbsp;&nbsp;")
					copyword += " - ";
		}
				
		$("#copy").attr({'data-clipboard-text':copyword});
		$("#copy").click();
		
	}
	
	
	function erease(){
		$("#hold").empty();
		$("#buttons").empty();
	}
	
	document.getElementById('process').onclick = function() {
		erease();
		word =  $("#word").val();
		getButtons(word);
		geusses = [];
		space = 0;
		result();
		copy();	

	}
  
  
  // Reset
  document.getElementById('reset').onclick = function() {
		erease();
  }
  
  
  // copy
  document.getElementById('copy').onclick = function() {

  }
  
  
	
  //var clipboard = new Clipboard('.cpybtn', {'text':copyword} );

}