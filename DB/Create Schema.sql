CREATE TABLE "Products"(
    "id" BIGINT NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "img" VARCHAR(255) NOT NULL,
    "description" VARCHAR(255) NULL,
    "price" DECIMAL(8, 2) NOT NULL,
    "stock" BIGINT NOT NULL,
    "filters" JSON NULL
);
ALTER TABLE
    "Products" ADD PRIMARY KEY("id");
CREATE TABLE "Orders"(
    "id" BIGINT NOT NULL,
    "pre-order" jsonb NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "surname" VARCHAR(255) NOT NULL,
    "postalCode" VARCHAR(255) NOT NULL,
    "phoneNum" VARCHAR(255) NOT NULL,
    "adress" JSON NOT NULL
);
ALTER TABLE
    "Orders" ADD PRIMARY KEY("id");
ALTER TABLE
    "Orders" ADD CONSTRAINT "orders_pre_order_unique" UNIQUE("pre-order");
CREATE TABLE "Validation"(
    "id" BIGINT NOT NULL,
    "use" VARCHAR(255) NOT NULL,
    "pass" VARCHAR(255) NOT NULL
);
ALTER TABLE
    "Validation" ADD PRIMARY KEY("id");