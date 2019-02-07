<?php
	session_start();
	mb_internal_encoding('utf-8');
	$username_r=$_REQUEST['username'];
	$username_l=$_SESSION['user'];
	$password=$_REQUEST['password'];
	$nickname=$_REQUEST['nickname'];
	$item=$_REQUEST['item'];
	$keyword=$_REQUEST['keyword'];
	$response=$_REQUEST['response'];
	$topic=$_REQUEST['topic'];
	$option=$_REQUEST['option'];
	$id=$_REQUEST['id'];
	$url=$_REQUEST['url'];
	$con=new PDO('mysql:host=fakehost,db=alianbot','fakeuser','fakepw');
	$con->query('SET CHARACTER SET utf8');
	switch ($item) {
		case 'command':
			$sql=$con->prepare('insert into Commands(AddedBy,KeyWord,Response)values(:username,:keyword,:response)');
			$sql->bindParam(':username',$username_l);
			$sql->bindParam(':keyword',$keyword);
			$sql->bindParam(':response',$response);
			if($sql->exec()){echo'成功';}
			else {echo'失敗';}
			break;	
		case 'vote':
			
			break;
		case 'user':
			$sql=$con->prepare('inser into Members(UserName,NickName,PassWd)values(:username,:nickname,:password)');
			$sql->bindParam(':username',$username_r);
			$sql->bindParam(':nickname',$nickname);
			$sql->bindParam(':password',$password);
			if($sql->exec()){
				$_SESSION['user']=$username_r;
				echo'成功';
			}else{echo'失敗';}			
			break;
		case 'request':
			$sql=$con->prepare('insert into Songs(OrderedBy,RequestTo,PlayStatus)values(:username,:url,"waiting")')	
			$sql->bindParam(':username',$username_r);
			$sql->bindParam(':url',$url);
			if($sql->exec()){echo'成功';}
			else {echo'失敗';}
	}
	$con=null;
?>