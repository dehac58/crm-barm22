<?php

use Slim\App;

require __DIR__ . '/../vendor/autoload.php';
require __DIR__ . '/../models/Employee.php';
require __DIR__ . '/../models/Customer.php';
require __DIR__ . '/../models/CustomerAddressLink.php';
require __DIR__ . '/../models/Address.php';
require __DIR__ . '/../controllers/EmployeeController.php';
require __DIR__ . '/../controllers/CustomerController.php';
require __DIR__ . '/../services/EmployeeService.php';
require __DIR__ . '/../services/CustomerService.php';
require __DIR__ . '/../middleware/JwtMiddleware.php';

$app = new App;

$employeeService = new EmployeeService();
$employeeController = new EmployeeController($employeeService);

$customerService = new CustomerService($employeeService);
$customerController = new CustomerController($customerService);

// Apply JWT middleware to all routes except one
/*
$app->add(new JwtMiddleware())->add(function ($request, $handler) {
    $route = $request->getAttribute('route');
    $routeName = $route ? $route->getName() : '';

    // Exclude the specific route from JWT middleware
    if ($routeName === 'publicEndpoint') {
        return $handler->handle($request);
    }

    return (new JwtMiddleware())($request, $handler);
});
*/

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

// Define the public endpoint
$app->get('/public', function ($request, $response, $args) {
    $response->getBody()->write("This is a public endpoint");
    return $response;
})->setName('publicEndpoint');

$app->run();