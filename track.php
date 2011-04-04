<h1>This page adds entries to the locations db</h1>
<p>The required params are: </p>
<ul>
<li>runname</li>
<li>lat</li>
<li>lon</li>
<li>speed</li>
<li>heading</li>
</ul>

<?php
include 'setup.php';
include 'opendb.php';

$logquery = sprintf("INSERT INTO LocationsLog (Log) VALUES ('%s')", mysql_real_escape_string($_SERVER['REQUEST_URI']));
mysql_query($logquery);

$name = htmlentities($_GET["runname"]);
$lat = $_GET["lat"];
$lon = $_GET["lon"];
$speed = $_GET["speed"];
$heading = $_GET["heading"];

echo "Adding the RunName: $name, lat: $lat, long: $lon, speed: $speed and heading: $heading to the database";

if(!empty($name) && !empty($lat) && !empty($lon)) {

	if (!empty($speed))
		$query = sprintf("INSERT INTO Locations (RunName, Lat, Lon, Speed) VALUES('%s', %s, %s, %s)", mysql_real_escape_string($name), mysql_real_escape_string($lat), mysql_real_escape_string($lon), mysql_real_escape_string($speed));
	else
		$query = sprintf("INSERT INTO Locations (RunName, Lat, Lon) VALUES('%s', %s, %s)", mysql_real_escape_string($name), mysql_real_escape_string($lat), mysql_real_escape_string($lon));

	// Perform Query
	$result = mysql_query($query);

	// Check result
	// This shows the actual query sent to MySQL, and the error. Useful for debugging.
	if (!$result) {
	    $message  = 'Invalid query: ' . mysql_error() . "\n";
	    $message .= 'Whole query: ' . $query;
	    die($message);
	} 

}

include 'closedb.php';
?>
