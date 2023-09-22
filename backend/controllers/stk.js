const moment = require("moment");
const PasswordBaseSixFour = require("../helpers/passwordbasesixfour");
// const Payment = require("../models/Payment");
const request = require("request");
const get_access_token = require("../utils/accessToken");

const accessToken = (req, res) => {
  res.status(200).json({ access_token: req.access_token });
};

const sendSTKPush = ({ phoneNumber, amount }) => {
  return new Promise(async (resolve, reject) => {
    let url = process.env.endpoint_stk_push;
    let getAccessToken = await get_access_token();
    let auth = "Bearer " + getAccessToken;
    const timeStamp = moment().format("YYYYMMDDHHmmss");
    const passKey = process.env.Pass_key;
    const shortCode = process.env.ShortCode;
    const password = PasswordBaseSixFour(shortCode, passKey, timeStamp);

    request(
      {
        url: url,
        method: "POST",
        headers: {
          Authorization: auth,
        },
        json: {
          BusinessShortCode: shortCode,
          Password: password,
          Timestamp: timeStamp,
          TransactionType: "CustomerPayBillOnline",
          Amount: amount,
          PartyA: phoneNumber,
          PartyB: shortCode,
          PhoneNumber: phoneNumber,
          CallBackURL:
            "https://2b1e-196-216-66-82.ngrok-free.app/api/mpesa/callbackurl",//mine ngrok
          AccountReference: "Test",
          TransactionDesc: "Test",
        },
      },
      (err, resp, body) => {
        if (err) {
          reject({
            status: false,
            statusCode: 400,
            msg: err,
          });
        }
        resolve({
          status: 200,
          message: body,
        });
      }
    );
  });
};

const callBackURL = async (body) => {
  let checkoutCode = body.Body.stkCallback.ResultCode;
  if (checkoutCode === 0) {
    let metadata = body.Body.stkCallback.CallbackMetadata.Item;

    function mapMetadata(metadata) {
      return metadata.reduce((result, entry) => {
        result[entry.Name] = entry.Value;
        return result;
      }, {});
    }

    const mappedResult = mapMetadata(metadata);
    const { Amount, TransactionDate, MpesaReceiptNumber, PhoneNumber } =
      mappedResult;

    console.log(
      Amount,
      "\n",
      TransactionDate,
      "\n",
      MpesaReceiptNumber,
      "\n",
      PhoneNumber
    );
    // const newPayment = new Payment({
    //   amount: Amount,
    //   phoneNumber: PhoneNumber,
    //   mpesaReceiptNumber: MpesaReceiptNumber,
    //   transactionDate: TransactionDate,
    // });
    // newPayment.save();
  } else {
    console.log(body.Body.stkCallback.ResultDesc);
  }
};

module.exports = { accessToken, sendSTKPush, callBackURL };
