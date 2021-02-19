import psycopg2, uuid

'''
#insert hotel data
def insert_data(username, password, hotelname, phone):
    uuid_id = str(uuid.uuid1().int)
    conn = psycopg2.connect(database="postgres", user="postgres", password="1234", host="127.0.0.1", port="5432")
    cur = conn.cursor()
    sql = "INSERT INTO hotel(uuid,username,password,hotelname,phone) VALUES('"+uuid_id+"','"+username+"','"+password+"','"+hotelname+"','"+phone+"')"
    cur.execute(sql)
    conn.commit()
    conn.close()


#insert chef data to taj mumbai hotel database
def insert_data_cheftajmumbai(username, chefname, password, phone):
    uuid_id = str(uuid.uuid1().int)
    conn = psycopg2.connect(database="postgres", user="postgres", password="1234", host="127.0.0.1", port="5432")
    cur = conn.cursor()
    sql = "INSERT INTO cheftajmumbai(uuid,username,password,chefname,phone) VALUES('" + uuid_id + "','" + username + "','" + password + "','" + chefname + "','" + phone + "')"
    cur.execute(sql)
    conn.commit()
    conn.close()


#insert chef data to taj mumbai hotel database
def insert_data_managementtajmumbai(username, authorityname, password, phone, title):
    uuid_id = str(uuid.uuid1().int)
    conn = psycopg2.connect(database="postgres", user="postgres", password="1234", host="127.0.0.1", port="5432")
    cur = conn.cursor()
    sql = "INSERT INTO magementtajmumbai(uuid,username,password,authorityname,phone,title) VALUES('" + uuid_id + "','" + username + "','" + password + "','" + authorityname + "','" + phone + "','"+title+"')"
    cur.execute(sql)
    conn.commit()
    conn.close()
'''

#login hotel data
def check_hotel_login(username, password):
    conn = psycopg2.connect(database="postgres", user="postgres", password="1234", host="127.0.0.1", port="5432")
    cur = conn.cursor()
    sql = "SELECT uuid FROM hotel WHERE (username = '"+username+"' AND password = '"+password+"')"
    cur.execute(sql)
    hotel_exist = cur.fetchone()
    if hotel_exist:
        return True
    conn.close()
    return False
