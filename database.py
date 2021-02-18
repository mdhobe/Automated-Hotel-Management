import psycopg2, uuid

#insert hotel data
def insert_data(username, password, hotelname, phone):
    uuid_id = str(uuid.uuid1().int)

    conn = psycopg2.connect(database="postgres", user="postgres", password="1234", host="127.0.0.1", port="5432")
    cur = conn.cursor()
    sql = "INSERT INTO hotel(uuid,username,password,hotelname,phone) VALUES('"+uuid_id+"','"+username+"','"+password+"','"+hotelname+"','"+phone+"')"
    cur.execute(sql)
    conn.commit()
    conn.close()


#check user in hotel data
def check_user(username, password):
    conn = psycopg2.connect(database="postgres", user="postgres", password="1234", host="127.0.0.1", port="5432")
    cur = conn.cursor()
    sql = "SELECT * from hotel"
    cur.execute(sql)
    hotel_record = cur.fetchall()
    for row in hotel_record:
        if row[1] == username and row[2] == password:
            return True
    conn.close()
    return False
