PGDMP                         {            customad    15.3    15.3 %               0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false                       0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false                       0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false                       1262    16398    customad    DATABASE        CREATE DATABASE customad WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'English_Singapore.1252';
    DROP DATABASE customad;
                postgres    false            �            1259    16428 
   user_video    TABLE     �   CREATE TABLE public.user_video (
    user_video_id bigint NOT NULL,
    user_id bigint NOT NULL,
    video_id bigint NOT NULL,
    ordinal_position smallint,
    is_customisable boolean DEFAULT true NOT NULL
);
    DROP TABLE public.user_video;
       public         heap    postgres    false            �            1259    16426    user_video_user_id_seq    SEQUENCE        CREATE SEQUENCE public.user_video_user_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 -   DROP SEQUENCE public.user_video_user_id_seq;
       public          postgres    false    221                       0    0    user_video_user_id_seq    SEQUENCE OWNED BY     Q   ALTER SEQUENCE public.user_video_user_id_seq OWNED BY public.user_video.user_id;
          public          postgres    false    219            �            1259    16425    user_video_user_video_id_seq    SEQUENCE     �   CREATE SEQUENCE public.user_video_user_video_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 3   DROP SEQUENCE public.user_video_user_video_id_seq;
       public          postgres    false    221                        0    0    user_video_user_video_id_seq    SEQUENCE OWNED BY     ]   ALTER SEQUENCE public.user_video_user_video_id_seq OWNED BY public.user_video.user_video_id;
          public          postgres    false    218            �            1259    16427    user_video_video_id_seq    SEQUENCE     �   CREATE SEQUENCE public.user_video_video_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 .   DROP SEQUENCE public.user_video_video_id_seq;
       public          postgres    false    221            !           0    0    user_video_video_id_seq    SEQUENCE OWNED BY     S   ALTER SEQUENCE public.user_video_video_id_seq OWNED BY public.user_video.video_id;
          public          postgres    false    220            �            1259    16400    users    TABLE     �   CREATE TABLE public.users (
    user_id bigint NOT NULL,
    username character varying NOT NULL,
    password character varying NOT NULL,
    display_name character varying
);
    DROP TABLE public.users;
       public         heap    postgres    false            �            1259    16403    users_user_id_seq    SEQUENCE     z   CREATE SEQUENCE public.users_user_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 (   DROP SEQUENCE public.users_user_id_seq;
       public          postgres    false    214            "           0    0    users_user_id_seq    SEQUENCE OWNED BY     G   ALTER SEQUENCE public.users_user_id_seq OWNED BY public.users.user_id;
          public          postgres    false    215            �            1259    16415    videos    TABLE     �   CREATE TABLE public.videos (
    video_id bigint NOT NULL,
    filename character varying NOT NULL,
    display_name character varying,
    gap_end_times numeric[]
);
    DROP TABLE public.videos;
       public         heap    postgres    false            �            1259    16414    videos_video_id_seq    SEQUENCE     |   CREATE SEQUENCE public.videos_video_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 *   DROP SEQUENCE public.videos_video_id_seq;
       public          postgres    false    217            #           0    0    videos_video_id_seq    SEQUENCE OWNED BY     K   ALTER SEQUENCE public.videos_video_id_seq OWNED BY public.videos.video_id;
          public          postgres    false    216            s           2604    16431    user_video user_video_id    DEFAULT     �   ALTER TABLE ONLY public.user_video ALTER COLUMN user_video_id SET DEFAULT nextval('public.user_video_user_video_id_seq'::regclass);
 G   ALTER TABLE public.user_video ALTER COLUMN user_video_id DROP DEFAULT;
       public          postgres    false    221    218    221            t           2604    16432    user_video user_id    DEFAULT     x   ALTER TABLE ONLY public.user_video ALTER COLUMN user_id SET DEFAULT nextval('public.user_video_user_id_seq'::regclass);
 A   ALTER TABLE public.user_video ALTER COLUMN user_id DROP DEFAULT;
       public          postgres    false    221    219    221            u           2604    16433    user_video video_id    DEFAULT     z   ALTER TABLE ONLY public.user_video ALTER COLUMN video_id SET DEFAULT nextval('public.user_video_video_id_seq'::regclass);
 B   ALTER TABLE public.user_video ALTER COLUMN video_id DROP DEFAULT;
       public          postgres    false    220    221    221            q           2604    16404    users user_id    DEFAULT     n   ALTER TABLE ONLY public.users ALTER COLUMN user_id SET DEFAULT nextval('public.users_user_id_seq'::regclass);
 <   ALTER TABLE public.users ALTER COLUMN user_id DROP DEFAULT;
       public          postgres    false    215    214            r           2604    16418    videos video_id    DEFAULT     r   ALTER TABLE ONLY public.videos ALTER COLUMN video_id SET DEFAULT nextval('public.videos_video_id_seq'::regclass);
 >   ALTER TABLE public.videos ALTER COLUMN video_id DROP DEFAULT;
       public          postgres    false    217    216    217                      0    16428 
   user_video 
   TABLE DATA           i   COPY public.user_video (user_video_id, user_id, video_id, ordinal_position, is_customisable) FROM stdin;
    public          postgres    false    221   5)                 0    16400    users 
   TABLE DATA           J   COPY public.users (user_id, username, password, display_name) FROM stdin;
    public          postgres    false    214   �)                 0    16415    videos 
   TABLE DATA           Q   COPY public.videos (video_id, filename, display_name, gap_end_times) FROM stdin;
    public          postgres    false    217   �)       $           0    0    user_video_user_id_seq    SEQUENCE SET     D   SELECT pg_catalog.setval('public.user_video_user_id_seq', 1, true);
          public          postgres    false    219            %           0    0    user_video_user_video_id_seq    SEQUENCE SET     J   SELECT pg_catalog.setval('public.user_video_user_video_id_seq', 1, true);
          public          postgres    false    218            &           0    0    user_video_video_id_seq    SEQUENCE SET     E   SELECT pg_catalog.setval('public.user_video_video_id_seq', 1, true);
          public          postgres    false    220            '           0    0    users_user_id_seq    SEQUENCE SET     ?   SELECT pg_catalog.setval('public.users_user_id_seq', 1, true);
          public          postgres    false    215            (           0    0    videos_video_id_seq    SEQUENCE SET     B   SELECT pg_catalog.setval('public.videos_video_id_seq', 1, false);
          public          postgres    false    216            �           2606    16435    user_video user_video_pkey 
   CONSTRAINT     c   ALTER TABLE ONLY public.user_video
    ADD CONSTRAINT user_video_pkey PRIMARY KEY (user_video_id);
 D   ALTER TABLE ONLY public.user_video DROP CONSTRAINT user_video_pkey;
       public            postgres    false    221            x           2606    16413    users users_pkey 
   CONSTRAINT     S   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (user_id);
 :   ALTER TABLE ONLY public.users DROP CONSTRAINT users_pkey;
       public            postgres    false    214            z           2606    16411    users users_username_key 
   CONSTRAINT     W   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_username_key UNIQUE (username);
 B   ALTER TABLE ONLY public.users DROP CONSTRAINT users_username_key;
       public            postgres    false    214            |           2606    16424    videos videos_name_key 
   CONSTRAINT     U   ALTER TABLE ONLY public.videos
    ADD CONSTRAINT videos_name_key UNIQUE (filename);
 @   ALTER TABLE ONLY public.videos DROP CONSTRAINT videos_name_key;
       public            postgres    false    217            ~           2606    16422    videos videos_pkey 
   CONSTRAINT     V   ALTER TABLE ONLY public.videos
    ADD CONSTRAINT videos_pkey PRIMARY KEY (video_id);
 <   ALTER TABLE ONLY public.videos DROP CONSTRAINT videos_pkey;
       public            postgres    false    217            �           2606    16436 "   user_video user_video_user_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.user_video
    ADD CONSTRAINT user_video_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(user_id);
 L   ALTER TABLE ONLY public.user_video DROP CONSTRAINT user_video_user_id_fkey;
       public          postgres    false    214    221    3192            �           2606    16441 #   user_video user_video_video_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.user_video
    ADD CONSTRAINT user_video_video_id_fkey FOREIGN KEY (video_id) REFERENCES public.videos(video_id);
 M   ALTER TABLE ONLY public.user_video DROP CONSTRAINT user_video_video_id_fkey;
       public          postgres    false    3198    221    217               ;   x�ƹ !��[�}�!�
�ak�98��3W��Zl��a�&�ȍϚm�z��=�H�         `   x�3�,�/��T1JR14PI�H7+.�*w��N�++��β,4��)�7N�ptr6���M�H�3�0�5+u�s�Lկ��������X��������� ��         h   x�3�L�3��".c ��6�L�0���wt�
����8KJK`Z�A�^CΒ���C�������Ymh�g�cl�g�cb$�@,sS aa�gP����� ��"�     