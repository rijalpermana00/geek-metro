const TOTAL_COLLECTION_STRING = 'TOTAL_COLLECTION';
const PASSENGER_TYPE_SUMMARY_STRING = 'PASSENGER_TYPE_SUMMARY';

class Reporting {
  constructor(transaction) {
    this.transaction = transaction;
  }

  summary() {
    const sortedCollections = this.sortCollections();
    sortedCollections.forEach(entry => {
      this.printTotalCollection(entry);
      this.printPassengerTypeSummary(entry);
    });
  }

  sortCollections() {
    return this.transaction.collections.slice().sort((a, b) => b.destination.localeCompare(a.destination));
  }

  printTotalCollection(entry) {
    const totalCollection = entry.collection;
    const totalDiscount = entry.discount;
    console.log(`${TOTAL_COLLECTION_STRING} ${entry.destination} ${totalCollection} ${totalDiscount}`);
  }

  printPassengerTypeSummary(entry) {
    console.log(PASSENGER_TYPE_SUMMARY_STRING);

    const passengerTypeCounts = {};
    entry.trips.forEach(trip => {
      const passengerType = trip.passengerType;
      passengerTypeCounts[passengerType] = (passengerTypeCounts[passengerType] || 0) + 1;
    });
    
    const sortedPassengerTypes = Object.entries(passengerTypeCounts).sort();

    sortedPassengerTypes.forEach(([passengerType, count]) => {
        console.log(`${passengerType} ${count}`);
    });
  }
}

module.exports = Reporting;