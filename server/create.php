<?php
	session_start();
	mb_internal_encoding('utf-8');
	$username=$_REQUEST['username'];
	$password=$_REQUEST['password'];
	$nickname=$_REQUEST['nickname'];
	$item=$_REQUEST['item'];
	$keyword=$_REQUEST['keyword'];
	$response=$_REQUEST['response'];
	$topic=$_REQUEST['topic'];
	$option=$_REQUEST['option'];
	$con=new PDO('mysql:host=fakehost,db=alianbot','fakeuser','fakepw');
	$con->query('SET CHARACTER SET utf8');
	switch ($item) {
		case 'command':
			$sql=$con->prepare('insert into Commands(AddedBy,KeyWord,Response)values(:username,:keyword,:response)');
			$sql->bindParam(':username',$username);
			$sql->bindParam(':keyword',$keyword);
			$sql->bindParam(':response',$response);
			if($sql->exec()){
				echo'成功';
			}else {
				echo'失敗';
			}
			break;	
		case 'vote':
			
			break;
		case 'user':
			$sql=$con->prepare('inser into Members(UserName,NickName,PassWd)values(:username,:nickname,:password)');
			$sql->bindParam(':username',$username);
			$sql->bindParam(':nickname',$nickname);
			$sql->bindParam(':password',$password);
			if($sql->exec()){
				$_SESSION['user']=$username;
				echo'成功';
			}else{
				echo'失敗';
			}
			break;
	}

?>