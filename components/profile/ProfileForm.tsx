'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';

type ProfileFormProps = {
  email: string;
  userId: string;
  submitLabel?: string;
  onSuccess?: () => void;
  onSubmit: (data: ProfileFormData & { userId?: string }) => Promise<void>;
};

type ProfileFormData = {
  firstName: string;
  lastName: string;
  contactEmail: string;
  phone: string;
  dateOfBirth: string;
  major: string;
  gender: string;
  status: string;
  campusType: string;
  affiliations: string;
  studyStyle: string;
  password: string;
};

export default function ProfileForm({
  email,
  userId,
  submitLabel = 'Save Profile',
  onSuccess,
}: ProfileFormProps) {
  const [formData, setFormData] = useState<ProfileFormData>({
    firstName: '',
    lastName: '',
    contactEmail: '',
    phone: '',
    dateOfBirth: '',
    major: '',
    gender: 'male',
    status: '',
    campusType: '',
    affiliations: '',
    studyStyle: '',
    password: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { setUser } = useAuth();

  const [passwords, setPasswords] = useState({
    password: '',
    confirmPassword: '',
  });
  const [passwordErrors, setPasswordErrors] = useState({
    password: '',
    confirmPassword: '',
  });

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const res = await fetch(`/api/profile?userId=${userId}`);
        const profile = await res.json();
        if (profile && profile.userId) {
          setFormData((prev) => ({
            ...prev,
            ...profile,
            dateOfBirth: profile.dateOfBirth?.substring(0, 10) || '',
          }));
        }
      } catch (err) {
        console.error('Failed to load profile:', err);
      } finally {
        setIsLoading(false);
      }
    };

    loadProfile();
  }, [userId]);

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setPasswords((prev) => ({ ...prev, [id]: value }));
    setPasswordErrors((prev) => ({ ...prev, [id]: '' }));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
    if (errors[id]) setErrors((prev) => ({ ...prev, [id]: '' }));
  };

  const handleRadioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, gender: e.target.id }));
  };

  const validateForm = () => {
    const requiredFields: (keyof ProfileFormData)[] = [
      'firstName', 'lastName', 'contactEmail', 'phone', 'dateOfBirth',
      'major', 'status', 'campusType', 'studyStyle',
    ];

    const newErrors: Record<string, string> = {};
    requiredFields.forEach((field) => {
      if (!formData[field]) {
        newErrors[field] = `${field} is required`;
      }
    });

    if (formData.contactEmail && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.contactEmail)) {
      newErrors.contactEmail = 'Enter a valid email';
    }

    const newPasswordErrors: any = {};
    if (passwords.password.length < 6) {
      newPasswordErrors.password = 'Password must be at least 6 characters';
    }
    if (passwords.password !== passwords.confirmPassword) {
      newPasswordErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    setPasswordErrors(newPasswordErrors);

    return Object.keys(newErrors).length === 0 && Object.keys(newPasswordErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    setIsSubmitting(true);
    try {
      await fetch('/api/profile', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, userId, password: passwords.password }),
      });

      if (userId && email) {
        setUser({ id: userId, email });
      }

      onSuccess?.();
    } catch (err) {
      console.error('Profile submission failed:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return <p className="text-center text-gray-500">Loading profile...</p>;
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="form-card space-y-6 bg-white p-6 rounded-lg shadow-sm">

        {/* 🔐 Create Password */}
        <div>
          <h3 className="text-lg font-semibold text-red-600 mb-3">🔐 Create Password</h3>
          <div className="grid md:grid-cols-2 gap-4 mb-3">
            <div>
              <label className="block font-semibold">Password</label>
              <input
                type="password"
                id="password"
                value={passwords.password}
                onChange={handlePasswordChange}
                className="w-full border border-gray-300 rounded px-4 py-2"
              />
              {passwordErrors.password && (
                <div className="text-red-500 text-sm">{passwordErrors.password}</div>
              )}
            </div>
            <div>
              <label className="block font-semibold">Confirm Password</label>
              <input
                type="password"
                id="confirmPassword"
                value={passwords.confirmPassword}
                onChange={handlePasswordChange}
                className="w-full border border-gray-300 rounded px-4 py-2"
              />
              {passwordErrors.confirmPassword && (
                <div className="text-red-500 text-sm">{passwordErrors.confirmPassword}</div>
              )}
            </div>
          </div>

          
            <h3 className="text-lg font-semibold text-red-600 mb-3">
            <span role="img" aria-label="Personal Information">👤</span> Personal Information
            </h3>
          <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block font-semibold">First Name</label>
            <input
              id="firstName"
              value={formData.firstName}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-4 py-2"
            />
            {errors.firstName && <div className="text-red-500 text-sm">{errors.firstName}</div>}
          </div>
          <div>
            <label className="block font-semibold">Last Name</label>
            <input
              id="lastName"
              value={formData.lastName}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-4 py-2"
            />
            {errors.lastName && <div className="text-red-500 text-sm">{errors.lastName}</div>}
          </div>
          </div>
        </div>

        <div>
          <label className="block font-semibold">UFL Email</label>
          <input
            type="email"
            value={email}
            className="w-full border border-gray-300 rounded px-4 py-2 bg-gray-100"
            disabled
          />
        </div>

        <div>
          <label className="block font-semibold">Contact Email</label>
          <input
            id="contactEmail"
            value={formData.contactEmail}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-4 py-2"
          />
          {errors.contactEmail && <div className="text-red-500 text-sm">{errors.contactEmail}</div>}
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block font-semibold">Phone</label>
            <input
              id="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-4 py-2"
            />
            {errors.phone && <div className="text-red-500 text-sm">{errors.phone}</div>}
          </div>
          <div>
            <label className="block font-semibold">Date of Birth</label>
            <input
              type="date"
              id="dateOfBirth"
              value={formData.dateOfBirth}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-4 py-2"
            />
            {errors.dateOfBirth && <div className="text-red-500 text-sm">{errors.dateOfBirth}</div>}
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block font-semibold">Major</label>
            <select
              id="major"
              value={formData.major}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-4 py-2"
            >
              <option value="">Select your major</option>
              <option value="Accounting">Accounting</option>
              <option value="Biology">Biology</option>
              <option value="Computer Science">Computer Science</option>
            </select>
            {errors.major && <div className="text-red-500 text-sm">{errors.major}</div>}
          </div>

          <div>
            <label className="block font-semibold">Status</label>
            <select
              id="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-4 py-2"
            >
              <option value="">Select your status</option>
              <option value="c/o '28">c/o '28</option>
              <option value="Already Graduated">Already Graduated</option>
            </select>
            {errors.status && <div className="text-red-500 text-sm">{errors.status}</div>}
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block font-semibold">Campus Type</label>
            <select
              id="campusType"
              value={formData.campusType}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-4 py-2"
            >
              <option value="">Select campus type</option>
              <option value="On Campus">On Campus</option>
              <option value="Off Campus">Off Campus</option>
            </select>
            {errors.campusType && <div className="text-red-500 text-sm">{errors.campusType}</div>}
          </div>

          <div>
            <label className="block font-semibold">Gender</label>
            <div className="flex gap-4 mt-2">
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  id="male"
                  name="gender"
                  checked={formData.gender === 'male'}
                  onChange={handleRadioChange}
                />
                Male
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  id="female"
                  name="gender"
                  checked={formData.gender === 'female'}
                  onChange={handleRadioChange}
                />
                Female
              </label>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block font-semibold">Affiliations</label>
            <input
              id="affiliations"
              value={formData.affiliations}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-4 py-2"
            />
          </div>
          <div>
            <label className="block font-semibold">Preferred Study Style</label>
            <select
              id="studyStyle"
              value={formData.studyStyle}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-4 py-2"
            >
              <option value="">Select style</option>
              <option value="concise">Ultra Concise</option>
              <option value="balanced">Balanced</option>
              <option value="detailed">Detailed</option>
            </select>
            {errors.studyStyle && <div className="text-red-500 text-sm">{errors.studyStyle}</div>}
          </div>
        </div>

        <div className="flex justify-end">
        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-red-600 text-white px-6 py-2 rounded hover:bg-red-700"
        >
          {isSubmitting ? 'Saving...' : submitLabel}
        </button>
        </div>
      </div>
    </form>
  );
}
