-- ============================================
-- Index creation for materialized view "merges"
-- Using for non-blocking operation
-- ============================================

-- Spatial & general indexes
CREATE INDEX IF NOT EXISTS idx_lat_lng 
    ON merges (latitude, longitude);

CREATE INDEX IF NOT EXISTS idx_spatial_location 
    ON merges USING gist (st_setsrid(st_makepoint(longitude, latitude), 4326));

CREATE INDEX IF NOT EXISTS idx_merges_geom
    ON merges USING gist (geom);

-- Common lookup indexes
CREATE INDEX IF NOT EXISTS idx_county 
    ON merges (county);

CREATE INDEX IF NOT EXISTS idx_state 
    ON merges (state);

CREATE INDEX IF NOT EXISTS idx_locality 
    ON merges (locality);

CREATE INDEX IF NOT EXISTS idx_localityid 
    ON merges ("localityId");

CREATE INDEX IF NOT EXISTS idx_observationdate 
    ON merges ("observationDate");

CREATE INDEX IF NOT EXISTS idx_samplingeventidentifier 
    ON merges ("samplingEventIdentifier");

CREATE INDEX IF NOT EXISTS idx_groupidentifier 
    ON merges ("groupIdentifier");

CREATE INDEX IF NOT EXISTS idx_category 
    ON merges (category);

-- Taxon-specific indexes
CREATE INDEX IF NOT EXISTS idx_ebirdscientificname 
    ON merges ("eBirdScientificName");

CREATE INDEX IF NOT EXISTS idx_indiachecklist_common_name 
    ON merges ("indiaChecklistCommonName");

CREATE INDEX IF NOT EXISTS idx_indiachecklist_scientific_name 
    ON merges ("indiaChecklistScientificName");

CREATE INDEX IF NOT EXISTS idx_soibconcernstatus 
    ON merges ("soibConcernStatus");

-- Conservation fields
CREATE INDEX IF NOT EXISTS idx_iucncategory 
    ON merges ("iucnCategory");

CREATE INDEX IF NOT EXISTS idx_wpaschedule 
    ON merges ("wpaSchedule");

CREATE INDEX IF NOT EXISTS idx_citesappendix 
    ON merges ("citesAppendix");

CREATE INDEX IF NOT EXISTS idx_cmsappendix 
    ON merges ("cmsAppendix");

-- Migratory, unique value, etc.
CREATE INDEX IF NOT EXISTS idx_migratory_status 
    ON merges ("migratoryStatusWithinIndia");

CREATE INDEX IF NOT EXISTS idx_unique_value 
    ON merges ("uniqueValue");

CREATE INDEX IF NOT EXISTS idx_merges_state_county_date
    ON merges (state, county, "observationDate");

CREATE INDEX IF NOT EXISTS idx_merges_state_county_iucn
    ON merges (state, county, "iucnCategory");

CREATE INDEX IF NOT EXISTS idx_merges_state_county_soib
    ON merges (state, county, "soibConcernStatus");

CREATE INDEX IF NOT EXISTS idx_merges_state_county_endemic
    ON merges (state, county, "endemicRegion");

CREATE INDEX IF NOT EXISTS idx_merges_state_county_migratory
    ON merges (state, county, "migratoryStatusWithinIndia");

CREATE INDEX IF NOT EXISTS idx_merges_state_county_locality
    ON merges (state, county, "localityId");

CREATE INDEX IF NOT EXISTS idx_merges_state_county_group
    ON merges (state, county, "groupIdentifier", "allSpeciesReported");

CREATE INDEX IF NOT EXISTS idx_merges_state_county_onepercent
    ON merges (state, county, "onePercentEstimates");

CREATE INDEX IF NOT EXISTS idx_merges_state_county_species
    ON merges (state, county, "observationDate")
    WHERE category IN ('species', 'issf', 'domestic');

CREATE INDEX IF NOT EXISTS idx_merges_state_county_localityid
    ON merges (state, county, "localityId");

CREATE INDEX IF NOT EXISTS idx_merges_localityid_date
    ON merges ("localityId", "observationDate");
