<?php

// This is an example opendb.php
$conn = mysql_connect($dbhost, $dbuser, $dbpass) or die                      ('Error connecting to mysql');
mysql_select_db($dbname);
mysql_query("SET time_zone = '+1:00'"); //Set the timezone to GMT + 1
?>
