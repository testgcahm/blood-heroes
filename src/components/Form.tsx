import React, { useState } from 'react';

// Google Form URL and entry keys
const GOOGLE_FORM_URL =
  'https://docs.google.com/forms/d/e/1FAIpQLSesY4e3Igrh0XPllmyGXKvMTN2Pj4G6GzA6w8jI4VGUAWXUYg/formResponse';
const ENTRY_KEYS = [
  'entry.150065395', // Name
  'entry.1464641355', // Email
  'entry.368614909', // Phone
  'entry.1850773060', // Blood Group
  'entry.741866530', // Gender
  'entry.1393468182', // City
  'entry.1282102385', // Age
  'entry.1267604661', // Last Donation Date (year)
  'entry.2113193451', // Last Donation Date (month)
  'entry.1727516375', // Last Donation Date (day)
  'entry.870661058', // Willing to donate
  'entry.1259821872', // Emergency Contact
  'entry.508092005', // Institute
  'entry.818348265', // Address
  'entry.1203586957_year', // DOB year
  'entry.1203586957_month', // DOB month
  'entry.1203586957_day', // DOB day
  'entry.706128420', // Any disease
  'entry.831136185', // Message
];

const initialState = {
  name: '',
  email: '',
  phone: '',
  bloodGroup: '',
  gender: '',
  city: '',
  age: '',
  lastDonationYear: '',
  lastDonationMonth: '',
  lastDonationDay: '',
  willing: '',
  emergency: '',
  institute: '',
  address: '',
  dobYear: '',
  dobMonth: '',
  dobDay: '',
  disease: '',
  message: '',
};

const bloodGroups = [
  'A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'
];
const genders = ['Male', 'Female', 'Other'];
const willingOptions = ['Yes', 'No'];

const Form = () => {
  const [form, setForm] = useState(initialState);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess(false);
    // Map form fields to Google Form entry keys
    const data = new FormData();
    data.append(ENTRY_KEYS[0], form.name);
    data.append(ENTRY_KEYS[1], form.email);
    data.append(ENTRY_KEYS[2], form.phone);
    data.append(ENTRY_KEYS[3], form.bloodGroup);
    data.append(ENTRY_KEYS[4], form.gender);
    data.append(ENTRY_KEYS[5], form.city);
    data.append(ENTRY_KEYS[6], form.age);
    data.append(ENTRY_KEYS[7], form.lastDonationYear);
    data.append(ENTRY_KEYS[8], form.lastDonationMonth);
    data.append(ENTRY_KEYS[9], form.lastDonationDay);
    data.append(ENTRY_KEYS[10], form.willing);
    data.append(ENTRY_KEYS[11], form.emergency);
    data.append(ENTRY_KEYS[12], form.institute);
    data.append(ENTRY_KEYS[13], form.address);
    data.append(ENTRY_KEYS[14], form.dobYear);
    data.append(ENTRY_KEYS[15], form.dobMonth);
    data.append(ENTRY_KEYS[16], form.dobDay);
    data.append(ENTRY_KEYS[17], form.disease);
    data.append(ENTRY_KEYS[18], form.message);
    try {
      await fetch(GOOGLE_FORM_URL, {
        method: 'POST',
        mode: 'no-cors',
        body: data,
      });
      setSuccess(true);
      setForm(initialState);
    } catch (err) {
      setError('Submission failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="w-full max-w-xl mx-auto bg-white rounded-2xl shadow-lg border border-red-200 p-8 my-8">
      <h2 className="text-3xl font-bold text-red-800 mb-6 text-center">Blood Donation Form</h2>
      {success && (
        <div className="mb-4 p-3 bg-green-100 text-green-800 rounded text-center font-semibold">Thank you! Your response has been recorded.</div>
      )}
      {error && (
        <div className="mb-4 p-3 bg-red-100 text-red-800 rounded text-center font-semibold">{error}</div>
      )}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-semibold text-red-900 mb-1">Full Name *</label>
          <input name="name" value={form.name} onChange={handleChange} required className="w-full p-3 border rounded-lg focus:outline-none focus:ring-1 focus:ring-red-800 border-gray-300" placeholder="Enter your name" />
        </div>
        <div>
          <label className="block font-semibold text-red-900 mb-1">Email *</label>
          <input name="email" type="email" value={form.email} onChange={handleChange} required className="w-full p-3 border rounded-lg focus:outline-none focus:ring-1 focus:ring-red-800 border-gray-300" placeholder="Enter your email" />
        </div>
        <div>
          <label className="block font-semibold text-red-900 mb-1">Phone *</label>
          <input name="phone" value={form.phone} onChange={handleChange} required className="w-full p-3 border rounded-lg focus:outline-none focus:ring-1 focus:ring-red-800 border-gray-300" placeholder="03XXXXXXXXX" />
        </div>
        <div>
          <label className="block font-semibold text-red-900 mb-1">Blood Group *</label>
          <select name="bloodGroup" value={form.bloodGroup} onChange={handleChange} required className="w-full p-3 border rounded-lg focus:outline-none focus:ring-1 focus:ring-red-800 border-gray-300">
            <option value="">Select</option>
            {bloodGroups.map(bg => <option key={bg} value={bg}>{bg}</option>)}
          </select>
        </div>
        <div>
          <label className="block font-semibold text-red-900 mb-1">Gender *</label>
          <select name="gender" value={form.gender} onChange={handleChange} required className="w-full p-3 border rounded-lg focus:outline-none focus:ring-1 focus:ring-red-800 border-gray-300">
            <option value="">Select</option>
            {genders.map(g => <option key={g} value={g}>{g}</option>)}
          </select>
        </div>
        <div>
          <label className="block font-semibold text-red-900 mb-1">City *</label>
          <input name="city" value={form.city} onChange={handleChange} required className="w-full p-3 border rounded-lg focus:outline-none focus:ring-1 focus:ring-red-800 border-gray-300" placeholder="Enter your city" />
        </div>
        <div>
          <label className="block font-semibold text-red-900 mb-1">Age *</label>
          <input name="age" type="number" min="16" max="70" value={form.age} onChange={handleChange} required className="w-full p-3 border rounded-lg focus:outline-none focus:ring-1 focus:ring-red-800 border-gray-300" placeholder="Enter your age" />
        </div>
        <div>
          <label className="block font-semibold text-red-900 mb-1">Last Donation Date</label>
          <div className="flex gap-2">
            <input name="lastDonationYear" type="number" min="1900" max="2100" value={form.lastDonationYear} onChange={handleChange} className="w-1/3 p-3 border rounded-lg focus:outline-none focus:ring-1 focus:ring-red-800 border-gray-300" placeholder="Year" />
            <input name="lastDonationMonth" type="number" min="1" max="12" value={form.lastDonationMonth} onChange={handleChange} className="w-1/3 p-3 border rounded-lg focus:outline-none focus:ring-1 focus:ring-red-800 border-gray-300" placeholder="Month" />
            <input name="lastDonationDay" type="number" min="1" max="31" value={form.lastDonationDay} onChange={handleChange} className="w-1/3 p-3 border rounded-lg focus:outline-none focus:ring-1 focus:ring-red-800 border-gray-300" placeholder="Day" />
          </div>
        </div>
        <div>
          <label className="block font-semibold text-red-900 mb-1">Are you willing to donate? *</label>
          <select name="willing" value={form.willing} onChange={handleChange} required className="w-full p-3 border rounded-lg focus:outline-none focus:ring-1 focus:ring-red-800 border-gray-300">
            <option value="">Select</option>
            {willingOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
          </select>
        </div>
        <div>
          <label className="block font-semibold text-red-900 mb-1">Emergency Contact *</label>
          <input name="emergency" value={form.emergency} onChange={handleChange} required className="w-full p-3 border rounded-lg focus:outline-none focus:ring-1 focus:ring-red-800 border-gray-300" placeholder="Emergency contact number" />
        </div>
        <div>
          <label className="block font-semibold text-red-900 mb-1">Institute</label>
          <input name="institute" value={form.institute} onChange={handleChange} className="w-full p-3 border rounded-lg focus:outline-none focus:ring-1 focus:ring-red-800 border-gray-300" placeholder="Your institute (optional)" />
        </div>
        <div>
          <label className="block font-semibold text-red-900 mb-1">Address</label>
          <input name="address" value={form.address} onChange={handleChange} className="w-full p-3 border rounded-lg focus:outline-none focus:ring-1 focus:ring-red-800 border-gray-300" placeholder="Your address (optional)" />
        </div>
        <div>
          <label className="block font-semibold text-red-900 mb-1">Date of Birth</label>          <div className="flex gap-2">
            <input name="dobYear" type="number" min="1900" max="2100" value={form.dobYear} onChange={handleChange} className="w-1/3 p-3 border rounded-lg focus:outline-none focus:ring-1 focus:ring-red-800 border-gray-300" placeholder="Year" />
            <input name="dobMonth" type="number" min="1" max="12" value={form.dobMonth} onChange={handleChange} className="w-1/3 p-3 border rounded-lg focus:outline-none focus:ring-1 focus:ring-red-800 border-gray-300" placeholder="Month" />
            <input name="dobDay" type="number" min="1" max="31" value={form.dobDay} onChange={handleChange} className="w-1/3 p-3 border rounded-lg focus:outline-none focus:ring-1 focus:ring-red-800 border-gray-300" placeholder="Day" />
          </div>
        </div>
        <div>
          <label className="block font-semibold text-red-900 mb-1">Any disease/condition?</label>
          <input name="disease" value={form.disease} onChange={handleChange} className="w-full p-3 border rounded-lg focus:outline-none focus:ring-1 focus:ring-red-800 border-gray-300" placeholder="Mention if any (optional)" />
        </div>
        <div>
          <label className="block font-semibold text-red-900 mb-1">Message</label>
          <textarea name="message" value={form.message} onChange={handleChange} className="w-full p-3 border rounded-lg focus:outline-none focus:ring-1 focus:ring-red-800 border-gray-300" placeholder="Any message (optional)" rows={3} />
        </div>
        <button
          type="submit"
          className="w-full bg-red-800 font-semibold text-white p-3 rounded-lg hover:bg-red-900 hover:scale-[1.02] transition-all duration-300 shadow-md flex justify-center items-center disabled:opacity-60 disabled:cursor-not-allowed"
          disabled={loading}
        >
          {loading ? <span className="animate-spin border-4 border-white border-t-transparent rounded-full w-6 h-6 inline-block"></span> : 'Submit'}
        </button>
      </form>
    </section>
  );
};

export default Form;
