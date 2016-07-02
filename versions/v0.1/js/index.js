/*
TODO

*/


/*
 level = 0 => 'indetereminated yet'
*/

window.onload = function() {
/*
$('.modalBox').modalBox({
    'width':'500px',
    'height':'500px'
});*/

var selectedCategories = []; //= [0,1,2,3,4,5,6];

var Selectedlevel = $('#levels').val();



$.each(categoriesInfo, function(val, text) {
	$('#categories').append( $('<option '+text.status+'></option>').val(val).html(text.title+" ("+categories[val].length+")") );
	if(text.status==="selected")
		selectedCategories.push(val);
});


$.each(levels, function(val, text) {
	if(val == 0)
		$('#levels').append( $('<option></option>').val(val).html(text) );
	else
           $('#levels').append( $('<option disabled></option>').val(val).html(text) );
});

$('#levels').SumoSelect();

$('#categories').SumoSelect(
{
	okCancelInMulti:true,
	placeholder: 'Select Here',
	selectAll : true,
	selectAlltext : 'Select All'
});

$( "#levels" ).change(function() {
	Selectedlevel = $('#levels').val();
	reset();
});

$( "#categories" ).change(function() {
	selectedCategories = [];
	$('#categories :selected').each(function(i, selected){
		selectedCategories[i] = $(selected).val();
		reset();
		console.log(selectedCategories);
	});
});




  //var categoriesName; // Array of topics
  //var categories; // Array of topics
  var chosenCategory; // Selected catagory
  var getHint; // Word getHint
  var word; // Selected word
  var guess; // Geuss
  var geusses = []; // Stored geusses
  var lives; // Lives
  var counter; // Count correct geusses
  var space; // Number of spaces in word '-'
  var block;
  var ChosenCategoryIndex;
  var chosenLevel;

  // Get elements
  var showLives = document.getElementById("mylives");
  var showCatagory = document.getElementById("scatagory");
  var getHint = document.getElementById("hint");
  var showClue = document.getElementById("clue");

  // create alphabet ul
  var buttons = function() {
    myButtons = document.getElementById('buttons');
    letters = document.createElement('ul');

    for (var i = 0; i < alphabet.length; i++) {
	//if(i==28) letters.innerHTML = letters.innerHTML + '<br/><br/>';
      letters.id = 'alphabet';
      list = document.createElement('li');
      list.id = 'letter';
      list.className = "letter";
      list.innerHTML = alphabet[i];
      check();
      myButtons.appendChild(letters);
      letters.appendChild(list);
    }
  }
	

  // Select Catagory
  var selectCat = function() {
	catagoryName.innerHTML = 'The chosen category is <span class="ctg">' + categoriesInfo[ChosenCategoryIndex].title + "</span>";
  }

  // Create geusses ul
  result = function() {
    wordHolder = document.getElementById('hold');
    correct = document.createElement('ul');

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

  // Show lives
  comments = function() {
    showLives.innerHTML = "You have " + lives + " lives";
    var link;

    if(ChosenCategoryIndex == 0 || ChosenCategoryIndex == 2 || ChosenCategoryIndex == 3)	link = word;
    else link = '<a target="_blank" href="http://www.almaany.com/en/dict/ar-en/'+word+'">' + word + "</a>";
	 

    if (lives < 1) {
      showLives.innerHTML = 'Game Over - the answer was : <span class="ctg">'+link+'</span>';
      block = true;
    }
    for (var i = 0; i < geusses.length; i++) {
      if (counter + space === geusses.length) {
        showLives.innerHTML = 'You Win! - the answer is : <span class="ctg">'+link+'</span>';
        block = true;
      }
    }
  }

  // Animate man
  var animate = function() {
    var drawMe = lives;
    drawArray[drawMe]();
  }


  // Hangman
  canvas = function() {

    myStickman = document.getElementById("stickman");
    context = myStickman.getContext('2d');
    context.beginPath();
    context.strokeStyle = "#fff";
    context.lineWidth = 2;
  };

  head = function() {
    myStickman = document.getElementById("stickman");
    context = myStickman.getContext('2d');
    context.beginPath();
    context.arc(60, 25, 10, 0, Math.PI * 2, true);
    context.stroke();
  }

  draw = function($pathFromx, $pathFromy, $pathTox, $pathToy) {

    context.moveTo($pathFromx, $pathFromy);
    context.lineTo($pathTox, $pathToy);
    context.stroke();
  }

  frame1 = function() {
    draw(0, 150, 150, 150);
  };

  frame2 = function() {
    draw(10, 0, 10, 600);
  };

  frame3 = function() {
    draw(0, 5, 70, 5);
  };

  frame4 = function() {
    draw(60, 5, 60, 15);
  };

  torso = function() {
    draw(60, 36, 60, 70);
  };

  rightArm = function() {
    draw(60, 46, 100, 50);
  };

  leftArm = function() {
    draw(60, 46, 20, 50);
  };

  rightLeg = function() {
    draw(60, 70, 100, 100);
  };

  leftLeg = function() {
    draw(60, 70, 20, 100);
  };

  drawArray = [rightLeg, leftLeg, rightArm, leftArm, torso, head, frame4, frame3, frame2, frame1];






/*
On Click : 2 ways by keypress or mouse click on the .letter
*/


// On keypress
$(document).on("keypress", function (e) {
	var codek = e.which;
	if(!block){
		if(codek>1568 && codek<1611){
			geuss = unicodeTable[codek-1569];
			console.log("Keyboard input : "+ codek+" - "+geuss);
			$( ".letter:contains('"+geuss+"')" ).attr({"class": "active"});
			checkLetter();
		}
	}
});

// OnClick Function
check = function() {
	list.onclick = function() {
		if(!block){
			/*var*/ geuss = (this.innerHTML);
			this.setAttribute("class", "active");
			this.onclick = null;
			checkLetter();
		}
	}
}

checkLetter = function() {

	//$('#play').play();
	//document.getElementById('play').play();
	for (var i = 0; i < word.length; i++) {
		if (word[i] === geuss) {
			geusses[i].innerHTML = geuss;
			counter += 1;
		}
	}
		var j = (word.indexOf(geuss));
	if (j === -1) {
		lives -= 1;
		comments();
		animate();
	} else {
		comments();
	}
}



/*
Play - reset - hint Functions
*/


  // Play
  play = function() {
    ChosenCategoryIndex = selectedCategories[Math.floor(Math.random() * selectedCategories.length)];
    chosenCategory = categories[ChosenCategoryIndex];
    console.log(ChosenCategoryIndex);
    console.log(chosenCategory);
    row = chosenCategory[Math.floor(Math.random() * chosenCategory.length)];
    word = row.word;

    //word = word.replace(/\s/g, "-");
    console.log(word);
    buttons();

    geusses = [];
    lives = 10;
    counter = 0;
    space = 0;
    block = false;
    result();
    comments();
    selectCat();
    canvas();


  }

  reset = function() {
    correct.parentNode.removeChild(correct);
    letters.parentNode.removeChild(letters);
    showClue.innerHTML = "";
    context.clearRect(0, 0, 400, 400);
    play();
  }

  play();

  // Hint
  hint.onclick = function() {
	//if(!block){
		console.log(row.hint);
		showClue.innerHTML = "Clue: - " + row.hint;
	//}
  };


  // Reset
  document.getElementById('reset').onclick = function() {
	reset();
  }
}
