<?php
	session_start();
	mb_internal_encoding('utf-8');
	session_unset();
	session_destroy();
	echo "已登出"
	header(location:'index.html');
?>