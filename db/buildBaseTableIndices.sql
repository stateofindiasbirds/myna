-- Base table indices
CREATE INDEX idx_observation_taxonomic_order
    ON "OBSERVATION" ("TAXONOMIC.ORDER");

CREATE INDEX idx_observation_sampling_event_identifier
    ON "OBSERVATION" ("SAMPLING.EVENT.IDENTIFIER");

CREATE INDEX idx_observation_exotic_code
    ON "OBSERVATION" ("EXOTIC.CODE");

CREATE INDEX idx_taxa_taxonomic_order
    ON "TAXA" ("TAXONOMIC.ORDER");

CREATE INDEX idx_taxa_scientific_name
    ON "TAXA" ("SCIENTIFIC.NAME");

CREATE INDEX idx_taxa_category
    ON "TAXA" ("CATEGORY");

CREATE INDEX idx_list_sampling_event_identifier
    ON "LIST" ("SAMPLING.EVENT.IDENTIFIER");

CREATE INDEX idx_list_locality_id
    ON "LIST" ("LOCALITY.ID");

CREATE INDEX idx_location_locality_id
    ON "LOCATION" ("LOCALITY.ID");

CREATE INDEX idx_location_state
    ON "LOCATION" ("STATE");

CREATE INDEX idx_location_county
    ON "LOCATION" ("COUNTY");

CREATE INDEX idx_soib_scientific_name
    ON "soib" ("Scientific Name");
