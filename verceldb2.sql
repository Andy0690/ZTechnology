-- This script only contains the table creation statements and does not fully represent the table in the database. It's still missing: indices, triggers. Do not use it as a backup.

-- Table Definition
CREATE TABLE "public"."category_products" (
    "id" int4 NOT NULL,
    "name" varchar(255) NOT NULL,
    "discount_price" numeric(10,2),
    PRIMARY KEY ("id")
);

-- This script only contains the table creation statements and does not fully represent the table in the database. It's still missing: indices, triggers. Do not use it as a backup.

-- Table Definition
CREATE TABLE "public"."clients" (
    "id" int4 NOT NULL,
    "ident_document" int4,
    "number_document" int4,
    "first_name" varchar(50) DEFAULT NULL::character varying,
    "last_name" varchar(50) DEFAULT NULL::character varying,
    "email" varchar(50) DEFAULT NULL::character varying,
    PRIMARY KEY ("id")
);

-- This script only contains the table creation statements and does not fully represent the table in the database. It's still missing: indices, triggers. Do not use it as a backup.

-- Table Definition
CREATE TABLE "public"."products" (
    "id" int4 NOT NULL,
    "ref" varchar(255) NOT NULL,
    "name" varchar(255) NOT NULL,
    "brand" varchar(255) NOT NULL,
    "amount" int4 NOT NULL,
    "price" numeric(10,2) NOT NULL,
    "discount_price" numeric(10,2) NOT NULL,
    "category_product_id" int4,
    CONSTRAINT "products_category_product_id_fkey" FOREIGN KEY ("category_product_id") REFERENCES "public"."category_products"("id") ON DELETE CASCADE ON UPDATE CASCADE,
    PRIMARY KEY ("id")
);

-- This script only contains the table creation statements and does not fully represent the table in the database. It's still missing: indices, triggers. Do not use it as a backup.

-- Table Definition
CREATE TABLE "public"."quotes" (
    "id" int4 NOT NULL,
    "quotation_number" int4,
    PRIMARY KEY ("id")
);

-- This script only contains the table creation statements and does not fully represent the table in the database. It's still missing: indices, triggers. Do not use it as a backup.

-- Table Definition
CREATE TABLE "public"."quotes_details" (
    "id" int4 NOT NULL,
    "client_id" int4,
    "user_details_id" int4,
    "amount_product" int4,
    "quote_id" int4,
    "product_id" int4,
    CONSTRAINT "quotes_details_client_id_fkey" FOREIGN KEY ("client_id") REFERENCES "public"."clients"("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "quotes_details_quote_id_fkey" FOREIGN KEY ("quote_id") REFERENCES "public"."quotes"("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "quotes_details_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "public"."products"("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "quotes_details_user_details_id_fkey" FOREIGN KEY ("user_details_id") REFERENCES "public"."quotes_details"("id") ON DELETE CASCADE ON UPDATE CASCADE,
    PRIMARY KEY ("id")
);

-- This script only contains the table creation statements and does not fully represent the table in the database. It's still missing: indices, triggers. Do not use it as a backup.

-- Table Definition
CREATE TABLE "public"."roles" (
    "id" int4 NOT NULL,
    "name" varchar(225) NOT NULL,
    PRIMARY KEY ("id")
);

-- This script only contains the table creation statements and does not fully represent the table in the database. It's still missing: indices, triggers. Do not use it as a backup.

-- Table Definition
CREATE TABLE "public"."user_details" (
    "id" int4 NOT NULL,
    "user_id" int4 NOT NULL,
    "first_name" varchar(255),
    "last_name" varchar(255),
    "phone" varchar(255),
    "rol_id" int4,
    CONSTRAINT "user_details_rol_id_fkey" FOREIGN KEY ("rol_id") REFERENCES "public"."roles"("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "user_details_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE CASCADE ON UPDATE CASCADE,
    PRIMARY KEY ("id")
);

-- This script only contains the table creation statements and does not fully represent the table in the database. It's still missing: indices, triggers. Do not use it as a backup.

-- Table Definition
CREATE TABLE "public"."users" (
    "id" int4 NOT NULL,
    "email" varchar(255) NOT NULL,
    "password" varchar(255) NOT NULL,
    PRIMARY KEY ("id")
);

