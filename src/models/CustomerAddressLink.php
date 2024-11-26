<?php

class CustomerAddressLink {
    public $customerId;
    public $addressId;
    private $isHeadOffice;

    public function __construct($customerId, $addressId, $isHeadOffice) {
        $this->customerId = $customerId;
        $this->addressId = $addressId;
        $this->isHeadOffice = $isHeadOffice;
    }
}