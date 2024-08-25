from flask import Flask, request, jsonify
from flask_cors import CORS # type: ignore
import string

app = Flask(__name__)
CORS(app) 

@app.route('/password-strength', methods=['POST'])
def password_strength():
    password = request.get_json()['password']

    uppercase = any([1 if c in string.ascii_uppercase else 0 for c in password ])
    lowercase = any([1 if c in string.ascii_lowercase else 0 for c in password ])
    special=any([1 if c in string.punctuation else 0 for c in password ])
    digit=any([1 if c in string.digits else 0 for c in password ])

    characters = [uppercase, lowercase, special, digit]

    score=0

    length=len(password)

    with open("common.txt", "r") as f:
        common = f.read().splitlines()
 
    if password in common:
        return jsonify({'message': 'Password found in a common password list. Score: 0/7', 'score': 0})

    if length > 8:
        score+=1
    if length > 10:
        score+=1
    if length > 12:
        score+=1
    if length > 15:
        score+=1

    if sum(characters) > 1:
        score+=1
    if sum(characters) > 2:
        score+=1
    if sum(characters) > 3:
        score+=1

    if score < 4:
        message = f"The password is quite weak! Score: {str(score)}"
    elif score == 4:
        message = f"The password is ok! Score: {str(score)}"
    elif score > 4 and score < 6:
        message = f"The password is good! Score: {str(score)}"
    elif score >= 6:
        message = f"The password is strong! Score: {str(score)}"

    return jsonify({'message': message, 'score': score})

if __name__ == '__main__':
    app.run(debug=True)