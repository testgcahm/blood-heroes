import React from 'react';

const SubmittedForm = () => {
    return (
        <section className="w-full max-w-xl mx-auto bg-white rounded-2xl shadow-lg border border-red-200 p-8 max-[500px]:px-4 max-[320px]:px-2 my-8 flex flex-col items-center justify-center">
            <svg width="64" height="64" fill="none" viewBox="0 0 24 24" className="mb-4 text-red-600"><circle cx="12" cy="12" r="12" fill="#FEE2E2"/><path d="M7 13l3 3 7-7" stroke="#B91C1C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
            <h2 className="text-2xl font-bold text-red-800 mb-2 text-center">Your response has been recorded</h2>
            <p className="text-red-700 text-center mb-6">Thank you for filling out the form.</p>
            <a href="/" className="text-red-800 font-semibold border-2 p-2 bg-red-800 text-white hover:bg-white hover:text-red-800 border-red-900 rounded">Submit another response</a>
        </section>
    );
};

export default SubmittedForm;
