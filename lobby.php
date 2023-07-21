<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Lobby || Fight-2D</title>
    <link rel="stylesheet" href="lobby.css">
</head>
<body>
    <div class="main">
        <div class="gametitle">
            FIGHT-2D
        </div>
        <br>
        <br>
        <div class="lobbyMenu">
            <form action="lobby.php" method="post">
                <input type="submit" name="Play" value="Play">
                <div>
                    <input type="submit" name="Score" value="Score">
                    <input type="submit" name="LogOut" value="LogOut">
                </div>
            </form>
        </div>
        <div class="buttons">
            <i id="info" class="fa-solid fa-circle-info"></i>
            <i id="help" class="fa-solid fa-circle-question"></i>
            <i id="close" class="fa-solid fa-circle-xmark"></i>
        </div>

        <div class="aboutus">
            <p>This project was created as Project-I for TU-BCA department by Samundra Neupane on July 19,2023.Project uses the free available assests from itch.io and doesn't claims it's authority. Project doesn't aim to have any commercial purpose or any sort of disturbance. 
            </p>
        </div>

        <div class="helpindex">
            <div class="player1control" >
                <h1>Player1 control</h1>
                <hr>
                <br>
                <span>Press A to move left.</span>
                <span>Press W to jump.</span>
                <span>Press D to move right.</span>
                <span>Press "space" to attack.</span>
            </div>
            <div class="player1control">
                <h1>Player2 control</h1>
                <hr>
                <br>
                <span>Press left-arrow to move left.</span>
                <span>Press up-arrow to jump.</span>
                <span>Press right-arrow to move right.</span>
                <span>Click mouse to attack.</span>
            </div>
        </div>
    </div>

    <script src="https://kit.fontawesome.com/a4173f4f2b.js" crossorigin="anonymous"></script>
    <script src="lobby.js"></script>
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

    if(isset($_POST["Play"])){
        header('Location: main.php'); exit; 
    }
    if(isset($_POST["LogOut"])){
        setcookie("player1", "", time());
        setcookie("player2", "", time());
        header('Location: index.php'); exit;
    }
    if(isset($_POST["Score"])){
        if(isset($_COOKIE["player1"]) && isset($_COOKIE["player2"])){
            $p1name = $_COOKIE["player1"];
            $p2name = $_COOKIE["player2"];
        }
        else{
            echo "Please Logout and Login Again.";
        }
        
        if(isset($p1name) && isset($p2name)){
            $searchSql1 = mysqli_query($conn, "SELECT * FROM player_stats WHERE p_username = '$p1name';");
            $searchSql2 = mysqli_query($conn, "SELECT * FROM player_stats WHERE p_username = '$p2name';");
            if (mysqli_num_rows($searchSql1) > 0) {
                while($row = mysqli_fetch_assoc($searchSql1)) {
                    echo  "UserName:" . $row["p_username"].
                        " \t \t MatchPlayed -" . $row["matchPlayed"].
                        " \t \t MatchWon -" . $row["matchWon"].
                        " \t \t MatchLost -" . $row["matchLost"] . "<br>";
                }
            } else {
                echo "Unable to find ". $p1name;
            }

            if (mysqli_num_rows($searchSql2) > 0) {
                while($row = mysqli_fetch_assoc($searchSql2)) {
                    echo  "<br> UserName:" . $row["p_username"].
                        " \t \t MatchPlayed -" . $row["matchPlayed"].
                        " \t \t MatchWon -" . $row["matchWon"].
                        " \t \t MatchLost -" . $row["matchLost"];
                }
            } else {
                echo "Unable to find ". $p2name;
            }
        }
    }
?>