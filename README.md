# loginnode
1.Login using the username and password

In postman use the address as http://localhost:3000/login
provide the body with 
{
	"username": "test",
	"password": "test"
}
 o/p
{
    "auth": true,
    "token": "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
}

2.To verify the token
http://localhost:3000/verifytoken

provide the header
key :authorization
value : "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"(token value provided from the above response)

o/p
on validate token "Hello World"
if it fails Invalid token

3. To check expiry and return new token
http://localhost:3000/refreshtoken

provide the header
key :authorization
value : "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"(token value provided from the above response)

o/p
if it is not expired
{status: false, result: "Invalid token"}

if it expired
{ auth: true, token: "zzzzzzzzzzzzzzzzzzzzzzzzzzzzz"(new value) }
