DROP TABLE Requires;
DROP TABLE Obtained;
DROP TABLE Designated;
DROP TABLE Certifications;
DROP TABLE Stations;
DROP TABLE Cargo;
DROP TABLE Tasks;
DROP TABLE AssignedTo;
DROP TABLE Missions;
DROP TABLE PinPoints;
DROP TABLE Ships;
DROP TABLE Models;
DROP TABLE LaunchSites;
DROP TABLE MissionControlCenters;
DROP TABLE NumControlRooms;
DROP TABLE SupplyDepots;
DROP TABLE GroundMembers;
DROP TABLE Facilities;
DROP TABLE CrewMembers;
DROP TABLE Personnel;

CREATE TABLE Personnel(
	Salary INT, 
	EmployeeID CHAR(10), 
	Name VARCHAR(255), 
	YOE DATE,
	PRIMARY KEY (EmployeeID)
);

CREATE TABLE CrewMembers(
	EmployeeID CHAR(10), 
	MissionsFlown INT,
	PRIMARY KEY (EmployeeID),
	FOREIGN KEY (EmployeeID) REFERENCES Personnel
);

CREATE TABLE Facilities(
	FacilityID CHAR(10), 
	Name VARCHAR(255) NOT NULL, 
	Location VARCHAR(255),
	PRIMARY KEY (FacilityID),
	UNIQUE (Location)
);

CREATE TABLE GroundMembers(
	EmployeeID CHAR(10), 
	WorkModel VARCHAR(255), 
	FacilityID CHAR(10), 
	Clearance INT DEFAULT 1,
	PRIMARY KEY (EmployeeID),
	FOREIGN KEY (EmployeeID) REFERENCES Personnel(EmployeeID),
	CONSTRAINT fk_ref1 FOREIGN KEY (FacilityID) REFERENCES Facilities(FacilityID)
);

CREATE TABLE SupplyDepots(
	FacilityID CHAR(10), 
	VolumetricCapacity FLOAT(2),
	PRIMARY KEY (FacilityID),
	FOREIGN KEY (FacilityID) REFERENCES Facilities
);

CREATE TABLE NumControlRooms(
	MaxStaffCapacity INT, 
	NumControlRooms INT,
	PRIMARY KEY (NumControlRooms)
);

CREATE TABLE MissionControlCenters(
	FacilityID CHAR(10), 
	NumControlRooms INT,
	PRIMARY KEY (FacilityID),
	FOREIGN KEY (FacilityID) REFERENCES Facilities,
	FOREIGN KEY (NumControlRooms) REFERENCES NumControlRooms
);

CREATE TABLE LaunchSites(
	FacilityID CHAR(10), 
	MaximumSupportedClass VARCHAR(255),
	PRIMARY KEY (FacilityID),
	FOREIGN KEY (FacilityID) REFERENCES Facilities
);

CREATE TABLE Models(
	Model VARCHAR(255),
	Class VARCHAR(255),
	PRIMARY KEY (Model)
);

CREATE TABLE Ships(
	ShipID CHAR(10),
	ServiceStartDate DATE,
	Model VARCHAR(255),
	LaunchSiteID CHAR(10),
	PRIMARY KEY (ShipID),
	FOREIGN KEY (LaunchSiteID) REFERENCES LaunchSites(FacilityID),
	FOREIGN KEY (Model) REFERENCES Models
);

CREATE TABLE PinPoints(
	FirstVisited DATE, 
	LastVisited DATE, 
	Planet VARCHAR(255), 
	Latitude FLOAT(4), 
	Longitude FLOAT(4),
	PRIMARY KEY (Planet, Latitude, Longitude)
);

CREATE TABLE Missions(
	MissionID CHAR(10), 
	Name VARCHAR(255), 
	Description VARCHAR(255), 
	StartDate DATE, 
	EndDate DATE, 
	ShipID CHAR(10), 
	Planet VARCHAR(255), 
	Latitude FLOAT(4), 
	Longitude FLOAT(4), 
	ControlCenterID CHAR(10),
	PRIMARY KEY (MissionID),
	FOREIGN KEY (ShipID) REFERENCES Ships,
	FOREIGN KEY (Planet, Latitude, Longitude) REFERENCES PinPoints,
	 FOREIGN KEY (ControlCenterID) REFERENCES MissionControlCenters(FacilityID),
	UNIQUE (ShipID)
);

CREATE TABLE AssignedTo(
	EmployeeID CHAR(10), 
	MissionID CHAR(10), 
	Role VARCHAR(255),
	PRIMARY KEY (EmployeeID, MissionID),
	FOREIGN KEY (EmployeeID) REFERENCES Personnel,
	FOREIGN KEY (MissionID) REFERENCES Missions
);

CREATE TABLE Tasks(
	TaskID CHAR(10), 
	Priority INT, 
	Description VARCHAR(255), 
	Status VARCHAR(255) DEFAULT 'Uninitialized', 
	MissionID CHAR(10),
	PRIMARY KEY (TaskID),
	FOREIGN KEY (MissionID) REFERENCES Missions
);

CREATE TABLE Cargo(
	BarcodeNumber CHAR(10),
	Volume FLOAT(2) NOT NULL,
	Weight FLOAT(2) NOT NULL,
	Description VARCHAR(255),
	DepotID CHAR(10),
	ShipID CHAR(10),
	PRIMARY KEY (BarcodeNumber),
	FOREIGN KEY (DepotID) REFERENCES SupplyDepots(FacilityID),
	FOREIGN KEY (ShipID) REFERENCES Ships
);

CREATE TABLE Stations(
	Description VARCHAR(255),
	Position CHAR(30),
	ShipID CHAR(10),
	PRIMARY KEY (ShipID, Position),
	FOREIGN KEY (ShipID) REFERENCES Ships ON DELETE CASCADE
);

CREATE TABLE Certifications(
	CertificationID CHAR(10),
	Description VARCHAR(255),
	PRIMARY KEY (CertificationID)
);

CREATE TABLE Designated(
	CrewMemberID CHAR(10),
	ShipID CHAR(10),
	Position CHAR(30),
	PRIMARY KEY (CrewMemberID, ShipID, Position),
	FOREIGN KEY (CrewMemberID) REFERENCES CrewMembers(EmployeeID),
	FOREIGN KEY (ShipID, Position) REFERENCES Stations
);

CREATE TABLE Obtained(
	CertificationID CHAR(10),
	CrewMemberID CHAR(10),
	PRIMARY KEY (CertificationID, CrewMemberID),
	FOREIGN KEY (CrewMemberID) REFERENCES CrewMembers(EmployeeID),
	FOREIGN KEY (CertificationID) REFERENCES Certifications ON DELETE CASCADE
);

CREATE TABLE Requires(
	CertificationID CHAR(10),
	ShipID CHAR(10),
	Position CHAR(30),
	PRIMARY KEY (CertificationID, ShipID, Position),
	FOREIGN KEY (ShipID, Position) REFERENCES Stations,
	FOREIGN KEY (CertificationID) REFERENCES Certifications ON DELETE CASCADE
);

INSERT ALL
    INTO Personnel VALUES (60000, '0000000001', 'Crew Mate', DATE '2018-06-15')
    INTO Personnel VALUES (145000, '0000000002', 'Ellen Ripley', DATE '1979-05-25')
    INTO Personnel VALUES (145000, '0000000003', 'Jim Raynor', DATE '1998-03-31')
    INTO Personnel VALUES (60000, '0000000004', 'Malcolm Reynolds', DATE '2024-04-28')
    INTO Personnel VALUES (60000, '0000000005', 'John Doe', DATE '2024-04-21')
    INTO Personnel VALUES (60000, '0000000006', 'Neil Armstrong', DATE '1962-04-01')
    INTO Personnel VALUES (30000, '0000000007', 'Buzz Aldrin', DATE '1962-05-23')
    INTO Personnel VALUES (200000, '0000000008', 'Wullf Yularen', DATE '2023-07-10')
    INTO Personnel VALUES (30000, '0000000009', 'David Hickman', DATE '2018-01-03')
    INTO Personnel VALUES (30000, '0000000010', 'Joseph Hatfield', DATE '2021-11-27')
SELECT 1 FROM dual;

INSERT ALL
   INTO CrewMembers VALUES ('0000000001', 0)
   INTO CrewMembers VALUES ('0000000002', 6)
   INTO CrewMembers VALUES ('0000000003', 5)
   INTO CrewMembers VALUES ('0000000004', 6)
   INTO CrewMembers VALUES ('0000000006', 7)
SELECT 1 FROM dual;

INSERT ALL
    INTO Facilities VALUES ('0000000001', 'Mira HQ', 'Detroit')
    INTO Facilities VALUES ('0000000002', 'Aperture Enrichment Center', 'Somewhere, Michigan')
    INTO Facilities VALUES ('0000000003', 'Neumos', '925 E Pike St, Seattle')
    INTO Facilities VALUES ('0000000004', 'Googleplex', '1600 Amphitheatre Pkwy, Mountain View')
    INTO Facilities VALUES ('0000000005', 'Tesla HQ', '3500 Deer Creek Rd, Palo Alto')
    INTO Facilities VALUES ('0000000006', 'Polus', 'Polus')
    INTO Facilities VALUES ('0000000007', 'Uber HQ', '1515 Third Street in San Francisco')
    INTO Facilities VALUES ('0000000008', 'Apple Park', '1 Apple Park Way, Cupertino')
    INTO Facilities VALUES ('0000000009', 'The Middle of Nowhere', 'Kinistino, Saskachewan')
    INTO Facilities VALUES ('0000000010', 'Vancouver Public Library', '2425 Macdonald St, Vancouver')
    INTO Facilities VALUES ('0000000011', 'ICICS', '2366 Main Mall, Vancouver')
    INTO Facilities VALUES ('0000000012', 'Hugh Dempster', '6245 Agronomy Rd, Vancouver')
    INTO Facilities VALUES ('0000000013', 'Basement Food Court', '5726 University Blvd, Vancouver')
    INTO Facilities VALUES ('0000000014', 'The Nest', '6133 University Blvd, Vancouver')
    INTO Facilities VALUES ('0000000015', 'My Back Yard', '1234 Somewhere Street, Vancouver')
SELECT 1 FROM dual;

INSERT ALL
    INTO GroundMembers VALUES('0000000005', 'Hybrid', '0000000001', 1)
    INTO GroundMembers VALUES('0000000007', 'In-Person', '0000000001', 1)
    INTO GroundMembers VALUES('0000000008', 'Online', '0000000002', 1)
    INTO GroundMembers VALUES('0000000009', 'In-Person', '0000000002', 1)
    INTO GroundMembers VALUES('0000000010', 'In-Person', '0000000002', 2)
SELECT 1 FROM dual;

INSERT ALL
    INTO SupplyDepots VALUES ('0000000011', 110000)
    INTO SupplyDepots VALUES ('0000000012', 120000)
    INTO SupplyDepots VALUES ('0000000013', 130000)
    INTO SupplyDepots VALUES ('0000000014', 140000)
    INTO SupplyDepots VALUES ('0000000015', 10)
SELECT 1 FROM dual;

INSERT ALL
    INTO NumControlRooms VALUES (100, 1)
    INTO NumControlRooms VALUES (200, 2)
    INTO NumControlRooms VALUES (300, 3)
    INTO NumControlRooms VALUES (400, 4)
    INTO NumControlRooms VALUES (500, 5)
SELECT 1 FROM dual;

INSERT ALL
    INTO MissionControlCenters VALUES ('0000000001', 1)
    INTO MissionControlCenters VALUES ('0000000002', 2)
    INTO MissionControlCenters VALUES ('0000000003', 3)
    INTO MissionControlCenters VALUES ('0000000004', 4)
    INTO MissionControlCenters VALUES ('0000000005', 5)
SELECT 1 FROM dual;

INSERT ALL
    INTO LaunchSites VALUES ('0000000006', 'L-Class')
    INTO LaunchSites VALUES ('0000000007', 'M-Class')
    INTO LaunchSites VALUES ('0000000008', 'M-Class')
    INTO LaunchSites VALUES ('0000000009', 'M-Class')
    INTO LaunchSites VALUES ('0000000010', 'S-Class')
SELECT 1 FROM dual;

INSERT ALL
    INTO Models VALUES('Victory-II', 'L-Class')
    INTO Models VALUES('Lockmart CM-88B Bison', 'M-Class')
    INTO Models VALUES('Aught Three', 'S-Class')
    INTO Models VALUES('Skeld', 'L-Class')
    INTO Models VALUES('Galactica', 'L-Class')
SELECT 1 FROM dual;

INSERT ALL
    INTO Ships VALUES ('0000000001', DATE '2005-03-18', 'Victory-II', '0000000006')
    INTO Ships VALUES ('0000000002', DATE '2007-05-25', 'Lockmart CM-88B Bison', '0000000006')
    INTO Ships VALUES ('0000000003', DATE '2002-09-20', 'Aught Three', '0000000006')
    INTO Ships VALUES ('0000000004', DATE '2018-06-15', 'Skeld', '0000000006')
    INTO Ships VALUES ('0000000005', DATE '2023-11-09', 'Galactica', '0000000006')
SELECT 1 FROM dual;

INSERT ALL
    INTO PinPoints VALUES(DATE '2005-03-18', DATE '2005-03-18', 'Mars', -49.2827, -123.1207)
    INTO PinPoints VALUES(DATE '2007-05-25', DATE '2007-05-25', 'Mars', -29.7604, 95.3698)
    INTO PinPoints VALUES(DATE '2008-05-25', DATE '2008-05-25', 'Venus', 33.4489, 70.6693)
    INTO PinPoints VALUES(DATE '2009-05-25', DATE '2009-05-25', 'Pluto', 43.6532, -79.3832)
    INTO PinPoints VALUES(DATE '2011-05-25', DATE '2011-05-25', 'Mercury', 45.5019, -73.5674)
SELECT 1 FROM dual;

INSERT ALL
    INTO Missions VALUES('0000000001', 'Lalopo-11', 'Lorem Ipsum', DATE '2005-03-18', DATE '2007-05-25', '0000000001', 'Mars', -49.2827, -123.1207, '0000000001')
    INTO Missions VALUES('0000000002', 'Lalopo-12', 'Lorem Ipsum', DATE '2007-05-25', DATE '2008-05-25', '0000000002', 'Mars', -29.7604, 95.3698, '0000000002')
    INTO Missions VALUES('0000000003', 'Lalopo-13', 'Lorem Ipsum', DATE '2008-05-25', DATE '2009-05-25', '0000000003', 'Venus', 33.4489, 70.6693, '0000000003')
    INTO Missions VALUES('0000000004', 'Lalopo-14', 'Lorem Ipsum', DATE '2009-05-25', DATE '2010-05-25', '0000000004', 'Pluto', 43.6532, -79.3832, '0000000002')
    INTO Missions VALUES('0000000005', 'Lalopo-15', 'Lorem Ipsum', DATE '2011-05-25', DATE '2012-05-25', '0000000005', 'Mercury', 45.5019, -73.5674, '0000000005')
SELECT 1 FROM dual;

INSERT ALL
    INTO AssignedTo VALUES('0000000009', '0000000001', 'Flight Director')
    INTO AssignedTo VALUES('0000000010', '0000000001', 'Spacecraft Communicator')
    INTO AssignedTo VALUES('0000000002', '0000000001', 'Flight Engineer')
    INTO AssignedTo VALUES('0000000003', '0000000001', 'Commander')
    INTO AssignedTo VALUES('0000000001', '0000000001', 'Pilot')
    INTO AssignedTo VALUES('0000000001', '0000000002', 'Pilot')
    INTO AssignedTo VALUES('0000000001', '0000000003', 'Pilot')
    INTO AssignedTo VALUES('0000000001', '0000000004', 'Pilot')
    INTO AssignedTo VALUES('0000000001', '0000000005', 'Pilot')
SELECT 1 FROM dual;

INSERT ALL
    INTO Tasks (TaskID, Priority, Description, MissionID) VALUES ('0000000001', 3, 'Fix wiring', '0000000001')
    INTO Tasks (TaskID, Priority, Description, MissionID) VALUES ('0000000002', 1, 'Clear asteroids', '0000000001')
    INTO Tasks (TaskID, Priority, Description, MissionID) VALUES ('0000000003', 1, 'Mine minerals', '0000000001')
    INTO Tasks (TaskID, Priority, Description, MissionID) VALUES ('0000000004', 1, 'Collect vespene ', '0000000001')
    INTO Tasks (TaskID, Priority, Description, MissionID) VALUES ('0000000005', 1, 'Twiddle thumbs', '0000000001')
SELECT 1 FROM dual;

INSERT ALL
    INTO Cargo VALUES ('0000000001', 10.47, 2.01, 'Components', '0000000011', '0000000001')
    INTO Cargo VALUES ('0000000002', 1.89, 4.00, 'Components', '0000000011', '0000000001')
    INTO Cargo VALUES ('0000000003', 98.2, 3.48, 'Components', '0000000011', '0000000001')
    INTO Cargo VALUES ('0000000004', 5.80, 3.01, 'Components', '0000000011', '0000000001')
    INTO Cargo VALUES ('0000000005', 2.98, 5.00, 'Components', '0000000011', '0000000001')
SELECT 1 FROM dual;

INSERT ALL
    INTO Stations VALUES ('Determines route and makes course changes', 'Navigation', '0000000001')
    INTO Stations VALUES ('Runs botanical garden in ship', 'Botanical', '0000000001')
    INTO Stations VALUES ('Runs security', 'Security', '0000000001')
    INTO Stations VALUES ('Flies the ship', 'Flight Control', '0000000001')
    INTO Stations VALUES ('Conducts research in space', 'Research', '0000000001')
    INTO Stations VALUES ('Read ship vitals', 'Bridge', '0000000001')
SELECT 1 FROM dual;

INSERT ALL
    INTO Certifications VALUES ('0000000001', 'Flying a ship 101')
    INTO Certifications VALUES ('0000000002', 'Bachelor of Science')
    INTO Certifications VALUES ('0000000003', 'Exercising authority in space 101')
    INTO Certifications VALUES ('0000000004', 'Gardening 101')
    INTO Certifications VALUES ('0000000005', 'How to find yourself in space 101')
SELECT 1 FROM dual;

INSERT ALL
    INTO Designated VALUES ('0000000001', '0000000001', 'Navigation')
    INTO Designated VALUES ('0000000002', '0000000001', 'Botanical')
    INTO Designated VALUES ('0000000003', '0000000001', 'Security')
    INTO Designated VALUES ('0000000004', '0000000001', 'Flight Control')
    INTO Designated VALUES ('0000000006', '0000000001', 'Research')
SELECT 1 FROM dual;

INSERT ALL
    INTO Obtained VALUES ('0000000005', '0000000001')
    INTO Obtained VALUES ('0000000004', '0000000002')
    INTO Obtained VALUES ('0000000003', '0000000003')
    INTO Obtained VALUES ('0000000003', '0000000001')
    INTO Obtained VALUES ('0000000004', '0000000001')
    INTO Obtained VALUES ('0000000005', '0000000002')
SELECT 1 FROM dual;

INSERT ALL
    INTO Requires VALUES ('0000000005', '0000000001', 'Flight Control')
    INTO Requires VALUES ('0000000004', '0000000001', 'Botanical')
    INTO Requires VALUES ('0000000003', '0000000001', 'Security')
    INTO Requires VALUES ('0000000001', '0000000001', 'Bridge')
    INTO Requires VALUES ('0000000002', '0000000001', 'Research')
SELECT 1 FROM dual;
