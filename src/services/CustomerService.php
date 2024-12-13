<?php

class CustomerService
{
    private $pdo;

    // Server- und Datenbank-Verbindungsinformationen
    private $host = 'wappprojects.de';
    private $dbname = 'd041c784';
    private $username = 'd041c784';
    private $password = '22i-dev_dbxaxs';

    // Konstruktor zur Initialisierung der Datenbankverbindung
    public function __construct()
    {
        try {
            $dsn = "mysql:host={$this->host};dbname={$this->dbname}";
            $this->pdo = new PDO($dsn, $this->username, $this->password);
            $this->pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        } catch (PDOException $e) {
            die("Database connection failed: " . $e->getMessage());
        }
    }

    // Insert new Customer
    public function createCustomer($data)
    {
        $sql = "INSERT INTO Costumers (companyName, contactEmail, contactPhone) VALUES (:companyName, :contactEmail, :contactPhone)";
        $stmt = $this->pdo->prepare($sql);
        $stmt->execute([':companyName' => $data['companyName'], ':contactEmail' => $data['contactEmail'], ":contactPhone" => $data['contactPhone']]);
        return $this->pdo->lastInsertId();
    }

    // Insert new Adress
    public function createAddress($data)
    {
        $sqlAddresses = "INSERT INTO Addresses (street, city, postalCode) VALUES (:street, :city, :postalCode)";
        $stmtAddresses = $this->pdo->prepare($sqlAddresses);
        $stmtAddresses->execute([':street' => $data['street'], ':city' => $data['city'], ":postalCode" => $data['postalCode']]);
        $A_ID = $this->pdo->lastInsertId();
        $sqlCustomerAddresses = "INSERT INTO Customers_Addresses (isHeadOffice, C_ID, A_ID) VALUES (:isHeadOffice, :C_ID, $A_ID)";
        $stmtCustomerAddresses = $this->pdo->prepare($sqlCustomerAddresses);
        $stmtCustomerAddresses->execute([':isHeadOffice' => $data['isHeadOffice'], ':C_ID' => $data['C_ID']]);
        return $this->pdo->lastInsertId();
    }

    // Get all Customer
    public function getAllCustomers()
    {
        $sql = "SELECT * FROM Customers";
        $stmt = $this->pdo->query($sql);
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    // Get all Adresses
    public function getAllAddresses()
    {
        $sql = "SELECT * FROM Addresses";
        $stmt = $this->pdo->query($sql);
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    // Get Customer by ID
    public function getCustomerById($id)
    {
        $sql = "SELECT * FROM Customers WHERE id = :id";
        $stmt = $this->pdo->prepare($sql);
        $stmt->execute([':id' => $id]);
        return $stmt->fetch(PDO::FETCH_ASSOC);
    }

    // Get Adress by ID
    public function getAddressbyID($id)
    {
        $sql = "SELECT * FROM Addresses WHERE id = :id";
        $stmt = $this->pdo->prepare($sql);
        $stmt->execute([':id' => $id]);
        return $stmt->fetch(PDO::FETCH_ASSOC);
    }

    // UPDATE - Einen Customer aktualisieren
    public function updateCustomer($id, $data)
    {
        $sql = "UPDATE Customers SET companyName = :companyName, contactEmail = :contactEmail, contactPhone = :contactPhone WHERE id = :id";
        $stmt = $this->pdo->prepare($sql);
        return $stmt->execute([':id' => $data["id"], ':companyName' => $data['companyName'], ':contactEmail' => $data['contactEmail'], ":contactPhone" => $data['contactPhone']]);
    }

    // DELETE - Einen Benutzer löschen
    public function deleteCustomer($id)
    {
        $sqlEmployeeUpdate = "UPDATE Employees SET customerNumber = NULL WHERE customerNumber = :customerId";
        $stmtEmployeeUpdate = $this->pdo->prepare($sqlEmployeeUpdate);
        $stmtEmployeeUpdate->execute([':customerId' => $id]);

        $sqlCustomerAddresses = "DELETE FROM Customers_Addresses WHERE C_ID = :customerId";
        $stmtCustomerAddresses = $this->pdo->prepare($sqlCustomerAddresses);
        $stmtCustomerAddresses->execute([':customerId' => $id]);

        $sqlGetAddresses = "SELECT A_ID FROM Customers_Addresses WHERE C_ID = :customerId";
        $stmtGetAddresses = $this->pdo->prepare($sqlGetAddresses);
        $stmtGetAddresses->execute([':customerId' => $id]);
        $addresses = $stmtGetAddresses->fetchAll(PDO::FETCH_ASSOC);

        foreach ($addresses as $address) {
            $addressId = $address['A_ID'];
            $sqlCheckAddress = "SELECT COUNT(*) as count FROM Customers_Addresses WHERE A_ID = :addressId";
            $stmtCheckAddress = $this->pdo->prepare($sqlCheckAddress);
            $stmtCheckAddress->execute([':addressId' => $addressId]);
            $result = $stmtCheckAddress->fetch();

            if ($result['count'] == 1) {
                $sqlDeleteAddress = "DELETE FROM Addresses WHERE id = :addressId";
                $stmtDeleteAddress = $this->pdo->prepare($sqlDeleteAddress);
                $stmtDeleteAddress->execute([':addressId' => $addressId]);
            }
        }
        $sqlDeleteCustomer = "DELETE FROM Customers WHERE id = :id";
        $stmtDeleteCustomer = $this->pdo->prepare($sqlDeleteCustomer);
        return $stmtDeleteCustomer->execute([':id' => $id]);
    }

    public function getCustomerEmployees($id)
    {
        $sql = "SELECT *
            FROM Employees  
            WHERE customerID = :id";
        $stmt = $this->pdo->prepare($sql);
        $stmt->execute([':id' => $id]);
        return $stmt->fetch(PDO::FETCH_ASSOC);
    }

    public function getAddresses($customerId)
    {
        $sql = "SELECT a.street, a.city, a.postalCode, ca.C_ID
            FROM Customers_Addresses AS ca 
            LEFT JOIN Addresses AS a ON ca.A_ID = a.id
            WHERE ca.C_ID = :customerId";
        $stmt = $this->pdo->prepare($sql);
        $stmt->execute([':id' => $customerId]);
        return $stmt->fetch(PDO::FETCH_ASSOC);
    }

    // DELETE - Eine Adresse löschen
    public function deleteAddress($customerId, $addressId)
    {
        $sqlCheck = "SELECT COUNT(*) as count FROM Customers_Addresses WHERE A_ID = :addressId";
        $stmtCheck = $this->pdo->prepare($sqlCheck);
        $stmtCheck->execute([':addressId' => $addressId]);
        $result = $stmtCheck->fetch();

        if ($result['count'] == 1) {
            $sqlCustomerAddresses = "DELETE FROM Customers_Addresses WHERE C_ID = :customerId AND A_ID = :addressId";
            $stmtCustomerAddresses = $this->pdo->prepare($sqlCustomerAddresses);
            $stmtCustomerAddresses->execute([
                ':customerId' => $customerId,
                ':addressId' => $addressId
            ]);

            $sqlAddresses = "DELETE FROM Addresses WHERE id = :addressId";
            $stmtAddresses = $this->pdo->prepare($sqlAddresses);
            $stmtAddresses->execute([':addressId' => $addressId]);

            return $stmtAddresses->fetch(PDO::FETCH_ASSOC);
        } else {
            $sqlCustomerAddresses = "DELETE FROM Customers_Addresses WHERE C_ID = :customerId AND A_ID = :addressId";
            $stmtCustomerAddresses = $this->pdo->prepare($sqlCustomerAddresses);
            $stmtCustomerAddresses->execute([
                ':customerId' => $customerId,
                ':addressId' => $addressId
            ]);
            return $stmtCustomerAddresses->fetch(PDO::FETCH_ASSOC);
        }
    }

    // UPDATE Address
    public function updateAddress($customerId, $addressId, $data)
    {
        $sqlCheck = "SELECT COUNT(*) as count 
                        FROM Customers_Addresses 
                        WHERE A_ID = :addressId";
        $stmtCheck = $this->pdo->prepare($sqlCheck);
        $stmtCheck->execute([':addressId' => $addressId]);
        $result = $stmtCheck->fetch();

        if ($result['count'] > 1) {
            $sqlInsert = "INSERT INTO Addresses (street, city, postalCode) VALUES (:street, :city, :postalCode)";
            $stmtInsert = $this->pdo->prepare($sqlInsert);
            $stmtInsert->execute([
                ':street' => $data['street'] ?? null,
                ':city' => $data['city'] ?? null,
                ':postalCode' => $data['postalCode'] ?? null
            ]);

            $newAddressId = $this->pdo->lastInsertId();

            $sqlUpdateCustomer = "UPDATE Customers_Addresses 
                                    SET A_ID = :newAddressId
                                    WHERE C_ID = :customerId AND A_ID = :oldAddressId";
            $stmtUpdateCustomer = $this->pdo->prepare($sqlUpdateCustomer);
            $stmtUpdateCustomer->execute([
                ':newAddressId' => $newAddressId,
                ':customerId' => $customerId,
                ':oldAddressId' => $addressId
            ]);
            return $stmtUpdateCustomer->fetch(PDO::FETCH_ASSOC);

        } else {
            $sqlUpdate = "UPDATE Addresses
                SET street = COALESCE(:street, street),
                    city = COALESCE(:city, city),
                    postalCode = COALESCE(:postalCode, postalCode)
                WHERE id = :id";

            $stmtUpdate = $this->pdo->prepare($sqlUpdate);
            $stmtUpdate->execute([
                ':id' => $addressId,
                ':street' => $data['street'] ?? null,
                ':city' => $data['city'] ?? null,
                ':postalCode' => $data['postalCode'] ?? null
            ]);
            return $stmtUpdate->fetch(PDO::FETCH_ASSOC);
        }
    }

}