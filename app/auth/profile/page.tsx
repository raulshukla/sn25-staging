'use client';

import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { Header } from '@/components/header/header';
import { Footer } from '@/components/footer/footer';

type ProfileFormData = {
  firstName: string;
  lastName: string;
  email: string;
  altEmail: string;
  phone: string;
  dob: string;
  major: string;
  gender: string;
  status: string;
  campus: string;
  affiliations: string;
};

export default function ProfileSetupPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProfileFormData>();

  const router = useRouter();

  const onSubmit = async (data: ProfileFormData) => {
    console.log('Profile data:', data);
    toast.success('Profile saved!');
    router.push('/course'); // redirect to main app area
  };

  return (
    <>
  <Header />
    <div className="min-h-screen bg-gray-50 px-4 py-12">
      <div className="max-w-3xl mx-auto bg-white p-8 rounded-xl shadow-md">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-800">Complete Your Profile</h1>
          <p className="text-gray-500 mt-1">Tell us a bit about yourself so we can customize your experience</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          {/* Name */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium">First Name</label>
              <input {...register('firstName', { required: true })} className="input" />
              {errors.firstName && <p className="text-sm text-red-500">Required</p>}
            </div>
            <div>
              <label className="block text-sm font-medium">Last Name</label>
              <input {...register('lastName', { required: true })} className="input" />
              {errors.lastName && <p className="text-sm text-red-500">Required</p>}
            </div>
          </div>

          {/* Emails */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium">UFL.edu Email</label>
              <input disabled value="you@ufl.edu" className="input bg-gray-100 cursor-not-allowed" />
            </div>
            <div>
              <label className="block text-sm font-medium">Contact Email</label>
              <input {...register('altEmail')} className="input" />
            </div>
          </div>

          {/* Phone + DOB */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium">Phone Number</label>
              <input {...register('phone')} className="input" />
            </div>
            <div>
              <label className="block text-sm font-medium">Date of Birth</label>
              <input type="date" {...register('dob')} className="input" />
            </div>
          </div>

          {/* Academic Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium">Major</label>
              <select {...register('major')} className="input">
                <option>Accounting</option>
                <option>Engineering</option>
                <option>Computer Science</option>
                <option>Psychology</option>
                <option>Marketing</option>
                <option>Other</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium">Gender</label>
              <div className="flex gap-4 mt-2">
                <label className="flex items-center gap-2">
                  <input type="radio" value="Male" {...register('gender')} defaultChecked />
                  Male
                </label>
                <label className="flex items-center gap-2">
                  <input type="radio" value="Female" {...register('gender')} />
                  Female
                </label>
              </div>
            </div>
          </div>

          {/* Status & Campus */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium">Status</label>
              <select {...register('status')} className="input">
                <option>c/o '28</option>
                <option>c/o '27</option>
                <option>c/o '26</option>
                <option>c/o '25</option>
                <option>Already Graduated</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium">Campus Type</label>
              <select {...register('campus')} className="input">
                <option>On Campus</option>
                <option>Off Campus</option>
                <option>UF Online / PaCE</option>
              </select>
            </div>
          </div>

          {/* Affiliations */}
          <div>
            <label className="block text-sm font-medium">Affiliations (Optional)</label>
            <input {...register('affiliations')} placeholder="Greek life, student orgs..." className="input" />
          </div>

          <div className="flex justify-between">
            <button type="button" onClick={() => router.back()} className="btn-secondary">
              ← Back
            </button>
            <button type="submit" className="btn-primary">
              Save Profile
            </button>
          </div>
        </form>
      </div>
    </div>

    <Footer />
        </>
    );
}

// Tailwind utility classes
const input = 'mt-1 w-full border border-gray-300 rounded-md px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-500';
const btnPrimary = 'bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-md font-semibold';
const btnSecondary = 'border border-gray-300 px-6 py-2 rounded-md font-medium text-gray-700';
