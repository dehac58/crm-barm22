<?php

use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;

class EmployeeController {
    private $employeeService;

    public function __construct(EmployeeService $employeeService) {
        $this->employeeService = $employeeService;
    }

    public function getAllEmployees(Request $request, Response $response, $args): Response {
        $employees = $this->employeeService->getAllEmployees();
        $response->getBody()->write(json_encode($employees));
        return $response->withHeader('Content-Type', 'application/json');
    }

    public function getEmployee(Request $request, Response $response, $args): Response {
        $id = (int)$args['employeeId'];
        $employee = $this->employeeService->getEmployeeById($id);
        if ($employee) {
            $response->getBody()->write(json_encode($employee));
            return $response->withHeader('Content-Type', 'application/json');
        }
        return $response->withStatus(404);
    }

    public function createEmployee(Request $request, Response $response, $args): Response {
        $data = $request->getParsedBody();
        $newEmployee = $this->employeeService->createEmployee($data);
        $response->getBody()->write(json_encode($newEmployee));
        return $response->withHeader('Content-Type', 'application/json')->withStatus(201);
    }

    public function updateEmployee(Request $request, Response $response, $args): Response {
        $id = (int)$args['employeeId'];
        $data = $request->getParsedBody();
        $updatedEmployee = $this->employeeService->updateEmployee($id, $data);
        if ($updatedEmployee) {
            $response->getBody()->write(json_encode($updatedEmployee));
            return $response->withHeader('Content-Type', 'application/json');
        }
        return $response->withStatus(404);
    }

    public function deleteEmployee(Request $request, Response $response, $args): Response {
        $id = (int)$args['employeeId'];
        if ($this->employeeService->deleteEmployee($id)) {
            return $response->withStatus(204);
        }
        return $response->withStatus(404);
    }
}