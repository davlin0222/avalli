<?php
const path = '../../data/users.json';
// Get all users
$currentUsers = json_decode(file_get_contents(path));

// Set user which trying to autenticate
$user = [
	"email" => $_POST["email"],
	"password" => password_hash($_POST["password"], PASSWORD_DEFAULT)
];

// Keep track if user exists
$userExists = false;

// See if user exists
foreach($currentUsers as $currentUser) {
	if ($currentUser->email === $user['email']) {
		echo 'email exists';
		$userExists = true;
	}
}

if ($userExists) {
	// Login user
	echo 'login';
}
else {
	// Register user
	echo 'register';
	$currentUsers[] = $user;
	file_put_contents(path, json_encode($currentUsers));
}
