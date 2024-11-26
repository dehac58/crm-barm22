<?php


use \Firebase\JWT\JWT;
use Psr\Http\Message\ServerRequestInterface as Request;
use Psr\Http\Message\ResponseInterface as Response;

class JwtMiddleware
{
    public function __invoke(Request $request, Response $response, callable $next)
    {
        $route = $request->getAttribute('route');
        $routeName = $route ? $route->getName() : '';

        // Exclude the specific route from JWT middleware
        if ($routeName === 'publicEndpoint') {
            return $next($request, $response);
        }

        $authHeader = $request->getHeader('Authorization');
        if (!$authHeader) {
            return $response->withStatus(401)->write('Unauthorized');
        }

        $token = str_replace('Bearer ', '', $authHeader[0]);
        $secretKey = 'your_secret_key';
        $headers = ['HS256'];

        try {
            $decoded = JWT::decode($token, $secretKey, $headers);
            $request = $request->withAttribute('decoded_token_data', $decoded);
        } catch (Exception $e) {
            return $response->withStatus(401)->write('Unauthorized: ' . $e->getMessage());
        }

        return $next($request, $response);
    }
}