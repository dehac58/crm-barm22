<?php

class CustomerAddressLink {

    public $customerAdressLinkID;
    public $customerId;
    public $addressId;
    private $isHeadOffice;

    public function __construct($customerAdressLinkID, $customerId, $addressId, $isHeadOffice) {
        $this->customerAdressLinkID = $customerAdressLinkID;
        $this->customerId = $customerId;
        $this->addressId = $addressId;
        $this->isHeadOffice = $isHeadOffice;
    }
}