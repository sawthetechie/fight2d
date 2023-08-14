<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <link rel="stylesheet" href="style.css">
</head>


<body>

    <div class="playerForm">
        <div class="player1Form miniform">
            <form action="index.php" onsubmit="validate()" method="POST">
                
                <h1> Player 1</h1>

                <label for="name">Username: </label>
                <br>
                <input type="text" name="p1name" placeholder="P1 username">
                <br>

                <label for="password">Password: </label>
                <br>
                <input type="password" name="p1password" placeholder="P1 password">
                <br>

                <hr>
                
                <h1>Player 2</h1>
                
                <label for="name">Username: </label>
                <br>
                <input type="text" name="p2name" placeholder="P2 username">
                <br>

                <label for="password">Password: </label>
                <br>
                <input type="password" name="p2password" placeholder="P2 password">
                <br>
                <input type="submit" name="submit" value="Enter the Zone">
                
                <a href="registration.php"><span>Don't have an account?</span></a>
            </form>
        </div>

    </div>
    <script src="index.js"></script>
    
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


    if(isset($_POST["submit"])){
        $p1name = $_POST["p1name"];
        $p1password = $_POST["p1password"];
        $p2name = $_POST["p2name"];
        $p2password = $_POST["p2password"];
        $error = null;
        $checked = true;

        function check($p1name,$p1password,$p2name,$p2password){ 
            if(empty($p1name)){
                echo "Error 1: Empty P1 name";
                return false;
            }
            elseif(empty($p1password)){
                echo "Error 2: Empty P1 password";
                return false;
            }
            elseif(empty($p2name)){
                echo "Error 3: Empty P2 name";
                return false;
            }
            elseif(empty($p2password)){
                echo "Error 4: Empty P2 password";
                return false;
            }
            elseif($p1name == $p2name){
                echo "Error 5: Same Login Credentials";
                return false;
            }
            else{
                return true;
            }
        }

        $checked = check($p1name,$p1password,$p2name,$p2password);

        
        if($checked){ 
            $searchSql1 = mysqli_query($conn, "SELECT p_username FROM player_details WHERE p_username = '$p1name' AND p_password = '$p1password';");
            $searchSql2 = mysqli_query($conn, "SELECT p_username FROM player_details WHERE p_username = '$p2name' AND p_password = '$p2password';");
            $stat1 = mysqli_fetch_row($searchSql1);
            $stat2 = mysqli_fetch_row($searchSql2);
            if($stat1 && $stat2){
                echo "Successful Parson, Kakrachulation";
                setcookie("player1", $p1name, time() + 86400);
                setcookie("player2", $p2name, time() + 86400);
                header('Location: lobby.php'); exit; 
            }
            else{
                echo "Username not registered.";
            }
        }  
    }
?>