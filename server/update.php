<?php
	session_start();
	$item=$_REQUEST['item'];
	$username=$_SESSION['user'];
	$id=$_REQUEST['id'];
	$keyword=$_REQUEST['keyword'];
	$response=$_REQUEST['response'];
	$nickname=$_REQUEST['nickname'];
	$password=$_REQUEST['password'];
	$status=$_REQUEST['status'];
	$con=new PDO('mysql:host=fakehost,db=alianbot','fakeuser','fakepw');
	switch ($item) {
		case 'command':
			$sql=$con->prepare('update Commands set Keyword=:keyword,Response=:response where ID=:id');
			$sql->bindParam(':keyword',$keyword);
			$sql->bindParam(':response',$response);
			$sql->bindParam(':id',$id);
			if ($sql->execute()) {
				$sql=$con->prepare('select * from Commands where ID=:id');
				$sql->execute($id);
				print_r($sql->fetch(PDO::FETCH_ASSOC));
			}		
			break;	
		case 'request':
			$sql=$con->prepare("update Songs set Status='playing' where ID=:id")
			if($sql->execute($id)){
				$sql=$con->prepare('select * from Requests where ID=:id');
				$sql->execute($id);
				print_r($sql->fetch(PDO::FETCH_ASSOC));
			}
			break;
		case 'user':
			$sql=$con->prepare('update Members set UserName=:username,NickName=:nickname,PassWd=:password where ID=:id');
			$sql->bindParam(':username',$username);
			$sql->bindParam(':nickname',$nickname);
			$sql->bindParam(':password',$password);
			$sql->bindParam(':id',$id);
			if ($sql->execute()) {
				$sql=$con->prepare('select * from Members where ID=:id');
				$sql->execute($id);
				print_r($sql->fetch(PDO::FETCH_ASSOC));
			}
			break;
		case 'vote':
			$sql=$con->prepare('update Votes set Status=:status where ID=:id');
			$sql->bindParam(':id',$id);
			$sql->bindParam(':status',$status);
			if($sql->execute(){
				$sql=$con->prepare('select * from Votes where ID=:id');
				$sql->execute($id);
				print_r($sql->fetch(PDO::FETCH_ASSOC));
			}
			break;
	}
	$con=null;
?>