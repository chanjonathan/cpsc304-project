import { TableDescription } from "./Types";


const tableDescriptions: TableDescription[] = [
    {
        name: "Missions",
        columns: [
            "MissionID",
            "Name",
            "Description",
            "StartDate",
            "EndDate",
            "ShipID",
            "Planet",
            "Latitude",
            "Longitude",
            "ControlCenterID"
        ],
        primaryKeys: ["MissionID"]
    },
    {
        name: "Facilities",
        columns: [
            "FacilityID",
            "Name",
            "Location"
        ],
        primaryKeys: ["FacilityID"]
    },
    {
        name: "Ships",
        columns: [
            "ShipID",
            "ServiceStartDate",
            "Model",
            "LaunchSiteID"
        ],
        primaryKeys: ["ShipID"]
    },
    {
        name: "Personnel",
        columns: [
            "Salary",
            "EmployeeID",
            "Name",
            "YOE"
        ],
        primaryKeys: ["EmployeeID"]
    },
    {
        name: "CrewMembers",
        columns: [
            "EmployeeID",
            "MissionsFlown"
        ],
        primaryKeys: ["EmployeeID"]
    },
    {
        name: "GroundMembers",
        columns: [
            "EmployeeID",
            "WorkModel",
            "FacilityID",
            "Clearance"
        ],
        primaryKeys: ["EmployeeID"]
    },
    {
        name: "SupplyDepots",
        columns: [
            "FacilityID",
            "VolumetricCapacity"
        ],
        primaryKeys: ["FacilityID"]
    },
    {
        name: "NumControlRooms",
        columns: [
            "MaxStaffCapacity",
            "NumControlRooms"
        ],
        primaryKeys: ["NumControlRooms"]
    },
    {
        name: "MissionControlCenters",
        columns: [
            "FacilityID",
            "NumControlRooms"
        ],
        primaryKeys: ["FacilityID"]
    },
    {
        name: "LaunchSites",
        columns: [
            "FacilityID",
            "MaximumSupportedClass"
        ],
        primaryKeys: ["FacilityID"]
    },
    {
        name: "Models",
        columns: [
            "Model",
            "Class"
        ],
        primaryKeys: ["Model"]
    },
    {
        name: "PinPoints",
        columns: [
            "FirstVisited",
            "LastVisited",
            "Planet",
            "Latitude",
            "Longitude"
        ],
        primaryKeys: ["Planet", "Latitude", "Longitude"]
    },
    {
        name: "AssignedTo",
        columns: [
            "EmployeeID",
            "MissionID",
            "Role"
        ],
        primaryKeys: ["EmployeeID", "MissionID"]
    },
    {
        name: "Tasks",
        columns: [
            "TaskID",
            "Priority",
            "Description",
            "Status",
            "MissionID"
        ],
        primaryKeys: ["TaskID"]
    },
    {
        name: "Cargo",
        columns: [
            "BarcodeNumber",
            "Volume",
            "Weight",
            "Description",
            "DepotID",
            "ShipID"
        ],
        primaryKeys: ["BarcodeNumber"]
    },
    {
        name: "Stations",
        columns: [
            "Description",
            "Position",
            "ShipID"
        ],
        primaryKeys: ["ShipID", "Position"]
    },
    {
        name: "Certifications",
        columns: [
            "CertificationID",
            "Description"
        ],
        primaryKeys: ["CertificationID"]
    },
    {
        name: "Designated",
        columns: [
            "CrewMemberID",
            "ShipID",
            "Position"
        ],
        primaryKeys: ["CrewMemberID", "ShipID", "Position"]
    },
    {
        name: "Obtained",
        columns: [
            "CertificationID",
            "CrewMemberID"
        ],
        primaryKeys: ["CertificationID", "CrewMemberID"]
    },
    {
        name: "Requires",
        columns: [
            "CertificationID",
            "ShipID",
            "Position"
        ],
        primaryKeys: ["CertificationID", "ShipID", "Position"]
    }
];


export { tableDescriptions }