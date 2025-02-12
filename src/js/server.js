const sql = require("mssql/msnodesqlv8");
var config = {
    server : "KAZE\\SQLEXPRESS",
    database: "TESTEDB",
    driver: "msnodesqlv8",
    options: {
        trustedConnection: true
    }
}

sql.connect(config, function(err){
    if(err) console.log(err);
    var request = new sql.Request();
    request.query("SELECT * FROM dbo.Users", function(err, recordset){
        if(err) console.log(err);
        console.log(recordset);
    });
});