import React, { useState } from 'react';

// Google Form URL and entry keys
const GOOGLE_FORM_URL =
    'https://docs.google.com/forms/d/e/1FAIpQLSesY4e3Igrh0XPllmyGXKvMTN2Pj4G6GzA6w8jI4VGUAWXUYg/formResponse';
const ENTRY_KEYS = [
    'entry.150065395', // Name
    'entry.1464641355', // Father Name
    'entry.368614909', // Email
    'entry.1850773060', // Age
    'entry.741866530', // Gender
    'entry.1393468182', // Institute (College/Hospital)
    'entry.1282102385', // Degree/Designation
    'entry.1267604661', // Department/Ward
    'entry.2113193451', // Contact Number (WhatsApp)
    'entry.1727516375', // Residence (City Name)
    'entry.870661058', // Blood Group
    'entry.1259821872', // Have you ever done screening of your blood? (Hepatitis, HIV etc)
    'entry.508092005', // Have you ever been suffered from any chronic illness? (TB, Hepatitis etc)
    'entry.818348265', // Have you ever donated blood?
    'entry.1203586957_year', // If yes, when did you donate last time? Year
    'entry.1203586957_month', // If yes, when did you donate last time? month
    'entry.1203586957_day', // If yes, when did you donate last time? day
    'entry.706128420', // How many times have you donated blood if you did?
    'entry.831136185', // Are you willing to donate if needed?
    'entry.1853889000' // Recorded Email
];

const initialState = {
    name: '',
    fatherName: '',
    email: '',
    age: '',
    gender: '',
    institute: '',
    designation: '',
    department: '',
    contactNumber: '',
    residence: '',
    bloodGroup: '',
    bloodScreening: '',
    chronicIllness: '',
    everDonated: '',
    lastDonationYear: '',
    lastDonationMonth: '',
    lastDonationDay: '',
    donationCount: '',
    willingToDonate: '',
    recordedEmail: ''
};

const bloodGroups = [
    'A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-', "Don't know"
];
const genders = ['Male', 'Female'];
const yesNoOptions = ['Yes', 'No'];

interface FormProps {
    userEmail: string;
}

const Form = ({ userEmail }: FormProps) => {
    
    const [form, setForm] = useState({
        ...initialState,
        email: userEmail,
        recordedEmail: userEmail
    });
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState('');
    // Add a handler for date input to sync year/month/day
    const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const dateValue = e.target.value; // format: YYYY-MM-DD
        if (dateValue) {
            const [year, month, day] = dateValue.split('-');
            setForm({
                ...form,
                lastDonationYear: year,
                lastDonationMonth: month,
                lastDonationDay: day,
            });
        } else {
            setForm({
                ...form,
                lastDonationYear: '',
                lastDonationMonth: '',
                lastDonationDay: '',
            });
        }
    };
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
        data.append(ENTRY_KEYS[1], form.fatherName);
        data.append(ENTRY_KEYS[2], form.email);
        data.append(ENTRY_KEYS[3], form.age);
        data.append(ENTRY_KEYS[4], form.gender);
        data.append(ENTRY_KEYS[5], form.institute);
        data.append(ENTRY_KEYS[6], form.designation);
        data.append(ENTRY_KEYS[7], form.department);
        data.append(ENTRY_KEYS[8], form.contactNumber);
        data.append(ENTRY_KEYS[9], form.residence);
        data.append(ENTRY_KEYS[10], form.bloodGroup);
        data.append(ENTRY_KEYS[11], form.bloodScreening);
        data.append(ENTRY_KEYS[12], form.chronicIllness);
        data.append(ENTRY_KEYS[13], form.everDonated);
        data.append(ENTRY_KEYS[14], form.lastDonationYear || '');
        data.append(ENTRY_KEYS[15], form.lastDonationMonth || '');
        data.append(ENTRY_KEYS[16], form.lastDonationDay || '');
        data.append(ENTRY_KEYS[17], form.donationCount || '');
        data.append(ENTRY_KEYS[18], form.willingToDonate);
        data.append(ENTRY_KEYS[19], form.recordedEmail);
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
        <section className="w-full max-w-xl mx-auto bg-white rounded-2xl shadow-lg border border-red-200 p-8 max-[500px]:px-4 max-[320px]:px-2 my-8">
            <h2 className="text-3xl font-bold text-red-800 mb-6 text-center">Blood Donation Form</h2>
            {success && (
                <div className="mb-4 p-3 bg-green-100 text-green-800 rounded text-center font-semibold">Thank you! Your response has been recorded.</div>
            )}
            {error && (
                <div className="mb-4 p-3 bg-red-100 text-red-800 rounded text-center font-semibold">{error}</div>
            )}
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block font-semibold text-red-900 mb-1">Full Name <span className="text-red-500">*</span></label>
                    <input name="name" value={form.name} onChange={handleChange} required className="w-full p-3 border rounded-lg focus:outline-none focus:ring-1 focus:ring-red-800 border-gray-300" placeholder="Enter your name" />
                </div>

                <div>
                    <label className="block font-semibold text-red-900 mb-1">Father's Name <span className="text-red-500">*</span></label>
                    <input name="fatherName" value={form.fatherName} onChange={handleChange} required className="w-full p-3 border rounded-lg focus:outline-none focus:ring-1 focus:ring-red-800 border-gray-300" placeholder="Enter your father's name" />
                </div>

                <div>
                    <label className="block font-semibold text-red-900 mb-1">Email <span className="text-red-500">*</span></label>
                    <input name="email" type="email" value={form.email} onChange={handleChange} required className="w-full p-3 border rounded-lg focus:outline-none focus:ring-1 focus:ring-red-800 border-gray-300" placeholder="Enter your email" />
                </div>

                <div>
                    <label className="block font-semibold text-red-900 mb-1">Age <span className="text-red-500">*</span></label>
                    <input name="age" type="number" min={5} max={80} value={form.age} onChange={handleChange} required className="w-full p-3 border rounded-lg focus:outline-none focus:ring-1 focus:ring-red-800 border-gray-300" placeholder="Enter your age" />
                </div>

                <div>
                    <label className="block font-semibold text-red-900 mb-1">Gender <span className="text-red-500">*</span></label>
                    <select name="gender" value={form.gender} onChange={handleChange} required className="w-full p-3 border rounded-lg focus:outline-none focus:ring-1 focus:ring-red-800 border-gray-300 cursor-pointer">
                        <option value="">Select</option>
                        {genders.map(g => <option key={g} value={g}>{g}</option>)}
                    </select>
                </div>

                <div>
                    <label className="block font-semibold text-red-900 mb-1">Institute (College/Hospital) <span className="text-red-500">*</span></label>
                    <input name="institute" value={form.institute} onChange={handleChange} required className="w-full p-3 border rounded-lg focus:outline-none focus:ring-1 focus:ring-red-800 border-gray-300" placeholder="Enter your institute" />
                </div>

                <div>
                    <label className="block font-semibold text-red-900 mb-1">Degree/Designation <span className="text-red-500">*</span></label>
                    <input name="designation" value={form.designation} onChange={handleChange} required className="w-full p-3 border rounded-lg focus:outline-none focus:ring-1 focus:ring-red-800 border-gray-300" placeholder="Enter your degree or designation" />
                </div>

                <div>
                    <label className="block font-semibold text-red-900 mb-1">Department/Ward</label>
                    <input name="department" value={form.department} onChange={handleChange} className="w-full p-3 border rounded-lg focus:outline-none focus:ring-1 focus:ring-red-800 border-gray-300" placeholder="Enter your department or ward" />
                </div>

                <div>
                    <label className="block font-semibold text-red-900 mb-1">Contact Number (WhatsApp) <span className="text-red-500">*</span></label>
                    <input name="contactNumber" value={form.contactNumber} onChange={handleChange} required className="w-full p-3 border rounded-lg focus:outline-none focus:ring-1 focus:ring-red-800 border-gray-300" placeholder="Enter your WhatsApp number" />
                </div>

                <div>
                    <label className="block font-semibold text-red-900 mb-1">Residence (City Name) <span className="text-red-500">*</span></label>
                    <input name="residence" value={form.residence} onChange={handleChange} required className="w-full p-3 border rounded-lg focus:outline-none focus:ring-1 focus:ring-red-800 border-gray-300" placeholder="Enter your city of residence" />
                </div>

                <div>
                    <label className="block font-semibold text-red-900 mb-1">Blood Group <span className="text-red-500">*</span></label>
                    <select name="bloodGroup" value={form.bloodGroup} onChange={handleChange} required className="w-full cursor-pointer p-3 border rounded-lg focus:outline-none focus:ring-1 focus:ring-red-800 border-gray-300">
                        <option value="" className='cursor-pointer'>Select</option>
                        {bloodGroups.map(bg => <option key={bg} value={bg} className='cursor-pointer'>{bg}</option>)}
                    </select>
                </div>

                <div>
                    <label className="block font-semibold text-red-900 mb-1">Have you ever done screening of your blood? (Hepatitis, HIV etc) <span className="text-red-500">*</span></label>
                    <div className="flex gap-6">
                        {yesNoOptions.map(opt => (
                            <label key={opt} className="inline-flex items-center gap-1">
                                <input
                                    type="radio"
                                    name="bloodScreening"
                                    value={opt}
                                    checked={form.bloodScreening === opt}
                                    onChange={handleChange}
                                    required
                                    className="cursor-pointer"
                                />
                                {opt}
                            </label>
                        ))}
                    </div>
                </div>

                <div>
                    <label className="block font-semibold text-red-900 mb-1">Have you ever been suffered from any chronic illness? (TB, Hepatitis etc) <span className="text-red-500">*</span></label>
                    <div className="flex gap-6">
                        {yesNoOptions.map(opt => (
                            <label key={opt} className="inline-flex items-center gap-1">
                                <input
                                    type="radio"
                                    name="chronicIllness"
                                    value={opt}
                                    checked={form.chronicIllness === opt}
                                    onChange={handleChange}
                                    required
                                    className="cursor-pointer"
                                />
                                {opt}
                            </label>
                        ))}
                    </div>
                </div>

                <div>
                    <label className="block font-semibold text-red-900 mb-1">Have you ever donated blood? <span className="text-red-500">*</span></label>
                    <div className="flex gap-6">
                        {yesNoOptions.map(opt => (
                            <label key={opt} className="inline-flex items-center gap-1">
                                <input
                                    type="radio"
                                    name="everDonated"
                                    value={opt}
                                    checked={form.everDonated === opt}
                                    onChange={handleChange}
                                    required
                                    className="cursor-pointer"
                                />
                                {opt}
                            </label>
                        ))}
                    </div>
                </div>

                {/* Conditional fields: only show if everDonated is 'Yes' */}
                {form.everDonated === 'Yes' && (
                    <>
                        <div>
                            <label className="block font-semibold text-red-900 mb-1">If yes, when did you donate last time?</label>
                            <div className="flex gap-2 items-center">
                                {/* Calendar input */}
                                <input
                                    type="date"
                                    className="p-3 border rounded-lg focus:outline-none focus:ring-1 focus:ring-red-800 border-gray-300 cursor-pointer"
                                    value={form.lastDonationYear && form.lastDonationMonth && form.lastDonationDay ? `${form.lastDonationYear}-${form.lastDonationMonth.padStart(2, '0')}-${form.lastDonationDay.padStart(2, '0')}` : ''}
                                    onChange={handleDateChange}
                                    max={new Date().toISOString().split('T')[0]}
                                    placeholder="Pick date"
                                />
                            </div>
                        </div>
                        <div>
                            <label className="block font-semibold text-red-900 mb-1">How many times have you donated blood if you did?</label>
                            <input name="donationCount" type="number" min="0" value={form.donationCount} onChange={handleChange} className="w-full p-3 border rounded-lg focus:outline-none focus:ring-1 focus:ring-red-800 border-gray-300" placeholder="Enter number of donations" />
                        </div>
                    </>
                )}

                <div>
                    <label className="block font-semibold text-red-900 mb-1">Are you willing to donate if needed? <span className="text-red-500">*</span></label>
                    <div className="flex gap-6">
                        {yesNoOptions.map(opt => (
                            <label key={opt} className="inline-flex items-center gap-1">
                                <input
                                    type="radio"
                                    name="willingToDonate"
                                    value={opt}
                                    checked={form.willingToDonate === opt}
                                    onChange={handleChange}
                                    required
                                    className="cursor-pointer"
                                />
                                {opt}
                            </label>
                        ))}
                    </div>
                </div>

                <button
                    type="submit"
                    className="w-full cursor-pointer bg-red-800 font-semibold text-white p-3 rounded-lg hover:bg-red-900 hover:scale-[1.02] transition-all duration-300 shadow-md flex justify-center items-center disabled:opacity-60 disabled:cursor-not-allowed"
                    disabled={loading}
                >
                    {loading ? <span className="animate-spin border-4 border-white border-t-transparent rounded-full w-6 h-6 inline-block"></span> : 'Submit'}
                </button>
            </form>
        </section>
    );
};

export default Form;
