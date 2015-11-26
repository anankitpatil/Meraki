<?php

class About extends Controller {
	
	function index()
	{
		$template = $this->loadView('about');
		$template->render();
	}
	
}

?>
