<?php
include 'setup.php';
include 'core.php';
$name = trim($_GET["name"]);
$lastId = trim($_GET["lastId"]);

if (empty($lastId))
    $lastId = 0;


if (!empty($name)) {
	include 'opendb.php';

	header('Cache-Control: no-cache, must-revalidate');
	header('Content-type: application/json');
	
	// Performing SQL query
	$query = sprintf("SELECT Id, Lat, Lon, Speed, Heading, Created FROM Locations WHERE RunName = '%s' AND Id > %s ORDER BY Id DESC", mysql_real_escape_string($name), mysql_real_escape_string($lastId));
	$result = mysql_query($query) or die('Query failed: ' . mysql_error());
    
    $currentRun = new Run();
    $currentRun->name = $name;
    
	$values = array();
	while ($line = mysql_fetch_array($result, MYSQL_ASSOC)) {
	    $values[] = Location::Create($line["Id"], $line["Lat"],$line["Lon"], $line["Speed"], $line["Heading"], $line["Created"]);
	}
	$currentRun->addLocations($values);
	echo json_encode($currentRun);

	// Free resultset
	mysql_free_result($result);

	include 'closedb.php';
}
?>
