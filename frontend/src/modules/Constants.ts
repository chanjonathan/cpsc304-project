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
        ]
    },
    {
        name: "Facilities",
        columns: [
            "FacilityID",
            "Name",
            "Location"
        ]
    },
    {
        name: "Ships",
        columns: [
            "ShipID",
            "ServiceStartDate",
            "Model",
            "LaunchSiteID"
        ]
    },
    {
        name: "Personnel",
        columns: [
            "Salary",
            "EmployeeID",
            "Name",
            "YOE"
        ]
    },
    {
        name: "CrewMembers",
        columns: [
            "EmployeeID",
            "MissionsFlown"
        ]
    },
    {
        name: "GroundMembers",
        columns: [
            "EmployeeID",
            "WorkModel",
            "FacilityID",
            "Clearance"
        ]
    },
    {
        name: "SupplyDepots",
        columns: [
            "FacilityID",
            "VolumetricCapacity"
        ]
    },
    {
        name: "NumControlRooms",
        columns: [
            "MaxStaffCapacity",
            "NumControlRooms"
        ]
    },
    {
        name: "MissionControlCenters",
        columns: [
            "FacilityID",
            "NumControlRooms"
        ]
    },
    {
        name: "LaunchSites",
        columns: [
            "FacilityID",
            "MaximumSupportedClass"
        ]
    },
    {
        name: "Models",
        columns: [
            "Model",
            "Class"
        ]
    },
    {
        name: "PinPoints",
        columns: [
            "FirstVisited",
            "LastVisited",
            "Planet",
            "Latitude",
            "Longitude"
        ]
    },
    {
        name: "AssignedTo",
        columns: [
            "EmployeeID",
            "MissionID",
            "Role"
        ]
    },
    {
        name: "Tasks",
        columns: [
            "TaskID",
            "Priority",
            "Description",
            "Status",
            "MissionID"
        ]
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
        ]
    },
    {
        name: "Stations",
        columns: [
            "Description",
            "Position",
            "ShipID"
        ]
    },
    {
        name: "Certifications",
        columns: [
            "CertificationID",
            "Description"
        ]
    },
    {
        name: "Designated",
        columns: [
            "CrewMemberID",
            "ShipID",
            "Position"
        ]
    },
    {
        name: "Obtained",
        columns: [
            "CertificationID",
            "CrewMemberID"
        ]
    },
    {
        name: "Requires",
        columns: [
            "CertificationID",
            "ShipID",
            "Position"
        ]
    }
];


export { tableDescriptions }