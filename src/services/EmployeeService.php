<?php

class EmployeeService {
    private $employees = [];

    public function __construct() {
        $this->employees[] = new Employee(1, 'John', 'Doe', 'Developer', '123-456-7890', 'john.doe@example.com', 1);
        $this->employees[] = new Employee(2, 'Jane', 'Smith', 'Manager', '987-654-3210', 'jane.smith@example.com', 1);
        $this->employees[] = new Employee(3, 'Chuck', 'Norris', 'CEO', '555-555-5555', 'chuck.norris@example.com', 2);
    }

    public function getAllEmployees() {
        return $this->employees;
    }

    public function getEmployeeById($id) {
        foreach ($this->employees as $employee) {
            if ($employee->id === $id) {
                return $employee;
            }
        }
        return null;
    }

    public function createEmployee($data) {
        $newEmployee = new Employee(
            count($this->employees) + 1,
            $data['firstName'],
            $data['lastName'],
            $data['position'],
            $data['phoneNumber'],
            $data['eMail'],
            $data['customerID']
        );
        $this->employees[] = $newEmployee;
        return $newEmployee;
    }

    public function updateEmployee($id, $data) {
        foreach ($this->employees as &$employee) {
            if ($employee->id === $id) {
                $employee->firstName = $data['firstName'];
                $employee->lastName = $data['lastName'];
                $employee->position = $data['position'];
                $employee->phoneNumber = $data['phoneNumber'];
                $employee->eMail = $data['eMail'];
                $employee->customerID = $data['customerID'];
                return $employee;
            }
        }
        return null;
    }

    public function deleteEmployee($id) {
        foreach ($this->employees as $key => $employee) {
            if ($employee->id === $id) {
                unset($this->employees[$key]);
                return true;
            }
        }
        return false;
    }
}