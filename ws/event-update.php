<?php
	if( isset($_GET["Event_ID"]) && isset($_GET["Date_Start"]) && isset($_GET["Date_End"]) && isset($_GET["User_ID"]) ){
		$event_id = str_replace("'","''", $_GET["Event_ID"]);
		$date_start = str_replace("'","''", $_GET["Date_Start"]);
		$date_end = str_replace("'","''", $_GET["Date_End"]);
		$user_id = str_replace("'","''", $_GET["User_ID"]);

		
	}else {
		echo json_encode( array() );
		exit();
	}
  
	require_once('./oauth.php');
	$caspio_auth = new CaspioAuthentication();  
	$tokens_json = $caspio_auth->GetAccessToken($token_endpoint, $client_id, $client_secret);
    
	$access_token = $tokens_json['access_token'];
  
	$get_params = array('q'=>'{"where":"Event_ID=\'' . $event_id . '\'"}');

	$body_json_params = array(
		'All_Day'=>'1',
		'Date_All_Day_Start'=>$date_start, 
		'Date_All_Day_End'=>$date_end, 
		'Date_Time_Start' => '', 
		'Date_Time_End' => '', 
		'Date_Start'=>$date_start, 
		'Date_End'=>$date_end, 
		'Last_Updated_By_User_ID'=>$user_id );

	$result = $caspio_auth->ExecUpdateRequest( $resource_endpoint . '/tables/EC_Event/rows', $access_token, $get_params, $body_json_params );
	$rows_affected = $result['RowsAffected'];
	echo '{ "rows" : ' . $rows_affected . ' }';
?>