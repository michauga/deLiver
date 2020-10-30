from flask import Flask, render_template, make_response, request
app = Flask(__name__)
app.debug = False


@app.route('/')
def index():
    return render_template("index.html")


@app.route('/sender/sign-up')
def senderRegistration():
    return render_template("sender_registration.html")


if __name__ == '__main__':
    app.run()