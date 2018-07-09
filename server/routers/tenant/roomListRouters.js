const router = require('express').Router();
const { Room } = require('../../models/rooms/room');
const { Place } = require('../../models/places/place');
const { RoomType } = require('../../models/rooms/roomType');
const { RoomDetail } = require('../../models/rooms/roomDetail'); 
const { BillIncluded } = require('../../models/places/billIncluded'); 
const { Facility } = require('../../models/places/facility');
const { PropertyRule } = require('../../models/places/propertyRule');
const { SecurityAndSafety } = require('../../models/places/securityAndSafety');


// get all places
router.get('/places', (req, res) => {
    Place.find().then((places) => {
        res.send(places);
    }).catch((e) => {
        res.status(400).send();
    });
});

// get all rooms
router.get('/rooms', (req, res) => {
    Room.find().then((rooms) => {
        res.send(rooms);
    }).catch((e) => {
        res.status(400).send();
    });
});

// get all room types
router.get('/room-types', (req, res) => {
    RoomType.find().then((roomTypes) => {
        res.send(roomTypes);
    }).catch((e) => {
        res.status(400).send();
    });
});

// get all detail rooms
router.get('/room-details', (req, res) => {
    RoomDetail.find().then((roomDetails) => {
        res.send(roomDetails);
    }).catch((e) => {
        res.status(400).send();
    });
});

// get all bill includeds
router.get('/bill-includeds', (req, res) => {
    BillIncluded.find().then((billIncludeds) => {
        res.send(billIncludeds);
    }).catch((e) => {
        res.status(400).send();
    });
});

// get all facility items
router.get('/facilities', (req, res) => {
    Facility.find().then((facility) => {
        res.send(facility);
    }).catch((e) => {
        res.status(400).send();
    });
});

// get all property rules
router.get('/property-rules', (req, res) => {
    PropertyRule.find().then((propertyRules) => {
        res.send(propertyRules);
    }).catch((e) => {
        res.status(400).send();
    });
});

// get all security and safety
router.get('/security-safeties', (req, res) => {
    SecurityAndSafety.find().then((doc) => {
        res.send(doc);
    }).catch((e) => {
        res.status(400).send();
    });
});

module.exports = router;