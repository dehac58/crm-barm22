<?php

class EmployeeService
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
    public function createEmployee($data)
    {

        $sql = "INSERT INTO Employees (firstName, lastName, position, phoneNumber, eMail, customerID) VALUES (:firstName, :lastName, :position, :phoneNumber, :eMail, :customerID)";
        $stmt = $this->pdo->prepare($sql);
        $stmt->execute([':firstName' => $data['firstName'], ':lastName' => $data['lastName'], ":position" => $data['position'], ":phoneNumber" => $data['phoneNumber'], ":eMail" => $data['eMail'], "customerID" => $data['customerID'] ]);
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
    public function getEmployeeById($id)
    {
        $sql = "SELECT * FROM Employees WHERE id = :id";
        $stmt = $this->pdo->prepare($sql);
        $stmt->execute([':id' => $id]);
        return $stmt->fetch(PDO::FETCH_ASSOC);
    }

    
    // UPDATE - Einen Benutzer aktualisieren
    public function updateEmployee($id, $data)
    {
    $sql = "UPDATE Employees
            SET firstName = COALESCE(:firstName, firstName),
                lastName = COALESCE(:lastName, lastName),
                position = COALESCE(:position, position),
                phoneNumber = COALESCE(:phoneNumber, phoneNumber),
                eMail = COALESCE(:eMail, eMail),
                customerID = COALESCE(:customerID, customerID)
            WHERE id = :id";

    $stmt = $this->pdo->prepare($sql);
    $params = [
        ':id' => $id,
        ':firstName' => $data['firstName'] ?? null,
        ':lastName' => $data['lastName'] ?? null,
        ':position' => $data['position'] ?? null,
        ':phoneNumber' => $data['phoneNumber'] ?? null,
        ':eMail' => $data['eMail'] ?? null,
        ':customerID' => $data['customerID'] ?? null
    ];

    return $stmt->execute($params);
    }
    
    // DELETE - Einen Employee löschen
    public function deleteEmployee($id)
    {
        $sql = "DELETE FROM Employees WHERE id = :id";
        $stmt = $this->pdo->prepare($sql);
        return $stmt->execute([':id' => $id]);
    }
}
