-- ============================================
-- Script: buildMynaPongIndices.sql
-- Purpose: Create indexes for "merge_pong"
-- ============================================

CREATE INDEX IF NOT EXISTS idx_lat_lng_pong 
    ON merge_pong (latitude, longitude);

CREATE INDEX IF NOT EXISTS idx_spatial_location_pong 
    ON merge_pong USING gist (st_setsrid(st_makepoint(longitude, latitude), 4326));

CREATE INDEX IF NOT EXISTS idx_merges_geom_pong
    ON merge_pong USING gist (geom);

CREATE INDEX IF NOT EXISTS idx_county_pong 
    ON merge_pong (county);

CREATE INDEX IF NOT EXISTS idx_state_pong 
    ON merge_pong (state);

CREATE INDEX IF NOT EXISTS idx_locality_pong 
    ON merge_pong (locality);

CREATE INDEX IF NOT EXISTS idx_localityid_pong 
    ON merge_pong ("localityId");

CREATE INDEX IF NOT EXISTS idx_observationdate_pong 
    ON merge_pong ("observationDate");

CREATE INDEX IF NOT EXISTS idx_samplingeventidentifier_pong 
    ON merge_pong ("samplingEventIdentifier");

CREATE INDEX IF NOT EXISTS idx_groupidentifier_pong 
    ON merge_pong ("groupIdentifier");

CREATE INDEX IF NOT EXISTS idx_category_pong 
    ON merge_pong (category);

CREATE INDEX IF NOT EXISTS idx_ebirdscientificname_pong 
    ON merge_pong ("eBirdScientificName");

CREATE INDEX IF NOT EXISTS idx_indiachecklist_common_name_pong 
    ON merge_pong ("indiaChecklistCommonName");

CREATE INDEX IF NOT EXISTS idx_indiachecklist_scientific_name_pong 
    ON merge_pong ("indiaChecklistScientificName");

CREATE INDEX IF NOT EXISTS idx_soibconcernstatus_pong 
    ON merge_pong ("soibConcernStatus");

CREATE INDEX IF NOT EXISTS idx_iucncategory_pong 
    ON merge_pong ("iucnCategory");

CREATE INDEX IF NOT EXISTS idx_wpaschedule_pong 
    ON merge_pong ("wpaSchedule");

CREATE INDEX IF NOT EXISTS idx_citesappendix_pong 
    ON merge_pong ("citesAppendix");

CREATE INDEX IF NOT EXISTS idx_cmsappendix_pong 
    ON merge_pong ("cmsAppendix");

CREATE INDEX IF NOT EXISTS idx_migratory_status_pong 
    ON merge_pong ("migratoryStatusWithinIndia");

CREATE INDEX IF NOT EXISTS idx_unique_value_pong 
    ON merge_pong ("uniqueValue");

CREATE INDEX IF NOT EXISTS idx_merges_state_county_date_pong
    ON merge_pong (state, county, "observationDate");

CREATE INDEX IF NOT EXISTS idx_merges_state_county_iucn_pong
    ON merge_pong (state, county, "iucnCategory");

CREATE INDEX IF NOT EXISTS idx_merges_state_county_soib_pong
    ON merge_pong (state, county, "soibConcernStatus");

CREATE INDEX IF NOT EXISTS idx_merges_state_county_endemic_pong
    ON merge_pong (state, county, "endemicRegion");

CREATE INDEX IF NOT EXISTS idx_merges_state_county_migratory_pong
    ON merge_pong (state, county, "migratoryStatusWithinIndia");

CREATE INDEX IF NOT EXISTS idx_merges_state_county_locality_pong
    ON merge_pong (state, county, "localityId");

CREATE INDEX IF NOT EXISTS idx_merges_state_county_group_pong
    ON merge_pong (state, county, "groupIdentifier", "allSpeciesReported");

CREATE INDEX IF NOT EXISTS idx_merges_state_county_onepercent_pong
    ON merge_pong (state, county, "onePercentEstimates");

CREATE INDEX IF NOT EXISTS idx_merges_state_county_species_pong
    ON merge_pong (state, county, "observationDate")
    WHERE category IN ('species', 'issf', 'domestic');

CREATE INDEX IF NOT EXISTS idx_merges_state_county_localityid_pong
    ON merge_pong (state, county, "localityId");

CREATE INDEX IF NOT EXISTS idx_merges_localityid_date_pong
    ON merge_pong ("localityId", "observationDate");

CREATE INDEX IF NOT EXISTS idx_samplingeventdate_pong
    ON merge_pong ("samplingEventDate");