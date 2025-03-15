import { useLocation } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import CryptoJS from "crypto-js";

function Payment() {
  let location = useLocation();
  const { total_amount, course_title } = location.state;
  let transaction_uuid = uuidv4();
  let Message = `total_amount=${total_amount},transaction_uuid=${transaction_uuid},product_code=EPAYTEST`;
  var hash = CryptoJS.HmacSHA256(Message, "8gBm/:&EnhH.1/q");
  var hashInBase64 = CryptoJS.enc.Base64.stringify(hash);
  return (
    <div>
      <form
        className="shadow-2xl shadow-slate-600 w-96 p-5 m-auto mt-20 rounded-2xl flex flex-col justify-center items-center gap-4 mb-64"
        action="https://rc-epay.esewa.com.np/api/epay/main/v2/form"
        method="POST"
      >
        <input
          type="hidden"
          id="amount"
          name="amount"
          value={total_amount}
          required
        />
        <input
          type="hidden"
          id="tax_amount"
          name="tax_amount"
          value="0"
          required
        />
        <input
          type="hidden"
          id="total_amount"
          name="total_amount"
          value={total_amount}
          required
        />
        <input
          type="hidden"
          id="transaction_uuid"
          name="transaction_uuid"
          value={transaction_uuid}
          required
        />
        <input
          type="hidden"
          id="product_code"
          name="product_code"
          value="EPAYTEST"
          required
        />
        <input
          type="hidden"
          id="product_service_charge"
          name="product_service_charge"
          value="0"
          required
        />
        <input
          type="hidden"
          id="product_delivery_charge"
          name="product_delivery_charge"
          value="0"
          required
        />
        <input
          type="hidden"
          id="success_url"
          name="success_url"
          value="http://localhost:5173/success"
          required
        />
        <input
          type="hidden"
          id="failure_url"
          name="failure_url"
          value="http://localhost:5173/failure"
          required
        />
        <input
          type="hidden"
          id="signed_field_names"
          name="signed_field_names"
          value="total_amount,transaction_uuid,product_code"
          required
        />
        <input
          type="hidden"
          id="signature"
          name="signature"
          value={hashInBase64}
          required
        />
        <h1>Course Title : <span className="font-semibold text-lg text-blue-600">{course_title}</span></h1>
        <h1>Total Amount : <span className="font-semibold text-lg text-blue-600">रु. {total_amount}</span></h1>
        <input
          className="bg-orange-600 text-white p-2 rounded-lg"
          value="Confirm Payment"
          type="submit"
        />
      </form>
    </div>
  );
}

export default Payment;
