const { ObjectId } = require("mongodb");
const constRole = require('../constants/role');
const gender = require('../constants/gender');

exports.SETTING = [
    {
        _id: new ObjectId("6188db5ef14de5ca1e1937ee"),
        leaveLimit: 14
    }
];

exports.DEPARTMENT = [
    { _id: new ObjectId("617cceb985cae7ea07a026c5"), name: "General" },
    { _id: new ObjectId("6146c78dc3b32091dc17acde"), name: "Human Resource" },
    { _id: new ObjectId("617c0b7a9d96b0c68c0ea850"), name: "General Management" },
    { _id: new ObjectId("617c0d89e853254640c16ddd"), name: "Marketing" },
    { _id: new ObjectId("617c0da338bde235ec509ead"), name: "Operations" },
    { _id: new ObjectId("617c0da8240f2137b4414006"), name: "Finance" },
    { _id: new ObjectId("617c0daf224a4c788a742672"), name: "Sales" },
];

exports.DESIGNATION = [
    { _id: new ObjectId('617c0cb0da829deb4c54f27e'), name: 'General Manager' },
    { _id: new ObjectId('617cc260e898292cf63dba6a'), name: 'Director' },
    { _id: new ObjectId('617cc2665c909911a9dc68d1'), name: 'Human Resource Manager' },
    { _id: new ObjectId('617cd3863772c8a189dafb74'), name: 'Operations Manager' },
    { _id: new ObjectId('617cc26be201452646f04917'), name: 'Staff' },
];

exports.ROLES = [
    { _id: new ObjectId('617cbfaed5c55792876b0458'), name: 'Admin' },
    { _id: new ObjectId('617cbffcf41d8da8c1f47d01'), name: 'Human Resource' },
    { _id: new ObjectId('617cc00276c55c12141b04cc'), name: 'Manager' },
    { _id: new ObjectId('617cc0082c33b4978ffe8d22'), name: 'Employee' }
];

exports.USERS = [
    {
        _id: new ObjectId("6118fd08ccb63ff91435ce87"),
        name: "Admin",
        email: "merakiadmin@example.com",
        password: "merakiadmin",
        phone: "123456789",
        birthday: '1995-04-20',
        gender: gender.female.id,
        department: '617cceb985cae7ea07a026c5',
        designation: '617c0cb0da829deb4c54f27e',
        role: [constRole.admin.id],
        status: 1
    },
    {
        _id: new ObjectId("617cd391a92084f724cd0164"),
        name: "HR Manager",
        email: "merakihrmanager@example.com",
        password: "merakihrmanager",
        phone: "6628155176",
        birthday: '1995-04-20',
        gender: gender.female.id,
        department: '6146c78dc3b32091dc17acde',
        designation: '617cc2665c909911a9dc68d1',
        role: [constRole.humanresource.id, constRole.manager.id],
        status: 1
    },
    {
        _id: new ObjectId("617cd398a160b02bf1d36594"),
        name: "Operation Manager",
        email: "merakiopmanager@example.com",
        password: "merakiopmanager",
        phone: "6628155176",
        birthday: '1992-04-20',
        gender: gender.male.id,
        department: '617c0da338bde235ec509ead',
        designation: '617cd3863772c8a189dafb74',
        role: [constRole.manager.id],
        status: 1
    },
    {
        _id: new ObjectId("617cd39d97ddd8cf80abfafc"),
        name: "Marketing Staff",
        email: "merakistaffmarketing@example.com",
        password: "merakistaffmarketing",
        phone: "2461527517",
        birthday: '1990-07-14',
        gender: gender.male.id,
        department: '617c0d89e853254640c16ddd',
        designation: '617cc26be201452646f04917',
        role: [constRole.employee.id],
        status: 1
    },
    {
        _id: new ObjectId("617cd3e31907e82aab680972"),
        name: "Jane Dane",
        email: "janedane@example.com",
        password: "merakistaffmarketing",
        phone: "2461527517",
        birthday: '1995-08-02',
        gender: gender.female.id,
        department: '617c0d89e853254640c16ddd',
        designation: '617cc26be201452646f04917',
        role: [constRole.employee.id],
        status: 0
    }
];
