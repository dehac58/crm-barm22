<?php

use \Firebase\JWT\JWT;
use Firebase\JWT\Key;
use Psr\Http\Message\ServerRequestInterface as Request;
use Psr\Http\Message\ResponseInterface as Response;

class JwtMiddleware
{

    private const SECRET = 'secret-key';
    private const ALGORITHM = ['HS256'];

    public function __invoke(Request $request, Response $response, callable $next)
    {
        error_log('hallo');
        $route = $request->getAttribute('route');
        $routeName = $route ? $route->getName() : '';

        // Exclude the specific route from JWT middleware
        if ($routeName === 'publicEndpoint' || $routeName === 'login') {
            return $next($request, $response);
        }
        error_log('hallo');
        /*
        $authHeader = $request->getHeader('Authorization');
        if (!$authHeader) {
            return $response->withStatus(401)->write('Unauthorized1');
        }
        */

        $token = $request->getHeaderLine('api-token');
        //$token = $request->getHeader('api-token')[0] ?? '';

        error_log("token: ".$token);

        try {
            $key = new Key(self::SECRET, self::ALGORITHM[0]);
            $decoded = JWT::decode($token, $key);
            $request = $request->withAttribute('decoded_token_data', $decoded);
        } catch (Exception $e) {
            return $response->withStatus(401)->write('Unauthorized2: ' . $e->getMessage());
        }

        return $next($request, $response);
    }

    public function login(Request $request, Response $response)
    {
        $data = $request->getParsedBody();
        $username = $data['username'] ?? '';
        $password = $data['password'] ?? '';

        // Validate username and password (this is just an example, use a proper validation method)
        if ($username === 'admin' && $password === 'password') {
            $issuedAt = time();
            $expirationTime = $issuedAt + 3600; // jwt valid for 1 hour
            $payload = [
                'iat' => $issuedAt,
                'exp' => $expirationTime,
                'username' => $username,
            ];

            $token = JWT::encode($payload, self::SECRET, self::ALGORITHM[0]);

            $response->getBody()->write(json_encode(['token' => $token]));
            return $response->withHeader('Content-Type', 'application/json');
        }

        return $response->withStatus(401)->write('Invalid credentials');
    }
}