const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');

const prisma = new PrismaClient();

async function main() {
  await prisma.tripActivity.deleteMany();
  await prisma.tripNote.deleteMany();
  await prisma.packingItem.deleteMany();
  await prisma.tripStop.deleteMany();
  await prisma.trip.deleteMany();
  await prisma.activity.deleteMany();
  await prisma.city.deleteMany();
  await prisma.user.deleteMany();

  const passwordHash = await bcrypt.hash('Password123!', 12);
  const user = await prisma.user.create({
    data: {
      name: 'Aarav Mehta',
      email: 'demo@traveloop.app',
      passwordHash,
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&q=80'
    }
  });

  const lisbon = await prisma.city.create({ data: { externalCityId: 'seed-lisbon', name: 'Lisbon', country: 'Portugal', latitude: 38.7223, longitude: -9.1393, averageCost: 145, popularityScore: 92, region: 'Lisbon', currency: 'EUR' } });
  const porto = await prisma.city.create({ data: { externalCityId: 'seed-porto', name: 'Porto', country: 'Portugal', latitude: 41.1579, longitude: -8.6291, averageCost: 132, popularityScore: 88, region: 'Porto', currency: 'EUR' } });
  const barcelona = await prisma.city.create({ data: { externalCityId: 'seed-barcelona', name: 'Barcelona', country: 'Spain', latitude: 41.3851, longitude: 2.1734, averageCost: 168, popularityScore: 95, region: 'Catalonia', currency: 'EUR' } });

  const trip = await prisma.trip.create({
    data: {
      userId: user.id,
      title: 'European summer loop',
      description: 'A premium multi-city route for a 7-day style-forward escape.',
      startDate: new Date('2026-09-01'),
      endDate: new Date('2026-09-08'),
      travelerCount: 2,
      budget: 4200,
      coverImage: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=1400&q=80',
      visibility: 'public'
    }
  });

  const stopOne = await prisma.tripStop.create({
    data: { tripId: trip.id, cityId: lisbon.id, cityName: lisbon.name, arrivalDate: new Date('2026-09-01'), departureDate: new Date('2026-09-04'), orderIndex: 0, notes: 'Arrive, check in, and sunset walk in Alfama.' }
  });
  const stopTwo = await prisma.tripStop.create({
    data: { tripId: trip.id, cityId: porto.id, cityName: porto.name, arrivalDate: new Date('2026-09-04'), departureDate: new Date('2026-09-06'), orderIndex: 1, notes: 'Wine, riverfront dinners, and boutique cafes.' }
  });
  const stopThree = await prisma.tripStop.create({
    data: { tripId: trip.id, cityId: barcelona.id, cityName: barcelona.name, arrivalDate: new Date('2026-09-06'), departureDate: new Date('2026-09-08'), orderIndex: 2, notes: 'Culture-rich finale with beach time.' }
  });

  const lisbonActivity = await prisma.activity.create({ data: { cityId: lisbon.id, title: 'Tram 28 sunset ride', description: 'Ride through the city at golden hour.', category: 'sightseeing', estimatedCost: 12, duration: 2, image: 'https://images.unsplash.com/photo-1513735492246-483525079686?auto=format&fit=crop&w=900&q=80' } });
  const portoActivity = await prisma.activity.create({ data: { cityId: porto.id, title: 'Douro river tasting', description: 'Wine tasting with skyline views.', category: 'food', estimatedCost: 38, duration: 3, image: 'https://images.unsplash.com/photo-1514900844771-9f2a0d0f7b50?auto=format&fit=crop&w=900&q=80' } });
  const barcelonaActivity = await prisma.activity.create({ data: { cityId: barcelona.id, title: 'Gaudi architecture walk', description: 'Explore modernist landmarks and hidden courtyards.', category: 'museums', estimatedCost: 24, duration: 3, image: 'https://images.unsplash.com/photo-1464790719320-516ecd75af6c?auto=format&fit=crop&w=900&q=80' } });

  await prisma.tripActivity.createMany({
    data: [
      { stopId: stopOne.id, activityId: lisbonActivity.id, selectedDate: new Date('2026-09-01') },
      { stopId: stopTwo.id, activityId: portoActivity.id, selectedDate: new Date('2026-09-04') },
      { stopId: stopThree.id, activityId: barcelonaActivity.id, selectedDate: new Date('2026-09-06') }
    ]
  });

  await prisma.packingItem.createMany({
    data: [
      { tripId: trip.id, title: 'Passport', category: 'documents', packed: false },
      { tripId: trip.id, title: 'Travel adapter', category: 'electronics', packed: true },
      { tripId: trip.id, title: 'Neutral jacket', category: 'clothing', packed: false }
    ]
  });

  await prisma.tripNote.createMany({
    data: [
      { tripId: trip.id, note: 'Book all train transfers 3 weeks in advance.' },
      { tripId: trip.id, note: 'Reserve a sunset table near the river in Porto.' }
    ]
  });

  console.log('Seeded Traveloop demo data for demo@traveloop.app / Password123!');
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });