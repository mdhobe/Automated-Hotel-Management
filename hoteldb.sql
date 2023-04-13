PGDMP     2                    y            hoteldb    13.2    13.2     �           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            �           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            �           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            �           1262    41089    hoteldb    DATABASE     c   CREATE DATABASE hoteldb WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE = 'English_India.1252';
    DROP DATABASE hoteldb;
                postgres    false                        3079    41090 	   adminpack 	   EXTENSION     A   CREATE EXTENSION IF NOT EXISTS adminpack WITH SCHEMA pg_catalog;
    DROP EXTENSION adminpack;
                   false            �           0    0    EXTENSION adminpack    COMMENT     M   COMMENT ON EXTENSION adminpack IS 'administrative functions for PostgreSQL';
                        false    2            �            1259    41100    chef    TABLE     �  CREATE TABLE public.chef (
    uuid character varying NOT NULL,
    username character varying NOT NULL,
    chefname character varying NOT NULL,
    password character varying NOT NULL,
    phone character varying NOT NULL,
    email character varying,
    dateofjoining character varying,
    address character varying,
    cheftitle character varying,
    available character varying
);
    DROP TABLE public.chef;
       public         heap    postgres    false            �            1259    41106 	   fooditems    TABLE     �   CREATE TABLE public.fooditems (
    id integer NOT NULL,
    name character varying NOT NULL,
    description character varying,
    available boolean NOT NULL,
    price integer NOT NULL,
    category character varying
);
    DROP TABLE public.fooditems;
       public         heap    postgres    false            �            1259    41112    fooditems_fooditem_seq    SEQUENCE     �   ALTER TABLE public.fooditems ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.fooditems_fooditem_seq
    START WITH 1000
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    202            �            1259    41114    hotel    TABLE     �   CREATE TABLE public.hotel (
    uuid character varying NOT NULL,
    username character varying NOT NULL,
    password character varying NOT NULL,
    hotelname character varying NOT NULL,
    phone character varying NOT NULL
);
    DROP TABLE public.hotel;
       public         heap    postgres    false            �            1259    41120    magementtajmumbai    TABLE     �  CREATE TABLE public.magementtajmumbai (
    uuid character varying NOT NULL,
    username character varying NOT NULL,
    password character varying NOT NULL,
    phone character varying NOT NULL,
    title character varying NOT NULL,
    authorityname character varying NOT NULL,
    dateofjoining character varying,
    email character varying,
    address character varying,
    leave character varying NOT NULL
);
 %   DROP TABLE public.magementtajmumbai;
       public         heap    postgres    false            �            1259    41126    stock    TABLE       CREATE TABLE public.stock (
    itemname character varying NOT NULL,
    lastfilleddate character varying NOT NULL,
    brand character varying NOT NULL,
    price integer NOT NULL,
    weight integer NOT NULL,
    quantityremain integer NOT NULL,
    itemid integer NOT NULL
);
    DROP TABLE public.stock;
       public         heap    postgres    false            �            1259    41132    stock_itemid_seq    SEQUENCE     �   ALTER TABLE public.stock ALTER COLUMN itemid ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.stock_itemid_seq
    START WITH 1000
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    206            �            1259    41134 	   tajmumbai    TABLE     �  CREATE TABLE public.tajmumbai (
    billnumber character varying NOT NULL,
    customername character varying NOT NULL,
    customerphone character varying NOT NULL,
    customeremail character varying,
    chefname character varying NOT NULL,
    orderlist json NOT NULL,
    total character varying NOT NULL,
    id bigint NOT NULL,
    chefidassigned character varying NOT NULL,
    tablenumber character varying NOT NULL,
    status character varying NOT NULL,
    parent character varying
);
    DROP TABLE public.tajmumbai;
       public         heap    postgres    false            �            1259    41140    tajmumbai_id_seq    SEQUENCE     �   ALTER TABLE public.tajmumbai ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.tajmumbai_id_seq
    START WITH 1000
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    208            �          0    41100    chef 
   TABLE DATA           ~   COPY public.chef (uuid, username, chefname, password, phone, email, dateofjoining, address, cheftitle, available) FROM stdin;
    public          postgres    false    201   �#       �          0    41106 	   fooditems 
   TABLE DATA           V   COPY public.fooditems (id, name, description, available, price, category) FROM stdin;
    public          postgres    false    202   n%       �          0    41114    hotel 
   TABLE DATA           K   COPY public.hotel (uuid, username, password, hotelname, phone) FROM stdin;
    public          postgres    false    204   �+       �          0    41120    magementtajmumbai 
   TABLE DATA           �   COPY public.magementtajmumbai (uuid, username, password, phone, title, authorityname, dateofjoining, email, address, leave) FROM stdin;
    public          postgres    false    205   -       �          0    41126    stock 
   TABLE DATA           g   COPY public.stock (itemname, lastfilleddate, brand, price, weight, quantityremain, itemid) FROM stdin;
    public          postgres    false    206   1       �          0    41134 	   tajmumbai 
   TABLE DATA           �   COPY public.tajmumbai (billnumber, customername, customerphone, customeremail, chefname, orderlist, total, id, chefidassigned, tablenumber, status, parent) FROM stdin;
    public          postgres    false    208   3       �           0    0    fooditems_fooditem_seq    SEQUENCE SET     G   SELECT pg_catalog.setval('public.fooditems_fooditem_seq', 1004, true);
          public          postgres    false    203            �           0    0    stock_itemid_seq    SEQUENCE SET     A   SELECT pg_catalog.setval('public.stock_itemid_seq', 1020, true);
          public          postgres    false    207            �           0    0    tajmumbai_id_seq    SEQUENCE SET     A   SELECT pg_catalog.setval('public.tajmumbai_id_seq', 1252, true);
          public          postgres    false    209            B           2606    41143    chef cheftajmumbai_pkey 
   CONSTRAINT     a   ALTER TABLE ONLY public.chef
    ADD CONSTRAINT cheftajmumbai_pkey PRIMARY KEY (uuid, username);
 A   ALTER TABLE ONLY public.chef DROP CONSTRAINT cheftajmumbai_pkey;
       public            postgres    false    201    201            D           2606    41145    hotel hotel_pkey 
   CONSTRAINT     Z   ALTER TABLE ONLY public.hotel
    ADD CONSTRAINT hotel_pkey PRIMARY KEY (uuid, username);
 :   ALTER TABLE ONLY public.hotel DROP CONSTRAINT hotel_pkey;
       public            postgres    false    204    204            F           2606    41147 (   magementtajmumbai magementtajmumbai_pkey 
   CONSTRAINT     r   ALTER TABLE ONLY public.magementtajmumbai
    ADD CONSTRAINT magementtajmumbai_pkey PRIMARY KEY (uuid, username);
 R   ALTER TABLE ONLY public.magementtajmumbai DROP CONSTRAINT magementtajmumbai_pkey;
       public            postgres    false    205    205            H           2606    41149    stock stock_pkey 
   CONSTRAINT     R   ALTER TABLE ONLY public.stock
    ADD CONSTRAINT stock_pkey PRIMARY KEY (itemid);
 :   ALTER TABLE ONLY public.stock DROP CONSTRAINT stock_pkey;
       public            postgres    false    206            J           2606    41151    tajmumbai tajmumbai_pkey 
   CONSTRAINT     V   ALTER TABLE ONLY public.tajmumbai
    ADD CONSTRAINT tajmumbai_pkey PRIMARY KEY (id);
 B   ALTER TABLE ONLY public.tajmumbai DROP CONSTRAINT tajmumbai_pkey;
       public            postgres    false    208            �   �  x����n�0���S��`���[Ӥ�p1�S/�E[�%��-�ӗ��D
��eg$>�����+4:��))И�K!�c�=\�?�����(��ou�rd���h��?�;ۻm�PK�K��6C���R��Ku��Mȑ��S���&G�Є;�!,P���THd����M�LY�OC��.z�\F�8�3�"��͝a�\"L�X�U:m���o�6�ӥ⏍��G���Ag�B%� P"��.�\9Ъ��8C���o!��{J�m&�?O�v��=��]̨A.ALԪ�؞�k������߀CS�g��A�b���Z��t�dTx�C4RK�l������Ƒ�_�=�k�5�]�.���:���[J�&NQ=��z�T��T`����E
A�r�$%b��$�J�YWzwl���tʞ������w�����v����C�����~�[,� �C      �   t  x��W�v�6]�_�UV��䷗��U��XnW�I�DV�?�w��z�d��"�tc� p1sg��h6���{�dHΩ�J�*�-�V��N:K>��o2ؾ��Z�F�N��b��`�J�4u�r��tW;Ui�?�� N�b����l:=�!
bn�dЫ���  T �eC�6>��P�ؕ�Fz����s
��|�b����\����KO�T	����W����}�K��=��SյVr���I\G���)�ȭ���&���ҧCO�[�E��W�^��l���^,Z�,T�C}��־���)�#^^�Φۘ�ZO#�=�EC�P:nJ[�.�-Ň�W���hA �.������L|�Պ���VL�z��-��]^����Xf.r(�~"�x��c��icpf��k�:rbd����w"}�ƃ5Ϻ��e?�e���2�A?� �~�[D�}��S�)j�m����GVz^����j�K�9��ْT;��K�N�(@ȧ�5u���k�ק���a���M|�+Pr��K����|'Q���<f\B�n:���s1�N!5�w���eIH_���� P��ġ�M����d��j��b��6W̺�F��P������5���@������Z� ~R&]������j���*3X��5/�ح���2��6�.��p��w�w��N]%��6�_iqcۂ��P�%�d���Zs|i�;�� �j���ہA����,E9���x`�AT2�Pd���H3?��x3��	Z��EO��mK�f������b����n�&c���z�DX ��'S�p|ʙx��9N�uh4�C����7�NOvx'�7*ˆ[��.4H�h���6�s�sW��Y�1���֢p	O�&7��	|���m���Z ��H�E�#�k��i[j����L|D�
���؉�._�V*$�[mVG� ��ղP�9��)n@�U�Q�\< mS^g"	���9x^��=�o�����C�aA��]�y�r��łM��.��V�([<$q�Q�v�o�kDq"��Uxʻэ�l��u4ДE�ʦQer���
;��=o�������W�&9tWW�7]�/dT���%�B�ˉ��FH���
���IvHo�G'y�x��~��ג���5R!!�2��l�0#�Ν
$�CYCFӵ��P�ޮy�����N�*K8���g�d&>*�"�����x�F��	�%��(�X�(���	#g��'���ƖIR�bU+��(�z�f�Ȯ�U4\������Q^`��R��"�zٜ�6r��9s��-� m���ޖ�@ڈ�-���B�t�yɛ���3��Tu<oxx�Q��7�w6r����HhT��g,������t*n8i���m�i��ꈅ6$����t�t�ğ���#�$:��mJs~���S�"%&�s`ėt�nJR��F
(�
T�l�2ld�q�։v�����;ؚ�M�?����#i�����>����N�;w,>���{�F�=�fg�#�N���.�^{q�� ���c����Ϗ�Fc�n-!�
����)��U���h(�<����Vc���&}���� �J�R�n)q��2��4f���+͞�}�i�rگ�S��N���r��x�S��U�+y>?}������Q[      �     x�]��N1E�ݯ�/@3�y�D� 	E�4F�B�}D�����&*�;���H�R�Rr34dN�N�ޜ�a�yGo��=M��w/�RbQ���T�A$<��H(!�D0CBj�Ӱ���2�?�x��u	ը�!еW��'BQ
T
������ܛ�\�X�/��^�[-|3oj/�Q���u���S��R]��1կa��<�����{nʶ{�Э�܄V/6h	�''�����U��������!��y�����K�k��c�Y�TMq����m�oOpy�      �   �  x��V�n�F}��� ;����	4��"
�ԗ����bP��}u��r��4���1{-�:���b뜱J�a�q��`���n��g���d��"�~��f�[��e̯C6�˾ ��	 �Č���o�:�Շe[gz�(��2�vY����S���ΛU�rz��oB9SBe��.nc��K!�����;C�xA�[[	YJ�ٶ��]�-�M1���ЕL"��؅j��8������'�	}5�;V�~={+$�4B8c�7�V�9KZ8o�-�,4��е]H�4�m��C�ʯ�=\�<�~x>?�Ȳ;z0I�������+�{��Hص�km�@�HBv�*�]V#\��U���Ju��c��+�f ~}��	�c�Y$�	u{���a�|�����q�H[O�b8T>�����)��du�M�)��Bw���]��=<��fD'F��x�����Vū��b����+-�i/�Ь��Hx$K���q�2���6��0~$����G���qp���9B��&F��W�9Mh�����ݎPU^[����"�g�\w��AJܸl�����Ϊ��zh�V]*�8�$���*�Fwd�y&"#�%ﲮ���uH��3���y�K�V~��`ft��<�%)P>�8^N��19�.l�2(��B���|~������=
�IPU�+�yd�&+�tR���#gw��/�ه����|��̯z(�����w�h���g���	���^X�%V��7�2��bt�a��/|�Q�]�6�˖^�$����H|�_jiɆ�4x��=[[��m��.ǥ���wv�7˶ߑ�R^=.�x&YI�GK�W�Ј��F�b균D�i�$���bt�J<.)l�E\T����a�??@�=�r��yGw�F�-3��/���W�g�77�YE�E�W��삡��v�D"��EĜ��s*h&����,_�C�)VE��F88�����1nP˫o�щ�B�8��������t��ɏ���;�AO���x��χ�d�/�`n�      �   �  x�mS�n�@=W}E��G�x=&(�Ha�\r��6n����=��Ӌ!$���߫W�?��#�&�!��vz��&waO�rd�s���BӠ}J��<��kJ�Ppu���6L��|��R&�X����}��� �&�+�%�:c�	�*�q�� �d�Wx��2Qw��^跶, �i�w�Ը�Vk��+����j��4��Ȟ�q�~bS�1D|4�����7r��ҩ�K索C9y0'8n��j.�e�Q�ٯ�������gOm;XQ-�Te�I\�s���M-@����|��=�)�^�x��X|��$+c����ִv��Skߵ?Q�B���D���]�3��k�vP��
�af�č��A�Y��v� x�G,*ܐ�A��||�'@5w���SW����`o����G�[c?@��Նe�3�%�_�����0{���;���/��2�'�B��5����s2��NT��=���F��������Qqf*]��@�|%�      �      x��][oG�~��וu���:�I�dq��b3m�iQ����q��sN���tK]�n�;�$-R���{�:E��Xn�%v�z��I��W�����.��L�٭��������MV�\nog����~9�X��]2�����j�{������Mr�x����}���%|�����d����>����f�����~��V��uj����H6���D/���d�>��x��d���?n�����
�>������e2�����Ƌ��W�%������������~���_��嫔<��)��?��)�f�ό
a%�(b,#��)�RKõ`�B��Q"fw��jF�YI,��3���R��!<_-v����w�O�h��ruy��̕����>����
JaC�
x�'77�����j���z'eG�*�|_�\�ޮםoGx����p�������#/��H8�0�b�g�h*�PD3E��hrc��*.�5J̄$��rT��T�4%TR�� Go�����n;���Te�M�Y,v�_V(�'�^{7+�-j�(�e)��������z��j��e��V�^��''���_���v�[�3�x�P�#�VN,A�ʥ��Kr�+r�Kbf߸T�2}�\~��Z~J>%7��d�^ɪ�\o��-�d����x�
��d����>�u��="��y���t0A� ���a!<�\kB�ZjBgu3Qw7�X�-�_x�\}9����_nV�'k�D+	o�dv�~��?���K�['s� �7�j8��k���U���bs���[y���8�Kj��63&�!����K+.	 K��hC4�Ei�K�r�M�Y�E�m���X|���܁����빿ۭ����Vs���r��Z}�}kWq�� IWVkA�8X$���dZc�e�9�S>rv�!�b����B>J����$s�$�GD=)�)���L�����d�c�ov�A������Lg^?��[���S��K%G,��%qX������`��
����h����s�2�a�r�D��o�%��.BC��T�j\�S��^[S����yFFa��)��iz�{s���p�
|_��7�?�H���c]�P�2ig�L�0�0��˧���E.?���d�\P꣠tq����b\M+Ŋ �g��y�;jU(%��R�R�)����?'�؎áC�j^����: ;��:@/5�LUcܫ`I��b����3&���:s�HƏ��p�u���b!��nf�8Rd�L~?�O�be�F�6����:����K=e(��V�
ʬ�Yޅ	n�U������k�==�뗛�󗠉WC�$�,����Ӆte��c�JnC���,�9�R�ja�{��d��e���Q	_&�/B�� �^.��s�^,<&h8���@�2��A C���A�'�삆ϖk-V����e%R,x6	�I����aA�Z�fhP3G�S�[�����0��W�x.!8�ٽ����|\��߮6��A�p���v��!�z�\e8��J�8W�0�i��&�r�%�Z�|���i�
F��DF��	�l��+��d奨�αx���m�}���&��˻�5f2���֍�(�������l��r���pu��^E���ƅT*ܴ��?���=�H�q{�����,����,�R�p&5�闒KJf�V�������r5��H�w�+����i=Q��3���K���%� 9Ğ�LJ��(cɜ���s	~X엘2οK������{�!��~�e>��֛�V�Z�X��������˛=��K���J֊b����}ǻ�*� M����y'�JH%�$�-a�����$���`~��\�a˶jB��6dRy�,��m���~��	�&��5҃|:�����u�Zw�$�k.Ze���[�
NN͇��GB�#>��R<�K/�T��6xӤ�y	h�Ռ��,7��J1�%܎u��$��ۢ�7Gzm]�����u�n�Cr���p�(J2R�4Am�dELV |n��H)��fZY\=�����y�-2b���}�ߴ)���V�J�Đ�TJ��_�˳+�3xb��o��S�*�8˝ �׼���,�sad�}��j�|��������$�\O�ő�6Qmj�O�@�#x�?g�b��Ioz�>���� �	�ӑ�����N^�)Z �`DOܾ�j	�9��`�k7�ܻ���������ڜ����9���[�\��?��<�K����&�����,E}!3X1��~v�)Y���.�/�V��M���.�4}$��F�5R��F�n*��Q+P&p�As�,��2Ly��K(�r(��R��,�X*E�/\�<q��ݬ6׳�~ʗ�f!�
Z�?��������˃F#|�����X#��f`�XB߿����%�/�K��70�W�w	#�֠m�=�=��:�Njc��z�ic!Tc'[� �y­�z7?ʵj	+�  T�NX�h'��KX���I�J��6�8U.W��u�
��2GV�%ȃ���~��2�lzޜ:F�;�K$�ݐ51����W��цL
?� n��
���+M���bxg ��[�}�a��s����|��ʹU�����k��-�C�֪�u���0+�[5$ɫ�d�r�������zÙ�פk|rf�q
�a܀E  ���8 8�]�+�o\#�;L(j.�mf�#���^�N���2�.R*P�@y�.��o~�w]���t��ʵt�B��]�����,{�Ϭ�;��$TL4Zna�3�A�����T1C.����:�sO^�#T1�� ����&�m���-�������ȁ_��Q�q��[������x9����������7un�6�H�;�R�dN�����8�1#%�-1�l��?�Ot@H%�bR*rb,ĵ68����S�;N-��Z�<�f��,�_�1fL��6��iy���B���/vWE�.	~����R}�t�4��T��X*G.�ޥU�i����b=7�c5��x���"&�"#Fⶋ
L��[��w/�TN���h���L�
�³
33��a�t��kT�5�+�M�|�Q�����Cd]��{n��ќ����ZE�NF����(��M����CO����L�.Đ������ιgTs��w����c��H�Y�$&�"#�b	W/��'��׉���/ֶ�	C��VW���F��O<M� Rv�X�Tfr�K��`g�R�sn%v�� C��ڻ8�I�QƾR�UT�;*����J�J������Ƕ�s�)zp�n�Wt\�����[ғNV�)z��� �ڽ�:Y_<�H�n�P�w?����*i�d�{Og?����W����B�u��I�=֢G���nA:1��>Y���k[���K���%�NUM�Hz�PN� }��ۙ��ix��`}�F�1�(�΢�؆�q�N�D���ӑ�����M�R����R"ݨi�"�J�����!�r�JN!GV�'�$7%9�G�hمè�w����x����N�x"�c���r��23�v�����kG��Q��z�l!���7DO��M�۸b>��l�2��8��Br��r��B=��2��$��$�s�]9�zakkd���F!��� :�-O�}�Y%��J�%��s�Ѭ���-ϔ:Wq��_�����Y�SI��Z���jL�?JP��צS��Җ�Y�H&������d;�t�)�3��:{�'-瓉Q!w��=��V�T��/���-V����㬎q7�7~� ӗ�/��P`mcB���m]ϧ��=�)nE!$熙@��\�}32���n0J(�	;i`LE���Q--8DK���"�:�#������91Lr��fd�L��U{z���K�pfR.rf8��2>WUg�q!�O�� 
<h:�晁04ᢘ▣(qbu`�+V�1~�ݚa�)�k��L�( _�q�d��ܐup�>�CW 	�:�#f��0�rouΠˁ�L����A�#j�kfn�a'L�mB��W@����1Ѻ}��]    ��2�8:�
A~U�Q�x������H��##��IpM<��uĈ4f���d�����*0��H�?�G$G)p������Ƨ|�d]fas�
��㴌�vLC�CE�} �hL�ˁ��/$�X���N1�.G��}��"�y��9$��4G.�Q�o�@��K�+:�QkK�/�k��▣�U'��%�,xa\#���3�(m������_�E��踢����gX[��H���r)�	�1�Ȟ�pT�cVr�r�,�Ή�l/����9n��������H}������1C.�gs�:�h�1nB$���Ӳ��6�"g�p�E�q�h�ē>R�� �I7�QP
�����:�k������=�V�8��;bh�4��\��%�C��ɜߎ��u$g9��䲛sN��9�Pċ���)�i)�����5˹���k���e�,��]y@vQZ3ٕxi���(㧲=�!��zW0B�T@�+F���=���٨�4*�Q�E���̄��f�������[��R�?�
k��D���<���D2�v#�䝕wÈO�{u��M�g^���֡�����ֳ���Q\Jk!�ʵ��e�,���]ݖ]'��e�lwϲ;B�5�d��3���e�,��]{(f ���Tlh�v�ݳ�F�]Ȣ�Tlqt?�-;��Yv�'��%���]k�
m"��Y��	?�3l(�����j%�讕��E���������t�r�b`���x�^T��蝑����Vž����ѵ�L�ɴ/L�۹(�ޝ1mP� ���`g������@���.ӧ�X�����'�w�8�k����"(��rL���t�Ϸ)dO�ѫ� �_b4��W��V�Z�!0��$x�Q������T��/�� ��o���Ώ�*��C�������?��$T$���gQ+7�'��-ک���^/\��N@� �,���*e���/33���1����yi̞��m,b\���9hHx�7�4M��6�c��`9Y����ڃ&�o߹h�t�$���G�)km�ա�x��B�a���w�υWQ����DOԏ,&9��ܿ��{��t���k)xԆ�6��T"s#��0ȶ������V~ѐv�bZ�hd��x(VS�ߪ��W��G��z�Rs����5��R��6���I��J	���ߖ@*��@���������d�I6�h��Q�9xS��R�%$�J�

�[�Vź��O_���P[��u��><��+PU믪��j5�uc#�I�ЛX���(Cz�Xнn|:���uU�:�Pco@�2�	~�h�`�q��J�zݜ2M��h�W���
�_��\4>�մ5muEU�v�q�t7�����{�JxE�KG��Θ���`�{�w��_�4	��2�Z~Ps�Mh� b6�dU*�wJ���|,+:~�I�Ў�x�`����޴�^5>}����8��f���l)jjtBΥ�fq#ZR��$8��5,!nE���	�q���UWN0��U$��Ƨ�+k���с:%.�HJk�Hk�f8�,P�^n><��_�S��WUe	��<���,�U<�
x��tV��+�9�/�;�`$&�xC�<�s��ެ6׳�~*��c�YˀM��f�SHa|�:S�<��*H%���?:c���?�!��X�/dJ���Z I�; �&	��c�#���Ӗ !ɜ52��`�ux�rl7�D.��5i|o$�U`�k
����t2�b�?>i+��z=@��������	�ޞ��!�4Y�/�� ���-�O��a r�������rl�A��3�A��� &��9%��sM�
,TuWO����=����zQG����~��W�:�}#~X��o����˛=�E/�0��E�������w��ثhZ�0����a����c��*Y��œ�u̡!TDi�M�Ґa� 	�#n�L�\}>2�wם��ԸҔ�7z�V�;��w��m�����[��u�=����i���j�k׳#� QȻ���ݼ��x������,�K��6WΩ4�J�,���CT�G��TnPȚ�=:<������N�pX{O8�3�X�Z&
֥&:8��,��7�d�:H��6,UM�v����7���u������[0�[�����0e!��n��Q�r&��3��A�I§�׷LY)/���c��&�w�r0u)�R�н�h�	�I��3��xǮ
}C��B�g���׾�'�d�����5|[��3e�;[ѕ�j�ns�ay��~8�xЈP�V)b5s�N�L�5�>zq:b�ۂ���D,���B3%��ezI0�̿���Lc?�U?�`G���9` |��4C��g5����x
*�0ֽ44�Mba]���6-��FçAh(x`v��@]8Z�v4�Kj8���8*���c��7��aqh@+�{u�0��0j.CG��k

F��v F\��$/T���]��N ��p��C�hf��+���/pL�����%}�B+�~�x�`�F��E�$-��:� �P����n��Ȉ12Z������j#�bW 	���C����d���&�➆a���@:�4�\���L�H^σ�z�_+%h���d���,E��52�oe��F�=��蠝Vļ�����:��xf��w�tӃO�����0}��0�1�Έ�f!�.c��B�ߍ�Nnpv>o�(�`ltu��c�kɞ՞ƣ��#�d�Udm@�]h3��q���iݔ�����	�H�v���Z���4%�)%+��zkI���'^er�����$��ԯ�!���jO_��زI!l�7�Io+0�,�Aj6��.7(ȼB�}�m�/���� ���&^18��Vxq���ÔW!�Y�P`�k0
�w�>�=�G�"X"ض8u`D :0��쏖�AV� �_��,���L�J�4��`	a�ԁ����]�>�E����_nV�82mC��jv�~��?�d�)p}�з�r�rߝn\h��R`R���0;ұ�&E=S@q\����N\����P�����d��hG�!�@���f�lJB���Xu[�6IAڽ7I���z��r.3�׻�$����w��Ð�M�٭��
N� �ږ�{/F��6P?U��JaEW���#����'>�	�Q���j�rnN��㚜����9�����wǕZ�}w-&`�?NOj�kԤd����M�$��^Q������}� mX�_�>.��a���!M��w#��@	:�~�Gr���V�����sj��:���]�m���2��l������D�H	^�q�a�,�i���f
~�6Gm"z��KBЋw\Y�z�˦uS�gC!��Lq�Haj
.2f�SԺ%�mg鑝��o��#����B��X�������������Z���|����_��aZˆ�n��>��e���C��ˠ�Ѧ=�h��	��j�ce��������Q�����K�|_4 ��
�1�-ѠWn6�����
n*2��
BC�	˅�E�q��;�v0j��l�y)��� ߳�S �S("6���\��Ib��OG�`-�6�F�� ֺ����O�?�tYD�@�����EH�v�u�jY:��8C��6����� �@(&ܱ@��2�l9��Ѻ��K�E�ǃ�O�m�ȸ�y�?���F�����Ms��ɦ�l0�P%���ط��������>��W��\���V�ZH �¹7˞FbA"�W⧚�YCD&u�����W��ӕh�v�dM�UfkƩJ�5<��NN�L�2I"5�Ʒ�k, [Ő�-��\["7�LR�f�y/!M�k�kD;1tO#�Hq��%���$�����7�Ri',�	��2��:�8�6�Z���V`�\�GH^�yi8���TG�Q�АS��M���`�`����0�;@0Ƚ� {OhB��VBHxk��Wu+ґ�x��/;�!��c�!j
��Y�A�R�A��1-��CC49Z[�@����Z���j��s:��p���>�y C�Z�!���u]�S���W{��C�3ҡ/9�
��s���+P+0������&O����{ �  � ��E,M��ڗ��H�wp@���a��V`��!�˫����D�{��.멡�p+P�:(g��M<��mjCG�y`�+���.�d�ܘ�T�P�^#��0����	�W�3��!dxT	{��$�}�\Вǝ���k5�H��>B{�) FLM��u�(ll�Cg�}ќl�g�4�� �9Y�������?K?��O�� Z'��(=��F*b�q(�J�x�l��'�)X(�8���~j�'�y���]��A9I%-�$�����J��ҡ�Qw�ʊ$�[�hVjICF
V��r)�������7��'������KqdŲ:���E�o|�M��7?���U2�j����Ծ��G-{V{:�������.)f5�V!<{��?����     