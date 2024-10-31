# Define the URL and data to send in the POST request
$url = "http://172.27.4.228:8080/chat/add"
$body = @{
    name = "user"
    content = "clicker run 100000 times"
}

# Convert the body to JSON
$jsonBody = $body | ConvertTo-Json

# Send the POST request
$response = Invoke-RestMethod -Uri $url -Method Post -Body $jsonBody -ContentType "application/json"

# Output the response
$response
