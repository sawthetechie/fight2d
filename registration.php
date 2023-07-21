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
            <form action="registration.php" onsubmit="validate()" method="POST">
                
                <h1> Register </h1>

                <label for="name">Username: </label>
                <br>
                <input type="text" name="pname" placeholder="Enter your username">
                <br>

                <label for="password">Password: </label>
                <br>
                <input type="password" name="ppassword" placeholder="Enter your password">
                <br>

                <label for="email">Email: </label>
                <br>
                <input type="email" name="pemail" placeholder="Enter your email">
                <br>

                <input type="submit" name="submit" value="SignUp">

                <a href="index.php"><span>Already have an account?</span></a>
            </form>
        </div>

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
        $pname = $_POST["pname"];
        $ppassword = $_POST["ppassword"];
        $pemail = $_POST["pemail"];

        function check($pname,$ppassword,$pemail){ 
            if(empty($pname)){
                echo "Error 1: Empty Username";
                return false;
            }
            elseif(empty($ppassword)){
                echo "Error 2: Empty Password";
                return false;
            }
            elseif(empty($pemail)){
                echo "Error 3: Empty Email";
                return false;
            }
            else{
                return true;
            }
        }
        $checked = check($pname,$ppassword,$pemail);
   
        $insertSql = "INSERT INTO player_details (p_username,p_email,p_password) VALUES ('$pname','$pemail','$ppassword')";

        if($checked){
            try{ 
                mysqli_query($conn, $insertSql);
                header('Location: index.php'); exit;
            }
            catch(mysqli_sql_exception){
                echo "Unable to Register User";
            }
        }

    }
    mysqli_close($conn);
?>
