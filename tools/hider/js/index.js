/*
حفظ الإدخالات (تحت الإنشاء من أجل تصميم قاعدة بيانات )
ادخالها تحت أنواعها مثلا سءال كلمة معيارية كي تحفظ لقاعدة بيانات هذه الالعاب
مع كل اختيار حرف يتم نسخ الكلمة آليا
*/

$(document).ready(function(){

	$( ".show_hide" ).click(function() {
		
	   $('.slidingDiv').toggle();
	
	});
});

/*
	Onload
*/

window.onload = function() {

	var word; // Selected word
	var guess; // Geuss
	var geusses = []; // Stored geusses
	var space; // Number of spaces in word '-'
	var block;
	var copyword, fword, action="";
	var counter = 0;
	
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

	var url_params = location.hash.slice(1).split("_");
	
	if(url_params.length>1){
		$("#word").val(url_params[1]);
		$("#tag").val(url_params[2]);
		
		if(url_params[0] == "معميّة"){
			//alert("معميّة");
			$("#process").click();
		}
			
		else if(url_params[0] == "مبعثرة"){
			$("#shuffle").click();
			//alert("مبعثرة");
		}

		
	}

	
  var save = function (action) {
		$.ajax({
			type: "POST",url: 'log.php', data: {
				user: $("#user").val(),
				category: $("#category").val(),
				type: action,
				question: $("#tag").val(),
				

				word: $("#word").val(),
				fword: fword,

				ref: document.referrer
			},success: function(data){}});
		 //console.log('$log >'+" : "+word);
	}
	
	
	
	
	function copy(){
		copyword = "";
		for (var i = 0; i < word.length; i++) {
				copyword =  copyword + $( "#my-word li:eq("+i+")" ).text() + " ";
				if($( "#my-word li:eq("+i+")" ).html() == "&nbsp;&nbsp;")
					copyword += "  "+" - "+"  ";
		}
		
		fword = copyword;
		
		if($("#tag").val())
			copyword = $("#tag").val()+" : [ "+copyword+" ]؛";

		if($("#counter").is(':checked'))
			copyword = counter+"- "+copyword;
			
		$("#copy").attr({'data-clipboard-text':copyword});
		
		$("#copy").click();
		//$('#copy').trigger('click');
		//console.log(copyword);
	}
	
	
	function erease(){
		$("#hold").empty();
		$("#buttons").empty();
	}

  // Hang
	document.getElementById('process').onclick = function() {
		erease();
		word =  $("#word").val();
		
		getButtons(word);
		geusses = [];
		space = 0;
		counter++;
		
		result();
		copy();	
		
		if($("#store").is(':checked'))
			save("معميّة");
	}

  // shuffle
  document.getElementById('shuffle').onclick = function() {
  	 erease();
  	 word =  $("#word").val();
  	 counter++;
  	 
  		 copyword = word.split('').sort(function(){return 0.5-Math.random()}).join(' ');
		
		if($("#store").is(':checked'))
			save("مبعثرة");
			
		 $("#hold").text(copyword);
		 $("#shuffle").attr( {'data-clipboard-text': counter+"- "+$("#tag").val()+" : [ "+copyword+" ]؛"} );


  }
 
  // Reset
  document.getElementById('reset').onclick = function() {
		$("#tag").val("");
		$("#word").val("");
		erease();
  }
  
  
  // copy
  document.getElementById('copy').onclick = function() {

  }
  


	
  //var clipboard = new Clipboard('.cpybtn', {'text':copyword} );

}