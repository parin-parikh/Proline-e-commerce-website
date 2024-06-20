<?php
    $firstName = $_POST['firstName'];
    $lastName = $_POST['lastName'];
    $email = $_POST['formEmail'];
    $country = $_POST['country'];

    //connect to database
    $conn = new mysqli('localhost', 'root', '', 'parikh81_parikh_db');
    if($conn->connect_error){
        die('Connection Failed : '.$conn->connect_error);
    } else {
        $stmt = $conn->prepare("insert into form(firstName, lastName, email, country)"
            values(?, ?, ?, ?));
        $stmt->bind_param("ssss", $firstName, $lastName, $email, $country);
        $stmt->execute();
        echo "Form submitted sucessfully";
        $stmt->close();
        $conn->close();
    }
?>