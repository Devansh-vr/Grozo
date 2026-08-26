import { useState } from 'react';
import { Search, CheckCircle2, XCircle, Eye, Trash2, Store, Clock } from 'lucide-react';
import AdminLayout from './AdminLayout';
import ConfirmDialog from '../../components/ui/ConfirmDialog';
import { useSeller } from '../../context/SellerContext';
import toast from 'react-hot-toast';

const STATUS_TABS = ['all', 'pending', 'approved', 'rejected'];

const STATUS_STYLES = {
  pending:  'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400',
  approved: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
  rejected: 'bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400',
};

export default function AdminSellers() {
  const { applications, updateApplicationStatus, deleteApplication } = useSeller();
  const [search, setSearch]         = useState('');
  const [statusTab, setStatusTab]   = useState('all');
  const [selected, setSelected]     = useState(null);   // detail modal
  const [confirmAction, setConfirmAction] = useState(null); // { id, action }
  const [deleteId, setDeleteId]     = useState(null);

  const filtered = applications.filter(a => {
    const matchSearch = !search ||
      a.shopName.toLowerCase().includes(search.toLowerCase()) ||
      a.ownerName.toLowerCase().includes(search.toLowerCase()) ||
      a.email.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusTab === 'all' || a.status === statusTab;
    return matchSearch && matchStatus;
  });

  const counts = {
    all:      applications.length,
    pending:  applications.filter(a => a.status === 'pending').length,
    approved: applications.filter(a => a.status === 'approved').length,
    rejected: applications.filter(a => a.status === 'rejected').length,
  };

  const handleStatusChange = (id, action) => {
    updateApplicationStatus(id, action);
    toast.success(`Application ${action}`);
    setConfirmAction(null);
    if (selected?.id === id) setSelected(prev => ({ ...prev, status: action }));
  };

  const handleDelete = (id) => {
    deleteApplication(id);
    setDeleteId(null);
    if (selected?.id === id) setSelected(null);
    toast.success('Application deleted');
  };

  return (
    <AdminLayout>
      <div className="space-y-5">
        {/* Header */}
        <div className="flex items-center justify-between flex-wrap gap-3">
          <div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">Seller Applications</h2>
            <p className="text-sm text-gray-500 mt-0.5">Review and manage shop registration requests</p>
          </div>
          <div className="flex items-center gap-2">
            {counts.pending > 0 && (
              <span className="flex items-center gap-1.5 bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 text-xs font-semibold px-3 py-1.5 rounded-full">
                <Clock size={12} /> {counts.pending} pending review
              </span>
            )}
          </div>
        </div>

        {/* Status tabs */}
        <div className="flex gap-1 bg-gray-100 dark:bg-gray-800 p-1 rounded-xl w-fit flex-wrap">
          {STATUS_TABS.map(tab => (
            <button
              key={tab}
              onClick={() => setStatusTab(tab)}
              className={`px-4 py-1.5 rounded-lg text-sm font-medium capitalize transition-all ${
                statusTab === tab
                  ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm'
                  : 'text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'
              }`}
            >
              {tab} <span className="ml-1 text-xs opacity-60">({counts[tab]})</span>
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="relative max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={14} />
          <input
            type="text"
            placeholder="Search by shop, owner or email..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="input pl-8 text-sm dark:bg-gray-800 dark:border-gray-700 dark:text-white"
          />
        </div>

        {/* Table */}
        <div className="card dark:bg-gray-900 dark:border-gray-800 overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 dark:bg-gray-800">
              <tr>
                {['Shop', 'Owner', 'Category', 'Applied', 'Status', 'Actions'].map(h => (
                  <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase whitespace-nowrap">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
              {filtered.map(app => (
                <tr key={app.id} className="hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                  {/* Shop */}
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 bg-green-100 dark:bg-green-900/30 rounded-xl flex items-center justify-center flex-shrink-0">
                        <Store size={16} className="text-green-600" />
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900 dark:text-white">{app.shopName}</p>
                        <p className="text-xs text-gray-400 truncate max-w-[140px]">{app.email}</p>
                      </div>
                    </div>
                  </td>

                  {/* Owner */}
                  <td className="px-4 py-3">
                    <p className="text-gray-700 dark:text-gray-300">{app.ownerName}</p>
                    <p className="text-xs text-gray-400">{app.phone}</p>
                  </td>

                  {/* Category */}
                  <td className="px-4 py-3 text-gray-500 dark:text-gray-400 capitalize">
                    {app.category.replace('-', ' ')}
                  </td>

                  {/* Applied date */}
                  <td className="px-4 py-3 text-gray-500 dark:text-gray-400">{app.appliedDate}</td>

                  {/* Status */}
                  <td className="px-4 py-3">
                    <span className={`text-xs font-semibold px-2.5 py-1 rounded-full capitalize ${STATUS_STYLES[app.status]}`}>
                      {app.status}
                    </span>
                  </td>

                  {/* Actions */}
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1">
                      {/* View details */}
                      <button
                        onClick={() => setSelected(app)}
                        className="p-1.5 hover:bg-blue-50 dark:hover:bg-blue-900/20 text-gray-400 hover:text-blue-500 rounded-lg transition-colors"
                        title="View details"
                      >
                        <Eye size={14} />
                      </button>

                      {/* Approve */}
                      {app.status !== 'approved' && (
                        <button
                          onClick={() => setConfirmAction({ id: app.id, action: 'approved', shop: app.shopName })}
                          className="p-1.5 hover:bg-green-50 dark:hover:bg-green-900/20 text-gray-400 hover:text-green-600 rounded-lg transition-colors"
                          title="Approve"
                        >
                          <CheckCircle2 size={14} />
                        </button>
                      )}

                      {/* Reject */}
                      {app.status !== 'rejected' && (
                        <button
                          onClick={() => setConfirmAction({ id: app.id, action: 'rejected', shop: app.shopName })}
                          className="p-1.5 hover:bg-red-50 dark:hover:bg-red-900/20 text-gray-400 hover:text-red-500 rounded-lg transition-colors"
                          title="Reject"
                        >
                          <XCircle size={14} />
                        </button>
                      )}

                      {/* Delete */}
                      <button
                        onClick={() => setDeleteId(app.id)}
                        className="p-1.5 hover:bg-red-50 dark:hover:bg-red-900/20 text-gray-400 hover:text-red-500 rounded-lg transition-colors"
                        title="Delete"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {filtered.length === 0 && (
            <div className="text-center py-16">
              <Store size={40} className="mx-auto mb-3 text-gray-300 dark:text-gray-600" />
              <p className="text-gray-400 font-medium">No applications found</p>
              <p className="text-gray-400 text-xs mt-1">
                {search ? 'Try a different search term' : `No ${statusTab === 'all' ? '' : statusTab} applications yet`}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* ── Detail modal ───────────────────────────────────── */}
      {selected && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto animate-fade-in">
            {/* Modal header */}
            <div className="flex items-center justify-between p-5 border-b border-gray-100 dark:border-gray-800">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-green-100 dark:bg-green-900/30 rounded-xl flex items-center justify-center">
                  <Store size={18} className="text-green-600" />
                </div>
                <div>
                  <p className="font-bold text-gray-900 dark:text-white">{selected.shopName}</p>
                  <span className={`text-xs font-semibold px-2 py-0.5 rounded-full capitalize ${STATUS_STYLES[selected.status]}`}>
                    {selected.status}
                  </span>
                </div>
              </div>
              <button onClick={() => setSelected(null)} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl transition-colors text-gray-400">
                <XCircle size={18} />
              </button>
            </div>

            {/* Modal body */}
            <div className="p-5 space-y-4">
              {[
                { title: 'Shop Information', rows: [
                  ['Shop Name',    selected.shopName],
                  ['Category',     selected.category.replace('-', ' ')],
                  ['Description',  selected.description],
                  ['Applied On',   selected.appliedDate],
                ]},
                { title: 'Owner Details', rows: [
                  ['Owner Name',  selected.ownerName],
                  ['Email',       selected.email],
                  ['Phone',       selected.phone],
                ]},
                { title: 'Address & Legal', rows: [
                  ['Address',  selected.address],
                  ['GST',      selected.gst],
                  ['PAN',      selected.pan],
                ]},
                { title: 'Bank Details', rows: [
                  ['Bank Account', selected.bankAccount ? `XXXX${selected.bankAccount.slice(-4)}` : '—'],
                  ['IFSC',         selected.ifsc || '—'],
                ]},
              ].map((section, si) => (
                <div key={si} className="border border-gray-100 dark:border-gray-800 rounded-2xl overflow-hidden">
                  <div className="bg-gray-50 dark:bg-gray-800 px-4 py-2">
                    <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">{section.title}</p>
                  </div>
                  <div className="divide-y divide-gray-100 dark:divide-gray-800">
                    {section.rows.map(([label, value]) => (
                      <div key={label} className="flex gap-4 px-4 py-2.5">
                        <span className="text-xs text-gray-500 w-28 flex-shrink-0">{label}</span>
                        <span className="text-sm font-medium text-gray-900 dark:text-white capitalize break-all">{value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Modal footer actions */}
            <div className="flex gap-3 p-5 border-t border-gray-100 dark:border-gray-800">
              <button onClick={() => setSelected(null)} className="flex-1 btn-ghost border border-gray-200 dark:border-gray-700">
                Close
              </button>
              {selected.status !== 'approved' && (
                <button
                  onClick={() => setConfirmAction({ id: selected.id, action: 'approved', shop: selected.shopName })}
                  className="flex-1 btn-primary flex items-center justify-center gap-2"
                >
                  <CheckCircle2 size={15} /> Approve
                </button>
              )}
              {selected.status !== 'rejected' && (
                <button
                  onClick={() => setConfirmAction({ id: selected.id, action: 'rejected', shop: selected.shopName })}
                  className="flex-1 border-2 border-red-400 text-red-600 font-semibold py-2.5 px-4 rounded-xl hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors flex items-center justify-center gap-2"
                >
                  <XCircle size={15} /> Reject
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Approve / Reject confirm */}
      <ConfirmDialog
        open={!!confirmAction}
        title={confirmAction?.action === 'approved' ? 'Approve Application?' : 'Reject Application?'}
        message={
          confirmAction?.action === 'approved'
            ? `Approve "${confirmAction?.shop}"? They will gain access to the Seller Dashboard.`
            : `Reject "${confirmAction?.shop}"? The seller will be notified that their application was not approved.`
        }
        onConfirm={() => handleStatusChange(confirmAction.id, confirmAction.action)}
        onCancel={() => setConfirmAction(null)}
        confirmText={confirmAction?.action === 'approved' ? 'Approve' : 'Reject'}
        danger={confirmAction?.action === 'rejected'}
      />

      {/* Delete confirm */}
      <ConfirmDialog
        open={!!deleteId}
        title="Delete Application?"
        message="This application will be permanently deleted and cannot be recovered."
        onConfirm={() => handleDelete(deleteId)}
        onCancel={() => setDeleteId(null)}
        confirmText="Delete"
        danger
      />
    </AdminLayout>
  );
}
