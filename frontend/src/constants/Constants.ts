import { TableDescription } from "./Types";

const tableDescriptions: TableDescription[] = [
    {
        name: "Missions",
        attributes: [
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
        attributes: [
            "Name",
            "Location"
        ],
        primaryKeys: ["FacilityID"]
    },
    {
        name: "Ships",
        attributes: [
            "ServiceStartDate",
            "Model",
            "LaunchSiteID"
        ],
        primaryKeys: ["ShipID"]
    },
    {
        name: "Personnel",
        attributes: [
            "Salary",
            "Name",
            "YOE"
        ],
        primaryKeys: ["EmployeeID"]
    },
    {
        name: "CrewMembers",
        attributes: [
            "MissionsFlown"
        ],
        primaryKeys: ["EmployeeID"]
    },
    {
        name: "GroundMembers",
        attributes: [
            "WorkModel",
            "FacilityID",
            "Clearance"
        ],
        primaryKeys: ["EmployeeID"]
    },
    {
        name: "SupplyDepots",
        attributes: [
            "VolumetricCapacity"
        ],
        primaryKeys: ["FacilityID"]
    },
    {
        name: "NumControlRooms",
        attributes: [
            "MaxStaffCapacity"
        ],
        primaryKeys: ["NumControlRooms"]
    },
    {
        name: "MissionControlCenters",
        attributes: [
            "NumControlRooms"
        ],
        primaryKeys: ["FacilityID"]
    },
    {
        name: "LaunchSites",
        attributes: [
            "MaximumSupportedClass"
        ],
        primaryKeys: ["FacilityID"]
    },
    {
        name: "Models",
        attributes: [
            "Class"
        ],
        primaryKeys: ["Model"]
    },
    {
        name: "PinPoints",
        attributes: [
            "FirstVisited",
            "LastVisited"
        ],
        primaryKeys: ["Planet", "Latitude", "Longitude"]
    },
    {
        name: "AssignedTo",
        attributes: [
            "Role"
        ],
        primaryKeys: ["EmployeeID", "MissionID"]
    },
    {
        name: "Tasks",
        attributes: [
            "Priority",
            "Description",
            "Status"
        ],
        primaryKeys: ["TaskID"]
    },
    {
        name: "Cargo",
        attributes: [
            "Volume",
            "Weight",
            "Description",
            "DepotID"
        ],
        primaryKeys: ["BarcodeNumber"]
    },
    {
        name: "Stations",
        attributes: [
            "Description"
        ],
        primaryKeys: ["ShipID", "Position"]
    },
    {
        name: "Certifications",
        attributes: [
            "Description"
        ],
        primaryKeys: ["CertificationID"]
    },
    {
        name: "Designated",
        attributes: [],
        primaryKeys: ["CrewMemberID", "ShipID", "Position"]
    },
    {
        name: "Obtained",
        attributes: [],
        primaryKeys: ["CertificationID", "CrewMemberID"]
    },
    {
        name: "Requires",
        attributes: [],
        primaryKeys: ["CertificationID", "ShipID", "Position"]
    }
];

const dateColumns = ["FirstVisited", "LastVisited", "YOE", "ServiceStartDate", "StartDate", "EndDate"]

export { tableDescriptions, dateColumns };
