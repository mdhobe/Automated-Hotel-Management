// in some service
var PdfDocument = require('pdfkit');
   
    function generateHeader(doc) {
      
        doc
          .image("./logo.png", 50, 45, { width: 50 })
          .fillColor("#000000")
          .fontSize(20)
          .text("Taj Hotel", 110, 57)
          .fontSize(10)
          .text("123 Main Street", 200, 65, { align: "right" })
          .text("New York, NY, 10025", 200, 80, { align: "right" })
          .fontSize(12)
          .font('Courier-Bold')
          .text("GST No.: 22DKJP12345AZ5", 200, 95, { align: "right" })
          .font('Times-Roman')
          .fontSize(10)
          .moveDown();
      }
      
      function generateFooter(doc) {
        doc
          .fontSize(10)
          
          .text(
            "Thank you for visiting,Visit Again",
            50,
            750,
            { align: "center", width: 500 }
          );
      }
      function generateTableRow(doc, y, c1, c2, c3, c4, c5) {
        doc
          .fontSize(10)
          .text(c1, 50, y)
          .text(c2, 180, y)
          .text(c3, 280, y, { width: 90, align: "right" })
          .text(c4, 370, y, { width: 90, align: "right" })
          .text(c5, 0, y, { align: "right" });
      }
      function generateInvoiceTable(doc, invoice) {
        let i,
          invoiceTableTop = 170;
          let finaltotal=0;
        for (i = 0; i <= invoice.orderlist.order.length; i++) {
          const item = invoice.orderlist.order[i-1];
          const position = invoiceTableTop + (i + 1) * 30;
          if(i==0){
            generateTableRow(
              doc,
              position,
              "Item Name",
              "Category",
              "Rate",
              "Quantity",
              "Total"
            );
          }
          else{
            finaltotal += item.total;
            generateTableRow(
              doc,
              position,
              item.name,
              item.category,
              item.price,
              item.quantity,
              item.total
            );
          }
          if(i==invoice.orderlist.order.length){
             let p = invoiceTableTop + (i + 2) * 30;
            doc
          .fontSize(10)
          .fillColor("#000000")
          .text("GST  : "+(finaltotal*18)/100, 0, p, { align: "right" });
          p = invoiceTableTop + (i + 3) * 30;
          //   doc
          // .fontSize(15)
          // .fillColor("#008000")
          // .text("Status : Paid", 50, p)
          doc.image("./paid.png", 70,p, {width: 100, height: 100});
          doc
          .fontSize(10)
          .fillColor("#000000")
          .text("Final Total  : "+(finaltotal+(finaltotal*18)/100), 0, p, { align: "right" });
          }
        }
      }
      function generateCustomerInformation(doc, bill,billnumber) {
        // const shipping = invoice.shipping;
        var today = new Date();
        var dd = today.getDate();
        
        var mm = today.getMonth()+1; 
        var yyyy = today.getFullYear();
        if(dd<10) 
        {
            dd='0'+dd;
        } 
        
        if(mm<10) 
        {
            mm='0'+mm;
        }
        today=dd+'/'+mm+'/'+yyyy;
        doc
          .text(`Invoice Number: ${billnumber}`, 50, 120)
          .text(`Date: ${today}`, 50, 135)
          .text(`Payment Mode: Cash`, 50, 150)
      
          .text(`Name: ${bill.customername}`, 300, 120)
          .text(`Contact: ${bill.customerphone}`, 300, 135)
          .text(`Email: ${bill.customeremail}`, 300, 150)
          .moveDown();
      }

module.exports = {
    create: function (bill,billnumber) {
        // create a PDF from PDFKit, and a table from PDFTable
        var doc = new PdfDocument({
                autoFirstPage: true,
                margin:30
            });
            //  doc.addPage();
            // doc.fillAndStroke('#ADD8E6')
            doc.image("./bg3.png", 0,0, {align: 'center',width:doc.page.width,height:doc.page.height });
            doc 
            .fillColor("#000000")
            .rect(8, 8, 595, 775)
            .lineWidth(2)
            // .dash(5, {space: 0})
            .stroke()
            
            
            generateHeader(doc);
            generateCustomerInformation(doc, bill,billnumber);
            generateInvoiceTable(doc, bill);
            generateFooter(doc);
       

        return doc;
    }
    
};