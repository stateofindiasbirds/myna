-- ============================================
-- Script: buildMynaPongView.sql
-- Purpose: Recreate materialized view "merge_pong"
--          Includes all taxa (not only species)
--          Excludes exotic codes 'P' and 'X'
--          Filters SoIB data to area = 'India'
--          Adds stable species-level uniqueValue (integer)
-- ============================================

DROP MATERIALIZED VIEW IF EXISTS "merge_pong" CASCADE;

CREATE MATERIALIZED VIEW "merge_pong" AS
WITH species_unique_ids AS (
    SELECT 
        DISTINCT split_part("SCIENTIFIC.NAME", ' ', 1) || ' ' || split_part("SCIENTIFIC.NAME", ' ', 2) AS species_name,
        ROW_NUMBER() OVER (
            ORDER BY MIN("TAXONOMIC.ORDER")
        ) AS unique_id
    FROM "TAXA"
    WHERE "CATEGORY" = 'species'
    GROUP BY split_part("SCIENTIFIC.NAME", ' ', 1) || ' ' || split_part("SCIENTIFIC.NAME", ' ', 2)
)
SELECT 
    t."CATEGORY" AS "category",
    s."Scientific Name" AS "scientificName",
    -- Make observationCount empty if it is 'X'
    CASE 
        WHEN o."OBSERVATION.COUNT" = 'X' THEN NULL
        ELSE o."OBSERVATION.COUNT"
    END AS "observationCount",
    l."STATE" AS "state",
    l."COUNTY" AS "county",
    l."LOCALITY" AS "locality",
    l."LOCALITY.ID" AS "localityId",
    l."LOCALITY.TYPE" AS "localityType",
    l."LATITUDE" AS "latitude",
    l."LONGITUDE" AS "longitude",
    st_setsrid(st_makepoint(l."LONGITUDE", l."LATITUDE"), 4326) AS geom, --Optimization possible, client can use geom
    TO_CHAR(ls."OBSERVATION.DATE", 'DD-MM-YYYY') AS "observationDate", --Optimization possible if client changes to native date
    CAST(ls."OBSERVATION.DATE" AS DATE) AS "samplingEventDate",
    ls."SAMPLING.EVENT.IDENTIFIER" AS "samplingEventIdentifier",
    ls."DURATION.MINUTES"::varchar AS "durationMinutes",
    ls."NUMBER.OBSERVERS"::varchar AS "numberObservers",
    (CASE WHEN ls."ALL.SPECIES.REPORTED" THEN '1' ELSE '0' END)::text AS "allSpeciesReported",
    CASE 
        WHEN NULLIF(ls."GROUP.IDENTIFIER", '') IS NOT NULL 
        THEN ls."GROUP.IDENTIFIER"
        ELSE ls."SAMPLING.EVENT.IDENTIFIER"
    END AS "groupIdentifier", --Optimization possible in client. They can directly use groupIdentifier
    ls."OBSERVER.ID" AS "observerId",
    t."COMMON.NAME" AS "eBirdEnglishName",
    t."SCIENTIFIC.NAME" AS "eBirdScientificName",
    s."SoIB 2023 Priority Status" AS "soibConcernStatus",
    CASE 
        WHEN s."Endemic to India" = TRUE THEN 'Yes'
        WHEN s."Endemic to India" = FALSE THEN 'No'
        ELSE NULL
    END AS "indiaEndemic",
    CASE 
        WHEN s."Endemicity" ILIKE 'Non-endemic%' THEN 'None'
        ELSE s."Endemicity"
    END AS "endemicRegion",
    s."Migratory Status within India" AS "migratoryStatusWithinIndia",
    s."English Name" AS "indiaChecklistCommonName",
    s."Scientific Name" AS "indiaChecklistScientificName",
    s."IUCN Category" AS "iucnCategory",
    s."WPA Schedule" AS "wpaSchedule",
    s."CITES Appendix" AS "citesAppendix",
    s."CMS Appendix" AS "cmsAppendix",
    s."1% Population Threshold"::varchar AS "onePercentEstimates",
    -- New compact species-level numeric ID
    su.unique_id AS "uniqueValue"
FROM "OBSERVATION" o
JOIN "TAXA" t 
    ON o."TAXONOMIC.ORDER" = t."TAXONOMIC.ORDER"
JOIN "LIST" ls 
    ON o."SAMPLING.EVENT.IDENTIFIER" = ls."SAMPLING.EVENT.IDENTIFIER"
JOIN "LOCATION" l 
    ON ls."LOCALITY.ID" = l."LOCALITY.ID"
LEFT JOIN (
    SELECT *
    FROM "soib"
    WHERE "area" = 'India'
) s
    ON s."Scientific Name" = t."SCIENTIFIC.NAME"
LEFT JOIN species_unique_ids su
    ON split_part(t."SCIENTIFIC.NAME", ' ', 1) || ' ' || split_part(t."SCIENTIFIC.NAME", ' ', 2) = su.species_name
WHERE COALESCE(o."EXOTIC.CODE", '') NOT IN ('P', 'X');
