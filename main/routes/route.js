const express=require('express');
const router=express.Router()
const MongoClient=require('mongodb').MongoClient;

//connect to mongodb database server
MongoClient.connect("mongodb://localhost:27017/mydb",{ useUnifiedTopology: true },(err,client)=>{
    if(err)
    {
       router.use('',(req,res)=>{
           res.send("Unable to connect to database. Try again later");
       }); 
    }
    else
    {
       //enter database mydb  
       const db=client.db('mydb'); 
        
       //CRUD routes
       router.post('/insert',(req,res)=>{
          var id=req.body.id;

          db.collection('students').find({"id":id}).toArray((err,detail)=>{
              if(err)
              res.send("Error in database access");
              else
              {
                if(detail.length==1)
                res.send("cannot insert as record with this id already exists");
                else
                {
                   
                   var l=req.body.list;
                   var list=[];           
          
                   l.forEach(element => {
                        list.push({"name":element.name,"date":element.date,"dept":element.dept,"cgpa":element.cgpa});
                   });

                   db.collection('students').insertOne({"id":id,"list":list},(error,result)=>{
                       if(error)
                       res.send("Could not insert record! Error in database access");
                       else
                       res.send("Successfully inserted record");
                   });
                }
              }
          });
       });

       router.get('/view',(req,res)=>{
           var id=req.query.id;
           
           if(typeof(id)=='undefined')
           {
              db.collection('students').find({},{ projection:{"_id":0} }).toArray((error,result)=>{
                  if(error)
                  res.send("Error in database access");
                  else
                  res.send(JSON.stringify(result));
              });
           } 
           else
           {
            db.collection('students').find({"id":id},{ projection:{"_id":0} }).toArray((error,result)=>{
                if(error)
                res.send("Error in database access");
                else
                {
                  if(result.length==0)
                  res.send("Record with this id does not exist");
                  else 
                  res.send(JSON.stringify(result));
                }
            });
         }});
           
   

       router.put('/update',(req,res)=>{
            var id=req.body.id;
            
            var l=req.body.list;
            var list=[];           
  
            l.forEach(element => {
               list.push({"name":element.name,"date":element.date,"dept":element.dept,"cgpa":element.cgpa});
            });

            db.collection('students').updateOne({"id":id},{$set:{"list":list}},(error,result)=>{
              if(error)
              res.send("Could not update record! Error in database access");
              else
              res.send("Successfully updated record");
            });
       });

       router.delete('/delete',(req,res)=>{
        var id=req.query.id;
        db.collection('students').find({"id":id}).toArray((err,detail)=>{
           if(err)
           res.send("Error in database access");
           else
           {
             if(detail.length==1)
             {
                db.collection('students').deleteOne({"id":id},(error,success)=>{
                     if(error)
                     res.send("Error during deletion! Could not delete!");
                     else
                     res.send("Record successfully deleted!");   
                }); 
             }
             else
             res.send("Record with this id does not exist! Cannot delete!");
           }
        });
     });
   }
          
});

module.exports=router;