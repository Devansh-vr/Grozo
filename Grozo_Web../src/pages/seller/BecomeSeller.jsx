import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useUser } from '@clerk/clerk-react';
import { Store, CheckCircle2, ChevronRight, ShieldCheck, TrendingUp, Users, Truck } from 'lucide-react';
import { useSeller } from '../../context/SellerContext';
import Layout from '../../components/layout/Layout';

const STEPS = ['Shop Details', 'Address & Legal', 'Bank Details', 'Review'];

const CATEGORIES = [
  'fruits-vegetables', 'dairy', 'snacks', 'beverages', 'bakery', 'personal-care', 'household',
];

const BLANK = {
  shopName: '', category: '', description: '', ownerName: '', email: '', phone: '',
  address: '', city: '', state: '', pin: '',
  gst: '', pan: '',
  bankAccount: '', confirmBankAccount: '', ifsc: '', bankName: '',
};

const BENEFITS = [
  { icon: <TrendingUp size={22} className="text-green-600" />, title: 'Reach Thousands', desc: 'Access Grozo\'s growing customer base across the city' },
  { icon: <Users size={22} className="text-blue-600" />, title: 'Easy Management', desc: 'Manage products, orders and earnings from one dashboard' },
  { icon: <Truck size={22} className="text-orange-600" />, title: 'We Handle Delivery', desc: 'Grozo\'s delivery network takes care of last-mile logistics' },
  { icon: <ShieldCheck size={22} className="text-purple-600" />, title: 'Secure Payments', desc: 'Get paid directly to your bank account every week' },
];

function FieldGroup({ label, error, children }) {
  return (
    <div>
      <label className="text-xs font-semibold text-gray-600 dark:text-gray-400 block mb-1">{label}</label>
      {children}
      {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
    </div>
  );
}

export default function BecomeSeller() {
  const { isSignedIn, user } = useUser();
  const { submitApplication, currentSellerApp } = useSeller();
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    ...BLANK,
    ownerName: user?.fullName || '',
    email: user?.emailAddresses?.[0]?.emailAddress || '',
  });
  const [errors, setErrors] = useState({});

  const set = (field) => (e) => setForm(f => ({ ...f, [field]: e.target.value }));

  const validateStep = () => {
    const e = {};
    if (step === 0) {
      if (!form.shopName.trim()) e.shopName = 'Shop name is required';
      if (!form.category) e.category = 'Please select a category';
      if (!form.description.trim()) e.description = 'Description is required';
      if (!form.ownerName.trim()) e.ownerName = 'Owner name is required';
      if (!form.phone.trim() || !/^\d{10}$/.test(form.phone)) e.phone = 'Valid 10-digit phone required';
    }
    if (step === 1) {
      if (!form.address.trim()) e.address = 'Address is required';
      if (!form.city.trim()) e.city = 'City is required';
      if (!form.state.trim()) e.state = 'State is required';
      if (!/^\d{6}$/.test(form.pin)) e.pin = 'Valid 6-digit PIN required';
      if (!form.gst.trim()) e.gst = 'GST number is required';
      if (!form.pan.trim()) e.pan = 'PAN number is required';
    }
    if (step === 2) {
      if (!form.bankAccount.trim()) e.bankAccount = 'Account number is required';
      if (form.bankAccount !== form.confirmBankAccount) e.confirmBankAccount = 'Account numbers do not match';
      if (!form.ifsc.trim()) e.ifsc = 'IFSC code is required';
      if (!form.bankName.trim()) e.bankName = 'Bank name is required';
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleNext = () => {
    if (!validateStep()) return;
    setStep(s => s + 1);
  };

  const handleSubmit = () => {
    submitApplication({
      ...form,
      userId: user?.id || 'guest',
      address: `${form.address}, ${form.city}, ${form.state} - ${form.pin}`,
    });
    setSubmitted(true);
  };

  // Already applied
  if (currentSellerApp && !submitted) {
    return (
      <Layout>
        <div className="page-container py-16 max-w-lg mx-auto text-center">
          <div className={`w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-5 ${
            currentSellerApp.status === 'approved' ? 'bg-green-100' :
            currentSellerApp.status === 'rejected' ? 'bg-red-100' : 'bg-amber-100'
          }`}>
            {currentSellerApp.status === 'approved'
              ? <CheckCircle2 size={40} className="text-green-600" />
              : <Store size={40} className={currentSellerApp.status === 'rejected' ? 'text-red-500' : 'text-amber-600'} />
            }
          </div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            {currentSellerApp.status === 'approved' && 'You are an approved seller!'}
            {currentSellerApp.status === 'pending' && 'Application Under Review'}
            {currentSellerApp.status === 'rejected' && 'Application Rejected'}
          </h2>
          <p className="text-gray-500 dark:text-gray-400 mb-2">
            <span className="font-semibold text-gray-700 dark:text-gray-300">{currentSellerApp.shopName}</span>
          </p>
          <p className="text-sm text-gray-500 mb-8">
            {currentSellerApp.status === 'approved' && 'Head to your seller dashboard to start managing your shop.'}
            {currentSellerApp.status === 'pending' && 'Our team is reviewing your application. You will be notified within 2 business days.'}
            {currentSellerApp.status === 'rejected' && 'Unfortunately your application was not approved. Please contact support@grozo.com for details.'}
          </p>
          {currentSellerApp.status === 'approved' && (
            <Link to="/seller/dashboard" className="btn-primary inline-flex items-center gap-2">
              Go to Seller Dashboard <ChevronRight size={16} />
            </Link>
          )}
          {currentSellerApp.status !== 'approved' && (
            <Link to="/" className="btn-outline inline-flex items-center gap-2">
              Back to Home
            </Link>
          )}
        </div>
      </Layout>
    );
  }

  // Submitted successfully
  if (submitted) {
    return (
      <Layout>
        <div className="page-container py-16 max-w-lg mx-auto text-center">
          <div className="w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-5">
            <CheckCircle2 size={40} className="text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Application Submitted!</h2>
          <p className="text-gray-500 dark:text-gray-400 mb-6">
            Thank you for registering <span className="font-semibold text-gray-700 dark:text-gray-300">{form.shopName}</span> on Grozo.
            Our team will review your application within <strong>2 business days</strong>.
          </p>
          <div className="card p-5 dark:bg-gray-900 dark:border-gray-800 text-left mb-8 space-y-2 text-sm text-gray-600 dark:text-gray-400">
            <div className="flex justify-between"><span>Shop Name</span><span className="font-medium text-gray-900 dark:text-white">{form.shopName}</span></div>
            <div className="flex justify-between"><span>Category</span><span className="font-medium text-gray-900 dark:text-white capitalize">{form.category.replace('-', ' ')}</span></div>
            <div className="flex justify-between"><span>Owner</span><span className="font-medium text-gray-900 dark:text-white">{form.ownerName}</span></div>
            <div className="flex justify-between"><span>Status</span><span className="font-semibold text-amber-600">Under Review</span></div>
          </div>
          <Link to="/" className="btn-primary inline-flex items-center gap-2">
            Back to Home <ChevronRight size={16} />
          </Link>
        </div>
      </Layout>
    );
  }

  // Not signed in
  if (!isSignedIn) {
    return (
      <Layout>
        <div className="page-container py-16 max-w-md mx-auto text-center">
          <div className="w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-5">
            <Store size={40} className="text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Sign in to Register Your Shop</h2>
          <p className="text-gray-500 mb-6">You need a Grozo account to become a seller.</p>
          <div className="flex gap-3 justify-center">
            <Link to="/login" className="btn-outline">Login</Link>
            <Link to="/signup" className="btn-primary">Create Account</Link>
          </div>
        </div>
      </Layout>
    );
  }

  const inputCls = (field) =>
    `input text-sm dark:bg-gray-800 dark:border-gray-700 dark:text-white ${errors[field] ? 'border-red-400 focus:border-red-400 focus:ring-red-100' : ''}`;

  return (
    <Layout>
      {/* Hero */}
      <section className="bg-gradient-to-r from-green-700 to-green-500 text-white">
        <div className="page-container py-12 flex flex-col md:flex-row items-center gap-8">
          <div className="flex-1">
            <h1 className="text-3xl md:text-4xl font-black mb-3">Sell on Grozo</h1>
            <p className="text-white/85 text-lg mb-6 max-w-lg">
              Join thousands of sellers across India. Register your shop and start selling to Grozo's growing customer base today.
            </p>
            <div className="grid grid-cols-2 gap-3">
              {BENEFITS.map((b, i) => (
                <div key={i} className="bg-white/15 backdrop-blur-sm rounded-xl p-3">
                  <div className="mb-1">{b.icon}</div>
                  <p className="font-semibold text-sm">{b.title}</p>
                  <p className="text-white/70 text-xs mt-0.5">{b.desc}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="hidden md:block w-72 h-60 rounded-2xl overflow-hidden shadow-2xl border-4 border-white/20 flex-shrink-0">
            <img src="https://images.unsplash.com/photo-1542838132-92c53300491e?w=600" alt="Sell on Grozo" className="w-full h-full object-cover" />
          </div>
        </div>
      </section>

      <div className="page-container py-10 max-w-2xl">
        {/* Stepper */}
        <div className="flex items-center justify-center mb-8">
          {STEPS.map((s, i) => (
            <div key={i} className="flex items-center">
              <div className="flex items-center gap-2">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold border-2 transition-all ${
                  i < step ? 'bg-green-600 border-green-600 text-white' :
                  i === step ? 'border-green-600 text-green-600 bg-white dark:bg-gray-900' :
                  'border-gray-300 text-gray-400 bg-white dark:bg-gray-900'
                }`}>
                  {i < step ? <CheckCircle2 size={15} /> : i + 1}
                </div>
                <span className={`text-xs font-medium hidden sm:block ${i === step ? 'text-green-600' : 'text-gray-400'}`}>{s}</span>
              </div>
              {i < STEPS.length - 1 && (
                <div className={`w-6 sm:w-12 h-0.5 mx-2 ${i < step ? 'bg-green-600' : 'bg-gray-200'}`} />
              )}
            </div>
          ))}
        </div>

        <div className="card p-6 dark:bg-gray-900 dark:border-gray-800">
          {/* Step 0 — Shop Details */}
          {step === 0 && (
            <div className="space-y-4">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-1">Shop Details</h2>
              <p className="text-sm text-gray-500 mb-4">Tell us about your shop and what you sell.</p>
              <FieldGroup label="Shop Name *" error={errors.shopName}>
                <input value={form.shopName} onChange={set('shopName')} placeholder="e.g. Fresh Farms Store" className={inputCls('shopName')} />
              </FieldGroup>
              <FieldGroup label="Product Category *" error={errors.category}>
                <select value={form.category} onChange={set('category')} className={inputCls('category')}>
                  <option value="">Select a category</option>
                  {CATEGORIES.map(c => <option key={c} value={c} className="capitalize">{c.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}</option>)}
                </select>
              </FieldGroup>
              <FieldGroup label="Shop Description *" error={errors.description}>
                <textarea value={form.description} onChange={set('description')} rows={3} placeholder="What do you sell? Where do you source from?" className={`${inputCls('description')} resize-none`} />
              </FieldGroup>
              <div className="grid grid-cols-2 gap-4">
                <FieldGroup label="Owner / Business Name *" error={errors.ownerName}>
                  <input value={form.ownerName} onChange={set('ownerName')} placeholder="Full name" className={inputCls('ownerName')} />
                </FieldGroup>
                <FieldGroup label="Phone Number *" error={errors.phone}>
                  <input value={form.phone} onChange={set('phone')} placeholder="10-digit mobile" className={inputCls('phone')} />
                </FieldGroup>
              </div>
              <FieldGroup label="Email Address">
                <input value={form.email} disabled className="input text-sm bg-gray-50 dark:bg-gray-800 dark:border-gray-700 text-gray-400 cursor-not-allowed" />
              </FieldGroup>
            </div>
          )}

          {/* Step 1 — Address & Legal */}
          {step === 1 && (
            <div className="space-y-4">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-1">Address & Legal Info</h2>
              <p className="text-sm text-gray-500 mb-4">Your shop's physical address and business registration details.</p>
              <FieldGroup label="Shop Address *" error={errors.address}>
                <input value={form.address} onChange={set('address')} placeholder="Building / Street / Locality" className={inputCls('address')} />
              </FieldGroup>
              <div className="grid grid-cols-3 gap-4">
                <FieldGroup label="City *" error={errors.city}>
                  <input value={form.city} onChange={set('city')} placeholder="City" className={inputCls('city')} />
                </FieldGroup>
                <FieldGroup label="State *" error={errors.state}>
                  <input value={form.state} onChange={set('state')} placeholder="State" className={inputCls('state')} />
                </FieldGroup>
                <FieldGroup label="PIN Code *" error={errors.pin}>
                  <input value={form.pin} onChange={set('pin')} placeholder="6 digits" className={inputCls('pin')} />
                </FieldGroup>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <FieldGroup label="GST Number *" error={errors.gst}>
                  <input value={form.gst} onChange={set('gst')} placeholder="e.g. 29ABCDE1234F1Z5" className={`${inputCls('gst')} uppercase`} />
                </FieldGroup>
                <FieldGroup label="PAN Number *" error={errors.pan}>
                  <input value={form.pan} onChange={set('pan')} placeholder="e.g. ABCDE1234F" className={`${inputCls('pan')} uppercase`} />
                </FieldGroup>
              </div>
              <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-3 text-xs text-blue-700 dark:text-blue-300">
                Your GST and PAN are used for tax compliance and are kept completely secure and private.
              </div>
            </div>
          )}

          {/* Step 2 — Bank Details */}
          {step === 2 && (
            <div className="space-y-4">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-1">Bank Details</h2>
              <p className="text-sm text-gray-500 mb-4">Payments will be deposited directly into this account every week.</p>
              <FieldGroup label="Bank Name *" error={errors.bankName}>
                <input value={form.bankName} onChange={set('bankName')} placeholder="e.g. State Bank of India" className={inputCls('bankName')} />
              </FieldGroup>
              <FieldGroup label="Account Number *" error={errors.bankAccount}>
                <input value={form.bankAccount} onChange={set('bankAccount')} placeholder="Bank account number" className={inputCls('bankAccount')} />
              </FieldGroup>
              <FieldGroup label="Confirm Account Number *" error={errors.confirmBankAccount}>
                <input value={form.confirmBankAccount} onChange={set('confirmBankAccount')} placeholder="Re-enter account number" className={inputCls('confirmBankAccount')} />
              </FieldGroup>
              <FieldGroup label="IFSC Code *" error={errors.ifsc}>
                <input value={form.ifsc} onChange={set('ifsc')} placeholder="e.g. SBIN0001234" className={`${inputCls('ifsc')} uppercase`} />
              </FieldGroup>
              <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl p-3 text-xs text-green-700 dark:text-green-300 flex items-start gap-2">
                <ShieldCheck size={14} className="mt-0.5 flex-shrink-0" />
                Bank details are encrypted and never shared with third parties.
              </div>
            </div>
          )}

          {/* Step 3 — Review */}
          {step === 3 && (
            <div className="space-y-4">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-1">Review & Submit</h2>
              <p className="text-sm text-gray-500 mb-4">Please review your details before submitting.</p>

              {[
                { title: 'Shop Details', fields: [
                  ['Shop Name', form.shopName],
                  ['Category', form.category.replace('-', ' ')],
                  ['Owner', form.ownerName],
                  ['Phone', form.phone],
                  ['Email', form.email],
                ]},
                { title: 'Address & Legal', fields: [
                  ['Address', `${form.address}, ${form.city}, ${form.state} - ${form.pin}`],
                  ['GST', form.gst.toUpperCase()],
                  ['PAN', form.pan.toUpperCase()],
                ]},
                { title: 'Bank Details', fields: [
                  ['Bank', form.bankName],
                  ['Account', `XXXX${form.bankAccount.slice(-4)}`],
                  ['IFSC', form.ifsc.toUpperCase()],
                ]},
              ].map((section, i) => (
                <div key={i} className="border border-gray-100 dark:border-gray-800 rounded-2xl p-4">
                  <p className="font-semibold text-sm text-gray-900 dark:text-white mb-3">{section.title}</p>
                  <div className="space-y-2">
                    {section.fields.map(([label, value]) => (
                      <div key={label} className="flex justify-between text-sm gap-4">
                        <span className="text-gray-500 flex-shrink-0">{label}</span>
                        <span className="font-medium text-gray-900 dark:text-white text-right capitalize truncate max-w-[60%]">{value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}

              <div className="flex items-start gap-2 p-3 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-xl text-xs text-amber-700 dark:text-amber-300">
                <ShieldCheck size={14} className="mt-0.5 flex-shrink-0" />
                By submitting you agree to Grozo's Seller Terms of Service and Privacy Policy. Your application will be reviewed within 2 business days.
              </div>
            </div>
          )}

          {/* Navigation buttons */}
          <div className="flex gap-3 mt-6">
            {step > 0 && (
              <button onClick={() => setStep(s => s - 1)} className="flex-1 btn-ghost border border-gray-200 dark:border-gray-700">
                Back
              </button>
            )}
            {step < 3 ? (
              <button onClick={handleNext} className="flex-1 btn-primary py-3">
                Continue
              </button>
            ) : (
              <button onClick={handleSubmit} className="flex-1 btn-primary py-3 flex items-center justify-center gap-2">
                <Store size={16} /> Submit Application
              </button>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}
