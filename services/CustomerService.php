<?php

class DatabaseService
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
    public function createCustomer($companyName, $contactEmail, $contactPhone)
    {
        $sql = "INSERT INTO Costumers (companyName, contactEmail, contactPhone) VALUES (:companyName, :contactEmail, :contactPhone)";
        $stmt = $this->pdo->prepare($sql);
        $stmt->execute([':companyName' => $data['companyName'], ':contactEmail' => $data['contactEmail'], ":contactPhone" => $data['contactPhone']]);
        return $this->pdo->lastInsertId();
    }

    // Insert new Adress
    public function createAdress($street, $city, $postalCode)
    {
        $sql = "INSERT INTO Adresses (street, city, postalCode) VALUES (:street, :city, :postalCode)";
        $stmt = $this->pdo->prepare($sql);
        $stmt->execute([':street' => $data['street'], ':city' => $data['city'], ":postalCode" => $data['postalCode']]);
        return $this->pdo->lastInsertId();
    }

    // Get all Customer
    public function getAllCustomer()
    {
        $sql = "SELECT * FROM Customer";
        $stmt = $this->pdo->query($sql);
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    // Get all Adresses
    public function getAllCustomers()
    {
        $sql = "SELECT * FROM Adresses";
        $stmt = $this->pdo->query($sql);
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    // Get Customer by ID
    public function getCustomerById($id)
    {
        $sql = "SELECT * FROM Customer WHERE id = :id";
        $stmt = $this->pdo->prepare($sql);
        $stmt->execute([':id' => $data["id"]]);
        return $stmt->fetch(PDO::FETCH_ASSOC);
    }

    // Get Adress by ID
    public function getAdressbyID($id)
    {
        $sql = "SELECT * FROM Adresses WHERE id = :id";
        $stmt = $this->pdo->prepare($sql);
        $stmt->execute([':id' => $data["id"]]);
        return $stmt->fetch(PDO::FETCH_ASSOC);
    }

    // UPDATE - Einen Customer aktualisieren
    public function updateCustomer($id, $companyName, $contactEmail, $contactPhone)
    {
        $sql = "UPDATE Customers SET companyName = :companyName, contactEmail = :contactEmail, contactPhone = :contactPhone WHERE id = :id";
        $stmt = $this->pdo->prepare($sql);
        return $stmt->execute([':id' => $data["id"], ':companyName' => $data['companyName'], ':contactEmail' => $data['contactEmail'], ":contactPhone" => $data['contactPhone']]);
    }

    // UPDATE - Eine Adresse aktualisieren
    public function updateCustomer($id, $street, $city, $postalCode)
    {
        $sql = "UPDATE Customers SET street = :street, city = :city, postalCode = :postalCode WHERE id = :id";
        $stmt = $this->pdo->prepare($sql);
        return $stmt->execute([':id' => $data["id"], ':street' => $data['street'], ':city' => $data['city'], ":postalCode" => $data['postalCode']]);
    }

    // DELETE - Einen Benutzer löschen
    public function deleteCustomer($id)
    {
        $sql = "DELETE FROM Customers WHERE id = :id";
        $stmt = $this->pdo->prepare($sql);
        return $stmt->execute([':id' => $data["id"]]);

        //Adresse von dem Nutzer Löschen, wenn keine andererer Customer darauf zugreift
    }

    // DELETE - Eine Adresse löschen
    public function deleteAdresses($id)
    {
        $sql = "DELETE FROM Adresses WHERE id = :id";
        $stmt = $this->pdo->prepare($sql);
        return $stmt->execute([':id' => $data["id"]]);
    }

    getCustomerEmployees
}

// // Beispiel zur Verwendung der Klasse:

// // Instanz der Klasse erstellen
// $dbService = new DatabaseService();

// // Benutzer erstellen
// $userId = $dbService->createUser('Max Mustermann', 'max@example.com');
// echo "User created with ID: $userId\n";

// // Alle Benutzer abrufen
// $users = $dbService->getAllUsers();
// print_r($users);

// // Einzelnen Benutzer abrufen
// $user = $dbService->getUserById($userId);
// print_r($user);

// // Benutzer aktualisieren
// $dbService->updateUser($userId, 'Max Mustermann', 'max.updated@example.com');

// // Benutzer löschen
// $dbService->deleteUser($userId);
// echo "User deleted.\n";
