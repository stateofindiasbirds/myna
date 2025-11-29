-- ============================================
-- Index creation for materialized view "merges"
-- Using CONCURRENTLY for non-blocking operation
-- ============================================

-- Spatial & general indexes
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_lat_lng 
    ON merges (latitude, longitude);

CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_spatial_location 
    ON merges USING gist (st_setsrid(st_makepoint(longitude, latitude), 4326));

-- Common lookup indexes
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_county 
    ON merges (county);

CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_state 
    ON merges (state);

CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_locality 
    ON merges (locality);

CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_localityid 
    ON merges ("localityId");

CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_observationdate 
    ON merges ("observationDate");

CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_samplingeventidentifier 
    ON merges ("samplingEventIdentifier");

CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_groupidentifier 
    ON merges ("groupIdentifier");

CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_category 
    ON merges (category);

-- Taxon-specific indexes
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_ebirdscientificname 
    ON merges ("eBirdScientificName");

CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_indiachecklist_common_name 
    ON merges ("indiaChecklistCommonName");

CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_indiachecklist_scientific_name 
    ON merges ("indiaChecklistScientificName");

CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_soibconcernstatus 
    ON merges ("soibConcernStatus");

-- Conservation fields
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_iucncategory 
    ON merges ("iucnCategory");

CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_wpaschedule 
    ON merges ("wpaSchedule");

CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_citesappendix 
    ON merges ("citesAppendix");

CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_cmsappendix 
    ON merges ("cmsAppendix");

-- Migratory, unique value, etc.
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_migratory_status 
    ON merges ("migratoryStatusWithinIndia");

CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_unique_value 
    ON merges ("uniqueValue");
