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
        $sql = "INSERT INTO Addresses (street, city, postalCode) VALUES (:street, :city, :postalCode)";
        $stmt = $this->pdo->prepare($sql);
        $stmt->execute([':street' => $data['street'], ':city' => $data['city'], ":postalCode" => $data['postalCode']]);
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
        $sql = "DELETE FROM Customers WHERE id = :id";
        $stmt = $this->pdo->prepare($sql);
        return $stmt->execute([':id' => $id]);

        //Adresse von dem Nutzer Löschen, wenn keine andererer Customer darauf zugreift
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
        $sqlCustomerAddresses = "DELETE FROM Customers_Addresses
                                 WHERE C_ID = :customerId
                                 AND A_ID = :addressId";
        $stmtCustomerAddresses = $this->pdo->prepare($sqlCustomerAddresses);
        $stmtCustomerAddresses->execute([
            ':customerId' => $customerId,
            ':addressId' => $addressId
        ]);
        $sqlAddresses = "DELETE FROM Addresses
                         WHERE id = :addressId";
        $stmtAddresses = $this->pdo->prepare($sqlAddresses);
        $stmtAddresses->execute([
            ':addressId' => $addressId
        ]);
        return $stmtAddresses->fetch(PDO::FETCH_ASSOC);
    }

    // UPDATE Address
    public function updateAddress($customerId, $addressId, $data)
    {
        $sql = "UPDATE Addresses
            SET street = COALESCE(:street, street),
                city = COALESCE(:city, city),
                postalCode = COALESCE(:postalCode, postalCode)
            WHERE id = :id";

        $stmt = $this->pdo->prepare($sql);
        $params = [
            ':id' => $addressId,
            ':street' => $data['street'] ?? null,
            ':city' => $data['city'] ?? null,
            ':postalCode' => $data['postalCode'] ?? null
        ];
        $stmt->execute($params);
        return $stmt->execute($params);
    }

}