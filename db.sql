CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE user_image (
    id UUID DEFAULT uuid_generate_v1(),
    user_id VARCHAR NOT NULL,
    image_name VARCHAR NOT NULL,
    is_profile BOOLEAN,
    image_ext VARCHAR NOT NULL,
    image_mime_type VARCHAR NOT NULL,

    PRIMARY KEY (id)
);