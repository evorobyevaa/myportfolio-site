<?php
  use PHPMailer\PHPMailer\PHPMailer;
  use PHPMailer\PHPMailer\Exception;

  require 'phpmailer/src/Exception.php';
  require 'phpmailer/src/PHPMailer.php';

  $mail = new PhpMailer(true);
  $mail->CharSet = 'UTF-8';
  $mail->setLanguage('ru', 'phpmailer/language/');
  $mail->IsHTML(true);

  //от кого письмо
  $mail->setFrom('e_vorobyevaa@bk.ru');

  //кому отправить
  $mail->addAddress('e_vorobyevaa@bk.ru');

  //Tema письма
  $mail->Subject = 'Письмо с сайта-портфолио';

  //Тело письма
  $body = '<h1>Ура! Кто-то тебе написал!</h1>';

  if(trim(!empty($_POST['name']))) {
    $body.='<p>Имя: '.$_POST['name'].'</p>';
  }
  if(trim(!empty($_POST['email']))) {
    $body.='<p>Email: '.$_POST['email'].'</p>';
  }
  if(trim(!empty($_POST['text']))) {
    $body.='<p>Текст обращения: '.$_POST['text'].'</p>';
  }

  $mail->Body = $body;

  if (!$mail->send()) {
    $msg = 'Ошибка';
  } else {
    $msg = 'Данные отправлены!';
  }
  
  $response = ['msg' => $msg];

  header('Content-Type: application/json');
  echo json_encode($response);
?>