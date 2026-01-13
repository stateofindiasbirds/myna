-- ============================================
-- Script: buildMynaPingIndices.sql
-- Purpose: Create indexes for "merge_ping"
-- ============================================

CREATE INDEX IF NOT EXISTS idx_lat_lng_ping 
    ON merge_ping (latitude, longitude);

CREATE INDEX IF NOT EXISTS idx_spatial_location_ping 
    ON merge_ping USING gist (st_setsrid(st_makepoint(longitude, latitude), 4326));

CREATE INDEX IF NOT EXISTS idx_merges_geom_ping
    ON merge_ping USING gist (geom);

CREATE INDEX IF NOT EXISTS idx_county_ping 
    ON merge_ping (county);

CREATE INDEX IF NOT EXISTS idx_state_ping 
    ON merge_ping (state);

CREATE INDEX IF NOT EXISTS idx_locality_ping 
    ON merge_ping (locality);

CREATE INDEX IF NOT EXISTS idx_localityid_ping 
    ON merge_ping ("localityId");

CREATE INDEX IF NOT EXISTS idx_observationdate_ping 
    ON merge_ping ("observationDate");

CREATE INDEX IF NOT EXISTS idx_samplingeventidentifier_ping 
    ON merge_ping ("samplingEventIdentifier");

CREATE INDEX IF NOT EXISTS idx_groupidentifier_ping 
    ON merge_ping ("groupIdentifier");

CREATE INDEX IF NOT EXISTS idx_category_ping 
    ON merge_ping (category);

CREATE INDEX IF NOT EXISTS idx_ebirdscientificname_ping 
    ON merge_ping ("eBirdScientificName");

CREATE INDEX IF NOT EXISTS idx_indiachecklist_common_name_ping 
    ON merge_ping ("indiaChecklistCommonName");

CREATE INDEX IF NOT EXISTS idx_indiachecklist_scientific_name_ping 
    ON merge_ping ("indiaChecklistScientificName");

CREATE INDEX IF NOT EXISTS idx_soibconcernstatus_ping 
    ON merge_ping ("soibConcernStatus");

CREATE INDEX IF NOT EXISTS idx_iucncategory_ping 
    ON merge_ping ("iucnCategory");

CREATE INDEX IF NOT EXISTS idx_wpaschedule_ping 
    ON merge_ping ("wpaSchedule");

CREATE INDEX IF NOT EXISTS idx_citesappendix_ping 
    ON merge_ping ("citesAppendix");

CREATE INDEX IF NOT EXISTS idx_cmsappendix_ping 
    ON merge_ping ("cmsAppendix");

CREATE INDEX IF NOT EXISTS idx_migratory_status_ping 
    ON merge_ping ("migratoryStatusWithinIndia");

CREATE INDEX IF NOT EXISTS idx_unique_value_ping 
    ON merge_ping ("uniqueValue");

CREATE INDEX IF NOT EXISTS idx_merges_state_county_date_ping
    ON merge_ping (state, county, "observationDate");

CREATE INDEX IF NOT EXISTS idx_merges_state_county_iucn_ping
    ON merge_ping (state, county, "iucnCategory");

CREATE INDEX IF NOT EXISTS idx_merges_state_county_soib_ping
    ON merge_ping (state, county, "soibConcernStatus");

CREATE INDEX IF NOT EXISTS idx_merges_state_county_endemic_ping
    ON merge_ping (state, county, "endemicRegion");

CREATE INDEX IF NOT EXISTS idx_merges_state_county_migratory_ping
    ON merge_ping (state, county, "migratoryStatusWithinIndia");

CREATE INDEX IF NOT EXISTS idx_merges_state_county_locality_ping
    ON merge_ping (state, county, "localityId");

CREATE INDEX IF NOT EXISTS idx_merges_state_county_group_ping
    ON merge_ping (state, county, "groupIdentifier", "allSpeciesReported");

CREATE INDEX IF NOT EXISTS idx_merges_state_county_onepercent_ping
    ON merge_ping (state, county, "onePercentEstimates");

CREATE INDEX IF NOT EXISTS idx_merges_state_county_species_ping
    ON merge_ping (state, county, "observationDate")
    WHERE category IN ('species', 'issf', 'domestic');

CREATE INDEX IF NOT EXISTS idx_merges_state_county_localityid_ping
    ON merge_ping (state, county, "localityId");

CREATE INDEX IF NOT EXISTS idx_merges_localityid_date_ping
    ON merge_ping ("localityId", "observationDate");

CREATE INDEX IF NOT EXISTS idx_samplingeventdate_ping
    ON merge_ping ("samplingEventDate");