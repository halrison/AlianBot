<?php
	session_start();
	$item=$_REQUEST['item'];
	$id=$_REQUEST['id'];	
	$user=$_SESSION['user'];
	$con=new PDO('mysql:host=fakehost,db=alianobt','fakeuser','fakepw');
	switch ($item) {
	case 'command':
		$sql=$con->prepare('delete from Commands where ID=:id');
		$sql->execute($id);
		break;	
	case 'request':
		$sql=$con->prepare('delete from Requests where ID=:id');
		$sql->execute($id);
		break;
	case 'user':
		$sql=$con->prepare('delete from Members where UserName=:user');
		$sql->execute($user);
	}
	$con=null;
