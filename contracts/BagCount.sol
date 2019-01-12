pragma solidity ^0.5.0;

contract BagCount {
    
    //used to record a delivery
    struct Delivery {
        address center;
        uint bagCount;
        uint dateTimeStamp;
        uint plantCount;
    }
    
    //initial creator of the contract
    address public recyclingPlant;

    //each delivery is given a unique ID
    uint private deliveryId;

    //use to map the delivery ID to the specific delivery
    mapping(uint => Delivery) private deliveries;
    
    //modifies methods so they can only be called by the plant
    modifier restricted() {
        require(msg.sender == recyclingPlant, "Only plant account can modify this data");
        _;
    }
    
    event LogCenterDelivery(
        address _center, uint _id
    );

    event Discrepancy(
        uint difference
    );
    
    event CheckDelivery(
        address center,
        uint centerBagCount,
        uint dateTimeStamp,
        uint plantCount
    );
    
    //constructor function which assigns the value of the plant to the creator & initializes UID
    constructor() public {
        recyclingPlant = msg.sender;
        deliveryId = 0;
    }

    //called by centers to record a count, returns the index of that count
    function recordCount(uint newCount, uint dateTime) public returns(uint) {
        Delivery memory newDelivery = Delivery({
            center: msg.sender,
            bagCount: newCount,
            dateTimeStamp: dateTime,
            plantCount: 0
        });
        deliveryId++;
        deliveries[deliveryId] = newDelivery;
        emit LogCenterDelivery(msg.sender,deliveryId);
        return deliveryId;
    }
    
    //plant can verify a delivery
    function verifyDelivery(uint requestedId, uint verifiedCount) public restricted returns(uint) {
        Delivery storage delivery = deliveries[requestedId];
        delivery.plantCount = verifiedCount;
        if (verifiedCount != delivery.bagCount) {
            emit Discrepancy(verifiedCount - delivery.bagCount);
            return verifiedCount - delivery.bagCount;
        } else {
            return 0;
        }
    }
    
    //calls a specific recorded delivery - can only be viewed after both parties have submitted their count
    function getDelivery(uint requestedId) public returns (address, uint, uint, uint) {
        Delivery storage delivery = deliveries[requestedId];
        if (delivery.plantCount != 0) {
            emit CheckDelivery(delivery.center, delivery.bagCount, delivery.dateTimeStamp, delivery.plantCount);
            return (delivery.center, delivery.bagCount, delivery.dateTimeStamp, delivery.plantCount);
        }
        else {
            return (delivery.center,0,0,0);
        }
        
    }
    
}