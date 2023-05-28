import React from "react";
import CompanyPresentation from "./CompanyPresentation";
import MerchantForm from "./MerchantForm";
import ComplianceReport from "./ComplianceReport";
import ProofCompliance from "./ProofCompliance";

const UploadFiles = () => {
  return (
    <div className="md:px-0 px-4">
      <div className="w-[70%]">
        <h1 className="font-semibold text-2xl md:text-4xl my-5">
          Upload Files
        </h1>
        <p className="text-slate-300 md:text-[15px] text-sm/[17px] my-5">
          Please upload the following file in the required sections
        </p>
        <div className="border-b border-slate-900 w-[80%] h-1"></div>
      </div>

      <div className="grid grid-cols-1 gap-4 my-8">
        <div className="flex items-center">
          <h1 className="font-semibold text-xl md:text-2xl">
            Upload your Company Presentation
          </h1>
        </div>
        <CompanyPresentation
          docType={".ppt,.pptx,.pdf,"}
          inputId="1"
          />
       
      </div>


      <div className="grid grid-cols-1 gap-4 my-8">
        <div className="flex items-center">
          <h1 className="font-semibold text-xl md:text-2xl">
          Upload your Merchant Application Form
          </h1>
        </div>
        <MerchantForm 
          docType={".doc,.pdf,"}
          inputId="2"
        />
       
      </div>

      <div className="grid grid-cols-1 gap-4 my-8">
        <div className="flex items-center">
          <h1 className="font-semibold text-xl md:text-2xl">
          Upload your PCI DSS Compliance Report (AOC / ROC)
          </h1>
        </div>
        <ComplianceReport 
          docType={".aoc,.pdf,"}
          inputId="3"
        />
       
      </div>

      <div className="grid grid-cols-1 gap-4 my-8">
        <div className="flex items-center">
          <h1 className="font-semibold text-xl md:text-2xl">
          Upload your PCI DSS Compliance Report (AOC / ROC)
          </h1>
        </div>
        <ProofCompliance 
          docType={".pdf,"}
          inputId="4"
        />
       
      </div>
    </div>
  );
};

export default UploadFiles;
