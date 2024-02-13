import React, { useState } from "react";
import guestsData from "../local-json/Guests.json";
import companiesData from "../local-json/Companies.json";
import messageTemplates from "../local-json/MessageTemplates.json";
import "../styles/message.css";

const Message = () => {
  // use useState to handle selection of guest, company and message template.
  const [selectedGuestId, setSelectedGuestId] = useState(null);
  const [selectedCompanyId, setSelectedCompanyId] = useState(null);
  const [selectedTemplateId, setSelectedTemplateId] = useState(null);
  // const [previewText, setPreviewText] = useState('');

  // return a greeting variable that will change based on the time of day.
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) {
      return "Good morning";
    } else if (hour < 18) {
      return "Good afternoon";
    } else {
      return "Good evening";
    }
  };

  // function to generate a message with time-based greeting, selected company,
  // selected guest's full name, room number, check-out time, and selected message template.
  const generateMessage = () => {
    // return text when guest, company or message template is not selected.
    if (!selectedGuestId || !selectedCompanyId || !selectedTemplateId) {
      return "Please select guest, company, and template. Note that you can edit your text to enter in new template.";
    }

    const selectedGuest = guestsData.find(
      (guest) => guest.id === selectedGuestId
    );
    const selectedCompany = companiesData.find(
      (company) => company.id === selectedCompanyId
    );
    const selectedTemplate = messageTemplates.find(
      (template) => template.id === selectedTemplateId
    );

    // handle when there is an error fetching data from local json files.
    if (!selectedGuest || !selectedCompany || !selectedTemplate) {
      return "Error: Unable to find required data.";
    }

    // update the placeholders/variables within the selected message template.
    const message = selectedTemplate.template
      // use getGreeting() to get a greeting based on current time 
      .replace("{greeting}", getGreeting())
      .replace("{firstName}", selectedGuest.firstName)
      .replace("{lastName}", selectedGuest.lastName)
      .replace("{companyName}", selectedCompany.company)
      .replace("{roomNumber}", selectedGuest.reservation.roomNumber)
      // convert timestamp into date
      .replace("{checkoutTime}", new Date(selectedGuest.reservation.endTimestamp))

    return message;
  };

  return (
    <div className="App">
      <div className="select-component">
        <div>
          <div className="select-text">Select Company:</div>
        </div>
        <div>
          <select
            onChange={(e) => setSelectedCompanyId(parseInt(e.target.value))}
          >
            <option value="">Select Company</option>
            {companiesData.map((company) => (
              <option key={company.id} value={company.id}>
                {company.company}
              </option>
            ))}
          </select>
        </div>
        <div>
          <div className="select-text">Select Guest:</div>
        </div>
        <div>
          <select
            onChange={(e) => setSelectedGuestId(parseInt(e.target.value))}
          >
            <option value="">Select Guest</option>
            {guestsData.map((guest) => (
              <option key={guest.id} value={guest.id}>
                {guest.firstName} {guest.lastName}
              </option>
            ))}
          </select>
        </div>
        <div>
          <div className="select-text">Select Template:</div>
        </div>
        <div>
          <select
            onChange={(e) => setSelectedTemplateId(parseInt(e.target.value))}
          >
            <option value="">Select Template</option>
            {messageTemplates.map((template) => (
              <option key={template.id} value={template.id}>
                {template.name}
              </option>
            ))}
          </select>
        </div>

        <div className="preview-box" contentEditable="true">
          <div className="preview-text">{generateMessage()}</div>
        </div>
      </div>

      <div className="decorative-primary-button">
        <div
          className="button-2 w-button"
          onClick={() => alert(generateMessage())}
        >
          Send Message
        </div>
      </div>
    </div>
  );
};

export default Message;
