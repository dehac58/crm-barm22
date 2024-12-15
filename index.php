<?php


# header("Content-Type: text/html; charset=utf-8"); => in .htaccess 

ini_set('display_errors', 1);
ini_set('log_errors', 1);
ini_set('error_log', '/www/htdocs/w013c4d0/wiws22i/errlog/error.txt');

use Slim\App;

require __DIR__ . '/src/vendor/autoload.php';
require __DIR__ . '/src/models/Employee.php';
require __DIR__ . '/src/models/Customer.php';
require __DIR__ . '/src/models/CustomerAddressLink.php';
require __DIR__ . '/src/models/Address.php';
require __DIR__ . '/src/controllers/EmployeeController.php';
require __DIR__ . '/src/controllers/CustomerController.php';
require __DIR__ . '/src/services/EmployeeService.php';
require __DIR__ . '/src/services/CustomerService.php';
require __DIR__ . '/src/middleware/JwtMiddleware.php';
require __DIR__ . '/src/middleware/CorsMiddleware.php';

$configuration = [
    'settings' => [
        'displayErrorDetails' => true,
    ],
];



$c = new \Slim\Container($configuration);

$c['notFoundHandler'] = function ($c) {
    return function ($request, $response) use ($c) {
        return $response->withStatus(404)
            ->withHeader('Content-Type', 'text/html')
            ->write('<h1>404: Page not found</h1>');
    };
};

$app = new App($c);

$configuration = [
    'settings' => [
        'displayErrorDetails' => true,
    ],
];


$employeeService = new EmployeeService();
$employeeController = new EmployeeController($employeeService);

$customerService = new CustomerService();
$customerController = new CustomerController($customerService, $employeeService);

$jwtMiddleware = new JwtMiddleware();
$corsMiddleware = new CorsMiddleware();

// Apply CORS middleware to all routes
$app->add(function($request, $response, $next) {
    $route = $request->getAttribute("route");

    $methods = [];

    if (!empty($route)) {
        $pattern = $route->getPattern();

        foreach ($this->router->getRoutes() as $route) {
            if ($pattern === $route->getPattern()) {
                $methods = array_merge_recursive($methods, $route->getMethods());
            }
        }
        // Methods holds all of the HTTP Verbs that a particular route handles.
    } else {
        $methods[] = $request->getMethod();
    }

    $response = $next($request, $response);

    return $response
        ->withHeader("Access-Control-Allow-Methods", implode(",", $methods))
        ->withHeader("Access-Control-Allow-Headers", "Authorization, Content-Type")
        ->withHeader("Access-Control-Allow-Origin", "*"); // Replace * with your specific origin if needed
});

// Apply JWT middleware to all routes except one
// Define the login endpoint
$app->post('/login', [$jwtMiddleware, 'login'])->setName('login');

// Apply JWT middleware to specific routes
$app->group('', function (App $app) use ($employeeController, $customerController) {
    $app->get('/employees', [$employeeController, 'getAllEmployees']);
    $app->get('/employees/{employeeId}', [$employeeController, 'getEmployee']);
    $app->post('/employees', [$employeeController, 'createEmployee']);
    $app->put('/employees/{employeeId}', [$employeeController, 'updateEmployee']);
    $app->delete('/employees/{employeeId}', [$employeeController, 'deleteEmployee']);

    $app->get('/customers', [$customerController, 'getAllCustomers']);
    $app->get('/customers/{customerId}', [$customerController, 'getCustomer']);
    $app->post('/customers', [$customerController, 'createCustomer']);
    $app->put('/customers/{customerId}', [$customerController, 'updateCustomer']);
    $app->delete('/customers/{customerId}', [$customerController, 'deleteCustomer']);

    $app->get('/customers/{customerId}/employees', [$customerController, 'getCustomerEmployees']);
    $app->get('/customers/{customerId}/employees/{employeeId}', [$customerController, 'getCustomerEmployee']);

    $app->get('/customers/{customerId}/addresses', [$customerController, 'getCustomerAddresses']);
    $app->post('/customers/{customerId}/addresses', [$customerController, 'createAddress']);
    $app->put('/customers/{customerId}/addresses/{addressId}', [$customerController, 'updateAddress']);
    $app->delete('/customers/{customerId}/addresses/{addressId}', [$customerController, 'deleteAddress']);
});

$app->run();
