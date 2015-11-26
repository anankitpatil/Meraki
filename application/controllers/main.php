<?php

class Main extends Controller {
	
	function index()
	{
		$template = $this->loadView('home');
		$template->render();
	}
	
}

?>
