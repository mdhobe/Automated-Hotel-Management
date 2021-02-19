import psycopg2

def get_hotel_name(hotelusername):
    conn = psycopg2.connect(database="postgres", user="postgres", password="1234", host="127.0.0.1", port="5432")
    cur = conn.cursor()
    sql = "SELECT hotelname FROM hotel WHERE (username = '" + hotelusername + "')"
    cur.execute(sql)
    hotel_name = cur.fetchone()[0]
    return hotel_name

get_hotel_name("tajmumbai")