from flask import Flask, render_template, request, session, redirect, url_for
import database as db
import Helper
#from datetime import timedelta

app = Flask(__name__)
app.config["DEBUG"] = True
app.secret_key = "hotel"

@app.route('/', methods=['GET'])
def login():
    return render_template('main.html')


@app.route('/hotellogin', methods=['POST'])
def hotellogin():
    hotelusername, hotelpassword = str(request.form.get("hotelusername")), str(request.form.get("hotelpassword"))
    if db.check_hotel_login(hotelusername, hotelpassword):
        session["hotelname"] = Helper.get_hotel_name(hotelusername)
        return render_template("login.html")
    else:
        return render_template('main.html')


@app.route('/cheflogin', methods=['POST'])
def cheflogin():
    chefusername, chefpassword = str(request.form.get("chefusername")), str(request.form.get("chefpassword"))



@app.route('/customerorder', methods=['GET'])
def customerlogin():
    return render_template('customer.html')



app.run()