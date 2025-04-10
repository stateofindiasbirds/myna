
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
app.post('/api/latlong/all_years_count', upload.single('file'), UserController.graph);




jest.setTimeout(200000);


describe('(State,County and Date) Location Name ID-T5012', () => {

  //Controller locationName state and county
  it('T5012/location_listing', async () => {
    const response = await request(app)
      .get('/api/users/location_listing')
      .query({
        state: 'Karnataka',
        county: 'Haveri',
        start:'01-01-2000',
        end: '12-31-2024'
      })
      .expect(200);
    expect(response.body).toEqual({
       "localities": [
        "Adavisomapur Kere Ã Â²â€¦Ã Â²Â¡Ã Â²ÂµÃ Â²Â¿Ã Â²Â¸Ã Â³â€¹Ã Â²Â®Ã Â²Â¾Ã Â²ÂªÃ Â³ÂÃ Â²Â° Ã Â²â€¢Ã Â³â€ Ã Â²Â°Ã Â³â€",
        "Adavisomapur Kere Ã Â²â€¦Ã Â²Â¡Ã Â²ÂµÃ Â²Â¿Ã Â²Â¸Ã Â³â€¹Ã Â²Â®Ã Â²Â¾Ã Â²ÂªÃ Â³ÂÃ Â²Â° Ã Â²â€¢Ã Â³â€ Ã Â²Â°Ã Â³â€ ",
        "Airani Fort, Hirebidari Ã Â²ÂÃ Â²Â°Ã Â²Â£Ã Â²Â¿ Ã Â²â€¢Ã Â³â€¹Ã Â²Å¸Ã Â³â€ , Ã Â²Â¹Ã Â²Â¿Ã Â²Â°Ã Â³â€¡Ã Â²Â¬Ã Â²Â¿Ã Â²Â¦Ã Â²Â°Ã Â²Â¿",
        "Bankapura Peacock Sanctuary",
        "Bankapur Peacock Sanctuary Ã Â²Â¬Ã Â²â€šÃ Â²â€¢Ã Â²Â¾Ã Â²ÂªÃ Â³ÂÃ Â²Â° Ã Â²Â¨Ã Â²ÂµÃ Â²Â¿Ã Â²Â²Ã Â³ÂÃ Â²Â§Ã Â²Â¾Ã Â²Â®",
        "Durgadevi Kere Ã Â²Â¦Ã Â³ÂÃ Â²Â°Ã Â³ÂÃ Â²â€”Ã Â²Â¾Ã Â²Â¦Ã Â³â€¡Ã Â²ÂµÃ Â²Â¿ Ã Â²â€¢Ã Â³â€ Ã Â²Â°Ã Â³â€",
        "Durgadevi Kere Ã Â²Â¦Ã Â³ÂÃ Â²Â°Ã Â³ÂÃ Â²â€”Ã Â²Â¾Ã Â²Â¦Ã Â³â€¡Ã Â²ÂµÃ Â²Â¿ Ã Â²â€¢Ã Â³â€ Ã Â²Â°Ã Â³â€ ",
        "Galageshwara Temple, Galaganath Ã Â²â€”Ã Â²Â³Ã Â²â€”Ã Â³â€¡Ã Â²Â¶Ã Â³ÂÃ Â²ÂµÃ Â²Â° Ã Â²Â¦Ã Â³â€¡Ã Â²ÂµÃ Â²Â¸Ã Â³ÂÃ Â²Â¥Ã Â²Â¾Ã Â²Â¨, Ã Â²â€”Ã Â²Â³Ã Â²â€”Ã Â²Â¨Ã Â²Â¾Ã Â²Â¥",
        "Gangajala Kere, Ranebennur Ã Â²â€”Ã Â²â€šÃ Â²â€”Ã Â²Â¾Ã Â²Å“Ã Â²Â² Ã Â²â€¢Ã Â³â€ Ã Â²Â°Ã Â³â€ , Ã Â²Â°Ã Â²Â¾Ã Â²Â£Ã Â³â€ Ã Â²Â¬Ã Â³â€ Ã Â²Â¨Ã Â³ÂÃ Â²Â¨Ã Â³â€šÃ Â²Â°Ã Â³Â",
        "Heggeri Kere  Ã Â²Â¹Ã Â³â€ Ã Â²â€”Ã Â³ÂÃ Â²â€”Ã Â³â€¡Ã Â²Â°Ã Â²Â¿ Ã Â²â€¢Ã Â³â€ Ã Â²Â°Ã Â³â€",
        "Heggeri Kere  Ã Â²Â¹Ã Â³â€ Ã Â²â€”Ã Â³ÂÃ Â²â€”Ã Â³â€¡Ã Â²Â°Ã Â²Â¿ Ã Â²â€¢Ã Â³â€ Ã Â²Â°Ã Â³â€ ",
        "Kaginele Kere Ã Â²â€¢Ã Â²Â¾Ã Â²â€”Ã Â²Â¿Ã Â²Â¨Ã Â³â€ Ã Â²Â²Ã Â³â€  Ã Â²â€¢Ã Â³â€ Ã Â²Â°Ã Â³â€",
        "Kaginele Kere Ã Â²â€¢Ã Â²Â¾Ã Â²â€”Ã Â²Â¿Ã Â²Â¨Ã Â³â€ Ã Â²Â²Ã Â³â€  Ã Â²â€¢Ã Â³â€ Ã Â²Â°Ã Â³â€ ",
        "Medleri Lake, Ranebennur (Ã Â²Â®Ã Â³â€¡Ã Â²Â¡Ã Â³ÂÃ Â²Â²Ã Â³â€¡Ã Â²Â°Ã Â²Â¿ Ã Â²â€¢Ã Â³â€ Ã Â²Â°Ã Â³â€ )",
        "Mukteshwara Temple, Chaudayyanapura Ã Â²Â®Ã Â³ÂÃ Â²â€¢Ã Â³ÂÃ Â²Â¤Ã Â³â€¡Ã Â²Â¶Ã Â³ÂÃ Â²ÂµÃ Â²Â° Ã Â²Â¦Ã Â³â€¡Ã Â²ÂµÃ Â²Â¸Ã Â³ÂÃ Â²Â¥Ã Â²Â¾Ã Â²Â¨, Ã Â²Å¡Ã Â³Å’Ã Â²Â¡Ã Â²Â¯Ã Â³ÂÃ Â²Â¯Ã Â²Â¨Ã Â²ÂªÃ Â³ÂÃ Â²Â°",
        "Ranebennur Blackbuck Sanctuary Ã Â²Â°Ã Â²Â¾Ã Â²Â£Ã Â²Â¿Ã Â²Â¬Ã Â³â€ Ã Â²Â¨Ã Â³ÂÃ Â²Â¨Ã Â³â€šÃ Â²Â°Ã Â³Â Ã Â²â€¢Ã Â³Æ’Ã Â²Â·Ã Â³ÂÃ Â²Â£Ã Â²Â®Ã Â³Æ’Ã Â²â€” Ã Â²â€¦Ã Â²Â­Ã Â²Â¯Ã Â²Â¾Ã Â²Â°Ã Â²Â£Ã Â³ÂÃ Â²Â¯",
        "Ranebennur Blackbuck Sanctuary--Medleri Kere Ã Â²Â°Ã Â²Â¾Ã Â²Â£Ã Â²Â¿Ã Â²Â¬Ã Â³â€ Ã Â²Â¨Ã Â³ÂÃ Â²Â¨Ã Â³â€šÃ Â²Â°Ã Â³Â Ã Â²â€¢Ã Â³Æ’Ã Â²Â·Ã Â³ÂÃ Â²Â£Ã Â²Â®Ã Â³Æ’Ã Â²â€” Ã Â²â€¦Ã Â²Â­Ã Â²Â¯Ã Â²Â¾Ã Â²Â°Ã Â²Â£Ã Â³ÂÃ Â²Â¯--Ã Â²Â®Ã Â³â€ Ã Â²Â¡Ã Â³ÂÃ Â²Â²Ã Â³â€¡Ã Â²Â°Ã Â²Â¿ Ã Â²â€¢Ã Â³â€ Ã Â²Â°Ã Â³â€",
        "Ranebennur Blackbuck Sanctuary--Medleri Kere Ã Â²Â°Ã Â²Â¾Ã Â²Â£Ã Â²Â¿Ã Â²Â¬Ã Â³â€ Ã Â²Â¨Ã Â³ÂÃ Â²Â¨Ã Â³â€šÃ Â²Â°Ã Â³Â Ã Â²â€¢Ã Â³Æ’Ã Â²Â·Ã Â³ÂÃ Â²Â£Ã Â²Â®Ã Â³Æ’Ã Â²â€” Ã Â²â€¦Ã Â²Â­Ã Â²Â¯Ã Â²Â¾Ã Â²Â°Ã Â²Â£Ã Â³ÂÃ Â²Â¯--Ã Â²Â®Ã Â³â€ Ã Â²Â¡Ã Â³ÂÃ Â²Â²Ã Â³â€¡Ã Â²Â°Ã Â²Â¿ Ã Â²â€¢Ã Â³â€ Ã Â²Â°Ã Â³â€ ",
        "Salu Marada Thimmakka Nature Park",
        "Savanur Kere Ã Â²Â¸Ã Â²ÂµÃ Â²Â£Ã Â³â€šÃ Â²Â° Ã Â²â€¢Ã Â³â€ Ã Â²Â°Ã Â³â€",
        "Savanur Kere Ã Â²Â¸Ã Â²ÂµÃ Â²Â£Ã Â³â€šÃ Â²Â° Ã Â²â€¢Ã Â³â€ Ã Â²Â°Ã Â³â€ ",
        "Someshwara Temple, Haralahalli Ã Â²Â¸Ã Â³â€¹Ã Â²Â®Ã Â³â€¡Ã Â²Â¶Ã Â³ÂÃ Â²ÂµÃ Â²Â° Ã Â²Â¦Ã Â³â€¡Ã Â²ÂµÃ Â²Â¸Ã Â³ÂÃ Â²Â¥Ã Â²Â¾Ã Â²Â¨, Ã Â²Â¹Ã Â²Â°Ã Â²Â²Ã Â²Â¹Ã Â²Â³Ã Â³ÂÃ Â²Â³Ã Â²Â¿",
        "Tadas Ã Â²Â¤Ã Â²Â¡Ã Â²Â¸",
        "Timmarpur Kere Ã Â²Â¤Ã Â²Â¿Ã Â²Â®Ã Â³ÂÃ Â²Â®Ã Â²Â¾Ã Â²ÂªÃ Â³ÂÃ Â²Â° Ã Â²â€¢Ã Â³â€ Ã Â²Â°Ã Â³â€",
        "Timmarpur Kere Ã Â²Â¤Ã Â²Â¿Ã Â²Â®Ã Â³ÂÃ Â²Â®Ã Â²Â¾Ã Â²ÂªÃ Â³ÂÃ Â²Â° Ã Â²â€¢Ã Â³â€ Ã Â²Â°Ã Â³â€ ",
        "Tungabhadra River Bridge Ã Â²Â¤Ã Â³ÂÃ Â²â€šÃ Â²â€”Ã Â²Â­Ã Â²Â¦Ã Â³ÂÃ Â²Â°Ã Â²Â¾ Ã Â²Â¨Ã Â²Â¦Ã Â²Â¿ Ã Â²Â¸Ã Â³â€¡Ã Â²Â¤Ã Â³ÂÃ Â²ÂµÃ Â³â€  NH48, Harihar",
        "Varada River--Hosaritti Ã Â²ÂµÃ Â²Â°Ã Â²Â¦Ã Â²Â¾ Ã Â²Â¨Ã Â²Â¦Ã Â²Â¿--Ã Â²Â¹Ã Â³Å Ã Â²Â¸Ã Â²Â°Ã Â²Â¿Ã Â²Â¤Ã Â³ÂÃ Â²Â¤Ã Â²Â¿"
    ]
    })
  })
})


describe('(State,County and Date) Species Details ID-T5013', () => {

  it('T5013/count_iucn_species', async () => {

    const response = await request(app)
      .get('/api/users/count_iucn_species')
      .query({
        state: 'Karnataka',
        county: 'Haveri',
        start:'01-01-2000',
        end: '12-31-2024'
      })
      .expect(200);
    expect(response.body).toEqual({
        "iucnRedListCategoriesCount": {
            "Vulnerable": 5,
            "Critically Endangered": 0,
            "Near Threatened": 5,
            "Endangered": 0
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
        state: 'Karnataka',
        county: 'Haveri',
        start:'01-01-2000',
        end: '12-31-2024'
      })
      .expect(200);
    expect(response.body).toEqual({
        "soibConservationConcernSpecies": [
            {
                "species": "Moderate Priority",
                "count": 44
            },
            {
                "species": "High Priority",
                "count": 31
            }
        ],
        "citesAppendixSpecies": [
            {
                "species": "Appendix I",
                "count": 1
            },
            {
                "species": "Appendix II",
                "count": 28
            }
        ],
        "cmsAppendixSpecies": [
            {
                "species": "Appendix I",
                "count": 3
            },
            {
                "species": "Appendix II",
                "count": 93
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
        state: 'Karnataka',
        county: 'Haveri',
        start:'01-01-2000',
        end: '12-31-2024'
      })
      .expect(200);
    expect(response.body).toEqual({
        "total": 231,
        "migrate": 62,
        "iucnRedList": 6,
        "soibHighPriority": 33,
        "scheduleI": 32,
        "indiaEndemic": 8
    })
  })
})
  
  describe('(State,County and Date) IUCN Red List Species ID-T5016', () => {

  it('T5016/percentage_iucn_redList_species', async () => {

    const response = await request(app)
      .get('/api/users/percentage_iucn_redList_species')
      .query({
        state: 'Karnataka',
        county: 'Haveri',
        start:'01-01-2000',
        end: '12-31-2024'
      })
      .expect(200);
      // console.log(response.body);
    expect(response.body).toEqual([
        {
            "region": "Vulnerable",
            "indiaChecklistScientificName": "Aythya ferina",
            "indiaChecklistCommonName": "Common Pochard",
            "uniqueValue": 35,
            "percentage": "0%",
            "samplingEventIdentifier": "S27807574",
            "observationDate": "21-02-2016"
        },
        {
            "region": "Vulnerable",
            "indiaChecklistScientificName": "Sterna aurantia",
            "indiaChecklistCommonName": "River Tern",
            "uniqueValue": 335,
            "percentage": "16%",
            "samplingEventIdentifier": "S168705796",
            "observationDate": "15-04-2024"
        },
        {
            "region": "Vulnerable",
            "indiaChecklistScientificName": "Clanga hastata",
            "indiaChecklistCommonName": "Indian Spotted Eagle",
            "uniqueValue": 437,
            "percentage": "1%",
            "samplingEventIdentifier": "S77130755",
            "observationDate": "05-12-2020"
        },
        {
            "region": "Vulnerable",
            "indiaChecklistScientificName": "Clanga clanga",
            "indiaChecklistCommonName": "Greater Spotted Eagle",
            "uniqueValue": 438,
            "percentage": "1%",
            "samplingEventIdentifier": "S104720107",
            "observationDate": "13-03-2022"
        },
        {
            "region": "Vulnerable",
            "indiaChecklistScientificName": "Ocyceros griseus",
            "indiaChecklistCommonName": "Malabar Grey Hornbill",
            "uniqueValue": 518,
            "percentage": "0%",
            "samplingEventIdentifier": "S165768970",
            "observationDate": "23-03-2024"
        },
        {
            "region": "Near Threatened",
            "indiaChecklistScientificName": "Limosa limosa",
            "indiaChecklistCommonName": "Black-tailed Godwit",
            "uniqueValue": 252,
            "percentage": "2%",
            "samplingEventIdentifier": "S162418796",
            "observationDate": "21-02-2024"
        },
        {
            "region": "Near Threatened",
            "indiaChecklistScientificName": "Ciconia episcopus",
            "indiaChecklistCommonName": "Woolly-necked Stork",
            "uniqueValue": 367,
            "percentage": "8%",
            "samplingEventIdentifier": "S165645200",
            "observationDate": "23-03-2024"
        },
        {
            "region": "Near Threatened",
            "indiaChecklistScientificName": "Leptoptilos javanicus",
            "indiaChecklistCommonName": "Lesser Adjutant",
            "uniqueValue": 370,
            "percentage": "1%",
            "samplingEventIdentifier": "S40938458",
            "observationDate": "11-11-2017"
        },
        {
            "region": "Near Threatened",
            "indiaChecklistScientificName": "Circus macrourus",
            "indiaChecklistCommonName": "Pallid Harrier",
            "uniqueValue": 451,
            "percentage": "1%",
            "samplingEventIdentifier": "S163826862",
            "observationDate": "02-03-2024"
        },
        {
            "region": "Near Threatened",
            "indiaChecklistScientificName": "Anthracoceros coronatus",
            "indiaChecklistCommonName": "Malabar Pied Hornbill",
            "uniqueValue": 519,
            "percentage": "0%",
            "samplingEventIdentifier": "S165768970",
            "observationDate": "23-03-2024"
        }
    ])
  })
})

  describe('(State,County and Date) Endemic Species ID-T5017', () => {
  it('T5017/percentage_endemic_species', async () => {

    const response = await request(app)
      .get('/api/users/percentage_endemic_species')
      .query({
        state: 'Karnataka',
        county: 'Haveri',
        start:'01-01-2000',
        end: '12-31-2024'
      })
      .expect(200);
      // console.log(response.body)
    expect(response.body).toEqual([
        {
            "region": "Indian Subcontinent",
            "indiaChecklistScientificName": "Pavo cristatus",
            "indiaChecklistCommonName": "Indian Peafowl",
            "uniqueValue": 64,
            "percentage": "28%",
            "samplingEventIdentifier": "S177481683",
            "observationDate": "27-05-2024"
        },
        {
            "region": "Mainland India",
            "indiaChecklistScientificName": "Galloperdix lunulata",
            "indiaChecklistCommonName": "Painted Spurfowl",
            "uniqueValue": 67,
            "percentage": "0%",
            "samplingEventIdentifier": "S42696454",
            "observationDate": "11-02-2018"
        },
        {
            "region": "Mainland India",
            "indiaChecklistScientificName": "Gallus sonneratii",
            "indiaChecklistCommonName": "Grey Junglefowl",
            "uniqueValue": 71,
            "percentage": "1%",
            "samplingEventIdentifier": "S35683201",
            "observationDate": "02-04-2017"
        },
        {
            "region": "Indian Subcontinent",
            "indiaChecklistScientificName": "Francolinus pictus",
            "indiaChecklistCommonName": "Painted Francolin",
            "uniqueValue": 76,
            "percentage": "1%",
            "samplingEventIdentifier": "S148035321",
            "observationDate": "25-08-2023"
        },
        {
            "region": "Mainland India",
            "indiaChecklistScientificName": "Perdicula argoondah",
            "indiaChecklistCommonName": "Rock Bush Quail",
            "uniqueValue": 85,
            "percentage": "4%",
            "samplingEventIdentifier": "S155137396",
            "observationDate": "25-11-2023"
        },
        {
            "region": "Indian Subcontinent",
            "indiaChecklistScientificName": "Taccocua leschenaultii",
            "indiaChecklistCommonName": "Sirkeer Malkoha",
            "uniqueValue": 145,
            "percentage": "3%",
            "samplingEventIdentifier": "S170459415",
            "observationDate": "27-04-2024"
        },
        {
            "region": "Indian Subcontinent",
            "indiaChecklistScientificName": "Phaenicophaeus viridirostris",
            "indiaChecklistCommonName": "Blue-faced Malkoha",
            "uniqueValue": 146,
            "percentage": "6%",
            "samplingEventIdentifier": "S176942276",
            "observationDate": "25-05-2024"
        },
        {
            "region": "Indian Subcontinent",
            "indiaChecklistScientificName": "Cacomantis passerinus",
            "indiaChecklistCommonName": "Grey-bellied Cuckoo",
            "uniqueValue": 156,
            "percentage": "1%",
            "samplingEventIdentifier": "S176674978",
            "observationDate": "24-05-2024"
        },
        {
            "region": "Indian Subcontinent",
            "indiaChecklistScientificName": "Hierococcyx varius",
            "indiaChecklistCommonName": "Common Hawk Cuckoo",
            "uniqueValue": 160,
            "percentage": "5%",
            "samplingEventIdentifier": "S178320520",
            "observationDate": "31-05-2024"
        },
        {
            "region": "Indian Subcontinent",
            "indiaChecklistScientificName": "Vanellus malabaricus",
            "indiaChecklistCommonName": "Yellow-wattled Lapwing",
            "uniqueValue": 236,
            "percentage": "6%",
            "samplingEventIdentifier": "S178320520",
            "observationDate": "31-05-2024"
        },
        {
            "region": "Indian Subcontinent",
            "indiaChecklistScientificName": "Cursorius coromandelicus",
            "indiaChecklistCommonName": "Indian Courser",
            "uniqueValue": 297,
            "percentage": "1%",
            "samplingEventIdentifier": "S162341039",
            "observationDate": "20-02-2024"
        },
        {
            "region": "Indian Subcontinent",
            "indiaChecklistScientificName": "Pseudibis papillosa",
            "indiaChecklistCommonName": "Red-naped Ibis",
            "uniqueValue": 411,
            "percentage": "16%",
            "samplingEventIdentifier": "S164589302",
            "observationDate": "13-03-2024"
        },
        {
            "region": "Indian Subcontinent",
            "indiaChecklistScientificName": "Ocyceros birostris",
            "indiaChecklistCommonName": "Indian Grey Hornbill",
            "uniqueValue": 517,
            "percentage": "8%",
            "samplingEventIdentifier": "S177481683",
            "observationDate": "27-05-2024"
        },
        {
            "region": "Western Ghats",
            "indiaChecklistScientificName": "Ocyceros griseus",
            "indiaChecklistCommonName": "Malabar Grey Hornbill",
            "uniqueValue": 518,
            "percentage": "0%",
            "samplingEventIdentifier": "S165768970",
            "observationDate": "23-03-2024"
        },
        {
            "region": "Indian Subcontinent",
            "indiaChecklistScientificName": "Anthracoceros coronatus",
            "indiaChecklistCommonName": "Malabar Pied Hornbill",
            "uniqueValue": 519,
            "percentage": "0%",
            "samplingEventIdentifier": "S165768970",
            "observationDate": "23-03-2024"
        },
        {
            "region": "Mainland India",
            "indiaChecklistScientificName": "Psilopogon viridis",
            "indiaChecklistCommonName": "White-cheeked Barbet",
            "uniqueValue": 554,
            "percentage": "1%",
            "samplingEventIdentifier": "S121154114",
            "observationDate": "23-10-2022"
        },
        {
            "region": "Indian Subcontinent",
            "indiaChecklistScientificName": "Dinopium benghalense",
            "indiaChecklistCommonName": "Black-rumped Flameback",
            "uniqueValue": 583,
            "percentage": "3%",
            "samplingEventIdentifier": "S163406036",
            "observationDate": "02-03-2024"
        },
        {
            "region": "Indian Subcontinent",
            "indiaChecklistScientificName": "Psittacula cyanocephala",
            "indiaChecklistCommonName": "Plum-headed Parakeet",
            "uniqueValue": 609,
            "percentage": "2%",
            "samplingEventIdentifier": "S147930008",
            "observationDate": "23-08-2023"
        },
        {
            "region": "Indian Subcontinent",
            "indiaChecklistScientificName": "Pitta brachyura",
            "indiaChecklistCommonName": "Indian Pitta",
            "uniqueValue": 621,
            "percentage": "0%",
            "samplingEventIdentifier": "S55050003",
            "observationDate": "13-04-2019"
        },
        {
            "region": "Indian Subcontinent",
            "indiaChecklistScientificName": "Lalage melanoptera",
            "indiaChecklistCommonName": "Black-headed Cuckooshrike",
            "uniqueValue": 640,
            "percentage": "1%",
            "samplingEventIdentifier": "S156986955",
            "observationDate": "24-12-2023"
        },
        {
            "region": "Mainland India",
            "indiaChecklistScientificName": "Rhipidura albogularis",
            "indiaChecklistCommonName": "Spot-breasted Fantail",
            "uniqueValue": 663,
            "percentage": "6%",
            "samplingEventIdentifier": "S177166801",
            "observationDate": "26-05-2024"
        },
        {
            "region": "Indian Subcontinent",
            "indiaChecklistScientificName": "Ammomanes phoenicura",
            "indiaChecklistCommonName": "Rufous-tailed Lark",
            "uniqueValue": 735,
            "percentage": "6%",
            "samplingEventIdentifier": "S162702558",
            "observationDate": "24-02-2024"
        },
        {
            "region": "Indian Subcontinent",
            "indiaChecklistScientificName": "Eremopterix griseus",
            "indiaChecklistCommonName": "Ashy-crowned Sparrow Lark",
            "uniqueValue": 738,
            "percentage": "7%",
            "samplingEventIdentifier": "S162189274",
            "observationDate": "17-02-2024"
        },
        {
            "region": "Indian Subcontinent",
            "indiaChecklistScientificName": "Mirafra affinis",
            "indiaChecklistCommonName": "Jerdon's Bushlark",
            "uniqueValue": 741,
            "percentage": "0%",
            "samplingEventIdentifier": "S101419459",
            "observationDate": "13-10-2019"
        },
        {
            "region": "Indian Subcontinent",
            "indiaChecklistScientificName": "Mirafra erythroptera",
            "indiaChecklistCommonName": "Indian Bushlark",
            "uniqueValue": 742,
            "percentage": "4%",
            "samplingEventIdentifier": "S155140063",
            "observationDate": "25-11-2023"
        },
        {
            "region": "Mainland India",
            "indiaChecklistScientificName": "Galerida malabarica",
            "indiaChecklistCommonName": "Malabar Lark",
            "uniqueValue": 754,
            "percentage": "0%",
            "samplingEventIdentifier": "S40938458",
            "observationDate": "11-11-2017"
        },
        {
            "region": "Indian Subcontinent",
            "indiaChecklistScientificName": "Prinia buchanani",
            "indiaChecklistCommonName": "Rufous-fronted Prinia",
            "uniqueValue": 763,
            "percentage": "0%",
            "samplingEventIdentifier": "S55078805",
            "observationDate": "14-04-2019"
        },
        {
            "region": "Indian Subcontinent",
            "indiaChecklistScientificName": "Prinia sylvatica",
            "indiaChecklistCommonName": "Jungle Prinia",
            "uniqueValue": 767,
            "percentage": "3%",
            "samplingEventIdentifier": "S176942276",
            "observationDate": "25-05-2024"
        },
        {
            "region": "Indian Subcontinent",
            "indiaChecklistScientificName": "Prinia socialis",
            "indiaChecklistCommonName": "Ashy Prinia",
            "uniqueValue": 769,
            "percentage": "34%",
            "samplingEventIdentifier": "S178320520",
            "observationDate": "31-05-2024"
        },
        {
            "region": "Indian Subcontinent",
            "indiaChecklistScientificName": "Pycnonotus luteolus",
            "indiaChecklistCommonName": "White-browed Bulbul",
            "uniqueValue": 834,
            "percentage": "15%",
            "samplingEventIdentifier": "S177481683",
            "observationDate": "27-05-2024"
        },
        {
            "region": "Indian Subcontinent",
            "indiaChecklistScientificName": "Dumetia hyperythra",
            "indiaChecklistCommonName": "Tawny-bellied Babbler",
            "uniqueValue": 935,
            "percentage": "1%",
            "samplingEventIdentifier": "S163826862",
            "observationDate": "02-03-2024"
        },
        {
            "region": "Mainland India",
            "indiaChecklistScientificName": "Pomatorhinus horsfieldii",
            "indiaChecklistCommonName": "Indian Scimitar Babbler",
            "uniqueValue": 954,
            "percentage": "0%",
            "samplingEventIdentifier": "S35683201",
            "observationDate": "02-04-2017"
        },
        {
            "region": "Indian Subcontinent",
            "indiaChecklistScientificName": "Argya malcolmi",
            "indiaChecklistCommonName": "Large Grey Babbler",
            "uniqueValue": 1012,
            "percentage": "24%",
            "samplingEventIdentifier": "S178320520",
            "observationDate": "31-05-2024"
        },
        {
            "region": "Indian Subcontinent",
            "indiaChecklistScientificName": "Argya striata",
            "indiaChecklistCommonName": "Jungle Babbler",
            "uniqueValue": 1015,
            "percentage": "0%",
            "samplingEventIdentifier": "S78777327",
            "observationDate": "05-02-2010"
        },
        {
            "region": "Indian Subcontinent",
            "indiaChecklistScientificName": "Argya affinis",
            "indiaChecklistCommonName": "Yellow-billed Babbler",
            "uniqueValue": 1016,
            "percentage": "6%",
            "samplingEventIdentifier": "S177481683",
            "observationDate": "27-05-2024"
        },
        {
            "region": "Indian Subcontinent",
            "indiaChecklistScientificName": "Argya caudata",
            "indiaChecklistCommonName": "Common Babbler",
            "uniqueValue": 1017,
            "percentage": "2%",
            "samplingEventIdentifier": "S156986038",
            "observationDate": "24-12-2023"
        },
        {
            "region": "Indian Subcontinent",
            "indiaChecklistScientificName": "Turdus simillimus",
            "indiaChecklistCommonName": "Indian Blackbird",
            "uniqueValue": 1097,
            "percentage": "0%",
            "samplingEventIdentifier": "S35683201",
            "observationDate": "02-04-2017"
        },
        {
            "region": "Indian Subcontinent",
            "indiaChecklistScientificName": "Copsychus fulicatus",
            "indiaChecklistCommonName": "Indian Robin",
            "uniqueValue": 1118,
            "percentage": "23%",
            "samplingEventIdentifier": "S177481683",
            "observationDate": "27-05-2024"
        },
        {
            "region": "Indian Subcontinent",
            "indiaChecklistScientificName": "Cyornis tickelliae",
            "indiaChecklistCommonName": "Tickell's Blue Flycatcher",
            "uniqueValue": 1140,
            "percentage": "5%",
            "samplingEventIdentifier": "S176674978",
            "observationDate": "24-05-2024"
        },
        {
            "region": "Indian Subcontinent",
            "indiaChecklistScientificName": "Dicaeum erythrorhynchos",
            "indiaChecklistCommonName": "Pale-billed Flowerpecker",
            "uniqueValue": 1221,
            "percentage": "2%",
            "samplingEventIdentifier": "S165770285",
            "observationDate": "24-03-2024"
        },
        {
            "region": "Indian Subcontinent",
            "indiaChecklistScientificName": "Leptocoma zeylonica",
            "indiaChecklistCommonName": "Purple-rumped Sunbird",
            "uniqueValue": 1228,
            "percentage": "30%",
            "samplingEventIdentifier": "S178320520",
            "observationDate": "31-05-2024"
        },
        {
            "region": "Indian Subcontinent",
            "indiaChecklistScientificName": "Chloropsis jerdoni",
            "indiaChecklistCommonName": "Jerdon's Leafbird",
            "uniqueValue": 1244,
            "percentage": "0%",
            "samplingEventIdentifier": "S35683201",
            "observationDate": "02-04-2017"
        },
        {
            "region": "Indian Subcontinent",
            "indiaChecklistScientificName": "Lonchura malacca",
            "indiaChecklistCommonName": "Tricoloured Munia",
            "uniqueValue": 1255,
            "percentage": "1%",
            "samplingEventIdentifier": "S152965668",
            "observationDate": "24-10-2023"
        },
        {
            "region": "Indian Subcontinent",
            "indiaChecklistScientificName": "Motacilla maderaspatensis",
            "indiaChecklistCommonName": "White-browed Wagtail",
            "uniqueValue": 1283,
            "percentage": "16%",
            "samplingEventIdentifier": "S166749787",
            "observationDate": "01-04-2024"
        }
    ])
  })
})


  describe('(State,County and Date) Most Common Species ID-T5018', () => {
  it('T5018/pertcentage_most_common_species', async () => {

    const response = await request(app)
      .get('/api/users/pertcentage_most_common_species')
      .query({
        state: 'Karnataka',
        county: 'Haveri',
        start:'01-01-2000',
        end: '12-31-2024'
      })
      .expect(200);
        //  console.log(response.body)
    expect(response.body).toEqual([
        {
            "indiaChecklistScientificName": "Pycnonotus cafer",
            "indiaChecklistCommonName": "Red-vented Bulbul",
            "count": 153,
            "percentage": 43
        },
        {
            "indiaChecklistScientificName": "Merops orientalis",
            "indiaChecklistCommonName": "Green Bee-eater",
            "count": 145,
            "percentage": 41
        },
        {
            "indiaChecklistScientificName": "Spilopelia senegalensis",
            "indiaChecklistCommonName": "Laughing Dove",
            "count": 134,
            "percentage": 38
        },
        {
            "indiaChecklistScientificName": "Acridotheres tristis",
            "indiaChecklistCommonName": "Common Myna",
            "count": 133,
            "percentage": 37
        },
        {
            "indiaChecklistScientificName": "Halcyon smyrnensis",
            "indiaChecklistCommonName": "White-throated Kingfisher",
            "count": 127,
            "percentage": 36
        },
        {
            "indiaChecklistScientificName": "Dicrurus macrocercus",
            "indiaChecklistCommonName": "Black Drongo",
            "count": 126,
            "percentage": 35
        },
        {
            "indiaChecklistScientificName": "Prinia socialis",
            "indiaChecklistCommonName": "Ashy Prinia",
            "count": 120,
            "percentage": 34
        },
        {
            "indiaChecklistScientificName": "Psittacula krameri",
            "indiaChecklistCommonName": "Rose-ringed Parakeet",
            "count": 117,
            "percentage": 33
        },
        {
            "indiaChecklistScientificName": "Vanellus indicus",
            "indiaChecklistCommonName": "Red-wattled Lapwing",
            "count": 117,
            "percentage": 33
        },
        {
            "indiaChecklistScientificName": "Leptocoma zeylonica",
            "indiaChecklistCommonName": "Purple-rumped Sunbird",
            "count": 106,
            "percentage": 30
        }
    ])
  })
})

  describe('(State,County and Date) Hotspots ID-T5020', () => {


  it('T5020/hotspot_area', async () => {

    const response = await request(app)
      .get('/api/users/hotspot_area')
      .query({
        state: 'Karnataka',
        county: 'Haveri',
        start:'01-01-2000',
        end: '12-31-2024'
      })
      .expect(200);
    expect(response.body).toEqual([
        {
            "localityId": "L4905643",
            "latitude": 14.7664793,
            "longitude": 75.3838706,
            "count": "153",
            "locality": "Heggeri Kere  Ã Â²Â¹Ã Â³â€ Ã Â²â€”Ã Â³ÂÃ Â²â€”Ã Â³â€¡Ã Â²Â°Ã Â²Â¿ Ã Â²â€¢Ã Â³â€ Ã Â²Â°Ã Â³â€"
        },
        {
            "localityId": "L4727085",
            "latitude": 14.6310391,
            "longitude": 75.6862307,
            "count": "122",
            "locality": "Ranebennur Blackbuck Sanctuary Ã Â²Â°Ã Â²Â¾Ã Â²Â£Ã Â²Â¿Ã Â²Â¬Ã Â³â€ Ã Â²Â¨Ã Â³ÂÃ Â²Â¨Ã Â³â€šÃ Â²Â°Ã Â³Â Ã Â²â€¢Ã Â³Æ’Ã Â²Â·Ã Â³ÂÃ Â²Â£Ã Â²Â®Ã Â³Æ’Ã Â²â€” Ã Â²â€¦Ã Â²Â­Ã Â²Â¯Ã Â²Â¾Ã Â²Â°Ã Â²Â£Ã Â³ÂÃ Â²Â¯"
        },
        {
            "localityId": "L4300044",
            "latitude": 15.0789194,
            "longitude": 75.1415491,
            "count": "92",
            "locality": "Adavisomapur Kere Ã Â²â€¦Ã Â²Â¡Ã Â²ÂµÃ Â²Â¿Ã Â²Â¸Ã Â³â€¹Ã Â²Â®Ã Â²Â¾Ã Â²ÂªÃ Â³ÂÃ Â²Â° Ã Â²â€¢Ã Â³â€ Ã Â²Â°Ã Â³â€"
        },
        {
            "localityId": "L28407347",
            "latitude": 14.6467858,
            "longitude": 75.7152538,
            "count": "76",
            "locality": "Medleri Lake, Ranebennur (Ã Â²Â®Ã Â³â€¡Ã Â²Â¡Ã Â³ÂÃ Â²Â²Ã Â³â€¡Ã Â²Â°Ã Â²Â¿ Ã Â²â€¢Ã Â³â€ Ã Â²Â°Ã Â³â€ )"
        },
        {
            "localityId": "L5279716",
            "latitude": 14.5188595,
            "longitude": 75.771305,
            "count": "74",
            "locality": "Tungabhadra River Bridge Ã Â²Â¤Ã Â³ÂÃ Â²â€šÃ Â²â€”Ã Â²Â­Ã Â²Â¦Ã Â³ÂÃ Â²Â°Ã Â²Â¾ Ã Â²Â¨Ã Â²Â¦Ã Â²Â¿ Ã Â²Â¸Ã Â³â€¡Ã Â²Â¤Ã Â³ÂÃ Â²ÂµÃ Â³â€  NH48, Harihar"
        }
    ])
  })
})


  describe('(State,County and Date) Complete List of Species ID-T5021', () => {

  it('T5021/complete_List_Of_Species', async () => {

    const response = await request(app)
      .get('/api/users/complete_List_Of_Species')
      .query({
        state: 'Karnataka',
        county: 'Haveri',
        start:'01-01-2000',
        end: '12-31-2024'
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
            "indiaChecklistScientificName": "Sarkidiornis melanotos",
            "migratoryStatusWithinIndia": "Resident",
            "indiaChecklistCommonName": "Knob-billed Duck",
            "uniqueValue": 14,
            "endemicRegion": "None",
            "soibConcernStatus": "Low",
            "wpaSchedule": "Schedule-II",
            "iucnCategory": "Least Concern"
        },
        {
            "indiaChecklistScientificName": "Tadorna ferruginea",
            "migratoryStatusWithinIndia": "Winter Migrant & Localized Summer Migrant",
            "indiaChecklistCommonName": "Ruddy Shelduck",
            "uniqueValue": 15,
            "endemicRegion": "None",
            "soibConcernStatus": "High",
            "wpaSchedule": "Schedule-II",
            "iucnCategory": "Least Concern"
        },
        {
            "indiaChecklistScientificName": "Nettapus coromandelianus",
            "migratoryStatusWithinIndia": "Resident",
            "indiaChecklistCommonName": "Cotton Pygmy-Goose",
            "uniqueValue": 17,
            "endemicRegion": "None",
            "soibConcernStatus": "Moderate",
            "wpaSchedule": "Schedule-I",
            "iucnCategory": "Least Concern"
        },
        {
            "indiaChecklistScientificName": "Spatula querquedula",
            "migratoryStatusWithinIndia": "Winter Migrant",
            "indiaChecklistCommonName": "Garganey",
            "uniqueValue": 20,
            "endemicRegion": "None",
            "soibConcernStatus": "High",
            "wpaSchedule": "Schedule-II",
            "iucnCategory": "Least Concern"
        },
        {
            "indiaChecklistScientificName": "Spatula clypeata",
            "migratoryStatusWithinIndia": "Winter Migrant",
            "indiaChecklistCommonName": "Northern Shoveler",
            "uniqueValue": 21,
            "endemicRegion": "None",
            "soibConcernStatus": "High",
            "wpaSchedule": "Schedule-II",
            "iucnCategory": "Least Concern"
        },
        {
            "indiaChecklistScientificName": "Mareca strepera",
            "migratoryStatusWithinIndia": "Winter Migrant",
            "indiaChecklistCommonName": "Gadwall",
            "uniqueValue": 22,
            "endemicRegion": "None",
            "soibConcernStatus": "Moderate",
            "wpaSchedule": "Schedule-II",
            "iucnCategory": "Least Concern"
        },
        {
            "indiaChecklistScientificName": "Mareca penelope",
            "migratoryStatusWithinIndia": "Winter Migrant",
            "indiaChecklistCommonName": "Eurasian Wigeon",
            "uniqueValue": 24,
            "endemicRegion": "None",
            "soibConcernStatus": "Moderate",
            "wpaSchedule": "Schedule-II",
            "iucnCategory": "Least Concern"
        },
        {
            "indiaChecklistScientificName": "Anas poecilorhyncha",
            "migratoryStatusWithinIndia": "Resident",
            "indiaChecklistCommonName": "Indian Spot-billed Duck",
            "uniqueValue": 25,
            "endemicRegion": "None",
            "soibConcernStatus": "Low",
            "wpaSchedule": "Schedule-II",
            "iucnCategory": "Least Concern"
        },
        {
            "indiaChecklistScientificName": "Anas acuta",
            "migratoryStatusWithinIndia": "Winter Migrant",
            "indiaChecklistCommonName": "Northern Pintail",
            "uniqueValue": 28,
            "endemicRegion": "None",
            "soibConcernStatus": "High",
            "wpaSchedule": "Schedule-II",
            "iucnCategory": "Least Concern"
        },
        {
            "indiaChecklistScientificName": "Anas crecca",
            "migratoryStatusWithinIndia": "Winter Migrant",
            "indiaChecklistCommonName": "Common Teal",
            "uniqueValue": 29,
            "endemicRegion": "None",
            "soibConcernStatus": "High",
            "wpaSchedule": "Schedule-II",
            "iucnCategory": "Least Concern"
        },
        {
            "indiaChecklistScientificName": "Aythya ferina",
            "migratoryStatusWithinIndia": "Winter Migrant",
            "indiaChecklistCommonName": "Common Pochard",
            "uniqueValue": 35,
            "endemicRegion": "None",
            "soibConcernStatus": "High",
            "wpaSchedule": "Schedule-I",
            "iucnCategory": "Vulnerable"
        },
        {
            "indiaChecklistScientificName": "Pavo cristatus",
            "migratoryStatusWithinIndia": "Resident",
            "indiaChecklistCommonName": "Indian Peafowl",
            "uniqueValue": 64,
            "endemicRegion": "Indian Subcontinent",
            "soibConcernStatus": "Low",
            "wpaSchedule": "Schedule-I",
            "iucnCategory": "Least Concern"
        },
        {
            "indiaChecklistScientificName": "Galloperdix lunulata",
            "migratoryStatusWithinIndia": "Resident",
            "indiaChecklistCommonName": "Painted Spurfowl",
            "uniqueValue": 67,
            "endemicRegion": "Mainland India",
            "soibConcernStatus": "Low",
            "wpaSchedule": "Schedule-II",
            "iucnCategory": "Least Concern"
        },
        {
            "indiaChecklistScientificName": "Gallus sonneratii",
            "migratoryStatusWithinIndia": "Resident",
            "indiaChecklistCommonName": "Grey Junglefowl",
            "uniqueValue": 71,
            "endemicRegion": "Mainland India",
            "soibConcernStatus": "Low",
            "wpaSchedule": "Schedule-I",
            "iucnCategory": "Least Concern"
        },
        {
            "indiaChecklistScientificName": "Ortygornis pondicerianus",
            "migratoryStatusWithinIndia": "Resident",
            "indiaChecklistCommonName": "Grey Francolin",
            "uniqueValue": 72,
            "endemicRegion": "None",
            "soibConcernStatus": "Low",
            "wpaSchedule": "Schedule-II",
            "iucnCategory": "Least Concern"
        },
        {
            "indiaChecklistScientificName": "Francolinus pictus",
            "migratoryStatusWithinIndia": "Resident",
            "indiaChecklistCommonName": "Painted Francolin",
            "uniqueValue": 76,
            "endemicRegion": "Indian Subcontinent",
            "soibConcernStatus": "Low",
            "wpaSchedule": "Schedule-II",
            "iucnCategory": "Least Concern"
        },
        {
            "indiaChecklistScientificName": "Coturnix coromandelica",
            "migratoryStatusWithinIndia": "Uncertain",
            "indiaChecklistCommonName": "Rain Quail",
            "uniqueValue": 82,
            "endemicRegion": "None",
            "soibConcernStatus": "Moderate",
            "wpaSchedule": "Schedule-II",
            "iucnCategory": "Least Concern"
        },
        {
            "indiaChecklistScientificName": "Perdicula argoondah",
            "migratoryStatusWithinIndia": "Resident",
            "indiaChecklistCommonName": "Rock Bush-Quail",
            "uniqueValue": 85,
            "endemicRegion": "Mainland India",
            "soibConcernStatus": "Moderate",
            "wpaSchedule": "Schedule-II",
            "iucnCategory": "Least Concern"
        },
        {
            "indiaChecklistScientificName": "Tachybaptus ruficollis",
            "migratoryStatusWithinIndia": "Resident",
            "indiaChecklistCommonName": "Little Grebe",
            "uniqueValue": 91,
            "endemicRegion": "None",
            "soibConcernStatus": "Low",
            "wpaSchedule": "Schedule-II",
            "iucnCategory": "Least Concern"
        },
        {
            "indiaChecklistScientificName": "Columba livia",
            "migratoryStatusWithinIndia": "Resident",
            "indiaChecklistCommonName": "Rock Pigeon",
            "uniqueValue": 96,
            "endemicRegion": "None",
            "soibConcernStatus": "Low",
            "wpaSchedule": "Not protected",
            "iucnCategory": "Least Concern"
        },
        {
            "indiaChecklistScientificName": "Streptopelia decaocto",
            "migratoryStatusWithinIndia": "Resident",
            "indiaChecklistCommonName": "Eurasian Collared Dove",
            "uniqueValue": 108,
            "endemicRegion": "None",
            "soibConcernStatus": "Low",
            "wpaSchedule": "Schedule-II",
            "iucnCategory": "Least Concern"
        },
        {
            "indiaChecklistScientificName": "Streptopelia tranquebarica",
            "migratoryStatusWithinIndia": "Resident & Local Migrant",
            "indiaChecklistCommonName": "Red Collared Dove",
            "uniqueValue": 109,
            "endemicRegion": "None",
            "soibConcernStatus": "Low",
            "wpaSchedule": "Schedule-II",
            "iucnCategory": "Least Concern"
        },
        {
            "indiaChecklistScientificName": "Spilopelia chinensis",
            "migratoryStatusWithinIndia": "Resident",
            "indiaChecklistCommonName": "Spotted Dove",
            "uniqueValue": 110,
            "endemicRegion": "None",
            "soibConcernStatus": "Low",
            "wpaSchedule": "Schedule-II",
            "iucnCategory": "Least Concern"
        },
        {
            "indiaChecklistScientificName": "Spilopelia senegalensis",
            "migratoryStatusWithinIndia": "Resident",
            "indiaChecklistCommonName": "Laughing Dove",
            "uniqueValue": 111,
            "endemicRegion": "None",
            "soibConcernStatus": "Low",
            "wpaSchedule": "Schedule-II",
            "iucnCategory": "Least Concern"
        },
        {
            "indiaChecklistScientificName": "Chalcophaps indica",
            "migratoryStatusWithinIndia": "Resident",
            "indiaChecklistCommonName": "Asian Emerald Dove",
            "uniqueValue": 115,
            "endemicRegion": "None",
            "soibConcernStatus": "Low",
            "wpaSchedule": "Schedule-II",
            "iucnCategory": "Least Concern"
        },
        {
            "indiaChecklistScientificName": "Treron phoenicopterus",
            "migratoryStatusWithinIndia": "Resident",
            "indiaChecklistCommonName": "Yellow-footed Green Pigeon",
            "uniqueValue": 122,
            "endemicRegion": "None",
            "soibConcernStatus": "Low",
            "wpaSchedule": "Schedule-II",
            "iucnCategory": "Least Concern"
        },
        {
            "indiaChecklistScientificName": "Pterocles exustus",
            "migratoryStatusWithinIndia": "Resident",
            "indiaChecklistCommonName": "Chestnut-bellied Sandgrouse",
            "uniqueValue": 133,
            "endemicRegion": "None",
            "soibConcernStatus": "Low",
            "wpaSchedule": "Schedule-II",
            "iucnCategory": "Least Concern"
        },
        {
            "indiaChecklistScientificName": "Centropus sinensis",
            "migratoryStatusWithinIndia": "Resident",
            "indiaChecklistCommonName": "Greater Coucal",
            "uniqueValue": 143,
            "endemicRegion": "None",
            "soibConcernStatus": "Low",
            "wpaSchedule": "Schedule-II",
            "iucnCategory": "Least Concern"
        },
        {
            "indiaChecklistScientificName": "Taccocua leschenaultii",
            "migratoryStatusWithinIndia": "Resident",
            "indiaChecklistCommonName": "Sirkeer Malkoha",
            "uniqueValue": 145,
            "endemicRegion": "Indian Subcontinent",
            "soibConcernStatus": "High",
            "wpaSchedule": "Schedule-II",
            "iucnCategory": "Least Concern"
        },
        {
            "indiaChecklistScientificName": "Phaenicophaeus viridirostris",
            "migratoryStatusWithinIndia": "Resident",
            "indiaChecklistCommonName": "Blue-faced Malkoha",
            "uniqueValue": 146,
            "endemicRegion": "Indian Subcontinent",
            "soibConcernStatus": "Low",
            "wpaSchedule": "Schedule-II",
            "iucnCategory": "Least Concern"
        },
        {
            "indiaChecklistScientificName": "Clamator jacobinus",
            "migratoryStatusWithinIndia": "Resident & Summer Migrant",
            "indiaChecklistCommonName": "Pied Cuckoo",
            "uniqueValue": 149,
            "endemicRegion": "None",
            "soibConcernStatus": "Low",
            "wpaSchedule": "Schedule-II",
            "iucnCategory": "Least Concern"
        },
        {
            "indiaChecklistScientificName": "Eudynamys scolopaceus",
            "migratoryStatusWithinIndia": "Resident",
            "indiaChecklistCommonName": "Asian Koel",
            "uniqueValue": 150,
            "endemicRegion": "None",
            "soibConcernStatus": "Low",
            "wpaSchedule": "Schedule-II",
            "iucnCategory": "Least Concern"
        },
        {
            "indiaChecklistScientificName": "Cacomantis passerinus",
            "migratoryStatusWithinIndia": "Resident & Local Migrant",
            "indiaChecklistCommonName": "Grey-bellied Cuckoo",
            "uniqueValue": 156,
            "endemicRegion": "Indian Subcontinent",
            "soibConcernStatus": "Low",
            "wpaSchedule": "Schedule-II",
            "iucnCategory": "Least Concern"
        },
        {
            "indiaChecklistScientificName": "Hierococcyx varius",
            "migratoryStatusWithinIndia": "Resident & Local Migrant",
            "indiaChecklistCommonName": "Common Hawk-Cuckoo",
            "uniqueValue": 160,
            "endemicRegion": "Indian Subcontinent",
            "soibConcernStatus": "Low",
            "wpaSchedule": "Schedule-II",
            "iucnCategory": "Least Concern"
        },
        {
            "indiaChecklistScientificName": "Caprimulgus asiaticus",
            "migratoryStatusWithinIndia": "Resident",
            "indiaChecklistCommonName": "Indian Nightjar",
            "uniqueValue": 176,
            "endemicRegion": "None",
            "soibConcernStatus": "NA",
            "wpaSchedule": "Schedule-II",
            "iucnCategory": "Least Concern"
        },
        {
            "indiaChecklistScientificName": "Caprimulgus affinis",
            "migratoryStatusWithinIndia": "Resident & Local Migrant",
            "indiaChecklistCommonName": "Savanna Nightjar",
            "uniqueValue": 177,
            "endemicRegion": "None",
            "soibConcernStatus": "NA",
            "wpaSchedule": "Schedule-II",
            "iucnCategory": "Least Concern"
        },
        {
            "indiaChecklistScientificName": "Tachymarptis melba",
            "migratoryStatusWithinIndia": "Resident & Local Migrant",
            "indiaChecklistCommonName": "Alpine Swift",
            "uniqueValue": 186,
            "endemicRegion": "None",
            "soibConcernStatus": "Low",
            "wpaSchedule": "Schedule-II",
            "iucnCategory": "Least Concern"
        },
        {
            "indiaChecklistScientificName": "Apus affinis",
            "migratoryStatusWithinIndia": "Resident",
            "indiaChecklistCommonName": "Little Swift",
            "uniqueValue": 191,
            "endemicRegion": "None",
            "soibConcernStatus": "Low",
            "wpaSchedule": "Schedule-II",
            "iucnCategory": "Least Concern"
        },
        {
            "indiaChecklistScientificName": "Cypsiurus balasiensis",
            "migratoryStatusWithinIndia": "Resident",
            "indiaChecklistCommonName": "Asian Palm Swift",
            "uniqueValue": 193,
            "endemicRegion": "None",
            "soibConcernStatus": "Low",
            "wpaSchedule": "Schedule-II",
            "iucnCategory": "Least Concern"
        },
        {
            "indiaChecklistScientificName": "Hemiprocne coronata",
            "migratoryStatusWithinIndia": "Resident",
            "indiaChecklistCommonName": "Crested Treeswift",
            "uniqueValue": 194,
            "endemicRegion": "None",
            "soibConcernStatus": "Moderate",
            "wpaSchedule": "Schedule-I",
            "iucnCategory": "Least Concern"
        },
        {
            "indiaChecklistScientificName": "Gallinula chloropus",
            "migratoryStatusWithinIndia": "Resident & Local Migrant",
            "indiaChecklistCommonName": "Common Moorhen",
            "uniqueValue": 200,
            "endemicRegion": "None",
            "soibConcernStatus": "Low",
            "wpaSchedule": "Schedule-II",
            "iucnCategory": "Least Concern"
        },
        {
            "indiaChecklistScientificName": "Fulica atra",
            "migratoryStatusWithinIndia": "Resident & Winter Migrant",
            "indiaChecklistCommonName": "Eurasian Coot",
            "uniqueValue": 201,
            "endemicRegion": "None",
            "soibConcernStatus": "Low",
            "wpaSchedule": "Schedule-II",
            "iucnCategory": "Least Concern"
        },
        {
            "indiaChecklistScientificName": "Porphyrio poliocephalus",
            "migratoryStatusWithinIndia": "Resident",
            "indiaChecklistCommonName": "Grey-headed Swamphen",
            "uniqueValue": 202,
            "endemicRegion": "None",
            "soibConcernStatus": "Low",
            "wpaSchedule": "Schedule-II",
            "iucnCategory": "Not recognized"
        },
        {
            "indiaChecklistScientificName": "Amaurornis phoenicurus",
            "migratoryStatusWithinIndia": "Resident",
            "indiaChecklistCommonName": "White-breasted Waterhen",
            "uniqueValue": 205,
            "endemicRegion": "None",
            "soibConcernStatus": "Low",
            "wpaSchedule": "Schedule-II",
            "iucnCategory": "Least Concern"
        },
        {
            "indiaChecklistScientificName": "Zapornia akool",
            "migratoryStatusWithinIndia": "Resident",
            "indiaChecklistCommonName": "Brown Crake",
            "uniqueValue": 210,
            "endemicRegion": "None",
            "soibConcernStatus": "Low",
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
            "indiaChecklistScientificName": "Burhinus indicus",
            "migratoryStatusWithinIndia": "Resident",
            "indiaChecklistCommonName": "Indian Thick-knee",
            "uniqueValue": 222,
            "endemicRegion": "None",
            "soibConcernStatus": "Low",
            "wpaSchedule": "Schedule-II",
            "iucnCategory": "Least Concern"
        },
        {
            "indiaChecklistScientificName": "Himantopus himantopus",
            "migratoryStatusWithinIndia": "Resident & Local Migrant",
            "indiaChecklistCommonName": "Black-winged Stilt",
            "uniqueValue": 223,
            "endemicRegion": "None",
            "soibConcernStatus": "Low",
            "wpaSchedule": "Schedule-II",
            "iucnCategory": "Least Concern"
        },
        {
            "indiaChecklistScientificName": "Pluvialis fulva",
            "migratoryStatusWithinIndia": "Winter Migrant",
            "indiaChecklistCommonName": "Pacific Golden Plover",
            "uniqueValue": 230,
            "endemicRegion": "None",
            "soibConcernStatus": "Moderate",
            "wpaSchedule": "Schedule-I",
            "iucnCategory": "Least Concern"
        },
        {
            "indiaChecklistScientificName": "Charadrius dubius",
            "migratoryStatusWithinIndia": "Resident & Winter Migrant",
            "indiaChecklistCommonName": "Little Ringed Plover",
            "uniqueValue": 232,
            "endemicRegion": "None",
            "soibConcernStatus": "High",
            "wpaSchedule": "Schedule-II",
            "iucnCategory": "Least Concern"
        },
        {
            "indiaChecklistScientificName": "Vanellus malabaricus",
            "migratoryStatusWithinIndia": "Resident",
            "indiaChecklistCommonName": "Yellow-wattled Lapwing",
            "uniqueValue": 236,
            "endemicRegion": "Indian Subcontinent",
            "soibConcernStatus": "Low",
            "wpaSchedule": "Schedule-II",
            "iucnCategory": "Least Concern"
        },
        {
            "indiaChecklistScientificName": "Vanellus indicus",
            "migratoryStatusWithinIndia": "Resident",
            "indiaChecklistCommonName": "Red-wattled Lapwing",
            "uniqueValue": 238,
            "endemicRegion": "None",
            "soibConcernStatus": "Low",
            "wpaSchedule": "Schedule-II",
            "iucnCategory": "Least Concern"
        },
        {
            "indiaChecklistScientificName": "Anarhynchus alexandrinus",
            "migratoryStatusWithinIndia": "Resident & Winter Migrant",
            "indiaChecklistCommonName": "Kentish Plover",
            "uniqueValue": 245,
            "endemicRegion": "None",
            "soibConcernStatus": "High",
            "wpaSchedule": "Schedule-II",
            "iucnCategory": "Least Concern"
        },
        {
            "indiaChecklistScientificName": "Rostratula benghalensis",
            "migratoryStatusWithinIndia": "Resident",
            "indiaChecklistCommonName": "Greater Painted-Snipe",
            "uniqueValue": 246,
            "endemicRegion": "None",
            "soibConcernStatus": "Low",
            "wpaSchedule": "Schedule-II",
            "iucnCategory": "Least Concern"
        },
        {
            "indiaChecklistScientificName": "Hydrophasianus chirurgus",
            "migratoryStatusWithinIndia": "Resident",
            "indiaChecklistCommonName": "Pheasant-tailed Jacana",
            "uniqueValue": 247,
            "endemicRegion": "None",
            "soibConcernStatus": "Moderate",
            "wpaSchedule": "Schedule-II",
            "iucnCategory": "Least Concern"
        },
        {
            "indiaChecklistScientificName": "Metopidius indicus",
            "migratoryStatusWithinIndia": "Resident",
            "indiaChecklistCommonName": "Bronze-winged Jacana",
            "uniqueValue": 248,
            "endemicRegion": "None",
            "soibConcernStatus": "Low",
            "wpaSchedule": "Schedule-II",
            "iucnCategory": "Least Concern"
        },
        {
            "indiaChecklistScientificName": "Limosa limosa",
            "migratoryStatusWithinIndia": "Winter Migrant",
            "indiaChecklistCommonName": "Black-tailed Godwit",
            "uniqueValue": 252,
            "endemicRegion": "None",
            "soibConcernStatus": "High",
            "wpaSchedule": "Schedule-II",
            "iucnCategory": "Near Threatened"
        },
        {
            "indiaChecklistScientificName": "Gallinago gallinago",
            "migratoryStatusWithinIndia": "Winter Migrant",
            "indiaChecklistCommonName": "Common Snipe",
            "uniqueValue": 262,
            "endemicRegion": "None",
            "soibConcernStatus": "Low",
            "wpaSchedule": "Schedule-II",
            "iucnCategory": "Least Concern"
        },
        {
            "indiaChecklistScientificName": "Actitis hypoleucos",
            "migratoryStatusWithinIndia": "Winter Migrant",
            "indiaChecklistCommonName": "Common Sandpiper",
            "uniqueValue": 266,
            "endemicRegion": "None",
            "soibConcernStatus": "Moderate",
            "wpaSchedule": "Schedule-II",
            "iucnCategory": "Least Concern"
        },
        {
            "indiaChecklistScientificName": "Tringa ochropus",
            "migratoryStatusWithinIndia": "Winter Migrant",
            "indiaChecklistCommonName": "Green Sandpiper",
            "uniqueValue": 267,
            "endemicRegion": "None",
            "soibConcernStatus": "Low",
            "wpaSchedule": "Schedule-II",
            "iucnCategory": "Least Concern"
        },
        {
            "indiaChecklistScientificName": "Tringa stagnatilis",
            "migratoryStatusWithinIndia": "Winter Migrant",
            "indiaChecklistCommonName": "Marsh Sandpiper",
            "uniqueValue": 269,
            "endemicRegion": "None",
            "soibConcernStatus": "High",
            "wpaSchedule": "Schedule-II",
            "iucnCategory": "Least Concern"
        },
        {
            "indiaChecklistScientificName": "Tringa glareola",
            "migratoryStatusWithinIndia": "Winter Migrant",
            "indiaChecklistCommonName": "Wood Sandpiper",
            "uniqueValue": 270,
            "endemicRegion": "None",
            "soibConcernStatus": "Moderate",
            "wpaSchedule": "Schedule-II",
            "iucnCategory": "Least Concern"
        },
        {
            "indiaChecklistScientificName": "Tringa erythropus",
            "migratoryStatusWithinIndia": "Winter Migrant",
            "indiaChecklistCommonName": "Spotted Redshank",
            "uniqueValue": 273,
            "endemicRegion": "None",
            "soibConcernStatus": "High",
            "wpaSchedule": "Schedule-II",
            "iucnCategory": "Least Concern"
        },
        {
            "indiaChecklistScientificName": "Tringa nebularia",
            "migratoryStatusWithinIndia": "Winter Migrant",
            "indiaChecklistCommonName": "Common Greenshank",
            "uniqueValue": 274,
            "endemicRegion": "None",
            "soibConcernStatus": "High",
            "wpaSchedule": "Schedule-I",
            "iucnCategory": "Least Concern"
        },
        {
            "indiaChecklistScientificName": "Calidris pugnax",
            "migratoryStatusWithinIndia": "Winter Migrant",
            "indiaChecklistCommonName": "Ruff",
            "uniqueValue": 278,
            "endemicRegion": "None",
            "soibConcernStatus": "High",
            "wpaSchedule": "Schedule-II",
            "iucnCategory": "Least Concern"
        },
        {
            "indiaChecklistScientificName": "Calidris temminckii",
            "migratoryStatusWithinIndia": "Winter Migrant",
            "indiaChecklistCommonName": "Temminck's Stint",
            "uniqueValue": 282,
            "endemicRegion": "None",
            "soibConcernStatus": "Moderate",
            "wpaSchedule": "Schedule-II",
            "iucnCategory": "Least Concern"
        },
        {
            "indiaChecklistScientificName": "Calidris minuta",
            "migratoryStatusWithinIndia": "Winter Migrant",
            "indiaChecklistCommonName": "Little Stint",
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
            "indiaChecklistScientificName": "Cursorius coromandelicus",
            "migratoryStatusWithinIndia": "Resident",
            "indiaChecklistCommonName": "Indian Courser",
            "uniqueValue": 297,
            "endemicRegion": "Indian Subcontinent",
            "soibConcernStatus": "High",
            "wpaSchedule": "Schedule-I",
            "iucnCategory": "Least Concern"
        },
        {
            "indiaChecklistScientificName": "Glareola lactea",
            "migratoryStatusWithinIndia": "Resident",
            "indiaChecklistCommonName": "Small Pratincole",
            "uniqueValue": 298,
            "endemicRegion": "None",
            "soibConcernStatus": "Moderate",
            "wpaSchedule": "Schedule-II",
            "iucnCategory": "Least Concern"
        },
        {
            "indiaChecklistScientificName": "Chlidonias hybrida",
            "migratoryStatusWithinIndia": "Winter Migrant & Localized Summer Migrant",
            "indiaChecklistCommonName": "Whiskered Tern",
            "uniqueValue": 332,
            "endemicRegion": "None",
            "soibConcernStatus": "High",
            "wpaSchedule": "Schedule-II",
            "iucnCategory": "Least Concern"
        },
        {
            "indiaChecklistScientificName": "Sterna aurantia",
            "migratoryStatusWithinIndia": "Resident & Local Migrant",
            "indiaChecklistCommonName": "River Tern",
            "uniqueValue": 335,
            "endemicRegion": "None",
            "soibConcernStatus": "Moderate",
            "wpaSchedule": "Schedule-I",
            "iucnCategory": "Vulnerable"
        },
        {
            "indiaChecklistScientificName": "Anastomus oscitans",
            "migratoryStatusWithinIndia": "Resident",
            "indiaChecklistCommonName": "Asian Openbill",
            "uniqueValue": 365,
            "endemicRegion": "None",
            "soibConcernStatus": "Low",
            "wpaSchedule": "Schedule-II",
            "iucnCategory": "Least Concern"
        },
        {
            "indiaChecklistScientificName": "Ciconia nigra",
            "migratoryStatusWithinIndia": "Winter Migrant",
            "indiaChecklistCommonName": "Black Stork",
            "uniqueValue": 366,
            "endemicRegion": "None",
            "soibConcernStatus": "Moderate",
            "wpaSchedule": "Schedule-II",
            "iucnCategory": "Least Concern"
        },
        {
            "indiaChecklistScientificName": "Ciconia episcopus",
            "migratoryStatusWithinIndia": "Resident",
            "indiaChecklistCommonName": "Woolly-necked Stork",
            "uniqueValue": 367,
            "endemicRegion": "None",
            "soibConcernStatus": "Moderate",
            "wpaSchedule": "Schedule-II",
            "iucnCategory": "Near Threatened"
        },
        {
            "indiaChecklistScientificName": "Leptoptilos javanicus",
            "migratoryStatusWithinIndia": "Resident & Local Migrant",
            "indiaChecklistCommonName": "Lesser Adjutant",
            "uniqueValue": 370,
            "endemicRegion": "None",
            "soibConcernStatus": "Moderate",
            "wpaSchedule": "Schedule-I",
            "iucnCategory": "Near Threatened"
        },
        {
            "indiaChecklistScientificName": "Mycteria leucocephala",
            "migratoryStatusWithinIndia": "Resident",
            "indiaChecklistCommonName": "Painted Stork",
            "uniqueValue": 372,
            "endemicRegion": "None",
            "soibConcernStatus": "Low",
            "wpaSchedule": "Schedule-II",
            "iucnCategory": "Least Concern"
        },
        {
            "indiaChecklistScientificName": "Anhinga melanogaster",
            "migratoryStatusWithinIndia": "Resident",
            "indiaChecklistCommonName": "Oriental Darter",
            "uniqueValue": 379,
            "endemicRegion": "None",
            "soibConcernStatus": "Low",
            "wpaSchedule": "Schedule-II",
            "iucnCategory": "Least Concern"
        },
        {
            "indiaChecklistScientificName": "Microcarbo niger",
            "migratoryStatusWithinIndia": "Resident",
            "indiaChecklistCommonName": "Little Cormorant",
            "uniqueValue": 380,
            "endemicRegion": "None",
            "soibConcernStatus": "Low",
            "wpaSchedule": "Schedule-II",
            "iucnCategory": "Least Concern"
        },
        {
            "indiaChecklistScientificName": "Phalacrocorax carbo",
            "migratoryStatusWithinIndia": "Resident & Winter Migrant",
            "indiaChecklistCommonName": "Great Cormorant",
            "uniqueValue": 381,
            "endemicRegion": "None",
            "soibConcernStatus": "Low",
            "wpaSchedule": "Schedule-II",
            "iucnCategory": "Least Concern"
        },
        {
            "indiaChecklistScientificName": "Phalacrocorax fuscicollis",
            "migratoryStatusWithinIndia": "Resident",
            "indiaChecklistCommonName": "Indian Cormorant",
            "uniqueValue": 382,
            "endemicRegion": "None",
            "soibConcernStatus": "Low",
            "wpaSchedule": "Schedule-II",
            "iucnCategory": "Least Concern"
        },
        {
            "indiaChecklistScientificName": "Ixobrychus sinensis",
            "migratoryStatusWithinIndia": "Resident & Local Migrant",
            "indiaChecklistCommonName": "Yellow Bittern",
            "uniqueValue": 390,
            "endemicRegion": "None",
            "soibConcernStatus": "Low",
            "wpaSchedule": "Schedule-II",
            "iucnCategory": "Least Concern"
        },
        {
            "indiaChecklistScientificName": "Nycticorax nycticorax",
            "migratoryStatusWithinIndia": "Resident",
            "indiaChecklistCommonName": "Black-crowned Night Heron",
            "uniqueValue": 391,
            "endemicRegion": "None",
            "soibConcernStatus": "Low",
            "wpaSchedule": "Schedule-II",
            "iucnCategory": "Least Concern"
        },
        {
            "indiaChecklistScientificName": "Egretta garzetta",
            "migratoryStatusWithinIndia": "Resident",
            "indiaChecklistCommonName": "Little Egret",
            "uniqueValue": 395,
            "endemicRegion": "None",
            "soibConcernStatus": "Low",
            "wpaSchedule": "Schedule-II",
            "iucnCategory": "Least Concern"
        },
        {
            "indiaChecklistScientificName": "Egretta gularis",
            "migratoryStatusWithinIndia": "Resident & Local Migrant",
            "indiaChecklistCommonName": "Western Reef Egret",
            "uniqueValue": 396,
            "endemicRegion": "None",
            "soibConcernStatus": "High",
            "wpaSchedule": "Schedule-II",
            "iucnCategory": "Least Concern"
        },
        {
            "indiaChecklistScientificName": "Ardeola grayii",
            "migratoryStatusWithinIndia": "Resident",
            "indiaChecklistCommonName": "Indian Pond-Heron",
            "uniqueValue": 399,
            "endemicRegion": "None",
            "soibConcernStatus": "Low",
            "wpaSchedule": "Schedule-II",
            "iucnCategory": "Least Concern"
        },
        {
            "indiaChecklistScientificName": "Bubulcus coromandus",
            "migratoryStatusWithinIndia": "Resident",
            "indiaChecklistCommonName": "Eastern Cattle Egret",
            "uniqueValue": 402,
            "endemicRegion": "None",
            "soibConcernStatus": "Low",
            "wpaSchedule": "Schedule-II",
            "iucnCategory": "Not recognized"
        },
        {
            "indiaChecklistScientificName": "Ardea alba",
            "migratoryStatusWithinIndia": "Resident",
            "indiaChecklistCommonName": "Great Egret",
            "uniqueValue": 403,
            "endemicRegion": "None",
            "soibConcernStatus": "Low",
            "wpaSchedule": "Schedule-II",
            "iucnCategory": "Least Concern"
        },
        {
            "indiaChecklistScientificName": "Ardea intermedia",
            "migratoryStatusWithinIndia": "Resident",
            "indiaChecklistCommonName": "Intermediate Egret",
            "uniqueValue": 404,
            "endemicRegion": "None",
            "soibConcernStatus": "Low",
            "wpaSchedule": "Schedule-II",
            "iucnCategory": "Least Concern"
        },
        {
            "indiaChecklistScientificName": "Ardea cinerea",
            "migratoryStatusWithinIndia": "Resident",
            "indiaChecklistCommonName": "Grey Heron",
            "uniqueValue": 405,
            "endemicRegion": "None",
            "soibConcernStatus": "Low",
            "wpaSchedule": "Schedule-II",
            "iucnCategory": "Least Concern"
        },
        {
            "indiaChecklistScientificName": "Ardea purpurea",
            "migratoryStatusWithinIndia": "Resident",
            "indiaChecklistCommonName": "Purple Heron",
            "uniqueValue": 406,
            "endemicRegion": "None",
            "soibConcernStatus": "Low",
            "wpaSchedule": "Schedule-II",
            "iucnCategory": "Least Concern"
        },
        {
            "indiaChecklistScientificName": "Plegadis falcinellus",
            "migratoryStatusWithinIndia": "Resident",
            "indiaChecklistCommonName": "Glossy Ibis",
            "uniqueValue": 409,
            "endemicRegion": "None",
            "soibConcernStatus": "Low",
            "wpaSchedule": "Schedule-II",
            "iucnCategory": "Least Concern"
        },
        {
            "indiaChecklistScientificName": "Threskiornis melanocephalus",
            "migratoryStatusWithinIndia": "Resident",
            "indiaChecklistCommonName": "Black-headed Ibis",
            "uniqueValue": 410,
            "endemicRegion": "None",
            "soibConcernStatus": "Low",
            "wpaSchedule": "Schedule-II",
            "iucnCategory": "Least Concern"
        },
        {
            "indiaChecklistScientificName": "Pseudibis papillosa",
            "migratoryStatusWithinIndia": "Resident",
            "indiaChecklistCommonName": "Red-naped Ibis",
            "uniqueValue": 411,
            "endemicRegion": "Indian Subcontinent",
            "soibConcernStatus": "Low",
            "wpaSchedule": "Schedule-II",
            "iucnCategory": "Least Concern"
        },
        {
            "indiaChecklistScientificName": "Platalea leucorodia",
            "migratoryStatusWithinIndia": "Resident & Local Migrant",
            "indiaChecklistCommonName": "Eurasian Spoonbill",
            "uniqueValue": 412,
            "endemicRegion": "None",
            "soibConcernStatus": "High",
            "wpaSchedule": "Schedule-I",
            "iucnCategory": "Least Concern"
        },
        {
            "indiaChecklistScientificName": "Pandion haliaetus",
            "migratoryStatusWithinIndia": "Winter Migrant",
            "indiaChecklistCommonName": "Osprey",
            "uniqueValue": 413,
            "endemicRegion": "None",
            "soibConcernStatus": "High",
            "wpaSchedule": "Schedule-I",
            "iucnCategory": "Least Concern"
        },
        {
            "indiaChecklistScientificName": "Elanus caeruleus",
            "migratoryStatusWithinIndia": "Resident",
            "indiaChecklistCommonName": "Black-winged Kite",
            "uniqueValue": 414,
            "endemicRegion": "None",
            "soibConcernStatus": "Moderate",
            "wpaSchedule": "Schedule-II",
            "iucnCategory": "Least Concern"
        },
        {
            "indiaChecklistScientificName": "Pernis ptilorhynchus",
            "migratoryStatusWithinIndia": "Resident & Winter Migrant",
            "indiaChecklistCommonName": "Oriental Honey Buzzard",
            "uniqueValue": 418,
            "endemicRegion": "None",
            "soibConcernStatus": "Low",
            "wpaSchedule": "Schedule-II",
            "iucnCategory": "Least Concern"
        },
        {
            "indiaChecklistScientificName": "Circaetus gallicus",
            "migratoryStatusWithinIndia": "Resident",
            "indiaChecklistCommonName": "Short-toed Snake Eagle",
            "uniqueValue": 431,
            "endemicRegion": "None",
            "soibConcernStatus": "High",
            "wpaSchedule": "Schedule-I",
            "iucnCategory": "Least Concern"
        },
        {
            "indiaChecklistScientificName": "Ictinaetus malaiensis",
            "migratoryStatusWithinIndia": "Resident",
            "indiaChecklistCommonName": "Black Eagle",
            "uniqueValue": 436,
            "endemicRegion": "None",
            "soibConcernStatus": "Low",
            "wpaSchedule": "Schedule-I",
            "iucnCategory": "Least Concern"
        },
        {
            "indiaChecklistScientificName": "Clanga hastata",
            "migratoryStatusWithinIndia": "Resident & Within-India Migrant",
            "indiaChecklistCommonName": "Indian Spotted Eagle",
            "uniqueValue": 437,
            "endemicRegion": "None",
            "soibConcernStatus": "Moderate",
            "wpaSchedule": "Schedule-I",
            "iucnCategory": "Vulnerable"
        },
        {
            "indiaChecklistScientificName": "Clanga clanga",
            "migratoryStatusWithinIndia": "Winter Migrant",
            "indiaChecklistCommonName": "Greater Spotted Eagle",
            "uniqueValue": 438,
            "endemicRegion": "None",
            "soibConcernStatus": "Low",
            "wpaSchedule": "Schedule-I",
            "iucnCategory": "Vulnerable"
        },
        {
            "indiaChecklistScientificName": "Hieraaetus pennatus",
            "migratoryStatusWithinIndia": "Winter Migrant",
            "indiaChecklistCommonName": "Booted Eagle",
            "uniqueValue": 439,
            "endemicRegion": "None",
            "soibConcernStatus": "Low",
            "wpaSchedule": "Schedule-I",
            "iucnCategory": "Least Concern"
        },
        {
            "indiaChecklistScientificName": "Aquila fasciata",
            "migratoryStatusWithinIndia": "Resident",
            "indiaChecklistCommonName": "Bonelli's Eagle",
            "uniqueValue": 444,
            "endemicRegion": "None",
            "soibConcernStatus": "Low",
            "wpaSchedule": "Schedule-I",
            "iucnCategory": "Least Concern"
        },
        {
            "indiaChecklistScientificName": "Butastur teesa",
            "migratoryStatusWithinIndia": "Resident & Local Migrant",
            "indiaChecklistCommonName": "White-eyed Buzzard",
            "uniqueValue": 445,
            "endemicRegion": "None",
            "soibConcernStatus": "Moderate",
            "wpaSchedule": "Schedule-I",
            "iucnCategory": "Least Concern"
        },
        {
            "indiaChecklistScientificName": "Circus aeruginosus",
            "migratoryStatusWithinIndia": "Winter Migrant",
            "indiaChecklistCommonName": "Western Marsh Harrier",
            "uniqueValue": 448,
            "endemicRegion": "None",
            "soibConcernStatus": "High",
            "wpaSchedule": "Schedule-I",
            "iucnCategory": "Least Concern"
        },
        {
            "indiaChecklistScientificName": "Circus macrourus",
            "migratoryStatusWithinIndia": "Winter Migrant",
            "indiaChecklistCommonName": "Pallid Harrier",
            "uniqueValue": 451,
            "endemicRegion": "None",
            "soibConcernStatus": "High",
            "wpaSchedule": "Schedule-I",
            "iucnCategory": "Near Threatened"
        },
        {
            "indiaChecklistScientificName": "Circus pygargus",
            "migratoryStatusWithinIndia": "Winter Migrant",
            "indiaChecklistCommonName": "Montagu's Harrier",
            "uniqueValue": 453,
            "endemicRegion": "None",
            "soibConcernStatus": "High",
            "wpaSchedule": "Schedule-I",
            "iucnCategory": "Least Concern"
        },
        {
            "indiaChecklistScientificName": "Accipiter badius",
            "migratoryStatusWithinIndia": "Resident",
            "indiaChecklistCommonName": "Shikra",
            "uniqueValue": 455,
            "endemicRegion": "None",
            "soibConcernStatus": "Low",
            "wpaSchedule": "Schedule-I",
            "iucnCategory": "Least Concern"
        },
        {
            "indiaChecklistScientificName": "Accipiter nisus",
            "migratoryStatusWithinIndia": "Resident & Winter Migrant",
            "indiaChecklistCommonName": "Eurasian Sparrowhawk",
            "uniqueValue": 460,
            "endemicRegion": "None",
            "soibConcernStatus": "Low",
            "wpaSchedule": "Schedule-I",
            "iucnCategory": "Least Concern"
        },
        {
            "indiaChecklistScientificName": "Milvus migrans",
            "migratoryStatusWithinIndia": "Resident & Winter Migrant",
            "indiaChecklistCommonName": "Black Kite",
            "uniqueValue": 463,
            "endemicRegion": "None",
            "soibConcernStatus": "Low",
            "wpaSchedule": "Schedule-II",
            "iucnCategory": "Least Concern"
        },
        {
            "indiaChecklistScientificName": "Haliastur indus",
            "migratoryStatusWithinIndia": "Resident",
            "indiaChecklistCommonName": "Brahminy Kite",
            "uniqueValue": 464,
            "endemicRegion": "None",
            "soibConcernStatus": "Low",
            "wpaSchedule": "Schedule-I",
            "iucnCategory": "Least Concern"
        },
        {
            "indiaChecklistScientificName": "Tyto alba",
            "migratoryStatusWithinIndia": "Resident",
            "indiaChecklistCommonName": "Common Barn-Owl",
            "uniqueValue": 476,
            "endemicRegion": "None",
            "soibConcernStatus": "NA",
            "wpaSchedule": "Schedule-I",
            "iucnCategory": "Least Concern"
        },
        {
            "indiaChecklistScientificName": "Athene brama",
            "migratoryStatusWithinIndia": "Resident",
            "indiaChecklistCommonName": "Spotted Owlet",
            "uniqueValue": 498,
            "endemicRegion": "None",
            "soibConcernStatus": "NA",
            "wpaSchedule": "Schedule-II",
            "iucnCategory": "Least Concern"
        },
        {
            "indiaChecklistScientificName": "Upupa epops",
            "migratoryStatusWithinIndia": "Within-India Migrant & Winter Migrant",
            "indiaChecklistCommonName": "Eurasian Hoopoe",
            "uniqueValue": 514,
            "endemicRegion": "None",
            "soibConcernStatus": "Moderate",
            "wpaSchedule": "Schedule-II",
            "iucnCategory": "Least Concern"
        },
        {
            "indiaChecklistScientificName": "Ocyceros birostris",
            "migratoryStatusWithinIndia": "Resident",
            "indiaChecklistCommonName": "Indian Grey Hornbill",
            "uniqueValue": 517,
            "endemicRegion": "Indian Subcontinent",
            "soibConcernStatus": "Low",
            "wpaSchedule": "Schedule-II",
            "iucnCategory": "Least Concern"
        },
        {
            "indiaChecklistScientificName": "Ocyceros griseus",
            "migratoryStatusWithinIndia": "Resident",
            "indiaChecklistCommonName": "Malabar Grey Hornbill",
            "uniqueValue": 518,
            "endemicRegion": "Western Ghats",
            "soibConcernStatus": "Moderate",
            "wpaSchedule": "Schedule-I",
            "iucnCategory": "Vulnerable"
        },
        {
            "indiaChecklistScientificName": "Anthracoceros coronatus",
            "migratoryStatusWithinIndia": "Resident",
            "indiaChecklistCommonName": "Malabar Pied-Hornbill",
            "uniqueValue": 519,
            "endemicRegion": "Indian Subcontinent",
            "soibConcernStatus": "Moderate",
            "wpaSchedule": "Schedule-I",
            "iucnCategory": "Near Threatened"
        },
        {
            "indiaChecklistScientificName": "Alcedo atthis",
            "migratoryStatusWithinIndia": "Resident",
            "indiaChecklistCommonName": "Common Kingfisher",
            "uniqueValue": 525,
            "endemicRegion": "None",
            "soibConcernStatus": "Low",
            "wpaSchedule": "Schedule-II",
            "iucnCategory": "Least Concern"
        },
        {
            "indiaChecklistScientificName": "Pelargopsis capensis",
            "migratoryStatusWithinIndia": "Resident",
            "indiaChecklistCommonName": "Stork-billed Kingfisher",
            "uniqueValue": 530,
            "endemicRegion": "None",
            "soibConcernStatus": "Low",
            "wpaSchedule": "Schedule-II",
            "iucnCategory": "Least Concern"
        },
        {
            "indiaChecklistScientificName": "Halcyon smyrnensis",
            "migratoryStatusWithinIndia": "Resident",
            "indiaChecklistCommonName": "White-throated Kingfisher",
            "uniqueValue": 532,
            "endemicRegion": "None",
            "soibConcernStatus": "Low",
            "wpaSchedule": "Schedule-II",
            "iucnCategory": "Least Concern"
        },
        {
            "indiaChecklistScientificName": "Ceryle rudis",
            "migratoryStatusWithinIndia": "Resident",
            "indiaChecklistCommonName": "Pied Kingfisher",
            "uniqueValue": 536,
            "endemicRegion": "None",
            "soibConcernStatus": "Moderate",
            "wpaSchedule": "Schedule-II",
            "iucnCategory": "Least Concern"
        },
        {
            "indiaChecklistScientificName": "Merops orientalis",
            "migratoryStatusWithinIndia": "Resident",
            "indiaChecklistCommonName": "Green Bee-eater",
            "uniqueValue": 538,
            "endemicRegion": "None",
            "soibConcernStatus": "Low",
            "wpaSchedule": "Schedule-II",
            "iucnCategory": "Least Concern"
        },
        {
            "indiaChecklistScientificName": "Merops philippinus",
            "migratoryStatusWithinIndia": "Within-India Migrant & Winter Migrant",
            "indiaChecklistCommonName": "Blue-tailed Bee-eater",
            "uniqueValue": 541,
            "endemicRegion": "None",
            "soibConcernStatus": "Low",
            "wpaSchedule": "Schedule-II",
            "iucnCategory": "Least Concern"
        },
        {
            "indiaChecklistScientificName": "Merops leschenaulti",
            "migratoryStatusWithinIndia": "Resident & Within-India Migrant",
            "indiaChecklistCommonName": "Chestnut-headed Bee-eater",
            "uniqueValue": 543,
            "endemicRegion": "None",
            "soibConcernStatus": "Low",
            "wpaSchedule": "Schedule-II",
            "iucnCategory": "Least Concern"
        },
        {
            "indiaChecklistScientificName": "Coracias garrulus",
            "migratoryStatusWithinIndia": "Passage Migrant & Localized Summer Migrant",
            "indiaChecklistCommonName": "European Roller",
            "uniqueValue": 544,
            "endemicRegion": "None",
            "soibConcernStatus": "Moderate",
            "wpaSchedule": "Schedule-II",
            "iucnCategory": "Least Concern"
        },
        {
            "indiaChecklistScientificName": "Coracias benghalensis",
            "migratoryStatusWithinIndia": "Resident",
            "indiaChecklistCommonName": "Indian Roller",
            "uniqueValue": 545,
            "endemicRegion": "None",
            "soibConcernStatus": "Moderate",
            "wpaSchedule": "Schedule-II",
            "iucnCategory": "Least Concern"
        },
        {
            "indiaChecklistScientificName": "Psilopogon haemacephalus",
            "migratoryStatusWithinIndia": "Resident",
            "indiaChecklistCommonName": "Coppersmith Barbet",
            "uniqueValue": 549,
            "endemicRegion": "None",
            "soibConcernStatus": "Low",
            "wpaSchedule": "Schedule-II",
            "iucnCategory": "Least Concern"
        },
        {
            "indiaChecklistScientificName": "Psilopogon viridis",
            "migratoryStatusWithinIndia": "Resident",
            "indiaChecklistCommonName": "White-cheeked Barbet",
            "uniqueValue": 554,
            "endemicRegion": "Mainland India",
            "soibConcernStatus": "Low",
            "wpaSchedule": "Schedule-II",
            "iucnCategory": "Least Concern"
        },
        {
            "indiaChecklistScientificName": "Jynx torquilla",
            "migratoryStatusWithinIndia": "Winter Migrant & Localized Summer Migrant",
            "indiaChecklistCommonName": "Eurasian Wryneck",
            "uniqueValue": 558,
            "endemicRegion": "None",
            "soibConcernStatus": "Low",
            "wpaSchedule": "Schedule-II",
            "iucnCategory": "Least Concern"
        },
        {
            "indiaChecklistScientificName": "Dinopium benghalense",
            "migratoryStatusWithinIndia": "Resident",
            "indiaChecklistCommonName": "Black-rumped Flameback",
            "uniqueValue": 583,
            "endemicRegion": "Indian Subcontinent",
            "soibConcernStatus": "Low",
            "wpaSchedule": "Schedule-II",
            "iucnCategory": "Least Concern"
        },
        {
            "indiaChecklistScientificName": "Falco tinnunculus",
            "migratoryStatusWithinIndia": "Resident & Winter Migrant",
            "indiaChecklistCommonName": "Common Kestrel",
            "uniqueValue": 595,
            "endemicRegion": "None",
            "soibConcernStatus": "High",
            "wpaSchedule": "Schedule-II",
            "iucnCategory": "Least Concern"
        },
        {
            "indiaChecklistScientificName": "Psittacula krameri",
            "migratoryStatusWithinIndia": "Resident",
            "indiaChecklistCommonName": "Rose-ringed Parakeet",
            "uniqueValue": 606,
            "endemicRegion": "None",
            "soibConcernStatus": "Low",
            "wpaSchedule": "Schedule-II",
            "iucnCategory": "Least Concern"
        },
        {
            "indiaChecklistScientificName": "Psittacula cyanocephala",
            "migratoryStatusWithinIndia": "Resident",
            "indiaChecklistCommonName": "Plum-headed Parakeet",
            "uniqueValue": 609,
            "endemicRegion": "Indian Subcontinent",
            "soibConcernStatus": "Low",
            "wpaSchedule": "Schedule-II",
            "iucnCategory": "Least Concern"
        },
        {
            "indiaChecklistScientificName": "Loriculus vernalis",
            "migratoryStatusWithinIndia": "Resident & Local Migrant",
            "indiaChecklistCommonName": "Vernal Hanging-Parrot",
            "uniqueValue": 616,
            "endemicRegion": "None",
            "soibConcernStatus": "Low",
            "wpaSchedule": "Schedule-II",
            "iucnCategory": "Least Concern"
        },
        {
            "indiaChecklistScientificName": "Pitta brachyura",
            "migratoryStatusWithinIndia": "Within-India Migrant",
            "indiaChecklistCommonName": "Indian Pitta",
            "uniqueValue": 621,
            "endemicRegion": "Indian Subcontinent",
            "soibConcernStatus": "Low",
            "wpaSchedule": "Schedule-II",
            "iucnCategory": "Least Concern"
        },
        {
            "indiaChecklistScientificName": "Pericrocotus cinnamomeus",
            "migratoryStatusWithinIndia": "Resident",
            "indiaChecklistCommonName": "Small Minivet",
            "uniqueValue": 627,
            "endemicRegion": "None",
            "soibConcernStatus": "Low",
            "wpaSchedule": "Schedule-I",
            "iucnCategory": "Least Concern"
        },
        {
            "indiaChecklistScientificName": "Lalage melanoptera",
            "migratoryStatusWithinIndia": "Within-India Migrant",
            "indiaChecklistCommonName": "Black-headed Cuckooshrike",
            "uniqueValue": 640,
            "endemicRegion": "Indian Subcontinent",
            "soibConcernStatus": "Low",
            "wpaSchedule": "Schedule-II",
            "iucnCategory": "Least Concern"
        },
        {
            "indiaChecklistScientificName": "Oriolus kundoo",
            "migratoryStatusWithinIndia": "Within-India Migrant",
            "indiaChecklistCommonName": "Indian Golden Oriole",
            "uniqueValue": 649,
            "endemicRegion": "None",
            "soibConcernStatus": "Low",
            "wpaSchedule": "Schedule-II",
            "iucnCategory": "Least Concern"
        },
        {
            "indiaChecklistScientificName": "Tephrodornis pondicerianus",
            "migratoryStatusWithinIndia": "Resident",
            "indiaChecklistCommonName": "Common Woodshrike",
            "uniqueValue": 658,
            "endemicRegion": "None",
            "soibConcernStatus": "Moderate",
            "wpaSchedule": "Schedule-II",
            "iucnCategory": "Least Concern"
        },
        {
            "indiaChecklistScientificName": "Aegithina tiphia",
            "migratoryStatusWithinIndia": "Resident",
            "indiaChecklistCommonName": "Common Iora",
            "uniqueValue": 660,
            "endemicRegion": "None",
            "soibConcernStatus": "Low",
            "wpaSchedule": "Schedule-II",
            "iucnCategory": "Least Concern"
        },
        {
            "indiaChecklistScientificName": "Rhipidura albogularis",
            "migratoryStatusWithinIndia": "Resident",
            "indiaChecklistCommonName": "Spot-breasted Fantail",
            "uniqueValue": 663,
            "endemicRegion": "Mainland India",
            "soibConcernStatus": "Low",
            "wpaSchedule": "Schedule-II",
            "iucnCategory": "Least Concern"
        },
        {
            "indiaChecklistScientificName": "Dicrurus macrocercus",
            "migratoryStatusWithinIndia": "Resident & Local Migrant",
            "indiaChecklistCommonName": "Black Drongo",
            "uniqueValue": 665,
            "endemicRegion": "None",
            "soibConcernStatus": "Low",
            "wpaSchedule": "Schedule-II",
            "iucnCategory": "Least Concern"
        },
        {
            "indiaChecklistScientificName": "Dicrurus leucophaeus",
            "migratoryStatusWithinIndia": "Within-India Migrant",
            "indiaChecklistCommonName": "Ashy Drongo",
            "uniqueValue": 666,
            "endemicRegion": "None",
            "soibConcernStatus": "Low",
            "wpaSchedule": "Schedule-II",
            "iucnCategory": "Least Concern"
        },
        {
            "indiaChecklistScientificName": "Terpsiphone paradisi",
            "migratoryStatusWithinIndia": "Resident & Within-India Migrant",
            "indiaChecklistCommonName": "Indian Paradise-Flycatcher",
            "uniqueValue": 677,
            "endemicRegion": "None",
            "soibConcernStatus": "Low",
            "wpaSchedule": "Schedule-II",
            "iucnCategory": "Least Concern"
        },
        {
            "indiaChecklistScientificName": "Lanius isabellinus",
            "migratoryStatusWithinIndia": "Winter Migrant",
            "indiaChecklistCommonName": "Isabelline Shrike",
            "uniqueValue": 681,
            "endemicRegion": "None",
            "soibConcernStatus": "High",
            "wpaSchedule": "Schedule-II",
            "iucnCategory": "Least Concern"
        },
        {
            "indiaChecklistScientificName": "Lanius cristatus",
            "migratoryStatusWithinIndia": "Winter Migrant",
            "indiaChecklistCommonName": "Brown Shrike",
            "uniqueValue": 682,
            "endemicRegion": "None",
            "soibConcernStatus": "Low",
            "wpaSchedule": "Schedule-II",
            "iucnCategory": "Least Concern"
        },
        {
            "indiaChecklistScientificName": "Lanius vittatus",
            "migratoryStatusWithinIndia": "Resident & Local Migrant",
            "indiaChecklistCommonName": "Bay-backed Shrike",
            "uniqueValue": 684,
            "endemicRegion": "None",
            "soibConcernStatus": "Low",
            "wpaSchedule": "Schedule-II",
            "iucnCategory": "Least Concern"
        },
        {
            "indiaChecklistScientificName": "Lanius schach",
            "migratoryStatusWithinIndia": "Resident & Within-India Migrant",
            "indiaChecklistCommonName": "Long-tailed Shrike",
            "uniqueValue": 685,
            "endemicRegion": "None",
            "soibConcernStatus": "Low",
            "wpaSchedule": "Schedule-II",
            "iucnCategory": "Least Concern"
        },
        {
            "indiaChecklistScientificName": "Dendrocitta vagabunda",
            "migratoryStatusWithinIndia": "Resident",
            "indiaChecklistCommonName": "Rufous Treepie",
            "uniqueValue": 697,
            "endemicRegion": "None",
            "soibConcernStatus": "Low",
            "wpaSchedule": "Schedule-II",
            "iucnCategory": "Least Concern"
        },
        {
            "indiaChecklistScientificName": "Corvus splendens",
            "migratoryStatusWithinIndia": "Resident",
            "indiaChecklistCommonName": "House Crow",
            "uniqueValue": 709,
            "endemicRegion": "None",
            "soibConcernStatus": "Low",
            "wpaSchedule": "Not protected",
            "iucnCategory": "Least Concern"
        },
        {
            "indiaChecklistScientificName": "Corvus macrorhynchos",
            "migratoryStatusWithinIndia": "Resident",
            "indiaChecklistCommonName": "Large-billed Crow",
            "uniqueValue": 713,
            "endemicRegion": "None",
            "soibConcernStatus": "Low",
            "wpaSchedule": "Schedule-II",
            "iucnCategory": "Least Concern"
        },
        {
            "indiaChecklistScientificName": "Parus cinereus",
            "migratoryStatusWithinIndia": "Resident",
            "indiaChecklistCommonName": "Cinereous Tit",
            "uniqueValue": 728,
            "endemicRegion": "None",
            "soibConcernStatus": "Low",
            "wpaSchedule": "Schedule-II",
            "iucnCategory": "Least Concern"
        },
        {
            "indiaChecklistScientificName": "Ammomanes phoenicura",
            "migratoryStatusWithinIndia": "Resident",
            "indiaChecklistCommonName": "Rufous-tailed Lark",
            "uniqueValue": 735,
            "endemicRegion": "Indian Subcontinent",
            "soibConcernStatus": "High",
            "wpaSchedule": "Schedule-II",
            "iucnCategory": "Least Concern"
        },
        {
            "indiaChecklistScientificName": "Eremopterix griseus",
            "migratoryStatusWithinIndia": "Resident",
            "indiaChecklistCommonName": "Ashy-crowned Sparrow Lark",
            "uniqueValue": 738,
            "endemicRegion": "Indian Subcontinent",
            "soibConcernStatus": "Moderate",
            "wpaSchedule": "Schedule-II",
            "iucnCategory": "Least Concern"
        },
        {
            "indiaChecklistScientificName": "Mirafra affinis",
            "migratoryStatusWithinIndia": "Resident",
            "indiaChecklistCommonName": "Jerdon's Bushlark",
            "uniqueValue": 741,
            "endemicRegion": "Indian Subcontinent",
            "soibConcernStatus": "Low",
            "wpaSchedule": "Schedule-II",
            "iucnCategory": "Least Concern"
        },
        {
            "indiaChecklistScientificName": "Mirafra erythroptera",
            "migratoryStatusWithinIndia": "Resident",
            "indiaChecklistCommonName": "Indian Bushlark",
            "uniqueValue": 742,
            "endemicRegion": "Indian Subcontinent",
            "soibConcernStatus": "Moderate",
            "wpaSchedule": "Schedule-II",
            "iucnCategory": "Least Concern"
        },
        {
            "indiaChecklistScientificName": "Alauda gulgula",
            "migratoryStatusWithinIndia": "Resident & Local Migrant",
            "indiaChecklistCommonName": "Oriental Skylark",
            "uniqueValue": 752,
            "endemicRegion": "None",
            "soibConcernStatus": "High",
            "wpaSchedule": "Schedule-II",
            "iucnCategory": "Least Concern"
        },
        {
            "indiaChecklistScientificName": "Galerida malabarica",
            "migratoryStatusWithinIndia": "Resident",
            "indiaChecklistCommonName": "Malabar Lark",
            "uniqueValue": 754,
            "endemicRegion": "Mainland India",
            "soibConcernStatus": "Moderate",
            "wpaSchedule": "Schedule-II",
            "iucnCategory": "Least Concern"
        },
        {
            "indiaChecklistScientificName": "Orthotomus sutorius",
            "migratoryStatusWithinIndia": "Resident",
            "indiaChecklistCommonName": "Common Tailorbird",
            "uniqueValue": 756,
            "endemicRegion": "None",
            "soibConcernStatus": "Low",
            "wpaSchedule": "Schedule-II",
            "iucnCategory": "Least Concern"
        },
        {
            "indiaChecklistScientificName": "Prinia buchanani",
            "migratoryStatusWithinIndia": "Resident",
            "indiaChecklistCommonName": "Rufous-fronted Prinia",
            "uniqueValue": 763,
            "endemicRegion": "Indian Subcontinent",
            "soibConcernStatus": "Moderate",
            "wpaSchedule": "Schedule-I",
            "iucnCategory": "Least Concern"
        },
        {
            "indiaChecklistScientificName": "Prinia sylvatica",
            "migratoryStatusWithinIndia": "Resident",
            "indiaChecklistCommonName": "Jungle Prinia",
            "uniqueValue": 767,
            "endemicRegion": "Indian Subcontinent",
            "soibConcernStatus": "Low",
            "wpaSchedule": "Schedule-II",
            "iucnCategory": "Least Concern"
        },
        {
            "indiaChecklistScientificName": "Prinia socialis",
            "migratoryStatusWithinIndia": "Resident",
            "indiaChecklistCommonName": "Ashy Prinia",
            "uniqueValue": 769,
            "endemicRegion": "Indian Subcontinent",
            "soibConcernStatus": "Low",
            "wpaSchedule": "Schedule-II",
            "iucnCategory": "Least Concern"
        },
        {
            "indiaChecklistScientificName": "Prinia inornata",
            "migratoryStatusWithinIndia": "Resident",
            "indiaChecklistCommonName": "Plain Prinia",
            "uniqueValue": 770,
            "endemicRegion": "None",
            "soibConcernStatus": "Low",
            "wpaSchedule": "Schedule-II",
            "iucnCategory": "Least Concern"
        },
        {
            "indiaChecklistScientificName": "Cisticola juncidis",
            "migratoryStatusWithinIndia": "Resident",
            "indiaChecklistCommonName": "Zitting Cisticola",
            "uniqueValue": 771,
            "endemicRegion": "None",
            "soibConcernStatus": "Low",
            "wpaSchedule": "Schedule-II",
            "iucnCategory": "Least Concern"
        },
        {
            "indiaChecklistScientificName": "Iduna caligata",
            "migratoryStatusWithinIndia": "Winter Migrant",
            "indiaChecklistCommonName": "Booted Warbler",
            "uniqueValue": 774,
            "endemicRegion": "None",
            "soibConcernStatus": "Low",
            "wpaSchedule": "Schedule-II",
            "iucnCategory": "Least Concern"
        },
        {
            "indiaChecklistScientificName": "Iduna rama",
            "migratoryStatusWithinIndia": "Winter Migrant",
            "indiaChecklistCommonName": "Sykes's Warbler",
            "uniqueValue": 775,
            "endemicRegion": "None",
            "soibConcernStatus": null,
            "wpaSchedule": "Schedule-II",
            "iucnCategory": "Least Concern"
        },
        {
            "indiaChecklistScientificName": "Acrocephalus agricola",
            "migratoryStatusWithinIndia": "Winter Migrant",
            "indiaChecklistCommonName": "Paddyfield Warbler",
            "uniqueValue": 779,
            "endemicRegion": "None",
            "soibConcernStatus": "Low",
            "wpaSchedule": "Schedule-II",
            "iucnCategory": "Least Concern"
        },
        {
            "indiaChecklistScientificName": "Acrocephalus dumetorum",
            "migratoryStatusWithinIndia": "Winter Migrant",
            "indiaChecklistCommonName": "Blyth's Reed Warbler",
            "uniqueValue": 781,
            "endemicRegion": "None",
            "soibConcernStatus": "Low",
            "wpaSchedule": "Schedule-II",
            "iucnCategory": "Least Concern"
        },
        {
            "indiaChecklistScientificName": "Acrocephalus stentoreus",
            "migratoryStatusWithinIndia": "Resident & Winter Migrant",
            "indiaChecklistCommonName": "Clamorous Reed Warbler",
            "uniqueValue": 785,
            "endemicRegion": "None",
            "soibConcernStatus": "Low",
            "wpaSchedule": "Schedule-II",
            "iucnCategory": "Least Concern"
        },
        {
            "indiaChecklistScientificName": "Ptyonoprogne concolor",
            "migratoryStatusWithinIndia": "Resident",
            "indiaChecklistCommonName": "Dusky Crag Martin",
            "uniqueValue": 806,
            "endemicRegion": "None",
            "soibConcernStatus": "Moderate",
            "wpaSchedule": "Schedule-II",
            "iucnCategory": "Least Concern"
        },
        {
            "indiaChecklistScientificName": "Hirundo rustica",
            "migratoryStatusWithinIndia": "Within-India Migrant & Winter Migrant",
            "indiaChecklistCommonName": "Barn Swallow",
            "uniqueValue": 809,
            "endemicRegion": "None",
            "soibConcernStatus": "Moderate",
            "wpaSchedule": "Schedule-II",
            "iucnCategory": "Least Concern"
        },
        {
            "indiaChecklistScientificName": "Hirundo smithii",
            "migratoryStatusWithinIndia": "Resident",
            "indiaChecklistCommonName": "Wire-tailed Swallow",
            "uniqueValue": 810,
            "endemicRegion": "None",
            "soibConcernStatus": "Low",
            "wpaSchedule": "Schedule-II",
            "iucnCategory": "Least Concern"
        },
        {
            "indiaChecklistScientificName": "Cecropis daurica",
            "migratoryStatusWithinIndia": "Resident & Winter Migrant",
            "indiaChecklistCommonName": "Red-rumped Swallow",
            "uniqueValue": 815,
            "endemicRegion": "None",
            "soibConcernStatus": "Low",
            "wpaSchedule": "Schedule-II",
            "iucnCategory": "Least Concern"
        },
        {
            "indiaChecklistScientificName": "Petrochelidon fluvicola",
            "migratoryStatusWithinIndia": "Local Migrant",
            "indiaChecklistCommonName": "Streak-throated Swallow",
            "uniqueValue": 817,
            "endemicRegion": "None",
            "soibConcernStatus": "Low",
            "wpaSchedule": "Schedule-II",
            "iucnCategory": "Least Concern"
        },
        {
            "indiaChecklistScientificName": "Pycnonotus luteolus",
            "migratoryStatusWithinIndia": "Resident",
            "indiaChecklistCommonName": "White-browed Bulbul",
            "uniqueValue": 834,
            "endemicRegion": "Indian Subcontinent",
            "soibConcernStatus": "Low",
            "wpaSchedule": "Schedule-II",
            "iucnCategory": "Least Concern"
        },
        {
            "indiaChecklistScientificName": "Pycnonotus jocosus",
            "migratoryStatusWithinIndia": "Resident",
            "indiaChecklistCommonName": "Red-whiskered Bulbul",
            "uniqueValue": 837,
            "endemicRegion": "None",
            "soibConcernStatus": "Low",
            "wpaSchedule": "Schedule-II",
            "iucnCategory": "Least Concern"
        },
        {
            "indiaChecklistScientificName": "Pycnonotus cafer",
            "migratoryStatusWithinIndia": "Resident",
            "indiaChecklistCommonName": "Red-vented Bulbul",
            "uniqueValue": 838,
            "endemicRegion": "None",
            "soibConcernStatus": "Low",
            "wpaSchedule": "Schedule-II",
            "iucnCategory": "Least Concern"
        },
        {
            "indiaChecklistScientificName": "Phylloscopus trochiloides",
            "migratoryStatusWithinIndia": "Winter Migrant & Localized Summer Migrant",
            "indiaChecklistCommonName": "Greenish Warbler",
            "uniqueValue": 867,
            "endemicRegion": "None",
            "soibConcernStatus": "Low",
            "wpaSchedule": "Schedule-II",
            "iucnCategory": "Least Concern"
        },
        {
            "indiaChecklistScientificName": "Curruca curruca",
            "migratoryStatusWithinIndia": "Winter Migrant & Localized Summer Migrant",
            "indiaChecklistCommonName": "Lesser Whitethroat",
            "uniqueValue": 905,
            "endemicRegion": "None",
            "soibConcernStatus": "Low",
            "wpaSchedule": "Schedule-II",
            "iucnCategory": "Least Concern"
        },
        {
            "indiaChecklistScientificName": "Chrysomma sinense",
            "migratoryStatusWithinIndia": "Resident",
            "indiaChecklistCommonName": "Yellow-eyed Babbler",
            "uniqueValue": 911,
            "endemicRegion": "None",
            "soibConcernStatus": "Low",
            "wpaSchedule": "Schedule-II",
            "iucnCategory": "Least Concern"
        },
        {
            "indiaChecklistScientificName": "Zosterops palpebrosus",
            "migratoryStatusWithinIndia": "Resident",
            "indiaChecklistCommonName": "Indian White-eye",
            "uniqueValue": 933,
            "endemicRegion": "None",
            "soibConcernStatus": "Low",
            "wpaSchedule": "Schedule-II",
            "iucnCategory": "Least Concern"
        },
        {
            "indiaChecklistScientificName": "Dumetia hyperythra",
            "migratoryStatusWithinIndia": "Resident",
            "indiaChecklistCommonName": "Tawny-bellied Babbler",
            "uniqueValue": 935,
            "endemicRegion": "Indian Subcontinent",
            "soibConcernStatus": "Low",
            "wpaSchedule": "Schedule-II",
            "iucnCategory": "Least Concern"
        },
        {
            "indiaChecklistScientificName": "Pomatorhinus horsfieldii",
            "migratoryStatusWithinIndia": "Resident",
            "indiaChecklistCommonName": "Indian Scimitar Babbler",
            "uniqueValue": 954,
            "endemicRegion": "Mainland India",
            "soibConcernStatus": "Low",
            "wpaSchedule": "Schedule-II",
            "iucnCategory": "Least Concern"
        },
        {
            "indiaChecklistScientificName": "Argya malcolmi",
            "migratoryStatusWithinIndia": "Resident",
            "indiaChecklistCommonName": "Large Grey Babbler",
            "uniqueValue": 1012,
            "endemicRegion": "Indian Subcontinent",
            "soibConcernStatus": "Low",
            "wpaSchedule": "Schedule-II",
            "iucnCategory": "Least Concern"
        },
        {
            "indiaChecklistScientificName": "Argya striata",
            "migratoryStatusWithinIndia": "Resident",
            "indiaChecklistCommonName": "Jungle Babbler",
            "uniqueValue": 1015,
            "endemicRegion": "Indian Subcontinent",
            "soibConcernStatus": "Low",
            "wpaSchedule": "Schedule-II",
            "iucnCategory": "Least Concern"
        },
        {
            "indiaChecklistScientificName": "Argya affinis",
            "migratoryStatusWithinIndia": "Resident",
            "indiaChecklistCommonName": "Yellow-billed Babbler",
            "uniqueValue": 1016,
            "endemicRegion": "Indian Subcontinent",
            "soibConcernStatus": "Low",
            "wpaSchedule": "Schedule-II",
            "iucnCategory": "Least Concern"
        },
        {
            "indiaChecklistScientificName": "Argya caudata",
            "migratoryStatusWithinIndia": "Resident",
            "indiaChecklistCommonName": "Common Babbler",
            "uniqueValue": 1017,
            "endemicRegion": "Indian Subcontinent",
            "soibConcernStatus": "Moderate",
            "wpaSchedule": "Schedule-II",
            "iucnCategory": "Least Concern"
        },
        {
            "indiaChecklistScientificName": "Pastor roseus",
            "migratoryStatusWithinIndia": "Winter Migrant",
            "indiaChecklistCommonName": "Rosy Starling",
            "uniqueValue": 1061,
            "endemicRegion": "None",
            "soibConcernStatus": "Moderate",
            "wpaSchedule": "Schedule-II",
            "iucnCategory": "Least Concern"
        },
        {
            "indiaChecklistScientificName": "Sturnia pagodarum",
            "migratoryStatusWithinIndia": "Resident",
            "indiaChecklistCommonName": "Brahminy Starling",
            "uniqueValue": 1066,
            "endemicRegion": "None",
            "soibConcernStatus": "Low",
            "wpaSchedule": "Schedule-II",
            "iucnCategory": "Least Concern"
        },
        {
            "indiaChecklistScientificName": "Sturnia malabarica",
            "migratoryStatusWithinIndia": "Resident & Within-India Migrant",
            "indiaChecklistCommonName": "Chestnut-tailed Starling",
            "uniqueValue": 1067,
            "endemicRegion": "None",
            "soibConcernStatus": "Low",
            "wpaSchedule": "Schedule-II",
            "iucnCategory": "Least Concern"
        },
        {
            "indiaChecklistScientificName": "Acridotheres tristis",
            "migratoryStatusWithinIndia": "Resident",
            "indiaChecklistCommonName": "Common Myna",
            "uniqueValue": 1072,
            "endemicRegion": "None",
            "soibConcernStatus": "Low",
            "wpaSchedule": "Schedule-II",
            "iucnCategory": "Least Concern"
        },
        {
            "indiaChecklistScientificName": "Acridotheres fuscus",
            "migratoryStatusWithinIndia": "Resident",
            "indiaChecklistCommonName": "Jungle Myna",
            "uniqueValue": 1074,
            "endemicRegion": "None",
            "soibConcernStatus": "Low",
            "wpaSchedule": "Schedule-II",
            "iucnCategory": "Least Concern"
        },
        {
            "indiaChecklistScientificName": "Geokichla citrina",
            "migratoryStatusWithinIndia": "Resident & Within-India Migrant",
            "indiaChecklistCommonName": "Orange-headed Thrush",
            "uniqueValue": 1091,
            "endemicRegion": "None",
            "soibConcernStatus": "Moderate",
            "wpaSchedule": "Schedule-II",
            "iucnCategory": "Least Concern"
        },
        {
            "indiaChecklistScientificName": "Turdus simillimus",
            "migratoryStatusWithinIndia": "Resident & Within-India Migrant",
            "indiaChecklistCommonName": "Indian Blackbird",
            "uniqueValue": 1097,
            "endemicRegion": "Indian Subcontinent",
            "soibConcernStatus": "Low",
            "wpaSchedule": "Schedule-II",
            "iucnCategory": "Least Concern"
        },
        {
            "indiaChecklistScientificName": "Muscicapa dauurica",
            "migratoryStatusWithinIndia": "Within-India Migrant & Winter Migrant",
            "indiaChecklistCommonName": "Asian Brown Flycatcher",
            "uniqueValue": 1114,
            "endemicRegion": "None",
            "soibConcernStatus": "Low",
            "wpaSchedule": "Schedule-II",
            "iucnCategory": "Least Concern"
        },
        {
            "indiaChecklistScientificName": "Copsychus fulicatus",
            "migratoryStatusWithinIndia": "Resident",
            "indiaChecklistCommonName": "Indian Robin",
            "uniqueValue": 1118,
            "endemicRegion": "Indian Subcontinent",
            "soibConcernStatus": "Low",
            "wpaSchedule": "Schedule-II",
            "iucnCategory": "Least Concern"
        },
        {
            "indiaChecklistScientificName": "Copsychus saularis",
            "migratoryStatusWithinIndia": "Resident",
            "indiaChecklistCommonName": "Oriental Magpie Robin",
            "uniqueValue": 1119,
            "endemicRegion": "None",
            "soibConcernStatus": "Low",
            "wpaSchedule": "Schedule-II",
            "iucnCategory": "Least Concern"
        },
        {
            "indiaChecklistScientificName": "Cyornis tickelliae",
            "migratoryStatusWithinIndia": "Resident",
            "indiaChecklistCommonName": "Tickell's Blue Flycatcher",
            "uniqueValue": 1140,
            "endemicRegion": "Indian Subcontinent",
            "soibConcernStatus": "Low",
            "wpaSchedule": "Schedule-II",
            "iucnCategory": "Least Concern"
        },
        {
            "indiaChecklistScientificName": "Luscinia svecica",
            "migratoryStatusWithinIndia": "Winter Migrant & Localized Summer Migrant",
            "indiaChecklistCommonName": "Bluethroat",
            "uniqueValue": 1149,
            "endemicRegion": "None",
            "soibConcernStatus": "Moderate",
            "wpaSchedule": "Schedule-II",
            "iucnCategory": "Least Concern"
        },
        {
            "indiaChecklistScientificName": "Phoenicurus ochruros",
            "migratoryStatusWithinIndia": "Winter Migrant & Localized Summer Migrant",
            "indiaChecklistCommonName": "Black Redstart",
            "uniqueValue": 1192,
            "endemicRegion": "None",
            "soibConcernStatus": "Moderate",
            "wpaSchedule": "Schedule-II",
            "iucnCategory": "Least Concern"
        },
        {
            "indiaChecklistScientificName": "Saxicola maurus",
            "migratoryStatusWithinIndia": "Winter Migrant & Localized Summer Migrant",
            "indiaChecklistCommonName": "Siberian Stonechat",
            "uniqueValue": 1201,
            "endemicRegion": "None",
            "soibConcernStatus": "Low",
            "wpaSchedule": "Schedule-II",
            "iucnCategory": "Least Concern"
        },
        {
            "indiaChecklistScientificName": "Saxicola caprata",
            "migratoryStatusWithinIndia": "Resident & Within-India Migrant",
            "indiaChecklistCommonName": "Pied Bushchat",
            "uniqueValue": 1204,
            "endemicRegion": "None",
            "soibConcernStatus": "Low",
            "wpaSchedule": "Schedule-II",
            "iucnCategory": "Least Concern"
        },
        {
            "indiaChecklistScientificName": "Dicaeum erythrorhynchos",
            "migratoryStatusWithinIndia": "Resident",
            "indiaChecklistCommonName": "Pale-billed Flowerpecker",
            "uniqueValue": 1221,
            "endemicRegion": "Indian Subcontinent",
            "soibConcernStatus": "Low",
            "wpaSchedule": "Schedule-II",
            "iucnCategory": "Least Concern"
        },
        {
            "indiaChecklistScientificName": "Leptocoma zeylonica",
            "migratoryStatusWithinIndia": "Resident",
            "indiaChecklistCommonName": "Purple-rumped Sunbird",
            "uniqueValue": 1228,
            "endemicRegion": "Indian Subcontinent",
            "soibConcernStatus": "Low",
            "wpaSchedule": "Schedule-II",
            "iucnCategory": "Least Concern"
        },
        {
            "indiaChecklistScientificName": "Cinnyris asiaticus",
            "migratoryStatusWithinIndia": "Resident & Local Migrant",
            "indiaChecklistCommonName": "Purple Sunbird",
            "uniqueValue": 1231,
            "endemicRegion": "None",
            "soibConcernStatus": "Low",
            "wpaSchedule": "Schedule-II",
            "iucnCategory": "Least Concern"
        },
        {
            "indiaChecklistScientificName": "Chloropsis jerdoni",
            "migratoryStatusWithinIndia": "Resident",
            "indiaChecklistCommonName": "Jerdon's Leafbird",
            "uniqueValue": 1244,
            "endemicRegion": "Indian Subcontinent",
            "soibConcernStatus": "Low",
            "wpaSchedule": "Schedule-II",
            "iucnCategory": "Least Concern"
        },
        {
            "indiaChecklistScientificName": "Chloropsis aurifrons",
            "migratoryStatusWithinIndia": "Resident",
            "indiaChecklistCommonName": "Golden-fronted Leafbird",
            "uniqueValue": 1245,
            "endemicRegion": "None",
            "soibConcernStatus": "Low",
            "wpaSchedule": "Schedule-II",
            "iucnCategory": "Least Concern"
        },
        {
            "indiaChecklistScientificName": "Ploceus philippinus",
            "migratoryStatusWithinIndia": "Resident",
            "indiaChecklistCommonName": "Baya Weaver",
            "uniqueValue": 1248,
            "endemicRegion": "None",
            "soibConcernStatus": "Low",
            "wpaSchedule": "Schedule-II",
            "iucnCategory": "Least Concern"
        },
        {
            "indiaChecklistScientificName": "Euodice malabarica",
            "migratoryStatusWithinIndia": "Resident",
            "indiaChecklistCommonName": "Indian Silverbill",
            "uniqueValue": 1251,
            "endemicRegion": "None",
            "soibConcernStatus": "Low",
            "wpaSchedule": "Schedule-II",
            "iucnCategory": "Least Concern"
        },
        {
            "indiaChecklistScientificName": "Lonchura punctulata",
            "migratoryStatusWithinIndia": "Resident",
            "indiaChecklistCommonName": "Scaly-breasted Munia",
            "uniqueValue": 1252,
            "endemicRegion": "None",
            "soibConcernStatus": "Low",
            "wpaSchedule": "Schedule-II",
            "iucnCategory": "Least Concern"
        },
        {
            "indiaChecklistScientificName": "Lonchura striata",
            "migratoryStatusWithinIndia": "Resident",
            "indiaChecklistCommonName": "White-rumped Munia",
            "uniqueValue": 1254,
            "endemicRegion": "None",
            "soibConcernStatus": "Low",
            "wpaSchedule": "Schedule-II",
            "iucnCategory": "Least Concern"
        },
        {
            "indiaChecklistScientificName": "Lonchura malacca",
            "migratoryStatusWithinIndia": "Resident",
            "indiaChecklistCommonName": "Tricoloured Munia",
            "uniqueValue": 1255,
            "endemicRegion": "Indian Subcontinent",
            "soibConcernStatus": "Low",
            "wpaSchedule": "Schedule-II",
            "iucnCategory": "Least Concern"
        },
        {
            "indiaChecklistScientificName": "Amandava amandava",
            "migratoryStatusWithinIndia": "Resident",
            "indiaChecklistCommonName": "Red Munia",
            "uniqueValue": 1258,
            "endemicRegion": "None",
            "soibConcernStatus": "Low",
            "wpaSchedule": "Schedule-II",
            "iucnCategory": "Least Concern"
        },
        {
            "indiaChecklistScientificName": "Passer domesticus",
            "migratoryStatusWithinIndia": "Resident & Winter Migrant",
            "indiaChecklistCommonName": "House Sparrow",
            "uniqueValue": 1266,
            "endemicRegion": "None",
            "soibConcernStatus": "Moderate",
            "wpaSchedule": "Schedule-II",
            "iucnCategory": "Least Concern"
        },
        {
            "indiaChecklistScientificName": "Gymnoris xanthocollis",
            "migratoryStatusWithinIndia": "Resident",
            "indiaChecklistCommonName": "Yellow-throated Sparrow",
            "uniqueValue": 1271,
            "endemicRegion": "None",
            "soibConcernStatus": "Low",
            "wpaSchedule": "Schedule-II",
            "iucnCategory": "Least Concern"
        },
        {
            "indiaChecklistScientificName": "Motacilla cinerea",
            "migratoryStatusWithinIndia": "Winter Migrant & Localized Summer Migrant",
            "indiaChecklistCommonName": "Grey Wagtail",
            "uniqueValue": 1279,
            "endemicRegion": "None",
            "soibConcernStatus": "Moderate",
            "wpaSchedule": "Schedule-II",
            "iucnCategory": "Least Concern"
        },
        {
            "indiaChecklistScientificName": "Motacilla flava",
            "migratoryStatusWithinIndia": "Winter Migrant",
            "indiaChecklistCommonName": "Western Yellow Wagtail",
            "uniqueValue": 1280,
            "endemicRegion": "None",
            "soibConcernStatus": "Moderate",
            "wpaSchedule": "Schedule-II",
            "iucnCategory": "Least Concern"
        },
        {
            "indiaChecklistScientificName": "Motacilla maderaspatensis",
            "migratoryStatusWithinIndia": "Resident",
            "indiaChecklistCommonName": "White-browed Wagtail",
            "uniqueValue": 1283,
            "endemicRegion": "Indian Subcontinent",
            "soibConcernStatus": "Low",
            "wpaSchedule": "Schedule-II",
            "iucnCategory": "Least Concern"
        },
        {
            "indiaChecklistScientificName": "Motacilla alba",
            "migratoryStatusWithinIndia": "Within-India Migrant & Winter Migrant",
            "indiaChecklistCommonName": "White Wagtail",
            "uniqueValue": 1284,
            "endemicRegion": "None",
            "soibConcernStatus": "Moderate",
            "wpaSchedule": "Schedule-II",
            "iucnCategory": "Least Concern"
        },
        {
            "indiaChecklistScientificName": "Anthus rufulus",
            "migratoryStatusWithinIndia": "Resident",
            "indiaChecklistCommonName": "Paddyfield Pipit",
            "uniqueValue": 1286,
            "endemicRegion": "None",
            "soibConcernStatus": "Low",
            "wpaSchedule": "Schedule-II",
            "iucnCategory": "Least Concern"
        },
        {
            "indiaChecklistScientificName": "Anthus campestris",
            "migratoryStatusWithinIndia": "Winter Migrant",
            "indiaChecklistCommonName": "Tawny Pipit",
            "uniqueValue": 1289,
            "endemicRegion": "None",
            "soibConcernStatus": "High",
            "wpaSchedule": "Schedule-II",
            "iucnCategory": "Least Concern"
        },
        {
            "indiaChecklistScientificName": "Anthus trivialis",
            "migratoryStatusWithinIndia": "Winter Migrant",
            "indiaChecklistCommonName": "Tree Pipit",
            "uniqueValue": 1294,
            "endemicRegion": "None",
            "soibConcernStatus": "Moderate",
            "wpaSchedule": "Schedule-II",
            "iucnCategory": "Least Concern"
        },
        {
            "indiaChecklistScientificName": "Anthus hodgsoni",
            "migratoryStatusWithinIndia": "Within-India Migrant & Winter Migrant",
            "indiaChecklistCommonName": "Olive-backed Pipit",
            "uniqueValue": 1295,
            "endemicRegion": "None",
            "soibConcernStatus": "High",
            "wpaSchedule": "Schedule-II",
            "iucnCategory": "Least Concern"
        },
        {
            "indiaChecklistScientificName": "Emberiza melanocephala",
            "migratoryStatusWithinIndia": "Winter Migrant",
            "indiaChecklistCommonName": "Black-headed Bunting",
            "uniqueValue": 1349,
            "endemicRegion": "None",
            "soibConcernStatus": "Low",
            "wpaSchedule": "Schedule-II",
            "iucnCategory": "Least Concern"
        },
        {
            "indiaChecklistScientificName": "Emberiza bruniceps",
            "migratoryStatusWithinIndia": "Winter Migrant",
            "indiaChecklistCommonName": "Red-headed Bunting",
            "uniqueValue": 1350,
            "endemicRegion": "None",
            "soibConcernStatus": "Low",
            "wpaSchedule": "Schedule-II",
            "iucnCategory": "Least Concern"
        },
        {
            "indiaChecklistScientificName": "Emberiza buchanani",
            "migratoryStatusWithinIndia": "Winter Migrant",
            "indiaChecklistCommonName": "Grey-necked Bunting",
            "uniqueValue": 1358,
            "endemicRegion": "None",
            "soibConcernStatus": "Moderate",
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
        state: 'Karnataka',
        county: 'Haveri',
        start:'01-01-2000',
        end: '12-31-2024'
      })
      .expect(200);
    expect(response.body).toEqual({
        "data": [],
        "success": true
    })
  })
  })

describe('(State,County and Date) Data Contributions ID-T5023', () => {

  it('T5023/effortsDetails', async () => {

    const response = await request(app)
      .get('/api/users/effortsDetails')
      .query({
        state: 'Karnataka',
        county: 'Haveri',
        start:'01-01-2000',
        end: '12-31-2024'
      })
      .expect(200);
    expect(response.body).toEqual({
        "data": {
            "numberOfObservations": 9366,
            "numberOfList": "668",
            "numberOfUniqueLists": "577",
            "totalNumberOfHours": 458,
            "totalNumberOfObservers": 176
        }
    })
  })
});


describe('(State,County and Date) Species Details ID-T5013', () => {

    it('T5013/all_years_count', async () => {
  
      const response = await request(app)
        .get('/api/users/all_years_count')
        .query({
          state: 'Karnataka',
          county: 'Haveri',
          start:'01-01-2000',
          end: '12-31-2024'
        })
        .expect(200);
      expect(response.body).toEqual(
        {
            "1984": 77,
            "2000": 86,
            "2009": 96,
            "2010": 105,
            "2011": 107,
            "2015": 125,
            "2016": 176,
            "2017": 197,
            "2018": 198,
            "2019": 214,
            "2020": 222,
            "2021": 223,
            "2022": 225,
            "2023": 230,
            "2024": 231
        }
      )
    })
  })

