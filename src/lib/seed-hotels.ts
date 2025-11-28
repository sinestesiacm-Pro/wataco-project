
// To execute this script, run the following command in your terminal:
// npx tsx src/lib/seed-hotels.ts

import { collection, writeBatch, getDocs, doc } from 'firebase/firestore';
import { db } from './firebase';
import { getGooglePlacePhotos } from '@/app/actions';

const hotelsData = [
  // Bogotá
  { nombre: 'The Click Clack Hotel', ubicacion: 'Bogotá, Colombia', descripcion: 'Hotel de diseño moderno y único.', rating: 5, price: 280 },
  { nombre: 'Sofitel Bogota Victoria Regia', ubicacion: 'Bogotá, Colombia', descripcion: 'Lujo francés en el corazón de la Zona T.', rating: 5, price: 350 },
  { nombre: 'Bioxury Hotel', ubicacion: 'Bogotá, Colombia', descripcion: 'Elegancia y sostenibilidad cerca al Parque de la 93.', rating: 4, price: 210 },
  { nombre: 'GHL Hotel Bioxury', ubicacion: 'Bogotá, Colombia', descripcion: 'Diseño contemporáneo y excelente ubicación.', rating: 4, price: 190 },

  // Cartagena
  { nombre: 'Hotel Charleston Santa Teresa', ubicacion: 'Cartagena, Colombia', descripcion: 'Lujo y historia en la ciudad amurallada.', rating: 5, price: 420 },
  { nombre: 'Sofitel Legend Santa Clara', ubicacion: 'Cartagena, Colombia', descripcion: 'Antiguo convento convertido en un hotel de lujo icónico.', rating: 5, price: 550 },
  { nombre: 'Hotel Boutique Casa San Agustín', ubicacion: 'Cartagena, Colombia', descripcion: 'Exclusividad y encanto colonial con piscina privada.', rating: 5, price: 600 },
  { nombre: 'Nácar Hotel Cartagena, Curio Collection by Hilton', ubicacion: 'Cartagena, Colombia', descripcion: 'Rooftop con vistas espectaculares en Getsemaní.', rating: 4, price: 250 },

  // Barcelona
  { nombre: 'W Barcelona', ubicacion: 'Barcelona, Spain', descripcion: 'Icónico hotel en la playa con vistas panorámicas.', rating: 5, price: 450 },
  { nombre: 'Majestic Hotel & Spa', ubicacion: 'Barcelona, Spain', descripcion: 'Lujo neoclásico en el Paseo de Gracia.', rating: 5, price: 500 },
  { nombre: 'Hotel Arts Barcelona', ubicacion: 'Barcelona, Spain', descripcion: 'Un Ritz-Carlton con spa de lujo y vistas al mar.', rating: 5, price: 600 },
  { nombre: 'Grand Hotel Central', ubicacion: 'Barcelona, Spain', descripcion: 'Piscina infinita en la azotea con vistas al Barrio Gótico.', rating: 4, price: 350 },

  // Roma
  { nombre: 'Hotel Eden - Dorchester Collection', ubicacion: 'Rome, Italy', descripcion: 'Elegancia romana con un rooftop bar espectacular.', rating: 5, price: 800 },
  { nombre: 'St. Regis Rome', ubicacion: 'Rome, Italy', descripcion: 'Opulencia y lujo cerca de la Piazza della Repubblica.', rating: 5, price: 750 },
  { nombre: 'Hotel de Russie', ubicacion: 'Rome, Italy', descripcion: 'Un oasis de tranquilidad con un jardín secreto cerca de la Plaza de España.', rating: 5, price: 900 },
  { nombre: 'The Pantheon Iconic Rome Hotel', ubicacion: 'Rome, Italy', descripcion: 'Diseño moderno con vistas al Panteón.', rating: 4, price: 450 },

  // Paris
  { nombre: 'Le Bristol Paris', ubicacion: 'Paris, France', descripcion: 'Palacio parisino de alta costura.', rating: 5, price: 1200 },
  { nombre: 'Four Seasons Hotel George V', ubicacion: 'Paris, France', descripcion: 'Lujo icónico con terrazas privadas y vistas a la Torre Eiffel.', rating: 5, price: 1500 },
  { nombre: 'Shangri-La Paris', ubicacion: 'Paris, France', descripcion: 'Antiguo palacio del Príncipe Bonaparte con vistas directas a la Torre Eiffel.', rating: 5, price: 1300 },
  { nombre: 'Hôtel Plaza Athénée', ubicacion: 'Paris, France', descripcion: 'El epítome del lujo parisino en la Avenue Montaigne.', rating: 5, price: 1600 },

  // New York
  { nombre: 'The Plaza, A Fairmont Managed Hotel', ubicacion: 'New York, USA', descripcion: 'El hotel más famoso de Nueva York, en Central Park South.', rating: 5, price: 950 },
  { nombre: 'The Ritz-Carlton New York, Central Park', ubicacion: 'New York, USA', descripcion: 'Vistas inigualables de Central Park y elegancia atemporal.', rating: 5, price: 1100 },
  { nombre: 'The Mark Hotel', ubicacion: 'New York, USA', descripcion: 'Diseño vanguardista y servicio impecable en el Upper East Side.', rating: 5, price: 1200 },
  { nombre: 'Equinox Hotel New York', ubicacion: 'New York, USA', descripcion: 'El pináculo del lujo y el bienestar en Hudson Yards.', rating: 5, price: 900 },

  // Tokio
  { nombre: 'Aman Tokyo', ubicacion: 'Tokyo, Japan', descripcion: 'Santuario urbano con vistas panorámicas de la ciudad.', rating: 5, price: 1300 },
  { nombre: 'Park Hyatt Tokyo', ubicacion: 'Tokyo, Japan', descripcion: 'Famoso por "Lost in Translation", con vistas espectaculares.', rating: 5, price: 1000 },
  { nombre: 'Mandarin Oriental, Tokyo', ubicacion: 'Tokyo, Japan', descripcion: 'Lujo y vistas impresionantes desde el corazón de Nihonbashi.', rating: 5, price: 1150 },
  { nombre: 'The Peninsula Tokyo', ubicacion: 'Tokyo, Japan', descripcion: 'Servicio legendario y vistas al Palacio Imperial.', rating: 5, price: 1250 },

  // Londres
  { nombre: 'The Savoy', ubicacion: 'London, UK', descripcion: 'Icono eduardiano en el Támesis.', rating: 5, price: 850 },
  { nombre: 'Claridge\'s', ubicacion: 'London, UK', descripcion: 'El epítome del glamour Art Deco en Mayfair.', rating: 5, price: 1000 },
  { nombre: 'The Goring', ubicacion: 'London, UK', descripcion: 'El hotel de gestión familiar más lujoso de Londres, favorito de la realeza.', rating: 5, price: 900 },
  { nombre: 'Shangri-La The Shard, London', ubicacion: 'London, UK', descripcion: 'Las vistas más altas de Londres desde el icónico Shard.', rating: 5, price: 750 },

  // Miami
  { nombre: 'Faena Hotel Miami Beach', ubicacion: 'Miami, USA', descripcion: 'Un universo de arte, lujo y diseño de la mano de Alan Faena.', rating: 5, price: 800 },
  { nombre: 'The Setai, Miami Beach', ubicacion: 'Miami, USA', descripcion: 'Serenidad asiática y diseño Art Deco en South Beach.', rating: 5, price: 950 },
  { nombre: 'Four Seasons Hotel at The Surf Club', ubicacion: 'Miami, USA', descripcion: 'Glamour histórico y lujo moderno en un club legendario.', rating: 5, price: 1100 },
  { nombre: '1 Hotel South Beach', ubicacion: 'Miami, USA', descripcion: 'Lujo ecológico con vistas al mar y piscinas en la azotea.', rating: 5, price: 750 },
  
    // Dubai
  { nombre: 'Burj Al Arab Jumeirah', ubicacion: 'Dubai, UAE', descripcion: 'El hotel más lujoso del mundo.', rating: 5, price: 2500 },
  { nombre: 'Atlantis The Palm', ubicacion: 'Dubai, UAE', descripcion: 'Un mundo de maravillas acuáticas.', rating: 5, price: 600 },
  { nombre: 'Armani Hotel Dubai', ubicacion: 'Dubai, UAE', descripcion: 'Sofisticación minimalista en el Burj Khalifa.', rating: 5, price: 800 },
  { nombre: 'One&Only The Palm', ubicacion: 'Dubai, UAE', descripcion: 'Exclusividad y tranquilidad en la Palm Jumeirah.', rating: 5, price: 1200 },

  // Sídney
  { nombre: 'Park Hyatt Sydney', ubicacion: 'Sydney, Australia', descripcion: 'Vistas inigualables de la Ópera y el Harbour Bridge.', rating: 5, price: 900 },
  { nombre: 'Four Seasons Hotel Sydney', ubicacion: 'Sydney, Australia', descripcion: 'Lujo y vistas panorámicas del puerto.', rating: 5, price: 700 },
  { nombre: 'The Langham, Sydney', ubicacion: 'Sydney, Australia', descripcion: 'Elegancia clásica y servicio exclusivo en The Rocks.', rating: 5, price: 650 },
  { nombre: 'QT Sydney', ubicacion: 'Sydney, Australia', descripcion: 'Diseño peculiar y vibrante en el corazón de la ciudad.', rating: 4, price: 400 },

  // Río de Janeiro
  { nombre: 'Copacabana Palace, A Belmond Hotel', ubicacion: 'Rio de Janeiro, Brazil', descripcion: 'El legendario palacio de Copacabana.', rating: 5, price: 700 },
  { nombre: 'Hotel Fasano Rio de Janeiro', ubicacion: 'Rio de Janeiro, Brazil', descripcion: 'Diseño de Philippe Starck y una piscina infinita icónica.', rating: 5, price: 800 },
  { nombre: 'Emiliano Rio', ubicacion: 'Rio de Janeiro, Brazil', descripcion: 'Lujo moderno y una fachada cobogó única.', rating: 5, price: 650 },
  { nombre: 'Santa Teresa Hotel RJ - MGallery', ubicacion: 'Rio de Janeiro, Brazil', descripcion: 'Hotel boutique con encanto bohemio en Santa Teresa.', rating: 4, price: 350 },

  // Estambul
  { nombre: 'Çırağan Palace Kempinski', ubicacion: 'Istanbul, Turkey', descripcion: 'Un auténtico palacio otomano a orillas del Bósforo.', rating: 5, price: 900 },
  { nombre: 'Four Seasons Hotel Istanbul at the Bosphorus', ubicacion: 'Istanbul, Turkey', descripcion: 'Lujo moderno en un palacio del siglo XIX.', rating: 5, price: 850 },
  { nombre: 'The Ritz-Carlton, Istanbul', ubicacion: 'Istanbul, Turkey', descripcion: 'Vistas panorámicas del Bósforo y un servicio impecable.', rating: 5, price: 600 },
  { nombre: 'Soho House Istanbul', ubicacion: 'Istanbul, Turkey', descripcion: 'Club privado y hotel en el antiguo consulado americano.', rating: 4, price: 450 },

  // Bangkok
  { nombre: 'Mandarin Oriental, Bangkok', ubicacion: 'Bangkok, Thailand', descripcion: 'La leyenda de la hospitalidad tailandesa en el río Chao Phraya.', rating: 5, price: 700 },
  { nombre: 'The Siam', ubicacion: 'Bangkok, Thailand', descripcion: 'Exclusivo resort urbano con antigüedades y diseño Art Deco.', rating: 5, price: 800 },
  { nombre: 'Capella Bangkok', ubicacion: 'Bangkok, Thailand', descripcion: 'Villas y suites con vistas al río y un servicio ultra lujoso.', rating: 5, price: 950 },
  { nombre: 'Siam Kempinski Hotel Bangkok', ubicacion: 'Bangkok, Thailand', descripcion: 'Lujo estilo resort con múltiples piscinas y acceso directo al centro comercial Siam Paragon.', rating: 5, price: 550 },

  // Ámsterdam
  { nombre: 'Waldorf Astoria Amsterdam', ubicacion: 'Amsterdam, Netherlands', descripcion: 'Un conjunto de seis palacios del siglo XVII en el canal Herengracht.', rating: 5, price: 1000 },
  { nombre: 'Conservatorium Hotel', ubicacion: 'Amsterdam, Netherlands', descripcion: 'Diseño contemporáneo en un antiguo conservatorio de música.', rating: 5, price: 850 },
  { nombre: 'Pulitzer Amsterdam', ubicacion: 'Amsterdam, Netherlands', descripcion: 'Un laberinto de 25 casas de canal interconectadas.', rating: 5, price: 700 },
  { nombre: 'De L\'Europe Amsterdam', ubicacion: 'Amsterdam, Netherlands', descripcion: 'Elegancia clásica y un spa de lujo con vistas al río Amstel.', rating: 5, price: 900 },

  // Buenos Aires
  { nombre: 'Palacio Duhau - Park Hyatt Buenos Aires', ubicacion: 'Buenos Aires, Argentina', descripcion: 'Un palacio de la Belle Époque con jardines exuberantes en Recoleta.', rating: 5, price: 700 },
  { nombre: 'Alvear Palace Hotel', ubicacion: 'Buenos Aires, Argentina', descripcion: 'El epítome del lujo y la elegancia clásica de estilo francés.', rating: 5, price: 650 },
  { nombre: 'Faena Hotel Buenos Aires', ubicacion: 'Buenos Aires, Argentina', descripcion: 'Un universo fantástico creado por Philippe Starck en Puerto Madero.', rating: 5, price: 550 },
  { nombre: 'Four Seasons Hotel Buenos Aires', ubicacion: 'Buenos Aires, Argentina', descripcion: 'Una mansión de la Belle Époque y una torre contemporánea unidas por el lujo.', rating: 5, price: 800 },

  // Ciudad de México
  { nombre: 'The St. Regis Mexico City', ubicacion: 'Mexico City, Mexico', descripcion: 'Vistas panorámicas y servicio de mayordomo en Paseo de la Reforma.', rating: 5, price: 750 },
  { nombre: 'Four Seasons Hotel Mexico City', ubicacion: 'Mexico City, Mexico', descripcion: 'Un oasis de estilo hacienda con un patio tranquilo en el corazón de la ciudad.', rating: 5, price: 800 },
  { nombre: 'Las Alcobas, a Luxury Collection Hotel', ubicacion: 'Mexico City, Mexico', descripcion: 'Lujo íntimo y diseño sofisticado en Polanco.', rating: 5, price: 600 },
  { nombre: 'Condesa DF', ubicacion: 'Mexico City, Mexico', descripcion: 'Hotel boutique de moda con una popular terraza en la azotea.', rating: 4, price: 350 },

  // Lisboa
  { nombre: 'Four Seasons Hotel Ritz Lisbon', ubicacion: 'Lisbon, Portugal', descripcion: 'Un hito de la hotelería de lujo con una impresionante colección de arte.', rating: 5, price: 700 },
  { nombre: 'Bairro Alto Hotel', ubicacion: 'Lisbon, Portugal', descripcion: 'Hotel boutique en una de las zonas más vibrantes de la ciudad.', rating: 5, price: 500 },
  { nombre: 'Valverde Hotel', ubicacion: 'Lisbon, Portugal', descripcion: 'Relais & Châteaux en la Avenida da Liberdade.', rating: 5, price: 450 },
  { nombre: 'The Ivens, Autograph Collection', ubicacion: 'Lisbon, Portugal', descripcion: 'Un hotel temático de exploradores con un diseño interior exótico.', rating: 5, price: 400 },

  // Praga
  { nombre: 'Four Seasons Hotel Prague', ubicacion: 'Prague, Czech Republic', descripcion: 'Vistas inmejorables del Puente de Carlos y el Castillo de Praga.', rating: 5, price: 650 },
  { nombre: 'Aria Hotel Prague', ubicacion: 'Prague, Czech Republic', descripcion: 'Un hotel de lujo con temática musical y acceso privado a los Jardines Vrtba.', rating: 5, price: 450 },
  { nombre: 'The Augustine, a Luxury Collection Hotel, Prague', ubicacion: 'Prague, Czech Republic', descripcion: 'Ubicado en un monasterio del siglo XIII, con un bar que sirve cerveza elaborada por monjes.', rating: 5, price: 500 },
  { nombre: 'Mandarin Oriental, Prague', ubicacion: 'Prague, Czech Republic', descripcion: 'Un antiguo monasterio dominico convertido en un santuario de lujo.', rating: 5, price: 600 },
];

async function seedHotels() {
  console.log('Starting to seed "hoteles" collection...');
  const hotelsRef = collection(db, 'hoteles');
  
  const existingDocs = await getDocs(hotelsRef);
  if (!existingDocs.empty) {
    console.log('Deleting old hotel data...');
    const deleteBatch = writeBatch(db);
    existingDocs.forEach(doc => deleteBatch.delete(doc.ref));
    await deleteBatch.commit();
    console.log('Old data deleted.');
  }

  const batch = writeBatch(db);
  
  for (const hotel of hotelsData) {
    const docRef = doc(hotelsRef);
    const media = await getGooglePlacePhotos(`${hotel.nombre}, ${hotel.ubicacion}`);
    batch.set(docRef, { ...hotel, media });
  }

  try {
    await batch.commit();
    console.log(`Successfully committed a batch of ${hotelsData.length} hotels to Firestore.`);
  } catch (error) {
    console.error('Error committing batch:', error);
  }
}

seedHotels();
