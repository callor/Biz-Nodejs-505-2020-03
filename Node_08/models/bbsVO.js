// bbs model 선언
module.exports = function(sequelize,DataTypes) {
    return sequelize.define("tbl_board",
    {
        b_id : {
            type : DataTypes.INTEGER,
            autoIncrement : true,
            primaryKey : true
        },
        b_date : {
            type:DataTypes.STRING(10),
            allowNull : false
        },
        b_time : {
            type:DataTypes.STRING(10),
            allowNull : false
        },
        b_writer : {
            type:DataTypes.STRING,
            allowNull : false
        },
        b_subject : {
            type : DataTypes.STRING
        },
        b_text : {
            type : DataTypes.BLOB('long')
        },
        b_count : {
            type : DataTypes.INTEGER,
            allowNull: true,
            defaultValue : 0
        }
    }, { timestamps : true}
    )
   
}


