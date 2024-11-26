<?php

class CustomerService {
    private $customers = [];
    private $addresses = [];
    private $customerAddressLinks = [];
    private $employeeService;

    public function __construct(EmployeeService $employeeService) {
        $this->customers[] = new Customer(1, 'Tech Corp', 'contact@techcorp.com', '123-456-7890');
        $this->customers[] = new Customer(2, 'Business Inc', 'info@businessinc.com', '987-654-3210');

        $this->addresses[] = new Address(1, '123 Main St', 'Anytown', '12345');
        $this->addresses[] = new Address(2, '456 Elm St', 'Othertown', '54321');
        $this->addresses[] = new Address(3, '789 Oak St', 'Thistown', '67890');

        $this->customerAddressLinks[] = new CustomerAddressLink(1, 1, 1, true);
        $this->customerAddressLinks[] = new CustomerAddressLink(2, 1, 2, false);
        $this->customerAddressLinks[] = new CustomerAddressLink(3, 2, 3, true);

        $this->employeeService = $employeeService;
    }

    public function getAllCustomers() {
        return $this->customers;
    }

    public function getCustomerById($id) {
        foreach ($this->customers as $customer) {
            if ($customer->id === $id) {
                return $customer;
            }
        }
        return null;
    }

    public function createCustomer($data) {
        $newCustomer = new Customer(
            count($this->customers) + 1,
            $data['companyName'],
            $data['contactEmail'],
            $data['contactPhone']
        );
        $this->customers[] = $newCustomer;
        return $newCustomer;
    }

    public function updateCustomer($id, $data) {
        foreach ($this->customers as &$customer) {
            if ($customer->id === $id) {
                $customer->companyName = $data['companyName'];
                $customer->contactEmail = $data['contactEmail'];
                $customer->contactPhone = $data['contactPhone'];
                return $customer;
            }
        }
        return null;
    }

    public function deleteCustomer($id) {
        foreach ($this->customers as $key => $customer) {
            if ($customer->id === $id) {
                unset($this->customers[$key]);
                return true;
            }
        }
        return false;
    }

    public function getCustomerEmployees($customerId): array
    {
        $employees = $this->employeeService->getAllEmployees();
        $filteredEmployees = array_filter($employees, function($employee) use ($customerId) {
            return $employee->customerID === $customerId;
        });
        return array_values($filteredEmployees);
    }

    public function createAddress($data): CustomerAddressLink
    {
        $newAddress = new Address(
            count($this->addresses) + 1,
            $data['street'],
            $data['city'],
            $data['postalCode']
        );
        $this->addresses[] = $newAddress;
        $newLink = new CustomerAddressLink($data['customerId'], $newAddress->id, $data['isHeadOffice']);
        $this->customerAddressLinks[] = $newLink;
        return $newLink;
    }

    public function updateAddress($customerId, $addressId, $data) {
        foreach ($this->customerAddressLinks as &$link) {
            if ($link->customerId === $customerId && $link->addressId === $addressId) {
                $link->isHeadOffice = $data['isHeadOffice'];
                return $link;
            }
        }
        return null;
    }

    public function deleteAddress($customerId, $addressId) {
        foreach ($this->customerAddressLinks as $key => $link) {
            if ($link->customerId === $customerId && $link->addressId === $addressId) {
                unset($this->customerAddressLinks[$key]);
                return true;
            }
        }
        return false;
    }

    public function getAddresses($customerId) {
        $filteredLinks = array_filter($this->customerAddressLinks, function($link) use ($customerId) {
            return $link->customerId === $customerId;
        });
        $result = array_map(function($link) {
            $address = $this->findAddressById($link->addressId);
            return [
                'customerId' => $link->customerId,
                'address' => $address,
                'isHeadOffice' => $link->isHeadOffice
            ];
        }, $filteredLinks);
        return array_values($result);
    }

    private function findAddressById($addressId) {
        foreach ($this->addresses as $address) {
            if ($address->id === $addressId) {
                return $address;
            }
        }
        return null;
    }
}