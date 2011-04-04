<?php

class Location
{
	public $id;
	public $lat;
	public $lon;
	public $speed;
	public $heading;
	public $created;
	public $isKeyPoint = false;

	public static function Create($id, $lat, $lon, $speed, $heading, $created)
	{
		$loc = new Location();
		$loc->id = $id;
		$loc->lat = $lat;
		$loc->lon = $lon;
		$loc->speed = $speed;
		$loc->heading = $heading;
		$loc->created = $created;
		return $loc;
	}
}

class Run
{
	public $name;
	public $locations = array();
	public $startTime;

	public function addLocations($locs)
	{
        $count = 0;
		foreach($locs as $loc)
		{
		    //echo "adding location " . $loc->id . " created: " . $loc->created;
			if($count == count($locs) - 1)
			    $this->startTime = $loc->created;
			  
			if($count % 5 == 0 || $count == count($locs) - 1)
			    $loc->isKeyPoint = true;
			    
   			$this->locations[] = $loc;
   			
            $count++;
		}
	}
	
	public function getAvegareSpeed()
	{
		return "";
	}
	
}


?>
