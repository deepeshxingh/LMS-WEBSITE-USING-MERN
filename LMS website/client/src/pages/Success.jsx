import React, { useRef } from "react";
// import { Button } from "@/components/ui/button";
import { useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { useReactToPrint } from "react-to-print";

function Success() {
  const { user } = useSelector((store) => store.auth);
  const [searchParams] = useSearchParams();
  const givenData = searchParams.get("data");

  let decoded = givenData ? atob(givenData) : "{}";
  let data = JSON.parse(decoded);

  // Step 1: Create a ref for the printable content
  const printRef = useRef(null);

  // Step 2: Ensure contentRef is passed correctly
  const handlePrint = useReactToPrint({

  });

  return (
    <div ref={printRef} className="flex flex-col items-center mt-16 mb-72">
      {/* Printable Section */}
      <div  className="shadow-slate-800 shadow-lg w-96 rounded-2xl p-5 text-center bg-white">
        <img
          className="h-32 mx-auto"
          src="https://www.ignitebh.com/wp-content/uploads/2020/04/payment_success_icon.png"
          alt="Success Icon"
        />
        <h1 className="font-bold text-lg">Payment Successful</h1>
        {user && (
          <>
            <p><strong>Name:</strong> {user.name}</p>
            <p><strong>Email:</strong> {user.email}</p>
          </>
        )}
        <p><strong>Transaction Code:</strong> <span className="text-red-600 font-semibold">{data.transaction_code || "N/A"}</span></p>
        <p><strong>Status:</strong> <span className="text-red-600 font-semibold">{data.status || "Pending"}</span></p>
        <p><strong>Total Amount:</strong> <span className="text-red-600 font-semibold">रु. {data.total_amount || "0"}</span></p>
        <p><strong>Payment Date:</strong> {new Date().toLocaleString()}</p>
      </div>

      
    </div>
  );
}

export default Success;
