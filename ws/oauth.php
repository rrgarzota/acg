<?php
$token_endpoint = 'https://c2axa202.caspio.com/oauth/token';
$client_id = '915fda7b53814c150d43608410d03c5c968684d968224a93ee';
$client_secret = 'eda16deac90c44f4813c49d97ced678a68eaf468b931215791';
$resource_endpoint = 'https://c2axa202.caspio.com/rest/v1';

class CaspioAuthentication {
     public function GetAccessToken($token_endpoint_url, $client_id, $client_secret) {        
        // Init cUrl.
        $r = $this->InitCurl($token_endpoint_url);
 
        // Add client ID and client secret to the headers.
        curl_setopt($r, CURLOPT_HTTPHEADER, array (
            "Authorization: Basic " . base64_encode($client_id . ":" . $client_secret),
        ));        
 
        // Assemble POST parameters for the request.
        $post_fields = "grant_type=client_credentials";
 
        // Obtain and return the access token from the response.
        curl_setopt($r, CURLOPT_POST, true);
        curl_setopt($r, CURLOPT_POSTFIELDS, $post_fields);
 
        $response = curl_exec($r);
        if ($response == false) {
            die("curl_exec() failed. Error: " . curl_error($r));
        }

        //Parse JSON return object.
        return json_decode($response, true);
    }
 
    private function InitCurl($url) {
        $r = null;
 
        if (($r = @curl_init($url)) == false) {
            header("HTTP/1.1 500", true, 500);
            die("Cannot initialize cUrl session. Is cUrl enabled for your PHP installation?");
        }
 
        curl_setopt($r, CURLOPT_RETURNTRANSFER, 1);
 
        // Decode compressed responses.
        curl_setopt($r, CURLOPT_ENCODING, 1);
 
        // NOTE: If testing locally, add the following lines to use a dummy certificate, and to prevent cUrl from attempting to verify
        // the certificate's authenticity. See http://richardwarrender.com/2007/05/the-secret-to-curl-in-php-on-windows/ for more
        // details on this workaround. If your server has a valid SSL certificate installed, comment out these lines.
        curl_setopt($r, CURLOPT_SSL_VERIFYPEER, false);
        //curl_setopt($r, CURLOPT_CAINFO, "C:\wamp\bin\apache\Apache2.2.21\cacert.crt");
 
        // NOTE: For Fiddler2 debugging.
        //curl_setopt($r, CURLOPT_PROXY, '127.0.0.1:8888');
 
        return($r);
    }
	
	private function GetUrlWithQueryParameters($url, $get_params) {
		$query = http_build_query($get_params);
		if (strlen($query) > 0) {
			return ($url . "?" . $query);
		}
		else {
			return $url;
		}
	}
 
    public function ExecGetRequest($url, $access_token, $get_params) {
        // Create request string.
		$full_url =  $this->GetUrlWithQueryParameters($url, $get_params);
        $r = $this->InitCurl($full_url);
		
 
        curl_setopt($r, CURLOPT_HTTPHEADER, array (
            "Authorization: Bearer " . $access_token
        ));
 
        $response = curl_exec($r);
        if ($response == false) {
            die("curl_exec() failed. Error: " . curl_error($r));
        }
		
        //Parse JSON return object.
        return json_decode($response);        
    }
	
	public function ExecInsertRequest($url, $access_token, $get_params, $body_json_params) {
        // Create request string.
		$full_url =  $this->GetUrlWithQueryParameters($url, $get_params);
        $r = $this->InitCurl($full_url);
		// Set curl option to write headers to response (only if necessary, for example, to work with Location header)
		curl_setopt($r, CURLOPT_HEADER, true);
		echo $full_url . "<br>";
		// Add access token to HTTP headers
		// Add content-type - important if we send json in body
        curl_setopt($r, CURLOPT_HTTPHEADER, array (
            "Authorization: Bearer " . $access_token,
			'Content-Type: application/json',
        ));
		
		// Set POST
		curl_setopt($r, CURLOPT_POST, true);
		// Set body parameters
		$post_fields = json_encode($body_json_params);
		echo $post_fields . "<br>";
        curl_setopt($r, CURLOPT_POSTFIELDS, $post_fields);
 
        $response = curl_exec($r);
		// parse response to get headers
		list($headers, $resp) = explode("\r\n\r\n", $response, 2);
		echo '<b>Response headers:</b><br>';
		// separate headers
		$headers = explode("\n", $headers);
		// show headers
		foreach($headers as $header) {
			echo $header . '<br>';
		}
		
		// get response https status code
		$status_code = curl_getinfo($r, CURLINFO_HTTP_CODE);
        if ($status_code != '201') {
            die("Status code: " . $status_code . " Insert failed.");
        }
		
        //Parse JSON return object.
        return json_decode($response);        
    }
	
	public function ExecUpdateRequest($url, $access_token, $get_params, $body_json_params) {
        // Create request string.
		$full_url =  $this->GetUrlWithQueryParameters($url, $get_params);
        $r = $this->InitCurl($full_url);

		// Add access token to HTTP headers
        curl_setopt($r, CURLOPT_HTTPHEADER, array (
            "Authorization: Bearer " . $access_token,
			'Content-Type: application/json',
        ));
		
		// Set PUT
		curl_setopt($r, CURLOPT_CUSTOMREQUEST, "PUT");
		// Set body parameters
		$post_fields = json_encode($body_json_params);
		//echo $post_fields . "<br>";
        curl_setopt($r, CURLOPT_POSTFIELDS, $post_fields);
 
        $response = curl_exec($r);

		$status_code = curl_getinfo($r, CURLINFO_HTTP_CODE);
        if ($status_code != '200') {
            die("Status code: " . $status_code . " Update failed.");
        }

        //Parse JSON return object.
        return json_decode($response, true);        
    }
	
	
		public function ExecDeleteRequest($url, $access_token, $get_params) {
        // Create request string.
		$full_url =  $this->GetUrlWithQueryParameters($url, $get_params);
        $r = $this->InitCurl($full_url);

		// Add access token to HTTP headers
        curl_setopt($r, CURLOPT_HTTPHEADER, array (
            "Authorization: Bearer " . $access_token,
			'Content-Type: application/json',
        ));
		
		// Set DELETE
		curl_setopt($r, CURLOPT_CUSTOMREQUEST, "DELETE");
		// Set body parameters
		/*$post_fields = json_encode($body_json_params);
		echo $post_fields . "<br>";
        curl_setopt($r, CURLOPT_POSTFIELDS, $post_fields);  */
 
        $response = curl_exec($r);

		$status_code = curl_getinfo($r, CURLINFO_HTTP_CODE);
        if ($status_code != '200') {
            die("Status code: " . $status_code . " Delete failed.");
        }

        //Parse JSON return object.
        return json_decode($response, true);        
    }
}
?>