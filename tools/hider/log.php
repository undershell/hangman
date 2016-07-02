<?php
/*
$input = array(0=>"", 1=>"-",2=>"-", 3=>"-");

if(isset($_POST['org']) and $_POST['org']!=""){
	$input[0] = $_POST['org'];
	
	if(isset($_POST['input']) and $_POST['input']!=""){
		$input[1] = $_POST['input'];
	}
	if(isset($_POST['option']) and $_POST['option']!=""){
		$input[2] = $_POST['option'];
	}
	if(isset($_POST['ref']) and $_POST['ref']!=""){
		$input[3] = $_POST['ref'];
	}
	
	if($input[0] == "dict")
		$log = fopen("log.php", 'a');
	else
		$log = fopen("tracklog.html", 'a');

	fwrite($log, "<b>Time : </b>".date("c")."<br/>");

	fwrite($log, "<b>Origin : </b><b style='color:red'>".$input[0]."</b><br/>");
	fwrite($log, "<b>input : </b>".$input[1]."<br/>");
	fwrite($log, "<b>Option : </b>".$input[2]."<br/>");
	fwrite($log, "<b>Ref : </b>".$input[3]."<br/>");
	if(isset($_SERVER['REMOTE_ADDR'])) fwrite($log, "<b>ID : </b>".$_SERVER['REMOTE_ADDR']."<br/>");
	if(isset($_SERVER['HTTP_REFERER'])) fwrite($log, "<b>REF : </b><a href=".$_SERVER['HTTP_REFERER'].">".$_SERVER['HTTP_REFERER']."</a><br/>");
	if(isset($_SERVER['HTTP_USER_AGENT'])) fwrite($log, "<b>Agent : </b>". $_SERVER['HTTP_USER_AGENT']."<hr/>");
	fclose($log);
}else{*/


$input = array(0=>"", 1=>"",2=>"", 3=>"",4=>"", 5=>"", 6=>"");

	//$input[9] = $_POST['game'];
	
	if(isset($_POST['user']) and $_POST['user']!=""){
		$input[0] = $_POST['user'];
	}	
	if(isset($_POST['type']) and $_POST['type']!=""){
		$input[1] = $_POST['type'];
	}
	if(isset($_POST['question']) and $_POST['question']!=""){
		$input[2] = $_POST['question'];
	}
	if(isset($_POST['word']) and $_POST['word']!=""){
		$input[3] = $_POST['word'];
	}
	if(isset($_POST['fword']) and $_POST['fword']!=""){
		$input[4] = $_POST['fword'];
	}
	if(isset($_POST['category']) and $_POST['category']!=""){
		$input[6] = $_POST['category'];
	}

	if(isset($_POST['ref']) and $_POST['ref']!=""){
		$input[5] = $_POST['ref'];
	}
	
$log = fopen("saved.html", 'a');
//fwrite($log, "<b>Time : </b>".date("c")." | ");
fwrite($log, "<tr>");
fwrite($log, "<td>".$input[1]."</td>");
fwrite($log, "<td>".$input[0]."</td>");
fwrite($log, "<td>".$input[2]."</td>");
fwrite($log, "<td><b>".$input[3]."</b></td>");
fwrite($log, '<td style="display:none;">'.$input[6]."</td>");
fwrite($log, "<td>".'<button type="button" onclick="window.open(\'index.html#'.$input[1]."_".$input[3]."_".$input[2].'\')">العب</button></td>');
fwrite($log, "</tr>");

fclose($log);


?>