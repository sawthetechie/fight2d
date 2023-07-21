<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    
    <form action="randompractice.php" method="post">
        <label for="data"> Enter your first Wish</label><br>
        <input type="text" name = "wish[]"> <hr>
        
        <label for="data"> Enter your second Wish</label><br>
        <input type="text" name = "wish[]"> <hr>

        <label for="data"> Enter your third Wish</label><br>
        <input type="text" name = "wish[]"> <hr>

        
        <input type="checkbox" name = "term"><label for="terms"> I agree to policy of the Santas</label>
        <br>
        <br>

        <input type="submit" name="submit">


    </form>


</body>
</html>

<?php
    echo "<hr><br>";

    if(isset($_POST["submit"])){

        $send_data = isset($_POST["term"]);
        $recipent = 3;
        $data = $_POST["wish"];


        if($send_data){
            for($i=1;$i<=$recipent;$i++){
                foreach($data as $value){
                    echo $value . "<br>";
                }
                echo "Sent to Santa " . $i . "<hr>";
            }
        }
        else{
            echo " <br> You haven't agree the Santa-erms and Conditions";
        }
    
    }
?>