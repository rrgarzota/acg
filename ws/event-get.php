<?php
require_once('./oauth.php');
$caspio_auth = new CaspioAuthentication();  
$tokens_json = $caspio_auth->GetAccessToken($token_endpoint, $client_id, $client_secret);

$access_token = $tokens_json['access_token'];

$get_params = array( 'q' => '{
    "select" : "Event_ID AS [id], Project_Name AS [title], User_ID AS [User_ID], All_Day AS [allDay], Date_Start AS [start], Date_End AS [end]",
    "orderby" : "Date_Start ASC"
}' );  
$rows_json = $caspio_auth->ExecGetRequest( $resource_endpoint . '/tables/EC_Event/rows', $access_token, $get_params );

echo json_encode( $rows_json->Result );
?>
