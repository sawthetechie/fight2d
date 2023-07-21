<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Fight</title>
    <link rel="stylesheet" href="main.css">
</head>
<body>
    <div style="position: relative; display: inline-block;">
        <div class="main">
            <div class="player1parent" >
                <div id="player1secondparent">
                    <div id="player1HP" style="position: absolute; background:green;top:0; right:0; bottom:0; width: 100%;"></div>
                </div>
            </div>
            <div id="timer">10</div>
            <div class="player2parent">
                <div id="player2secondparent">
                    <div id="player2HP" style="position: absolute; background:blue; top:0; right:0; bottom:0; left: 0;"></div>
                </div>
            </div>
        </div>
        
        <div id="displayResult">
                <span id="Fresult">TIE</span>
                <div>
                    <input  onclick="window.location.href = 'main.php';" id="submit" name="replay" value="Play Again">
                    <input  onclick="window.location.href = 'lobby.php';" id="submit" name="reLobby" value="Lobby">
                </div>
        </div>
        <canvas></canvas>
    </div>
    <script src="utilityFunctions.js"></script>
    <script src="classes.js"></script>
    <script src="main.js"></script>
</body>
</html>
<?php
        $db_server = "localhost";
        $db_user = "root";
        $db_password = "";
        $db_name = "fight_2d";

        try{
            $conn = mysqli_connect($db_server,
                                $db_user,
                                $db_password,
                                $db_name);

        }
        catch(mysqli_sql_exception){
            echo "Couldn't connect to the Database";
        }

    if(isset($_COOKIE["winner"]) && isset($_COOKIE["player1"])){
        $p1name=$_COOKIE["player1"];
        $p2name=$_COOKIE["player2"];
        $winner=$_COOKIE["winner"];
        $loser=$_COOKIE["loser"];

        $insertSql = "INSERT INTO gamesession(player1, player2, winner, loser) VALUES ('$p1name','$p2name','$winner','$loser')";
        mysqli_query($conn, $insertSql);

    }
?>