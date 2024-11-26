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

    // Insert new Employees
    public function insertEmployees($firstName, $lastName, $position, $phoneNumber, $eMail, $customerID)
    {
        $sql = "INSERT INTO Costumers (firstName, lastName, position, phoneNumber, eMail, customerID) VALUES (:firstName, :lastName, :position, :phoneNumber, :eMail, :customerID)";
        $stmt = $this->pdo->prepare($sql);
        $stmt->execute([':firstName' => $data['firstName'], ':lastName' => $data['lastName'], ":position" => $data['position'], ":phoneNumber" => $data['phoneNumber'], ":eMail" => data['eMail'], "customerID" => $data['customerID'] ]);
        return $this->pdo->lastInsertId();
    }

    // GET all Employees
    public function getAllEmployees()
    {
        $sql = "SELECT * FROM Employees";
        $stmt = $this->pdo->query($sql);
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    // Get Employee by ID
    public function getEmployeebyID($id)
    {
        $sql = "SELECT * FROM Employees WHERE id = :id";
        $stmt = $this->pdo->prepare($sql);
        $stmt->execute([':id' => $data["id"]]);
        return $stmt->fetch(PDO::FETCH_ASSOC);
    }

    // UPDATE - Einen Benutzer aktualisieren
    public function updateEmployee($id, $name, $email)
    {
        $sql = "UPDATE Employees SET name = :name, email = :email WHERE id = :id";
        $stmt = $this->pdo->prepare($sql);
        return $stmt->execute([':id' => $data["id"], ':firstName' => $data['firstName'], ':lastName' => $data['lastName'], ":position" => $data['position'], ":phoneNumber" => $data['phoneNumber'], ":eMail" => data['eMail'], "customerID" => $data['customerID']]);
    }

    // DELETE - Einen Benutzer löschen
    public function deleteUser($id)
    {
        $sql = "DELETE FROM Employees WHERE id = :id";
        $stmt = $this->pdo->prepare($sql);
        return $stmt->execute([':id' => $data["id"]]);
    }
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
