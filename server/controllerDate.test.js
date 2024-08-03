
const UserController = require('./controllers/controller');
const request = require('supertest');
const express = require('express');
const bodyParser = require('body-parser');


const app = express();

app.use(bodyParser.json());

app.get('/api/users/location_listing', UserController.locationName); // Time 2m 1.20s
app.get('/api/users/count_iucn_species', UserController.count1); 
app.get('/api/users/count_appendix_species', UserController.count2); 
app.get('/api/users/count_number_species', UserController.count3); 
app.get('/api/users/percentage_iucn_redList_species', UserController.iucnRedListSpeicies); // Time 6 m 43.08 s
app.get('/api/users/percentage_endemic_species', UserController.endemincSpecies); // Time 4 m 59.58 s
app.get('/api/users/pertcentage_most_common_species', UserController.mostCommonSpecies); // Time 6 m 12.54 s
app.get('/api/users/seasonal_chart_for_species', UserController.seasonalChart); // Time 3 m 27.60 s
app.get('/api/users/hotspot_area', UserController.hotspotArea); //1 m 43.56 s
app.get('/api/users/complete_List_Of_Species', UserController.completeListOfSpecies); // Time 1 m 50.10 s
app.get('/api/users/water_bird_congregation', UserController.waterBirdCongregations); // Time 1 m 57.42 s
app.get('/api/users/effortsDetails', UserController.effortsDetails); // Time 46 m 4.80 s
app.get("/api/users/soibConcernStatus",UserController.soibConcernStatus); // 2 m 41.76 s




jest.setTimeout(90000);


describe('(State,County and Date) Location Name ID-T5012', () => {

  //Controller locationName state and county
  it('T5012/location_listing', async () => {
    const response = await request(app)
      .get('/api/users/location_listing')
      .query({
        state: 'Himachal Pradesh',
        county: 'Kangra',
        start:'01-01-2000',
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


describe('(State,County and Date) Species Details ID-T5013', () => {

  it('T5013/count_iucn_species', async () => {

    const response = await request(app)
      .get('/api/users/count_iucn_species')
      .query({
        state: 'Himachal Pradesh',
        county: 'Kangra',
        start:'01-01-2000',
        end: '05-31-2022'
      })
      .expect(200);
    expect(response.body).toEqual({
        "iucnRedListCategoriesCount": {
            "Vulnerable": 8,   
            "Critically Endangered": 4,
            "Near Threatened": 18,
            "Endangered": 5
        }
    })
  })
})

//issue in alll values

describe('(State,County and Date) Species Details ID-T5014', () => {

  it('T5014/count_appendix_species', async () => {

    const response = await request(app)
      .get('/api/users/count_appendix_species')
      .query({
        state: 'Himachal Pradesh',
        county: 'Kangra',
        start:'01-01-2000',
        end: '05-31-2022'
      })
      .expect(200);
    expect(response.body).toEqual({
        "soibConservationConcernSpecies": [
            {
                "species": "Moderate Priority",
                "count": 93
            },
            {
                "species": "High Priority",
                "count": 72
            }
        ],
        "citesAppendixSpecies": [
            {
                "species": "Appendix I",
                "count": 6
            },
            {
                "species": "Appendix II",
                "count": 56
            }
        ],
        "cmsAppendixSpecies": [
            {
                "species": "Appendix I",
                "count": 16
            },
            {
                "species": "Appendix II",
                "count": 225
            }
        ]
    })
  })
})

//issue in all values
describe('(State,County and Date) Species Details ID-T5015', () => {

  it('T5015/count_number_species', async () => {

    const response = await request(app)
      .get('/api/users/count_number_species')
      .query({
        state: 'Himachal Pradesh',
        county: 'Kangra',
        start:'01-01-2000',
        end: '05-31-2022'
      })
      .expect(200);
    expect(response.body).toEqual({
        "total": 472,
        "migrate": 177,
        "iucnRedList": 17,
        "soibHighPriority": 72,
        "scheduleI": 55,
        "indiaEndemic": 0
    })
  })
})
  
  describe('(State,County and Date) IUCN Red List Species ID-T5016', () => {

  it('T5016/percentage_iucn_redList_species', async () => {

    const response = await request(app)
      .get('/api/users/percentage_iucn_redList_species')
      .query({
        state: 'Himachal Pradesh',
        county: 'Kangra',
        start:'01-01-2000',
        end: '05-31-2022'
      })
      .expect(200);
      // console.log(response.body);
    expect(response.body).toEqual([
        {
            "region": "Critically Endangered",
            "indiaChecklistScientificName": "Sarcogyps calvus",
            "indiaChecklistCommonName": "Red-headed Vulture",
            "uniqueValue": 419,
            "percentage": "1%",
            "samplingEventIdentifier": "S79732647",
            "observationDate": "31-12-2020"
        },
        {
            "region": "Critically Endangered",
            "indiaChecklistScientificName": "Gyps bengalensis",
            "indiaChecklistCommonName": "White-rumped Vulture",
            "uniqueValue": 421,
            "percentage": "5%",
            "samplingEventIdentifier": "S111393394",
            "observationDate": "25-05-2022"
        },
        {
            "region": "Critically Endangered",
            "indiaChecklistScientificName": "Gyps indicus",
            "indiaChecklistCommonName": "Indian Vulture",
            "uniqueValue": 422,
            "percentage": "0%",
            "samplingEventIdentifier": "S93625716",
            "observationDate": "23-08-2021"
        },
        {
            "region": "Critically Endangered",
            "indiaChecklistScientificName": "Gyps tenuirostris",
            "indiaChecklistCommonName": "Slender-billed Vulture",
            "uniqueValue": 423,
            "percentage": "0%",
            "samplingEventIdentifier": "S96912502",
            "observationDate": "30-10-2021"
        },
        {
            "region": "Endangered",
            "indiaChecklistScientificName": "Calidris tenuirostris",
            "indiaChecklistCommonName": "Great Knot",
            "uniqueValue": 253,
            "percentage": "0%",
            "samplingEventIdentifier": "S96359727",
            "observationDate": "24-03-2013"
        },
        {
            "region": "Endangered",
            "indiaChecklistScientificName": "Sterna acuticauda",
            "indiaChecklistCommonName": "Black-bellied Tern",
            "uniqueValue": 336,
            "percentage": "0%",
            "samplingEventIdentifier": "S63955438",
            "observationDate": "31-01-2020"
        },
        {
            "region": "Endangered",
            "indiaChecklistScientificName": "Neophron percnopterus",
            "indiaChecklistCommonName": "Egyptian Vulture",
            "uniqueValue": 414,
            "percentage": "18%",
            "samplingEventIdentifier": "S110189683",
            "observationDate": "15-05-2022"
        },
        {
            "region": "Endangered",
            "indiaChecklistScientificName": "Aquila nipalensis",
            "indiaChecklistCommonName": "Steppe Eagle",
            "uniqueValue": 439,
            "percentage": "5%",
            "samplingEventIdentifier": "S107543759",
            "observationDate": "17-04-2022"
        },
        {
            "region": "Endangered",
            "indiaChecklistScientificName": "Haliaeetus leucoryphus",
            "indiaChecklistCommonName": "Pallas's Fish Eagle",
            "uniqueValue": 464,
            "percentage": "0%",
            "samplingEventIdentifier": "S76318785",
            "observationDate": "07-11-2020"
        },
        {
            "region": "Vulnerable",
            "indiaChecklistScientificName": "Anser erythropus",
            "indiaChecklistCommonName": "Lesser White-fronted Goose",
            "uniqueValue": 6,
            "percentage": "0%",
            "samplingEventIdentifier": "S106243585",
            "observationDate": "04-04-2022"
        },
        {
            "region": "Vulnerable",
            "indiaChecklistScientificName": "Branta ruficollis",
            "indiaChecklistCommonName": "Red-breasted Goose",
            "uniqueValue": 9,
            "percentage": "0%",
            "samplingEventIdentifier": "S54002453",
            "observationDate": "20-12-2014"
        },
        {
            "region": "Vulnerable",
            "indiaChecklistScientificName": "Aythya ferina",
            "indiaChecklistCommonName": "Common Pochard",
            "uniqueValue": 34,
            "percentage": "11%",
            "samplingEventIdentifier": "S108266140",
            "observationDate": "27-04-2022"
        },
        {
            "region": "Vulnerable",
            "indiaChecklistScientificName": "Catreus wallichii",
            "indiaChecklistCommonName": "Cheer Pheasant",
            "uniqueValue": 61,
            "percentage": "0%",
            "samplingEventIdentifier": "S60540482",
            "observationDate": "12-10-2019"
        },
        {
            "region": "Vulnerable",
            "indiaChecklistScientificName": "Antigone antigone",
            "indiaChecklistCommonName": "Sarus Crane",
            "uniqueValue": 216,
            "percentage": "1%",
            "samplingEventIdentifier": "S107552792",
            "observationDate": "20-04-2022"
        },
        {
            "region": "Vulnerable",
            "indiaChecklistScientificName": "Sterna aurantia",
            "indiaChecklistCommonName": "River Tern",
            "uniqueValue": 337,
            "percentage": "17%",
            "samplingEventIdentifier": "S111769804",
            "observationDate": "31-05-2022"
        },
        {
            "region": "Vulnerable",
            "indiaChecklistScientificName": "Clanga hastata",
            "indiaChecklistCommonName": "Indian Spotted Eagle",
            "uniqueValue": 435,
            "percentage": "0%",
            "samplingEventIdentifier": "S93568756",
            "observationDate": "27-03-2021"
        },
        {
            "region": "Vulnerable",
            "indiaChecklistScientificName": "Aquila heliaca",
            "indiaChecklistCommonName": "Eastern Imperial Eagle",
            "uniqueValue": 440,
            "percentage": "0%",
            "samplingEventIdentifier": "S97285643",
            "observationDate": "08-11-2021"
        },
        {
            "region": "Near Threatened",
            "indiaChecklistScientificName": "Aythya nyroca",
            "indiaChecklistCommonName": "Ferruginous Duck",
            "uniqueValue": 35,
            "percentage": "2%",
            "samplingEventIdentifier": "S104600409",
            "observationDate": "11-03-2022"
        },
        {
            "region": "Near Threatened",
            "indiaChecklistScientificName": "Esacus recurvirostris",
            "indiaChecklistCommonName": "Great Thick-knee",
            "uniqueValue": 220,
            "percentage": "5%",
            "samplingEventIdentifier": "S106243585",
            "observationDate": "04-04-2022"
        },
        {
            "region": "Near Threatened",
            "indiaChecklistScientificName": "Haematopus ostralegus",
            "indiaChecklistCommonName": "Eurasian Oystercatcher",
            "uniqueValue": 225,
            "percentage": "0%",
            "samplingEventIdentifier": "S97651419",
            "observationDate": "16-11-2021"
        },
        {
            "region": "Near Threatened",
            "indiaChecklistScientificName": "Vanellus vanellus",
            "indiaChecklistCommonName": "Northern Lapwing",
            "uniqueValue": 230,
            "percentage": "4%",
            "samplingEventIdentifier": "S103950636",
            "observationDate": "01-03-2022"
        },
        {
            "region": "Near Threatened",
            "indiaChecklistScientificName": "Vanellus duvaucelii",
            "indiaChecklistCommonName": "River Lapwing",
            "uniqueValue": 231,
            "percentage": "15%",
            "samplingEventIdentifier": "S110588716",
            "observationDate": "16-05-2022"
        },
        {
            "region": "Near Threatened",
            "indiaChecklistScientificName": "Numenius arquata",
            "indiaChecklistCommonName": "Eurasian Curlew",
            "uniqueValue": 249,
            "percentage": "1%",
            "samplingEventIdentifier": "S102846834",
            "observationDate": "18-02-2022"
        },
        {
            "region": "Near Threatened",
            "indiaChecklistScientificName": "Limosa limosa",
            "indiaChecklistCommonName": "Black-tailed Godwit",
            "uniqueValue": 251,
            "percentage": "1%",
            "samplingEventIdentifier": "S96972087",
            "observationDate": "01-11-2021"
        },
        {
            "region": "Near Threatened",
            "indiaChecklistScientificName": "Calidris ferruginea",
            "indiaChecklistCommonName": "Curlew Sandpiper",
            "uniqueValue": 258,
            "percentage": "0%",
            "samplingEventIdentifier": "S97098414",
            "observationDate": "19-09-2021"
        },
        {
            "region": "Near Threatened",
            "indiaChecklistScientificName": "Ciconia episcopus",
            "indiaChecklistCommonName": "Woolly-necked Stork",
            "uniqueValue": 365,
            "percentage": "3%",
            "samplingEventIdentifier": "S106788956",
            "observationDate": "09-04-2022"
        },
        {
            "region": "Near Threatened",
            "indiaChecklistScientificName": "Anhinga melanogaster",
            "indiaChecklistCommonName": "Oriental Darter",
            "uniqueValue": 377,
            "percentage": "0%",
            "samplingEventIdentifier": "S102542956",
            "observationDate": "13-02-2022"
        },
        {
            "region": "Near Threatened",
            "indiaChecklistScientificName": "Threskiornis melanocephalus",
            "indiaChecklistCommonName": "Black-headed Ibis",
            "uniqueValue": 408,
            "percentage": "0%",
            "samplingEventIdentifier": "S73198464",
            "observationDate": "05-09-2020"
        },
        {
            "region": "Near Threatened",
            "indiaChecklistScientificName": "Gypaetus barbatus",
            "indiaChecklistCommonName": "Bearded Vulture",
            "uniqueValue": 413,
            "percentage": "2%",
            "samplingEventIdentifier": "S107543969",
            "observationDate": "19-04-2022"
        },
        {
            "region": "Near Threatened",
            "indiaChecklistScientificName": "Aegypius monachus",
            "indiaChecklistCommonName": "Cinereous Vulture",
            "uniqueValue": 420,
            "percentage": "1%",
            "samplingEventIdentifier": "S104600409",
            "observationDate": "11-03-2022"
        },
        {
            "region": "Near Threatened",
            "indiaChecklistScientificName": "Gyps himalayensis",
            "indiaChecklistCommonName": "Himalayan Vulture",
            "uniqueValue": 424,
            "percentage": "18%",
            "samplingEventIdentifier": "S111380849",
            "observationDate": "27-05-2022"
        },
        {
            "region": "Near Threatened",
            "indiaChecklistScientificName": "Nisaetus nipalensis",
            "indiaChecklistCommonName": "Mountain Hawk Eagle",
            "uniqueValue": 431,
            "percentage": "2%",
            "samplingEventIdentifier": "S108287648",
            "observationDate": "28-04-2022"
        },
        {
            "region": "Near Threatened",
            "indiaChecklistScientificName": "Circus macrourus",
            "indiaChecklistCommonName": "Pallid Harrier",
            "uniqueValue": 449,
            "percentage": "0%",
            "samplingEventIdentifier": "S43590666",
            "observationDate": "10-03-2018"
        },
        {
            "region": "Near Threatened",
            "indiaChecklistScientificName": "Falco chicquera",
            "indiaChecklistCommonName": "Red-necked Falcon",
            "uniqueValue": 593,
            "percentage": "0%",
            "samplingEventIdentifier": "S64479321",
            "observationDate": "14-02-2020"
        },
        {
            "region": "Near Threatened",
            "indiaChecklistScientificName": "Psittacula eupatria",
            "indiaChecklistCommonName": "Alexandrine Parakeet",
            "uniqueValue": 602,
            "percentage": "18%",
            "samplingEventIdentifier": "S111769804",
            "observationDate": "31-05-2022"
        }
    ])
  })
})

  describe('(State,County and Date) Endemic Species ID-T5017', () => {
  it('T5017/percentage_endemic_species', async () => {

    const response = await request(app)
      .get('/api/users/percentage_endemic_species')
      .query({
        state: 'Himachal Pradesh',
        county: 'Kangra',
        start:'01-01-2000',
        end: '05-31-2022'
      })
      .expect(200);
      // console.log(response.body)
    expect(response.body).toEqual([
        {
            "region": "Himalayas",
            "indiaChecklistScientificName": "Arborophila torqueola",
            "indiaChecklistCommonName": "Hill Partridge",
            "uniqueValue": 46,
            "percentage": "2%",
            "samplingEventIdentifier": "S109629433",
            "observationDate": "08-05-2022"
        },
        {
            "region": "Himalayas",
            "indiaChecklistScientificName": "Lophophorus impejanus",
            "indiaChecklistCommonName": "Himalayan Monal",
            "uniqueValue": 56,
            "percentage": "1%",
            "samplingEventIdentifier": "S110456470",
            "observationDate": "14-05-2022"
        },
        {
            "region": "Western Himalayas",
            "indiaChecklistScientificName": "Catreus wallichii",
            "indiaChecklistCommonName": "Cheer Pheasant",
            "uniqueValue": 61,
            "percentage": "0%",
            "samplingEventIdentifier": "S60540482",
            "observationDate": "12-10-2019"
        },
        {
            "region": "Indian Subcontinent",
            "indiaChecklistScientificName": "Pavo cristatus",
            "indiaChecklistCommonName": "Indian Peafowl",
            "uniqueValue": 63,
            "percentage": "4%",
            "samplingEventIdentifier": "S111769804",
            "observationDate": "31-05-2022"
        },
        {
            "region": "Himalayas",
            "indiaChecklistScientificName": "Tetraogallus himalayensis",
            "indiaChecklistCommonName": "Himalayan Snowcock",
            "uniqueValue": 77,
            "percentage": "0%",
            "samplingEventIdentifier": "S75090724",
            "observationDate": "13-10-2020"
        },
        {
            "region": "Indian Subcontinent",
            "indiaChecklistScientificName": "Perdicula asiatica",
            "indiaChecklistCommonName": "Jungle Bush Quail",
            "uniqueValue": 83,
            "percentage": "0%",
            "samplingEventIdentifier": "S103335587",
            "observationDate": "21-02-2022"
        },
        {
            "region": "Indian Subcontinent",
            "indiaChecklistScientificName": "Taccocua leschenaultii",
            "indiaChecklistCommonName": "Sirkeer Malkoha",
            "uniqueValue": 144,
            "percentage": "0%",
            "samplingEventIdentifier": "S102848463",
            "observationDate": "18-02-2022"
        },
        {
            "region": "Indian Subcontinent",
            "indiaChecklistScientificName": "Cacomantis passerinus",
            "indiaChecklistCommonName": "Grey-bellied Cuckoo",
            "uniqueValue": 155,
            "percentage": "0%",
            "samplingEventIdentifier": "S108444513",
            "observationDate": "30-04-2022"
        },
        {
            "region": "Indian Subcontinent",
            "indiaChecklistScientificName": "Hierococcyx varius",
            "indiaChecklistCommonName": "Common Hawk Cuckoo",
            "uniqueValue": 159,
            "percentage": "3%",
            "samplingEventIdentifier": "S111160533",
            "observationDate": "23-05-2022"
        },
        {
            "region": "Indian Subcontinent",
            "indiaChecklistScientificName": "Vanellus malabaricus",
            "indiaChecklistCommonName": "Yellow-wattled Lapwing",
            "uniqueValue": 232,
            "percentage": "4%",
            "samplingEventIdentifier": "S109076709",
            "observationDate": "06-05-2022"
        },
        {
            "region": "Indian Subcontinent",
            "indiaChecklistScientificName": "Pseudibis papillosa",
            "indiaChecklistCommonName": "Red-naped Ibis",
            "uniqueValue": 409,
            "percentage": "3%",
            "samplingEventIdentifier": "S111769804",
            "observationDate": "31-05-2022"
        },
        {
            "region": "Indian Subcontinent",
            "indiaChecklistScientificName": "Gyps indicus",
            "indiaChecklistCommonName": "Indian Vulture",
            "uniqueValue": 422,
            "percentage": "0%",
            "samplingEventIdentifier": "S93625716",
            "observationDate": "23-08-2021"
        },
        {
            "region": "Indian Subcontinent",
            "indiaChecklistScientificName": "Otus bakkamoena",
            "indiaChecklistCommonName": "Indian Scops Owl",
            "uniqueValue": 480,
            "percentage": "0%",
            "samplingEventIdentifier": "S23484013",
            "observationDate": "17-05-2015"
        },
        {
            "region": "Indian Subcontinent",
            "indiaChecklistScientificName": "Ocyceros birostris",
            "indiaChecklistCommonName": "Indian Grey Hornbill",
            "uniqueValue": 515,
            "percentage": "14%",
            "samplingEventIdentifier": "S111769804",
            "observationDate": "31-05-2022"
        },
        {
            "region": "Indian Subcontinent",
            "indiaChecklistScientificName": "Psilopogon zeylanicus",
            "indiaChecklistCommonName": "Brown-headed Barbet",
            "uniqueValue": 551,
            "percentage": "4%",
            "samplingEventIdentifier": "S111769804",
            "observationDate": "31-05-2022"
        },
        {
            "region": "Indian Subcontinent",
            "indiaChecklistScientificName": "Yungipicus nanus",
            "indiaChecklistCommonName": "Brown-capped Pygmy Woodpecker",
            "uniqueValue": 560,
            "percentage": "0%",
            "samplingEventIdentifier": "S36256175",
            "observationDate": "25-04-2017"
        },
        {
            "region": "Himalayas",
            "indiaChecklistScientificName": "Dendrocoptes auriceps",
            "indiaChecklistCommonName": "Brown-fronted Woodpecker",
            "uniqueValue": 563,
            "percentage": "7%",
            "samplingEventIdentifier": "S110630395",
            "observationDate": "19-05-2022"
        },
        {
            "region": "Himalayas",
            "indiaChecklistScientificName": "Dendrocopos himalayensis",
            "indiaChecklistCommonName": "Himalayan Woodpecker",
            "uniqueValue": 570,
            "percentage": "2%",
            "samplingEventIdentifier": "S107601230",
            "observationDate": "21-04-2022"
        },
        {
            "region": "Indian Subcontinent",
            "indiaChecklistScientificName": "Dinopium benghalense",
            "indiaChecklistCommonName": "Black-rumped Flameback",
            "uniqueValue": 580,
            "percentage": "2%",
            "samplingEventIdentifier": "S111769804",
            "observationDate": "31-05-2022"
        },
        {
            "region": "Himalayas",
            "indiaChecklistScientificName": "Picus squamatus",
            "indiaChecklistCommonName": "Scaly-bellied Woodpecker",
            "uniqueValue": 583,
            "percentage": "2%",
            "samplingEventIdentifier": "S111144659",
            "observationDate": "24-05-2022"
        },
        {
            "region": "Indian Subcontinent",
            "indiaChecklistScientificName": "Psittacula himalayana",
            "indiaChecklistCommonName": "Slaty-headed Parakeet",
            "uniqueValue": 604,
            "percentage": "5%",
            "samplingEventIdentifier": "S111672241",
            "observationDate": "30-05-2022"
        },
        {
            "region": "Indian Subcontinent",
            "indiaChecklistScientificName": "Psittacula cyanocephala",
            "indiaChecklistCommonName": "Plum-headed Parakeet",
            "uniqueValue": 606,
            "percentage": "13%",
            "samplingEventIdentifier": "S111769804",
            "observationDate": "31-05-2022"
        },
        {
            "region": "Indian Subcontinent",
            "indiaChecklistScientificName": "Pitta brachyura",
            "indiaChecklistCommonName": "Indian Pitta",
            "uniqueValue": 618,
            "percentage": "0%",
            "samplingEventIdentifier": "S111321367",
            "observationDate": "26-05-2022"
        },
        {
            "region": "Western Himalayas",
            "indiaChecklistScientificName": "Garrulus lanceolatus",
            "indiaChecklistCommonName": "Black-headed Jay",
            "uniqueValue": 687,
            "percentage": "8%",
            "samplingEventIdentifier": "S111217347",
            "observationDate": "25-05-2022"
        },
        {
            "region": "Himalayas",
            "indiaChecklistScientificName": "Urocissa flavirostris",
            "indiaChecklistCommonName": "Yellow-billed Blue Magpie",
            "uniqueValue": 688,
            "percentage": "19%",
            "samplingEventIdentifier": "S111700746",
            "observationDate": "30-05-2022"
        },
        {
            "region": "Himalayas",
            "indiaChecklistScientificName": "Machlolophus xanthogenys",
            "indiaChecklistCommonName": "Himalayan Black-lored Tit",
            "uniqueValue": 724,
            "percentage": "4%",
            "samplingEventIdentifier": "S111144659",
            "observationDate": "24-05-2022"
        },
        {
            "region": "Indian Subcontinent",
            "indiaChecklistScientificName": "Eremopterix griseus",
            "indiaChecklistCommonName": "Ashy-crowned Sparrow Lark",
            "uniqueValue": 732,
            "percentage": "0%",
            "samplingEventIdentifier": "S101820211",
            "observationDate": "16-01-2022"
        },
        {
            "region": "Indian Subcontinent",
            "indiaChecklistScientificName": "Prinia sylvatica",
            "indiaChecklistCommonName": "Jungle Prinia",
            "uniqueValue": 761,
            "percentage": "0%",
            "samplingEventIdentifier": "S53662441",
            "observationDate": "07-03-2019"
        },
        {
            "region": "Indian Subcontinent",
            "indiaChecklistScientificName": "Prinia socialis",
            "indiaChecklistCommonName": "Ashy Prinia",
            "uniqueValue": 763,
            "percentage": "9%",
            "samplingEventIdentifier": "S111769804",
            "observationDate": "31-05-2022"
        },
        {
            "region": "Western Himalayas",
            "indiaChecklistScientificName": "Locustella kashmirensis",
            "indiaChecklistCommonName": "West Himalayan Bush Warbler",
            "uniqueValue": 787,
            "percentage": "0%",
            "samplingEventIdentifier": "S53662441",
            "observationDate": "07-03-2019"
        },
        {
            "region": "Himalayas",
            "indiaChecklistScientificName": "Pnoepyga immaculata",
            "indiaChecklistCommonName": "Nepal Wren Babbler",
            "uniqueValue": 794,
            "percentage": "0%",
            "samplingEventIdentifier": "S38132465",
            "observationDate": "01-11-2007"
        },
        {
            "region": "Himalayas",
            "indiaChecklistScientificName": "Pycnonotus leucogenys",
            "indiaChecklistCommonName": "Himalayan Bulbul",
            "uniqueValue": 821,
            "percentage": "50%",
            "samplingEventIdentifier": "S111769804",
            "observationDate": "31-05-2022"
        },
        {
            "region": "Himalayas",
            "indiaChecklistScientificName": "Phylloscopus xanthoschistos",
            "indiaChecklistCommonName": "Grey-hooded Warbler",
            "uniqueValue": 871,
            "percentage": "28%",
            "samplingEventIdentifier": "S111700746",
            "observationDate": "30-05-2022"
        },
        {
            "region": "Himalayas",
            "indiaChecklistScientificName": "Cyanoderma pyrrhops",
            "indiaChecklistCommonName": "Black-chinned Babbler",
            "uniqueValue": 932,
            "percentage": "6%",
            "samplingEventIdentifier": "S110712475",
            "observationDate": "20-05-2022"
        },
        {
            "region": "Himalayas",
            "indiaChecklistScientificName": "Grammatoptila striata",
            "indiaChecklistCommonName": "Striated Laughingthrush",
            "uniqueValue": 973,
            "percentage": "2%",
            "samplingEventIdentifier": "S108271098",
            "observationDate": "28-04-2022"
        },
        {
            "region": "Himalayas",
            "indiaChecklistScientificName": "Trochalopteron lineatum",
            "indiaChecklistCommonName": "Streaked Laughingthrush",
            "uniqueValue": 978,
            "percentage": "16%",
            "samplingEventIdentifier": "S109662554",
            "observationDate": "11-05-2022"
        },
        {
            "region": "Himalayas",
            "indiaChecklistScientificName": "Trochalopteron variegatum",
            "indiaChecklistCommonName": "Variegated Laughingthrush",
            "uniqueValue": 981,
            "percentage": "9%",
            "samplingEventIdentifier": "S108093747",
            "observationDate": "26-04-2022"
        },
        {
            "region": "Himalayas",
            "indiaChecklistScientificName": "Trochalopteron erythrocephalum",
            "indiaChecklistCommonName": "Chestnut-crowned Laughingthrush",
            "uniqueValue": 984,
            "percentage": "7%",
            "samplingEventIdentifier": "S104980605",
            "observationDate": "17-03-2022"
        },
        {
            "region": "Himalayas",
            "indiaChecklistScientificName": "Heterophasia capistrata",
            "indiaChecklistCommonName": "Rufous Sibia",
            "uniqueValue": 991,
            "percentage": "13%",
            "samplingEventIdentifier": "S109171657",
            "observationDate": "07-05-2022"
        },
        {
            "region": "Indian Subcontinent",
            "indiaChecklistScientificName": "Argya malcolmi",
            "indiaChecklistCommonName": "Large Grey Babbler",
            "uniqueValue": 1005,
            "percentage": "0%",
            "samplingEventIdentifier": "S97235968",
            "observationDate": "07-11-2021"
        },
        {
            "region": "Indian Subcontinent",
            "indiaChecklistScientificName": "Argya striata",
            "indiaChecklistCommonName": "Jungle Babbler",
            "uniqueValue": 1008,
            "percentage": "12%",
            "samplingEventIdentifier": "S111769804",
            "observationDate": "31-05-2022"
        },
        {
            "region": "Indian Subcontinent",
            "indiaChecklistScientificName": "Argya caudata",
            "indiaChecklistCommonName": "Common Babbler",
            "uniqueValue": 1010,
            "percentage": "2%",
            "samplingEventIdentifier": "S102849094",
            "observationDate": "18-02-2022"
        },
        {
            "region": "Himalayas",
            "indiaChecklistScientificName": "Sitta himalayensis",
            "indiaChecklistCommonName": "White-tailed Nuthatch",
            "uniqueValue": 1034,
            "percentage": "2%",
            "samplingEventIdentifier": "S110456470",
            "observationDate": "14-05-2022"
        },
        {
            "region": "Indian Subcontinent",
            "indiaChecklistScientificName": "Acridotheres ginginianus",
            "indiaChecklistCommonName": "Bank Myna",
            "uniqueValue": 1066,
            "percentage": "5%",
            "samplingEventIdentifier": "S111139072",
            "observationDate": "23-05-2022"
        },
        {
            "region": "Indian Subcontinent",
            "indiaChecklistScientificName": "Turdus unicolor",
            "indiaChecklistCommonName": "Tickell's Thrush",
            "uniqueValue": 1091,
            "percentage": "1%",
            "samplingEventIdentifier": "S108256085",
            "observationDate": "28-04-2022"
        },
        {
            "region": "Himalayas",
            "indiaChecklistScientificName": "Turdus albocinctus",
            "indiaChecklistCommonName": "White-collared Blackbird",
            "uniqueValue": 1098,
            "percentage": "0%",
            "samplingEventIdentifier": "S104883641",
            "observationDate": "15-03-2022"
        },
        {
            "region": "Indian Subcontinent",
            "indiaChecklistScientificName": "Copsychus fulicatus",
            "indiaChecklistCommonName": "Indian Robin",
            "uniqueValue": 1110,
            "percentage": "6%",
            "samplingEventIdentifier": "S111226096",
            "observationDate": "25-05-2022"
        },
        {
            "region": "Indian Subcontinent",
            "indiaChecklistScientificName": "Oenanthe fusca",
            "indiaChecklistCommonName": "Brown Rock Chat",
            "uniqueValue": 1203,
            "percentage": "2%",
            "samplingEventIdentifier": "S110721696",
            "observationDate": "20-05-2022"
        },
        {
            "region": "Indian Subcontinent",
            "indiaChecklistScientificName": "Dicaeum erythrorhynchos",
            "indiaChecklistCommonName": "Pale-billed Flowerpecker",
            "uniqueValue": 1213,
            "percentage": "0%",
            "samplingEventIdentifier": "S94204850",
            "observationDate": "04-09-2021"
        },
        {
            "region": "Indian Subcontinent",
            "indiaChecklistScientificName": "Ploceus benghalensis",
            "indiaChecklistCommonName": "Black-breasted Weaver",
            "uniqueValue": 1242,
            "percentage": "0%",
            "samplingEventIdentifier": "S41174315",
            "observationDate": "18-12-2017"
        },
        {
            "region": "Indus Plains",
            "indiaChecklistScientificName": "Passer pyrrhonotus",
            "indiaChecklistCommonName": "Sind Sparrow",
            "uniqueValue": 1260,
            "percentage": "0%",
            "samplingEventIdentifier": "S64686702",
            "observationDate": "16-02-2020"
        },
        {
            "region": "Indian Subcontinent",
            "indiaChecklistScientificName": "Motacilla maderaspatensis",
            "indiaChecklistCommonName": "White-browed Wagtail",
            "uniqueValue": 1275,
            "percentage": "7%",
            "samplingEventIdentifier": "S104781936",
            "observationDate": "13-03-2022"
        },
        {
            "region": "Himalayas",
            "indiaChecklistScientificName": "Carpodacus rodochroa",
            "indiaChecklistCommonName": "Pink-browed Rosefinch",
            "uniqueValue": 1304,
            "percentage": "5%",
            "samplingEventIdentifier": "S107365339",
            "observationDate": "17-03-2022"
        },
        {
            "region": "Western Himalayas",
            "indiaChecklistScientificName": "Pyrrhula aurantiaca",
            "indiaChecklistCommonName": "Orange Bullfinch",
            "uniqueValue": 1317,
            "percentage": "0%",
            "samplingEventIdentifier": "S36255966",
            "observationDate": "25-04-2017"
        },
        {
            "region": "Himalayas",
            "indiaChecklistScientificName": "Pyrrhula erythrocephala",
            "indiaChecklistCommonName": "Red-headed Bullfinch",
            "uniqueValue": 1318,
            "percentage": "0%",
            "samplingEventIdentifier": "S124811203",
            "observationDate": "17-01-2021"
        },
        {
            "region": "Himalayas",
            "indiaChecklistScientificName": "Chloris spinoides",
            "indiaChecklistCommonName": "Yellow-breasted Greenfinch",
            "uniqueValue": 1330,
            "percentage": "2%",
            "samplingEventIdentifier": "S107259349",
            "observationDate": "17-04-2022"
        }
    ])
  })
})


  describe('(State,County and Date) Most Common Species ID-T5018', () => {
  it('T5018/pertcentage_most_common_species', async () => {

    const response = await request(app)
      .get('/api/users/pertcentage_most_common_species')
      .query({
        state: 'Himachal Pradesh',
        county: 'Kangra',
        start:'01-01-2000',
        end: '05-31-2022'
      })
      .expect(200);
        //  console.log(response.body)
    expect(response.body).toEqual([
        {
            "indiaChecklistScientificName": "Pycnonotus leucogenys",
            "indiaChecklistCommonName": "Himalayan Bulbul",
            "count": 1253,
            "percentage": 50
        },
        {
            "indiaChecklistScientificName": "Milvus migrans",
            "indiaChecklistCommonName": "Black Kite",
            "count": 1144,
            "percentage": 46
        },
        {
            "indiaChecklistScientificName": "Corvus macrorhynchos",
            "indiaChecklistCommonName": "Large-billed Crow",
            "count": 1013,
            "percentage": 41
        },
        {
            "indiaChecklistScientificName": "Parus cinereus",
            "indiaChecklistCommonName": "Cinereous Tit",
            "count": 829,
            "percentage": 33
        },
        {
            "indiaChecklistScientificName": "Myophonus caeruleus",
            "indiaChecklistCommonName": "Blue Whistling Thrush",
            "count": 798,
            "percentage": 32
        },
        {
            "indiaChecklistScientificName": "Acridotheres tristis",
            "indiaChecklistCommonName": "Common Myna",
            "count": 734,
            "percentage": 29
        },
        {
            "indiaChecklistScientificName": "Phylloscopus xanthoschistos",
            "indiaChecklistCommonName": "Grey-hooded Warbler",
            "count": 702,
            "percentage": 28
        },
        {
            "indiaChecklistScientificName": "Zosterops palpebrosus",
            "indiaChecklistCommonName": "Indian White-eye",
            "count": 682,
            "percentage": 27
        },
        {
            "indiaChecklistScientificName": "Psilopogon virens",
            "indiaChecklistCommonName": "Great Barbet",
            "count": 647,
            "percentage": 26
        },
        {
            "indiaChecklistScientificName": "Passer domesticus",
            "indiaChecklistCommonName": "House Sparrow",
            "count": 622,
            "percentage": 25
        }
    ])
  })
})



  describe('(State,County and Date) Seasonal Chart ID-T5019', () => {
  it('T5019/seasonal_chart_for_species', async () => {

    const response = await request(app)
      .get('/api/users/seasonal_chart_for_species')
      .query({
        state: 'Himachal Pradesh',
        county: 'Kangra',
        start:'01-01-2000',
        end: '05-31-2022'
      })
      .expect(200);
    expect(response.body).toEqual([
        {
            "indiaChecklistScientificName": "Pycnonotus leucogenys",
            "indiaChecklistCommonName": "Himalayan Bulbul",
            "monthlyData": [
                {
                    "month": "Jan",
                    "count": 84,
                    "percentage": "32.3%"
                },
                {
                    "month": "Feb",
                    "count": 197,
                    "percentage": "42.6%"
                },
                {
                    "month": "Mar",
                    "count": 153,
                    "percentage": "51.7%"
                },
                {
                    "month": "Apr",
                    "count": 107,
                    "percentage": "54.3%"
                },
                {
                    "month": "May",
                    "count": 118,
                    "percentage": "65.9%"
                },
                {
                    "month": "Jun",
                    "count": 78,
                    "percentage": "67.8%"
                },
                {
                    "month": "Jul",
                    "count": 41,
                    "percentage": "56.9%"
                },
                {
                    "month": "Aug",
                    "count": 35,
                    "percentage": "49.3%"
                },
                {
                    "month": "Sep",
                    "count": 37,
                    "percentage": "48.1%"
                },
                {
                    "month": "Oct",
                    "count": 154,
                    "percentage": "54.4%"
                },
                {
                    "month": "Nov",
                    "count": 115,
                    "percentage": "57.2%"
                },
                {
                    "month": "Dec",
                    "count": 134,
                    "percentage": "46.5%"
                }
            ]
        },
        {
            "indiaChecklistScientificName": "Anser indicus",
            "indiaChecklistCommonName": "Bar-headed Goose",
            "monthlyData": [
                {
                    "month": "Jan",
                    "count": 109,
                    "percentage": "41.9%"
                },
                {
                    "month": "Feb",
                    "count": 165,
                    "percentage": "35.7%"
                },
                {
                    "month": "Mar",
                    "count": 43,
                    "percentage": "14.5%"
                },
                {
                    "month": "Apr",
                    "count": 14,
                    "percentage": "7.1%"
                },
                {
                    "month": "May",
                    "count": 2,
                    "percentage": "1.1%"
                },
                {
                    "month": "Jun",
                    "count": 1,
                    "percentage": "0.9%"
                },
                {
                    "month": "Jul",
                    "count": 2,
                    "percentage": "2.8%"
                },
                {
                    "month": "Aug",
                    "count": 5,
                    "percentage": "7.0%"
                },
                {
                    "month": "Sep",
                    "count": 7,
                    "percentage": "9.1%"
                },
                {
                    "month": "Oct",
                    "count": 6,
                    "percentage": "2.1%"
                },
                {
                    "month": "Nov",
                    "count": 35,
                    "percentage": "17.4%"
                },
                {
                    "month": "Dec",
                    "count": 76,
                    "percentage": "26.4%"
                }
            ]
        },
        {
            "indiaChecklistScientificName": "Anas acuta",
            "indiaChecklistCommonName": "Northern Pintail",
            "monthlyData": [
                {
                    "month": "Jan",
                    "count": 97,
                    "percentage": "37.3%"
                },
                {
                    "month": "Feb",
                    "count": 130,
                    "percentage": "28.1%"
                },
                {
                    "month": "Mar",
                    "count": 26,
                    "percentage": "8.8%"
                },
                {
                    "month": "Apr",
                    "count": 5,
                    "percentage": "2.5%"
                },
                {
                    "month": "May",
                    "count": 2,
                    "percentage": "1.1%"
                },
                {
                    "month": "Jun",
                    "count": 0,
                    "percentage": "0.0%"
                },
                {
                    "month": "Jul",
                    "count": 0,
                    "percentage": "0.0%"
                },
                {
                    "month": "Aug",
                    "count": 1,
                    "percentage": "1.4%"
                },
                {
                    "month": "Sep",
                    "count": 3,
                    "percentage": "3.9%"
                },
                {
                    "month": "Oct",
                    "count": 28,
                    "percentage": "9.9%"
                },
                {
                    "month": "Nov",
                    "count": 35,
                    "percentage": "17.4%"
                },
                {
                    "month": "Dec",
                    "count": 73,
                    "percentage": "25.3%"
                }
            ]
        },
        {
            "indiaChecklistScientificName": "Tadorna ferruginea",
            "indiaChecklistCommonName": "Ruddy Shelduck",
            "monthlyData": [
                {
                    "month": "Jan",
                    "count": 95,
                    "percentage": "36.5%"
                },
                {
                    "month": "Feb",
                    "count": 121,
                    "percentage": "26.2%"
                },
                {
                    "month": "Mar",
                    "count": 36,
                    "percentage": "12.2%"
                },
                {
                    "month": "Apr",
                    "count": 18,
                    "percentage": "9.1%"
                },
                {
                    "month": "May",
                    "count": 4,
                    "percentage": "2.2%"
                },
                {
                    "month": "Jun",
                    "count": 1,
                    "percentage": "0.9%"
                },
                {
                    "month": "Jul",
                    "count": 0,
                    "percentage": "0.0%"
                },
                {
                    "month": "Aug",
                    "count": 1,
                    "percentage": "1.4%"
                },
                {
                    "month": "Sep",
                    "count": 0,
                    "percentage": "0.0%"
                },
                {
                    "month": "Oct",
                    "count": 13,
                    "percentage": "4.6%"
                },
                {
                    "month": "Nov",
                    "count": 33,
                    "percentage": "16.4%"
                },
                {
                    "month": "Dec",
                    "count": 75,
                    "percentage": "26.0%"
                }
            ]
        },
        {
            "indiaChecklistScientificName": "Anas crecca",
            "indiaChecklistCommonName": "Common Teal",
            "monthlyData": [
                {
                    "month": "Jan",
                    "count": 87,
                    "percentage": "33.5%"
                },
                {
                    "month": "Feb",
                    "count": 111,
                    "percentage": "24.0%"
                },
                {
                    "month": "Mar",
                    "count": 23,
                    "percentage": "7.8%"
                },
                {
                    "month": "Apr",
                    "count": 8,
                    "percentage": "4.1%"
                },
                {
                    "month": "May",
                    "count": 1,
                    "percentage": "0.6%"
                },
                {
                    "month": "Jun",
                    "count": 0,
                    "percentage": "0.0%"
                },
                {
                    "month": "Jul",
                    "count": 0,
                    "percentage": "0.0%"
                },
                {
                    "month": "Aug",
                    "count": 0,
                    "percentage": "0.0%"
                },
                {
                    "month": "Sep",
                    "count": 8,
                    "percentage": "10.4%"
                },
                {
                    "month": "Oct",
                    "count": 16,
                    "percentage": "5.7%"
                },
                {
                    "month": "Nov",
                    "count": 23,
                    "percentage": "11.4%"
                },
                {
                    "month": "Dec",
                    "count": 66,
                    "percentage": "22.9%"
                }
            ]
        },
        {
            "indiaChecklistScientificName": "Motacilla alba",
            "indiaChecklistCommonName": "White Wagtail",
            "monthlyData": [
                {
                    "month": "Jan",
                    "count": 73,
                    "percentage": "28.1%"
                },
                {
                    "month": "Feb",
                    "count": 84,
                    "percentage": "18.2%"
                },
                {
                    "month": "Mar",
                    "count": 38,
                    "percentage": "12.8%"
                },
                {
                    "month": "Apr",
                    "count": 18,
                    "percentage": "9.1%"
                },
                {
                    "month": "May",
                    "count": 4,
                    "percentage": "2.2%"
                },
                {
                    "month": "Jun",
                    "count": 2,
                    "percentage": "1.7%"
                },
                {
                    "month": "Jul",
                    "count": 0,
                    "percentage": "0.0%"
                },
                {
                    "month": "Aug",
                    "count": 1,
                    "percentage": "1.4%"
                },
                {
                    "month": "Sep",
                    "count": 9,
                    "percentage": "11.7%"
                },
                {
                    "month": "Oct",
                    "count": 24,
                    "percentage": "8.5%"
                },
                {
                    "month": "Nov",
                    "count": 26,
                    "percentage": "12.9%"
                },
                {
                    "month": "Dec",
                    "count": 47,
                    "percentage": "16.3%"
                }
            ]
        },
        {
            "indiaChecklistScientificName": "Spatula clypeata",
            "indiaChecklistCommonName": "Northern Shoveler",
            "monthlyData": [
                {
                    "month": "Jan",
                    "count": 65,
                    "percentage": "25.0%"
                },
                {
                    "month": "Feb",
                    "count": 94,
                    "percentage": "20.3%"
                },
                {
                    "month": "Mar",
                    "count": 25,
                    "percentage": "8.4%"
                },
                {
                    "month": "Apr",
                    "count": 15,
                    "percentage": "7.6%"
                },
                {
                    "month": "May",
                    "count": 2,
                    "percentage": "1.1%"
                },
                {
                    "month": "Jun",
                    "count": 0,
                    "percentage": "0.0%"
                },
                {
                    "month": "Jul",
                    "count": 0,
                    "percentage": "0.0%"
                },
                {
                    "month": "Aug",
                    "count": 2,
                    "percentage": "2.8%"
                },
                {
                    "month": "Sep",
                    "count": 8,
                    "percentage": "10.4%"
                },
                {
                    "month": "Oct",
                    "count": 21,
                    "percentage": "7.4%"
                },
                {
                    "month": "Nov",
                    "count": 26,
                    "percentage": "12.9%"
                },
                {
                    "month": "Dec",
                    "count": 62,
                    "percentage": "21.5%"
                }
            ]
        },
        {
            "indiaChecklistScientificName": "Chroicocephalus brunnicephalus",
            "indiaChecklistCommonName": "Brown-headed Gull",
            "monthlyData": [
                {
                    "month": "Jan",
                    "count": 87,
                    "percentage": "33.5%"
                },
                {
                    "month": "Feb",
                    "count": 78,
                    "percentage": "16.9%"
                },
                {
                    "month": "Mar",
                    "count": 18,
                    "percentage": "6.1%"
                },
                {
                    "month": "Apr",
                    "count": 14,
                    "percentage": "7.1%"
                },
                {
                    "month": "May",
                    "count": 3,
                    "percentage": "1.7%"
                },
                {
                    "month": "Jun",
                    "count": 0,
                    "percentage": "0.0%"
                },
                {
                    "month": "Jul",
                    "count": 0,
                    "percentage": "0.0%"
                },
                {
                    "month": "Aug",
                    "count": 7,
                    "percentage": "9.9%"
                },
                {
                    "month": "Sep",
                    "count": 4,
                    "percentage": "5.2%"
                },
                {
                    "month": "Oct",
                    "count": 21,
                    "percentage": "7.4%"
                },
                {
                    "month": "Nov",
                    "count": 23,
                    "percentage": "11.4%"
                },
                {
                    "month": "Dec",
                    "count": 52,
                    "percentage": "18.1%"
                }
            ]
        },
        {
            "indiaChecklistScientificName": "Hirundo rustica",
            "indiaChecklistCommonName": "Barn Swallow",
            "monthlyData": [
                {
                    "month": "Jan",
                    "count": 43,
                    "percentage": "16.5%"
                },
                {
                    "month": "Feb",
                    "count": 45,
                    "percentage": "9.7%"
                },
                {
                    "month": "Mar",
                    "count": 37,
                    "percentage": "12.5%"
                },
                {
                    "month": "Apr",
                    "count": 26,
                    "percentage": "13.2%"
                },
                {
                    "month": "May",
                    "count": 18,
                    "percentage": "10.1%"
                },
                {
                    "month": "Jun",
                    "count": 17,
                    "percentage": "14.8%"
                },
                {
                    "month": "Jul",
                    "count": 8,
                    "percentage": "11.1%"
                },
                {
                    "month": "Aug",
                    "count": 2,
                    "percentage": "2.8%"
                },
                {
                    "month": "Sep",
                    "count": 4,
                    "percentage": "5.2%"
                },
                {
                    "month": "Oct",
                    "count": 20,
                    "percentage": "7.1%"
                },
                {
                    "month": "Nov",
                    "count": 29,
                    "percentage": "14.4%"
                },
                {
                    "month": "Dec",
                    "count": 55,
                    "percentage": "19.1%"
                }
            ]
        },
        {
            "indiaChecklistScientificName": "Chroicocephalus ridibundus",
            "indiaChecklistCommonName": "Black-headed Gull",
            "monthlyData": [
                {
                    "month": "Jan",
                    "count": 87,
                    "percentage": "33.5%"
                },
                {
                    "month": "Feb",
                    "count": 82,
                    "percentage": "17.7%"
                },
                {
                    "month": "Mar",
                    "count": 18,
                    "percentage": "6.1%"
                },
                {
                    "month": "Apr",
                    "count": 8,
                    "percentage": "4.1%"
                },
                {
                    "month": "May",
                    "count": 2,
                    "percentage": "1.1%"
                },
                {
                    "month": "Jun",
                    "count": 0,
                    "percentage": "0.0%"
                },
                {
                    "month": "Jul",
                    "count": 0,
                    "percentage": "0.0%"
                },
                {
                    "month": "Aug",
                    "count": 2,
                    "percentage": "2.8%"
                },
                {
                    "month": "Sep",
                    "count": 2,
                    "percentage": "2.6%"
                },
                {
                    "month": "Oct",
                    "count": 24,
                    "percentage": "8.5%"
                },
                {
                    "month": "Nov",
                    "count": 22,
                    "percentage": "10.9%"
                },
                {
                    "month": "Dec",
                    "count": 49,
                    "percentage": "17.0%"
                }
            ]
        }
    ])
  })
})

  describe('(State,County and Date) Hotspots ID-T5020', () => {


  it('T5020/hotspot_area', async () => {

    const response = await request(app)
      .get('/api/users/hotspot_area')
      .query({
        state: 'Himachal Pradesh',
        county: 'Kangra',
        start:'01-01-2000',
        end: '05-31-2022'
      })
      .expect(200);
    expect(response.body).toEqual([
        {
            "locality": "Pong Dam--Nagrota Surian",
            "localityId": "L3816878",
            "latitude": 32.044096,
            "longitude": 76.0604954,
            "count": "290"
        },
        {
            "locality": "Maharana Pratap Sagar (Pong Dam)",
            "localityId": "L2663277",
            "latitude": 31.9300203,
            "longitude": 76.1201477,
            "count": "208"
        },
        {
            "locality": "Bir Forest",
            "localityId": "L3163318",
            "latitude": 32.0526806,
            "longitude": 76.7243528,
            "count": "200"
        },
        {
            "locality": "McLeod Ganj",
            "localityId": "L1091154",
            "latitude": 32.2416989,
            "longitude": 76.3204765,
            "count": "194"
        },
        {
            "locality": "Dharamshala City",
            "localityId": "L4663015",
            "latitude": 32.2179689,
            "longitude": 76.3226347,
            "count": "155"
        }
    ])
  })
})


  describe('(State,County and Date) Complete List of Species ID-T5021', () => {

  it('T5021/complete_List_Of_Species', async () => {

    const response = await request(app)
      .get('/api/users/complete_List_Of_Species')
      .query({
        state: 'Himachal Pradesh',
        county: 'Kangra',
        start:'01-01-2000',
        end: '05-31-2022'
      })
      .expect(200);
    expect(response.body).toEqual([
        {
            "indiaChecklistScientificName": "Dendrocygna javanica",
            "migratoryStatusWithinIndia": "Resident",
            "indiaChecklistCommonName": "Lesser Whistling Duck",
            "uniqueValue": 2,
            "endemicRegion": "None",
            "soibConcernStatus": "Low",
            "wpaSchedule": "Schedule-II",
            "iucnCategory": "Least Concern"
        },
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
            "indiaChecklistScientificName": "Anser albifrons",
            "migratoryStatusWithinIndia": "Winter Migrant",
            "indiaChecklistCommonName": "Greater White-fronted Goose",
            "uniqueValue": 5,
            "endemicRegion": "None",
            "soibConcernStatus": "NA",
            "wpaSchedule": "Schedule-II",
            "iucnCategory": "Least Concern"
        },
        {
            "indiaChecklistScientificName": "Anser erythropus",
            "migratoryStatusWithinIndia": "Winter Migrant",
            "indiaChecklistCommonName": "Lesser White-fronted Goose",
            "uniqueValue": 6,
            "endemicRegion": "None",
            "soibConcernStatus": "NA",
            "wpaSchedule": "Schedule-II",
            "iucnCategory": "Vulnerable"
        },
        {
            "indiaChecklistScientificName": "Branta ruficollis",
            "migratoryStatusWithinIndia": "Winter Migrant",
            "indiaChecklistCommonName": "Red-breasted Goose",
            "uniqueValue": 9,
            "endemicRegion": "None",
            "soibConcernStatus": "NA",
            "wpaSchedule": "Schedule-II",
            "iucnCategory": "Vulnerable"
        },
        {
            "indiaChecklistScientificName": "Cygnus cygnus",
            "migratoryStatusWithinIndia": "Winter Migrant",
            "indiaChecklistCommonName": "Whooper Swan",
            "uniqueValue": 12,
            "endemicRegion": "None",
            "soibConcernStatus": "NA",
            "wpaSchedule": "Schedule-II",
            "iucnCategory": "Least Concern"
        },
        {
            "indiaChecklistScientificName": "Sarkidiornis melanotos",
            "migratoryStatusWithinIndia": "Resident",
            "indiaChecklistCommonName": "Knob-billed Duck",
            "uniqueValue": 13,
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
            "indiaChecklistScientificName": "Tadorna tadorna",
            "migratoryStatusWithinIndia": "Winter Migrant",
            "indiaChecklistCommonName": "Common Shelduck",
            "uniqueValue": 15,
            "endemicRegion": "None",
            "soibConcernStatus": "NA",
            "wpaSchedule": "Schedule-II",
            "iucnCategory": "Least Concern"
        },
        {
            "indiaChecklistScientificName": "Nettapus coromandelianus",
            "migratoryStatusWithinIndia": "Resident",
            "indiaChecklistCommonName": "Cotton Pygmy Goose",
            "uniqueValue": 16,
            "endemicRegion": "None",
            "soibConcernStatus": "Moderate",
            "wpaSchedule": "Schedule-I",
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
            "indiaChecklistScientificName": "Anas poecilorhyncha",
            "migratoryStatusWithinIndia": "Resident",
            "indiaChecklistCommonName": "Indian Spot-billed Duck",
            "uniqueValue": 24,
            "endemicRegion": "None",
            "soibConcernStatus": "Low",
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
            "indiaChecklistScientificName": "Aythya ferina",
            "migratoryStatusWithinIndia": "Winter Migrant",
            "indiaChecklistCommonName": "Common Pochard",
            "uniqueValue": 34,
            "endemicRegion": "None",
            "soibConcernStatus": "High",
            "wpaSchedule": "Schedule-I",
            "iucnCategory": "Vulnerable"
        },
        {
            "indiaChecklistScientificName": "Aythya nyroca",
            "migratoryStatusWithinIndia": "Winter Migrant",
            "indiaChecklistCommonName": "Ferruginous Duck",
            "uniqueValue": 35,
            "endemicRegion": "None",
            "soibConcernStatus": "Moderate",
            "wpaSchedule": "Schedule-II",
            "iucnCategory": "Near Threatened"
        },
        {
            "indiaChecklistScientificName": "Aythya fuligula",
            "migratoryStatusWithinIndia": "Winter Migrant",
            "indiaChecklistCommonName": "Tufted Duck",
            "uniqueValue": 37,
            "endemicRegion": "None",
            "soibConcernStatus": "High",
            "wpaSchedule": "Schedule-II",
            "iucnCategory": "Least Concern"
        },
        {
            "indiaChecklistScientificName": "Aythya marila",
            "migratoryStatusWithinIndia": "Winter Migrant",
            "indiaChecklistCommonName": "Greater Scaup",
            "uniqueValue": 38,
            "endemicRegion": "None",
            "soibConcernStatus": "NA",
            "wpaSchedule": "Schedule-II",
            "iucnCategory": "Least Concern"
        },
        {
            "indiaChecklistScientificName": "Mergus merganser",
            "migratoryStatusWithinIndia": "Winter Migrant & Localized Summer Migrant",
            "indiaChecklistCommonName": "Common Merganser",
            "uniqueValue": 42,
            "endemicRegion": "None",
            "soibConcernStatus": "High",
            "wpaSchedule": "Schedule-II",
            "iucnCategory": "Least Concern"
        },
        {
            "indiaChecklistScientificName": "Arborophila torqueola",
            "migratoryStatusWithinIndia": "Resident",
            "indiaChecklistCommonName": "Hill Partridge",
            "uniqueValue": 46,
            "endemicRegion": "Himalayas",
            "soibConcernStatus": "Low",
            "wpaSchedule": "Schedule-II",
            "iucnCategory": "Least Concern"
        },
        {
            "indiaChecklistScientificName": "Lerwa lerwa",
            "migratoryStatusWithinIndia": "Resident & Altitudinal Migrant",
            "indiaChecklistCommonName": "Snow Partridge",
            "uniqueValue": 50,
            "endemicRegion": "None",
            "soibConcernStatus": "NA",
            "wpaSchedule": "Schedule-II",
            "iucnCategory": "Least Concern"
        },
        {
            "indiaChecklistScientificName": "Lophophorus impejanus",
            "migratoryStatusWithinIndia": "Resident & Altitudinal Migrant",
            "indiaChecklistCommonName": "Himalayan Monal",
            "uniqueValue": 56,
            "endemicRegion": "Himalayas",
            "soibConcernStatus": "Low",
            "wpaSchedule": "Schedule-I",
            "iucnCategory": "Least Concern"
        },
        {
            "indiaChecklistScientificName": "Pucrasia macrolopha",
            "migratoryStatusWithinIndia": "Resident",
            "indiaChecklistCommonName": "Koklass Pheasant",
            "uniqueValue": 58,
            "endemicRegion": "None",
            "soibConcernStatus": "Low",
            "wpaSchedule": "Schedule-II",
            "iucnCategory": "Least Concern"
        },
        {
            "indiaChecklistScientificName": "Catreus wallichii",
            "migratoryStatusWithinIndia": "Resident",
            "indiaChecklistCommonName": "Cheer Pheasant",
            "uniqueValue": 61,
            "endemicRegion": "Western Himalayas",
            "soibConcernStatus": "High",
            "wpaSchedule": "Schedule-I",
            "iucnCategory": "Vulnerable"
        },
        {
            "indiaChecklistScientificName": "Lophura leucomelanos",
            "migratoryStatusWithinIndia": "Resident",
            "indiaChecklistCommonName": "Kalij Pheasant",
            "uniqueValue": 62,
            "endemicRegion": "None",
            "soibConcernStatus": "Low",
            "wpaSchedule": "Schedule-I",
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
            "indiaChecklistScientificName": "Tetraogallus himalayensis",
            "migratoryStatusWithinIndia": "Resident & Altitudinal Migrant",
            "indiaChecklistCommonName": "Himalayan Snowcock",
            "uniqueValue": 77,
            "endemicRegion": "Himalayas",
            "soibConcernStatus": "Moderate",
            "wpaSchedule": "Schedule-II",
            "iucnCategory": "Least Concern"
        },
        {
            "indiaChecklistScientificName": "Coturnix coturnix",
            "migratoryStatusWithinIndia": "Winter Migrant & Localized Summer Migrant",
            "indiaChecklistCommonName": "Common Quail",
            "uniqueValue": 79,
            "endemicRegion": "None",
            "soibConcernStatus": "NA",
            "wpaSchedule": "Schedule-II",
            "iucnCategory": "Least Concern"
        },
        {
            "indiaChecklistScientificName": "Alectoris chukar",
            "migratoryStatusWithinIndia": "Resident & Altitudinal Migrant",
            "indiaChecklistCommonName": "Chukar Partridge",
            "uniqueValue": 82,
            "endemicRegion": "None",
            "soibConcernStatus": "Low",
            "wpaSchedule": "Schedule-II",
            "iucnCategory": "Least Concern"
        },
        {
            "indiaChecklistScientificName": "Perdicula asiatica",
            "migratoryStatusWithinIndia": "Resident",
            "indiaChecklistCommonName": "Jungle Bush Quail",
            "uniqueValue": 83,
            "endemicRegion": "Indian Subcontinent",
            "soibConcernStatus": "Low",
            "wpaSchedule": "Schedule-II",
            "iucnCategory": "Least Concern"
        },
        {
            "indiaChecklistScientificName": "Phoenicopterus roseus",
            "migratoryStatusWithinIndia": "Within-India Migrant",
            "indiaChecklistCommonName": "Greater Flamingo",
            "uniqueValue": 88,
            "endemicRegion": "None",
            "soibConcernStatus": "High",
            "wpaSchedule": "Schedule-II",
            "iucnCategory": "Least Concern"
        },
        {
            "indiaChecklistScientificName": "Tachybaptus ruficollis",
            "migratoryStatusWithinIndia": "Resident",
            "indiaChecklistCommonName": "Little Grebe",
            "uniqueValue": 90,
            "endemicRegion": "None",
            "soibConcernStatus": "Low",
            "wpaSchedule": "Schedule-II",
            "iucnCategory": "Least Concern"
        },
        {
            "indiaChecklistScientificName": "Podiceps grisegena",
            "migratoryStatusWithinIndia": "Uncertain",
            "indiaChecklistCommonName": "Red-necked Grebe",
            "uniqueValue": 92,
            "endemicRegion": "None",
            "soibConcernStatus": "NA",
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
            "indiaChecklistScientificName": "Podiceps nigricollis",
            "migratoryStatusWithinIndia": "Winter Migrant & Localized Summer Migrant",
            "indiaChecklistCommonName": "Black-necked Grebe",
            "uniqueValue": 94,
            "endemicRegion": "None",
            "soibConcernStatus": "NA",
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
            "indiaChecklistScientificName": "Columba leuconota",
            "migratoryStatusWithinIndia": "Resident & Altitudinal Migrant",
            "indiaChecklistCommonName": "Snow Pigeon",
            "uniqueValue": 97,
            "endemicRegion": "None",
            "soibConcernStatus": "Moderate",
            "wpaSchedule": "Schedule-II",
            "iucnCategory": "Least Concern"
        },
        {
            "indiaChecklistScientificName": "Columba palumbus",
            "migratoryStatusWithinIndia": "Local Migrant & Winter Migrant",
            "indiaChecklistCommonName": "Common Wood Pigeon",
            "uniqueValue": 99,
            "endemicRegion": "None",
            "soibConcernStatus": "Moderate",
            "wpaSchedule": "Schedule-II",
            "iucnCategory": "Least Concern"
        },
        {
            "indiaChecklistScientificName": "Columba hodgsonii",
            "migratoryStatusWithinIndia": "Resident",
            "indiaChecklistCommonName": "Speckled Wood Pigeon",
            "uniqueValue": 100,
            "endemicRegion": "None",
            "soibConcernStatus": "Moderate",
            "wpaSchedule": "Schedule-II",
            "iucnCategory": "Least Concern"
        },
        {
            "indiaChecklistScientificName": "Streptopelia orientalis",
            "migratoryStatusWithinIndia": "Within-India Migrant",
            "indiaChecklistCommonName": "Oriental Turtle Dove",
            "uniqueValue": 106,
            "endemicRegion": "None",
            "soibConcernStatus": "Low",
            "wpaSchedule": "Schedule-II",
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
            "indiaChecklistScientificName": "Streptopelia tranquebarica",
            "migratoryStatusWithinIndia": "Resident & Local Migrant",
            "indiaChecklistCommonName": "Red Collared Dove",
            "uniqueValue": 108,
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
            "indiaChecklistScientificName": "Chalcophaps indica",
            "migratoryStatusWithinIndia": "Resident",
            "indiaChecklistCommonName": "Asian Emerald Dove",
            "uniqueValue": 114,
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
            "indiaChecklistScientificName": "Treron sphenurus",
            "migratoryStatusWithinIndia": "Resident",
            "indiaChecklistCommonName": "Wedge-tailed Green Pigeon",
            "uniqueValue": 123,
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
            "indiaChecklistScientificName": "Taccocua leschenaultii",
            "migratoryStatusWithinIndia": "Resident",
            "indiaChecklistCommonName": "Sirkeer Malkoha",
            "uniqueValue": 144,
            "endemicRegion": "Indian Subcontinent",
            "soibConcernStatus": "High",
            "wpaSchedule": "Schedule-II",
            "iucnCategory": "Least Concern"
        },
        {
            "indiaChecklistScientificName": "Clamator jacobinus",
            "migratoryStatusWithinIndia": "Resident & Summer Migrant",
            "indiaChecklistCommonName": "Pied Cuckoo",
            "uniqueValue": 148,
            "endemicRegion": "None",
            "soibConcernStatus": "Low",
            "wpaSchedule": "Schedule-II",
            "iucnCategory": "Least Concern"
        },
        {
            "indiaChecklistScientificName": "Eudynamys scolopaceus",
            "migratoryStatusWithinIndia": "Resident",
            "indiaChecklistCommonName": "Asian Koel",
            "uniqueValue": 149,
            "endemicRegion": "None",
            "soibConcernStatus": "Low",
            "wpaSchedule": "Schedule-II",
            "iucnCategory": "Least Concern"
        },
        {
            "indiaChecklistScientificName": "Cacomantis sonneratii",
            "migratoryStatusWithinIndia": "Resident & Local Migrant",
            "indiaChecklistCommonName": "Banded Bay Cuckoo",
            "uniqueValue": 153,
            "endemicRegion": "None",
            "soibConcernStatus": "Moderate",
            "wpaSchedule": "Schedule-II",
            "iucnCategory": "Least Concern"
        },
        {
            "indiaChecklistScientificName": "Cacomantis passerinus",
            "migratoryStatusWithinIndia": "Resident & Local Migrant",
            "indiaChecklistCommonName": "Grey-bellied Cuckoo",
            "uniqueValue": 155,
            "endemicRegion": "Indian Subcontinent",
            "soibConcernStatus": "Low",
            "wpaSchedule": "Schedule-II",
            "iucnCategory": "Least Concern"
        },
        {
            "indiaChecklistScientificName": "Surniculus lugubris",
            "migratoryStatusWithinIndia": "Summer Migrant",
            "indiaChecklistCommonName": "Square-tailed Drongo Cuckoo",
            "uniqueValue": 157,
            "endemicRegion": "None",
            "soibConcernStatus": "Low",
            "wpaSchedule": "Schedule-II",
            "iucnCategory": "Least Concern"
        },
        {
            "indiaChecklistScientificName": "Hierococcyx sparverioides",
            "migratoryStatusWithinIndia": "Resident & Within-India Migrant",
            "indiaChecklistCommonName": "Large Hawk Cuckoo",
            "uniqueValue": 158,
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
            "indiaChecklistScientificName": "Cuculus poliocephalus",
            "migratoryStatusWithinIndia": "Summer Migrant & Localized Winter Migrant",
            "indiaChecklistCommonName": "Lesser Cuckoo",
            "uniqueValue": 161,
            "endemicRegion": "None",
            "soibConcernStatus": "Low",
            "wpaSchedule": "Schedule-II",
            "iucnCategory": "Least Concern"
        },
        {
            "indiaChecklistScientificName": "Cuculus micropterus",
            "migratoryStatusWithinIndia": "Summer Migrant & Localized Winter Migrant",
            "indiaChecklistCommonName": "Indian Cuckoo",
            "uniqueValue": 162,
            "endemicRegion": "None",
            "soibConcernStatus": "Low",
            "wpaSchedule": "Schedule-II",
            "iucnCategory": "Least Concern"
        },
        {
            "indiaChecklistScientificName": "Cuculus saturatus",
            "migratoryStatusWithinIndia": "Summer Migrant",
            "indiaChecklistCommonName": "Himalayan Cuckoo",
            "uniqueValue": 163,
            "endemicRegion": "None",
            "soibConcernStatus": "Low",
            "wpaSchedule": "Schedule-II",
            "iucnCategory": "Least Concern"
        },
        {
            "indiaChecklistScientificName": "Cuculus canorus",
            "migratoryStatusWithinIndia": "Summer Migrant & Passage Migrant",
            "indiaChecklistCommonName": "Common Cuckoo",
            "uniqueValue": 164,
            "endemicRegion": "None",
            "soibConcernStatus": "Low",
            "wpaSchedule": "Schedule-II",
            "iucnCategory": "Least Concern"
        },
        {
            "indiaChecklistScientificName": "Caprimulgus jotaka",
            "migratoryStatusWithinIndia": "Resident & Summer Migrant",
            "indiaChecklistCommonName": "Grey Nightjar",
            "uniqueValue": 169,
            "endemicRegion": "None",
            "soibConcernStatus": "NA",
            "wpaSchedule": "Schedule-II",
            "iucnCategory": "Least Concern"
        },
        {
            "indiaChecklistScientificName": "Caprimulgus macrurus",
            "migratoryStatusWithinIndia": "Resident & Local Migrant",
            "indiaChecklistCommonName": "Large-tailed Nightjar",
            "uniqueValue": 172,
            "endemicRegion": "None",
            "soibConcernStatus": "NA",
            "wpaSchedule": "Schedule-II",
            "iucnCategory": "Least Concern"
        },
        {
            "indiaChecklistScientificName": "Caprimulgus affinis",
            "migratoryStatusWithinIndia": "Resident & Local Migrant",
            "indiaChecklistCommonName": "Savanna Nightjar",
            "uniqueValue": 176,
            "endemicRegion": "None",
            "soibConcernStatus": "NA",
            "wpaSchedule": "Schedule-II",
            "iucnCategory": "Least Concern"
        },
        {
            "indiaChecklistScientificName": "Aerodramus brevirostris",
            "migratoryStatusWithinIndia": "Resident & Local Migrant",
            "indiaChecklistCommonName": "Himalayan Swiftlet",
            "uniqueValue": 183,
            "endemicRegion": "None",
            "soibConcernStatus": "Moderate",
            "wpaSchedule": "Schedule-II",
            "iucnCategory": "Least Concern"
        },
        {
            "indiaChecklistScientificName": "Tachymarptis melba",
            "migratoryStatusWithinIndia": "Resident & Local Migrant",
            "indiaChecklistCommonName": "Alpine Swift",
            "uniqueValue": 185,
            "endemicRegion": "None",
            "soibConcernStatus": "Low",
            "wpaSchedule": "Schedule-II",
            "iucnCategory": "Least Concern"
        },
        {
            "indiaChecklistScientificName": "Apus leuconyx",
            "migratoryStatusWithinIndia": "Within-India Migrant",
            "indiaChecklistCommonName": "Blyth's Swift",
            "uniqueValue": 188,
            "endemicRegion": "None",
            "soibConcernStatus": "Moderate",
            "wpaSchedule": "Schedule-II",
            "iucnCategory": "Not Recognised"
        },
        {
            "indiaChecklistScientificName": "Apus affinis",
            "migratoryStatusWithinIndia": "Resident",
            "indiaChecklistCommonName": "Little Swift",
            "uniqueValue": 190,
            "endemicRegion": "None",
            "soibConcernStatus": "Low",
            "wpaSchedule": "Schedule-II",
            "iucnCategory": "Least Concern"
        },
        {
            "indiaChecklistScientificName": "Rallus aquaticus",
            "migratoryStatusWithinIndia": "Resident & Winter Migrant",
            "indiaChecklistCommonName": "Water Rail",
            "uniqueValue": 194,
            "endemicRegion": "None",
            "soibConcernStatus": "NA",
            "wpaSchedule": "Schedule-II",
            "iucnCategory": "Least Concern"
        },
        {
            "indiaChecklistScientificName": "Gallinula chloropus",
            "migratoryStatusWithinIndia": "Resident & Local Migrant",
            "indiaChecklistCommonName": "Common Moorhen",
            "uniqueValue": 199,
            "endemicRegion": "None",
            "soibConcernStatus": "Low",
            "wpaSchedule": "Schedule-II",
            "iucnCategory": "Least Concern"
        },
        {
            "indiaChecklistScientificName": "Fulica atra",
            "migratoryStatusWithinIndia": "Resident & Winter Migrant",
            "indiaChecklistCommonName": "Eurasian Coot",
            "uniqueValue": 200,
            "endemicRegion": "None",
            "soibConcernStatus": "Low",
            "wpaSchedule": "Schedule-II",
            "iucnCategory": "Least Concern"
        },
        {
            "indiaChecklistScientificName": "Porphyrio poliocephalus",
            "migratoryStatusWithinIndia": "Resident",
            "indiaChecklistCommonName": "Grey-headed Swamphen",
            "uniqueValue": 201,
            "endemicRegion": "None",
            "soibConcernStatus": "Low",
            "wpaSchedule": "Schedule-II",
            "iucnCategory": "Not Recognised"
        },
        {
            "indiaChecklistScientificName": "Amaurornis phoenicurus",
            "migratoryStatusWithinIndia": "Resident",
            "indiaChecklistCommonName": "White-breasted Waterhen",
            "uniqueValue": 204,
            "endemicRegion": "None",
            "soibConcernStatus": "Low",
            "wpaSchedule": "Schedule-II",
            "iucnCategory": "Least Concern"
        },
        {
            "indiaChecklistScientificName": "Zapornia fusca",
            "migratoryStatusWithinIndia": "Resident",
            "indiaChecklistCommonName": "Ruddy-breasted Crake",
            "uniqueValue": 208,
            "endemicRegion": "None",
            "soibConcernStatus": "Low",
            "wpaSchedule": "Schedule-II",
            "iucnCategory": "Least Concern"
        },
        {
            "indiaChecklistScientificName": "Zapornia akool",
            "migratoryStatusWithinIndia": "Resident",
            "indiaChecklistCommonName": "Brown Crake",
            "uniqueValue": 209,
            "endemicRegion": "None",
            "soibConcernStatus": "Low",
            "wpaSchedule": "Schedule-II",
            "iucnCategory": "Least Concern"
        },
        {
            "indiaChecklistScientificName": "Zapornia pusilla",
            "migratoryStatusWithinIndia": "Winter Migrant",
            "indiaChecklistCommonName": "Baillon's Crake",
            "uniqueValue": 211,
            "endemicRegion": "None",
            "soibConcernStatus": "Moderate",
            "wpaSchedule": "Schedule-II",
            "iucnCategory": "Least Concern"
        },
        {
            "indiaChecklistScientificName": "Grus virgo",
            "migratoryStatusWithinIndia": "Winter Migrant",
            "indiaChecklistCommonName": "Demoiselle Crane",
            "uniqueValue": 214,
            "endemicRegion": "None",
            "soibConcernStatus": "High",
            "wpaSchedule": "Schedule-I",
            "iucnCategory": "Least Concern"
        },
        {
            "indiaChecklistScientificName": "Antigone antigone",
            "migratoryStatusWithinIndia": "Resident",
            "indiaChecklistCommonName": "Sarus Crane",
            "uniqueValue": 216,
            "endemicRegion": "None",
            "soibConcernStatus": "High",
            "wpaSchedule": "Schedule-I",
            "iucnCategory": "Vulnerable"
        },
        {
            "indiaChecklistScientificName": "Burhinus indicus",
            "migratoryStatusWithinIndia": "Resident",
            "indiaChecklistCommonName": "Indian Thick-knee",
            "uniqueValue": 219,
            "endemicRegion": "None",
            "soibConcernStatus": "Low",
            "wpaSchedule": "Schedule-II",
            "iucnCategory": "Least Concern"
        },
        {
            "indiaChecklistScientificName": "Esacus recurvirostris",
            "migratoryStatusWithinIndia": "Resident",
            "indiaChecklistCommonName": "Great Thick-knee",
            "uniqueValue": 220,
            "endemicRegion": "None",
            "soibConcernStatus": "High",
            "wpaSchedule": "Schedule-II",
            "iucnCategory": "Near Threatened"
        },
        {
            "indiaChecklistScientificName": "Himantopus himantopus",
            "migratoryStatusWithinIndia": "Resident & Local Migrant",
            "indiaChecklistCommonName": "Black-winged Stilt",
            "uniqueValue": 222,
            "endemicRegion": "None",
            "soibConcernStatus": "Low",
            "wpaSchedule": "Schedule-II",
            "iucnCategory": "Least Concern"
        },
        {
            "indiaChecklistScientificName": "Recurvirostra avosetta",
            "migratoryStatusWithinIndia": "Winter Migrant",
            "indiaChecklistCommonName": "Pied Avocet",
            "uniqueValue": 223,
            "endemicRegion": "None",
            "soibConcernStatus": "High",
            "wpaSchedule": "Schedule-II",
            "iucnCategory": "Least Concern"
        },
        {
            "indiaChecklistScientificName": "Haematopus ostralegus",
            "migratoryStatusWithinIndia": "Winter Migrant",
            "indiaChecklistCommonName": "Eurasian Oystercatcher",
            "uniqueValue": 225,
            "endemicRegion": "None",
            "soibConcernStatus": "High",
            "wpaSchedule": "Schedule-II",
            "iucnCategory": "Near Threatened"
        },
        {
            "indiaChecklistScientificName": "Pluvialis squatarola",
            "migratoryStatusWithinIndia": "Winter Migrant",
            "indiaChecklistCommonName": "Grey Plover",
            "uniqueValue": 226,
            "endemicRegion": "None",
            "soibConcernStatus": "High",
            "wpaSchedule": "Schedule-II",
            "iucnCategory": "Least Concern"
        },
        {
            "indiaChecklistScientificName": "Pluvialis apricaria",
            "migratoryStatusWithinIndia": "Winter Migrant",
            "indiaChecklistCommonName": "Eurasian Golden Plover",
            "uniqueValue": 227,
            "endemicRegion": "None",
            "soibConcernStatus": "NA",
            "wpaSchedule": "Schedule-II",
            "iucnCategory": "Least Concern"
        },
        {
            "indiaChecklistScientificName": "Pluvialis fulva",
            "migratoryStatusWithinIndia": "Winter Migrant",
            "indiaChecklistCommonName": "Pacific Golden Plover",
            "uniqueValue": 229,
            "endemicRegion": "None",
            "soibConcernStatus": "Moderate",
            "wpaSchedule": "Schedule-I",
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
            "indiaChecklistScientificName": "Vanellus malabaricus",
            "migratoryStatusWithinIndia": "Resident",
            "indiaChecklistCommonName": "Yellow-wattled Lapwing",
            "uniqueValue": 232,
            "endemicRegion": "Indian Subcontinent",
            "soibConcernStatus": "Low",
            "wpaSchedule": "Schedule-II",
            "iucnCategory": "Least Concern"
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
            "indiaChecklistScientificName": "Charadrius hiaticula",
            "migratoryStatusWithinIndia": "Winter Migrant",
            "indiaChecklistCommonName": "Common Ringed Plover",
            "uniqueValue": 241,
            "endemicRegion": "None",
            "soibConcernStatus": "NA",
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
            "indiaChecklistScientificName": "Rostratula benghalensis",
            "migratoryStatusWithinIndia": "Resident",
            "indiaChecklistCommonName": "Greater Painted-snipe",
            "uniqueValue": 245,
            "endemicRegion": "None",
            "soibConcernStatus": "Low",
            "wpaSchedule": "Schedule-II",
            "iucnCategory": "Least Concern"
        },
        {
            "indiaChecklistScientificName": "Hydrophasianus chirurgus",
            "migratoryStatusWithinIndia": "Resident",
            "indiaChecklistCommonName": "Pheasant-tailed Jacana",
            "uniqueValue": 246,
            "endemicRegion": "None",
            "soibConcernStatus": "Moderate",
            "wpaSchedule": "Schedule-II",
            "iucnCategory": "Least Concern"
        },
        {
            "indiaChecklistScientificName": "Numenius arquata",
            "migratoryStatusWithinIndia": "Winter Migrant",
            "indiaChecklistCommonName": "Eurasian Curlew",
            "uniqueValue": 249,
            "endemicRegion": "None",
            "soibConcernStatus": "High",
            "wpaSchedule": "Schedule-II",
            "iucnCategory": "Near Threatened"
        },
        {
            "indiaChecklistScientificName": "Limosa limosa",
            "migratoryStatusWithinIndia": "Winter Migrant",
            "indiaChecklistCommonName": "Black-tailed Godwit",
            "uniqueValue": 251,
            "endemicRegion": "None",
            "soibConcernStatus": "High",
            "wpaSchedule": "Schedule-II",
            "iucnCategory": "Near Threatened"
        },
        {
            "indiaChecklistScientificName": "Arenaria interpres",
            "migratoryStatusWithinIndia": "Winter Migrant",
            "indiaChecklistCommonName": "Ruddy Turnstone",
            "uniqueValue": 252,
            "endemicRegion": "None",
            "soibConcernStatus": "Moderate",
            "wpaSchedule": "Schedule-II",
            "iucnCategory": "Least Concern"
        },
        {
            "indiaChecklistScientificName": "Calidris tenuirostris",
            "migratoryStatusWithinIndia": "Winter Migrant",
            "indiaChecklistCommonName": "Great Knot",
            "uniqueValue": 253,
            "endemicRegion": "None",
            "soibConcernStatus": "High",
            "wpaSchedule": "Schedule-I",
            "iucnCategory": "Endangered"
        },
        {
            "indiaChecklistScientificName": "Calidris pugnax",
            "migratoryStatusWithinIndia": "Winter Migrant",
            "indiaChecklistCommonName": "Ruff",
            "uniqueValue": 255,
            "endemicRegion": "None",
            "soibConcernStatus": "High",
            "wpaSchedule": "Schedule-II",
            "iucnCategory": "Least Concern"
        },
        {
            "indiaChecklistScientificName": "Calidris falcinellus",
            "migratoryStatusWithinIndia": "Winter Migrant",
            "indiaChecklistCommonName": "Broad-billed Sandpiper",
            "uniqueValue": 256,
            "endemicRegion": "None",
            "soibConcernStatus": "Moderate",
            "wpaSchedule": "Schedule-II",
            "iucnCategory": "Least Concern"
        },
        {
            "indiaChecklistScientificName": "Calidris ferruginea",
            "migratoryStatusWithinIndia": "Winter Migrant",
            "indiaChecklistCommonName": "Curlew Sandpiper",
            "uniqueValue": 258,
            "endemicRegion": "None",
            "soibConcernStatus": "High",
            "wpaSchedule": "Schedule-II",
            "iucnCategory": "Near Threatened"
        },
        {
            "indiaChecklistScientificName": "Calidris temminckii",
            "migratoryStatusWithinIndia": "Winter Migrant",
            "indiaChecklistCommonName": "Temminck's Stint",
            "uniqueValue": 259,
            "endemicRegion": "None",
            "soibConcernStatus": "Moderate",
            "wpaSchedule": "Schedule-II",
            "iucnCategory": "Least Concern"
        },
        {
            "indiaChecklistScientificName": "Calidris alpina",
            "migratoryStatusWithinIndia": "Winter Migrant",
            "indiaChecklistCommonName": "Dunlin",
            "uniqueValue": 264,
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
            "indiaChecklistScientificName": "Scolopax rusticola",
            "migratoryStatusWithinIndia": "Local Migrant",
            "indiaChecklistCommonName": "Eurasian Woodcock",
            "uniqueValue": 271,
            "endemicRegion": "None",
            "soibConcernStatus": "NA",
            "wpaSchedule": "Schedule-II",
            "iucnCategory": "Least Concern"
        },
        {
            "indiaChecklistScientificName": "Gallinago gallinago",
            "migratoryStatusWithinIndia": "Winter Migrant",
            "indiaChecklistCommonName": "Common Snipe",
            "uniqueValue": 275,
            "endemicRegion": "None",
            "soibConcernStatus": "Low",
            "wpaSchedule": "Schedule-II",
            "iucnCategory": "Least Concern"
        },
        {
            "indiaChecklistScientificName": "Xenus cinereus",
            "migratoryStatusWithinIndia": "Winter Migrant",
            "indiaChecklistCommonName": "Terek Sandpiper",
            "uniqueValue": 278,
            "endemicRegion": "None",
            "soibConcernStatus": "High",
            "wpaSchedule": "Schedule-II",
            "iucnCategory": "Least Concern"
        },
        {
            "indiaChecklistScientificName": "Phalaropus lobatus",
            "migratoryStatusWithinIndia": "Winter Migrant",
            "indiaChecklistCommonName": "Red-necked Phalarope",
            "uniqueValue": 279,
            "endemicRegion": "None",
            "soibConcernStatus": "NA",
            "wpaSchedule": "Schedule-II",
            "iucnCategory": "Least Concern"
        },
        {
            "indiaChecklistScientificName": "Actitis hypoleucos",
            "migratoryStatusWithinIndia": "Winter Migrant",
            "indiaChecklistCommonName": "Common Sandpiper",
            "uniqueValue": 281,
            "endemicRegion": "None",
            "soibConcernStatus": "Moderate",
            "wpaSchedule": "Schedule-II",
            "iucnCategory": "Least Concern"
        },
        {
            "indiaChecklistScientificName": "Tringa ochropus",
            "migratoryStatusWithinIndia": "Winter Migrant",
            "indiaChecklistCommonName": "Green Sandpiper",
            "uniqueValue": 282,
            "endemicRegion": "None",
            "soibConcernStatus": "Low",
            "wpaSchedule": "Schedule-II",
            "iucnCategory": "Least Concern"
        },
        {
            "indiaChecklistScientificName": "Tringa erythropus",
            "migratoryStatusWithinIndia": "Winter Migrant",
            "indiaChecklistCommonName": "Spotted Redshank",
            "uniqueValue": 284,
            "endemicRegion": "None",
            "soibConcernStatus": "High",
            "wpaSchedule": "Schedule-II",
            "iucnCategory": "Least Concern"
        },
        {
            "indiaChecklistScientificName": "Tringa nebularia",
            "migratoryStatusWithinIndia": "Winter Migrant",
            "indiaChecklistCommonName": "Common Greenshank",
            "uniqueValue": 285,
            "endemicRegion": "None",
            "soibConcernStatus": "High",
            "wpaSchedule": "Schedule-I",
            "iucnCategory": "Least Concern"
        },
        {
            "indiaChecklistScientificName": "Tringa stagnatilis",
            "migratoryStatusWithinIndia": "Winter Migrant",
            "indiaChecklistCommonName": "Marsh Sandpiper",
            "uniqueValue": 287,
            "endemicRegion": "None",
            "soibConcernStatus": "High",
            "wpaSchedule": "Schedule-II",
            "iucnCategory": "Least Concern"
        },
        {
            "indiaChecklistScientificName": "Tringa glareola",
            "migratoryStatusWithinIndia": "Winter Migrant",
            "indiaChecklistCommonName": "Wood Sandpiper",
            "uniqueValue": 288,
            "endemicRegion": "None",
            "soibConcernStatus": "Moderate",
            "wpaSchedule": "Schedule-II",
            "iucnCategory": "Least Concern"
        },
        {
            "indiaChecklistScientificName": "Tringa totanus",
            "migratoryStatusWithinIndia": "Winter Migrant",
            "indiaChecklistCommonName": "Common Redshank",
            "uniqueValue": 289,
            "endemicRegion": "None",
            "soibConcernStatus": "High",
            "wpaSchedule": "Schedule-II",
            "iucnCategory": "Least Concern"
        },
        {
            "indiaChecklistScientificName": "Turnix suscitator",
            "migratoryStatusWithinIndia": "Resident",
            "indiaChecklistCommonName": "Barred Buttonquail",
            "uniqueValue": 292,
            "endemicRegion": "None",
            "soibConcernStatus": "Low",
            "wpaSchedule": "Schedule-II",
            "iucnCategory": "Least Concern"
        },
        {
            "indiaChecklistScientificName": "Glareola pratincola",
            "migratoryStatusWithinIndia": "Winter Migrant & Localized Summer Migrant",
            "indiaChecklistCommonName": "Collared Pratincole",
            "uniqueValue": 297,
            "endemicRegion": "None",
            "soibConcernStatus": "NA",
            "wpaSchedule": "Schedule-II",
            "iucnCategory": "Least Concern"
        },
        {
            "indiaChecklistScientificName": "Glareola lactea",
            "migratoryStatusWithinIndia": "Resident",
            "indiaChecklistCommonName": "Small Pratincole",
            "uniqueValue": 299,
            "endemicRegion": "None",
            "soibConcernStatus": "Moderate",
            "wpaSchedule": "Schedule-II",
            "iucnCategory": "Least Concern"
        },
        {
            "indiaChecklistScientificName": "Chroicocephalus genei",
            "migratoryStatusWithinIndia": "Resident & Within-India Migrant",
            "indiaChecklistCommonName": "Slender-billed Gull",
            "uniqueValue": 307,
            "endemicRegion": "None",
            "soibConcernStatus": "High",
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
            "indiaChecklistScientificName": "Chroicocephalus brunnicephalus",
            "migratoryStatusWithinIndia": "Winter Migrant & Localized Summer Migrant",
            "indiaChecklistCommonName": "Brown-headed Gull",
            "uniqueValue": 309,
            "endemicRegion": "None",
            "soibConcernStatus": "High",
            "wpaSchedule": "Schedule-II",
            "iucnCategory": "Least Concern"
        },
        {
            "indiaChecklistScientificName": "Hydrocoloeus minutus",
            "migratoryStatusWithinIndia": "Uncertain",
            "indiaChecklistCommonName": "Little Gull",
            "uniqueValue": 310,
            "endemicRegion": "None",
            "soibConcernStatus": "NA",
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
            "indiaChecklistScientificName": "Larus cachinnans",
            "migratoryStatusWithinIndia": "Winter Migrant",
            "indiaChecklistCommonName": "Caspian Gull",
            "uniqueValue": 317,
            "endemicRegion": "None",
            "soibConcernStatus": "NA",
            "wpaSchedule": "Schedule-II",
            "iucnCategory": "Least Concern"
        },
        {
            "indiaChecklistScientificName": "Larus fuscus",
            "migratoryStatusWithinIndia": "Winter Migrant",
            "indiaChecklistCommonName": "Lesser Black-backed Gull",
            "uniqueValue": 318,
            "endemicRegion": "None",
            "soibConcernStatus": "Moderate",
            "wpaSchedule": "Schedule-II",
            "iucnCategory": "Least Concern"
        },
        {
            "indiaChecklistScientificName": "Sternula albifrons",
            "migratoryStatusWithinIndia": "Winter Migrant & Localized Summer Migrant",
            "indiaChecklistCommonName": "Little Tern",
            "uniqueValue": 325,
            "endemicRegion": "None",
            "soibConcernStatus": "High",
            "wpaSchedule": "Schedule-II",
            "iucnCategory": "Least Concern"
        },
        {
            "indiaChecklistScientificName": "Gelochelidon nilotica",
            "migratoryStatusWithinIndia": "Resident & Winter Migrant",
            "indiaChecklistCommonName": "Gull-billed Tern",
            "uniqueValue": 327,
            "endemicRegion": "None",
            "soibConcernStatus": "High",
            "wpaSchedule": "Schedule-I",
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
            "indiaChecklistScientificName": "Sterna hirundo",
            "migratoryStatusWithinIndia": "Winter Migrant & Localized Summer Migrant",
            "indiaChecklistCommonName": "Common Tern",
            "uniqueValue": 334,
            "endemicRegion": "None",
            "soibConcernStatus": "High",
            "wpaSchedule": "Schedule-II",
            "iucnCategory": "Least Concern"
        },
        {
            "indiaChecklistScientificName": "Sterna acuticauda",
            "migratoryStatusWithinIndia": "Resident & Local Migrant",
            "indiaChecklistCommonName": "Black-bellied Tern",
            "uniqueValue": 336,
            "endemicRegion": "None",
            "soibConcernStatus": "High",
            "wpaSchedule": "Schedule-I",
            "iucnCategory": "Endangered"
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
            "indiaChecklistScientificName": "Anastomus oscitans",
            "migratoryStatusWithinIndia": "Resident",
            "indiaChecklistCommonName": "Asian Openbill",
            "uniqueValue": 363,
            "endemicRegion": "None",
            "soibConcernStatus": "Low",
            "wpaSchedule": "Schedule-II",
            "iucnCategory": "Least Concern"
        },
        {
            "indiaChecklistScientificName": "Ciconia nigra",
            "migratoryStatusWithinIndia": "Winter Migrant",
            "indiaChecklistCommonName": "Black Stork",
            "uniqueValue": 364,
            "endemicRegion": "None",
            "soibConcernStatus": "Moderate",
            "wpaSchedule": "Schedule-II",
            "iucnCategory": "Least Concern"
        },
        {
            "indiaChecklistScientificName": "Ciconia episcopus",
            "migratoryStatusWithinIndia": "Resident",
            "indiaChecklistCommonName": "Woolly-necked Stork",
            "uniqueValue": 365,
            "endemicRegion": "None",
            "soibConcernStatus": "Moderate",
            "wpaSchedule": "Schedule-II",
            "iucnCategory": "Near Threatened"
        },
        {
            "indiaChecklistScientificName": "Mycteria leucocephala",
            "migratoryStatusWithinIndia": "Resident",
            "indiaChecklistCommonName": "Painted Stork",
            "uniqueValue": 370,
            "endemicRegion": "None",
            "soibConcernStatus": "Low",
            "wpaSchedule": "Schedule-II",
            "iucnCategory": "Least Concern"
        },
        {
            "indiaChecklistScientificName": "Anhinga melanogaster",
            "migratoryStatusWithinIndia": "Resident",
            "indiaChecklistCommonName": "Oriental Darter",
            "uniqueValue": 377,
            "endemicRegion": "None",
            "soibConcernStatus": "Low",
            "wpaSchedule": "Schedule-II",
            "iucnCategory": "Near Threatened"
        },
        {
            "indiaChecklistScientificName": "Microcarbo niger",
            "migratoryStatusWithinIndia": "Resident",
            "indiaChecklistCommonName": "Little Cormorant",
            "uniqueValue": 378,
            "endemicRegion": "None",
            "soibConcernStatus": "Low",
            "wpaSchedule": "Schedule-II",
            "iucnCategory": "Least Concern"
        },
        {
            "indiaChecklistScientificName": "Phalacrocorax carbo",
            "migratoryStatusWithinIndia": "Resident & Winter Migrant",
            "indiaChecklistCommonName": "Great Cormorant",
            "uniqueValue": 379,
            "endemicRegion": "None",
            "soibConcernStatus": "Low",
            "wpaSchedule": "Schedule-II",
            "iucnCategory": "Least Concern"
        },
        {
            "indiaChecklistScientificName": "Botaurus stellaris",
            "migratoryStatusWithinIndia": "Winter Migrant",
            "indiaChecklistCommonName": "Great Bittern",
            "uniqueValue": 384,
            "endemicRegion": "None",
            "soibConcernStatus": "NA",
            "wpaSchedule": "Schedule-II",
            "iucnCategory": "Least Concern"
        },
        {
            "indiaChecklistScientificName": "Ixobrychus sinensis",
            "migratoryStatusWithinIndia": "Resident & Local Migrant",
            "indiaChecklistCommonName": "Yellow Bittern",
            "uniqueValue": 385,
            "endemicRegion": "None",
            "soibConcernStatus": "Low",
            "wpaSchedule": "Schedule-II",
            "iucnCategory": "Least Concern"
        },
        {
            "indiaChecklistScientificName": "Ixobrychus cinnamomeus",
            "migratoryStatusWithinIndia": "Resident & Local Migrant",
            "indiaChecklistCommonName": "Cinnamon Bittern",
            "uniqueValue": 387,
            "endemicRegion": "None",
            "soibConcernStatus": "Low",
            "wpaSchedule": "Schedule-I",
            "iucnCategory": "Least Concern"
        },
        {
            "indiaChecklistScientificName": "Ixobrychus flavicollis",
            "migratoryStatusWithinIndia": "Resident & Local Migrant",
            "indiaChecklistCommonName": "Black Bittern",
            "uniqueValue": 388,
            "endemicRegion": "None",
            "soibConcernStatus": "Low",
            "wpaSchedule": "Schedule-II",
            "iucnCategory": "Least Concern"
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
            "indiaChecklistScientificName": "Ardea purpurea",
            "migratoryStatusWithinIndia": "Resident",
            "indiaChecklistCommonName": "Purple Heron",
            "uniqueValue": 392,
            "endemicRegion": "None",
            "soibConcernStatus": "Low",
            "wpaSchedule": "Schedule-II",
            "iucnCategory": "Least Concern"
        },
        {
            "indiaChecklistScientificName": "Ardea alba",
            "migratoryStatusWithinIndia": "Resident",
            "indiaChecklistCommonName": "Great Egret",
            "uniqueValue": 393,
            "endemicRegion": "None",
            "soibConcernStatus": "Low",
            "wpaSchedule": "Schedule-II",
            "iucnCategory": "Least Concern"
        },
        {
            "indiaChecklistScientificName": "Ardea intermedia",
            "migratoryStatusWithinIndia": "Resident",
            "indiaChecklistCommonName": "Intermediate Egret",
            "uniqueValue": 394,
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
            "indiaChecklistScientificName": "Bubulcus ibis",
            "migratoryStatusWithinIndia": "Resident",
            "indiaChecklistCommonName": "Cattle Egret",
            "uniqueValue": 399,
            "endemicRegion": "None",
            "soibConcernStatus": "Low",
            "wpaSchedule": "Schedule-II",
            "iucnCategory": "Least Concern"
        },
        {
            "indiaChecklistScientificName": "Ardeola grayii",
            "migratoryStatusWithinIndia": "Resident",
            "indiaChecklistCommonName": "Indian Pond Heron",
            "uniqueValue": 400,
            "endemicRegion": "None",
            "soibConcernStatus": "Low",
            "wpaSchedule": "Schedule-II",
            "iucnCategory": "Least Concern"
        },
        {
            "indiaChecklistScientificName": "Nycticorax nycticorax",
            "migratoryStatusWithinIndia": "Resident",
            "indiaChecklistCommonName": "Black-crowned Night Heron",
            "uniqueValue": 404,
            "endemicRegion": "None",
            "soibConcernStatus": "Low",
            "wpaSchedule": "Schedule-II",
            "iucnCategory": "Least Concern"
        },
        {
            "indiaChecklistScientificName": "Plegadis falcinellus",
            "migratoryStatusWithinIndia": "Resident",
            "indiaChecklistCommonName": "Glossy Ibis",
            "uniqueValue": 407,
            "endemicRegion": "None",
            "soibConcernStatus": "Low",
            "wpaSchedule": "Schedule-II",
            "iucnCategory": "Least Concern"
        },
        {
            "indiaChecklistScientificName": "Threskiornis melanocephalus",
            "migratoryStatusWithinIndia": "Resident",
            "indiaChecklistCommonName": "Black-headed Ibis",
            "uniqueValue": 408,
            "endemicRegion": "None",
            "soibConcernStatus": "Low",
            "wpaSchedule": "Schedule-II",
            "iucnCategory": "Near Threatened"
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
            "indiaChecklistScientificName": "Platalea leucorodia",
            "migratoryStatusWithinIndia": "Resident & Local Migrant",
            "indiaChecklistCommonName": "Eurasian Spoonbill",
            "uniqueValue": 410,
            "endemicRegion": "None",
            "soibConcernStatus": "High",
            "wpaSchedule": "Schedule-I",
            "iucnCategory": "Least Concern"
        },
        {
            "indiaChecklistScientificName": "Pandion haliaetus",
            "migratoryStatusWithinIndia": "Winter Migrant",
            "indiaChecklistCommonName": "Osprey",
            "uniqueValue": 411,
            "endemicRegion": "None",
            "soibConcernStatus": "High",
            "wpaSchedule": "Schedule-I",
            "iucnCategory": "Least Concern"
        },
        {
            "indiaChecklistScientificName": "Elanus caeruleus",
            "migratoryStatusWithinIndia": "Resident",
            "indiaChecklistCommonName": "Black-winged Kite",
            "uniqueValue": 412,
            "endemicRegion": "None",
            "soibConcernStatus": "Moderate",
            "wpaSchedule": "Schedule-II",
            "iucnCategory": "Least Concern"
        },
        {
            "indiaChecklistScientificName": "Gypaetus barbatus",
            "migratoryStatusWithinIndia": "Resident & Altitudinal Migrant",
            "indiaChecklistCommonName": "Bearded Vulture",
            "uniqueValue": 413,
            "endemicRegion": "None",
            "soibConcernStatus": "High",
            "wpaSchedule": "Schedule-I",
            "iucnCategory": "Near Threatened"
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
            "indiaChecklistScientificName": "Pernis ptilorhynchus",
            "migratoryStatusWithinIndia": "Resident & Winter Migrant",
            "indiaChecklistCommonName": "Oriental Honey Buzzard",
            "uniqueValue": 416,
            "endemicRegion": "None",
            "soibConcernStatus": "Low",
            "wpaSchedule": "Schedule-II",
            "iucnCategory": "Least Concern"
        },
        {
            "indiaChecklistScientificName": "Sarcogyps calvus",
            "migratoryStatusWithinIndia": "Resident",
            "indiaChecklistCommonName": "Red-headed Vulture",
            "uniqueValue": 419,
            "endemicRegion": "None",
            "soibConcernStatus": "High",
            "wpaSchedule": "Schedule-I",
            "iucnCategory": "Critically Endangered"
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
            "indiaChecklistScientificName": "Gyps indicus",
            "migratoryStatusWithinIndia": "Resident",
            "indiaChecklistCommonName": "Indian Vulture",
            "uniqueValue": 422,
            "endemicRegion": "Indian Subcontinent",
            "soibConcernStatus": "High",
            "wpaSchedule": "Schedule-I",
            "iucnCategory": "Critically Endangered"
        },
        {
            "indiaChecklistScientificName": "Gyps tenuirostris",
            "migratoryStatusWithinIndia": "Resident",
            "indiaChecklistCommonName": "Slender-billed Vulture",
            "uniqueValue": 423,
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
            "indiaChecklistScientificName": "Spilornis cheela",
            "migratoryStatusWithinIndia": "Resident",
            "indiaChecklistCommonName": "Crested Serpent Eagle",
            "uniqueValue": 427,
            "endemicRegion": "None",
            "soibConcernStatus": "Low",
            "wpaSchedule": "Schedule-I",
            "iucnCategory": "Least Concern"
        },
        {
            "indiaChecklistScientificName": "Circaetus gallicus",
            "migratoryStatusWithinIndia": "Resident",
            "indiaChecklistCommonName": "Short-toed Snake Eagle",
            "uniqueValue": 429,
            "endemicRegion": "None",
            "soibConcernStatus": "High",
            "wpaSchedule": "Schedule-I",
            "iucnCategory": "Least Concern"
        },
        {
            "indiaChecklistScientificName": "Nisaetus nipalensis",
            "migratoryStatusWithinIndia": "Resident",
            "indiaChecklistCommonName": "Mountain Hawk Eagle",
            "uniqueValue": 431,
            "endemicRegion": "None",
            "soibConcernStatus": "Low",
            "wpaSchedule": "Schedule-I",
            "iucnCategory": "Near Threatened"
        },
        {
            "indiaChecklistScientificName": "Ictinaetus malaiensis",
            "migratoryStatusWithinIndia": "Resident",
            "indiaChecklistCommonName": "Black Eagle",
            "uniqueValue": 434,
            "endemicRegion": "None",
            "soibConcernStatus": "Low",
            "wpaSchedule": "Schedule-I",
            "iucnCategory": "Least Concern"
        },
        {
            "indiaChecklistScientificName": "Clanga hastata",
            "migratoryStatusWithinIndia": "Resident & Within-India Migrant",
            "indiaChecklistCommonName": "Indian Spotted Eagle",
            "uniqueValue": 435,
            "endemicRegion": "None",
            "soibConcernStatus": "Moderate",
            "wpaSchedule": "Schedule-I",
            "iucnCategory": "Vulnerable"
        },
        {
            "indiaChecklistScientificName": "Hieraaetus pennatus",
            "migratoryStatusWithinIndia": "Winter Migrant",
            "indiaChecklistCommonName": "Booted Eagle",
            "uniqueValue": 437,
            "endemicRegion": "None",
            "soibConcernStatus": "Low",
            "wpaSchedule": "Schedule-I",
            "iucnCategory": "Least Concern"
        },
        {
            "indiaChecklistScientificName": "Aquila nipalensis",
            "migratoryStatusWithinIndia": "Winter Migrant",
            "indiaChecklistCommonName": "Steppe Eagle",
            "uniqueValue": 439,
            "endemicRegion": "None",
            "soibConcernStatus": "Low",
            "wpaSchedule": "Schedule-I",
            "iucnCategory": "Endangered"
        },
        {
            "indiaChecklistScientificName": "Aquila heliaca",
            "migratoryStatusWithinIndia": "Winter Migrant",
            "indiaChecklistCommonName": "Eastern Imperial Eagle",
            "uniqueValue": 440,
            "endemicRegion": "None",
            "soibConcernStatus": "Moderate",
            "wpaSchedule": "Schedule-I",
            "iucnCategory": "Vulnerable"
        },
        {
            "indiaChecklistScientificName": "Aquila chrysaetos",
            "migratoryStatusWithinIndia": "Local Migrant & Winter Migrant",
            "indiaChecklistCommonName": "Golden Eagle",
            "uniqueValue": 441,
            "endemicRegion": "None",
            "soibConcernStatus": "Low",
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
            "indiaChecklistScientificName": "Butastur teesa",
            "migratoryStatusWithinIndia": "Resident & Local Migrant",
            "indiaChecklistCommonName": "White-eyed Buzzard",
            "uniqueValue": 443,
            "endemicRegion": "None",
            "soibConcernStatus": "Moderate",
            "wpaSchedule": "Schedule-I",
            "iucnCategory": "Least Concern"
        },
        {
            "indiaChecklistScientificName": "Circus aeruginosus",
            "migratoryStatusWithinIndia": "Winter Migrant",
            "indiaChecklistCommonName": "Western Marsh Harrier",
            "uniqueValue": 446,
            "endemicRegion": "None",
            "soibConcernStatus": "High",
            "wpaSchedule": "Schedule-I",
            "iucnCategory": "Least Concern"
        },
        {
            "indiaChecklistScientificName": "Circus cyaneus",
            "migratoryStatusWithinIndia": "Winter Migrant",
            "indiaChecklistCommonName": "Hen Harrier",
            "uniqueValue": 448,
            "endemicRegion": "None",
            "soibConcernStatus": "Moderate",
            "wpaSchedule": "Schedule-I",
            "iucnCategory": "Least Concern"
        },
        {
            "indiaChecklistScientificName": "Circus macrourus",
            "migratoryStatusWithinIndia": "Winter Migrant",
            "indiaChecklistCommonName": "Pallid Harrier",
            "uniqueValue": 449,
            "endemicRegion": "None",
            "soibConcernStatus": "High",
            "wpaSchedule": "Schedule-I",
            "iucnCategory": "Near Threatened"
        },
        {
            "indiaChecklistScientificName": "Accipiter badius",
            "migratoryStatusWithinIndia": "Resident",
            "indiaChecklistCommonName": "Shikra",
            "uniqueValue": 453,
            "endemicRegion": "None",
            "soibConcernStatus": "Low",
            "wpaSchedule": "Schedule-I",
            "iucnCategory": "Least Concern"
        },
        {
            "indiaChecklistScientificName": "Accipiter virgatus",
            "migratoryStatusWithinIndia": "Resident & Local Migrant",
            "indiaChecklistCommonName": "Besra",
            "uniqueValue": 457,
            "endemicRegion": "None",
            "soibConcernStatus": "Low",
            "wpaSchedule": "Schedule-I",
            "iucnCategory": "Least Concern"
        },
        {
            "indiaChecklistScientificName": "Accipiter nisus",
            "migratoryStatusWithinIndia": "Resident & Winter Migrant",
            "indiaChecklistCommonName": "Eurasian Sparrowhawk",
            "uniqueValue": 458,
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
            "indiaChecklistScientificName": "Haliaeetus albicilla",
            "migratoryStatusWithinIndia": "Winter Migrant",
            "indiaChecklistCommonName": "White-tailed Sea Eagle",
            "uniqueValue": 463,
            "endemicRegion": "None",
            "soibConcernStatus": "NA",
            "wpaSchedule": "Schedule-I",
            "iucnCategory": "Least Concern"
        },
        {
            "indiaChecklistScientificName": "Haliaeetus leucoryphus",
            "migratoryStatusWithinIndia": "Winter Migrant",
            "indiaChecklistCommonName": "Pallas's Fish Eagle",
            "uniqueValue": 464,
            "endemicRegion": "None",
            "soibConcernStatus": "High",
            "wpaSchedule": "Schedule-I",
            "iucnCategory": "Endangered"
        },
        {
            "indiaChecklistScientificName": "Buteo buteo",
            "migratoryStatusWithinIndia": "Winter Migrant",
            "indiaChecklistCommonName": "Common Buzzard",
            "uniqueValue": 469,
            "endemicRegion": "None",
            "soibConcernStatus": "Low",
            "wpaSchedule": "Schedule-I",
            "iucnCategory": "Least Concern"
        },
        {
            "indiaChecklistScientificName": "Buteo refectus",
            "migratoryStatusWithinIndia": "Resident & Winter Migrant",
            "indiaChecklistCommonName": "Himalayan Buzzard",
            "uniqueValue": 470,
            "endemicRegion": "None",
            "soibConcernStatus": "NA",
            "wpaSchedule": "Schedule-I",
            "iucnCategory": "Least Concern"
        },
        {
            "indiaChecklistScientificName": "Buteo rufinus",
            "migratoryStatusWithinIndia": "Winter Migrant",
            "indiaChecklistCommonName": "Long-legged Buzzard",
            "uniqueValue": 471,
            "endemicRegion": "None",
            "soibConcernStatus": "Low",
            "wpaSchedule": "Schedule-I",
            "iucnCategory": "Least Concern"
        },
        {
            "indiaChecklistScientificName": "Otus spilocephalus",
            "migratoryStatusWithinIndia": "Resident & Altitudinal Migrant",
            "indiaChecklistCommonName": "Mountain Scops Owl",
            "uniqueValue": 479,
            "endemicRegion": "None",
            "soibConcernStatus": "NA",
            "wpaSchedule": "Schedule-II",
            "iucnCategory": "Least Concern"
        },
        {
            "indiaChecklistScientificName": "Otus bakkamoena",
            "migratoryStatusWithinIndia": "Resident",
            "indiaChecklistCommonName": "Indian Scops Owl",
            "uniqueValue": 480,
            "endemicRegion": "Indian Subcontinent",
            "soibConcernStatus": "NA",
            "wpaSchedule": "Schedule-II",
            "iucnCategory": "Least Concern"
        },
        {
            "indiaChecklistScientificName": "Otus sunia",
            "migratoryStatusWithinIndia": "Resident & Local Migrant",
            "indiaChecklistCommonName": "Oriental Scops Owl",
            "uniqueValue": 485,
            "endemicRegion": "None",
            "soibConcernStatus": "NA",
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
            "indiaChecklistScientificName": "Taenioptynx brodiei",
            "migratoryStatusWithinIndia": "Resident & Altitudinal Migrant",
            "indiaChecklistCommonName": "Collared Owlet",
            "uniqueValue": 495,
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
            "indiaChecklistScientificName": "Strix leptogrammica",
            "migratoryStatusWithinIndia": "Resident",
            "indiaChecklistCommonName": "Brown Wood Owl",
            "uniqueValue": 500,
            "endemicRegion": "None",
            "soibConcernStatus": "NA",
            "wpaSchedule": "Schedule-I",
            "iucnCategory": "Least Concern"
        },
        {
            "indiaChecklistScientificName": "Strix nivicolum",
            "migratoryStatusWithinIndia": "Resident & Altitudinal Migrant",
            "indiaChecklistCommonName": "Himalayan Owl",
            "uniqueValue": 502,
            "endemicRegion": "None",
            "soibConcernStatus": "NA",
            "wpaSchedule": "Schedule-II",
            "iucnCategory": "Least Concern"
        },
        {
            "indiaChecklistScientificName": "Asio flammeus",
            "migratoryStatusWithinIndia": "Winter Migrant",
            "indiaChecklistCommonName": "Short-eared Owl",
            "uniqueValue": 504,
            "endemicRegion": "None",
            "soibConcernStatus": "Low",
            "wpaSchedule": "Schedule-I",
            "iucnCategory": "Least Concern"
        },
        {
            "indiaChecklistScientificName": "Ninox scutulata",
            "migratoryStatusWithinIndia": "Resident",
            "indiaChecklistCommonName": "Brown Boobook",
            "uniqueValue": 507,
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
            "indiaChecklistScientificName": "Alcedo atthis",
            "migratoryStatusWithinIndia": "Resident",
            "indiaChecklistCommonName": "Common Kingfisher",
            "uniqueValue": 523,
            "endemicRegion": "None",
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
            "indiaChecklistScientificName": "Megaceryle lugubris",
            "migratoryStatusWithinIndia": "Resident & Altitudinal Migrant",
            "indiaChecklistCommonName": "Crested Kingfisher",
            "uniqueValue": 533,
            "endemicRegion": "None",
            "soibConcernStatus": "Moderate",
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
            "indiaChecklistScientificName": "Merops orientalis",
            "migratoryStatusWithinIndia": "Resident",
            "indiaChecklistCommonName": "Green Bee-eater",
            "uniqueValue": 536,
            "endemicRegion": "None",
            "soibConcernStatus": "Low",
            "wpaSchedule": "Schedule-II",
            "iucnCategory": "Least Concern"
        },
        {
            "indiaChecklistScientificName": "Merops philippinus",
            "migratoryStatusWithinIndia": "Within-India Migrant & Winter Migrant",
            "indiaChecklistCommonName": "Blue-tailed Bee-eater",
            "uniqueValue": 539,
            "endemicRegion": "None",
            "soibConcernStatus": "Low",
            "wpaSchedule": "Schedule-II",
            "iucnCategory": "Least Concern"
        },
        {
            "indiaChecklistScientificName": "Coracias garrulus",
            "migratoryStatusWithinIndia": "Passage Migrant & Localized Summer Migrant",
            "indiaChecklistCommonName": "European Roller",
            "uniqueValue": 542,
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
            "indiaChecklistScientificName": "Psilopogon virens",
            "migratoryStatusWithinIndia": "Resident & Altitudinal Migrant",
            "indiaChecklistCommonName": "Great Barbet",
            "uniqueValue": 549,
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
            "indiaChecklistScientificName": "Jynx torquilla",
            "migratoryStatusWithinIndia": "Winter Migrant & Localized Summer Migrant",
            "indiaChecklistCommonName": "Eurasian Wryneck",
            "uniqueValue": 556,
            "endemicRegion": "None",
            "soibConcernStatus": "Low",
            "wpaSchedule": "Schedule-II",
            "iucnCategory": "Least Concern"
        },
        {
            "indiaChecklistScientificName": "Picumnus innominatus",
            "migratoryStatusWithinIndia": "Resident",
            "indiaChecklistCommonName": "Speckled Piculet",
            "uniqueValue": 557,
            "endemicRegion": "None",
            "soibConcernStatus": "Low",
            "wpaSchedule": "Schedule-II",
            "iucnCategory": "Least Concern"
        },
        {
            "indiaChecklistScientificName": "Yungipicus nanus",
            "migratoryStatusWithinIndia": "Resident",
            "indiaChecklistCommonName": "Brown-capped Pygmy Woodpecker",
            "uniqueValue": 560,
            "endemicRegion": "Indian Subcontinent",
            "soibConcernStatus": "Moderate",
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
            "indiaChecklistScientificName": "Dendrocoptes auriceps",
            "migratoryStatusWithinIndia": "Resident & Altitudinal Migrant",
            "indiaChecklistCommonName": "Brown-fronted Woodpecker",
            "uniqueValue": 563,
            "endemicRegion": "Himalayas",
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
            "indiaChecklistScientificName": "Dendrocopos himalayensis",
            "migratoryStatusWithinIndia": "Resident & Altitudinal Migrant",
            "indiaChecklistCommonName": "Himalayan Woodpecker",
            "uniqueValue": 570,
            "endemicRegion": "Himalayas",
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
            "indiaChecklistScientificName": "Picus chlorolophus",
            "migratoryStatusWithinIndia": "Resident",
            "indiaChecklistCommonName": "Lesser Yellownape",
            "uniqueValue": 581,
            "endemicRegion": "None",
            "soibConcernStatus": "Low",
            "wpaSchedule": "Schedule-II",
            "iucnCategory": "Least Concern"
        },
        {
            "indiaChecklistScientificName": "Picus squamatus",
            "migratoryStatusWithinIndia": "Resident & Altitudinal Migrant",
            "indiaChecklistCommonName": "Scaly-bellied Woodpecker",
            "uniqueValue": 583,
            "endemicRegion": "Himalayas",
            "soibConcernStatus": "Low",
            "wpaSchedule": "Schedule-II",
            "iucnCategory": "Least Concern"
        },
        {
            "indiaChecklistScientificName": "Picus canus",
            "migratoryStatusWithinIndia": "Resident",
            "indiaChecklistCommonName": "Grey-headed Woodpecker",
            "uniqueValue": 584,
            "endemicRegion": "None",
            "soibConcernStatus": "Low",
            "wpaSchedule": "Schedule-II",
            "iucnCategory": "Least Concern"
        },
        {
            "indiaChecklistScientificName": "Falco tinnunculus",
            "migratoryStatusWithinIndia": "Resident & Winter Migrant",
            "indiaChecklistCommonName": "Common Kestrel",
            "uniqueValue": 592,
            "endemicRegion": "None",
            "soibConcernStatus": "High",
            "wpaSchedule": "Schedule-II",
            "iucnCategory": "Least Concern"
        },
        {
            "indiaChecklistScientificName": "Falco chicquera",
            "migratoryStatusWithinIndia": "Resident",
            "indiaChecklistCommonName": "Red-necked Falcon",
            "uniqueValue": 593,
            "endemicRegion": "None",
            "soibConcernStatus": "Moderate",
            "wpaSchedule": "Schedule-I",
            "iucnCategory": "Near Threatened"
        },
        {
            "indiaChecklistScientificName": "Falco amurensis",
            "migratoryStatusWithinIndia": "Passage Migrant",
            "indiaChecklistCommonName": "Amur Falcon",
            "uniqueValue": 595,
            "endemicRegion": "None",
            "soibConcernStatus": "Moderate",
            "wpaSchedule": "Schedule-I",
            "iucnCategory": "Least Concern"
        },
        {
            "indiaChecklistScientificName": "Falco columbarius",
            "migratoryStatusWithinIndia": "Winter Migrant",
            "indiaChecklistCommonName": "Merlin",
            "uniqueValue": 596,
            "endemicRegion": "None",
            "soibConcernStatus": "NA",
            "wpaSchedule": "Schedule-II",
            "iucnCategory": "Least Concern"
        },
        {
            "indiaChecklistScientificName": "Falco subbuteo",
            "migratoryStatusWithinIndia": "Winter Migrant & Localized Summer Migrant",
            "indiaChecklistCommonName": "Eurasian Hobby",
            "uniqueValue": 597,
            "endemicRegion": "None",
            "soibConcernStatus": "Low",
            "wpaSchedule": "Schedule-II",
            "iucnCategory": "Least Concern"
        },
        {
            "indiaChecklistScientificName": "Falco peregrinus",
            "migratoryStatusWithinIndia": "Resident & Winter Migrant",
            "indiaChecklistCommonName": "Peregrine Falcon",
            "uniqueValue": 601,
            "endemicRegion": "None",
            "soibConcernStatus": "Low",
            "wpaSchedule": "Schedule-I",
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
            "indiaChecklistScientificName": "Psittacula himalayana",
            "migratoryStatusWithinIndia": "Resident & Altitudinal Migrant",
            "indiaChecklistCommonName": "Slaty-headed Parakeet",
            "uniqueValue": 604,
            "endemicRegion": "Indian Subcontinent",
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
            "indiaChecklistScientificName": "Pitta brachyura",
            "migratoryStatusWithinIndia": "Within-India Migrant",
            "indiaChecklistCommonName": "Indian Pitta",
            "uniqueValue": 618,
            "endemicRegion": "Indian Subcontinent",
            "soibConcernStatus": "Low",
            "wpaSchedule": "Schedule-II",
            "iucnCategory": "Least Concern"
        },
        {
            "indiaChecklistScientificName": "Pericrocotus cinnamomeus",
            "migratoryStatusWithinIndia": "Resident",
            "indiaChecklistCommonName": "Small Minivet",
            "uniqueValue": 623,
            "endemicRegion": "None",
            "soibConcernStatus": "Low",
            "wpaSchedule": "Schedule-I",
            "iucnCategory": "Least Concern"
        },
        {
            "indiaChecklistScientificName": "Pericrocotus ethologus",
            "migratoryStatusWithinIndia": "Resident & Within-India Migrant",
            "indiaChecklistCommonName": "Long-tailed Minivet",
            "uniqueValue": 626,
            "endemicRegion": "None",
            "soibConcernStatus": "Low",
            "wpaSchedule": "Schedule-II",
            "iucnCategory": "Least Concern"
        },
        {
            "indiaChecklistScientificName": "Pericrocotus speciosus",
            "migratoryStatusWithinIndia": "Resident",
            "indiaChecklistCommonName": "Scarlet Minivet",
            "uniqueValue": 628,
            "endemicRegion": "None",
            "soibConcernStatus": "Low",
            "wpaSchedule": "Schedule-II",
            "iucnCategory": "Not Recognised"
        },
        {
            "indiaChecklistScientificName": "Pteruthius aeralatus",
            "migratoryStatusWithinIndia": "Resident & Altitudinal Migrant",
            "indiaChecklistCommonName": "White-browed Shrike-babbler",
            "uniqueValue": 638,
            "endemicRegion": "None",
            "soibConcernStatus": "Low",
            "wpaSchedule": "Schedule-II",
            "iucnCategory": "Least Concern"
        },
        {
            "indiaChecklistScientificName": "Oriolus kundoo",
            "migratoryStatusWithinIndia": "Within-India Migrant",
            "indiaChecklistCommonName": "Indian Golden Oriole",
            "uniqueValue": 645,
            "endemicRegion": "None",
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
            "indiaChecklistScientificName": "Aegithina tiphia",
            "migratoryStatusWithinIndia": "Resident",
            "indiaChecklistCommonName": "Common Iora",
            "uniqueValue": 656,
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
            "indiaChecklistScientificName": "Rhipidura aureola",
            "migratoryStatusWithinIndia": "Resident & Altitudinal Migrant",
            "indiaChecklistCommonName": "White-browed Fantail",
            "uniqueValue": 660,
            "endemicRegion": "None",
            "soibConcernStatus": "Moderate",
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
            "indiaChecklistScientificName": "Dicrurus leucophaeus",
            "migratoryStatusWithinIndia": "Within-India Migrant",
            "indiaChecklistCommonName": "Ashy Drongo",
            "uniqueValue": 662,
            "endemicRegion": "None",
            "soibConcernStatus": "Low",
            "wpaSchedule": "Schedule-II",
            "iucnCategory": "Least Concern"
        },
        {
            "indiaChecklistScientificName": "Dicrurus hottentottus",
            "migratoryStatusWithinIndia": "Resident & Winter Migrant",
            "indiaChecklistCommonName": "Hair-crested Drongo",
            "uniqueValue": 667,
            "endemicRegion": "None",
            "soibConcernStatus": "Moderate",
            "wpaSchedule": "Schedule-II",
            "iucnCategory": "Least Concern"
        },
        {
            "indiaChecklistScientificName": "Terpsiphone paradisi",
            "migratoryStatusWithinIndia": "Resident & Within-India Migrant",
            "indiaChecklistCommonName": "Indian Paradise-flycatcher",
            "uniqueValue": 673,
            "endemicRegion": "None",
            "soibConcernStatus": "Low",
            "wpaSchedule": "Schedule-II",
            "iucnCategory": "Least Concern"
        },
        {
            "indiaChecklistScientificName": "Lanius isabellinus",
            "migratoryStatusWithinIndia": "Winter Migrant",
            "indiaChecklistCommonName": "Isabelline Shrike",
            "uniqueValue": 676,
            "endemicRegion": "None",
            "soibConcernStatus": "High",
            "wpaSchedule": "Schedule-II",
            "iucnCategory": "Least Concern"
        },
        {
            "indiaChecklistScientificName": "Lanius cristatus",
            "migratoryStatusWithinIndia": "Winter Migrant",
            "indiaChecklistCommonName": "Brown Shrike",
            "uniqueValue": 677,
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
            "indiaChecklistScientificName": "Garrulus glandarius",
            "migratoryStatusWithinIndia": "Resident & Altitudinal Migrant",
            "indiaChecklistCommonName": "Eurasian Jay",
            "uniqueValue": 686,
            "endemicRegion": "None",
            "soibConcernStatus": "Low",
            "wpaSchedule": "Schedule-II",
            "iucnCategory": "Least Concern"
        },
        {
            "indiaChecklistScientificName": "Garrulus lanceolatus",
            "migratoryStatusWithinIndia": "Resident & Altitudinal Migrant",
            "indiaChecklistCommonName": "Black-headed Jay",
            "uniqueValue": 687,
            "endemicRegion": "Western Himalayas",
            "soibConcernStatus": "Moderate",
            "wpaSchedule": "Schedule-II",
            "iucnCategory": "Least Concern"
        },
        {
            "indiaChecklistScientificName": "Urocissa flavirostris",
            "migratoryStatusWithinIndia": "Resident & Altitudinal Migrant",
            "indiaChecklistCommonName": "Yellow-billed Blue Magpie",
            "uniqueValue": 688,
            "endemicRegion": "Himalayas",
            "soibConcernStatus": "Low",
            "wpaSchedule": "Schedule-II",
            "iucnCategory": "Least Concern"
        },
        {
            "indiaChecklistScientificName": "Urocissa erythroryncha",
            "migratoryStatusWithinIndia": "Resident",
            "indiaChecklistCommonName": "Red-billed Blue Magpie",
            "uniqueValue": 689,
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
            "indiaChecklistScientificName": "Dendrocitta formosae",
            "migratoryStatusWithinIndia": "Resident",
            "indiaChecklistCommonName": "Grey Treepie",
            "uniqueValue": 692,
            "endemicRegion": "None",
            "soibConcernStatus": "Low",
            "wpaSchedule": "Schedule-II",
            "iucnCategory": "Least Concern"
        },
        {
            "indiaChecklistScientificName": "Pyrrhocorax pyrrhocorax",
            "migratoryStatusWithinIndia": "Resident & Altitudinal Migrant",
            "indiaChecklistCommonName": "Red-billed Chough",
            "uniqueValue": 700,
            "endemicRegion": "None",
            "soibConcernStatus": "Low",
            "wpaSchedule": "Schedule-II",
            "iucnCategory": "Least Concern"
        },
        {
            "indiaChecklistScientificName": "Pyrrhocorax graculus",
            "migratoryStatusWithinIndia": "Resident & Altitudinal Migrant",
            "indiaChecklistCommonName": "Yellow-billed Chough",
            "uniqueValue": 701,
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
            "indiaChecklistScientificName": "Corvus corax",
            "migratoryStatusWithinIndia": "Resident & Altitudinal Migrant",
            "indiaChecklistCommonName": "Common Raven",
            "uniqueValue": 709,
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
            "indiaChecklistScientificName": "Periparus ater",
            "migratoryStatusWithinIndia": "Resident & Altitudinal Migrant",
            "indiaChecklistCommonName": "Coal Tit",
            "uniqueValue": 715,
            "endemicRegion": "None",
            "soibConcernStatus": "Low",
            "wpaSchedule": "Schedule-II",
            "iucnCategory": "Least Concern"
        },
        {
            "indiaChecklistScientificName": "Periparus rufonuchalis",
            "migratoryStatusWithinIndia": "Resident & Altitudinal Migrant",
            "indiaChecklistCommonName": "Rufous-naped Tit",
            "uniqueValue": 716,
            "endemicRegion": "None",
            "soibConcernStatus": "Low",
            "wpaSchedule": "Schedule-II",
            "iucnCategory": "Least Concern"
        },
        {
            "indiaChecklistScientificName": "Parus monticolus",
            "migratoryStatusWithinIndia": "Resident & Altitudinal Migrant",
            "indiaChecklistCommonName": "Green-backed Tit",
            "uniqueValue": 721,
            "endemicRegion": "None",
            "soibConcernStatus": "Low",
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
            "indiaChecklistScientificName": "Machlolophus xanthogenys",
            "migratoryStatusWithinIndia": "Resident & Altitudinal Migrant",
            "indiaChecklistCommonName": "Himalayan Black-lored Tit",
            "uniqueValue": 724,
            "endemicRegion": "Himalayas",
            "soibConcernStatus": "Low",
            "wpaSchedule": "Schedule-II",
            "iucnCategory": "Least Concern"
        },
        {
            "indiaChecklistScientificName": "Remiz coronatus",
            "migratoryStatusWithinIndia": "Winter Migrant",
            "indiaChecklistCommonName": "White-crowned Penduline Tit",
            "uniqueValue": 727,
            "endemicRegion": "None",
            "soibConcernStatus": "NA",
            "wpaSchedule": "Schedule-II",
            "iucnCategory": "Least Concern"
        },
        {
            "indiaChecklistScientificName": "Eremopterix griseus",
            "migratoryStatusWithinIndia": "Resident",
            "indiaChecklistCommonName": "Ashy-crowned Sparrow Lark",
            "uniqueValue": 732,
            "endemicRegion": "Indian Subcontinent",
            "soibConcernStatus": "Moderate",
            "wpaSchedule": "Schedule-II",
            "iucnCategory": "Least Concern"
        },
        {
            "indiaChecklistScientificName": "Calandrella brachydactyla",
            "migratoryStatusWithinIndia": "Winter Migrant",
            "indiaChecklistCommonName": "Greater Short-toed Lark",
            "uniqueValue": 738,
            "endemicRegion": "None",
            "soibConcernStatus": "Moderate",
            "wpaSchedule": "Schedule-II",
            "iucnCategory": "Least Concern"
        },
        {
            "indiaChecklistScientificName": "Calandrella acutirostris",
            "migratoryStatusWithinIndia": "Winter Migrant & Localized Summer Migrant",
            "indiaChecklistCommonName": "Hume's Short-toed Lark",
            "uniqueValue": 740,
            "endemicRegion": "None",
            "soibConcernStatus": "Moderate",
            "wpaSchedule": "Schedule-II",
            "iucnCategory": "Least Concern"
        },
        {
            "indiaChecklistScientificName": "Melanocorypha bimaculata",
            "migratoryStatusWithinIndia": "Winter Migrant",
            "indiaChecklistCommonName": "Bimaculated Lark",
            "uniqueValue": 741,
            "endemicRegion": "None",
            "soibConcernStatus": "NA",
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
            "indiaChecklistScientificName": "Alauda arvensis",
            "migratoryStatusWithinIndia": "Winter Migrant & Localized Summer Migrant",
            "indiaChecklistCommonName": "Eurasian Skylark",
            "uniqueValue": 745,
            "endemicRegion": "None",
            "soibConcernStatus": "NA",
            "wpaSchedule": "Schedule-II",
            "iucnCategory": "Least Concern"
        },
        {
            "indiaChecklistScientificName": "Alauda gulgula",
            "migratoryStatusWithinIndia": "Resident & Local Migrant",
            "indiaChecklistCommonName": "Oriental Skylark",
            "uniqueValue": 746,
            "endemicRegion": "None",
            "soibConcernStatus": "High",
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
            "indiaChecklistScientificName": "Prinia crinigera",
            "migratoryStatusWithinIndia": "Resident & Altitudinal Migrant",
            "indiaChecklistCommonName": "Himalayan Prinia",
            "uniqueValue": 752,
            "endemicRegion": "None",
            "soibConcernStatus": "Low",
            "wpaSchedule": "Schedule-II",
            "iucnCategory": "Least Concern"
        },
        {
            "indiaChecklistScientificName": "Prinia hodgsonii",
            "migratoryStatusWithinIndia": "Resident",
            "indiaChecklistCommonName": "Grey-breasted Prinia",
            "uniqueValue": 759,
            "endemicRegion": "None",
            "soibConcernStatus": "Low",
            "wpaSchedule": "Schedule-II",
            "iucnCategory": "Least Concern"
        },
        {
            "indiaChecklistScientificName": "Prinia sylvatica",
            "migratoryStatusWithinIndia": "Resident",
            "indiaChecklistCommonName": "Jungle Prinia",
            "uniqueValue": 761,
            "endemicRegion": "Indian Subcontinent",
            "soibConcernStatus": "Low",
            "wpaSchedule": "Schedule-II",
            "iucnCategory": "Least Concern"
        },
        {
            "indiaChecklistScientificName": "Prinia flaviventris",
            "migratoryStatusWithinIndia": "Resident",
            "indiaChecklistCommonName": "Yellow-bellied Prinia",
            "uniqueValue": 762,
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
            "indiaChecklistScientificName": "Prinia inornata",
            "migratoryStatusWithinIndia": "Resident",
            "indiaChecklistCommonName": "Plain Prinia",
            "uniqueValue": 764,
            "endemicRegion": "None",
            "soibConcernStatus": "Low",
            "wpaSchedule": "Schedule-II",
            "iucnCategory": "Least Concern"
        },
        {
            "indiaChecklistScientificName": "Cisticola juncidis",
            "migratoryStatusWithinIndia": "Resident",
            "indiaChecklistCommonName": "Zitting Cisticola",
            "uniqueValue": 765,
            "endemicRegion": "None",
            "soibConcernStatus": "Low",
            "wpaSchedule": "Schedule-II",
            "iucnCategory": "Least Concern"
        },
        {
            "indiaChecklistScientificName": "Iduna caligata",
            "migratoryStatusWithinIndia": "Winter Migrant",
            "indiaChecklistCommonName": "Booted Warbler",
            "uniqueValue": 768,
            "endemicRegion": "None",
            "soibConcernStatus": "Low",
            "wpaSchedule": "Schedule-II",
            "iucnCategory": "Least Concern"
        },
        {
            "indiaChecklistScientificName": "Acrocephalus melanopogon",
            "migratoryStatusWithinIndia": "Winter Migrant",
            "indiaChecklistCommonName": "Moustached Warbler",
            "uniqueValue": 771,
            "endemicRegion": "None",
            "soibConcernStatus": "NA",
            "wpaSchedule": "Schedule-II",
            "iucnCategory": "Least Concern"
        },
        {
            "indiaChecklistScientificName": "Acrocephalus dumetorum",
            "migratoryStatusWithinIndia": "Winter Migrant",
            "indiaChecklistCommonName": "Blyth's Reed Warbler",
            "uniqueValue": 775,
            "endemicRegion": "None",
            "soibConcernStatus": "Low",
            "wpaSchedule": "Schedule-II",
            "iucnCategory": "Least Concern"
        },
        {
            "indiaChecklistScientificName": "Acrocephalus stentoreus",
            "migratoryStatusWithinIndia": "Resident & Winter Migrant",
            "indiaChecklistCommonName": "Clamorous Reed Warbler",
            "uniqueValue": 779,
            "endemicRegion": "None",
            "soibConcernStatus": "Low",
            "wpaSchedule": "Schedule-II",
            "iucnCategory": "Least Concern"
        },
        {
            "indiaChecklistScientificName": "Locustella kashmirensis",
            "migratoryStatusWithinIndia": "Within-India Migrant",
            "indiaChecklistCommonName": "West Himalayan Bush Warbler",
            "uniqueValue": 787,
            "endemicRegion": "Western Himalayas",
            "soibConcernStatus": "Moderate",
            "wpaSchedule": "Schedule-I",
            "iucnCategory": "Least Concern"
        },
        {
            "indiaChecklistScientificName": "Megalurus palustris",
            "migratoryStatusWithinIndia": "Resident",
            "indiaChecklistCommonName": "Striated Grassbird",
            "uniqueValue": 792,
            "endemicRegion": "None",
            "soibConcernStatus": "Low",
            "wpaSchedule": "Schedule-II",
            "iucnCategory": "Least Concern"
        },
        {
            "indiaChecklistScientificName": "Pnoepyga albiventer",
            "migratoryStatusWithinIndia": "Resident & Altitudinal Migrant",
            "indiaChecklistCommonName": "Scaly-breasted Wren Babbler",
            "uniqueValue": 793,
            "endemicRegion": "None",
            "soibConcernStatus": "Low",
            "wpaSchedule": "Schedule-II",
            "iucnCategory": "Least Concern"
        },
        {
            "indiaChecklistScientificName": "Pnoepyga immaculata",
            "migratoryStatusWithinIndia": "Resident & Altitudinal Migrant",
            "indiaChecklistCommonName": "Nepal Wren Babbler",
            "uniqueValue": 794,
            "endemicRegion": "Himalayas",
            "soibConcernStatus": "Moderate",
            "wpaSchedule": "Schedule-II",
            "iucnCategory": "Least Concern"
        },
        {
            "indiaChecklistScientificName": "Riparia chinensis",
            "migratoryStatusWithinIndia": "Resident",
            "indiaChecklistCommonName": "Grey-throated Martin",
            "uniqueValue": 796,
            "endemicRegion": "None",
            "soibConcernStatus": "Moderate",
            "wpaSchedule": "Schedule-II",
            "iucnCategory": "Least Concern"
        },
        {
            "indiaChecklistScientificName": "Riparia diluta",
            "migratoryStatusWithinIndia": "Resident & Winter Migrant",
            "indiaChecklistCommonName": "Pale Martin",
            "uniqueValue": 798,
            "endemicRegion": "None",
            "soibConcernStatus": "NA",
            "wpaSchedule": "Schedule-II",
            "iucnCategory": "Least Concern"
        },
        {
            "indiaChecklistScientificName": "Ptyonoprogne rupestris",
            "migratoryStatusWithinIndia": "Summer Migrant & Winter Migrant",
            "indiaChecklistCommonName": "Eurasian Crag Martin",
            "uniqueValue": 799,
            "endemicRegion": "None",
            "soibConcernStatus": "High",
            "wpaSchedule": "Schedule-II",
            "iucnCategory": "Least Concern"
        },
        {
            "indiaChecklistScientificName": "Hirundo rustica",
            "migratoryStatusWithinIndia": "Within-India Migrant & Winter Migrant",
            "indiaChecklistCommonName": "Barn Swallow",
            "uniqueValue": 801,
            "endemicRegion": "None",
            "soibConcernStatus": "Moderate",
            "wpaSchedule": "Schedule-II",
            "iucnCategory": "Least Concern"
        },
        {
            "indiaChecklistScientificName": "Hirundo smithii",
            "migratoryStatusWithinIndia": "Resident",
            "indiaChecklistCommonName": "Wire-tailed Swallow",
            "uniqueValue": 802,
            "endemicRegion": "None",
            "soibConcernStatus": "Low",
            "wpaSchedule": "Schedule-II",
            "iucnCategory": "Least Concern"
        },
        {
            "indiaChecklistScientificName": "Cecropis daurica",
            "migratoryStatusWithinIndia": "Resident & Winter Migrant",
            "indiaChecklistCommonName": "Red-rumped Swallow",
            "uniqueValue": 805,
            "endemicRegion": "None",
            "soibConcernStatus": "Low",
            "wpaSchedule": "Schedule-II",
            "iucnCategory": "Least Concern"
        },
        {
            "indiaChecklistScientificName": "Petrochelidon fluvicola",
            "migratoryStatusWithinIndia": "Local Migrant",
            "indiaChecklistCommonName": "Streak-throated Swallow",
            "uniqueValue": 807,
            "endemicRegion": "None",
            "soibConcernStatus": "Low",
            "wpaSchedule": "Schedule-II",
            "iucnCategory": "Least Concern"
        },
        {
            "indiaChecklistScientificName": "Delichon dasypus",
            "migratoryStatusWithinIndia": "Winter Migrant & Localized Summer Migrant",
            "indiaChecklistCommonName": "Asian House Martin",
            "uniqueValue": 809,
            "endemicRegion": "None",
            "soibConcernStatus": "Moderate",
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
            "indiaChecklistScientificName": "Hypsipetes leucocephalus",
            "migratoryStatusWithinIndia": "Resident & Altitudinal Migrant",
            "indiaChecklistCommonName": "Black Bulbul",
            "uniqueValue": 829,
            "endemicRegion": "None",
            "soibConcernStatus": "Low",
            "wpaSchedule": "Schedule-II",
            "iucnCategory": "Least Concern"
        },
        {
            "indiaChecklistScientificName": "Phylloscopus maculipennis",
            "migratoryStatusWithinIndia": "Resident & Altitudinal Migrant",
            "indiaChecklistCommonName": "Ashy-throated Warbler",
            "uniqueValue": 835,
            "endemicRegion": "None",
            "soibConcernStatus": "Moderate",
            "wpaSchedule": "Schedule-II",
            "iucnCategory": "Least Concern"
        },
        {
            "indiaChecklistScientificName": "Phylloscopus pulcher",
            "migratoryStatusWithinIndia": "Resident & Altitudinal Migrant",
            "indiaChecklistCommonName": "Buff-barred Warbler",
            "uniqueValue": 836,
            "endemicRegion": "None",
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
            "indiaChecklistScientificName": "Phylloscopus tytleri",
            "migratoryStatusWithinIndia": "Within-India Migrant",
            "indiaChecklistCommonName": "Tytler's Leaf Warbler",
            "uniqueValue": 844,
            "endemicRegion": "None",
            "soibConcernStatus": "Moderate",
            "wpaSchedule": "Schedule-II",
            "iucnCategory": "Least Concern"
        },
        {
            "indiaChecklistScientificName": "Phylloscopus griseolus",
            "migratoryStatusWithinIndia": "Within-India Migrant",
            "indiaChecklistCommonName": "Sulphur-bellied Warbler",
            "uniqueValue": 845,
            "endemicRegion": "None",
            "soibConcernStatus": "High",
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
            "indiaChecklistScientificName": "Phylloscopus sindianus",
            "migratoryStatusWithinIndia": "Local Migrant",
            "indiaChecklistCommonName": "Mountain Chiffchaff",
            "uniqueValue": 852,
            "endemicRegion": "None",
            "soibConcernStatus": "NA",
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
            "indiaChecklistScientificName": "Phylloscopus whistleri",
            "migratoryStatusWithinIndia": "Resident & Local Migrant",
            "indiaChecklistCommonName": "Whistler's Warbler",
            "uniqueValue": 858,
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
            "indiaChecklistScientificName": "Phylloscopus occipitalis",
            "migratoryStatusWithinIndia": "Within-India Migrant",
            "indiaChecklistCommonName": "Western Crowned Warbler",
            "uniqueValue": 868,
            "endemicRegion": "None",
            "soibConcernStatus": "Moderate",
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
            "indiaChecklistScientificName": "Cettia brunnifrons",
            "migratoryStatusWithinIndia": "Resident & Altitudinal Migrant",
            "indiaChecklistCommonName": "Grey-sided Bush Warbler",
            "uniqueValue": 877,
            "endemicRegion": "None",
            "soibConcernStatus": "Low",
            "wpaSchedule": "Schedule-II",
            "iucnCategory": "Least Concern"
        },
        {
            "indiaChecklistScientificName": "Cettia castaneocoronata",
            "migratoryStatusWithinIndia": "Altitudinal Migrant",
            "indiaChecklistCommonName": "Chestnut-headed Tesia",
            "uniqueValue": 878,
            "endemicRegion": "None",
            "soibConcernStatus": "Low",
            "wpaSchedule": "Schedule-II",
            "iucnCategory": "Least Concern"
        },
        {
            "indiaChecklistScientificName": "Cettia cetti",
            "migratoryStatusWithinIndia": "Winter Migrant",
            "indiaChecklistCommonName": "Cetti's Warbler",
            "uniqueValue": 879,
            "endemicRegion": "None",
            "soibConcernStatus": "NA",
            "wpaSchedule": "Schedule-II",
            "iucnCategory": "Least Concern"
        },
        {
            "indiaChecklistScientificName": "Horornis fortipes",
            "migratoryStatusWithinIndia": "Altitudinal Migrant",
            "indiaChecklistCommonName": "Brownish-flanked Bush Warbler",
            "uniqueValue": 886,
            "endemicRegion": "None",
            "soibConcernStatus": "Low",
            "wpaSchedule": "Schedule-II",
            "iucnCategory": "Least Concern"
        },
        {
            "indiaChecklistScientificName": "Horornis flavolivaceus",
            "migratoryStatusWithinIndia": "Altitudinal Migrant",
            "indiaChecklistCommonName": "Aberrant Bush Warbler",
            "uniqueValue": 888,
            "endemicRegion": "None",
            "soibConcernStatus": "Low",
            "wpaSchedule": "Schedule-II",
            "iucnCategory": "Least Concern"
        },
        {
            "indiaChecklistScientificName": "Aegithalos concinnus",
            "migratoryStatusWithinIndia": "Resident & Altitudinal Migrant",
            "indiaChecklistCommonName": "Black-throated Tit",
            "uniqueValue": 892,
            "endemicRegion": "None",
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
            "indiaChecklistScientificName": "Curruca crassirostris",
            "migratoryStatusWithinIndia": "Winter Migrant",
            "indiaChecklistCommonName": "Eastern Orphean Warbler",
            "uniqueValue": 899,
            "endemicRegion": "None",
            "soibConcernStatus": "Low",
            "wpaSchedule": "Schedule-II",
            "iucnCategory": "Least Concern"
        },
        {
            "indiaChecklistScientificName": "Curruca nana",
            "migratoryStatusWithinIndia": "Winter Migrant",
            "indiaChecklistCommonName": "Asian Desert Warbler",
            "uniqueValue": 900,
            "endemicRegion": "None",
            "soibConcernStatus": "NA",
            "wpaSchedule": "Schedule-II",
            "iucnCategory": "Least Concern"
        },
        {
            "indiaChecklistScientificName": "Curruca communis",
            "migratoryStatusWithinIndia": "Passage Migrant",
            "indiaChecklistCommonName": "Common Whitethroat",
            "uniqueValue": 901,
            "endemicRegion": "None",
            "soibConcernStatus": "NA",
            "wpaSchedule": "Schedule-II",
            "iucnCategory": "Least Concern"
        },
        {
            "indiaChecklistScientificName": "Chrysomma sinense",
            "migratoryStatusWithinIndia": "Resident",
            "indiaChecklistCommonName": "Yellow-eyed Babbler",
            "uniqueValue": 904,
            "endemicRegion": "None",
            "soibConcernStatus": "Low",
            "wpaSchedule": "Schedule-II",
            "iucnCategory": "Least Concern"
        },
        {
            "indiaChecklistScientificName": "Fulvetta vinipectus",
            "migratoryStatusWithinIndia": "Resident & Altitudinal Migrant",
            "indiaChecklistCommonName": "White-browed Fulvetta",
            "uniqueValue": 907,
            "endemicRegion": "None",
            "soibConcernStatus": "Moderate",
            "wpaSchedule": "Schedule-II",
            "iucnCategory": "Least Concern"
        },
        {
            "indiaChecklistScientificName": "Yuhina flavicollis",
            "migratoryStatusWithinIndia": "Resident & Altitudinal Migrant",
            "indiaChecklistCommonName": "Whiskered Yuhina",
            "uniqueValue": 921,
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
            "indiaChecklistScientificName": "Cyanoderma pyrrhops",
            "migratoryStatusWithinIndia": "Resident",
            "indiaChecklistCommonName": "Black-chinned Babbler",
            "uniqueValue": 932,
            "endemicRegion": "Himalayas",
            "soibConcernStatus": "Low",
            "wpaSchedule": "Schedule-II",
            "iucnCategory": "Least Concern"
        },
        {
            "indiaChecklistScientificName": "Pomatorhinus schisticeps",
            "migratoryStatusWithinIndia": "Resident",
            "indiaChecklistCommonName": "White-browed Scimitar Babbler",
            "uniqueValue": 946,
            "endemicRegion": "None",
            "soibConcernStatus": "Low",
            "wpaSchedule": "Schedule-II",
            "iucnCategory": "Least Concern"
        },
        {
            "indiaChecklistScientificName": "Erythrogenys erythrogenys",
            "migratoryStatusWithinIndia": "Resident",
            "indiaChecklistCommonName": "Rusty-cheeked Scimitar Babbler",
            "uniqueValue": 949,
            "endemicRegion": "None",
            "soibConcernStatus": "Low",
            "wpaSchedule": "Schedule-II",
            "iucnCategory": "Least Concern"
        },
        {
            "indiaChecklistScientificName": "Pellorneum ruficeps",
            "migratoryStatusWithinIndia": "Resident",
            "indiaChecklistCommonName": "Puff-throated Babbler",
            "uniqueValue": 961,
            "endemicRegion": "None",
            "soibConcernStatus": "Low",
            "wpaSchedule": "Schedule-II",
            "iucnCategory": "Least Concern"
        },
        {
            "indiaChecklistScientificName": "Grammatoptila striata",
            "migratoryStatusWithinIndia": "Resident",
            "indiaChecklistCommonName": "Striated Laughingthrush",
            "uniqueValue": 973,
            "endemicRegion": "Himalayas",
            "soibConcernStatus": "Low",
            "wpaSchedule": "Schedule-II",
            "iucnCategory": "Least Concern"
        },
        {
            "indiaChecklistScientificName": "Trochalopteron lineatum",
            "migratoryStatusWithinIndia": "Resident & Altitudinal Migrant",
            "indiaChecklistCommonName": "Streaked Laughingthrush",
            "uniqueValue": 978,
            "endemicRegion": "Himalayas",
            "soibConcernStatus": "Low",
            "wpaSchedule": "Schedule-II",
            "iucnCategory": "Least Concern"
        },
        {
            "indiaChecklistScientificName": "Trochalopteron variegatum",
            "migratoryStatusWithinIndia": "Resident & Altitudinal Migrant",
            "indiaChecklistCommonName": "Variegated Laughingthrush",
            "uniqueValue": 981,
            "endemicRegion": "Himalayas",
            "soibConcernStatus": "Low",
            "wpaSchedule": "Schedule-II",
            "iucnCategory": "Least Concern"
        },
        {
            "indiaChecklistScientificName": "Trochalopteron erythrocephalum",
            "migratoryStatusWithinIndia": "Resident & Altitudinal Migrant",
            "indiaChecklistCommonName": "Chestnut-crowned Laughingthrush",
            "uniqueValue": 984,
            "endemicRegion": "Himalayas",
            "soibConcernStatus": "Low",
            "wpaSchedule": "Schedule-II",
            "iucnCategory": "Least Concern"
        },
        {
            "indiaChecklistScientificName": "Heterophasia capistrata",
            "migratoryStatusWithinIndia": "Resident & Altitudinal Migrant",
            "indiaChecklistCommonName": "Rufous Sibia",
            "uniqueValue": 991,
            "endemicRegion": "Himalayas",
            "soibConcernStatus": "Low",
            "wpaSchedule": "Schedule-II",
            "iucnCategory": "Least Concern"
        },
        {
            "indiaChecklistScientificName": "Actinodura strigula",
            "migratoryStatusWithinIndia": "Resident & Altitudinal Migrant",
            "indiaChecklistCommonName": "Chestnut-tailed Minla",
            "uniqueValue": 997,
            "endemicRegion": "None",
            "soibConcernStatus": "Low",
            "wpaSchedule": "Schedule-II",
            "iucnCategory": "Least Concern"
        },
        {
            "indiaChecklistScientificName": "Minla ignotincta",
            "migratoryStatusWithinIndia": "Resident & Altitudinal Migrant",
            "indiaChecklistCommonName": "Red-tailed Minla",
            "uniqueValue": 1001,
            "endemicRegion": "None",
            "soibConcernStatus": "Low",
            "wpaSchedule": "Schedule-II",
            "iucnCategory": "Least Concern"
        },
        {
            "indiaChecklistScientificName": "Argya malcolmi",
            "migratoryStatusWithinIndia": "Resident",
            "indiaChecklistCommonName": "Large Grey Babbler",
            "uniqueValue": 1005,
            "endemicRegion": "Indian Subcontinent",
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
            "indiaChecklistScientificName": "Argya earlei",
            "migratoryStatusWithinIndia": "Resident",
            "indiaChecklistCommonName": "Striated Babbler",
            "uniqueValue": 1011,
            "endemicRegion": "None",
            "soibConcernStatus": "Low",
            "wpaSchedule": "Schedule-II",
            "iucnCategory": "Least Concern"
        },
        {
            "indiaChecklistScientificName": "Regulus regulus",
            "migratoryStatusWithinIndia": "Resident & Altitudinal Migrant",
            "indiaChecklistCommonName": "Goldcrest",
            "uniqueValue": 1028,
            "endemicRegion": "None",
            "soibConcernStatus": "Low",
            "wpaSchedule": "Schedule-II",
            "iucnCategory": "Least Concern"
        },
        {
            "indiaChecklistScientificName": "Tichodroma muraria",
            "migratoryStatusWithinIndia": "Winter Migrant & Localized Summer Migrant",
            "indiaChecklistCommonName": "Wallcreeper",
            "uniqueValue": 1029,
            "endemicRegion": "None",
            "soibConcernStatus": "High",
            "wpaSchedule": "Schedule-II",
            "iucnCategory": "Least Concern"
        },
        {
            "indiaChecklistScientificName": "Sitta himalayensis",
            "migratoryStatusWithinIndia": "Resident",
            "indiaChecklistCommonName": "White-tailed Nuthatch",
            "uniqueValue": 1034,
            "endemicRegion": "Himalayas",
            "soibConcernStatus": "Low",
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
            "indiaChecklistScientificName": "Troglodytes troglodytes",
            "migratoryStatusWithinIndia": "Resident & Altitudinal Migrant",
            "indiaChecklistCommonName": "Eurasian Wren",
            "uniqueValue": 1045,
            "endemicRegion": "None",
            "soibConcernStatus": "Low",
            "wpaSchedule": "Schedule-II",
            "iucnCategory": "Least Concern"
        },
        {
            "indiaChecklistScientificName": "Cinclus pallasii",
            "migratoryStatusWithinIndia": "Resident & Altitudinal Migrant",
            "indiaChecklistCommonName": "Brown Dipper",
            "uniqueValue": 1048,
            "endemicRegion": "None",
            "soibConcernStatus": "High",
            "wpaSchedule": "Schedule-II",
            "iucnCategory": "Least Concern"
        },
        {
            "indiaChecklistScientificName": "Sturnus vulgaris",
            "migratoryStatusWithinIndia": "Winter Migrant & Localized Summer Migrant",
            "indiaChecklistCommonName": "Common Starling",
            "uniqueValue": 1053,
            "endemicRegion": "None",
            "soibConcernStatus": "Moderate",
            "wpaSchedule": "Schedule-II",
            "iucnCategory": "Least Concern"
        },
        {
            "indiaChecklistScientificName": "Pastor roseus",
            "migratoryStatusWithinIndia": "Winter Migrant",
            "indiaChecklistCommonName": "Rosy Starling",
            "uniqueValue": 1054,
            "endemicRegion": "None",
            "soibConcernStatus": "Moderate",
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
            "indiaChecklistScientificName": "Sturnia malabarica",
            "migratoryStatusWithinIndia": "Resident & Within-India Migrant",
            "indiaChecklistCommonName": "Chestnut-tailed Starling",
            "uniqueValue": 1060,
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
            "indiaChecklistScientificName": "Zoothera dixoni",
            "migratoryStatusWithinIndia": "Resident & Winter Migrant",
            "indiaChecklistCommonName": "Long-tailed Thrush",
            "uniqueValue": 1072,
            "endemicRegion": "None",
            "soibConcernStatus": "NA",
            "wpaSchedule": "Schedule-II",
            "iucnCategory": "Least Concern"
        },
        {
            "indiaChecklistScientificName": "Geokichla citrina",
            "migratoryStatusWithinIndia": "Resident & Within-India Migrant",
            "indiaChecklistCommonName": "Orange-headed Thrush",
            "uniqueValue": 1083,
            "endemicRegion": "None",
            "soibConcernStatus": "Moderate",
            "wpaSchedule": "Schedule-II",
            "iucnCategory": "Least Concern"
        },
        {
            "indiaChecklistScientificName": "Turdus boulboul",
            "migratoryStatusWithinIndia": "Resident & Altitudinal Migrant",
            "indiaChecklistCommonName": "Grey-winged Blackbird",
            "uniqueValue": 1088,
            "endemicRegion": "None",
            "soibConcernStatus": "Low",
            "wpaSchedule": "Schedule-II",
            "iucnCategory": "Least Concern"
        },
        {
            "indiaChecklistScientificName": "Turdus unicolor",
            "migratoryStatusWithinIndia": "Within-India Migrant",
            "indiaChecklistCommonName": "Tickell's Thrush",
            "uniqueValue": 1091,
            "endemicRegion": "Indian Subcontinent",
            "soibConcernStatus": "Low",
            "wpaSchedule": "Schedule-II",
            "iucnCategory": "Least Concern"
        },
        {
            "indiaChecklistScientificName": "Turdus albocinctus",
            "migratoryStatusWithinIndia": "Resident & Altitudinal Migrant",
            "indiaChecklistCommonName": "White-collared Blackbird",
            "uniqueValue": 1098,
            "endemicRegion": "Himalayas",
            "soibConcernStatus": "Moderate",
            "wpaSchedule": "Schedule-II",
            "iucnCategory": "Least Concern"
        },
        {
            "indiaChecklistScientificName": "Turdus rubrocanus",
            "migratoryStatusWithinIndia": "Resident & Altitudinal Migrant",
            "indiaChecklistCommonName": "Chestnut Thrush",
            "uniqueValue": 1099,
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
            "indiaChecklistScientificName": "Muscicapa sibirica",
            "migratoryStatusWithinIndia": "Summer Migrant",
            "indiaChecklistCommonName": "Dark-sided Flycatcher",
            "uniqueValue": 1104,
            "endemicRegion": "None",
            "soibConcernStatus": "Low",
            "wpaSchedule": "Schedule-II",
            "iucnCategory": "Least Concern"
        },
        {
            "indiaChecklistScientificName": "Muscicapa striata",
            "migratoryStatusWithinIndia": "Passage Migrant",
            "indiaChecklistCommonName": "Spotted Flycatcher",
            "uniqueValue": 1108,
            "endemicRegion": "None",
            "soibConcernStatus": "NA",
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
            "indiaChecklistScientificName": "Cyornis rubeculoides",
            "migratoryStatusWithinIndia": "Within-India Migrant",
            "indiaChecklistCommonName": "Blue-throated Flycatcher",
            "uniqueValue": 1121,
            "endemicRegion": "None",
            "soibConcernStatus": "Low",
            "wpaSchedule": "Schedule-II",
            "iucnCategory": "Least Concern"
        },
        {
            "indiaChecklistScientificName": "Niltava sundara",
            "migratoryStatusWithinIndia": "Resident & Altitudinal Migrant",
            "indiaChecklistCommonName": "Rufous-bellied Niltava",
            "uniqueValue": 1128,
            "endemicRegion": "None",
            "soibConcernStatus": "Low",
            "wpaSchedule": "Schedule-II",
            "iucnCategory": "Least Concern"
        },
        {
            "indiaChecklistScientificName": "Eumyias thalassinus",
            "migratoryStatusWithinIndia": "Within-India Migrant & Winter Migrant",
            "indiaChecklistCommonName": "Verditer Flycatcher",
            "uniqueValue": 1133,
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
            "indiaChecklistScientificName": "Enicurus scouleri",
            "migratoryStatusWithinIndia": "Resident & Altitudinal Migrant",
            "indiaChecklistCommonName": "Little Forktail",
            "uniqueValue": 1144,
            "endemicRegion": "None",
            "soibConcernStatus": "Moderate",
            "wpaSchedule": "Schedule-II",
            "iucnCategory": "Least Concern"
        },
        {
            "indiaChecklistScientificName": "Enicurus maculatus",
            "migratoryStatusWithinIndia": "Resident & Altitudinal Migrant",
            "indiaChecklistCommonName": "Spotted Forktail",
            "uniqueValue": 1146,
            "endemicRegion": "None",
            "soibConcernStatus": "Low",
            "wpaSchedule": "Schedule-II",
            "iucnCategory": "Least Concern"
        },
        {
            "indiaChecklistScientificName": "Calliope pectoralis",
            "migratoryStatusWithinIndia": "Local Migrant",
            "indiaChecklistCommonName": "Himalayan Rubythroat",
            "uniqueValue": 1151,
            "endemicRegion": "None",
            "soibConcernStatus": "Low",
            "wpaSchedule": "Schedule-II",
            "iucnCategory": "Least Concern"
        },
        {
            "indiaChecklistScientificName": "Tarsiger rufilatus",
            "migratoryStatusWithinIndia": "Resident & Local Migrant",
            "indiaChecklistCommonName": "Himalayan Bush Robin",
            "uniqueValue": 1156,
            "endemicRegion": "None",
            "soibConcernStatus": "Low",
            "wpaSchedule": "Schedule-II",
            "iucnCategory": "Least Concern"
        },
        {
            "indiaChecklistScientificName": "Tarsiger indicus",
            "migratoryStatusWithinIndia": "Resident & Altitudinal Migrant",
            "indiaChecklistCommonName": "White-browed Bush Robin",
            "uniqueValue": 1158,
            "endemicRegion": "None",
            "soibConcernStatus": "Moderate",
            "wpaSchedule": "Schedule-II",
            "iucnCategory": "Least Concern"
        },
        {
            "indiaChecklistScientificName": "Tarsiger chrysaeus",
            "migratoryStatusWithinIndia": "Resident & Altitudinal Migrant",
            "indiaChecklistCommonName": "Golden Bush Robin",
            "uniqueValue": 1159,
            "endemicRegion": "None",
            "soibConcernStatus": "Low",
            "wpaSchedule": "Schedule-II",
            "iucnCategory": "Least Concern"
        },
        {
            "indiaChecklistScientificName": "Ficedula tricolor",
            "migratoryStatusWithinIndia": "Resident & Altitudinal Migrant",
            "indiaChecklistCommonName": "Slaty-blue Flycatcher",
            "uniqueValue": 1164,
            "endemicRegion": "None",
            "soibConcernStatus": "Low",
            "wpaSchedule": "Schedule-II",
            "iucnCategory": "Least Concern"
        },
        {
            "indiaChecklistScientificName": "Ficedula strophiata",
            "migratoryStatusWithinIndia": "Resident & Altitudinal Migrant",
            "indiaChecklistCommonName": "Rufous-gorgeted Flycatcher",
            "uniqueValue": 1167,
            "endemicRegion": "None",
            "soibConcernStatus": "High",
            "wpaSchedule": "Schedule-II",
            "iucnCategory": "Least Concern"
        },
        {
            "indiaChecklistScientificName": "Ficedula superciliaris",
            "migratoryStatusWithinIndia": "Within-India Migrant",
            "indiaChecklistCommonName": "Ultramarine Flycatcher",
            "uniqueValue": 1170,
            "endemicRegion": "None",
            "soibConcernStatus": "Low",
            "wpaSchedule": "Schedule-II",
            "iucnCategory": "Least Concern"
        },
        {
            "indiaChecklistScientificName": "Ficedula ruficauda",
            "migratoryStatusWithinIndia": "Within-India Migrant",
            "indiaChecklistCommonName": "Rusty-tailed Flycatcher",
            "uniqueValue": 1171,
            "endemicRegion": "None",
            "soibConcernStatus": "Moderate",
            "wpaSchedule": "Schedule-II",
            "iucnCategory": "Least Concern"
        },
        {
            "indiaChecklistScientificName": "Ficedula parva",
            "migratoryStatusWithinIndia": "Winter Migrant",
            "indiaChecklistCommonName": "Red-breasted Flycatcher",
            "uniqueValue": 1174,
            "endemicRegion": "None",
            "soibConcernStatus": "Low",
            "wpaSchedule": "Schedule-II",
            "iucnCategory": "Least Concern"
        },
        {
            "indiaChecklistScientificName": "Phoenicurus frontalis",
            "migratoryStatusWithinIndia": "Resident & Altitudinal Migrant",
            "indiaChecklistCommonName": "Blue-fronted Redstart",
            "uniqueValue": 1175,
            "endemicRegion": "None",
            "soibConcernStatus": "Moderate",
            "wpaSchedule": "Schedule-II",
            "iucnCategory": "Least Concern"
        },
        {
            "indiaChecklistScientificName": "Phoenicurus fuliginosus",
            "migratoryStatusWithinIndia": "Resident & Local Migrant",
            "indiaChecklistCommonName": "Plumbeous Water Redstart",
            "uniqueValue": 1176,
            "endemicRegion": "None",
            "soibConcernStatus": "High",
            "wpaSchedule": "Schedule-II",
            "iucnCategory": "Least Concern"
        },
        {
            "indiaChecklistScientificName": "Phoenicurus leucocephalus",
            "migratoryStatusWithinIndia": "Resident & Within-India Migrant",
            "indiaChecklistCommonName": "White-capped Redstart",
            "uniqueValue": 1178,
            "endemicRegion": "None",
            "soibConcernStatus": "Moderate",
            "wpaSchedule": "Schedule-II",
            "iucnCategory": "Least Concern"
        },
        {
            "indiaChecklistScientificName": "Phoenicurus coeruleocephala",
            "migratoryStatusWithinIndia": "Resident & Altitudinal Migrant",
            "indiaChecklistCommonName": "Blue-capped Redstart",
            "uniqueValue": 1179,
            "endemicRegion": "None",
            "soibConcernStatus": "Moderate",
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
            "indiaChecklistScientificName": "Monticola rufiventris",
            "migratoryStatusWithinIndia": "Resident & Altitudinal Migrant",
            "indiaChecklistCommonName": "Chestnut-bellied Rock Thrush",
            "uniqueValue": 1186,
            "endemicRegion": "None",
            "soibConcernStatus": "Moderate",
            "wpaSchedule": "Schedule-II",
            "iucnCategory": "Least Concern"
        },
        {
            "indiaChecklistScientificName": "Monticola cinclorhyncha",
            "migratoryStatusWithinIndia": "Within-India Migrant",
            "indiaChecklistCommonName": "Blue-capped Rock Thrush",
            "uniqueValue": 1187,
            "endemicRegion": "None",
            "soibConcernStatus": "High",
            "wpaSchedule": "Schedule-II",
            "iucnCategory": "Least Concern"
        },
        {
            "indiaChecklistScientificName": "Monticola solitarius",
            "migratoryStatusWithinIndia": "Winter Migrant & Localized Summer Migrant",
            "indiaChecklistCommonName": "Blue Rock Thrush",
            "uniqueValue": 1189,
            "endemicRegion": "None",
            "soibConcernStatus": "High",
            "wpaSchedule": "Schedule-II",
            "iucnCategory": "Least Concern"
        },
        {
            "indiaChecklistScientificName": "Saxicola maurus",
            "migratoryStatusWithinIndia": "Winter Migrant & Localized Summer Migrant",
            "indiaChecklistCommonName": "Siberian Stonechat",
            "uniqueValue": 1193,
            "endemicRegion": "None",
            "soibConcernStatus": "Low",
            "wpaSchedule": "Schedule-II",
            "iucnCategory": "Least Concern"
        },
        {
            "indiaChecklistScientificName": "Saxicola leucurus",
            "migratoryStatusWithinIndia": "Resident",
            "indiaChecklistCommonName": "White-tailed Stonechat",
            "uniqueValue": 1195,
            "endemicRegion": "None",
            "soibConcernStatus": "Low",
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
            "indiaChecklistScientificName": "Oenanthe isabellina",
            "migratoryStatusWithinIndia": "Winter Migrant",
            "indiaChecklistCommonName": "Isabelline Wheatear",
            "uniqueValue": 1200,
            "endemicRegion": "None",
            "soibConcernStatus": "High",
            "wpaSchedule": "Schedule-II",
            "iucnCategory": "Least Concern"
        },
        {
            "indiaChecklistScientificName": "Oenanthe deserti",
            "migratoryStatusWithinIndia": "Winter Migrant & Localized Summer Migrant",
            "indiaChecklistCommonName": "Desert Wheatear",
            "uniqueValue": 1201,
            "endemicRegion": "None",
            "soibConcernStatus": "High",
            "wpaSchedule": "Schedule-II",
            "iucnCategory": "Least Concern"
        },
        {
            "indiaChecklistScientificName": "Oenanthe fusca",
            "migratoryStatusWithinIndia": "Resident",
            "indiaChecklistCommonName": "Brown Rock Chat",
            "uniqueValue": 1203,
            "endemicRegion": "Indian Subcontinent",
            "soibConcernStatus": "Low",
            "wpaSchedule": "Schedule-II",
            "iucnCategory": "Least Concern"
        },
        {
            "indiaChecklistScientificName": "Oenanthe picata",
            "migratoryStatusWithinIndia": "Winter Migrant",
            "indiaChecklistCommonName": "Variable Wheatear",
            "uniqueValue": 1204,
            "endemicRegion": "None",
            "soibConcernStatus": "High",
            "wpaSchedule": "Schedule-II",
            "iucnCategory": "Least Concern"
        },
        {
            "indiaChecklistScientificName": "Dicaeum agile",
            "migratoryStatusWithinIndia": "Resident",
            "indiaChecklistCommonName": "Thick-billed Flowerpecker",
            "uniqueValue": 1210,
            "endemicRegion": "None",
            "soibConcernStatus": "High",
            "wpaSchedule": "Schedule-II",
            "iucnCategory": "Least Concern"
        },
        {
            "indiaChecklistScientificName": "Dicaeum erythrorhynchos",
            "migratoryStatusWithinIndia": "Resident",
            "indiaChecklistCommonName": "Pale-billed Flowerpecker",
            "uniqueValue": 1213,
            "endemicRegion": "Indian Subcontinent",
            "soibConcernStatus": "Low",
            "wpaSchedule": "Schedule-II",
            "iucnCategory": "Least Concern"
        },
        {
            "indiaChecklistScientificName": "Dicaeum ignipectus",
            "migratoryStatusWithinIndia": "Resident & Altitudinal Migrant",
            "indiaChecklistCommonName": "Fire-breasted Flowerpecker",
            "uniqueValue": 1217,
            "endemicRegion": "None",
            "soibConcernStatus": "Low",
            "wpaSchedule": "Schedule-II",
            "iucnCategory": "Least Concern"
        },
        {
            "indiaChecklistScientificName": "Cinnyris asiaticus",
            "migratoryStatusWithinIndia": "Resident & Local Migrant",
            "indiaChecklistCommonName": "Purple Sunbird",
            "uniqueValue": 1223,
            "endemicRegion": "None",
            "soibConcernStatus": "Low",
            "wpaSchedule": "Schedule-II",
            "iucnCategory": "Least Concern"
        },
        {
            "indiaChecklistScientificName": "Aethopyga ignicauda",
            "migratoryStatusWithinIndia": "Resident & Altitudinal Migrant",
            "indiaChecklistCommonName": "Fire-tailed Sunbird",
            "uniqueValue": 1226,
            "endemicRegion": "None",
            "soibConcernStatus": "Low",
            "wpaSchedule": "Schedule-II",
            "iucnCategory": "Least Concern"
        },
        {
            "indiaChecklistScientificName": "Aethopyga siparaja",
            "migratoryStatusWithinIndia": "Resident",
            "indiaChecklistCommonName": "Crimson Sunbird",
            "uniqueValue": 1231,
            "endemicRegion": "None",
            "soibConcernStatus": "Low",
            "wpaSchedule": "Schedule-II",
            "iucnCategory": "Least Concern"
        },
        {
            "indiaChecklistScientificName": "Ploceus manyar",
            "migratoryStatusWithinIndia": "Resident",
            "indiaChecklistCommonName": "Streaked Weaver",
            "uniqueValue": 1239,
            "endemicRegion": "None",
            "soibConcernStatus": "Moderate",
            "wpaSchedule": "Schedule-II",
            "iucnCategory": "Least Concern"
        },
        {
            "indiaChecklistScientificName": "Ploceus philippinus",
            "migratoryStatusWithinIndia": "Resident",
            "indiaChecklistCommonName": "Baya Weaver",
            "uniqueValue": 1240,
            "endemicRegion": "None",
            "soibConcernStatus": "Low",
            "wpaSchedule": "Schedule-II",
            "iucnCategory": "Least Concern"
        },
        {
            "indiaChecklistScientificName": "Ploceus benghalensis",
            "migratoryStatusWithinIndia": "Resident",
            "indiaChecklistCommonName": "Black-breasted Weaver",
            "uniqueValue": 1242,
            "endemicRegion": "Indian Subcontinent",
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
            "indiaChecklistScientificName": "Amandava amandava",
            "migratoryStatusWithinIndia": "Resident",
            "indiaChecklistCommonName": "Red Munia",
            "uniqueValue": 1250,
            "endemicRegion": "None",
            "soibConcernStatus": "Low",
            "wpaSchedule": "Schedule-II",
            "iucnCategory": "Least Concern"
        },
        {
            "indiaChecklistScientificName": "Prunella himalayana",
            "migratoryStatusWithinIndia": "Winter Migrant",
            "indiaChecklistCommonName": "Altai Accentor",
            "uniqueValue": 1252,
            "endemicRegion": "None",
            "soibConcernStatus": "Moderate",
            "wpaSchedule": "Schedule-II",
            "iucnCategory": "Least Concern"
        },
        {
            "indiaChecklistScientificName": "Prunella strophiata",
            "migratoryStatusWithinIndia": "Resident & Altitudinal Migrant",
            "indiaChecklistCommonName": "Rufous-breasted Accentor",
            "uniqueValue": 1254,
            "endemicRegion": "None",
            "soibConcernStatus": "Moderate",
            "wpaSchedule": "Schedule-II",
            "iucnCategory": "Least Concern"
        },
        {
            "indiaChecklistScientificName": "Prunella atrogularis",
            "migratoryStatusWithinIndia": "Winter Migrant",
            "indiaChecklistCommonName": "Black-throated Accentor",
            "uniqueValue": 1256,
            "endemicRegion": "None",
            "soibConcernStatus": "NA",
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
            "indiaChecklistScientificName": "Passer pyrrhonotus",
            "migratoryStatusWithinIndia": "Resident",
            "indiaChecklistCommonName": "Sind Sparrow",
            "uniqueValue": 1260,
            "endemicRegion": "Indus Plains",
            "soibConcernStatus": "Low",
            "wpaSchedule": "Schedule-II",
            "iucnCategory": "Least Concern"
        },
        {
            "indiaChecklistScientificName": "Passer cinnamomeus",
            "migratoryStatusWithinIndia": "Resident & Altitudinal Migrant",
            "indiaChecklistCommonName": "Russet Sparrow",
            "uniqueValue": 1261,
            "endemicRegion": "None",
            "soibConcernStatus": "Low",
            "wpaSchedule": "Schedule-II",
            "iucnCategory": "Least Concern"
        },
        {
            "indiaChecklistScientificName": "Passer montanus",
            "migratoryStatusWithinIndia": "Resident",
            "indiaChecklistCommonName": "Eurasian Tree Sparrow",
            "uniqueValue": 1262,
            "endemicRegion": "None",
            "soibConcernStatus": "Low",
            "wpaSchedule": "Schedule-II",
            "iucnCategory": "Least Concern"
        },
        {
            "indiaChecklistScientificName": "Gymnoris xanthocollis",
            "migratoryStatusWithinIndia": "Resident",
            "indiaChecklistCommonName": "Yellow-throated Sparrow",
            "uniqueValue": 1263,
            "endemicRegion": "None",
            "soibConcernStatus": "Low",
            "wpaSchedule": "Schedule-II",
            "iucnCategory": "Least Concern"
        },
        {
            "indiaChecklistScientificName": "Motacilla cinerea",
            "migratoryStatusWithinIndia": "Winter Migrant & Localized Summer Migrant",
            "indiaChecklistCommonName": "Grey Wagtail",
            "uniqueValue": 1271,
            "endemicRegion": "None",
            "soibConcernStatus": "Moderate",
            "wpaSchedule": "Schedule-II",
            "iucnCategory": "Least Concern"
        },
        {
            "indiaChecklistScientificName": "Motacilla flava",
            "migratoryStatusWithinIndia": "Winter Migrant",
            "indiaChecklistCommonName": "Western Yellow Wagtail",
            "uniqueValue": 1272,
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
            "indiaChecklistScientificName": "Anthus richardi",
            "migratoryStatusWithinIndia": "Winter Migrant",
            "indiaChecklistCommonName": "Richard's Pipit",
            "uniqueValue": 1277,
            "endemicRegion": "None",
            "soibConcernStatus": "Low",
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
        },
        {
            "indiaChecklistScientificName": "Anthus similis",
            "migratoryStatusWithinIndia": "Resident & Winter Migrant",
            "indiaChecklistCommonName": "Long-billed Pipit",
            "uniqueValue": 1279,
            "endemicRegion": "None",
            "soibConcernStatus": "Moderate",
            "wpaSchedule": "Schedule-II",
            "iucnCategory": "Least Concern"
        },
        {
            "indiaChecklistScientificName": "Anthus godlewskii",
            "migratoryStatusWithinIndia": "Winter Migrant",
            "indiaChecklistCommonName": "Blyth's Pipit",
            "uniqueValue": 1280,
            "endemicRegion": "None",
            "soibConcernStatus": "Low",
            "wpaSchedule": "Schedule-II",
            "iucnCategory": "Least Concern"
        },
        {
            "indiaChecklistScientificName": "Anthus campestris",
            "migratoryStatusWithinIndia": "Winter Migrant",
            "indiaChecklistCommonName": "Tawny Pipit",
            "uniqueValue": 1281,
            "endemicRegion": "None",
            "soibConcernStatus": "High",
            "wpaSchedule": "Schedule-II",
            "iucnCategory": "Least Concern"
        },
        {
            "indiaChecklistScientificName": "Anthus sylvanus",
            "migratoryStatusWithinIndia": "Resident & Altitudinal Migrant",
            "indiaChecklistCommonName": "Upland Pipit",
            "uniqueValue": 1283,
            "endemicRegion": "None",
            "soibConcernStatus": "Low",
            "wpaSchedule": "Schedule-II",
            "iucnCategory": "Least Concern"
        },
        {
            "indiaChecklistScientificName": "Anthus roseatus",
            "migratoryStatusWithinIndia": "Within-India Migrant & Winter Migrant",
            "indiaChecklistCommonName": "Rosy Pipit",
            "uniqueValue": 1285,
            "endemicRegion": "None",
            "soibConcernStatus": "Low",
            "wpaSchedule": "Schedule-II",
            "iucnCategory": "Least Concern"
        },
        {
            "indiaChecklistScientificName": "Anthus trivialis",
            "migratoryStatusWithinIndia": "Winter Migrant",
            "indiaChecklistCommonName": "Tree Pipit",
            "uniqueValue": 1286,
            "endemicRegion": "None",
            "soibConcernStatus": "Moderate",
            "wpaSchedule": "Schedule-II",
            "iucnCategory": "Least Concern"
        },
        {
            "indiaChecklistScientificName": "Anthus hodgsoni",
            "migratoryStatusWithinIndia": "Within-India Migrant & Winter Migrant",
            "indiaChecklistCommonName": "Olive-backed Pipit",
            "uniqueValue": 1287,
            "endemicRegion": "None",
            "soibConcernStatus": "High",
            "wpaSchedule": "Schedule-II",
            "iucnCategory": "Least Concern"
        },
        {
            "indiaChecklistScientificName": "Anthus cervinus",
            "migratoryStatusWithinIndia": "Passage Migrant & Localized Winter Migrant",
            "indiaChecklistCommonName": "Red-throated Pipit",
            "uniqueValue": 1288,
            "endemicRegion": "None",
            "soibConcernStatus": "NA",
            "wpaSchedule": "Schedule-II",
            "iucnCategory": "Least Concern"
        },
        {
            "indiaChecklistScientificName": "Anthus spinoletta",
            "migratoryStatusWithinIndia": "Winter Migrant",
            "indiaChecklistCommonName": "Water Pipit",
            "uniqueValue": 1289,
            "endemicRegion": "None",
            "soibConcernStatus": "NA",
            "wpaSchedule": "Schedule-II",
            "iucnCategory": "Least Concern"
        },
        {
            "indiaChecklistScientificName": "Anthus rubescens",
            "migratoryStatusWithinIndia": "Winter Migrant",
            "indiaChecklistCommonName": "Buff-bellied Pipit",
            "uniqueValue": 1290,
            "endemicRegion": "None",
            "soibConcernStatus": "NA",
            "wpaSchedule": "Schedule-II",
            "iucnCategory": "Least Concern"
        },
        {
            "indiaChecklistScientificName": "Fringilla coelebs",
            "migratoryStatusWithinIndia": "Winter Migrant",
            "indiaChecklistCommonName": "Common Chaffinch",
            "uniqueValue": 1291,
            "endemicRegion": "None",
            "soibConcernStatus": "NA",
            "wpaSchedule": "Schedule-II",
            "iucnCategory": "Least Concern"
        },
        {
            "indiaChecklistScientificName": "Fringilla montifringilla",
            "migratoryStatusWithinIndia": "Winter Migrant",
            "indiaChecklistCommonName": "Brambling",
            "uniqueValue": 1292,
            "endemicRegion": "None",
            "soibConcernStatus": "NA",
            "wpaSchedule": "Schedule-II",
            "iucnCategory": "Least Concern"
        },
        {
            "indiaChecklistScientificName": "Carpodacus erythrinus",
            "migratoryStatusWithinIndia": "Winter Migrant & Localized Summer Migrant",
            "indiaChecklistCommonName": "Common Rosefinch",
            "uniqueValue": 1298,
            "endemicRegion": "None",
            "soibConcernStatus": "Moderate",
            "wpaSchedule": "Schedule-II",
            "iucnCategory": "Least Concern"
        },
        {
            "indiaChecklistScientificName": "Carpodacus rodochroa",
            "migratoryStatusWithinIndia": "Resident & Altitudinal Migrant",
            "indiaChecklistCommonName": "Pink-browed Rosefinch",
            "uniqueValue": 1304,
            "endemicRegion": "Himalayas",
            "soibConcernStatus": "Low",
            "wpaSchedule": "Schedule-II",
            "iucnCategory": "Least Concern"
        },
        {
            "indiaChecklistScientificName": "Pyrrhula aurantiaca",
            "migratoryStatusWithinIndia": "Resident & Altitudinal Migrant",
            "indiaChecklistCommonName": "Orange Bullfinch",
            "uniqueValue": 1317,
            "endemicRegion": "Western Himalayas",
            "soibConcernStatus": "Moderate",
            "wpaSchedule": "Schedule-II",
            "iucnCategory": "Least Concern"
        },
        {
            "indiaChecklistScientificName": "Pyrrhula erythrocephala",
            "migratoryStatusWithinIndia": "Resident",
            "indiaChecklistCommonName": "Red-headed Bullfinch",
            "uniqueValue": 1318,
            "endemicRegion": "Himalayas",
            "soibConcernStatus": "Low",
            "wpaSchedule": "Schedule-II",
            "iucnCategory": "Least Concern"
        },
        {
            "indiaChecklistScientificName": "Procarduelis nipalensis",
            "migratoryStatusWithinIndia": "Resident & Altitudinal Migrant",
            "indiaChecklistCommonName": "Dark-breasted Rosefinch",
            "uniqueValue": 1326,
            "endemicRegion": "None",
            "soibConcernStatus": "Low",
            "wpaSchedule": "Schedule-II",
            "iucnCategory": "Least Concern"
        },
        {
            "indiaChecklistScientificName": "Leucosticte nemoricola",
            "migratoryStatusWithinIndia": "Resident & Altitudinal Migrant",
            "indiaChecklistCommonName": "Plain Mountain Finch",
            "uniqueValue": 1327,
            "endemicRegion": "None",
            "soibConcernStatus": "Moderate",
            "wpaSchedule": "Schedule-II",
            "iucnCategory": "Least Concern"
        },
        {
            "indiaChecklistScientificName": "Chloris spinoides",
            "migratoryStatusWithinIndia": "Resident & Altitudinal Migrant",
            "indiaChecklistCommonName": "Yellow-breasted Greenfinch",
            "uniqueValue": 1330,
            "endemicRegion": "Himalayas",
            "soibConcernStatus": "Moderate",
            "wpaSchedule": "Schedule-II",
            "iucnCategory": "Least Concern"
        },
        {
            "indiaChecklistScientificName": "Linaria cannabina",
            "migratoryStatusWithinIndia": "Uncertain",
            "indiaChecklistCommonName": "Eurasian Linnet",
            "uniqueValue": 1333,
            "endemicRegion": "None",
            "soibConcernStatus": "NA",
            "wpaSchedule": "Schedule-II",
            "iucnCategory": "Least Concern"
        },
        {
            "indiaChecklistScientificName": "Carduelis carduelis",
            "migratoryStatusWithinIndia": "Resident & Altitudinal Migrant",
            "indiaChecklistCommonName": "European Goldfinch",
            "uniqueValue": 1335,
            "endemicRegion": "None",
            "soibConcernStatus": "Low",
            "wpaSchedule": "Schedule-II",
            "iucnCategory": "Least Concern"
        },
        {
            "indiaChecklistScientificName": "Serinus pusillus",
            "migratoryStatusWithinIndia": "Resident & Altitudinal Migrant",
            "indiaChecklistCommonName": "Fire-fronted Serin",
            "uniqueValue": 1336,
            "endemicRegion": "None",
            "soibConcernStatus": "Low",
            "wpaSchedule": "Schedule-II",
            "iucnCategory": "Least Concern"
        },
        {
            "indiaChecklistScientificName": "Emberiza lathami",
            "migratoryStatusWithinIndia": "Resident & Local Migrant",
            "indiaChecklistCommonName": "Crested Bunting",
            "uniqueValue": 1339,
            "endemicRegion": "None",
            "soibConcernStatus": "Moderate",
            "wpaSchedule": "Schedule-II",
            "iucnCategory": "Least Concern"
        },
        {
            "indiaChecklistScientificName": "Emberiza bruniceps",
            "migratoryStatusWithinIndia": "Winter Migrant",
            "indiaChecklistCommonName": "Red-headed Bunting",
            "uniqueValue": 1341,
            "endemicRegion": "None",
            "soibConcernStatus": "Low",
            "wpaSchedule": "Schedule-II",
            "iucnCategory": "Least Concern"
        },
        {
            "indiaChecklistScientificName": "Emberiza fucata",
            "migratoryStatusWithinIndia": "Resident & Winter Migrant",
            "indiaChecklistCommonName": "Chestnut-eared Bunting",
            "uniqueValue": 1342,
            "endemicRegion": "None",
            "soibConcernStatus": "Moderate",
            "wpaSchedule": "Schedule-II",
            "iucnCategory": "Least Concern"
        },
        {
            "indiaChecklistScientificName": "Emberiza cia",
            "migratoryStatusWithinIndia": "Resident & Altitudinal Migrant",
            "indiaChecklistCommonName": "Rock Bunting",
            "uniqueValue": 1343,
            "endemicRegion": "None",
            "soibConcernStatus": "Low",
            "wpaSchedule": "Schedule-II",
            "iucnCategory": "Least Concern"
        },
        {
            "indiaChecklistScientificName": "Emberiza stewarti",
            "migratoryStatusWithinIndia": "Within-India Migrant",
            "indiaChecklistCommonName": "White-capped Bunting",
            "uniqueValue": 1345,
            "endemicRegion": "None",
            "soibConcernStatus": "Low",
            "wpaSchedule": "Schedule-II",
            "iucnCategory": "Least Concern"
        },
        {
            "indiaChecklistScientificName": "Emberiza citrinella",
            "migratoryStatusWithinIndia": "Winter Migrant",
            "indiaChecklistCommonName": "Yellowhammer",
            "uniqueValue": 1346,
            "endemicRegion": "None",
            "soibConcernStatus": "NA",
            "wpaSchedule": "Schedule-II",
            "iucnCategory": "Least Concern"
        },
        {
            "indiaChecklistScientificName": "Emberiza leucocephalos",
            "migratoryStatusWithinIndia": "Winter Migrant",
            "indiaChecklistCommonName": "Pine Bunting",
            "uniqueValue": 1347,
            "endemicRegion": "None",
            "soibConcernStatus": "NA",
            "wpaSchedule": "Schedule-II",
            "iucnCategory": "Least Concern"
        }
    ])
  })
})

  describe('(State,County and Date) Water Bird Congregations ID-T5022', () => {

  it('T5022/water_bird_congregation', async () => {

    const response = await request(app)
      .get('/api/users/water_bird_congregation')
      .query({
        state: 'Himachal Pradesh',
        county: 'Kangra',
        start:'01-01-2000',
        end: '05-31-2022'
      })
      .expect(200);
    expect(response.body).toEqual({
        "data": [
            {
                "indiaChecklistCommonName": "Greylag Goose",
                "indiaChecklistScientificName": "Anser anser",
                "highestCongregation": "4000",
                "maxObservationCount": 16,
                "onePercentBiographicPopulation": "250",
                "uniqueValue": 4,
                "samplingEventIdentifier": "S53016498",
                "observationDate": "22-02-2019"
            },
            {
                "indiaChecklistCommonName": "Ruddy Shelduck",
                "indiaChecklistScientificName": "Tadorna ferruginea",
                "highestCongregation": "564",
                "maxObservationCount": 1,
                "onePercentBiographicPopulation": "500",
                "uniqueValue": 14,
                "samplingEventIdentifier": "S62832938",
                "observationDate": "01-01-2020"
            },
            {
                "indiaChecklistCommonName": "Great Cormorant",
                "indiaChecklistScientificName": "Phalacrocorax carbo",
                "highestCongregation": "2456",
                "maxObservationCount": 2,
                "onePercentBiographicPopulation": "1000",
                "uniqueValue": 379,
                "samplingEventIdentifier": "S64073719",
                "observationDate": "03-02-2020"
            }
        ],
        "success": true
    })
  })
  })

describe('(State,County and Date) Data Contributions ID-T5023', () => {

  it('T5023/effortsDetails', async () => {

    const response = await request(app)
      .get('/api/users/effortsDetails')
      .query({
        state: 'Himachal Pradesh',
        county: 'Kangra',
        start:'01-01-2000',
        end: '05-31-2022'
      })
      .expect(200);
    expect(response.body).toEqual({
        "data": {
            "numberOfObservations": 82203,
            "numberOfList": "4474",
            "numberOfUniqueLists": "3713",
            "totalNumberOfHours": 5313,
            "totalNumberOfObservers": 510
        }
    })
  })
});


