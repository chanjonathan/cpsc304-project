import { TableData } from "../modules/Types";

const Personnel = [
    {
        Salary: 60000,
        EmployeeID: '0000000001',
        Name: 'Crew Mate',
        YOE: '2018-06-15'
    },
    {
        Salary: 145000,
        EmployeeID: '0000000002',
        Name: 'Ellen Ripley',
        YOE: '1979-05-25'
    },
    {
        Salary: 145000,
        EmployeeID: '0000000003',
        Name: 'Jim Raynor',
        YOE: '1998-03-31'
    },
    {
        Salary: 60000,
        EmployeeID: '0000000004',
        Name: 'Malcolm Reynolds',
        YOE: '2024-04-28'
    },
    {
        Salary: 60000,
        EmployeeID: '0000000005',
        Name: 'John Doe',
        YOE: '2024-04-21'
    },
    {
        Salary: 60000,
        EmployeeID: '0000000006',
        Name: 'Neil Armstrong',
        YOE: '1962-04-01'
    },
    {
        Salary: 60000,
        EmployeeID: '0000000007',
        Name: 'Buzz Aldrin',
        YOE: '1962-05-23'
    },
    {
        Salary: 60000,
        EmployeeID: '0000000008',
        Name: 'Wullf Yularen',
        YOE: '2023-07-10'
    },
    {
        Salary: 60000,
        EmployeeID: '0000000009',
        Name: 'David Hickman',
        YOE: '2018-01-03'
    },
    {
        Salary: 60000,
        EmployeeID: '0000000010',
        Name: 'Joseph Hatfield',
        YOE: '2021-11-27'
    }
];

const CrewMembers = [
    {
        EmployeeID: '0000000001',
        MissionsFlown: 0
    },
    {
        EmployeeID: '0000000002',
        MissionsFlown: 6
    },
    {
        EmployeeID: '0000000003',
        MissionsFlown: 5
    },
    {
        EmployeeID: '0000000004',
        MissionsFlown: 6
    },
    {
        EmployeeID: '0000000006',
        MissionsFlown: 7
    }
];

const Facilities = [
    {
        FacilityID: '0000000001',
        Name: 'Mira HQ',
        Location: 'Detroit'
    },
    {
        FacilityID: '0000000002',
        Name: 'Aperture Enrichment Center',
        Location: 'Somewhere, Michigan'
    },
    {
        FacilityID: '0000000003',
        Name: 'Neumos',
        Location: '925 E Pike St, Seattle'
    },
    {
        FacilityID: '0000000004',
        Name: 'Googleplex',
        Location: '1600 Amphitheatre Pkwy, Mountain View'
    },
    {
        FacilityID: '0000000005',
        Name: 'Tesla HQ',
        Location: '3500 Deer Creek Rd, Palo Alto'
    },
    {
        FacilityID: '0000000006',
        Name: 'Polus',
        Location: 'Polus'
    },
    {
        FacilityID: '0000000007',
        Name: 'Uber HQ',
        Location: '1515 Third Street in San Francisco'
    },
    {
        FacilityID: '0000000008',
        Name: 'Apple Park',
        Location: '1 Apple Park Way, Cupertino'
    },
    {
        FacilityID: '0000000009',
        Name: 'The Middle of Nowhere',
        Location: 'Kinistino, Saskachewan'
    },
    {
        FacilityID: '0000000010',
        Name: 'Vancouver Public Library',
        Location: '2425 Macdonald St, Vancouver'
    },
    {
        FacilityID: '0000000011',
        Name: 'ICICS',
        Location: '2366 Main Mall, Vancouver'
    },
    {
        FacilityID: '0000000012',
        Name: 'Hugh Dempster',
        Location: '6245 Agronomy Rd, Vancouver'
    },
    {
        FacilityID: '0000000013',
        Name: 'Basement Food Court',
        Location: '5726 University Blvd, Vancouver'
    },
    {
        FacilityID: '0000000014',
        Name: 'The Nest',
        Location: '6133 University Blvd, Vancouver'
    },
    {
        FacilityID: '0000000015',
        Name: 'My Back Yard',
        Location: '1234 Somewhere Street, Vancouver'
    }
];

const GroundMembers = [
    {
        EmployeeID: '0000000005',
        WorkModel: 'Hybrid',
        FacilityID: '0000000001',
        Clearance: 1
    },
    {
        EmployeeID: '0000000007',
        WorkModel: 'In-Person',
        FacilityID: '0000000001',
        Clearance: 1
    },
    {
        EmployeeID: '0000000008',
        WorkModel: 'Online',
        FacilityID: '0000000002',
        Clearance: 1
    },
    {
        EmployeeID: '0000000009',
        WorkModel: 'In-Person',
        FacilityID: '0000000002',
        Clearance: 1
    },
    {
        EmployeeID: '0000000010',
        WorkModel: 'In-Person',
        FacilityID: '0000000002',
        Clearance: 2
    }
];

const SupplyDepots = [
    {
        FacilityID: '0000000011',
        VolumetricCapacity: 110000
    },
    {
        FacilityID: '0000000012',
        VolumetricCapacity: 120000
    },
    {
        FacilityID: '0000000013',
        VolumetricCapacity: 130000
    },
    {
        FacilityID: '0000000014',
        VolumetricCapacity: 140000
    },
    {
        FacilityID: '0000000015',
        VolumetricCapacity: 10
    }
];

const NumControlRooms = [
    {
        MaxStaffCapacity: 100,
        NumControlRooms: 1
    },
    {
        MaxStaffCapacity: 200,
        NumControlRooms: 2
    },
    {
        MaxStaffCapacity: 300,
        NumControlRooms: 3
    },
    {
        MaxStaffCapacity: 400,
        NumControlRooms: 4
    },
    {
        MaxStaffCapacity: 500,
        NumControlRooms: 5
    }
];

const MissionControlCenters = [
    {
        FacilityID: '0000000001',
        NumControlRooms: 1
    },
    {
        FacilityID: '0000000002',
        NumControlRooms: 2
    },
    {
        FacilityID: '0000000003',
        NumControlRooms: 3
    },
    {
        FacilityID: '0000000004',
        NumControlRooms: 4
    },
    {
        FacilityID: '0000000005',
        NumControlRooms: 5
    }
];

const LaunchSites = [
    {
        FacilityID: '0000000006',
        MaximumSupportedClass: 'L-Class'
    },
    {
        FacilityID: '0000000007',
        MaximumSupportedClass: 'M-Class'
    },
    {
        FacilityID: '0000000008',
        MaximumSupportedClass: 'M-Class'
    },
    {
        FacilityID: '0000000009',
        MaximumSupportedClass: 'M-Class'
    },
    {
        FacilityID: '0000000010',
        MaximumSupportedClass: 'S-Class'
    }
];

const Models = [
    {
        Model: 'Victory-II',
        Class: 'L-Class'
    },
    {
        Model: 'Lockmart CM-88B Bison',
        Class: 'M-Class'
    },
    {
        Model: 'Aught Three',
        Class: 'S-Class'
    },
    {
        Model: 'Skeld',
        Class: 'L-Class'
    },
    {
        Model: 'Galactica',
        Class: 'L-Class'
    }
];

const Ships = [
    {
        ShipID: '0000000001',
        ServiceStartDate: '2005-03-18',
        Model: 'Victory-II',
        LaunchSiteID: '0000000006'
    },
    {
        ShipID: '0000000002',
        ServiceStartDate: '2007-05-25',
        Model: 'Lockmart CM-88B Bison',
        LaunchSiteID: '0000000006'
    },
    {
        ShipID: '0000000003',
        ServiceStartDate: '2002-09-20',
        Model: 'Aught Three',
        LaunchSiteID: '0000000006'
    },
    {
        ShipID: '0000000004',
        ServiceStartDate: '2018-06-15',
        Model: 'Skeld',
        LaunchSiteID: '0000000006'
    },
    {
        ShipID: '0000000005',
        ServiceStartDate: '2023-11-09',
        Model: 'Galactica',
        LaunchSiteID: '0000000006'
    }
];

const PinPoints = [
    {
        FirstVisited: '2005-03-18',
        LastVisited: '2005-03-18',
        Planet: 'Mars',
        Latitude: -49.2827,
        Longitude: -123.1207
    },
    {
        FirstVisited: '2007-05-25',
        LastVisited: '2007-05-25',
        Planet: 'Mars',
        Latitude: -29.7604,
        Longitude: 95.3698
    },
    {
        FirstVisited: '2008-05-25',
        LastVisited: '2008-05-25',
        Planet: 'Venus',
        Latitude: 33.4489,
        Longitude: 70.6693
    },
    {
        FirstVisited: '2009-05-25',
        LastVisited: '2009-05-25',
        Planet: 'Pluto',
        Latitude: 43.6532,
        Longitude: -79.3832
    },
    {
        FirstVisited: '2011-05-25',
        LastVisited: '2011-05-25',
        Planet: 'Mercury',
        Latitude: 45.5019,
        Longitude: -73.5674
    }
];

const Missions = [
    {
        MissionID: '0000000001',
        Name: 'Lalopo-11',
        Description: 'Lorem Ipsum',
        StartDate: '2005-03-18',
        EndDate: '2007-05-25',
        ShipID: '0000000001',
        Planet: 'Mars',
        Latitude: '-49.2827',
        Longitude: '-123.1207',
        ControlCenterID: '0000000001'
    },
    {
        MissionID: '0000000002',
        Name: 'Lalopo-12',
        Description: 'Lorem Ipsum',
        StartDate: '2007-05-25',
        EndDate: '2008-05-25',
        ShipID: '0000000002',
        Planet: 'Mars',
        Latitude: '-29.7604',
        Longitude: '95.3698',
        ControlCenterID: '0000000002'
    },
    {
        MissionID: '0000000003',
        Name: 'Lalopo-13',
        Description: 'Lorem Ipsum',
        StartDate: '2008-05-25',
        EndDate: '2009-05-25',
        ShipID: '0000000003',
        Planet: 'Venus',
        Latitude: '33.4489',
        Longitude: '70.6693',
        ControlCenterID: '0000000003'
    },
    {
        MissionID: '0000000004',
        Name: 'Lalopo-14',
        Description: 'Lorem Ipsum',
        StartDate: '2009-05-25',
        EndDate: '2010-05-25',
        ShipID: '0000000004',
        Planet: 'Pluto',
        Latitude: '43.6532',
        Longitude: '-79.3832',
        ControlCenterID: '0000000002'
    },
    {
        MissionID: '0000000005',
        Name: 'Lalopo-15',
        Description: 'Lorem Ipsum',
        StartDate: '2011-05-25',
        EndDate: '2012-05-25',
        ShipID: '0000000005',
        Planet: 'Mercury',
        Latitude: '45.5019',
        Longitude: '-73.5674',
        ControlCenterID: '0000000005'
    }
];

const AssignedTo = [
    {
        EmployeeID: '0000000009',
        MissionID: '0000000001',
        Role: 'Flight Director'
    },
    {
        EmployeeID: '0000000010',
        MissionID: '0000000001',
        Role: 'Spacecraft Communicator'
    },
    {
        EmployeeID: '0000000002',
        MissionID: '0000000001',
        Role: 'Flight Engineer'
    },
    {
        EmployeeID: '0000000003',
        MissionID: '0000000001',
        Role: 'Commander'
    },
    {
        EmployeeID: '0000000001',
        MissionID: '0000000001',
        Role: 'Pilot'
    }
];

const Tasks = [
    {
        TaskID: '0000000001',
        Priority: 3,
        Description: 'Fix wiring',
        Status: 'Uninitialized',
        MissionID: '0000000001'
    },
    {
        TaskID: '0000000002',
        Priority: 1,
        Description: 'Clear asteroids',
        Status: 'Uninitialized',
        MissionID: '0000000001'
    },
    {
        TaskID: '0000000003',
        Priority: 1,
        Description: 'Mine minerals',
        Status: 'Uninitialized',
        MissionID: '0000000001'
    },
    {
        TaskID: '0000000004',
        Priority: 1,
        Description: 'Collect vespene gas',
        Status: 'Uninitialized',
        MissionID: '0000000001'
    },
    {
        TaskID: '0000000005',
        Priority: 1,
        Description: 'Twiddle thumbs',
        Status: 'Uninitialized',
        MissionID: '0000000001'
    }
];

const Cargo = [
    {
        BarcodeNumber: '0000000001',
        Volume: 10.47,
        Weight: 2.01,
        Description: 'Components',
        DepotID: '0000000011',
        ShipID: '0000000001'
    },
    {
        BarcodeNumber: '0000000002',
        Volume: 1.89,
        Weight: 4.00,
        Description: 'Components',
        DepotID: '0000000011',
        ShipID: '0000000001'
    },
    {
        BarcodeNumber: '0000000003',
        Volume: 98.2,
        Weight: 3.48,
        Description: 'Components',
        DepotID: '0000000011',
        ShipID: '0000000001'
    },
    {
        BarcodeNumber: '0000000004',
        Volume: 5.80,
        Weight: 3.01,
        Description: 'Components',
        DepotID: '0000000011',
        ShipID: '0000000001'
    },
    {
        BarcodeNumber: '0000000005',
        Volume: 2.98,
        Weight: 5.00,
        Description: 'Components',
        DepotID: '0000000011',
        ShipID: '0000000001'
    }
];

const Stations = [
    {
        Description: 'Determines route and makes course changes',
        Position: 'Navigation',
        ShipID: '0000000001'
    },
    {
        Description: 'Runs botanical garden in ship',
        Position: 'Botanical',
        ShipID: '0000000001'
    },
    {
        Description: 'Runs security',
        Position: 'Security',
        ShipID: '0000000001'
    },
    {
        Description: 'Flies the ship',
        Position: 'Flight Control',
        ShipID: '0000000001'
    },
    {
        Description: 'Conducts research in space',
        Position: 'Research',
        ShipID: '0000000001'
    },
    {
        Description: 'Read ship vitals',
        Position: 'Bridge',
        ShipID: '0000000001'
    }
];

const Certifications = [
    {
        CertificationID: '0000000001',
        Description: 'Flying a ship 101'
    },
    {
        CertificationID: '0000000002',
        Description: 'Bachelor of Science'
    },
    {
        CertificationID: '0000000003',
        Description: 'Exercising authority in space 101'
    },
    {
        CertificationID: '0000000004',
        Description: 'Gardening 101'
    },
    {
        CertificationID: '0000000005',
        Description: 'How to find yourself in space 101'
    }
];

const Designated = [
    {
        CrewMemberID: '0000000001',
        ShipID: '0000000001',
        Position: 'Navigation'
    },
    {
        CrewMemberID: '0000000002',
        ShipID: '0000000001',
        Position: 'Botanical'
    },
    {
        CrewMemberID: '0000000003',
        ShipID: '0000000001',
        Position: 'Security'
    },
    {
        CrewMemberID: '0000000004',
        ShipID: '0000000001',
        Position: 'Flight Control'
    },
    {
        CrewMemberID: '0000000006',
        ShipID: '0000000001',
        Position: 'Research'
    }
];

const Obtained = [
    {
        CertificationID: '0000000005',
        CrewMemberID: '0000000001'
    },
    {
        CertificationID: '0000000004',
        CrewMemberID: '0000000002'
    },
    {
        CertificationID: '0000000003',
        CrewMemberID: '0000000003'
    },
    {
        CertificationID: '0000000003',
        CrewMemberID: '0000000001'
    },
    {
        CertificationID: '0000000004',
        CrewMemberID: '0000000001'
    },
    {
        CertificationID: '0000000005',
        CrewMemberID: '0000000002'
    }
];

const Requires = [
    {
        CertificationID: '0000000005',
        ShipID: '0000000001',
        Position: 'Flight Control'
    },
    {
        CertificationID: '0000000004',
        ShipID: '0000000001',
        Position: 'Botanical'
    },
    {
        CertificationID: '0000000003',
        ShipID: '0000000001',
        Position: 'Security'
    },
    {
        CertificationID: '0000000001',
        ShipID: '0000000001',
        Position: 'Bridge'
    },
    {
        CertificationID: '0000000002',
        ShipID: '0000000001',
        Position: 'Research'
    }
];

const MockGetData: { [key:string]: TableData[] } = {
    Personnel: Personnel,
    CrewMembers: CrewMembers,
    Facilities: Facilities,
    GroundMembers: GroundMembers,
    SupplyDepots: SupplyDepots,
    NumControlRooms: NumControlRooms,
    MissionControlCenters: MissionControlCenters,
    LaunchSites: LaunchSites,
    Models: Models,
    Ships: Ships,
    PinPoints: PinPoints,
    Missions: Missions,
    AssignedTo: AssignedTo,
    Tasks: Tasks,
    Cargo: Cargo,
    Stations: Stations,
    Certifications: Certifications,
    Designated: Designated,
    Obtained: Obtained,
    Requires: Requires
};

export { MockGetData }