<?php

use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;

class CustomerController {
    private $customerService;

    public function __construct(CustomerService $customerService) {
        $this->customerService = $customerService;
    }

    public function getAllCustomers(Request $request, Response $response, $args): Response {
        $customers = $this->customerService->getAllCustomers();
        $response->getBody()->write(json_encode($customers));
        return $response->withHeader('Content-Type', 'application/json');
    }

    public function getCustomer(Request $request, Response $response, $args): Response {
        $id = (int)$args['customerId'];
        $customer = $this->customerService->getCustomerById($id);
        if ($customer) {
            $response->getBody()->write(json_encode($customer));
            return $response->withHeader('Content-Type', 'application/json');
        }
        return $response->withStatus(404);
    }

    public function createCustomer(Request $request, Response $response, $args): Response {
        $data = $request->getParsedBody();
        $newCustomer = $this->customerService->createCustomer($data);
        $response->getBody()->write(json_encode($newCustomer));
        return $response->withHeader('Content-Type', 'application/json')->withStatus(201);
    }

    public function updateCustomer(Request $request, Response $response, $args): Response {
        $id = (int)$args['customerId'];
        $data = $request->getParsedBody();
        $updatedCustomer = $this->customerService->updateCustomer($id, $data);
        if ($updatedCustomer) {
            $response->getBody()->write(json_encode($updatedCustomer));
            return $response->withHeader('Content-Type', 'application/json');
        }
        return $response->withStatus(404);
    }

    public function deleteCustomer(Request $request, Response $response, $args): Response {
        $id = (int)$args['customerId'];
        if ($this->customerService->deleteCustomer($id)) {
            return $response->withStatus(204);
        }
        return $response->withStatus(404);
    }

    public function getCustomerEmployees(Request $request, Response $response, $args): Response {
        $customerId = (int)$args['customerId'];
        $employees = $this->customerService->getCustomerEmployees($customerId);
        $response->getBody()->write(json_encode($employees));
        return $response->withHeader('Content-Type', 'application/json');
    }

    public function createAddress(Request $request, Response $response, $args): Response {
        $data = $request->getParsedBody();
        $newLink = $this->customerService->createAddress($data);
        $response->getBody()->write(json_encode($newLink));
        return $response->withHeader('Content-Type', 'application/json')->withStatus(201);
    }

    public function updateAddress(Request $request, Response $response, $args): Response {
        $customerId = (int)$args['customerId'];
        $addressId = (int)$args['addressId'];
        $data = $request->getParsedBody();
        $updatedLink = $this->customerService->updateAddress($customerId, $addressId, $data);
        if ($updatedLink) {
            $response->getBody()->write(json_encode($updatedLink));
            return $response->withHeader('Content-Type', 'application/json');
        }
        return $response->withStatus(404);
    }

    public function deleteAddress(Request $request, Response $response, $args): Response {
        $customerId = (int)$args['customerId'];
        $addressId = (int)$args['addressId'];
        if ($this->customerService->deleteAddress($customerId, $addressId)) {
            return $response->withStatus(204);
        }
        return $response->withStatus(404);
    }

    public function getAddresses(Request $request, Response $response, $args): Response {
        $customerId = (int)$args['customerId'];
        $addresses = $this->customerService->getAddresses($customerId);
        $response->getBody()->write(json_encode($addresses));
        return $response->withHeader('Content-Type', 'application/json');
    }
}