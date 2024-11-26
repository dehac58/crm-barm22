<?php

class Address {
    public $id;
    public $streetAndNumber;
    public $city;
    public $zIP;

    public  function
    __construct($id, $streetAndNumber, $city, $zip) {
        $this->id = $id;
        $this->streetAndNumber = $streetAndNumber;
        $this->city = $city;
        $this->zIP = $zip;
    }
}