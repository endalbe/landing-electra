<?php session_start() ?>
<!DOCTYPE HTML>

<html>

<head>
    <title>Feedback Form</title>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no" />
</head>

<body style="background: black;">
    <?php if ($_SESSION['success'] == true) : ?>
        <h1>
            Success! <a href="/">Go to main page...</a>
        </h1>
    <?php else : ?>
        <h1 class="color: red;">
            Error! <a href="/">Go to main page...</a>
        </h1>
    <?php endif; ?>
</body>

</html>
