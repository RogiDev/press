const seeder = require('mongoose-seed');
const mongoose = require('mongoose');
require("dotenv").config();

const db = process.env.MONGODB_URI_DEV;
console.log(db);
seeder.connect(db,function(){
    seeder.loadModels(["./models/User"]);
    seeder.clearModels(['User'], function() {

        // Callback to populate DB once collections have been cleared
        seeder.populateModels(data, function() {
          seeder.disconnect();
        });
    
      });
});


const data = [
    {
        "model":'User',
        "documents":[{
            "_id":new mongoose.Types.ObjectId(),
            "email":"igor@app.co.il",
            "firstName":"igor",
            "role":0,
            "lastName":"p",
            "salt":"6db07825808651b178243b8da84f0d00",
            "created_at":new Date(),
            "tz":"123456789",
                  // password -> 123456
            "hash":"ccfdc1a9fe157f4803847d5e8180d7fafd5c4946df5dfbaf10c4b4efad404552d16450cae7c6e4076a8dbfdc12c7c7e10845b94c4f86af64384172b3eb76ee55888b7846513c1869e484eff87cddc6ce9c598285a55acbc7b8c789fc3746f3aaa7af51c2721b8cf140d1bcbe8d17f688e4ebca0e529097da97ec9abba4564dfa1aab2ecb6951cbe8cf4fc0ee56f00c3ad3e01c44a5ed71de1fd5e51ce9574264c59144899855e60aff7167188932afde7b2acbc96c3bbe15847a3d66f2b8d63b04db5e1916df2a98e15e4f6d8978e7c88ba2310906be8af7591bc3a2030b869e4f2218580193b0de4e9b6905e56a5532c790d972f06a917f76088bd96c7a4bf351a2deec8ef0a86518995a79bdab0071437837f897adce3e368459f7b90f3abaf9aa75a633da54d9eb40b7727e55cf81dc478af5252d52674438a96d07ac8215469aef449db558fa0ec49454d2a7257a15ee038bc2055d3e818e9c365135e1b34682673c87ba513d0fde847bcb4dbf75c0abc503b66564ee1584b03421b56036df3c398284e1e8e69cceb28b060abd4fefcd03d5f5cd17ed27763f17b9733cc50ee8c643fb2fb5e029916d1b8990d44d8dea533f1c6365ddd22531250db12d860fef9ac6193199b47b9d8c9e8786a70f386a5dc5b0f256d66e712f707ae5c3c2dd7f5c11f491445cc0b67d1ed489669534e3cd4cc8714b3e26df8b57e56c4c5e"
        },
    ]
    }
]