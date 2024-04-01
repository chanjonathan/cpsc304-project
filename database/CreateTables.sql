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
	FOREIGN KEY (CertificationID) REFERENCES Certifications
);

CREATE TABLE Requires(
	CertificationID CHAR(10),
	ShipID CHAR(10),
	Position CHAR(30),
	PRIMARY KEY (CertificationID, ShipID, Position),
	FOREIGN KEY (ShipID, Position) REFERENCES Stations,
	FOREIGN KEY (CertificationID) REFERENCES Certifications
);
