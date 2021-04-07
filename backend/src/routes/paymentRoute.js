const express = require("express");
const mongoose = require("mongoose");
const User = require("../models/user");

const router = express.Router();

const checksum_lib = require("../../paytm/checksum");
const config = require("../../paytm/config");
const formidable = require("formidable");
const https = require("https");
const qs = require("querystring");

router.post("/paynow", (req, res) => {
  // Route for making payment

  var paymentDetails = {
    amount: req.body.amount,
    customerId: req.body.name,
    customerEmail: req.body.email,
    customerPhone: req.body.phone,
  };
  if (
    !paymentDetails.amount ||
    !paymentDetails.customerId ||
    !paymentDetails.customerEmail ||
    !paymentDetails.customerPhone
  ) {
    res.status(400).send("Payment failed");
  } else {
    var params = {};
    params["MID"] = config.PaytmConfig.mid;
    params["WEBSITE"] = config.PaytmConfig.website;
    params["CHANNEL_ID"] = "WEB";
    params["INDUSTRY_TYPE_ID"] = "Retail";
    params["ORDER_ID"] = "TEST_" + new Date().getTime();
    params["CUST_ID"] = paymentDetails.customerId;
    params["TXN_AMOUNT"] = JSON.stringify(paymentDetails.amount);
    params["CALLBACK_URL"] = "http://localhost:5000/paytm/callback";
    params["EMAIL"] = paymentDetails.customerEmail;
    params["MOBILE_NO"] = paymentDetails.customerPhone;

    checksum_lib.genchecksum(params, config.PaytmConfig.key, function (err, checksum) {
      console.log("err...", err);
      let paytmParams = {
        ...params,
        "CHECKSUMHASH": checksum,
      };
      res.json(paytmParams);
    });
  }
});

router.post("/paytm/callback", (req, res) => {
  //[Extra-do at the end] CHECK STATUS OF TRANSACTION wheather it gets fail or success(https://developer.paytm.com/docs/api/v3/transaction-status-api/)
  var body = "";

  req.on("data", function (data) {
    body += data;
  });

  req.on("end", function () {
    var html = "";
    var post_data = qs.parse(body);

    // received params in callback
    console.log("Callback Response: ", post_data, "\n");

    // verify the checksum
    var checksumhash = post_data.CHECKSUMHASH;
    // delete post_data.CHECKSUMHASH;
    var result = checksum_lib.verifychecksum(post_data, config.PaytmConfig.key, checksumhash);
    console.log("Checksum Result => ", result, "\n");

    // Send Server-to-Server request to verify Order Status
    var params = { "MID": config.PaytmConfig.mid, "ORDERID": post_data.ORDERID };

    checksum_lib.genchecksum(params, config.PaytmConfig.key, function (err, checksum) {
      params.CHECKSUMHASH = checksum;
      post_data = "JsonData=" + JSON.stringify(params);

      var options = {
        hostname: "securegw-stage.paytm.in", // for staging
        // hostname: 'securegw.paytm.in', // for production
        port: 443,
        path: "/merchant-status/getTxnStatus",
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          "Content-Length": post_data.length,
        },
      };

      // Set up the request
      var response = "";
      var post_req = https.request(options, function (post_res) {
        post_res.on("data", function (chunk) {
          response += chunk;
        });

        post_res.on("end", async function () {
          console.log("S2S Response: ", response, "\n");
          console.log("response...", response);

          var _result = JSON.parse(response);
          console.log("_result...", _result);
          if (_result.STATUS == "TXN_SUCCESS") {
            res.redirect("http://localhost:3000/orders");
          } else {
            res.status(400).send("payment failed");
          }
        });
      });

      // post the data
      post_req.write(post_data);
      post_req.end();
    });
  });
});
module.exports = router;
