from flask import Flask, render_template, request
import database as db

app = Flask(__name__)
app.config["DEBUG"] = True


@app.route('/', methods=['GET'])
def login():
    return render_template('login.html')


@app.route('/hotellogin', methods=['POST'])
def hotellogin():
    hotelusername, hotelpassword = str(request.form.get("hotelusername")), str(request.form.get("hotelpassword"))
    if db.check_user(hotelusername, hotelpassword):
        return render_template('hotel.html')
    else:
        return render_template('login.html')


@app.route('/cheflogin', methods=['POST'])
def cheflogin():
    accessuser, accesspassword = "Mrunal", "12345"
    chefusername, chefpassword = str(request.form.get("chefusername")), str(request.form.get("chefpassword"))
    if accessuser == chefusername and accesspassword == chefpassword:
        return render_template('chef.html')
    else:
        return render_template('login.html')


@app.route('/customerorder', methods=['GET'])
def customerlogin():
    return render_template('customer.html')

app.run()