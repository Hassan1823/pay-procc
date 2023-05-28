import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Contact = ({ confirmPost }) => {
  const [contacts, setContacts] = useState([
    {
      id: 1,
      corporateEmail: "",
      firstName: "",
      lastName: "",
      jobTitle: "",
      phoneNumber: "",
      skypeId: "",
      telegramId: "",
      minimized: false,
    },
  ]);
  const [isFieldsFilled, setIsFieldsFilled] = useState(true);
  const [formName, setFormName] = useState("");

  // const postData = async () => {
  //   let authKey = JSON.parse(localStorage.getItem("login"));
  //   let token = "Bearer " + authKey.access_token;
  //   console.log(token);
  //   try {
  //     const response = await axios({
  //       url: "https://portal.payprocc.com/api/contact",

  //       headers: {
  //         accept: "application/json",
  //         Authorization: token,
  //       },
  //       data: {
  //         first_name: contacts[0].firstName,
  //         last_name: contacts[0].lastName,
  //         corporate_email: contacts[0].corporateEmail,
  //         job_title: contacts[0].jobTitle,
  //         phone_number: contacts[0].phoneNumber,
  //         skypee_id: contacts[0].skypeId,
  //         telegram_id: contacts[0].telegramId,
  //         // supported_countries_of_incorporation_merchant:
  //         // JSON.stringify(merchantCountries),
  //       },
  //       method: "post",
  //     });
  //     console.log("response data : ", response.data);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  // if (confirmPost) {
  //   // postData();
  //   // console.log("form data is:", textFieldsData)
  //   console.log("sucess");
  // }
  // logLocalStorage();
  // function logLocalStorage() {
  //   for (let i = 0; i < localStorage.length; i++) {
  //     const key = localStorage.key(i);
  //     const value = localStorage.getItem(key);
  //     console.log(`${key}: ${value}`);
  //   }
  // }
  function getLocalStorageObject() {
    let result = {};
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      const value = localStorage.getItem(key);
      result[key] = value;
    }
    return result;
  }
 
  useEffect(() => {
    // console.log("Current Data:", contacts);
  });

  const handleAddContact = () => {
    const lastContact = contacts[contacts.length - 1];
    const isFieldsFilled =
      lastContact.firstName !== "" &&
      lastContact.lastName !== "" &&
      lastContact.corporateEmail !== "";
    // const isFieldsFilled = Object.values(lastContact).every(
    //   (field) => field !== ""
    // );
    setIsFieldsFilled(isFieldsFilled);
    if (isFieldsFilled) {
      const newId = contacts[contacts.length - 1].id + 1;
      const updatedContacts = contacts.map((contact) => ({
        ...contact,
        minimized: true,
      }));
      setContacts([
        ...updatedContacts,
        {
          id: newId,
          corporateEmail: "",
          firstName: "",
          lastName: "",
          jobTitle: "",
          phoneNumber: "",
          skypeId: "",
          telegramId: "",
          minimized: false,
        },
      ]);
      console.log(`New contact added with id ${newId}:`, {
        id: newId,
        corporateEmail: "",
        firstName: "",
        lastName: "",
        jobTitle: "",
        phoneNumber: "",
        skypeId: "",
        telegramId: "",
      });
    }
  };

  const handleInputChange = (event, id) => {
    const { name, value } = event.target;
    const updatedContacts = contacts.map((contact) => {
      if (contact.id === id) {
        return { ...contact, [name]: value };
      }
      return contact;
    });
    setContacts(updatedContacts);
  };

  const handleToggleContact = (id) => {
    const updatedContacts = contacts.map((contact) => {
      if (contact.id === id) {
        return { ...contact, minimized: !contact.minimized };
      }
      return contact;
    });
    setContacts(updatedContacts);
  };
// DESTRUCTURING DATA FROM LOCALSTORTAGE STARTS HERE
  const {
    merchantFrequency,
    merchantDelay,
    inputWebsite,
    inputDescription,
    serviceProvider,
    inputBussiness,
    inputLegalName, 
    supportedChannels,
    CompanyFileName1,
    CompanyFileData1,
    MerchnatFileName2,
    MerchnatData2,
    ReportFileData3,
    ReportFileName3,
    ProofName4,
    ProofData4,

  } = getLocalStorageObject();
  // console.log("Key Values are ", MerchnatData2);
// DESTRUCTURING DATA FROM LOCALSTORTAGE ENDS HERE

  // POSTING DATA STARTS HERE
  const postData = async () => {
    let authKey = JSON.parse(localStorage.getItem("login"));
    let token = "Bearer " + authKey.access_token;
    console.log(token);
    try {
      const response = await axios({
        url: "https://portal.payprocc.com/api/merchant",
        headers: {
          accept: "application/json",
          Authorization: token,
        },
        data: {
          business_name: inputBussiness,
          website: inputWebsite,
          description: inputDescription,
          legal_entity_name: inputLegalName,
          payment_provider_type: serviceProvider,
          // company_presentation: CompanyFileData1,
          // merchent_application_form: MerchnatData2,
          // pci_dss_compliance_report: ReportFileData3,
          // proof_compliance: ProofData4,
        },
        method: "post",
      });
      console.log("response data : ", response.data);
      // show toast message if response is successful
      if (response.status === 200) {
        // replace this with your toast message library code
        toast.success("Data submitted successfully");
      }
    } catch (error) {
      console.error(error);
      toast.error("An error occurred while submitting data");
    }
  };
  
if(confirmPost){
  postData();
}

  // POSTING DATA ENDS HERE
  return (
    <div className="flex flex-col space-y-4 w-[80%]">
      <div className="w-[70%]">
        <h1 className="font-semibold text-2xl md:text-4xl my-5">Contact</h1>
        <p className="text-slate-300 md:text-[15px] text-sm/[17px] my-5">
          Please Provide the following contact information
        </p>
        <div className="border-b border-slate-900 w-[55vw] h-1"></div>
      </div>
      {contacts.map((contact, index) => (
        <div
          key={contact.id}
          className={`flex flex-col space-y-2 font-semibold ${
            contact.minimized && index !== contacts.length - 1
              ? "h-auto w-full"
              : ""
          }`}
        >
          {/* <h1 className="text-2xl font-semibold mt-2">
            Contact Form - {contact.id}
          </h1> */}
          {!contact.minimized ? (
            <>
              <button
                type="button"
                onClick={() => handleToggleContact(contact.id)}
                className="bg-gray-700 h-10 text-white rounded-lg border-2 border-green-500 flex items-center"
              >
                {contact.firstName !== "" ? (
                  <>
                    <span className="mr-auto ml-10"> {contact.firstName}</span>
                  </>
                ) : (
                  <>
                    <span className="mr-auto ml-10 text-slate-400">
                      {" "}
                      Your Name
                    </span>
                  </>
                )}
                <span className="text-2xl ml-auto mr-10 mb-5">_</span>
              </button>
              <div className="flex flex-col space-y-2">
                <label
                  htmlFor={`corporateEmail-${contact.id}`}
                  className="text-white font-semibold text-lg"
                >
                  Corporate Email:
                </label>
                <input
                  type="email"
                  id={`corporateEmail-${contact.id}`}
                  name="corporateEmail"
                  value={contact.corporateEmail}
                  onChange={(event) => handleInputChange(event, contact.id)}
                  className="h-12 p-2 w-70vw border-2 border-green-500 rounded-lg text-white bg-gray-700 focus:outline-none"
                />
              </div>
              <div className="flex flex-col space-y-2">
                <label
                  htmlFor={`firstName-${contact.id}`}
                  className="text-white font-semibold text-lg"
                >
                  First Name:
                </label>
                <input
                  type="text"
                  id={`firstName-${contact.id}`}
                  name="firstName"
                  value={contact.firstName}
                  onChange={(event) => handleInputChange(event, contact.id)}
                  className="h-12 p-2 w-70vw border-2 border-green-500 rounded-lg text-white bg-gray-700 focus:outline-none"
                />
              </div>
              <div className="flex flex-col space-y-2">
                <label
                  htmlFor={`lastName-${contact.id}`}
                  className="text-white font-semibold text-lg"
                >
                  Last Name:
                </label>
                <input
                  type="text"
                  id={`lastName-${contact.id}`}
                  name="lastName"
                  value={contact.lastName}
                  onChange={(event) => handleInputChange(event, contact.id)}
                  className="h-12 p-2 w-70vw border-2 border-green-500 rounded-lg text-white bg-gray-700 focus:outline-none"
                />
              </div>
              <div className="flex flex-col space-y-2">
                <label
                  htmlFor={`jobTitle-${contact.id}`}
                  className="text-white font-semibold text-lg"
                >
                  Job Title:
                </label>
                <input
                  type="text"
                  id={`jobTitle-${contact.id}`}
                  name="jobTitle"
                  value={contact.jobTitle}
                  onChange={(event) => handleInputChange(event, contact.id)}
                  className="h-12 p-2 w-70vw border-2 border-green-500 rounded-lg text-white bg-gray-700 focus:outline-none"
                />
              </div>
              <div className="flex flex-col space-y-2">
                <label
                  htmlFor={`phoneNumber-${contact.id}`}
                  className="text-white font-semibold text-lg"
                >
                  Phone Number:
                </label>
                <input
                  type="tel"
                  id={`phoneNumber-${contact.id}`}
                  name="phoneNumber"
                  value={contact.phoneNumber}
                  onChange={(event) => handleInputChange(event, contact.id)}
                  className="h-12 p-2 w-70vw border-2 border-green-500 rounded-lg text-white bg-gray-700 focus:outline-none"
                />
              </div>
              <div className="flex flex-col space-y-2">
                <label
                  htmlFor={`skypeId-${contact.id}`}
                  className="text-white font-semibold text-lg"
                >
                  Skype ID:
                </label>
                <input
                  type="text"
                  id={`skypeId-${contact.id}`}
                  name="skypeId"
                  value={contact.skypeId}
                  onChange={(event) => handleInputChange(event, contact.id)}
                  className="h-12 p-2 w-70vw border-2 border-green-500 rounded-lg text-white bg-gray-700 focus:outline-none"
                />
              </div>
              <div className="flex flex-col space-y-2">
                <label
                  htmlFor={`telegramId-${contact.id}`}
                  className="text-white font-semibold text-lg"
                >
                  Telegram ID:
                </label>
                <input
                  type="text"
                  id={`telegramId-${contact.id}`}
                  name="telegramId"
                  value={contact.telegramId}
                  onChange={(event) => handleInputChange(event, contact.id)}
                  className="h-12 p-2 w-70vw border-2 border-green-500 rounded-lg text-white bg-gray-700 focus:outline-none"
                />
              </div>
            </>
          ) : (
            <button
              type="button"
              onClick={() => handleToggleContact(contact.id)}
              className="w-full h-10 bg-gray-700 text-white rounded-lg border-2 border-green-500 font-semibold flex items-center"
            >
              {contact.firstName !== "" ? (
                <>
                  <span className="mr-auto ml-10"> {contact.firstName}</span>
                </>
              ) : (
                <>
                  <span className="mr-auto ml-10 text-slate-400">
                    {" "}
                    Your Name
                  </span>
                </>
              )}
              <span className="text-2xl ml-auto mr-10">&#43;</span>
            </button>
          )}
        </div>
      ))}
      {!isFieldsFilled && (
        <p className="text-red-500 font-semibold">
          Please fill all the fields before adding a new contact.
        </p>
      )}
      <button
        type="button"
        onClick={handleAddContact}
        // onClick={() => {
        //   handleAddContact, postData();
        // }}
        // onClick={()=>{postData()}}
        className="bg-gray-700 h-10 text-white rounded-lg border-2 border-green-500 font-semibold"
      >
        Add Contact
      </button>
    </div>
  );
};

export default Contact;
