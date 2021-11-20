<?php

$sendTo = "nsberegaev@gmail.com";

$name   = trim(urldecode(htmlspecialchars($_POST['name'])));
$theme  = 'New application';
$email   = trim(urldecode(htmlspecialchars($_POST['email'])));

if (mail($sendTo, $theme, "Name: " . $name . ' | Email: ' . $email)) {
    $_SESSION["success"] = true;
} else {
    $_SESSION["success"] = false;
}

header('Location: index.php');
