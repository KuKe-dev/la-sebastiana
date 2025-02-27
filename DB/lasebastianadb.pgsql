--
-- PostgreSQL database dump
--

-- Dumped from database version 17.3
-- Dumped by pg_dump version 17.3

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: Orders; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Orders" (
    id bigint NOT NULL,
    "pre-order" jsonb NOT NULL,
    name character varying(255) NOT NULL,
    surname character varying(255) NOT NULL,
    "postalCode" character varying(255) NOT NULL,
    "phoneNum" character varying(255) NOT NULL,
    adress json NOT NULL
);


ALTER TABLE public."Orders" OWNER TO postgres;

--
-- Name: Products; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Products" (
    id bigint NOT NULL,
    name character varying(255) NOT NULL,
    img character varying(255) NOT NULL,
    description character varying(255),
    price numeric(20,2) NOT NULL,
    stock bigint NOT NULL,
    filters jsonb
);


ALTER TABLE public."Products" OWNER TO postgres;

--
-- Name: Validation; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Validation" (
    id bigint NOT NULL,
    use character varying(255) NOT NULL,
    pass character varying(255) NOT NULL
);


ALTER TABLE public."Validation" OWNER TO postgres;

--
-- Name: products_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.products_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.products_id_seq OWNER TO postgres;

--
-- Name: products_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.products_id_seq OWNED BY public."Products".id;


--
-- Name: products_img_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.products_img_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.products_img_seq OWNER TO postgres;

--
-- Name: products_img_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.products_img_seq OWNED BY public."Products".img;


--
-- Name: Products id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Products" ALTER COLUMN id SET DEFAULT nextval('public.products_id_seq'::regclass);


--
-- Name: Products img; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Products" ALTER COLUMN img SET DEFAULT nextval('public.products_img_seq'::regclass);


--
-- Data for Name: Orders; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Orders" (id, "pre-order", name, surname, "postalCode", "phoneNum", adress) FROM stdin;
\.


--
-- Data for Name: Products; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Products" (id, name, img, description, price, stock, filters) FROM stdin;
30	aaa	30	aaa	123.00	321	"{\\"categories\\":[\\"dym\\"],\\"materials\\":[\\"ceramica\\"]}"
31	bbb	31	bbb	312.00	123	"{\\"categories\\":[\\"deco\\"],\\"materials\\":[\\"madera\\"]}"
\.


--
-- Data for Name: Validation; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Validation" (id, use, pass) FROM stdin;
1	Picky	$2a$10$JIwTSdU2gelbgL3sAsAe5eS.TcygBehNAANRC9QRZ545mDVcPQdz.
\.


--
-- Name: products_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.products_id_seq', 34, true);


--
-- Name: products_img_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.products_img_seq', 34, true);


--
-- Name: Orders Orders_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Orders"
    ADD CONSTRAINT "Orders_pkey" PRIMARY KEY (id);


--
-- Name: Products Products_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Products"
    ADD CONSTRAINT "Products_pkey" PRIMARY KEY (id);


--
-- Name: Validation Validation_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Validation"
    ADD CONSTRAINT "Validation_pkey" PRIMARY KEY (id);


--
-- Name: Products id; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Products"
    ADD CONSTRAINT id UNIQUE (id) INCLUDE (id);


--
-- Name: Products img; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Products"
    ADD CONSTRAINT img UNIQUE (img) INCLUDE (img);


--
-- Name: Orders orders_pre_order_unique; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Orders"
    ADD CONSTRAINT orders_pre_order_unique UNIQUE ("pre-order");


--
-- PostgreSQL database dump complete
--

