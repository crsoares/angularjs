<?php

try{
	$db = new PDO('mysql:dbname=angularjs;host=localhost', 'root', '');
	$query = $db->prepare("SELECT * FROM products");
	$query->execute();
	$result = $query->fetchAll(PDO::FETCH_ASSOC);
	//print_r($result);die;
	//$teste = array('novo' => 'teste');
	//echo json_encode($teste);die;
	echo json_encode($result);
} catch (PDOException $e) {
	echo 'Error: ' . $e->getMessage();
}