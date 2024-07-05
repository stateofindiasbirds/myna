const request = require('supertest');
const express = require('express');
const bodyParser = require('body-parser');
const UserController = require('./controllers/latitude');
const multer = require('multer');



const app = express();

app.use(bodyParser.json());
app.use(express.json());
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

app.post('/api/latlong/count_by_scientificName', upload.single('file'), UserController.count);
app.post('/api/latlong/percentage_iucn_redList_species', upload.single('file'), UserController.iucnRedListSpeicies);
app.post('/api/latlong/percentage_endemic_species', upload.single('file'), UserController.endemincSpecies);
app.post('/api/latlong/pertcentage_most_common_species', upload.single('file'), UserController.mostCommonSpecies);
app.post('/api/latlong/seasonal_chart_for_species', upload.single('file'), UserController.seasonalChart);
app.post('/api/latlong/hotspot_area', upload.single('file'), UserController.hotspotArea);
app.post('/api/latlong/water_bird_congregation', upload.single('file'), UserController.waterBirdCongregations);




jest.setTimeout(60000);


describe('(Polygon and Date) Species Details ID-T5001', () => {
    //function count
  it('T5001/count_by_scientificName', async () => {
      const fakeFilePath = './kangra.geojson';  
      const response = await request(app)
        .post('/api/latlong/count_by_scientificName')
        .attach('file', fakeFilePath)
        .query({
            start: '01-01-2000',
            end: '05-31-2022'
          })
        .expect(200);
      expect(response.body).toEqual({
        "iucnRedListCategoriesCount": {
            "Vulnerable": 8,
            "Critically Endangered": 4,
            "Near Threatened": 18,
            "Endangered": 5
        },
        "total": 472,
        "migrate": 177,
        "iucnRedList": 17,
        "soibHighPriority": 72,
        "scheduleI": 55,
        "indiaEndemic": 0,
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
                "count": 15
            },
            {
                "species": "Appendix II",
                "count": 225
            }
        ]
    });
  })
})

describe('(Polygon and Date) IUCN Red List Speicies ID-T5002', () => {

    it('T5002/percentage_iucn_redList_species', async () => {
  
      const fakeFilePath = './kangra.geojson';  
  
      const response = await request(app)
            .post('/api/latlong/percentage_iucn_redList_species')
            .attach( 'file', fakeFilePath )
            .query({
                start: '01-01-2000',
                end: '05-31-2022'
              })
            .expect(200);
        expect(response.body).toEqual([
            {
                "region": "Critically Endangered",
                "indiaChecklistScientificName": "Sarcogyps calvus",
                "indiaChecklistCommonName": "Red-headed Vulture",
                "uniqueValue": 419,
                "percentage": "1%"
            },
            {
                "region": "Critically Endangered",
                "indiaChecklistScientificName": "Gyps bengalensis",
                "indiaChecklistCommonName": "White-rumped Vulture",
                "uniqueValue": 421,
                "percentage": "5%"
            },
            {
                "region": "Critically Endangered",
                "indiaChecklistScientificName": "Gyps indicus",
                "indiaChecklistCommonName": "Indian Vulture",
                "uniqueValue": 422,
                "percentage": "0%"
            },
            {
                "region": "Critically Endangered",
                "indiaChecklistScientificName": "Gyps tenuirostris",
                "indiaChecklistCommonName": "Slender-billed Vulture",
                "uniqueValue": 423,
                "percentage": "0%"
            },
            {
                "region": "Endangered",
                "indiaChecklistScientificName": "Calidris tenuirostris",
                "indiaChecklistCommonName": "Great Knot",
                "uniqueValue": 253,
                "percentage": "0%"
            },
            {
                "region": "Endangered",
                "indiaChecklistScientificName": "Sterna acuticauda",
                "indiaChecklistCommonName": "Black-bellied Tern",
                "uniqueValue": 336,
                "percentage": "0%"
            },
            {
                "region": "Endangered",
                "indiaChecklistScientificName": "Neophron percnopterus",
                "indiaChecklistCommonName": "Egyptian Vulture",
                "uniqueValue": 414,
                "percentage": "18%"
            },
            {
                "region": "Endangered",
                "indiaChecklistScientificName": "Aquila nipalensis",
                "indiaChecklistCommonName": "Steppe Eagle",
                "uniqueValue": 439,
                "percentage": "5%"
            },
            {
                "region": "Endangered",
                "indiaChecklistScientificName": "Haliaeetus leucoryphus",
                "indiaChecklistCommonName": "Pallas's Fish Eagle",
                "uniqueValue": 464,
                "percentage": "0%"
            },
            {
                "region": "Vulnerable",
                "indiaChecklistScientificName": "Anser erythropus",
                "indiaChecklistCommonName": "Lesser White-fronted Goose",
                "uniqueValue": 6,
                "percentage": "0%"
            },
            {
                "region": "Vulnerable",
                "indiaChecklistScientificName": "Branta ruficollis",
                "indiaChecklistCommonName": "Red-breasted Goose",
                "uniqueValue": 9,
                "percentage": "0%"
            },
            {
                "region": "Vulnerable",
                "indiaChecklistScientificName": "Aythya ferina",
                "indiaChecklistCommonName": "Common Pochard",
                "uniqueValue": 34,
                "percentage": "11%"
            },
            {
                "region": "Vulnerable",
                "indiaChecklistScientificName": "Catreus wallichii",
                "indiaChecklistCommonName": "Cheer Pheasant",
                "uniqueValue": 61,
                "percentage": "0%"
            },
            {
                "region": "Vulnerable",
                "indiaChecklistScientificName": "Antigone antigone",
                "indiaChecklistCommonName": "Sarus Crane",
                "uniqueValue": 216,
                "percentage": "1%"
            },
            {
                "region": "Vulnerable",
                "indiaChecklistScientificName": "Sterna aurantia",
                "indiaChecklistCommonName": "River Tern",
                "uniqueValue": 337,
                "percentage": "17%"
            },
            {
                "region": "Vulnerable",
                "indiaChecklistScientificName": "Clanga hastata",
                "indiaChecklistCommonName": "Indian Spotted Eagle",
                "uniqueValue": 435,
                "percentage": "0%"
            },
            {
                "region": "Vulnerable",
                "indiaChecklistScientificName": "Aquila heliaca",
                "indiaChecklistCommonName": "Eastern Imperial Eagle",
                "uniqueValue": 440,
                "percentage": "0%"
            },
            {
                "region": "Near Threatened",
                "indiaChecklistScientificName": "Aythya nyroca",
                "indiaChecklistCommonName": "Ferruginous Duck",
                "uniqueValue": 35,
                "percentage": "2%"
            },
            {
                "region": "Near Threatened",
                "indiaChecklistScientificName": "Esacus recurvirostris",
                "indiaChecklistCommonName": "Great Thick-knee",
                "uniqueValue": 220,
                "percentage": "5%"
            },
            {
                "region": "Near Threatened",
                "indiaChecklistScientificName": "Haematopus ostralegus",
                "indiaChecklistCommonName": "Eurasian Oystercatcher",
                "uniqueValue": 225,
                "percentage": "0%"
            },
            {
                "region": "Near Threatened",
                "indiaChecklistScientificName": "Vanellus vanellus",
                "indiaChecklistCommonName": "Northern Lapwing",
                "uniqueValue": 230,
                "percentage": "4%"
            },
            {
                "region": "Near Threatened",
                "indiaChecklistScientificName": "Vanellus duvaucelii",
                "indiaChecklistCommonName": "River Lapwing",
                "uniqueValue": 231,
                "percentage": "15%"
            },
            {
                "region": "Near Threatened",
                "indiaChecklistScientificName": "Numenius arquata",
                "indiaChecklistCommonName": "Eurasian Curlew",
                "uniqueValue": 249,
                "percentage": "1%"
            },
            {
                "region": "Near Threatened",
                "indiaChecklistScientificName": "Limosa limosa",
                "indiaChecklistCommonName": "Black-tailed Godwit",
                "uniqueValue": 251,
                "percentage": "1%"
            },
            {
                "region": "Near Threatened",
                "indiaChecklistScientificName": "Calidris ferruginea",
                "indiaChecklistCommonName": "Curlew Sandpiper",
                "uniqueValue": 258,
                "percentage": "0%"
            },
            {
                "region": "Near Threatened",
                "indiaChecklistScientificName": "Ciconia episcopus",
                "indiaChecklistCommonName": "Woolly-necked Stork",
                "uniqueValue": 365,
                "percentage": "3%"
            },
            {
                "region": "Near Threatened",
                "indiaChecklistScientificName": "Anhinga melanogaster",
                "indiaChecklistCommonName": "Oriental Darter",
                "uniqueValue": 377,
                "percentage": "0%"
            },
            {
                "region": "Near Threatened",
                "indiaChecklistScientificName": "Threskiornis melanocephalus",
                "indiaChecklistCommonName": "Black-headed Ibis",
                "uniqueValue": 408,
                "percentage": "0%"
            },
            {
                "region": "Near Threatened",
                "indiaChecklistScientificName": "Gypaetus barbatus",
                "indiaChecklistCommonName": "Bearded Vulture",
                "uniqueValue": 413,
                "percentage": "2%"
            },
            {
                "region": "Near Threatened",
                "indiaChecklistScientificName": "Aegypius monachus",
                "indiaChecklistCommonName": "Cinereous Vulture",
                "uniqueValue": 420,
                "percentage": "1%"
            },
            {
                "region": "Near Threatened",
                "indiaChecklistScientificName": "Gyps himalayensis",
                "indiaChecklistCommonName": "Himalayan Vulture",
                "uniqueValue": 424,
                "percentage": "18%"
            },
            {
                "region": "Near Threatened",
                "indiaChecklistScientificName": "Nisaetus nipalensis",
                "indiaChecklistCommonName": "Mountain Hawk Eagle",
                "uniqueValue": 431,
                "percentage": "2%"
            },
            {
                "region": "Near Threatened",
                "indiaChecklistScientificName": "Circus macrourus",
                "indiaChecklistCommonName": "Pallid Harrier",
                "uniqueValue": 449,
                "percentage": "0%"
            },
            {
                "region": "Near Threatened",
                "indiaChecklistScientificName": "Falco chicquera",
                "indiaChecklistCommonName": "Red-necked Falcon",
                "uniqueValue": 593,
                "percentage": "0%"
            },
            {
                "region": "Near Threatened",
                "indiaChecklistScientificName": "Psittacula eupatria",
                "indiaChecklistCommonName": "Alexandrine Parakeet",
                "uniqueValue": 602,
                "percentage": "18%"
            }
        ])
    });
  })


  describe('(Polygon and Date) Endemic Species ID-T5003', () => {

    it('T5003/percentage_endemic_species', async () => {
 
     const fakeFilePath = './kangra.geojson';  
 
     const response = await request(app)
           .post('/api/latlong/percentage_endemic_species')
           .attach( 'file', fakeFilePath )
           .query({
            start: '01-01-2000',
            end: '05-31-2022'
          })
           .expect(200);
 
       expect(response.body).toEqual([
        {
            "region": "Himalayas",
            "indiaChecklistScientificName": "Arborophila torqueola",
            "indiaChecklistCommonName": "Hill Partridge",
            "uniqueValue": 46,
            "percentage": "2%"
        },
        {
            "region": "Himalayas",
            "indiaChecklistScientificName": "Lophophorus impejanus",
            "indiaChecklistCommonName": "Himalayan Monal",
            "uniqueValue": 56,
            "percentage": "1%"
        },
        {
            "region": "Western Himalayas",
            "indiaChecklistScientificName": "Catreus wallichii",
            "indiaChecklistCommonName": "Cheer Pheasant",
            "uniqueValue": 61,
            "percentage": "0%"
        },
        {
            "region": "Indian Subcontinent",
            "indiaChecklistScientificName": "Pavo cristatus",
            "indiaChecklistCommonName": "Indian Peafowl",
            "uniqueValue": 63,
            "percentage": "4%"
        },
        {
            "region": "Himalayas",
            "indiaChecklistScientificName": "Tetraogallus himalayensis",
            "indiaChecklistCommonName": "Himalayan Snowcock",
            "uniqueValue": 77,
            "percentage": "0%"
        },
        {
            "region": "Indian Subcontinent",
            "indiaChecklistScientificName": "Perdicula asiatica",
            "indiaChecklistCommonName": "Jungle Bush Quail",
            "uniqueValue": 83,
            "percentage": "0%"
        },
        {
            "region": "Indian Subcontinent",
            "indiaChecklistScientificName": "Taccocua leschenaultii",
            "indiaChecklistCommonName": "Sirkeer Malkoha",
            "uniqueValue": 144,
            "percentage": "0%"
        },
        {
            "region": "Indian Subcontinent",
            "indiaChecklistScientificName": "Cacomantis passerinus",
            "indiaChecklistCommonName": "Grey-bellied Cuckoo",
            "uniqueValue": 155,
            "percentage": "0%"
        },
        {
            "region": "Indian Subcontinent",
            "indiaChecklistScientificName": "Hierococcyx varius",
            "indiaChecklistCommonName": "Common Hawk Cuckoo",
            "uniqueValue": 159,
            "percentage": "3%"
        },
        {
            "region": "Indian Subcontinent",
            "indiaChecklistScientificName": "Vanellus malabaricus",
            "indiaChecklistCommonName": "Yellow-wattled Lapwing",
            "uniqueValue": 232,
            "percentage": "4%"
        },
        {
            "region": "Indian Subcontinent",
            "indiaChecklistScientificName": "Pseudibis papillosa",
            "indiaChecklistCommonName": "Red-naped Ibis",
            "uniqueValue": 409,
            "percentage": "3%"
        },
        {
            "region": "Indian Subcontinent",
            "indiaChecklistScientificName": "Gyps indicus",
            "indiaChecklistCommonName": "Indian Vulture",
            "uniqueValue": 422,
            "percentage": "0%"
        },
        {
            "region": "Indian Subcontinent",
            "indiaChecklistScientificName": "Otus bakkamoena",
            "indiaChecklistCommonName": "Indian Scops Owl",
            "uniqueValue": 480,
            "percentage": "0%"
        },
        {
            "region": "Indian Subcontinent",
            "indiaChecklistScientificName": "Ocyceros birostris",
            "indiaChecklistCommonName": "Indian Grey Hornbill",
            "uniqueValue": 515,
            "percentage": "14%"
        },
        {
            "region": "Indian Subcontinent",
            "indiaChecklistScientificName": "Psilopogon zeylanicus",
            "indiaChecklistCommonName": "Brown-headed Barbet",
            "uniqueValue": 551,
            "percentage": "4%"
        },
        {
            "region": "Indian Subcontinent",
            "indiaChecklistScientificName": "Yungipicus nanus",
            "indiaChecklistCommonName": "Brown-capped Pygmy Woodpecker",
            "uniqueValue": 560,
            "percentage": "0%"
        },
        {
            "region": "Himalayas",
            "indiaChecklistScientificName": "Dendrocoptes auriceps",
            "indiaChecklistCommonName": "Brown-fronted Woodpecker",
            "uniqueValue": 563,
            "percentage": "6%"
        },
        {
            "region": "Himalayas",
            "indiaChecklistScientificName": "Dendrocopos himalayensis",
            "indiaChecklistCommonName": "Himalayan Woodpecker",
            "uniqueValue": 570,
            "percentage": "2%"
        },
        {
            "region": "Indian Subcontinent",
            "indiaChecklistScientificName": "Dinopium benghalense",
            "indiaChecklistCommonName": "Black-rumped Flameback",
            "uniqueValue": 580,
            "percentage": "2%"
        },
        {
            "region": "Himalayas",
            "indiaChecklistScientificName": "Picus squamatus",
            "indiaChecklistCommonName": "Scaly-bellied Woodpecker",
            "uniqueValue": 583,
            "percentage": "2%"
        },
        {
            "region": "Indian Subcontinent",
            "indiaChecklistScientificName": "Psittacula himalayana",
            "indiaChecklistCommonName": "Slaty-headed Parakeet",
            "uniqueValue": 604,
            "percentage": "5%"
        },
        {
            "region": "Indian Subcontinent",
            "indiaChecklistScientificName": "Psittacula cyanocephala",
            "indiaChecklistCommonName": "Plum-headed Parakeet",
            "uniqueValue": 606,
            "percentage": "13%"
        },
        {
            "region": "Indian Subcontinent",
            "indiaChecklistScientificName": "Pitta brachyura",
            "indiaChecklistCommonName": "Indian Pitta",
            "uniqueValue": 618,
            "percentage": "0%"
        },
        {
            "region": "Western Himalayas",
            "indiaChecklistScientificName": "Garrulus lanceolatus",
            "indiaChecklistCommonName": "Black-headed Jay",
            "uniqueValue": 687,
            "percentage": "8%"
        },
        {
            "region": "Himalayas",
            "indiaChecklistScientificName": "Urocissa flavirostris",
            "indiaChecklistCommonName": "Yellow-billed Blue Magpie",
            "uniqueValue": 688,
            "percentage": "19%"
        },
        {
            "region": "Himalayas",
            "indiaChecklistScientificName": "Machlolophus xanthogenys",
            "indiaChecklistCommonName": "Himalayan Black-lored Tit",
            "uniqueValue": 724,
            "percentage": "4%"
        },
        {
            "region": "Indian Subcontinent",
            "indiaChecklistScientificName": "Eremopterix griseus",
            "indiaChecklistCommonName": "Ashy-crowned Sparrow Lark",
            "uniqueValue": 732,
            "percentage": "0%"
        },
        {
            "region": "Indian Subcontinent",
            "indiaChecklistScientificName": "Prinia sylvatica",
            "indiaChecklistCommonName": "Jungle Prinia",
            "uniqueValue": 761,
            "percentage": "0%"
        },
        {
            "region": "Indian Subcontinent",
            "indiaChecklistScientificName": "Prinia socialis",
            "indiaChecklistCommonName": "Ashy Prinia",
            "uniqueValue": 763,
            "percentage": "9%"
        },
        {
            "region": "Western Himalayas",
            "indiaChecklistScientificName": "Locustella kashmirensis",
            "indiaChecklistCommonName": "West Himalayan Bush Warbler",
            "uniqueValue": 787,
            "percentage": "0%"
        },
        {
            "region": "Himalayas",
            "indiaChecklistScientificName": "Pnoepyga immaculata",
            "indiaChecklistCommonName": "Nepal Wren Babbler",
            "uniqueValue": 794,
            "percentage": "0%"
        },
        {
            "region": "Himalayas",
            "indiaChecklistScientificName": "Pycnonotus leucogenys",
            "indiaChecklistCommonName": "Himalayan Bulbul",
            "uniqueValue": 821,
            "percentage": "50%"
        },
        {
            "region": "Himalayas",
            "indiaChecklistScientificName": "Phylloscopus xanthoschistos",
            "indiaChecklistCommonName": "Grey-hooded Warbler",
            "uniqueValue": 871,
            "percentage": "28%"
        },
        {
            "region": "Himalayas",
            "indiaChecklistScientificName": "Cyanoderma pyrrhops",
            "indiaChecklistCommonName": "Black-chinned Babbler",
            "uniqueValue": 932,
            "percentage": "6%"
        },
        {
            "region": "Himalayas",
            "indiaChecklistScientificName": "Grammatoptila striata",
            "indiaChecklistCommonName": "Striated Laughingthrush",
            "uniqueValue": 973,
            "percentage": "2%"
        },
        {
            "region": "Himalayas",
            "indiaChecklistScientificName": "Trochalopteron lineatum",
            "indiaChecklistCommonName": "Streaked Laughingthrush",
            "uniqueValue": 978,
            "percentage": "16%"
        },
        {
            "region": "Himalayas",
            "indiaChecklistScientificName": "Trochalopteron variegatum",
            "indiaChecklistCommonName": "Variegated Laughingthrush",
            "uniqueValue": 981,
            "percentage": "9%"
        },
        {
            "region": "Himalayas",
            "indiaChecklistScientificName": "Trochalopteron erythrocephalum",
            "indiaChecklistCommonName": "Chestnut-crowned Laughingthrush",
            "uniqueValue": 984,
            "percentage": "7%"
        },
        {
            "region": "Himalayas",
            "indiaChecklistScientificName": "Heterophasia capistrata",
            "indiaChecklistCommonName": "Rufous Sibia",
            "uniqueValue": 991,
            "percentage": "13%"
        },
        {
            "region": "Indian Subcontinent",
            "indiaChecklistScientificName": "Argya malcolmi",
            "indiaChecklistCommonName": "Large Grey Babbler",
            "uniqueValue": 1005,
            "percentage": "0%"
        },
        {
            "region": "Indian Subcontinent",
            "indiaChecklistScientificName": "Argya striata",
            "indiaChecklistCommonName": "Jungle Babbler",
            "uniqueValue": 1008,
            "percentage": "12%"
        },
        {
            "region": "Indian Subcontinent",
            "indiaChecklistScientificName": "Argya caudata",
            "indiaChecklistCommonName": "Common Babbler",
            "uniqueValue": 1010,
            "percentage": "2%"
        },
        {
            "region": "Himalayas",
            "indiaChecklistScientificName": "Sitta himalayensis",
            "indiaChecklistCommonName": "White-tailed Nuthatch",
            "uniqueValue": 1034,
            "percentage": "2%"
        },
        {
            "region": "Indian Subcontinent",
            "indiaChecklistScientificName": "Acridotheres ginginianus",
            "indiaChecklistCommonName": "Bank Myna",
            "uniqueValue": 1066,
            "percentage": "5%"
        },
        {
            "region": "Indian Subcontinent",
            "indiaChecklistScientificName": "Turdus unicolor",
            "indiaChecklistCommonName": "Tickell's Thrush",
            "uniqueValue": 1091,
            "percentage": "1%"
        },
        {
            "region": "Himalayas",
            "indiaChecklistScientificName": "Turdus albocinctus",
            "indiaChecklistCommonName": "White-collared Blackbird",
            "uniqueValue": 1098,
            "percentage": "0%"
        },
        {
            "region": "Indian Subcontinent",
            "indiaChecklistScientificName": "Copsychus fulicatus",
            "indiaChecklistCommonName": "Indian Robin",
            "uniqueValue": 1110,
            "percentage": "6%"
        },
        {
            "region": "Indian Subcontinent",
            "indiaChecklistScientificName": "Oenanthe fusca",
            "indiaChecklistCommonName": "Brown Rock Chat",
            "uniqueValue": 1203,
            "percentage": "2%"
        },
        {
            "region": "Indian Subcontinent",
            "indiaChecklistScientificName": "Dicaeum erythrorhynchos",
            "indiaChecklistCommonName": "Pale-billed Flowerpecker",
            "uniqueValue": 1213,
            "percentage": "0%"
        },
        {
            "region": "Indian Subcontinent",
            "indiaChecklistScientificName": "Ploceus benghalensis",
            "indiaChecklistCommonName": "Black-breasted Weaver",
            "uniqueValue": 1242,
            "percentage": "0%"
        },
        {
            "region": "Indus Plains",
            "indiaChecklistScientificName": "Passer pyrrhonotus",
            "indiaChecklistCommonName": "Sind Sparrow",
            "uniqueValue": 1260,
            "percentage": "0%"
        },
        {
            "region": "Indian Subcontinent",
            "indiaChecklistScientificName": "Motacilla maderaspatensis",
            "indiaChecklistCommonName": "White-browed Wagtail",
            "uniqueValue": 1275,
            "percentage": "7%"
        },
        {
            "region": "Himalayas",
            "indiaChecklistScientificName": "Carpodacus rodochroa",
            "indiaChecklistCommonName": "Pink-browed Rosefinch",
            "uniqueValue": 1304,
            "percentage": "5%"
        },
        {
            "region": "Western Himalayas",
            "indiaChecklistScientificName": "Pyrrhula aurantiaca",
            "indiaChecklistCommonName": "Orange Bullfinch",
            "uniqueValue": 1317,
            "percentage": "0%"
        },
        {
            "region": "Himalayas",
            "indiaChecklistScientificName": "Pyrrhula erythrocephala",
            "indiaChecklistCommonName": "Red-headed Bullfinch",
            "uniqueValue": 1318,
            "percentage": "0%"
        },
        {
            "region": "Himalayas",
            "indiaChecklistScientificName": "Chloris spinoides",
            "indiaChecklistCommonName": "Yellow-breasted Greenfinch",
            "uniqueValue": 1330,
            "percentage": "2%"
        }
    ])
    });
  })


  //function mostCommonSpecies 
describe('(Polygon and Date) Most Common species ID-T5004', () => {

    it('T5004/pertcentage_most_common_species', async () => {
     const fakeFilePath = './kangra.geojson';  
 
     const response = await request(app)
           .post('/api/latlong/pertcentage_most_common_species')
           .attach( 'file', fakeFilePath )
           .query({
            start: '01-01-2000',
            end: '05-31-2022'
          })
           .expect(200);
 
       expect(response.body).toEqual([
        {
            "indiaChecklistScientificName": "Pycnonotus leucogenys",
            "indiaChecklistCommonName": "Himalayan Bulbul",
            "count": 1256,
            "percentage": 50
        },
        {
            "indiaChecklistScientificName": "Milvus migrans",
            "indiaChecklistCommonName": "Black Kite",
            "count": 1153,
            "percentage": 46
        },
        {
            "indiaChecklistScientificName": "Corvus macrorhynchos",
            "indiaChecklistCommonName": "Large-billed Crow",
            "count": 1020,
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
            "count": 803,
            "percentage": 32
        },
        {
            "indiaChecklistScientificName": "Acridotheres tristis",
            "indiaChecklistCommonName": "Common Myna",
            "count": 737,
            "percentage": 29
        },
        {
            "indiaChecklistScientificName": "Phylloscopus xanthoschistos",
            "indiaChecklistCommonName": "Grey-hooded Warbler",
            "count": 704,
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
            "count": 648,
            "percentage": 26
        },
        {
            "indiaChecklistScientificName": "Passer domesticus",
            "indiaChecklistCommonName": "House Sparrow",
            "count": 622,
            "percentage": 25
        }
    ]);
    });
  })

  // //seasonalChart
describe('(Polygon and Date) Seasonal Chart ID-T5005', () => {

    it('T5005/seasonal_chart_for_species', async () => {
  
      const fakeFilePath = './kangra.geojson';  
  
  
      const response = await request(app)
            .post('/api/latlong/seasonal_chart_for_species')
            .attach( 'file', fakeFilePath )
            .query({
                start: '01-01-2000',
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
                        "count": 199,
                        "percentage": "42.7%"
                    },
                    {
                        "month": "Mar",
                        "count": 153,
                        "percentage": "51.5%"
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
                        "count": 79,
                        "percentage": "67.5%"
                    },
                    {
                        "month": "Jul",
                        "count": 41,
                        "percentage": "56.2%"
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
                        "percentage": "46.7%"
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
                        "percentage": "35.4%"
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
                        "percentage": "2.7%"
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
                        "percentage": "26.5%"
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
                        "percentage": "27.9%"
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
                        "percentage": "25.4%"
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
                        "percentage": "26.0%"
                    },
                    {
                        "month": "Mar",
                        "count": 36,
                        "percentage": "12.1%"
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
                        "count": 74,
                        "percentage": "25.8%"
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
                        "percentage": "23.8%"
                    },
                    {
                        "month": "Mar",
                        "count": 23,
                        "percentage": "7.7%"
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
                        "count": 65,
                        "percentage": "22.6%"
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
                        "percentage": "18.0%"
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
                        "count": 46,
                        "percentage": "16.0%"
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
                        "percentage": "20.2%"
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
                        "count": 61,
                        "percentage": "21.3%"
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
                        "percentage": "16.7%"
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
                        "count": 51,
                        "percentage": "17.8%"
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
                        "percentage": "14.5%"
                    },
                    {
                        "month": "Jul",
                        "count": 8,
                        "percentage": "11.0%"
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
                        "percentage": "19.2%"
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
                        "percentage": "17.6%"
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
                        "percentage": "17.1%"
                    }
                ]
            }
        ])
    });
  })


  //hotspotArea
describe('(Polygon and Date) Hotspots ID-T5006', () => {

    it('T5006/hotspot_area', async () => {

      const fakeFilePath = './kangra.geojson';  

      const response = await request(app)
            .post('/api/latlong/hotspot_area')
            .attach( 'file', fakeFilePath )
            .query({
                start: '01-01-2000',
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


  // //waterBirdCongregations
describe('(Polygon and Date) waterBirdCongregations ID-T5007', () => {

  it('T5007/water_bird_congregation', async () => {

    const fakeFilePath = './kangra.geojson';

    const response = await request(app)
      .post('/api/latlong/water_bird_congregation')
      .attach('file', fakeFilePath)
      .query({
        start: '01-01-2000',
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
                "uniqueValue": 4
            },
            {
                "indiaChecklistCommonName": "Ruddy Shelduck",
                "indiaChecklistScientificName": "Tadorna ferruginea",
                "highestCongregation": "564",
                "maxObservationCount": 1,
                "onePercentBiographicPopulation": "500",
                "uniqueValue": 14
            },
            {
                "indiaChecklistCommonName": "Great Cormorant",
                "indiaChecklistScientificName": "Phalacrocorax carbo",
                "highestCongregation": "2456",
                "maxObservationCount": 2,
                "onePercentBiographicPopulation": "1000",
                "uniqueValue": 379
            }
        ],
        "success": true
    })
});
})