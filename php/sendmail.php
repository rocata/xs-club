<?php
    include 'MailServerSettings.php'; // include the library file
    include "classes/class.phpmailer.php"; // include the class name
    if(isset($_POST["send"])){
	    $email = $_POST["email"];
        $name = $_POST["name"];
        $phone = $_POST["phone"];
        $message = $_POST["message"];

	    $mail	= new PHPMailer; // call the class 
	    $mail->IsSMTP(); 
	    $mail->Host = SMTP_HOST; //Hostname of the mail server
	    $mail->Port = SMTP_PORT; //Port of the SMTP like to be 25, 80, 465 or 587
	    $mail->SMTPAuth = true; //Whether to use SMTP authentication
	    $mail->Username = SMTP_UNAME; //Username for SMTP authentication any valid email created in your domain
	    $mail->Password = SMTP_PWORD; //Password for SMTP authentication
	
        $mail->AddReplyTo($email, $name); //reply-to address
	    $mail->SetFrom($email, $name); //From address of the mail

	    $mail->Subject = "Automatic contact e-mail"; //Subject od your mail
	    $mail->AddAddress("contact@xscluj.ro", "Contact XS Club"); //To address who will receive this email
	    $mail->MsgHTML("<b>Phone number:</b> <br>\t".$phone."<br><b>Message:</b><br>\t".$message); //Put your body of the message you can place html code here
	    $send = $mail->Send(); //Send the mails
	    if($send){
		    echo '<center><h3 style="color:#009933;">Mail sent successfully</h3></center>';
	    }
	    else{
		    echo '<center><h3 style="color:#FF3300;">Mail error: </h3></center>'.$mail->ErrorInfo;
	    }
    }
?>