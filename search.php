<?php
session_start();
$item = $_REQUEST['item'];
$con = new PDO("mysql:host=localhost;db=alianbot", "halrison", "10240102Nal");
switch ($item) {
	case 'user':
		$username_l = $_REQUEST['username'];
		$password = $_REQUEST['password'];
		$sql = $con->prepare('select PassWd from Members where UserName=:username');
		$sql->bindParam(':username', $username_l);
		$sql->execute();
		$result = $sql->fetch(PDO::FETCH_ASSOC);
		if ($password == $result['PassWd']) {
			$_SESSION['user'] = $username_l;
			echo '成功';
		} else {
			echo '失敗';
		}
}
