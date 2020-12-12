<?php
const path = '../../data/users.json';
// Get all users
$currentUsers = json_decode(file_get_contents(path));

if (strlen($_POST["password"]) < 4) {
	echo 'password too short ';
	return;
}

// Set user which trying to autenticate
$user = [
	"email" => $_POST["email"],
	"hash" => password_hash($_POST["password"], PASSWORD_DEFAULT)
];

// Keep track if user exists
$userExists = false;

// See if user exists
foreach($currentUsers as $currentUser) {
	if ($currentUser->email === $user['email']) {
		// Login user
		if (password_verify($_POST["password"], $currentUser->hash)) {
			login($user['email']);
		}
		$userExists = true;
		break;
	}
}

if (!$userExists) {
	// Register user
	$currentUsers[] = $user;
	file_put_contents(path, json_encode($currentUsers));
	login($user['email']);
}

function login($email) {
	session_start();
	$_SESSION['avalli']['isLoggedIn'] = true;
	$_SESSION['avalli']['email'] = $email;
	echo 'loggedin';
}