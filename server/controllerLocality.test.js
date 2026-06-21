
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




jest.setTimeout(30000);


describe('(State,County,Locality) Location Name ID-T5024', () => {

  //Controller locationName state and county
  it('T5024/location_listing', async () => {
    const response = await request(app)
      .get('/api/users/location_listing')
      .query({
        state: 'Karnataka',
        county: 'Haveri',
        locality: 'Bankapura Peacock Sanctuary'
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


describe('(State,County,Locality) Species Details ID-T5025', () => {

  it('T5025/count_iucn_species', async () => {

    const response = await request(app)
      .get('/api/users/count_iucn_species')
      .query({
        state: 'Karnataka',
        county: 'Haveri',
        locality: 'Bankapura Peacock Sanctuary'
      })
      .expect(200);
    expect(response.body).toEqual({
        "iucnRedListCategoriesCount": {
            "Vulnerable": 0,
            "Critically Endangered": 0,
            "Near Threatened": 0,
            "Endangered": 0
        }
    })
  })
})

describe('(State,County,Locality) Species Details ID-T5026', () => {

  it('T5026/count_appendix_species', async () => {

    const response = await request(app)
      .get('/api/users/count_appendix_species')
      .query({
        state: 'Karnataka',
        county: 'Haveri',
        locality: 'Bankapura Peacock Sanctuary'
      })
      .expect(200);
    expect(response.body).toEqual({
        "soibConservationConcernSpecies": [
            {
                "species": "Moderate Priority",
                "count": 1
            },
            {
                "species": "High Priority",
                "count": 0
            }
        ],
        "citesAppendixSpecies": [
            {
                "species": "Appendix I",
                "count": 0
            },
            {
                "species": "Appendix II",
                "count": 3
            }
        ],
        "cmsAppendixSpecies": [
            {
                "species": "Appendix I",
                "count": 0
            },
            {
                "species": "Appendix II",
                "count": 4
            }
        ]
    })
  })
})


describe('(State,County,Locality) Species Details ID-T5027', () => {

  it('T5027/count_number_species', async () => {

    const response = await request(app)
      .get('/api/users/count_number_species')
      .query({
        state: 'Karnataka',
        county: 'Haveri',
        locality: 'Bankapura Peacock Sanctuary'
      })
      .expect(200);
    expect(response.body).toEqual({
        "total": 34,
        "migrate": 3,
        "iucnRedList": 0,
        "soibHighPriority": 0,
        "scheduleI": 2,
        "indiaEndemic": 0
    })
  })
})
  
  describe('(State,County,Locality) IUCN Red List Species ID-T5028', () => {

  it('T5028/percentage_iucn_redList_species', async () => {

    const response = await request(app)
      .get('/api/users/percentage_iucn_redList_species')
      .query({
        state: 'Karnataka',
        county: 'Haveri',
        locality: 'Bankapura Peacock Sanctuary'
      })
      .expect(200);
      // console.log(response.body);
    expect(response.body).toEqual([])
  })
})

  describe('(State,County,Locality) Endemic Species ID-T5029', () => {
  it('T5029/percentage_endemic_species', async () => {

    const response = await request(app)
      .get('/api/users/percentage_endemic_species')
      .query({
        state: 'Karnataka',
        county: 'Haveri',
        locality: 'Bankapura Peacock Sanctuary'
      })
      .expect(200);
      // console.log(response.body)
    expect(response.body).toEqual([
        {
            "region": "Indian Subcontinent",
            "indiaChecklistScientificName": "Pavo cristatus",
            "indiaChecklistCommonName": "Indian Peafowl",
            "uniqueValue": 64,
            "percentage": "100%",
            "samplingEventIdentifier": "S163406036",
            "observationDate": "02-03-2024"
        },
        {
            "region": "Indian Subcontinent",
            "indiaChecklistScientificName": "Phaenicophaeus viridirostris",
            "indiaChecklistCommonName": "Blue-faced Malkoha",
            "uniqueValue": 146,
            "percentage": "100%",
            "samplingEventIdentifier": "S163406036",
            "observationDate": "02-03-2024"
        },
        {
            "region": "Indian Subcontinent",
            "indiaChecklistScientificName": "Dinopium benghalense",
            "indiaChecklistCommonName": "Black-rumped Flameback",
            "uniqueValue": 583,
            "percentage": "100%",
            "samplingEventIdentifier": "S163406036",
            "observationDate": "02-03-2024"
        },
        {
            "region": "Indian Subcontinent",
            "indiaChecklistScientificName": "Prinia socialis",
            "indiaChecklistCommonName": "Ashy Prinia",
            "uniqueValue": 769,
            "percentage": "100%",
            "samplingEventIdentifier": "S163406036",
            "observationDate": "02-03-2024"
        },
        {
            "region": "Indian Subcontinent",
            "indiaChecklistScientificName": "Pycnonotus luteolus",
            "indiaChecklistCommonName": "White-browed Bulbul",
            "uniqueValue": 834,
            "percentage": "100%",
            "samplingEventIdentifier": "S163406036",
            "observationDate": "02-03-2024"
        },
        {
            "region": "Indian Subcontinent",
            "indiaChecklistScientificName": "Copsychus fulicatus",
            "indiaChecklistCommonName": "Indian Robin",
            "uniqueValue": 1118,
            "percentage": "100%",
            "samplingEventIdentifier": "S163406036",
            "observationDate": "02-03-2024"
        },
        {
            "region": "Indian Subcontinent",
            "indiaChecklistScientificName": "Leptocoma zeylonica",
            "indiaChecklistCommonName": "Purple-rumped Sunbird",
            "uniqueValue": 1228,
            "percentage": "100%",
            "samplingEventIdentifier": "S163406036",
            "observationDate": "02-03-2024"
        }
    ])
  })
})


  describe('(State,County,Locality) Most Common Species ID-T5030', () => {
  it('T5030/pertcentage_most_common_species', async () => {

    const response = await request(app)
      .get('/api/users/pertcentage_most_common_species')
      .query({
        state: 'Karnataka',
        county: 'Haveri',
        locality: 'Bankapura Peacock Sanctuary'
      })
      .expect(200);
        //  console.log(response.body)
    expect(response.body).toEqual([
        {
            "indiaChecklistScientificName": "Accipiter badius",
            "indiaChecklistCommonName": "Shikra",
            "count": 1,
            "percentage": 100
        },
        {
            "indiaChecklistScientificName": "Acridotheres tristis",
            "indiaChecklistCommonName": "Common Myna",
            "count": 1,
            "percentage": 100
        },
        {
            "indiaChecklistScientificName": "Acrocephalus dumetorum",
            "indiaChecklistCommonName": "Blyth's Reed Warbler",
            "count": 1,
            "percentage": 100
        },
        {
            "indiaChecklistScientificName": "Aegithina tiphia",
            "indiaChecklistCommonName": "Common Iora",
            "count": 1,
            "percentage": 100
        },
        {
            "indiaChecklistScientificName": "Athene brama",
            "indiaChecklistCommonName": "Spotted Owlet",
            "count": 1,
            "percentage": 100
        },
        {
            "indiaChecklistScientificName": "Bubulcus coromandus",
            "indiaChecklistCommonName": "Eastern Cattle Egret",
            "count": 1,
            "percentage": 100
        },
        {
            "indiaChecklistScientificName": "Cecropis daurica",
            "indiaChecklistCommonName": "Red-rumped Swallow",
            "count": 1,
            "percentage": 100
        },
        {
            "indiaChecklistScientificName": "Centropus sinensis",
            "indiaChecklistCommonName": "Greater Coucal",
            "count": 1,
            "percentage": 100
        },
        {
            "indiaChecklistScientificName": "Copsychus fulicatus",
            "indiaChecklistCommonName": "Indian Robin",
            "count": 1,
            "percentage": 100
        },
        {
            "indiaChecklistScientificName": "Copsychus saularis",
            "indiaChecklistCommonName": "Oriental Magpie-Robin",
            "count": 1,
            "percentage": 100
        }
    ])
  })
})



  describe('(State,County,Locality) Seasonal Chart ID-T5031', () => {
  it('T5031/seasonal_chart_for_species', async () => {

    const response = await request(app)
      .get('/api/users/seasonal_chart_for_species')
      .query({
        state: 'Karnataka',
        county: 'Haveri',
        locality: 'Bankapura Peacock Sanctuary'
      })
      .expect(200);
    expect(response.body).toEqual({
        "msg": "denominator is zero"
    })
  })
})

  describe('(State,County,Locality) Hotspots ID-T5032', () => {


  it('T5032/hotspot_area', async () => {

    const response = await request(app)
      .get('/api/users/hotspot_area')
      .query({
        state: 'Karnataka',
        county: 'Haveri',
        locality: 'Bankapura Peacock Sanctuary'
      })
      .expect(200);
    expect(response.body).toEqual([
        {
            "locality": "Bankapura Peacock Sanctuary",
            "localityId": "L29596162",
            "latitude": 14.9200711,
            "longitude": 75.2624846,
            "count": "34"
        }
    ])
  })
})


  describe('(State,County,Locality) Complete List of Species ID-T5033', () => {

  it('T5033/complete_List_Of_Species', async () => {

    const response = await request(app)
      .get('/api/users/complete_List_Of_Species')
      .query({
        state: 'Karnataka',
        county: 'Haveri',
        locality: 'Bankapura Peacock Sanctuary'
      })
      .expect(200);
    expect(response.body).toEqual([
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
            "indiaChecklistScientificName": "Streptopelia decaocto",
            "migratoryStatusWithinIndia": "Resident",
            "indiaChecklistCommonName": "Eurasian Collared-Dove",
            "uniqueValue": 108,
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
            "indiaChecklistScientificName": "Corvus splendens",
            "migratoryStatusWithinIndia": "Resident",
            "indiaChecklistCommonName": "House Crow",
            "uniqueValue": 709,
            "endemicRegion": "None",
            "soibConcernStatus": "Low",
            "wpaSchedule": "Not scheduled",
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
            "indiaChecklistCommonName": "Oriental Magpie-Robin",
            "uniqueValue": 1119,
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
            "indiaChecklistScientificName": "Leptocoma zeylonica",
            "migratoryStatusWithinIndia": "Resident",
            "indiaChecklistCommonName": "Purple-rumped Sunbird",
            "uniqueValue": 1228,
            "endemicRegion": "Indian Subcontinent",
            "soibConcernStatus": "Low",
            "wpaSchedule": "Schedule-II",
            "iucnCategory": "Least Concern"
        }
    ])
  })
})

  describe('(State,County,Locality) Water Bird Congregations ID-T5034', () => {

  it('T5034/    ', async () => {

    const response = await request(app)
      .get('/api/users/water_bird_congregation')
      .query({
        state: 'Karnataka',
        county: 'Haveri',
        locality: 'Bankapura Peacock Sanctuary'
      })
      .expect(200);
    expect(response.body).toEqual({
        "data": [],
        "success": true
    })
  })
  })

describe('(State,County,Locality) Data Contributions ID-T5035', () => {

  it('T5035/effortsDetails', async () => {

    const response = await request(app)
      .get('/api/users/effortsDetails')
      .query({
        state: 'Karnataka',
        county: 'Haveri',
        locality: 'Bankapura Peacock Sanctuary'
      })
      .expect(200);
    expect(response.body).toEqual({
        "data": {
            "numberOfObservations": 68,
            "numberOfList": "2",
            "numberOfUniqueLists": "1",
            "totalNumberOfHours": 2,
            "totalNumberOfObservers": 2
        }
    })
  })
});


