import React, { useState } from 'react';
import { X, Calendar, Clock, User, Phone, Mail, MapPin, FileText, Download, CheckCircle, Printer, QrCode } from 'lucide-react';

const BookingModal = ({ professional, onClose }) => {
  const [step, setStep] = useState(1); // 1: booking form, 2: confirmation, 3: appointment slip
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    dateOfBirth: '',
    selectedDate: '',
    selectedTime: '',
    reason: '',
    insuranceProvider: '',
    emergencyContact: '',
    emergencyPhone: ''
  });
  const [appointmentDetails, setAppointmentDetails] = useState(null);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const getAvailableDates = () => {
    const dates = [];
    const today = new Date();

    for (let i = 1; i <= 14; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      const dayName = date.toLocaleDateString('en-US', { weekday: 'long' }).toLowerCase();

      if (professional.availability[dayName] && professional.availability[dayName].length > 0) {
        dates.push({
          date: date.toISOString().split('T')[0],
          display: date.toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          }),
          dayName
        });
      }
    }

    return dates;
  };

  const getAvailableTimes = (selectedDate) => {
    if (!selectedDate) return [];

    // Generate hourly slots from 10 AM to 9 PM
    const timeSlots = [];
    for (let hour = 10; hour <= 21; hour++) {
      const time12 = hour > 12 ? `${hour - 12}:00 PM` : hour === 12 ? '12:00 PM' : `${hour}:00 AM`;
      timeSlots.push(time12);
    }

    return timeSlots;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Generate appointment ID
    const appointmentId = 'APT-' + Date.now().toString().slice(-6);

    // Create appointment details
    const appointment = {
      id: appointmentId,
      professional: professional,
      patient: {
        name: `${formData.firstName} ${formData.lastName}`,
        email: formData.email,
        phone: formData.phone,
        dateOfBirth: formData.dateOfBirth,
        insuranceProvider: formData.insuranceProvider,
        emergencyContact: formData.emergencyContact,
        emergencyPhone: formData.emergencyPhone
      },
      appointment: {
        date: formData.selectedDate,
        time: formData.selectedTime,
        reason: formData.reason,
        type: 'Initial Consultation',
        duration: '50 minutes',
        fee: professional.consultationFee
      },
      bookedAt: new Date().toISOString(),
      status: 'Confirmed'
    };

    setAppointmentDetails(appointment);
    setStep(2);
  };

  const handlePrint = () => {
    window.print();
  };

  const printAppointmentSlip = () => {
    const printWindow = window.open('', '_blank');
    if (!printWindow) {
      alert('Pop-up blocked! Please allow pop-ups for this site to print the appointment slip.');
      return;
    }
    const printContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>Appointment Slip - ${appointmentDetails.id}</title>
          <style>
  body {
  font-family: 'Courier New', monospace;
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  line-height: 1.6;
  color: #000; /* black text for both web and print */
  background: #fff; /* white background for both web and print */
}

  .header {
    text-align: center;
    border-bottom: 2px dashed #333;
    padding-bottom: 20px;
    margin-bottom: 20px;
    color: #000; /* Explicitly set */
  }
  .section {
    margin-bottom: 20px;
    padding-bottom: 15px;
    border-bottom: 1px solid #ddd;
    color: #000;
  }
  .section:last-child {
    border-bottom: none;
  }
  .section-title {
    font-weight: bold;
    margin-bottom: 10px;
    text-decoration: underline;
    color: #000;
  }
  .grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
  }
  .qr-placeholder {
    width: 100px;
    height: 100px;
    border: 2px dashed #666;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 10px auto;
    font-size: 12px;
    color: #666;
  }
  .footer {
    text-align: center;
    border-top: 2px dashed #333;
    padding-top: 15px;
    margin-top: 20px;
    font-size: 12px;
    color: #000;
  }
  
@media print {
  body {
    margin: 0;
    padding: 15px;
  }
}

</style>
 
        </head>
        <body>
          <div class="header">
            <h1>APPOINTMENT CONFIRMATION SLIP</h1>
            <p><strong>ID:</strong> ${appointmentDetails.id}</p>
            <p><strong>Status:</strong> ${appointmentDetails.status}</p>
            <div class="qr-placeholder">
              QR CODE<br>PLACEHOLDER
            </div>
          </div>

          <div class="grid" style="color: black;">
  <div class="section">
    <div class="section-title">PATIENT INFORMATION</div>
    <p><strong>Name:</strong> ${appointmentDetails.patient.name}</p>
    <p><strong>Email:</strong> ${appointmentDetails.patient.email}</p>
    <p><strong>Phone:</strong> ${appointmentDetails.patient.phone}</p>
    <p><strong>DOB:</strong> ${appointmentDetails.patient.dateOfBirth}</p>
    ${appointmentDetails.patient.insuranceProvider ? `<p><strong>Insurance:</strong> ${appointmentDetails.patient.insuranceProvider}</p>` : ''}
  </div>

  <div class="section">
    <div class="section-title">HEALTHCARE PROFESSIONAL</div>
    <p><strong>Name:</strong> ${appointmentDetails.professional.name}</p>
    <p><strong>Title:</strong> ${appointmentDetails.professional.title}</p>
    <p><strong>Specialization:</strong> ${appointmentDetails.professional.specialization}</p>
    <p><strong>Location:</strong> ${appointmentDetails.professional.location}</p>
  </div>
</div>


          <div class="section">
            <div class="section-title">APPOINTMENT DETAILS</div>
            <div class="grid">
              <div>
                <p><strong>Date:</strong> ${new Date(appointmentDetails.appointment.date).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })}</p>
                <p><strong>Time:</strong> ${appointmentDetails.appointment.time}</p>
                <p><strong>Duration:</strong> ${appointmentDetails.appointment.duration}</p>
              </div>
              <div>
                <p><strong>Type:</strong> ${appointmentDetails.appointment.type}</p>
                <p><strong>Fee:</strong> $${appointmentDetails.appointment.fee}</p>
                <p><strong>Reason:</strong> ${appointmentDetails.appointment.reason}</p>
              </div>
            </div>
          </div>

          <div class="footer">
            <p>Booked on: ${new Date(appointmentDetails.bookedAt).toLocaleString()}</p>
            <p><strong>IMPORTANT:</strong> Please arrive 15 minutes early • Bring valid ID and insurance card</p>
            <p>Cancel at least 24 hours in advance to avoid fees</p>
          </div>
        </body>
      </html>
    `;

    printWindow.document.write(printContent);
    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
  };


  const generateAppointmentSlip = () => {
    setStep(3);
  };

  const downloadAppointmentSlip = () => {
    const slipContent = `
APPOINTMENT CONFIRMATION SLIP
================================

Appointment ID: ${appointmentDetails.id}
Status: ${appointmentDetails.status}

PATIENT INFORMATION:
Name: ${appointmentDetails.patient.name}
Email: ${appointmentDetails.patient.email}
Phone: ${appointmentDetails.patient.phone}
Date of Birth: ${appointmentDetails.patient.dateOfBirth}
Insurance: ${appointmentDetails.patient.insuranceProvider || 'Not provided'}

HEALTHCARE PROFESSIONAL:
${appointmentDetails.professional.name}
${appointmentDetails.professional.title}
Specialization: ${appointmentDetails.professional.specialization}

APPOINTMENT DETAILS:
Date: ${new Date(appointmentDetails.appointment.date).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })}
Time: ${appointmentDetails.appointment.time}
Duration: ${appointmentDetails.appointment.duration}
Type: ${appointmentDetails.appointment.type}
Consultation Fee: $${appointmentDetails.appointment.fee}

Location: ${appointmentDetails.professional.location}

Reason for Visit: ${appointmentDetails.appointment.reason}

EMERGENCY CONTACT:
${appointmentDetails.patient.emergencyContact}
${appointmentDetails.patient.emergencyPhone}

IMPORTANT NOTES:
- Please arrive 15 minutes early for your appointment
- Bring a valid ID and insurance card
- Cancel at least 24 hours in advance to avoid fees
- Contact the office if you need to reschedule

Booked on: ${new Date(appointmentDetails.bookedAt).toLocaleString()}

Thank you for choosing our healthcare services!
    `;

    const blob = new Blob([slipContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `appointment-${appointmentDetails.id}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const availableDates = getAvailableDates();
  const availableTimes = getAvailableTimes(formData.selectedDate);

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-gradient-to-br from-gray-800 via-gray-900 to-black rounded-3xl shadow-2xl border border-gray-700 max-w-4xl w-full max-h-[90vh] overflow-y-auto">

        {/* Header */}
        <div className="bg-gradient-to-r from-gray-700 via-gray-800 to-gray-900 text-gray-200 p-6 rounded-t-3xl relative border-b border-gray-700 shadow-xl">
          {/* Decorative blurred circle */}
          <div className="absolute -top-10 -left-10 w-32 h-32 bg-white/10 rounded-full blur-3xl"></div>

          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 flex items-center justify-center w-10 h-10 rounded-full 
             bg-gray-800/80 hover:bg-gray-700 transition-colors duration-300 
             border border-gray-700 shadow-md z-50 cursor-pointer"
          >
            ✕
          </button>


          {/* Professional Info */}
          <div className="flex items-center space-x-4 relative z-10">
            <img
              src={professional.image}
              alt={professional.name}
              className="w-16 h-16 rounded-2xl object-cover border-4 border-gray-700 shadow-lg"
            />
            <div>
              <h2 className="text-2xl font-bold text-gray-200">{professional.name}</h2>
              <p className="text-gray-400 font-medium">{professional.title}</p>
              <p className="text-gray-400 text-sm">{professional.specialization}</p>
            </div>
          </div>
        </div>

        {/* Step 1: Booking Form */}
        {step === 1 && (
          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold text-gray-200 mb-2">Book Your Appointment</h3>
              <p className="text-gray-400">Please fill in your details to schedule your consultation</p>
            </div>

            {/* Personal Information */}
            <div className="bg-gradient-to-br from-gray-700 via-gray-800 to-gray-900 text-gray-200 rounded-2xl p-6 border border-gray-700 shadow-lg">
              <h4 className="font-bold text-gray-200 mb-4 flex items-center space-x-2">
                <User className="w-5 h-5 text-gray-400" />
                <span>Personal Information</span>
              </h4>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { label: 'First Name *', name: 'firstName', type: 'text', placeholder: 'Enter your first name', value: formData.firstName },
                  { label: 'Last Name *', name: 'lastName', type: 'text', placeholder: 'Enter your last name', value: formData.lastName },
                  { label: 'Email *', name: 'email', type: 'email', placeholder: 'Enter your email', value: formData.email },
                  { label: 'Phone *', name: 'phone', type: 'tel', placeholder: 'Enter your phone number', value: formData.phone },
                  { label: 'Date of Birth *', name: 'dateOfBirth', type: 'date', value: formData.dateOfBirth },
                  { label: 'Insurance Provider', name: 'insuranceProvider', type: 'text', placeholder: 'Enter your insurance provider', value: formData.insuranceProvider }
                ].map((field, idx) => (
                  <div key={idx}>
                    <label className="block text-sm font-semibold text-gray-300 mb-2">{field.label}</label>
                    <input
                      type={field.type}
                      name={field.name}
                      value={field.value}
                      onChange={handleInputChange}
                      required={field.label.includes('*')}
                      placeholder={field.placeholder}
                      className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-gray-200 placeholder-gray-500 transition-all duration-300"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Appointment Details */}
            <div className="bg-gradient-to-br from-gray-700 via-gray-800 to-gray-900 text-gray-200 rounded-2xl p-6 border border-gray-700 shadow-lg">
              <h4 className="font-bold text-gray-200 mb-4 flex items-center space-x-2">
                <Calendar className="w-5 h-5 text-gray-400" />
                <span>Appointment Details</span>
              </h4>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-300 mb-2">Preferred Date *</label>
                  <select
                    name="selectedDate"
                    value={formData.selectedDate}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-gray-200"
                  >
                    <option value="">Select a date</option>
                    {availableDates.map((dateOption) => (
                      <option key={dateOption.date} value={dateOption.date}>
                        {dateOption.display}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-300 mb-2">Preferred Time *</label>
                  <select
                    name="selectedTime"
                    value={formData.selectedTime}
                    onChange={handleInputChange}
                    required
                    disabled={!formData.selectedDate}
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-gray-200 disabled:bg-gray-900/50"
                  >
                    <option value="">Select a time</option>
                    {availableTimes.map((time) => (
                      <option key={time} value={time}>
                        {time}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-300 mb-2">Reason for Visit *</label>
                <textarea
                  name="reason"
                  value={formData.reason}
                  onChange={handleInputChange}
                  required
                  rows={3}
                  placeholder="Please describe the reason for your visit..."
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-gray-200 placeholder-gray-500 transition-all duration-300"
                />
              </div>
            </div>

            {/* Submit Button */}
            <div className="text-center">
              <button
                type="submit"
                className="bg-gradient-to-r from-gray-600 via-gray-700 to-gray-800 hover:from-gray-500 hover:via-gray-600 hover:to-gray-700 text-white font-bold py-4 px-8 rounded-2xl transition-all duration-500 transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                Book Appointment
              </button>
            </div>
          </form>
        )}


        {/* Step 2: Confirmation */}
        {step === 2 && appointmentDetails && (
          <div className="p-6">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full shadow-lg mb-4 animate-breathe">
                <CheckCircle className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-3xl font-bold text-white-400 mb-2">Appointment Confirmed!</h3>
              <p className="text-white-400">Your appointment has been successfully booked</p>
            </div>

            <div className="bg-gradient-to-r from-gray-700 via-gray-800 to-gray-900 backdrop-blur-lg bg-opacity-60 rounded-2xl p-6 border border-white/10 mb-6 shadow-xl relative overflow-hidden">
              {/* Decorative blurred circles */}
              <div className="absolute -top-16 -left-16 w-48 h-48 bg-white/10 rounded-full blur-3xl"></div>
              <div className="absolute -bottom-16 -right-16 w-48 h-48 bg-white/10 rounded-full blur-3xl"></div>

              <h4 className="font-bold text-gray-200 mb-4 relative z-10">Appointment Summary</h4>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
                <div>
                  <h5 className="font-semibold text-gray-300 mb-2">Patient Information</h5>
                  <div className="space-y-1 text-sm text-gray-400">
                    <p><strong className="text-gray-200">Name:</strong> {appointmentDetails.patient.name}</p>
                    <p><strong className="text-gray-200">Email:</strong> {appointmentDetails.patient.email}</p>
                    <p><strong className="text-gray-200">Phone:</strong> {appointmentDetails.patient.phone}</p>
                  </div>
                </div>

                <div>
                  <h5 className="font-semibold text-gray-300 mb-2">Appointment Details</h5>
                  <div className="space-y-1 text-sm text-gray-400">
                    <p>
                      <strong className="text-gray-200">Date:</strong>{" "}
                      {new Date(appointmentDetails.appointment.date).toLocaleDateString("en-US", {
                        weekday: "long",
                        year: "numeric",
                        month: "long",
                        day: "numeric"
                      })}
                    </p>
                    <p><strong className="text-gray-200">Time:</strong> {appointmentDetails.appointment.time}</p>
                    <p><strong className="text-gray-200">Duration:</strong> {appointmentDetails.appointment.duration}</p>
                    <p><strong className="text-gray-200">Fee:</strong> ${appointmentDetails.appointment.fee}</p>
                  </div>
                </div>
              </div>
            </div>


            <div className="text-center">
              <button
                onClick={generateAppointmentSlip}
                className="bg-gradient-to-r from-blue-500 via-purple-500 to-indigo-600 hover:from-blue-600 hover:via-purple-600 hover:to-indigo-700 text-white font-bold py-4 px-8 rounded-2xl transition-all duration-500 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center space-x-2 mx-auto"
              >
                <FileText className="w-5 h-5" />
                <span>Generate Appointment Slip</span>
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Appointment Slip */}
        {step === 3 && appointmentDetails && (
          <div className="p-6">
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold text-white-300 mb-2">Appointment Slip</h3>
              <p className="text-white-300">Save or print this slip for your records</p>
            </div>

            {/* Appointment Slip */}
            <div className="bg-white text-black border-2 border-dashed border-gray-300 rounded-2xl p-8 mb-6 font-mono text-sm shadow-lg">
              <div className="text-center border-b-2 border-dashed border-gray-300 pb-4 mb-4">
                <h4 className="text-xl font-bold text-gray-800 mb-2">APPOINTMENT CONFIRMATION SLIP</h4>
                <p className="text-gray-600">ID: {appointmentDetails.id}</p>
                <p className="text-green-600 font-semibold">Status: {appointmentDetails.status}</p>

                {/* QR Code Placeholder */}
                <div className="mt-4 mb-2">
                  <div className="inline-flex items-center justify-center w-24 h-24 border-2 border-dashed border-gray-400 rounded-lg bg-gray-50">
                    <div className="text-center">
                      <QrCode className="w-8 h-8 text-gray-400 mx-auto mb-1" />
                      <span className="text-xs text-gray-400">QR Code</span>
                    </div>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">Scan for quick access</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h5 className="font-bold text-gray-800 mb-2 border-b border-gray-200 pb-1">PATIENT INFORMATION</h5>
                  <div className="space-y-1">
                    <p><strong>Name:</strong> {appointmentDetails.patient.name}</p>
                    <p><strong>Email:</strong> {appointmentDetails.patient.email}</p>
                    <p><strong>Phone:</strong> {appointmentDetails.patient.phone}</p>
                    <p><strong>DOB:</strong> {appointmentDetails.patient.dateOfBirth}</p>
                    {appointmentDetails.patient.insuranceProvider && (
                      <p><strong>Insurance:</strong> {appointmentDetails.patient.insuranceProvider}</p>
                    )}
                  </div>
                </div>

                <div>
                  <h5 className="font-bold text-gray-800 mb-2 border-b border-gray-200 pb-1">HEALTHCARE PROFESSIONAL</h5>
                  <div className="space-y-1">
                    <p><strong>Name:</strong> {appointmentDetails.professional.name}</p>
                    <p><strong>Title:</strong> {appointmentDetails.professional.title}</p>
                    <p><strong>Specialization:</strong> {appointmentDetails.professional.specialization}</p>
                    <p><strong>Location:</strong> {appointmentDetails.professional.location}</p>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-gray-200">
                <h5 className="font-bold text-gray-800 mb-2">APPOINTMENT DETAILS</h5>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <p><strong>Date:</strong> {new Date(appointmentDetails.appointment.date).toLocaleDateString('en-US', {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}</p>
                    <p><strong>Time:</strong> {appointmentDetails.appointment.time}</p>
                    <p><strong>Duration:</strong> {appointmentDetails.appointment.duration}</p>
                  </div>
                  <div className="space-y-1">
                    <p><strong>Type:</strong> {appointmentDetails.appointment.type}</p>
                    <p><strong>Fee:</strong> ${appointmentDetails.appointment.fee}</p>
                    <p><strong>Reason:</strong> {appointmentDetails.appointment.reason}</p>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-gray-200">
                <h5 className="font-bold text-gray-800 mb-2">EMERGENCY CONTACT</h5>
                <p><strong>Name:</strong> {appointmentDetails.patient.emergencyContact}</p>
                <p><strong>Phone:</strong> {appointmentDetails.patient.emergencyPhone}</p>
              </div>

              <div className="mt-6 pt-4 border-t-2 border-dashed border-gray-300 text-center">
                <p className="text-xs text-gray-500">
                  Booked on: {new Date(appointmentDetails.bookedAt).toLocaleString()}
                </p>
                <p className="text-xs text-gray-500 mt-2">
                  Please arrive 15 minutes early • Bring valid ID and insurance card
                </p>
              </div>
            </div>

            <div className="flex justify-center space-x-3 flex-wrap gap-2">
              <button
                onClick={printAppointmentSlip}
                className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-bold py-3 px-6 rounded-2xl transition-all duration-500 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center space-x-2"
              >
                <Printer className="w-5 h-5" />
                <span>Print Slip</span>
              </button>

              <button
                onClick={downloadAppointmentSlip}
                className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-bold py-3 px-6 rounded-2xl transition-all duration-500 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center space-x-2"
              >
                <FileText className="w-5 h-5" />
                <span>Download Text</span>
              </button>

              <button
                onClick={onClose}
                className="bg-gradient-to-r from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700 text-white font-bold py-3 px-6 rounded-2xl transition-all duration-500 transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BookingModal;