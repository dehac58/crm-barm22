<?php

class Employee {
    public $id;
    public $firstName;
    public $lastName;
    public $position;
    public $phoneNumber;
    public $eMail;

    public $customerID;

    public function __construct($id, $firstName, $lastName, $position, $phoneNumber, $eMail, $customerID) {
        $this->id = $id;
        $this->firstName = $firstName;
        $this->lastName = $lastName;
        $this->position = $position;
        $this->phoneNumber = $phoneNumber;
        $this->eMail = $eMail;
        $this->customerID = $customerID;
    }
}