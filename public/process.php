<?php

$errors = array();
$data = array();

    if (empty($_POST['foodRating'])) {
        $errors['foodRating'] = 'Food rating is required.';
    } else {
        $data['foodRating'] = 'Food rating: '. $_POST['foodRating'] .' stars';
    }

    if (empty($_POST['deliveryRating'])) {
        $errors['deliveryRating'] = 'Delivery Rating is required.';
    } else {
        $data['deliveryRating'] = 'Delivery Rating: '. $_POST['deliveryRating'] .' stars';
    }

    if (empty($_POST['overallRating'])) {
        $errors['overallRating'] = 'Overall Rating is required.';
    } else {
        $data['overallRating'] = 'Overall Rating: '. $_POST['overallRating'] .' stars';
    }

    if ( ! empty($errors)) {
        $data['success'] = false;
        $data['errors']  = $errors;
    } else {
        $data['success'] = true;
        $data['message'] = 'Thank you for your feedback!';
    }

    echo json_encode($data);
