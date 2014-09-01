<?php
	class queryclass {
	    var $queryout;
	    var $querycolumns;

	   function __construct( $e, $t ){
		   $this->queryout = $e;
		   $this->querycolumns = $t;
		}

	    function query1() {
	    	$query = mysql_query("SELECT * FROM players");
			$rowsiii = array();
			while($rowttt = mysql_fetch_assoc($query)) {
		    	$rowsiii[] = $rowttt;
			}
			echo json_encode($rowsiii);
	    }

		function query2() {
	    	mysql_query("INSERT INTO round2(id,name,points) SELECT id,name,SUM(points) AS points FROM round1 GROUP BY id asc limit 10");
			echo json_encode(array());
	    }

	    function query3() {
	    	mysql_query("INSERT INTO round3(id,name,points) SELECT id,name,SUM(points) AS points FROM round2 GROUP BY id asc limit 5");
			echo json_encode(array());
	    }

	    function query4() {
	    	$id = $this->querycolumns[0];
	    	$name = $this->querycolumns[1];
	    	$points = $this->querycolumns[2];
	    	$query = mysql_query("INSERT INTO round1 (id,name,points) VALUES ('$id','$name','$points')");
			$rowsiii = array();
			echo json_encode($rowsiii);
	    }

		function query5() {
	    	$id = $this->querycolumns[0];
	    	$name = $this->querycolumns[1];
	    	$points = $this->querycolumns[2];
	    	$query = mysql_query("INSERT INTO round2 (id,name,points) VALUES ('$id','$name','$points')");
			$rowsiii = array();
			echo json_encode($rowsiii);
	    }

		function query6() {
	    	$id = $this->querycolumns[0];
	    	$name = $this->querycolumns[1];
	    	$points = $this->querycolumns[2];
	    	$query = mysql_query("INSERT INTO round3 (id,name,points) VALUES ('$id','$name','$points')");
			$rowsiii = array();
			echo json_encode($rowsiii);
	    }

		function query8() {
			$roundtable = $this->querycolumns[0];
			$roundtable = "round".$roundtable;
	    	$query = mysql_query("SELECT * FROM $roundtable");
			$rowsiii = array();
			while($rowttt = mysql_fetch_assoc($query)) {
		    	$rowsiii[] = $rowttt;
			}
			echo json_encode($rowsiii);
	    }

		function query9() {
	    	mysql_query("DELETE FROM round1");
	    	mysql_query("DELETE FROM round2");
	    	mysql_query("DELETE FROM round3");
			$rowsiii = array();
			echo json_encode($rowsiii);
	    }

	    function query10() {
	    	$query = mysql_query("SELECT id,name,SUM(points) AS points FROM round3 GROUP BY id asc limit 1");
			$rowsiii = array();
			while($rowttt = mysql_fetch_assoc($query)) {
		    	$rowsiii[] = $rowttt;
			}
			echo json_encode($rowsiii);
	    }
	}

	include_once 'db_connect.php';
	$queryout = (int) $_POST['queryout'];
	$newquery = new queryclass( $queryout, json_decode(stripslashes($_POST['querycolumns'])));
	for ($x=1; $x<=10; $x++) { if($queryout == $x) { $call = ("query".$x); } } 
	$newquery->$call();
?>