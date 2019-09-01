'use strict';
var nodemailer = require('nodemailer');
var sendEmail = function(data, callback){
  var transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: 'ciriusblb@Gmail.com',
        pass: 'El5-mejo'
    }
  });




  var mailOptions = {
    from: 'Remitente',
    to: data.email.toString(),
    subject: 'Asunto',
    html:'<table cellpadding="0" cellspacing="0" border="0" style="width:50%;">'+
              '<tr>'+
                  '<td style="padding:50px; width:400px">'+
                      '<div style="border:2px solid #34495E; border-radius: 5px;width:100%;">'+


                        '<center class="col-md-12" style="margin-top: 5px; display:flex; justify-content:space-around;">'+
                            '<div style="margin:0px 20px 0px 45px;"><img style="" src="https://image.ibb.co/en3pA7/logo.png" width="50px" height="50px"></div>'+
                              '<center><strong>COLEGIO MEDICO DEL PERU</strong>'+
                              '<p>CONSEJO REGIONAL</p></center>'+
                            '<div style="margin:0px 45px 0px 20px"><img style="" src="https://image.ibb.co/en3pA7/logo.png" width="50px" height="50px"></div>'+
                        '</center>'+

                          '<center  style="width:96%;background: #34495E;font-weight: bold;text-transform: uppercase;padding: 15px 9px; margin-bottom:10px; color:white">'+
                              '<div>'+
                                  '<span>'+data.header+'</span>'+ 
                              '</div>'+ 
                          '</center>'+
                          '<center class="col-md-12" style="font-weight: bold;text-transform: uppercase; padding: 15px 9px;  width: 100%; margin-bottom:10px">'+
                              '<div>'+
                                  '<span>'+data.titulo+'</span>'+ 
                              '</div>'+ 
                          '</center>'+
                          '<div class="col-md-12" style="padding: 15px 9px;width: 96%; margin-bottom:10px">'+
                            '<div>'+
                                '<span>'+data.descripcion+'</span>'+
                            '</div>'+ 
                          '</div>'+
                          '<div class="col-md-12" style="padding: 15px 9px">'+
                            '<span>'+data.fecha+'</span>'+
                          '</div>'+
                          '<div class="col-md-12" style="padding: 15px 9px">'+
                            '<span>COLEGIO MÉDICO DEL PERÚ</span>'+
                          '</div>'+
                      '</div>'+ 
                  '</td>'+
              '</tr>'+
          '</table>'
      // attachments: [{
      //   filename: 'file.pdf',
      //   path: 'C:/Users/Ciriusblb/Desktop/newsApp/server/apps/home/hola.pdf',
      //   contentType: 'application/pdf'
      // }]
  };
  transporter.sendMail(mailOptions, function(error, response){
      if (error){
      console.log("errorrrrrrrrrrrrrrrrrr",error);
        callback(null,undefined);
    } else {
      console.log("bueno ",response);
        callback(null,{msg:'enviado'});
    }


  });
};

module.exports=sendEmail;




  // var mailOptions = {
  //   from: 'Remitente',
  //   to: data.email,
  //   subject: 'Asunto',
  //   html:'<center>'+
  //           '<table cellpadding="0" cellspacing="0" border="0" style="width:60%;">'+
  //               '<tr>'+
  //                   '<td style="padding:50px; width:400px">'+
  //                       '<center style="border: 2px solid black; border-radius: 5px;width:100%;">'+
  //                           '<div class="col-md-12">'+
  //                             '<img style="display: flex;margin: auto; width:200px" src="https://s3.amazonaws.com/f.cl.ly/items/2l0x0I2B2a3x3D2J0n0B/gpoollogo.png">'+
  //                           '</div>'+
  //                           '<div  style="width:96%;background: black;color: white; font-weight: bold;text-transform: uppercase;padding: 15px 9px; margin-bottom:10px">'+
  //                               '<div>'+
  //                                   '<span>'+data.header+'</span>'+ 
  //                               '</div>'+ 
  //                           '</div>'+
  //                           '<div class="col-md-12" style="font-weight: bold;text-transform: uppercase; padding: 15px 9px;  width: 100%; margin-bottom:10px">'+
  //                               '<div>'+
  //                                   '<span>'+data.titulo+'</span>'+ 
  //                               '</div>'+ 
  //                           '</div>'+
  //                           '<div class="col-md-12" style="padding: 15px 9px;width: 96%; margin-bottom:10px">'+
  //                             '<div>'+
  //                                 '<span>'+data.descripcion+'</span>'+
  //                             '</div>'+ 
  //                           '</div>'+
  //                           '<div class="col-md-12" style="padding: 15px 9px">'+
  //                             '<span>'+data.fecha+'</span>'+
  //                           '</div>'+
  //                           '<div class="col-md-12" style="padding: 15px 9px">'+
  //                             '<span>COLEGIO MÉDICO DEL PERÚ</span>'+
  //                           '</div>'+
  //                       '</center>'+ 
  //                   '</td>'+
  //               '</tr>'+
  //           '</table>'+
  //       '</center>',
  //     attachments: [{
  //       filename: 'file.pdf',
  //       path:  __dirname +'/pdf.pdf',
  //       contentType: 'application/pdf'
  //     }]
  // };