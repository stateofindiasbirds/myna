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


describe('(Polygon) Species Details ID-T001', () => {
    //function count
  it('T001/count_by_scientificName', async () => {
      const fakeFilePath = './kangra.geojson';  
      const response = await request(app)
        .post('/api/latlong/count_by_scientificName')
        .attach('file', fakeFilePath)
        .expect(200);
      expect(response.body).toEqual({
        "iucnRedListCategoriesCount": {
            "Vulnerable": 9,
            "Critically Endangered": 4,
            "Near Threatened": 18,
            "Endangered": 5
        },
        "total": 487,
        "migrate": 184,
        "iucnRedList": 18,
        "soibHighPriority": 73,
        "scheduleI": 55,
        "indiaEndemic": 0,
        "soibConservationConcernSpecies": [
            {
                "species": "Moderate Priority",
                "count": 96
            },
            {
                "species": "High Priority",
                "count": 73
            }
        ],
        "citesAppendixSpecies": [
            {
                "species": "Appendix I",
                "count": 6
            },
            {
                "species": "Appendix II",
                "count": 58
            }
        ],
        "cmsAppendixSpecies": [
            {
                "species": "Appendix I",
                "count": 16
            },
            {
                "species": "Appendix II",
                "count": 233
            }
        ]
    });
  })
})

describe('(Polygon) IUCN Red List Speicies ID-T002', () => {

    it('T002/percentage_iucn_redList_species', async () => {
  
      const fakeFilePath = './kangra.geojson';  
  
      const response = await request(app)
            .post('/api/latlong/percentage_iucn_redList_species')
            .attach( 'file', fakeFilePath )
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
                "percentage": "10%"
            },
            {
                "region": "Vulnerable",
                "indiaChecklistScientificName": "Clangula hyemalis",
                "indiaChecklistCommonName": "Long-tailed Duck",
                "uniqueValue": 39,
                "percentage": "0%"
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
                "percentage": "16%"
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
                "percentage": "17%"
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


  describe('(Polygon) Endemic Species ID-T003', () => {

    it('T003/percentage_endemic_species', async () => {
 
     const fakeFilePath = './kangra.geojson';  
 
     const response = await request(app)
           .post('/api/latlong/percentage_endemic_species')
           .attach( 'file', fakeFilePath )
           .expect(200);
 
       expect(response.body).toEqual([
        {
            "region": "Himalayas",
            "indiaChecklistScientificName": "Arborophila torqueola",
            "indiaChecklistCommonName": "Hill Partridge",
            "uniqueValue": 46,
            "percentage": "1%"
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
            "percentage": "5%"
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
            "percentage": "4%"
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
            "indiaChecklistScientificName": "Glaucidium radiatum",
            "indiaChecklistCommonName": "Jungle Owlet",
            "uniqueValue": 494,
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
            "percentage": "5%"
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
            "percentage": "7%"
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
            "percentage": "18%"
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
            "percentage": "27%"
        },
        {
            "region": "Himalayas",
            "indiaChecklistScientificName": "Cyanoderma pyrrhops",
            "indiaChecklistCommonName": "Black-chinned Babbler",
            "uniqueValue": 932,
            "percentage": "5%"
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
            "percentage": "15%"
        },
        {
            "region": "Himalayas",
            "indiaChecklistScientificName": "Trochalopteron variegatum",
            "indiaChecklistCommonName": "Variegated Laughingthrush",
            "uniqueValue": 981,
            "percentage": "8%"
        },
        {
            "region": "Himalayas",
            "indiaChecklistScientificName": "Trochalopteron erythrocephalum",
            "indiaChecklistCommonName": "Chestnut-crowned Laughingthrush",
            "uniqueValue": 984,
            "percentage": "6%"
        },
        {
            "region": "Himalayas",
            "indiaChecklistScientificName": "Heterophasia capistrata",
            "indiaChecklistCommonName": "Rufous Sibia",
            "uniqueValue": 991,
            "percentage": "12%"
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
            "indiaChecklistScientificName": "Ianthocincla rufogularis",
            "indiaChecklistCommonName": "Rufous-chinned Laughingthrush",
            "uniqueValue": 1015,
            "percentage": "0%"
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
            "percentage": "4%"
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
describe('(Polygon) Most Common species ID-T004', () => {

    it('T004/pertcentage_most_common_species', async () => {
     const fakeFilePath = './kangra.geojson';  
 
     const response = await request(app)
           .post('/api/latlong/pertcentage_most_common_species')
           .attach( 'file', fakeFilePath )
           .expect(200);
 
       expect(response.body).toEqual([
        {
            "indiaChecklistScientificName": "Pycnonotus leucogenys",
            "indiaChecklistCommonName": "Himalayan Bulbul",
            "count": 1547,
            "percentage": 50
        },
        {
            "indiaChecklistScientificName": "Milvus migrans",
            "indiaChecklistCommonName": "Black Kite",
            "count": 1412,
            "percentage": 45
        },
        {
            "indiaChecklistScientificName": "Corvus macrorhynchos",
            "indiaChecklistCommonName": "Large-billed Crow",
            "count": 1233,
            "percentage": 40
        },
        {
            "indiaChecklistScientificName": "Parus cinereus",
            "indiaChecklistCommonName": "Cinereous Tit",
            "count": 1009,
            "percentage": 32
        },
        {
            "indiaChecklistScientificName": "Myophonus caeruleus",
            "indiaChecklistCommonName": "Blue Whistling Thrush",
            "count": 972,
            "percentage": 31
        },
        {
            "indiaChecklistScientificName": "Acridotheres tristis",
            "indiaChecklistCommonName": "Common Myna",
            "count": 918,
            "percentage": 29
        },
        {
            "indiaChecklistScientificName": "Phylloscopus xanthoschistos",
            "indiaChecklistCommonName": "Grey-hooded Warbler",
            "count": 858,
            "percentage": 27
        },
        {
            "indiaChecklistScientificName": "Zosterops palpebrosus",
            "indiaChecklistCommonName": "Indian White-eye",
            "count": 845,
            "percentage": 27
        },
        {
            "indiaChecklistScientificName": "Psilopogon virens",
            "indiaChecklistCommonName": "Great Barbet",
            "count": 787,
            "percentage": 25
        },
        {
            "indiaChecklistScientificName": "Passer domesticus",
            "indiaChecklistCommonName": "House Sparrow",
            "count": 761,
            "percentage": 24
        }
    ]);
    });
  })

  // //seasonalChart
describe('(Polygon) Seasonal Chart ID-T005', () => {

    it('T005/seasonal_chart_for_species', async () => {
  
      const fakeFilePath = './kangra.geojson';  
  
  
      const response = await request(app)
            .post('/api/latlong/seasonal_chart_for_species')
            .attach( 'file', fakeFilePath )
            .expect(200);
        expect(response.body).toEqual([
            {
                "indiaChecklistScientificName": "Pycnonotus leucogenys",
                "indiaChecklistCommonName": "Himalayan Bulbul",
                "monthlyData": [
                    {
                        "month": "Jan",
                        "count": 104,
                        "percentage": "32.2%"
                    },
                    {
                        "month": "Feb",
                        "count": 233,
                        "percentage": "42.6%"
                    },
                    {
                        "month": "Mar",
                        "count": 185,
                        "percentage": "50.8%"
                    },
                    {
                        "month": "Apr",
                        "count": 130,
                        "percentage": "56.5%"
                    },
                    {
                        "month": "May",
                        "count": 157,
                        "percentage": "66.0%"
                    },
                    {
                        "month": "Jun",
                        "count": 111,
                        "percentage": "63.1%"
                    },
                    {
                        "month": "Jul",
                        "count": 53,
                        "percentage": "58.2%"
                    },
                    {
                        "month": "Aug",
                        "count": 44,
                        "percentage": "46.8%"
                    },
                    {
                        "month": "Sep",
                        "count": 41,
                        "percentage": "43.6%"
                    },
                    {
                        "month": "Oct",
                        "count": 203,
                        "percentage": "53.7%"
                    },
                    {
                        "month": "Nov",
                        "count": 130,
                        "percentage": "51.2%"
                    },
                    {
                        "month": "Dec",
                        "count": 156,
                        "percentage": "47.0%"
                    }
                ]
            },
            {
                "indiaChecklistScientificName": "Anser indicus",
                "indiaChecklistCommonName": "Bar-headed Goose",
                "monthlyData": [
                    {
                        "month": "Jan",
                        "count": 133,
                        "percentage": "41.2%"
                    },
                    {
                        "month": "Feb",
                        "count": 202,
                        "percentage": "36.9%"
                    },
                    {
                        "month": "Mar",
                        "count": 48,
                        "percentage": "13.2%"
                    },
                    {
                        "month": "Apr",
                        "count": 14,
                        "percentage": "6.1%"
                    },
                    {
                        "month": "May",
                        "count": 3,
                        "percentage": "1.3%"
                    },
                    {
                        "month": "Jun",
                        "count": 2,
                        "percentage": "1.1%"
                    },
                    {
                        "month": "Jul",
                        "count": 3,
                        "percentage": "3.3%"
                    },
                    {
                        "month": "Aug",
                        "count": 7,
                        "percentage": "7.4%"
                    },
                    {
                        "month": "Sep",
                        "count": 7,
                        "percentage": "7.4%"
                    },
                    {
                        "month": "Oct",
                        "count": 6,
                        "percentage": "1.6%"
                    },
                    {
                        "month": "Nov",
                        "count": 48,
                        "percentage": "18.9%"
                    },
                    {
                        "month": "Dec",
                        "count": 80,
                        "percentage": "24.1%"
                    }
                ]
            },
            {
                "indiaChecklistScientificName": "Tadorna ferruginea",
                "indiaChecklistCommonName": "Ruddy Shelduck",
                "monthlyData": [
                    {
                        "month": "Jan",
                        "count": 109,
                        "percentage": "33.7%"
                    },
                    {
                        "month": "Feb",
                        "count": 149,
                        "percentage": "27.2%"
                    },
                    {
                        "month": "Mar",
                        "count": 39,
                        "percentage": "10.7%"
                    },
                    {
                        "month": "Apr",
                        "count": 18,
                        "percentage": "7.8%"
                    },
                    {
                        "month": "May",
                        "count": 5,
                        "percentage": "2.1%"
                    },
                    {
                        "month": "Jun",
                        "count": 1,
                        "percentage": "0.6%"
                    },
                    {
                        "month": "Jul",
                        "count": 0,
                        "percentage": "0.0%"
                    },
                    {
                        "month": "Aug",
                        "count": 6,
                        "percentage": "6.4%"
                    },
                    {
                        "month": "Sep",
                        "count": 0,
                        "percentage": "0.0%"
                    },
                    {
                        "month": "Oct",
                        "count": 16,
                        "percentage": "4.2%"
                    },
                    {
                        "month": "Nov",
                        "count": 53,
                        "percentage": "20.9%"
                    },
                    {
                        "month": "Dec",
                        "count": 77,
                        "percentage": "23.2%"
                    }
                ]
            },
            {
                "indiaChecklistScientificName": "Anas acuta",
                "indiaChecklistCommonName": "Northern Pintail",
                "monthlyData": [
                    {
                        "month": "Jan",
                        "count": 117,
                        "percentage": "36.2%"
                    },
                    {
                        "month": "Feb",
                        "count": 153,
                        "percentage": "28.0%"
                    },
                    {
                        "month": "Mar",
                        "count": 28,
                        "percentage": "7.7%"
                    },
                    {
                        "month": "Apr",
                        "count": 5,
                        "percentage": "2.2%"
                    },
                    {
                        "month": "May",
                        "count": 3,
                        "percentage": "1.3%"
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
                        "percentage": "1.1%"
                    },
                    {
                        "month": "Sep",
                        "count": 3,
                        "percentage": "3.2%"
                    },
                    {
                        "month": "Oct",
                        "count": 34,
                        "percentage": "9.0%"
                    },
                    {
                        "month": "Nov",
                        "count": 47,
                        "percentage": "18.5%"
                    },
                    {
                        "month": "Dec",
                        "count": 76,
                        "percentage": "22.9%"
                    }
                ]
            },
            {
                "indiaChecklistScientificName": "Anas crecca",
                "indiaChecklistCommonName": "Common Teal",
                "monthlyData": [
                    {
                        "month": "Jan",
                        "count": 105,
                        "percentage": "32.5%"
                    },
                    {
                        "month": "Feb",
                        "count": 126,
                        "percentage": "23.0%"
                    },
                    {
                        "month": "Mar",
                        "count": 23,
                        "percentage": "6.3%"
                    },
                    {
                        "month": "Apr",
                        "count": 8,
                        "percentage": "3.5%"
                    },
                    {
                        "month": "May",
                        "count": 2,
                        "percentage": "0.8%"
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
                        "count": 9,
                        "percentage": "9.6%"
                    },
                    {
                        "month": "Oct",
                        "count": 18,
                        "percentage": "4.8%"
                    },
                    {
                        "month": "Nov",
                        "count": 36,
                        "percentage": "14.2%"
                    },
                    {
                        "month": "Dec",
                        "count": 68,
                        "percentage": "20.5%"
                    }
                ]
            },
            {
                "indiaChecklistScientificName": "Spatula clypeata",
                "indiaChecklistCommonName": "Northern Shoveler",
                "monthlyData": [
                    {
                        "month": "Jan",
                        "count": 72,
                        "percentage": "22.3%"
                    },
                    {
                        "month": "Feb",
                        "count": 121,
                        "percentage": "22.1%"
                    },
                    {
                        "month": "Mar",
                        "count": 27,
                        "percentage": "7.4%"
                    },
                    {
                        "month": "Apr",
                        "count": 15,
                        "percentage": "6.5%"
                    },
                    {
                        "month": "May",
                        "count": 2,
                        "percentage": "0.8%"
                    },
                    {
                        "month": "Jun",
                        "count": 0,
                        "percentage": "0.0%"
                    },
                    {
                        "month": "Jul",
                        "count": 1,
                        "percentage": "1.1%"
                    },
                    {
                        "month": "Aug",
                        "count": 2,
                        "percentage": "2.1%"
                    },
                    {
                        "month": "Sep",
                        "count": 14,
                        "percentage": "14.9%"
                    },
                    {
                        "month": "Oct",
                        "count": 32,
                        "percentage": "8.5%"
                    },
                    {
                        "month": "Nov",
                        "count": 42,
                        "percentage": "16.5%"
                    },
                    {
                        "month": "Dec",
                        "count": 64,
                        "percentage": "19.3%"
                    }
                ]
            },
            {
                "indiaChecklistScientificName": "Motacilla alba",
                "indiaChecklistCommonName": "White Wagtail",
                "monthlyData": [
                    {
                        "month": "Jan",
                        "count": 78,
                        "percentage": "24.1%"
                    },
                    {
                        "month": "Feb",
                        "count": 92,
                        "percentage": "16.8%"
                    },
                    {
                        "month": "Mar",
                        "count": 44,
                        "percentage": "12.1%"
                    },
                    {
                        "month": "Apr",
                        "count": 20,
                        "percentage": "8.7%"
                    },
                    {
                        "month": "May",
                        "count": 4,
                        "percentage": "1.7%"
                    },
                    {
                        "month": "Jun",
                        "count": 3,
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
                        "percentage": "1.1%"
                    },
                    {
                        "month": "Sep",
                        "count": 11,
                        "percentage": "11.7%"
                    },
                    {
                        "month": "Oct",
                        "count": 30,
                        "percentage": "7.9%"
                    },
                    {
                        "month": "Nov",
                        "count": 34,
                        "percentage": "13.4%"
                    },
                    {
                        "month": "Dec",
                        "count": 47,
                        "percentage": "14.2%"
                    }
                ]
            },
            {
                "indiaChecklistScientificName": "Chroicocephalus brunnicephalus",
                "indiaChecklistCommonName": "Brown-headed Gull",
                "monthlyData": [
                    {
                        "month": "Jan",
                        "count": 100,
                        "percentage": "31.0%"
                    },
                    {
                        "month": "Feb",
                        "count": 91,
                        "percentage": "16.6%"
                    },
                    {
                        "month": "Mar",
                        "count": 18,
                        "percentage": "4.9%"
                    },
                    {
                        "month": "Apr",
                        "count": 15,
                        "percentage": "6.5%"
                    },
                    {
                        "month": "May",
                        "count": 3,
                        "percentage": "1.3%"
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
                        "count": 9,
                        "percentage": "9.6%"
                    },
                    {
                        "month": "Sep",
                        "count": 5,
                        "percentage": "5.3%"
                    },
                    {
                        "month": "Oct",
                        "count": 27,
                        "percentage": "7.1%"
                    },
                    {
                        "month": "Nov",
                        "count": 34,
                        "percentage": "13.4%"
                    },
                    {
                        "month": "Dec",
                        "count": 53,
                        "percentage": "16.0%"
                    }
                ]
            },
            {
                "indiaChecklistScientificName": "Chroicocephalus ridibundus",
                "indiaChecklistCommonName": "Black-headed Gull",
                "monthlyData": [
                    {
                        "month": "Jan",
                        "count": 105,
                        "percentage": "32.5%"
                    },
                    {
                        "month": "Feb",
                        "count": 96,
                        "percentage": "17.6%"
                    },
                    {
                        "month": "Mar",
                        "count": 18,
                        "percentage": "4.9%"
                    },
                    {
                        "month": "Apr",
                        "count": 9,
                        "percentage": "3.9%"
                    },
                    {
                        "month": "May",
                        "count": 2,
                        "percentage": "0.8%"
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
                        "percentage": "2.1%"
                    },
                    {
                        "month": "Sep",
                        "count": 4,
                        "percentage": "4.3%"
                    },
                    {
                        "month": "Oct",
                        "count": 27,
                        "percentage": "7.1%"
                    },
                    {
                        "month": "Nov",
                        "count": 32,
                        "percentage": "12.6%"
                    },
                    {
                        "month": "Dec",
                        "count": 51,
                        "percentage": "15.4%"
                    }
                ]
            },
            {
                "indiaChecklistScientificName": "Hirundo rustica",
                "indiaChecklistCommonName": "Barn Swallow",
                "monthlyData": [
                    {
                        "month": "Jan",
                        "count": 49,
                        "percentage": "15.2%"
                    },
                    {
                        "month": "Feb",
                        "count": 52,
                        "percentage": "9.5%"
                    },
                    {
                        "month": "Mar",
                        "count": 41,
                        "percentage": "11.3%"
                    },
                    {
                        "month": "Apr",
                        "count": 27,
                        "percentage": "11.7%"
                    },
                    {
                        "month": "May",
                        "count": 21,
                        "percentage": "8.8%"
                    },
                    {
                        "month": "Jun",
                        "count": 23,
                        "percentage": "13.1%"
                    },
                    {
                        "month": "Jul",
                        "count": 9,
                        "percentage": "9.9%"
                    },
                    {
                        "month": "Aug",
                        "count": 2,
                        "percentage": "2.1%"
                    },
                    {
                        "month": "Sep",
                        "count": 4,
                        "percentage": "4.3%"
                    },
                    {
                        "month": "Oct",
                        "count": 25,
                        "percentage": "6.6%"
                    },
                    {
                        "month": "Nov",
                        "count": 35,
                        "percentage": "13.8%"
                    },
                    {
                        "month": "Dec",
                        "count": 57,
                        "percentage": "17.2%"
                    }
                ]
            }
        ])
    });
  })


  //hotspotArea
describe('(Polygon) Hotspots ID-T006', () => {

    it('T006/hotspot_area', async () => {

      const fakeFilePath = './kangra.geojson';  

      const response = await request(app)
            .post('/api/latlong/hotspot_area')
            .attach( 'file', fakeFilePath )
            .expect(200);

        expect(response.body).toEqual([
            {
                "locality": "Pong Dam--Nagrota Surian",
                "localityId": "L3816878",
                "latitude": 32.044096,
                "longitude": 76.0604954,
                "count": "298"
            },
            {
                "locality": "McLeod Ganj",
                "localityId": "L1091154",
                "latitude": 32.2416989,
                "longitude": 76.3204765,
                "count": "220"
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
                "locality": "Dharamshala City",
                "localityId": "L4663015",
                "latitude": 32.2179689,
                "longitude": 76.3226347,
                "count": "163"
            }
        ])
    })
  })


  // //waterBirdCongregations
describe('(Polygon) waterBirdCongregations ID-T006', () => {

  it('T006/water_bird_congregation', async () => {

    const fakeFilePath = './kangra.geojson';

    const response = await request(app)
      .post('/api/latlong/water_bird_congregation')
      .attach('file', fakeFilePath)
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