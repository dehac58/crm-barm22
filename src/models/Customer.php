<?php

class Customer
{
    public $id;
    public $name;
    public $email;
    public $phoneNumber;

    public function __construct($id, $name, $email, $phoneNumber)
    {
        $this->id = $id;
        $this->name = $name;
        $this->email = $email;
        $this->phoneNumber = $phoneNumber;
    }

}