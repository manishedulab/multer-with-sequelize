const { Sequelize,DataTypes } = require('sequelize');


// Create sequelize db connection
const sequelize =new Sequelize(
    "manish",
    "root",
    "manish",

    {
    host:'localhost',
    dialect:'mysql'
})

sequelize.authenticate().then(()=>{
    console.log("database connection established")
}).catch((err)=>{
    console.log(err)
})

//creating a new table
const img=sequelize.define('uploadimg',{
    name:{
        type:DataTypes.STRING,
        allowNull:false
    },
    photo:
    {
        type:DataTypes.BLOB,
        allowNull:false
    }
});


sequelize.sync().then((res)=>
{
    console.log('table created successfully')
}).catch((err)=>{
    console.log(err)
})

module.exports= img