const UserController = require('./controllers/controller');
const request = require('supertest');
const express = require('express');
const bodyParser = require('body-parser');


const app = express();

app.use(bodyParser.json());

app.get('/api/users/location_listing', UserController.locationName); 
app.get('/api/users/count_by_scientificName', UserController.count); 
app.get('/api/users/percentage_iucn_redList_species', UserController.iucnRedListSpeicies); 
app.get('/api/users/percentage_endemic_species', UserController.endemincSpecies); 
app.get('/api/users/pertcentage_most_common_species', UserController.mostCommonSpecies); 
app.get('/api/users/seasonal_chart_for_species', UserController.seasonalChart); 
app.get('/api/users/hotspot_area', UserController.hotspotArea); 
app.get('/api/users/complete_List_Of_Species', UserController.completeListOfSpecies); 
app.get('/api/users/water_bird_congregation', UserController.waterBirdCongregations); 
app.get('/api/users/effortsDetails', UserController.effortsDetails); 
// app.get("/api/users/soibConcernStatus",UserController.soibConcernStatus); 


jest.setTimeout(30000);


describe('(State, County, Locality and Date) Location Name ID-T5028', () => {

  //Controller locationName state and county
  it('T5028/location_listing', async () => {
    const response = await request(app)
      .get('/api/users/location_listing')
      .query({
        state: 'Himachal Pradesh',
        county: 'Kangra',
        locality:'Nagrota Surian Forest Complex',
        start: '01-01-2000',
        end: '05-31-2022'
      })
      .expect(200);
    expect(response.body).toEqual({
        "localities": [
            "Aghanjar Mahadev Temple, Dharamsala",
            "Aima (Ghuggar) Palampur, Himachal",
            "Andretta, Palampur",
            "Bhagsunag Waterfall, McLeodganj",
            "Billing, Kangra",
            "Bir Forest",
            "Chohla - Thatri Road",
            "Dal Lake, Mcleod Ganj",
            "Dharamshala City",
            "Dharamshala (OBI)",
            "Dharmashala Tea Estate",
            "Dragon Resort, Naddi",
            "Gaggal, near Dharamshala (OBI)",
            "Gallu Devi Temple",
            "Gallu-Dharamkot Trek Path",
            "garli",
            "Gopalpur Zoo",
            "Guna Devi Mandir Trek",
            "Jawali (OBI)",
            "Kangra Fort",
            "Kasba-Bagiarra Road, Palampur",
            "Maharana Pratap Sagar (Pong Dam)",
            "McLeod Ganj",
            "Naddi (OBI)",
            "Nagrota Surian Forest Complex",
            "Nalle Road Ghugar, Palampur, Himachal Pradesh",
            "Narwana Village (OBI)",
            "near Jawalaji, Kangra (OBI)",
            "Norbulingka tibetan institute, Kangra",
            "Palampur, Himachal Pradesh",
            "Para-gliders Landing Spot",
            "Pathankot (OBI)",
            "Pongdam",
            "Pong Dam -- Goglara",
            "Pong Dam Lake--Dehar Khad",
            "Pong Dam--Nagrota Surian",
            "Pong Dam--Shah nehar barrage",
            "Rakkar, Himachal Pradesh",
            "Rakkar-Tang Road",
            "Sansarpur Terrace",
            "Shah Nehar Barrage Ponds",
            "Shar Nehar Barrage Lake",
            "Shiva Cafe, Bhagsu Nag Waterfall",
            "Silh village",
            "Sthana, near Shah Nehar Barrage Lake",
            "St John Church, McLeodGanj",
            "Sugghar, Palampur, Himchal Pradesh",
            "Trail Waterfall-Triund",
            "Triund (OBI)",
            "Uparli Dar Paragliding Fields",
            "War Memorial, Dharamshala"
        ]
    })
  })
})


describe('(State, County, Locality and Date) Species Details ID-T5029', () => {

  it('T5029/count_by_scientificName', async () => {

    const response = await request(app)
      .get('/api/users/count_by_scientificName')
      .query({
        state: 'Himachal Pradesh',
        county: 'Kangra',
        locality:'Nagrota Surian Forest Complex',
        start: '01-01-2000',
        end: '05-31-2022'
      })
      .expect(200);
    expect(response.body).toEqual({
        "iucnRedListCategoriesCount": {
            "Vulnerable": 1,
            "Critically Endangered": 1,
            "Near Threatened": 5,
            "Endangered": 1
        },
        "total": 109,
        "migrate": 34,
        "iucnRedList": 8,
        "soibHighPriority": 16,
        "scheduleI": 8,
        "indiaEndemic": 0,
        "soibConservationConcernSpecies": [
            {
                "species": "Moderate Priority",
                "count": 23
            },
            {
                "species": "High Priority",
                "count": 16
            }
        ],
        "citesAppendixSpecies": [
            {
                "species": "Appendix I",
                "count": 0
            },
            {
                "species": "Appendix II",
                "count": 11
            }
        ],
        "cmsAppendixSpecies": [
            {
                "species": "Appendix I",
                "count": 3
            },
            {
                "species": "Appendix II",
                "count": 53
            }
        ]
    })
  })
})


describe('(State, County, Locality and Date) IUCN Red List Species ID-T5030', () => {

    it('T5030/percentage_iucn_redList_species', async () => {
  
      const response = await request(app)
        .get('/api/users/percentage_iucn_redList_species')
        .query({
            state: 'Himachal Pradesh',
            county: 'Kangra',
            locality:'Nagrota Surian Forest Complex',
            start: '01-01-2000',
            end: '05-31-2022'
          })
        .expect(200);
        // console.log(response.body);
      expect(response.body).toEqual([
        {
            "region": "Critically Endangered",
            "indiaChecklistScientificName": "Gyps bengalensis",
            "indiaChecklistCommonName": "White-rumped Vulture",
            "uniqueValue": 421,
            "percentage": "13%"
        },
        {
            "region": "Endangered",
            "indiaChecklistScientificName": "Neophron percnopterus",
            "indiaChecklistCommonName": "Egyptian Vulture",
            "uniqueValue": 414,
            "percentage": "20%"
        },
        {
            "region": "Vulnerable",
            "indiaChecklistScientificName": "Sterna aurantia",
            "indiaChecklistCommonName": "River Tern",
            "uniqueValue": 337,
            "percentage": "0%"
        },
        {
            "region": "Near Threatened",
            "indiaChecklistScientificName": "Vanellus vanellus",
            "indiaChecklistCommonName": "Northern Lapwing",
            "uniqueValue": 230,
            "percentage": "7%"
        },
        {
            "region": "Near Threatened",
            "indiaChecklistScientificName": "Vanellus duvaucelii",
            "indiaChecklistCommonName": "River Lapwing",
            "uniqueValue": 231,
            "percentage": "0%"
        },
        {
            "region": "Near Threatened",
            "indiaChecklistScientificName": "Aegypius monachus",
            "indiaChecklistCommonName": "Cinereous Vulture",
            "uniqueValue": 420,
            "percentage": "7%"
        },
        {
            "region": "Near Threatened",
            "indiaChecklistScientificName": "Gyps himalayensis",
            "indiaChecklistCommonName": "Himalayan Vulture",
            "uniqueValue": 424,
            "percentage": "20%"
        },
        {
            "region": "Near Threatened",
            "indiaChecklistScientificName": "Psittacula eupatria",
            "indiaChecklistCommonName": "Alexandrine Parakeet",
            "uniqueValue": 602,
            "percentage": "20%"
        }
    ])
    })
  })


  describe('(State, County, Locality and Date) Endemic Species ID-T5031', () => {
    it('T5031/percentage_endemic_species', async () => {
  
      const response = await request(app)
        .get('/api/users/percentage_endemic_species')
        .query({
            state: 'Himachal Pradesh',
            county: 'Kangra',
            locality:'Nagrota Surian Forest Complex',
            start: '01-01-2000',
            end: '05-31-2022'
          })
        .expect(200);
        // console.log(response.body)
      expect(response.body).toEqual([
        {
            "region": "Indian Subcontinent",
            "indiaChecklistScientificName": "Pavo cristatus",
            "indiaChecklistCommonName": "Indian Peafowl",
            "uniqueValue": 63,
            "percentage": "20%"
        },
        {
            "region": "Indian Subcontinent",
            "indiaChecklistScientificName": "Hierococcyx varius",
            "indiaChecklistCommonName": "Common Hawk Cuckoo",
            "uniqueValue": 159,
            "percentage": "7%"
        },
        {
            "region": "Indian Subcontinent",
            "indiaChecklistScientificName": "Pseudibis papillosa",
            "indiaChecklistCommonName": "Red-naped Ibis",
            "uniqueValue": 409,
            "percentage": "0%"
        },
        {
            "region": "Indian Subcontinent",
            "indiaChecklistScientificName": "Ocyceros birostris",
            "indiaChecklistCommonName": "Indian Grey Hornbill",
            "uniqueValue": 515,
            "percentage": "7%"
        },
        {
            "region": "Indian Subcontinent",
            "indiaChecklistScientificName": "Psilopogon zeylanicus",
            "indiaChecklistCommonName": "Brown-headed Barbet",
            "uniqueValue": 551,
            "percentage": "27%"
        },
        {
            "region": "Indian Subcontinent",
            "indiaChecklistScientificName": "Dinopium benghalense",
            "indiaChecklistCommonName": "Black-rumped Flameback",
            "uniqueValue": 580,
            "percentage": "20%"
        },
        {
            "region": "Indian Subcontinent",
            "indiaChecklistScientificName": "Psittacula cyanocephala",
            "indiaChecklistCommonName": "Plum-headed Parakeet",
            "uniqueValue": 606,
            "percentage": "47%"
        },
        {
            "region": "Indian Subcontinent",
            "indiaChecklistScientificName": "Prinia socialis",
            "indiaChecklistCommonName": "Ashy Prinia",
            "uniqueValue": 763,
            "percentage": "13%"
        },
        {
            "region": "Himalayas",
            "indiaChecklistScientificName": "Pycnonotus leucogenys",
            "indiaChecklistCommonName": "Himalayan Bulbul",
            "uniqueValue": 821,
            "percentage": "47%"
        },
        {
            "region": "Himalayas",
            "indiaChecklistScientificName": "Phylloscopus xanthoschistos",
            "indiaChecklistCommonName": "Grey-hooded Warbler",
            "uniqueValue": 871,
            "percentage": "33%"
        },
        {
            "region": "Indian Subcontinent",
            "indiaChecklistScientificName": "Argya striata",
            "indiaChecklistCommonName": "Jungle Babbler",
            "uniqueValue": 1008,
            "percentage": "40%"
        },
        {
            "region": "Indian Subcontinent",
            "indiaChecklistScientificName": "Argya caudata",
            "indiaChecklistCommonName": "Common Babbler",
            "uniqueValue": 1010,
            "percentage": "7%"
        },
        {
            "region": "Indian Subcontinent",
            "indiaChecklistScientificName": "Acridotheres ginginianus",
            "indiaChecklistCommonName": "Bank Myna",
            "uniqueValue": 1066,
            "percentage": "20%"
        },
        {
            "region": "Indian Subcontinent",
            "indiaChecklistScientificName": "Copsychus fulicatus",
            "indiaChecklistCommonName": "Indian Robin",
            "uniqueValue": 1110,
            "percentage": "7%"
        },
        {
            "region": "Indian Subcontinent",
            "indiaChecklistScientificName": "Motacilla maderaspatensis",
            "indiaChecklistCommonName": "White-browed Wagtail",
            "uniqueValue": 1275,
            "percentage": "7%"
        }
    ])
    })
  })



  describe('(State, County, Locality and Date) Most Common Species ID-5032', () => {
    it('/pertcentage_most_common_species', async () => {
  
      const response = await request(app)
        .get('/api/users/pertcentage_most_common_species')
        .query({
            state: 'Himachal Pradesh',
            county: 'Kangra',
            locality:'Nagrota Surian Forest Complex',
            start: '01-01-2000',
            end: '05-31-2022'
          })
        .expect(200);
          //  console.log(response.body)
      expect(response.body).toEqual([
        {
            "indiaChecklistScientificName": "Myophonus caeruleus",
            "indiaChecklistCommonName": "Blue Whistling Thrush",
            "count": 9,
            "percentage": 60
        },
        {
            "indiaChecklistScientificName": "Chelidorhynx hypoxanthus",
            "indiaChecklistCommonName": "Yellow-bellied Fantail",
            "count": 8,
            "percentage": 53
        },
        {
            "indiaChecklistScientificName": "Corvus macrorhynchos",
            "indiaChecklistCommonName": "Large-billed Crow",
            "count": 8,
            "percentage": 53
        },
        {
            "indiaChecklistScientificName": "Acridotheres tristis",
            "indiaChecklistCommonName": "Common Myna",
            "count": 7,
            "percentage": 47
        },
        {
            "indiaChecklistScientificName": "Parus cinereus",
            "indiaChecklistCommonName": "Cinereous Tit",
            "count": 7,
            "percentage": 47
        },
        {
            "indiaChecklistScientificName": "Psittacula cyanocephala",
            "indiaChecklistCommonName": "Plum-headed Parakeet",
            "count": 7,
            "percentage": 47
        },
        {
            "indiaChecklistScientificName": "Psittacula krameri",
            "indiaChecklistCommonName": "Rose-ringed Parakeet",
            "count": 7,
            "percentage": 47
        },
        {
            "indiaChecklistScientificName": "Pycnonotus leucogenys",
            "indiaChecklistCommonName": "Himalayan Bulbul",
            "count": 7,
            "percentage": 47
        },
        {
            "indiaChecklistScientificName": "Argya striata",
            "indiaChecklistCommonName": "Jungle Babbler",
            "count": 6,
            "percentage": 40
        },
        {
            "indiaChecklistScientificName": "Dendrocitta vagabunda",
            "indiaChecklistCommonName": "Rufous Treepie",
            "count": 6,
            "percentage": 40
        }
    ])
    }, 60000)
  })

  describe('(State, County, Locality and Date) Seasonal Chart ID-T5033', () => {
    it('T5033/seasonal_chart_for_species', async () => {
  
      const response = await request(app)
        .get('/api/users/seasonal_chart_for_species')
        .query({
            state: 'Himachal Pradesh',
            county: 'Kangra',
            locality:'Nagrota Surian Forest Complex',
            start: '01-01-2000',
            end: '05-31-2022'
          })
        .expect(200);
      expect(response.body).toEqual({
        "msg": "denominator is zero"
    })
    })
  })

  describe('(State, County, Locality and Date) Hotspots ID-T5034', () => {


    it('T5034/hotspot_area', async () => {
  
      const response = await request(app)
        .get('/api/users/hotspot_area')
        .query({
            state: 'Himachal Pradesh',
            county: 'Kangra',
            locality:'Nagrota Surian Forest Complex',
            start: '01-01-2000',
            end: '05-31-2022'
          })
        .expect(200);
      expect(response.body).toEqual([
        {
            "locality": "Nagrota Surian Forest Complex",
            "localityId": "L6626095",
            "latitude": 32.0466969,
            "longitude": 76.0974535,
            "count": "109"
        }
    ])
    })
  })


  describe('(State, County, Locality and Date) Complete List of Species ID-T5035', () => {

    it('T5035/complete_List_Of_Species', async () => {
  
      const response = await request(app)
        .get('/api/users/complete_List_Of_Species')
        .query({
            state: 'Himachal Pradesh',
            county: 'Kangra',
            locality:'Nagrota Surian Forest Complex',
            start: '01-01-2000',
            end: '05-31-2022'
          })
        .expect(200);
      expect(response.body).toEqual([
        {
            "indiaChecklistScientificName": "Anser indicus",
            "migratoryStatusWithinIndia": "Winter Migrant & Localized Summer Migrant",
            "indiaChecklistCommonName": "Bar-headed Goose",
            "uniqueValue": 3,
            "endemicRegion": "None",
            "soibConcernStatus": "Moderate",
            "wpaSchedule": "Schedule-II",
            "iucnCategory": "Least Concern"
        },
        {
            "indiaChecklistScientificName": "Anser anser",
            "migratoryStatusWithinIndia": "Winter Migrant",
            "indiaChecklistCommonName": "Greylag Goose",
            "uniqueValue": 4,
            "endemicRegion": "None",
            "soibConcernStatus": "Low",
            "wpaSchedule": "Schedule-II",
            "iucnCategory": "Least Concern"
        },
        {
            "indiaChecklistScientificName": "Tadorna ferruginea",
            "migratoryStatusWithinIndia": "Winter Migrant & Localized Summer Migrant",
            "indiaChecklistCommonName": "Ruddy Shelduck",
            "uniqueValue": 14,
            "endemicRegion": "None",
            "soibConcernStatus": "High",
            "wpaSchedule": "Schedule-II",
            "iucnCategory": "Least Concern"
        },
        {
            "indiaChecklistScientificName": "Spatula querquedula",
            "migratoryStatusWithinIndia": "Winter Migrant",
            "indiaChecklistCommonName": "Garganey",
            "uniqueValue": 19,
            "endemicRegion": "None",
            "soibConcernStatus": "High",
            "wpaSchedule": "Schedule-II",
            "iucnCategory": "Least Concern"
        },
        {
            "indiaChecklistScientificName": "Spatula clypeata",
            "migratoryStatusWithinIndia": "Winter Migrant",
            "indiaChecklistCommonName": "Northern Shoveler",
            "uniqueValue": 20,
            "endemicRegion": "None",
            "soibConcernStatus": "High",
            "wpaSchedule": "Schedule-II",
            "iucnCategory": "Least Concern"
        },
        {
            "indiaChecklistScientificName": "Mareca strepera",
            "migratoryStatusWithinIndia": "Winter Migrant",
            "indiaChecklistCommonName": "Gadwall",
            "uniqueValue": 21,
            "endemicRegion": "None",
            "soibConcernStatus": "Moderate",
            "wpaSchedule": "Schedule-II",
            "iucnCategory": "Least Concern"
        },
        {
            "indiaChecklistScientificName": "Mareca penelope",
            "migratoryStatusWithinIndia": "Winter Migrant",
            "indiaChecklistCommonName": "Eurasian Wigeon",
            "uniqueValue": 23,
            "endemicRegion": "None",
            "soibConcernStatus": "Moderate",
            "wpaSchedule": "Schedule-II",
            "iucnCategory": "Least Concern"
        },
        {
            "indiaChecklistScientificName": "Anas platyrhynchos",
            "migratoryStatusWithinIndia": "Winter Migrant & Localized Summer Migrant",
            "indiaChecklistCommonName": "Mallard",
            "uniqueValue": 26,
            "endemicRegion": "None",
            "soibConcernStatus": "Low",
            "wpaSchedule": "Schedule-II",
            "iucnCategory": "Least Concern"
        },
        {
            "indiaChecklistScientificName": "Anas acuta",
            "migratoryStatusWithinIndia": "Winter Migrant",
            "indiaChecklistCommonName": "Northern Pintail",
            "uniqueValue": 27,
            "endemicRegion": "None",
            "soibConcernStatus": "High",
            "wpaSchedule": "Schedule-II",
            "iucnCategory": "Least Concern"
        },
        {
            "indiaChecklistScientificName": "Anas crecca",
            "migratoryStatusWithinIndia": "Winter Migrant",
            "indiaChecklistCommonName": "Common Teal",
            "uniqueValue": 28,
            "endemicRegion": "None",
            "soibConcernStatus": "High",
            "wpaSchedule": "Schedule-II",
            "iucnCategory": "Least Concern"
        },
        {
            "indiaChecklistScientificName": "Netta rufina",
            "migratoryStatusWithinIndia": "Winter Migrant",
            "indiaChecklistCommonName": "Red-crested Pochard",
            "uniqueValue": 33,
            "endemicRegion": "None",
            "soibConcernStatus": "Low",
            "wpaSchedule": "Schedule-II",
            "iucnCategory": "Least Concern"
        },
        {
            "indiaChecklistScientificName": "Pavo cristatus",
            "migratoryStatusWithinIndia": "Resident",
            "indiaChecklistCommonName": "Indian Peafowl",
            "uniqueValue": 63,
            "endemicRegion": "Indian Subcontinent",
            "soibConcernStatus": "Low",
            "wpaSchedule": "Schedule-I",
            "iucnCategory": "Least Concern"
        },
        {
            "indiaChecklistScientificName": "Gallus gallus",
            "migratoryStatusWithinIndia": "Resident",
            "indiaChecklistCommonName": "Red Junglefowl",
            "uniqueValue": 69,
            "endemicRegion": "None",
            "soibConcernStatus": "Low",
            "wpaSchedule": "Schedule-II",
            "iucnCategory": "Least Concern"
        },
        {
            "indiaChecklistScientificName": "Ortygornis pondicerianus",
            "migratoryStatusWithinIndia": "Resident",
            "indiaChecklistCommonName": "Grey Francolin",
            "uniqueValue": 71,
            "endemicRegion": "None",
            "soibConcernStatus": "Low",
            "wpaSchedule": "Schedule-II",
            "iucnCategory": "Least Concern"
        },
        {
            "indiaChecklistScientificName": "Francolinus francolinus",
            "migratoryStatusWithinIndia": "Resident",
            "indiaChecklistCommonName": "Black Francolin",
            "uniqueValue": 74,
            "endemicRegion": "None",
            "soibConcernStatus": "Low",
            "wpaSchedule": "Schedule-II",
            "iucnCategory": "Least Concern"
        },
        {
            "indiaChecklistScientificName": "Podiceps cristatus",
            "migratoryStatusWithinIndia": "Resident & Winter Migrant",
            "indiaChecklistCommonName": "Great Crested Grebe",
            "uniqueValue": 93,
            "endemicRegion": "None",
            "soibConcernStatus": "High",
            "wpaSchedule": "Schedule-II",
            "iucnCategory": "Least Concern"
        },
        {
            "indiaChecklistScientificName": "Columba livia",
            "migratoryStatusWithinIndia": "Resident",
            "indiaChecklistCommonName": "Rock Pigeon",
            "uniqueValue": 95,
            "endemicRegion": "None",
            "soibConcernStatus": "Low",
            "wpaSchedule": "Not protected",
            "iucnCategory": "Least Concern"
        },
        {
            "indiaChecklistScientificName": "Streptopelia decaocto",
            "migratoryStatusWithinIndia": "Resident",
            "indiaChecklistCommonName": "Eurasian Collared Dove",
            "uniqueValue": 107,
            "endemicRegion": "None",
            "soibConcernStatus": "Low",
            "wpaSchedule": "Schedule-II",
            "iucnCategory": "Least Concern"
        },
        {
            "indiaChecklistScientificName": "Spilopelia chinensis",
            "migratoryStatusWithinIndia": "Resident",
            "indiaChecklistCommonName": "Spotted Dove",
            "uniqueValue": 109,
            "endemicRegion": "None",
            "soibConcernStatus": "Low",
            "wpaSchedule": "Schedule-II",
            "iucnCategory": "Least Concern"
        },
        {
            "indiaChecklistScientificName": "Spilopelia senegalensis",
            "migratoryStatusWithinIndia": "Resident",
            "indiaChecklistCommonName": "Laughing Dove",
            "uniqueValue": 110,
            "endemicRegion": "None",
            "soibConcernStatus": "Low",
            "wpaSchedule": "Schedule-II",
            "iucnCategory": "Least Concern"
        },
        {
            "indiaChecklistScientificName": "Treron phoenicopterus",
            "migratoryStatusWithinIndia": "Resident",
            "indiaChecklistCommonName": "Yellow-footed Green Pigeon",
            "uniqueValue": 121,
            "endemicRegion": "None",
            "soibConcernStatus": "Low",
            "wpaSchedule": "Schedule-II",
            "iucnCategory": "Least Concern"
        },
        {
            "indiaChecklistScientificName": "Centropus sinensis",
            "migratoryStatusWithinIndia": "Resident",
            "indiaChecklistCommonName": "Greater Coucal",
            "uniqueValue": 142,
            "endemicRegion": "None",
            "soibConcernStatus": "Low",
            "wpaSchedule": "Schedule-II",
            "iucnCategory": "Least Concern"
        },
        {
            "indiaChecklistScientificName": "Hierococcyx varius",
            "migratoryStatusWithinIndia": "Resident & Local Migrant",
            "indiaChecklistCommonName": "Common Hawk Cuckoo",
            "uniqueValue": 159,
            "endemicRegion": "Indian Subcontinent",
            "soibConcernStatus": "Low",
            "wpaSchedule": "Schedule-II",
            "iucnCategory": "Least Concern"
        },
        {
            "indiaChecklistScientificName": "Vanellus vanellus",
            "migratoryStatusWithinIndia": "Winter Migrant",
            "indiaChecklistCommonName": "Northern Lapwing",
            "uniqueValue": 230,
            "endemicRegion": "None",
            "soibConcernStatus": "Moderate",
            "wpaSchedule": "Schedule-II",
            "iucnCategory": "Near Threatened"
        },
        {
            "indiaChecklistScientificName": "Vanellus duvaucelii",
            "migratoryStatusWithinIndia": "Resident & Local Migrant",
            "indiaChecklistCommonName": "River Lapwing",
            "uniqueValue": 231,
            "endemicRegion": "None",
            "soibConcernStatus": "Low",
            "wpaSchedule": "Schedule-II",
            "iucnCategory": "Near Threatened"
        },
        {
            "indiaChecklistScientificName": "Vanellus indicus",
            "migratoryStatusWithinIndia": "Resident",
            "indiaChecklistCommonName": "Red-wattled Lapwing",
            "uniqueValue": 234,
            "endemicRegion": "None",
            "soibConcernStatus": "Low",
            "wpaSchedule": "Schedule-II",
            "iucnCategory": "Least Concern"
        },
        {
            "indiaChecklistScientificName": "Vanellus leucurus",
            "migratoryStatusWithinIndia": "Winter Migrant",
            "indiaChecklistCommonName": "White-tailed Lapwing",
            "uniqueValue": 236,
            "endemicRegion": "None",
            "soibConcernStatus": "Moderate",
            "wpaSchedule": "Schedule-II",
            "iucnCategory": "Least Concern"
        },
        {
            "indiaChecklistScientificName": "Charadrius mongolus",
            "migratoryStatusWithinIndia": "Winter Migrant & Localized Summer Migrant",
            "indiaChecklistCommonName": "Lesser Sand Plover",
            "uniqueValue": 237,
            "endemicRegion": "None",
            "soibConcernStatus": "High",
            "wpaSchedule": "Schedule-II",
            "iucnCategory": "Least Concern"
        },
        {
            "indiaChecklistScientificName": "Charadrius alexandrinus",
            "migratoryStatusWithinIndia": "Resident & Winter Migrant",
            "indiaChecklistCommonName": "Kentish Plover",
            "uniqueValue": 240,
            "endemicRegion": "None",
            "soibConcernStatus": "High",
            "wpaSchedule": "Schedule-II",
            "iucnCategory": "Least Concern"
        },
        {
            "indiaChecklistScientificName": "Charadrius dubius",
            "migratoryStatusWithinIndia": "Resident & Winter Migrant",
            "indiaChecklistCommonName": "Little Ringed Plover",
            "uniqueValue": 243,
            "endemicRegion": "None",
            "soibConcernStatus": "High",
            "wpaSchedule": "Schedule-II",
            "iucnCategory": "Least Concern"
        },
        {
            "indiaChecklistScientificName": "Calidris minuta",
            "migratoryStatusWithinIndia": "Winter Migrant",
            "indiaChecklistCommonName": "Little Stint",
            "uniqueValue": 265,
            "endemicRegion": "None",
            "soibConcernStatus": "High",
            "wpaSchedule": "Schedule-II",
            "iucnCategory": "Least Concern"
        },
        {
            "indiaChecklistScientificName": "Lymnocryptes minimus",
            "migratoryStatusWithinIndia": "Winter Migrant",
            "indiaChecklistCommonName": "Jack Snipe",
            "uniqueValue": 270,
            "endemicRegion": "None",
            "soibConcernStatus": "NA",
            "wpaSchedule": "Schedule-II",
            "iucnCategory": "Least Concern"
        },
        {
            "indiaChecklistScientificName": "Chroicocephalus ridibundus",
            "migratoryStatusWithinIndia": "Winter Migrant",
            "indiaChecklistCommonName": "Black-headed Gull",
            "uniqueValue": 308,
            "endemicRegion": "None",
            "soibConcernStatus": "High",
            "wpaSchedule": "Schedule-II",
            "iucnCategory": "Least Concern"
        },
        {
            "indiaChecklistScientificName": "Ichthyaetus ichthyaetus",
            "migratoryStatusWithinIndia": "Winter Migrant",
            "indiaChecklistCommonName": "Pallas's Gull",
            "uniqueValue": 314,
            "endemicRegion": "None",
            "soibConcernStatus": "Moderate",
            "wpaSchedule": "Schedule-II",
            "iucnCategory": "Least Concern"
        },
        {
            "indiaChecklistScientificName": "Chlidonias hybrida",
            "migratoryStatusWithinIndia": "Winter Migrant & Localized Summer Migrant",
            "indiaChecklistCommonName": "Whiskered Tern",
            "uniqueValue": 331,
            "endemicRegion": "None",
            "soibConcernStatus": "High",
            "wpaSchedule": "Schedule-II",
            "iucnCategory": "Least Concern"
        },
        {
            "indiaChecklistScientificName": "Sterna aurantia",
            "migratoryStatusWithinIndia": "Resident & Local Migrant",
            "indiaChecklistCommonName": "River Tern",
            "uniqueValue": 337,
            "endemicRegion": "None",
            "soibConcernStatus": "Moderate",
            "wpaSchedule": "Schedule-I",
            "iucnCategory": "Vulnerable"
        },
        {
            "indiaChecklistScientificName": "Ardea cinerea",
            "migratoryStatusWithinIndia": "Resident",
            "indiaChecklistCommonName": "Grey Heron",
            "uniqueValue": 389,
            "endemicRegion": "None",
            "soibConcernStatus": "Low",
            "wpaSchedule": "Schedule-II",
            "iucnCategory": "Least Concern"
        },
        {
            "indiaChecklistScientificName": "Egretta garzetta",
            "migratoryStatusWithinIndia": "Resident",
            "indiaChecklistCommonName": "Little Egret",
            "uniqueValue": 396,
            "endemicRegion": "None",
            "soibConcernStatus": "Low",
            "wpaSchedule": "Schedule-II",
            "iucnCategory": "Least Concern"
        },
        {
            "indiaChecklistScientificName": "Pseudibis papillosa",
            "migratoryStatusWithinIndia": "Resident",
            "indiaChecklistCommonName": "Red-naped Ibis",
            "uniqueValue": 409,
            "endemicRegion": "Indian Subcontinent",
            "soibConcernStatus": "Low",
            "wpaSchedule": "Schedule-II",
            "iucnCategory": "Least Concern"
        },
        {
            "indiaChecklistScientificName": "Neophron percnopterus",
            "migratoryStatusWithinIndia": "Resident & Winter Migrant",
            "indiaChecklistCommonName": "Egyptian Vulture",
            "uniqueValue": 414,
            "endemicRegion": "None",
            "soibConcernStatus": "High",
            "wpaSchedule": "Schedule-I",
            "iucnCategory": "Endangered"
        },
        {
            "indiaChecklistScientificName": "Aegypius monachus",
            "migratoryStatusWithinIndia": "Winter Migrant",
            "indiaChecklistCommonName": "Cinereous Vulture",
            "uniqueValue": 420,
            "endemicRegion": "None",
            "soibConcernStatus": "Moderate",
            "wpaSchedule": "Schedule-I",
            "iucnCategory": "Near Threatened"
        },
        {
            "indiaChecklistScientificName": "Gyps bengalensis",
            "migratoryStatusWithinIndia": "Resident",
            "indiaChecklistCommonName": "White-rumped Vulture",
            "uniqueValue": 421,
            "endemicRegion": "None",
            "soibConcernStatus": "High",
            "wpaSchedule": "Schedule-I",
            "iucnCategory": "Critically Endangered"
        },
        {
            "indiaChecklistScientificName": "Gyps himalayensis",
            "migratoryStatusWithinIndia": "Resident & Winter Migrant",
            "indiaChecklistCommonName": "Himalayan Vulture",
            "uniqueValue": 424,
            "endemicRegion": "None",
            "soibConcernStatus": "Moderate",
            "wpaSchedule": "Schedule-I",
            "iucnCategory": "Near Threatened"
        },
        {
            "indiaChecklistScientificName": "Gyps fulvus",
            "migratoryStatusWithinIndia": "Winter Migrant",
            "indiaChecklistCommonName": "Griffon Vulture",
            "uniqueValue": 425,
            "endemicRegion": "None",
            "soibConcernStatus": "High",
            "wpaSchedule": "Schedule-I",
            "iucnCategory": "Least Concern"
        },
        {
            "indiaChecklistScientificName": "Aquila fasciata",
            "migratoryStatusWithinIndia": "Resident",
            "indiaChecklistCommonName": "Bonelli's Eagle",
            "uniqueValue": 442,
            "endemicRegion": "None",
            "soibConcernStatus": "Low",
            "wpaSchedule": "Schedule-I",
            "iucnCategory": "Least Concern"
        },
        {
            "indiaChecklistScientificName": "Milvus migrans",
            "migratoryStatusWithinIndia": "Resident & Winter Migrant",
            "indiaChecklistCommonName": "Black Kite",
            "uniqueValue": 461,
            "endemicRegion": "None",
            "soibConcernStatus": "Low",
            "wpaSchedule": "Schedule-II",
            "iucnCategory": "Least Concern"
        },
        {
            "indiaChecklistScientificName": "Glaucidium cuculoides",
            "migratoryStatusWithinIndia": "Resident",
            "indiaChecklistCommonName": "Asian Barred Owlet",
            "uniqueValue": 493,
            "endemicRegion": "None",
            "soibConcernStatus": "Low",
            "wpaSchedule": "Schedule-II",
            "iucnCategory": "Least Concern"
        },
        {
            "indiaChecklistScientificName": "Athene brama",
            "migratoryStatusWithinIndia": "Resident",
            "indiaChecklistCommonName": "Spotted Owlet",
            "uniqueValue": 496,
            "endemicRegion": "None",
            "soibConcernStatus": "NA",
            "wpaSchedule": "Schedule-II",
            "iucnCategory": "Least Concern"
        },
        {
            "indiaChecklistScientificName": "Upupa epops",
            "migratoryStatusWithinIndia": "Within-India Migrant & Winter Migrant",
            "indiaChecklistCommonName": "Eurasian Hoopoe",
            "uniqueValue": 512,
            "endemicRegion": "None",
            "soibConcernStatus": "Moderate",
            "wpaSchedule": "Schedule-II",
            "iucnCategory": "Least Concern"
        },
        {
            "indiaChecklistScientificName": "Ocyceros birostris",
            "migratoryStatusWithinIndia": "Resident",
            "indiaChecklistCommonName": "Indian Grey Hornbill",
            "uniqueValue": 515,
            "endemicRegion": "Indian Subcontinent",
            "soibConcernStatus": "Low",
            "wpaSchedule": "Schedule-II",
            "iucnCategory": "Least Concern"
        },
        {
            "indiaChecklistScientificName": "Halcyon smyrnensis",
            "migratoryStatusWithinIndia": "Resident",
            "indiaChecklistCommonName": "White-throated Kingfisher",
            "uniqueValue": 530,
            "endemicRegion": "None",
            "soibConcernStatus": "Low",
            "wpaSchedule": "Schedule-II",
            "iucnCategory": "Least Concern"
        },
        {
            "indiaChecklistScientificName": "Ceryle rudis",
            "migratoryStatusWithinIndia": "Resident",
            "indiaChecklistCommonName": "Pied Kingfisher",
            "uniqueValue": 534,
            "endemicRegion": "None",
            "soibConcernStatus": "Moderate",
            "wpaSchedule": "Schedule-II",
            "iucnCategory": "Least Concern"
        },
        {
            "indiaChecklistScientificName": "Coracias benghalensis",
            "migratoryStatusWithinIndia": "Resident",
            "indiaChecklistCommonName": "Indian Roller",
            "uniqueValue": 543,
            "endemicRegion": "None",
            "soibConcernStatus": "Moderate",
            "wpaSchedule": "Schedule-II",
            "iucnCategory": "Least Concern"
        },
        {
            "indiaChecklistScientificName": "Psilopogon haemacephalus",
            "migratoryStatusWithinIndia": "Resident",
            "indiaChecklistCommonName": "Coppersmith Barbet",
            "uniqueValue": 547,
            "endemicRegion": "None",
            "soibConcernStatus": "Low",
            "wpaSchedule": "Schedule-II",
            "iucnCategory": "Least Concern"
        },
        {
            "indiaChecklistScientificName": "Psilopogon zeylanicus",
            "migratoryStatusWithinIndia": "Resident",
            "indiaChecklistCommonName": "Brown-headed Barbet",
            "uniqueValue": 551,
            "endemicRegion": "Indian Subcontinent",
            "soibConcernStatus": "Low",
            "wpaSchedule": "Schedule-II",
            "iucnCategory": "Least Concern"
        },
        {
            "indiaChecklistScientificName": "Psilopogon asiaticus",
            "migratoryStatusWithinIndia": "Resident",
            "indiaChecklistCommonName": "Blue-throated Barbet",
            "uniqueValue": 554,
            "endemicRegion": "None",
            "soibConcernStatus": "Low",
            "wpaSchedule": "Schedule-II",
            "iucnCategory": "Least Concern"
        },
        {
            "indiaChecklistScientificName": "Yungipicus canicapillus",
            "migratoryStatusWithinIndia": "Resident & Altitudinal Migrant",
            "indiaChecklistCommonName": "Grey-capped Pygmy Woodpecker",
            "uniqueValue": 561,
            "endemicRegion": "None",
            "soibConcernStatus": "Low",
            "wpaSchedule": "Schedule-II",
            "iucnCategory": "Least Concern"
        },
        {
            "indiaChecklistScientificName": "Dendrocopos macei",
            "migratoryStatusWithinIndia": "Resident",
            "indiaChecklistCommonName": "Fulvous-breasted Woodpecker",
            "uniqueValue": 565,
            "endemicRegion": "None",
            "soibConcernStatus": "Low",
            "wpaSchedule": "Schedule-II",
            "iucnCategory": "Least Concern"
        },
        {
            "indiaChecklistScientificName": "Dinopium benghalense",
            "migratoryStatusWithinIndia": "Resident",
            "indiaChecklistCommonName": "Black-rumped Flameback",
            "uniqueValue": 580,
            "endemicRegion": "Indian Subcontinent",
            "soibConcernStatus": "Low",
            "wpaSchedule": "Schedule-II",
            "iucnCategory": "Least Concern"
        },
        {
            "indiaChecklistScientificName": "Psittacula eupatria",
            "migratoryStatusWithinIndia": "Resident",
            "indiaChecklistCommonName": "Alexandrine Parakeet",
            "uniqueValue": 602,
            "endemicRegion": "None",
            "soibConcernStatus": "Low",
            "wpaSchedule": "Schedule-II",
            "iucnCategory": "Near Threatened"
        },
        {
            "indiaChecklistScientificName": "Psittacula krameri",
            "migratoryStatusWithinIndia": "Resident",
            "indiaChecklistCommonName": "Rose-ringed Parakeet",
            "uniqueValue": 603,
            "endemicRegion": "None",
            "soibConcernStatus": "Low",
            "wpaSchedule": "Schedule-II",
            "iucnCategory": "Least Concern"
        },
        {
            "indiaChecklistScientificName": "Psittacula cyanocephala",
            "migratoryStatusWithinIndia": "Resident",
            "indiaChecklistCommonName": "Plum-headed Parakeet",
            "uniqueValue": 606,
            "endemicRegion": "Indian Subcontinent",
            "soibConcernStatus": "Low",
            "wpaSchedule": "Schedule-II",
            "iucnCategory": "Least Concern"
        },
        {
            "indiaChecklistScientificName": "Hemipus picatus",
            "migratoryStatusWithinIndia": "Resident",
            "indiaChecklistCommonName": "Bar-winged Flycatcher-shrike",
            "uniqueValue": 655,
            "endemicRegion": "None",
            "soibConcernStatus": "Low",
            "wpaSchedule": "Schedule-II",
            "iucnCategory": "Least Concern"
        },
        {
            "indiaChecklistScientificName": "Rhipidura albicollis",
            "migratoryStatusWithinIndia": "Resident & Altitudinal Migrant",
            "indiaChecklistCommonName": "White-throated Fantail",
            "uniqueValue": 658,
            "endemicRegion": "None",
            "soibConcernStatus": "Low",
            "wpaSchedule": "Schedule-II",
            "iucnCategory": "Least Concern"
        },
        {
            "indiaChecklistScientificName": "Dicrurus macrocercus",
            "migratoryStatusWithinIndia": "Resident & Local Migrant",
            "indiaChecklistCommonName": "Black Drongo",
            "uniqueValue": 661,
            "endemicRegion": "None",
            "soibConcernStatus": "Low",
            "wpaSchedule": "Schedule-II",
            "iucnCategory": "Least Concern"
        },
        {
            "indiaChecklistScientificName": "Lanius vittatus",
            "migratoryStatusWithinIndia": "Resident & Local Migrant",
            "indiaChecklistCommonName": "Bay-backed Shrike",
            "uniqueValue": 679,
            "endemicRegion": "None",
            "soibConcernStatus": "Low",
            "wpaSchedule": "Schedule-II",
            "iucnCategory": "Least Concern"
        },
        {
            "indiaChecklistScientificName": "Lanius schach",
            "migratoryStatusWithinIndia": "Resident & Within-India Migrant",
            "indiaChecklistCommonName": "Long-tailed Shrike",
            "uniqueValue": 680,
            "endemicRegion": "None",
            "soibConcernStatus": "Low",
            "wpaSchedule": "Schedule-II",
            "iucnCategory": "Least Concern"
        },
        {
            "indiaChecklistScientificName": "Dendrocitta vagabunda",
            "migratoryStatusWithinIndia": "Resident",
            "indiaChecklistCommonName": "Rufous Treepie",
            "uniqueValue": 691,
            "endemicRegion": "None",
            "soibConcernStatus": "Low",
            "wpaSchedule": "Schedule-II",
            "iucnCategory": "Least Concern"
        },
        {
            "indiaChecklistScientificName": "Corvus splendens",
            "migratoryStatusWithinIndia": "Resident",
            "indiaChecklistCommonName": "House Crow",
            "uniqueValue": 703,
            "endemicRegion": "None",
            "soibConcernStatus": "Low",
            "wpaSchedule": "Not protected",
            "iucnCategory": "Least Concern"
        },
        {
            "indiaChecklistScientificName": "Corvus macrorhynchos",
            "migratoryStatusWithinIndia": "Resident",
            "indiaChecklistCommonName": "Large-billed Crow",
            "uniqueValue": 707,
            "endemicRegion": "None",
            "soibConcernStatus": "Low",
            "wpaSchedule": "Schedule-II",
            "iucnCategory": "Least Concern"
        },
        {
            "indiaChecklistScientificName": "Chelidorhynx hypoxanthus",
            "migratoryStatusWithinIndia": "Resident & Altitudinal Migrant",
            "indiaChecklistCommonName": "Yellow-bellied Fantail",
            "uniqueValue": 710,
            "endemicRegion": "None",
            "soibConcernStatus": "Moderate",
            "wpaSchedule": "Schedule-II",
            "iucnCategory": "Least Concern"
        },
        {
            "indiaChecklistScientificName": "Culicicapa ceylonensis",
            "migratoryStatusWithinIndia": "Resident & Within-India Migrant",
            "indiaChecklistCommonName": "Grey-headed Canary-flycatcher",
            "uniqueValue": 711,
            "endemicRegion": "None",
            "soibConcernStatus": "Moderate",
            "wpaSchedule": "Schedule-II",
            "iucnCategory": "Least Concern"
        },
        {
            "indiaChecklistScientificName": "Parus cinereus",
            "migratoryStatusWithinIndia": "Resident",
            "indiaChecklistCommonName": "Cinereous Tit",
            "uniqueValue": 722,
            "endemicRegion": "None",
            "soibConcernStatus": "Low",
            "wpaSchedule": "Schedule-II",
            "iucnCategory": "Least Concern"
        },
        {
            "indiaChecklistScientificName": "Alaudala raytal",
            "migratoryStatusWithinIndia": "Resident",
            "indiaChecklistCommonName": "Sand Lark",
            "uniqueValue": 744,
            "endemicRegion": "None",
            "soibConcernStatus": "Moderate",
            "wpaSchedule": "Schedule-II",
            "iucnCategory": "Least Concern"
        },
        {
            "indiaChecklistScientificName": "Galerida cristata",
            "migratoryStatusWithinIndia": "Resident",
            "indiaChecklistCommonName": "Crested Lark",
            "uniqueValue": 747,
            "endemicRegion": "None",
            "soibConcernStatus": "Moderate",
            "wpaSchedule": "Schedule-II",
            "iucnCategory": "Least Concern"
        },
        {
            "indiaChecklistScientificName": "Orthotomus sutorius",
            "migratoryStatusWithinIndia": "Resident",
            "indiaChecklistCommonName": "Common Tailorbird",
            "uniqueValue": 750,
            "endemicRegion": "None",
            "soibConcernStatus": "Low",
            "wpaSchedule": "Schedule-II",
            "iucnCategory": "Least Concern"
        },
        {
            "indiaChecklistScientificName": "Prinia socialis",
            "migratoryStatusWithinIndia": "Resident",
            "indiaChecklistCommonName": "Ashy Prinia",
            "uniqueValue": 763,
            "endemicRegion": "Indian Subcontinent",
            "soibConcernStatus": "Low",
            "wpaSchedule": "Schedule-II",
            "iucnCategory": "Least Concern"
        },
        {
            "indiaChecklistScientificName": "Pycnonotus cafer",
            "migratoryStatusWithinIndia": "Resident",
            "indiaChecklistCommonName": "Red-vented Bulbul",
            "uniqueValue": 818,
            "endemicRegion": "None",
            "soibConcernStatus": "Low",
            "wpaSchedule": "Schedule-II",
            "iucnCategory": "Least Concern"
        },
        {
            "indiaChecklistScientificName": "Pycnonotus leucogenys",
            "migratoryStatusWithinIndia": "Local Migrant",
            "indiaChecklistCommonName": "Himalayan Bulbul",
            "uniqueValue": 821,
            "endemicRegion": "Himalayas",
            "soibConcernStatus": "Low",
            "wpaSchedule": "Schedule-II",
            "iucnCategory": "Least Concern"
        },
        {
            "indiaChecklistScientificName": "Phylloscopus humei",
            "migratoryStatusWithinIndia": "Winter Migrant & Localized Summer Migrant",
            "indiaChecklistCommonName": "Hume's Warbler",
            "uniqueValue": 838,
            "endemicRegion": "None",
            "soibConcernStatus": "Low",
            "wpaSchedule": "Schedule-II",
            "iucnCategory": "Least Concern"
        },
        {
            "indiaChecklistScientificName": "Phylloscopus chloronotus",
            "migratoryStatusWithinIndia": "Resident & Altitudinal Migrant",
            "indiaChecklistCommonName": "Lemon-rumped Warbler",
            "uniqueValue": 842,
            "endemicRegion": "None",
            "soibConcernStatus": "Moderate",
            "wpaSchedule": "Schedule-II",
            "iucnCategory": "Least Concern"
        },
        {
            "indiaChecklistScientificName": "Phylloscopus affinis",
            "migratoryStatusWithinIndia": "Within-India Migrant & Winter Migrant",
            "indiaChecklistCommonName": "Tickell's Leaf Warbler",
            "uniqueValue": 846,
            "endemicRegion": "None",
            "soibConcernStatus": "Low",
            "wpaSchedule": "Schedule-II",
            "iucnCategory": "Least Concern"
        },
        {
            "indiaChecklistScientificName": "Phylloscopus collybita",
            "migratoryStatusWithinIndia": "Winter Migrant",
            "indiaChecklistCommonName": "Common Chiffchaff",
            "uniqueValue": 853,
            "endemicRegion": "None",
            "soibConcernStatus": "Low",
            "wpaSchedule": "Schedule-II",
            "iucnCategory": "Least Concern"
        },
        {
            "indiaChecklistScientificName": "Phylloscopus trochiloides",
            "migratoryStatusWithinIndia": "Winter Migrant & Localized Summer Migrant",
            "indiaChecklistCommonName": "Greenish Warbler",
            "uniqueValue": 860,
            "endemicRegion": "None",
            "soibConcernStatus": "Low",
            "wpaSchedule": "Schedule-II",
            "iucnCategory": "Least Concern"
        },
        {
            "indiaChecklistScientificName": "Phylloscopus xanthoschistos",
            "migratoryStatusWithinIndia": "Resident & Altitudinal Migrant",
            "indiaChecklistCommonName": "Grey-hooded Warbler",
            "uniqueValue": 871,
            "endemicRegion": "Himalayas",
            "soibConcernStatus": "Low",
            "wpaSchedule": "Schedule-II",
            "iucnCategory": "Least Concern"
        },
        {
            "indiaChecklistScientificName": "Curruca curruca",
            "migratoryStatusWithinIndia": "Winter Migrant & Localized Summer Migrant",
            "indiaChecklistCommonName": "Lesser Whitethroat",
            "uniqueValue": 898,
            "endemicRegion": "None",
            "soibConcernStatus": "Low",
            "wpaSchedule": "Schedule-II",
            "iucnCategory": "Least Concern"
        },
        {
            "indiaChecklistScientificName": "Zosterops palpebrosus",
            "migratoryStatusWithinIndia": "Resident",
            "indiaChecklistCommonName": "Indian White-eye",
            "uniqueValue": 926,
            "endemicRegion": "None",
            "soibConcernStatus": "Low",
            "wpaSchedule": "Schedule-II",
            "iucnCategory": "Least Concern"
        },
        {
            "indiaChecklistScientificName": "Argya striata",
            "migratoryStatusWithinIndia": "Resident",
            "indiaChecklistCommonName": "Jungle Babbler",
            "uniqueValue": 1008,
            "endemicRegion": "Indian Subcontinent",
            "soibConcernStatus": "Low",
            "wpaSchedule": "Schedule-II",
            "iucnCategory": "Least Concern"
        },
        {
            "indiaChecklistScientificName": "Argya caudata",
            "migratoryStatusWithinIndia": "Resident",
            "indiaChecklistCommonName": "Common Babbler",
            "uniqueValue": 1010,
            "endemicRegion": "Indian Subcontinent",
            "soibConcernStatus": "Moderate",
            "wpaSchedule": "Schedule-II",
            "iucnCategory": "Least Concern"
        },
        {
            "indiaChecklistScientificName": "Certhia himalayana",
            "migratoryStatusWithinIndia": "Resident",
            "indiaChecklistCommonName": "Bar-tailed Treecreeper",
            "uniqueValue": 1040,
            "endemicRegion": "None",
            "soibConcernStatus": "Low",
            "wpaSchedule": "Schedule-II",
            "iucnCategory": "Least Concern"
        },
        {
            "indiaChecklistScientificName": "Gracupica contra",
            "migratoryStatusWithinIndia": "Resident",
            "indiaChecklistCommonName": "Asian Pied Starling",
            "uniqueValue": 1057,
            "endemicRegion": "None",
            "soibConcernStatus": "Low",
            "wpaSchedule": "Schedule-II",
            "iucnCategory": "Least Concern"
        },
        {
            "indiaChecklistScientificName": "Sturnia pagodarum",
            "migratoryStatusWithinIndia": "Resident",
            "indiaChecklistCommonName": "Brahminy Starling",
            "uniqueValue": 1059,
            "endemicRegion": "None",
            "soibConcernStatus": "Low",
            "wpaSchedule": "Schedule-II",
            "iucnCategory": "Least Concern"
        },
        {
            "indiaChecklistScientificName": "Acridotheres tristis",
            "migratoryStatusWithinIndia": "Resident",
            "indiaChecklistCommonName": "Common Myna",
            "uniqueValue": 1065,
            "endemicRegion": "None",
            "soibConcernStatus": "Low",
            "wpaSchedule": "Schedule-II",
            "iucnCategory": "Least Concern"
        },
        {
            "indiaChecklistScientificName": "Acridotheres ginginianus",
            "migratoryStatusWithinIndia": "Resident",
            "indiaChecklistCommonName": "Bank Myna",
            "uniqueValue": 1066,
            "endemicRegion": "Indian Subcontinent",
            "soibConcernStatus": "High",
            "wpaSchedule": "Schedule-II",
            "iucnCategory": "Least Concern"
        },
        {
            "indiaChecklistScientificName": "Acridotheres fuscus",
            "migratoryStatusWithinIndia": "Resident",
            "indiaChecklistCommonName": "Jungle Myna",
            "uniqueValue": 1067,
            "endemicRegion": "None",
            "soibConcernStatus": "Low",
            "wpaSchedule": "Schedule-II",
            "iucnCategory": "Least Concern"
        },
        {
            "indiaChecklistScientificName": "Turdus atrogularis",
            "migratoryStatusWithinIndia": "Winter Migrant",
            "indiaChecklistCommonName": "Black-throated Thrush",
            "uniqueValue": 1100,
            "endemicRegion": "None",
            "soibConcernStatus": "Low",
            "wpaSchedule": "Schedule-II",
            "iucnCategory": "Least Concern"
        },
        {
            "indiaChecklistScientificName": "Copsychus fulicatus",
            "migratoryStatusWithinIndia": "Resident",
            "indiaChecklistCommonName": "Indian Robin",
            "uniqueValue": 1110,
            "endemicRegion": "Indian Subcontinent",
            "soibConcernStatus": "Low",
            "wpaSchedule": "Schedule-II",
            "iucnCategory": "Least Concern"
        },
        {
            "indiaChecklistScientificName": "Copsychus saularis",
            "migratoryStatusWithinIndia": "Resident",
            "indiaChecklistCommonName": "Oriental Magpie Robin",
            "uniqueValue": 1111,
            "endemicRegion": "None",
            "soibConcernStatus": "Low",
            "wpaSchedule": "Schedule-II",
            "iucnCategory": "Least Concern"
        },
        {
            "indiaChecklistScientificName": "Luscinia svecica",
            "migratoryStatusWithinIndia": "Winter Migrant & Localized Summer Migrant",
            "indiaChecklistCommonName": "Bluethroat",
            "uniqueValue": 1141,
            "endemicRegion": "None",
            "soibConcernStatus": "Moderate",
            "wpaSchedule": "Schedule-II",
            "iucnCategory": "Least Concern"
        },
        {
            "indiaChecklistScientificName": "Myophonus caeruleus",
            "migratoryStatusWithinIndia": "Resident & Altitudinal Migrant",
            "indiaChecklistCommonName": "Blue Whistling Thrush",
            "uniqueValue": 1143,
            "endemicRegion": "None",
            "soibConcernStatus": "Low",
            "wpaSchedule": "Schedule-II",
            "iucnCategory": "Least Concern"
        },
        {
            "indiaChecklistScientificName": "Phoenicurus ochruros",
            "migratoryStatusWithinIndia": "Winter Migrant & Localized Summer Migrant",
            "indiaChecklistCommonName": "Black Redstart",
            "uniqueValue": 1184,
            "endemicRegion": "None",
            "soibConcernStatus": "Moderate",
            "wpaSchedule": "Schedule-II",
            "iucnCategory": "Least Concern"
        },
        {
            "indiaChecklistScientificName": "Saxicola caprata",
            "migratoryStatusWithinIndia": "Resident & Within-India Migrant",
            "indiaChecklistCommonName": "Pied Bushchat",
            "uniqueValue": 1196,
            "endemicRegion": "None",
            "soibConcernStatus": "Low",
            "wpaSchedule": "Schedule-II",
            "iucnCategory": "Least Concern"
        },
        {
            "indiaChecklistScientificName": "Saxicola ferreus",
            "migratoryStatusWithinIndia": "Resident & Within-India Migrant",
            "indiaChecklistCommonName": "Grey Bushchat",
            "uniqueValue": 1198,
            "endemicRegion": "None",
            "soibConcernStatus": "Low",
            "wpaSchedule": "Schedule-II",
            "iucnCategory": "Least Concern"
        },
        {
            "indiaChecklistScientificName": "Lonchura punctulata",
            "migratoryStatusWithinIndia": "Resident",
            "indiaChecklistCommonName": "Scaly-breasted Munia",
            "uniqueValue": 1244,
            "endemicRegion": "None",
            "soibConcernStatus": "Low",
            "wpaSchedule": "Schedule-II",
            "iucnCategory": "Least Concern"
        },
        {
            "indiaChecklistScientificName": "Passer domesticus",
            "migratoryStatusWithinIndia": "Resident & Winter Migrant",
            "indiaChecklistCommonName": "House Sparrow",
            "uniqueValue": 1258,
            "endemicRegion": "None",
            "soibConcernStatus": "Moderate",
            "wpaSchedule": "Schedule-II",
            "iucnCategory": "Least Concern"
        },
        {
            "indiaChecklistScientificName": "Motacilla citreola",
            "migratoryStatusWithinIndia": "Winter Migrant & Localized Summer Migrant",
            "indiaChecklistCommonName": "Citrine Wagtail",
            "uniqueValue": 1274,
            "endemicRegion": "None",
            "soibConcernStatus": "Moderate",
            "wpaSchedule": "Schedule-II",
            "iucnCategory": "Least Concern"
        },
        {
            "indiaChecklistScientificName": "Motacilla maderaspatensis",
            "migratoryStatusWithinIndia": "Resident",
            "indiaChecklistCommonName": "White-browed Wagtail",
            "uniqueValue": 1275,
            "endemicRegion": "Indian Subcontinent",
            "soibConcernStatus": "Low",
            "wpaSchedule": "Schedule-II",
            "iucnCategory": "Least Concern"
        },
        {
            "indiaChecklistScientificName": "Motacilla alba",
            "migratoryStatusWithinIndia": "Within-India Migrant & Winter Migrant",
            "indiaChecklistCommonName": "White Wagtail",
            "uniqueValue": 1276,
            "endemicRegion": "None",
            "soibConcernStatus": "Moderate",
            "wpaSchedule": "Schedule-II",
            "iucnCategory": "Least Concern"
        },
        {
            "indiaChecklistScientificName": "Anthus rufulus",
            "migratoryStatusWithinIndia": "Resident",
            "indiaChecklistCommonName": "Paddyfield Pipit",
            "uniqueValue": 1278,
            "endemicRegion": "None",
            "soibConcernStatus": "Low",
            "wpaSchedule": "Schedule-II",
            "iucnCategory": "Least Concern"
        }
    ])
  })
  })


  describe('(State, County, Locality and Date) Data Contributions ID-T5037', () => {

    it('T5037/effortsDetails', async () => {
  
      const response = await request(app)
        .get('/api/users/effortsDetails')
        .query({
            state: 'Himachal Pradesh',
            county: 'Kangra',
            locality:'Nagrota Surian Forest Complex',
            start: '01-01-2000',
            end: '05-31-2022'
          })
        .expect(200);
      expect(response.body).toEqual({
        "data": {
            "numberOfObservations": 369,
            "numberOfList": "35",
            "numberOfUniqueLists": "24",
            "totalNumberOfHours": 21,
            "totalNumberOfObservers": 20
        }
    })
    })
  });