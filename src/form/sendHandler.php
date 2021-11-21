<?php

$sendTo = "nsberegaev@gmail.com";

$name   = trim(urldecode(htmlspecialchars($_POST['name'])));
$theme  = 'New application';
$email   = trim(urldecode(htmlspecialchars($_POST['email'])));

if (mail($sendTo, $theme, "Name: " . $name . ' | Email: ' . $email))
    header('Location: index.php');
