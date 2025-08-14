// import { useEffect, useState } from "react";
// import { Listbox } from "@headlessui/react";
// import { motion, AnimatePresence } from "framer-motion";
// import { ChevronUpDownIcon } from "@heroicons/react/20/solid";

// const stages = [
//   "4 month",
//   "3 month",
//   "2 month",
//   "1 month",
//   "Hotsite",
//   "Site on hold",
//   "Red marked",
//   "No response",
//   "Purchased",
//   "Not Interested",
// ];

// const roles = [
//   "Architect",
//   "Builder",
//   "Owner",
//   "Supervisor",
//   "Purchaser",
//   "Engineer",
//   "Contractor",
// ];

// function CustomDropdown({ label, value, onChange, options }) {
//   return (
//     <div className="w-full">
//       <Listbox value={value} onChange={onChange}>
//         {({ open }) => (
//           <div className="relative">
//             <Listbox.Button className="w-full rounded-xl border px-4 py-2 text-left bg-white shadow-md flex justify-between items-center">
//               {value || label}
//               <ChevronUpDownIcon className="w-5 h-5 text-gray-400" />
//             </Listbox.Button>
//             <AnimatePresence>
//               {open && (
//                 <Listbox.Options
//                   as={motion.ul}
//                   initial={{ opacity: 0, y: -10 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   exit={{ opacity: 0, y: -10 }}
//                   className="absolute mt-2 max-h-60 w-full overflow-auto rounded-xl bg-white shadow-lg z-10 border"
//                 >
//                   {options.map((opt) => (
//                     <Listbox.Option
//                       key={opt}
//                       value={opt}
//                       className={({ active }) =>
//                         `px-4 py-2 cursor-pointer ${
//                           active ? "bg-purple-100" : ""
//                         }`
//                       }
//                     >
//                       {opt}
//                     </Listbox.Option>
//                   ))}
//                 </Listbox.Options>
//               )}
//             </AnimatePresence>
//           </div>
//         )}
//       </Listbox>
//     </div>
//   );
// }

// export function VisitForm() {
//   const [loading, setLoading] = useState(false);

//   const initialForm = {
//     agent: "",
//     role1: "",
//     name1: "",
//     phone1: "",
//     role2: "",
//     name2: "",
//     phone2: "",
//     revisit: "Fresh",
//     area: "",
//     subArea: "",
//     address: "",
//     remarks: "",
//     followUp: "",
//     stage: "",
//     sqyd: "",
//     date: "",
//     image: null,
//     lat: "",
//     lng: "",
//   };
//   const [form, setForm] = useState(initialForm);

//   useEffect(() => {
//     const today = new Date().toISOString().split("T")[0];
//     navigator.geolocation.getCurrentPosition((pos) => {
//       setForm((f) => ({
//         ...f,
//         lat: pos.coords.latitude,
//         lng: pos.coords.longitude,
//       }));
//     });

//     const agent = localStorage.getItem("agent");
//     const site = JSON.parse(localStorage.getItem("site") || "{}");

  
//     setForm((f) => ({
//       ...f,
//       date: today,
//       agent,
//       address: site.address || "",
//       area: site.area || "",
//       subArea: site.subArea || "",
//       name1: site.name1 || "",
//       phone1: site.phone1 || "",
//       role1: site.role1 || "",
//       name2: site.name2 || "",
//       phone2: site.phone2 || "",
//       role2: site.role || "",
//       revisit: site.revisit || "Fresh",
//       stage: site.stage || "",
//       sqyd: site.sqyd || ""
      
//     }));
//   }, []);

//   const handleChange = (e) => {
//     const { name, value, files } = e.target;
//     setForm({ ...form, [name]: files ? files[0] : value });
//   };

//   // const handleSubmit = () => {
//   //   console.log('Submit data:', form);
//   //   // Send to DB
//   //   // const row = [
//   //   // form.date, form.agent, form.area, form.name1, form.phone1,
//   //   // form.name2, form.phone2, form.stage, form.remarks];
//   // };

//   //   const handleSubmit = async () => {

//   //   try {
//   //     const response = await fetch("https://script.google.com/macros/s/AKfycbxXDDgGotuOE9AVc3i9KD4_bSyDhnE0LYwYTZ-dvYs_2dsFPoZ0l2YN8KZkm0e5SF-r/exec", {
//   //       method: "POST",
//   //       mode: "no-cors",
//   //       body: JSON.stringify(form),
//   //       headers: {
//   //         "Content-Type": "application/json"
//   //       }
//   //     });
//   //     const result = await response.text();
//   //     alert("Submitted: " + result);

//   //   } catch (err) {
//   //     console.error(err);
//   //     alert("Submission failed");
//   //   }
//   // };

//   const handleSubmit = (e) => {
//     if (loading) return; // Prevent double submit

//     setLoading(true);
//     e.preventDefault()
//     const url = "https://script.google.com/macros/s/AKfycbxXDDgGotuOE9AVc3i9KD4_bSyDhnE0LYwYTZ-dvYs_2dsFPoZ0l2YN8KZkm0e5SF-r/exec"
//     fetch(url,{
//       method : 'POST',
//       // headers: { "Content-Type" : "application/x-www-form-urlencoded"},
//       headers: {
//           "Content-Type": "application/json"
//        },
//       body: JSON.stringify(form),
//       }).then(res=>res.text()).then(data=>{
//         alert(data)
//       }).catch(error=>console.log(error))
//     }

//   //     if (!response.ok) throw new Error("Network response was not OK");
//   //     const result = await response.text();
//   //     alert("Submitted successfully!");

//   //     // Reset the form after submission
//   //     setForm({
//   //       ...initialForm,
//   //       agent: localStorage.getItem("agent") || "",
//   //       revisit: "Fresh",
//   //       date: new Date().toISOString().split("T")[0],
//   //       lat: form.lat,
//   //       lng: form.lng,
//   //     });
//   //   } catch (err) {
//   //     console.error("Submission failed:", err);
//   //     alert("Submission failed");
//   //   } finally {
//   //     setLoading(false);
//   //   }
//   // };

//   return (
//     <div className="max-w-3xl mx-auto p-6 space-y-6 bg-gradient-to-r from-blue-100 via-purple-100 to-pink-100 rounded-2xl shadow-md">
//       <h2 className="text-2xl font-bold text-center">Visit Information Form</h2>
//       {form.agent && (
//         <h1 className="text-2xl font-semibold text-center text-gray-600">
//           {" "}
//           Hey , {form.agent} 😊
//         </h1>
//       )}

//       {/* Section 1: Person Met */}
//       <div>
//         <h3 className="text-lg font-semibold mb-2">Primary Contact</h3>
//         <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
//           <CustomDropdown
//             label="Select Role"
//             value={form.role1}
//             onChange={(val) => setForm({ ...form, role1: val })}
//             options={roles}
//           />
//           <input
//             name="name1"
//             placeholder="Name"
//             className="input-field"
//             value={form.name1}
//             onChange={handleChange}
//           />
//           <input
//             name="phone1"
//             placeholder="Phone"
//             className="input-field"
//             value={form.phone1}
//             onChange={handleChange}
//           />
//         </div>
//       </div>

//       <div>
//         <h3 className="text-lg font-semibold mb-2">
//           Secondary Contact (Optional)
//         </h3>
//         <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
//           <CustomDropdown
//             label="Select Role"
//             value={form.role2}
//             onChange={(val) => setForm({ ...form, role2: val })}
//             options={roles}
//           />
//           <input
//             name="name2"
//             placeholder="Name"
//             className="input-field"
//             value={form.name2}
//             onChange={handleChange}
//           />
//           <input
//             name="phone2"
//             placeholder="Phone"
//             className="input-field"
//             value={form.phone2}
//             onChange={handleChange}
//           />
//         </div>
//       </div>

//       <div>
//         <h3 className="text-lg font-semibold mb-2">Site Details</h3>
//         <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//           <CustomDropdown
//             label="Select Stage"
//             value={form.stage}
//             onChange={(val) => setForm({ ...form, stage: val })}
//             options={stages}
//           />
//           <CustomDropdown
//             label="Visit Type"
//             value={form.revisit}
//             onChange={(val) => setForm({ ...form, revisit: val })}
//             options={["Fresh", "Revisit"]}
//           />
//           <input
//             name="sqyd"
//             placeholder="Size (sq. yd.)"
//             className="input-field"
//             value={form.sqyd}
//             onChange={handleChange}
//           />
//           <input
//             name="area"
//             placeholder="Area"
//             className="input-field"
//             value={form.area}
//             onChange={handleChange}
//           />
//           <input
//             name="subArea"
//             placeholder="Sub Area"
//             className="input-field"
//             value={form.subArea}
//             onChange={handleChange}
//           />
//           <input
//             name="address"
//             value={form.address}
//             className="input-field bg-gray-100"
//             readOnly
//           />
//         </div>
//       </div>

//       <div>
//         <h3 className="text-lg font-semibold mb-2">Remarks</h3>
//         <textarea
//           name="remarks"
//           placeholder="Marketing Agent Remarks"
//           className="input-field w-full"
//           value={form.remarks}
//           onChange={handleChange}
//         ></textarea>
//         <textarea
//           name="followUp"
//           placeholder="Follow-up Remarks"
//           className="input-field w-full mt-2"
//           value={form.followUp}
//           onChange={handleChange}
//         ></textarea>
//       </div>

//       <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//         <input
//           name="image"
//           type="file"
//           className="input-field"
//           onChange={handleChange}
//         />
//         <input
//           name="date"
//           value={form.date}
//           readOnly
//           className="input-field bg-gray-100"
//         />
//         <input
//           name="lat"
//           value={form.lat}
//           readOnly
//           className="input-field bg-gray-100"
//         />
//         <input
//           name="lng"
//           value={form.lng}
//           readOnly
//           className="input-field bg-gray-100"
//         />
//       </div>

//       {/* <button
//         className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg mt-6"
//         onClick={handleSubmit}
//       >
//         Submit Visit
//       </button> */}

//       <button
//         className={`w-full font-semibold py-2 rounded-lg mt-6 ${
//           loading
//             ? "bg-gray-400 cursor-not-allowed"
//             : "bg-blue-600 hover:bg-blue-700 text-white"
//         }`}
//         disabled={loading}
//         onClick={handleSubmit}
//       >
//         {loading ? "Submitting..." : "Submit Visit"}
//       </button>
//     </div>
//   );
// }


import { useState, useEffect } from "react";
import { Listbox } from "@headlessui/react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronUpDownIcon } from "@heroicons/react/20/solid";

const stages = [
  "4 month", "3 month", "2 month", "1 month", "Hotsite",
  "Site on hold", "Red marked", "No response",
  "Purchased", "Not Interested"
];

const roles = [
  "Architect", "Builder", "Owner",
  "Supervisor", "Purchaser", "Engineer", "Contractor"
];

function CustomDropdown({ label, value, onChange, options }) {
  return (
    <div className="w-full">
      <Listbox value={value} onChange={onChange}>
        {({ open }) => (
          <div className="relative">
            <Listbox.Button className="w-full rounded-xl border px-4 py-2 text-left bg-white shadow-md flex justify-between items-center">
              {value || label}
              <ChevronUpDownIcon className="w-5 h-5 text-gray-400" />
            </Listbox.Button>
            <AnimatePresence>
              {open && (
                <Listbox.Options
                  as={motion.ul}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute mt-2 max-h-60 w-full overflow-auto rounded-xl bg-white shadow-lg z-10 border"
                >
                  {options.map((opt) => (
                    <Listbox.Option
                      key={opt}
                      value={opt}
                      className={({ active }) =>
                        `px-4 py-2 cursor-pointer ${active ? "bg-purple-100" : ""}`
                      }
                    >
                      {opt}
                    </Listbox.Option>
                  ))}
                </Listbox.Options>
              )}
            </AnimatePresence>
          </div>
        )}
      </Listbox>
    </div>
  );
}

export function VisitForm() {
  const [form, setForm] = useState({
    date: "",agent: "", role1: "", name1: "", phone1: "",
    role2: "", name2: "", phone2: "", revisit: "Fresh",
    area: "", subArea: "", address: "", stage: "", sqyd: "",
    remarks: "", followUp: "", lat: "", lng: "",siteID: ""
  });

  const [loading, setLoading] = useState(false);

  // useEffect(() => {
  //   const today = new Date().toISOString().split("T")[0];
  //   navigator.geolocation.getCurrentPosition((pos) => {
  //     setForm((prev) => ({
  //       ...prev,
  //       lat: pos.coords.latitude,
  //       lng: pos.coords.longitude,
  //       date: today,
  //       agent: localStorage.getItem("agent") || "",
  //     }));
  //   });

  //   const site = JSON.parse(localStorage.getItem("site") || "{}");
  //   setForm((f) => ({
  //     ...f,
  //     address: site.address || "",
  //     area: site.area || "",
  //     subArea: site.subArea || "",
  //     name1: site.name1 || "",
  //     phone1: site.phone1 || "",
  //     role1: site.role1 || "",
  //     name2: site.name2 || "",
  //     phone2: site.phone2 || "",
  //     role2: site.role2 || "",
  //     revisit: site.revisit || "Fresh",
  //     stage: site.stage || "",
  //     sqyd: site.sqyd || "",
  //     siteID : site.siteID || ""
  //   }));
  // }, []);

// useEffect(() => {
//   const today = new Date().toISOString().split("T")[0];

//   navigator.geolocation.getCurrentPosition((pos) => {
//     const lat = pos.coords.latitude;
//     const lng = pos.coords.longitude;

//     const site = JSON.parse(localStorage.getItem("site") || "{}");

//     setForm((prev) => ({
//       ...prev,
//       lat,
//       lng,
//       date: today,
//       agent: localStorage.getItem("agent") || "",
//       address: site.address || "",
//       area: site.area || "",
//       subArea: site.subArea || "",
//       name1: site.name1 || "",
//       phone1: site.phone1 || "",
//       role1: site.role1 || "",
//       name2: site.name2 || "",
//       phone2: site.phone2 || "",
//       role2: site.role2 || "",
//       revisit: site.revisit || "Fresh",
//       stage: site.stage || "",
//       sqyd: site.sqyd || "",
//       siteID: site.siteID || ""
//     }));
//   });
// }, []);

// useEffect(() => {
//   const today = new Date().toISOString().split("T")[0];
//   navigator.geolocation.getCurrentPosition((position) => {
//     const lat = position.coords.latitude;
//     const lng = position.coords.longitude;

//     const storedSite = JSON.parse(localStorage.getItem("site") || "{}");
//     const isNew = storedSite.new === true;

//     setForm((prev) => ({
//       ...prev,
//       date: today,
//       lat,
//       lng,
//       agent: localStorage.getItem("agent") || "",
//       siteID: storedSite.SiteID || "",
//       address: isNew ? "" : storedSite.address || "",
//       area: isNew ? "" : storedSite.area || "",
//       subArea: isNew ? "" : storedSite.subArea || "",
//       name1: isNew ? "" : storedSite.name1 || "",
//       phone1: isNew ? "" : storedSite.phone1 || "",
//       role1: isNew ? "" : storedSite.role1 || "",
//       name2: isNew ? "" : storedSite.name2 || "",
//       phone2: isNew ? "" : storedSite.phone2 || "",
//       role2: isNew ? "" : storedSite.role2 || "",
//       revisit: isNew ? "Fresh" : storedSite.revisit || "Fresh",
//       stage: isNew ? "" : storedSite.stage || "",
//       sqyd: isNew ? "" : storedSite.sqyd || ""
//     }));
//   });
// }, []);

useEffect(() => {
  const today = new Date().toISOString().split("T")[0];
  navigator.geolocation.getCurrentPosition(async (position) => {
    const lat = position.coords.latitude;
    const lng = position.coords.longitude;

    const storedSite = JSON.parse(localStorage.getItem("site") || "{}");
    const isNew = storedSite.new === true;
    const siteID = storedSite.SiteID || "";

    let latest = {};

    if (!isNew && siteID) {
      try {
        const res = await fetch(`http://localhost:5000/api/sites/${siteID}/latest`);
        const data = await res.json();
        latest = data || {};
      } catch (err) {
        console.error("Error fetching latest site data", err);
      }
    }

    // Set form state with GPS, agent, date + conditionally prefilled data
    setForm((prev) => ({
      ...prev,
      lat,
      lng,
      date: today,
      agent: localStorage.getItem("agent") || "",
      siteID: siteID,
      // pre-fill only if it's not a new site
      address: isNew ? "" : latest.Address || "",
      area: isNew ? "" : latest.Area || "",
      subArea: isNew ? "" : latest.SubArea || "",
      name1: isNew ? "" : latest.Name1 || "",
      phone1: isNew ? "" : latest.Phone1 || "",
      role1: isNew ? "" : latest.Role1 || "",
      name2: isNew ? "" : latest.Name2 || "",
      phone2: isNew ? "" : latest.Phone2 || "",
      role2: isNew ? "" : latest.Role2 || "",
      revisit: isNew ? "Fresh" : latest.Revisit || "Fresh",
      stage: isNew ? "" : latest.Stage || "",
      sqyd: isNew ? "" : latest.Sqyd || "",
      remarks : isNew ? "" : latest.remarks || "",
      followUp : isNew ? "" : latest.followUp || ""
    }));
  });
}, []);




  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // const handleSubmit = (e) => {
  //    if (loading) return; // Prevent double submit

  //    setLoading(true);
  //    e.preventDefault()
//     const url = "https://script.google.com/macros/s/AKfycbxXDDgGotuOE9AVc3i9KD4_bSyDhnE0LYwYTZ-dvYs_2dsFPoZ0l2YN8KZkm0e5SF-r/exec"
//     fetch(url,{
//       method : 'POST',
//       // headers: { "Content-Type" : "application/x-www-form-urlencoded"},
//       headers: {
//           "Content-Type": "application/json"
//        },
//       body: JSON.stringify(form),
//       }).then(res=>res.text()).then(data=>{
//         alert(data)
//       }).catch(error=>console.log(error))
//     }
  const handleSubmit = async(e) => {
    e.preventDefault()
    if (loading) return;
    setLoading(true);
   
   try {
    const response = await fetch("http://localhost:5000/api/submit",{
      method : "POST",
      headers : {"Content-Type": "application/json"},
      body : JSON.stringify(form),
    });
    
    const text = await response.json();
    alert(text.message || "Submitted Successfully");
   } catch (error) {
    console.log(error)
    alert("Submission failed")
   }finally{
    setLoading(false);
   }
  };
  

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-6 bg-gradient-to-r from-blue-100 via-purple-100 to-pink-100 rounded-2xl shadow-md">
      <h2 className="text-2xl font-bold text-center">Visit Information Form</h2>
      {form.agent && (
        <h1 className="text-2xl font-semibold text-center text-gray-600">
          Hey, {form.agent} 😊
        </h1>
      )}

      <div>
        <h3 className="text-lg font-semibold mb-2">Primary Contact</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <CustomDropdown
            label="Select Role"
            value={form.role1}
            onChange={(val) => setForm({ ...form, role1: val })}
            options={roles}
          />
          <input name="name1" placeholder="Name" className="input-field" value={form.name1} onChange={handleChange} />
          <input name="phone1" placeholder="Phone" className="input-field" value={form.phone1} onChange={handleChange} />
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-2">Secondary Contact (Optional)</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <CustomDropdown
            label="Select Role"
            value={form.role2}
            onChange={(val) => setForm({ ...form, role2: val })}
            options={roles}
          />
          <input name="name2" placeholder="Name" className="input-field" value={form.name2} onChange={handleChange} />
          <input name="phone2" placeholder="Phone" className="input-field" value={form.phone2} onChange={handleChange} />
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-2">Site Details</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <CustomDropdown label="Select Stage" value={form.stage} onChange={(val) => setForm({ ...form, stage: val })} options={stages} />
          <CustomDropdown label="Visit Type" value={form.revisit} onChange={(val) => setForm({ ...form, revisit: val })} options={["Fresh", "Revisit"]} />
          <input name="sqyd" placeholder="Size (sq. yd.)" className="input-field" value={form.sqyd} onChange={handleChange} />
          <input name="area" placeholder="Area" className="input-field" value={form.area} onChange={handleChange} />
          <input name="subArea" placeholder="Sub Area" className="input-field" value={form.subArea} onChange={handleChange} />
          <input name="address" value={form.address} className="input-field bg-gray-100" readOnly />
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-2">Remarks</h3>
        <textarea name="remarks" placeholder="Marketing Agent Remarks" className="input-field w-full" value={form.remarks} onChange={handleChange} />
        <textarea name="followUp" placeholder="Follow-up Remarks" className="input-field w-full mt-2" value={form.followUp} onChange={handleChange} />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <input name="date" value={form.date} readOnly className="input-field bg-gray-100" />
        <input name="lat" value={form.lat} readOnly className="input-field bg-gray-100" />
        <input name="lng" value={form.lng} readOnly className="input-field bg-gray-100" />
      </div>

      <button
        className={`w-full font-semibold py-2 rounded-lg mt-6 ${
          loading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700 text-white"
        }`}
        disabled={loading}
        onClick={handleSubmit}
      >
        {loading ? "Submitting..." : "Submit Visit"}
      </button>
    </div>
  );
}
